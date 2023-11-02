import { Component, Input, OnInit } from '@angular/core';
import { FormField } from "form-render/lib/entity/FormField";
import { FormFieldEnum } from "form-render";
import { SelectField } from "form-render/lib/entity/SelectField";
import { ArticleTypeService } from "../../../../@core/article/service/article-type.service";
import { ArticleTagService } from "../../../../@core/article/service/article-tag.service";
import { ArticleType } from "../../../../@core/article/entity/ArticleType";
import { UntypedFormGroup } from "@angular/forms";
import { ArticleTag } from "../../../../@core/article/entity/ArticleTag";
import { NzDrawerRef } from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-article-tag-info',
  templateUrl: './article-tag-info.component.html',
  styleUrls: ['./article-tag-info.component.scss']
})
export class ArticleTagInfoComponent implements OnInit {

  private _articleType: ArticleType[] = [];

  formFields: FormField[] = [
    {
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '标签名称',
      key: 'articleTagName'
    },
    {
      type: 'string',
      component: FormFieldEnum.SELECT,
      label: '标签分类',
      key: 'articleTypeId',
      options: []
    } as SelectField
  ]

  formGroup: UntypedFormGroup | undefined;

  @Input()
  get articleType(): ArticleType[] {
    return this._articleType;
  }

  set articleType(articleTypes: ArticleType[]) {
    this._articleType = articleTypes;
    const field: any = this.formFields.find(item => item.key === 'articleTypeId')
    if (field) {
      field.options = articleTypes.map(item => {
        return {
          label: item.articleTypeName,
          value: item.articleTypeId
        }
      })
    }
  }

  @Input()
  articleTag: ArticleTag | undefined;

  constructor(private articleTypeService: ArticleTypeService,
              private articleTagService: ArticleTagService,
              private nzDrawerRef: NzDrawerRef) {
  }

  ngOnInit(): void {
  }

  formGroupInit(formGroup: UntypedFormGroup) {
    this.formGroup = formGroup;
    if (this.articleTag) {
      this.formGroup.patchValue(this.articleTag);
    }
  }
  /**
   * 保存
   */
  save() {
    if (this.articleTag) {
      const param: ArticleTag = {
        ...this.articleTag,
        ...this.formGroup?.value
      }
      this.articleTagService.updateArticle(param).subscribe((articleTag: ArticleTag) => {
        this.nzDrawerRef.close(articleTag);
      })
    } else {
      this.articleTagService.addArticleTag(this.formGroup?.value).subscribe((data: ArticleTag) => {
        this.nzDrawerRef.close(data);
      })
    }
  }

}
