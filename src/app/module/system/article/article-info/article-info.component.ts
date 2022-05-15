import { Component, Input, OnInit } from '@angular/core';
import { FormField } from "form-render/lib/entity/FormField";
import { FormFieldEnum } from "form-render";
import { SelectField } from "form-render/lib/entity/SelectField";
import { ProxyPrefix } from "../../../../@core/common/enum/ProxyPrefix";
import { FormGroup } from "@angular/forms";
import { ArticleTagService } from "../../../../@core/article/service/article-tag.service";
import { ArticleTag } from "../../../../@core/article/entity/ArticleTag";
import { Article } from "../../../../@core/article/entity/Article";
import { ArticleService } from "../../../../@core/article/service/article.service";
import { NzDrawerRef } from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-article-info',
  templateUrl: './article-info.component.html',
  styleUrls: ['./article-info.component.scss']
})
export class ArticleInfoComponent implements OnInit {

  formGroup: FormGroup | undefined;

  @Input()
  article: Article | undefined;

  @Input()
  type: string | undefined;

  formFields: FormField[] = [
    {
      type: 'string',
      component: FormFieldEnum.SELECT,
      label: '文章分类',
      key: 'articleTypeId',
      options: [],
      url: `${ProxyPrefix.api}/articleType/findAllArticleType`,
      method: 'get',
      labelKey: 'articleTypeName',
      valueKey: 'articleTypeId'
    } as SelectField,
    {
      type: 'array',
      component: FormFieldEnum.SELECT,
      label: '文章标签',
      key: 'articleTagIds',
      options: [],
      mode: 'multiple'
    } as SelectField
  ]

  /**
   * 之前选择对文章标签，更改文章分类，改回来之后需要
   */
  oldArticleTagMap: { [key: string]: string[] } = {};

  constructor(private articleTagService: ArticleTagService,
              private articleService: ArticleService,
              private nzDrawerRef: NzDrawerRef) { }

  ngOnInit(): void {
  }

  formGroupInit(formGroup: FormGroup) {
    this.formGroup = formGroup;
    if (this.article) {
      this.formGroup.patchValue(this.article);
      this.oldArticleTagMap[this.article.articleTypeId] = this.article.articleTagIds || [];
      this.findByArticleTypeId(this.article.articleTypeId)
    }
  }

  modelChange(data: any) {
    if (data.config.key === 'articleTypeId') {
      this.formGroup?.patchValue({
        articleTagIds: this.oldArticleTagMap[this.formGroup?.get('articleTypeId')?.value] || []
      })
      this.findByArticleTypeId(data.value)
    } else if (data.config.key === 'articleTagIds') {
      this.oldArticleTagMap[this.formGroup?.get('articleTypeId')?.value] = this.formGroup?.get('articleTagIds')?.value;
    }
  }

  findByArticleTypeId(articleTypeId: string) {
    this.articleTagService.findByArticleTypeId(articleTypeId).subscribe((data: ArticleTag[]) => {
      const articleTag: SelectField | undefined = this.formFields.find(item => item.key === 'articleTagIds') as SelectField;
      articleTag.options = data.map(item => {
        return {
          label: item.articleTagName,
          value: item.articleTagId
        }
      })
    })
  }

  save() {
    debugger
    this.article = { ...this.article, ...this.formGroup?.value }
    this.article!.createTime = '';
    if (this.article) {
      // 存在文章id，判断为更新文章内容
      if (this.article.articleId) {
        this.articleService.updateArticle(this.article).subscribe((data: Article) => {
          this.nzDrawerRef.close(data);
        })
      } else {
        this.articleService.addArticle(this.article).subscribe((data: Article) => {
          this.nzDrawerRef.close(data)
        })
      }
    }
  }

}
