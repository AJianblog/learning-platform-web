import { Component, Input, OnInit } from '@angular/core';
import { FormField } from "form-render/lib/entity/FormField";
import { UntypedFormGroup } from "@angular/forms";
import { ArticleType } from "../../../../@core/article/entity/ArticleType";
import { ArticleTypeService } from "../../../../@core/article/service/article-type.service";
import { NzDrawerRef } from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-article-type-info',
  templateUrl: './article-type-info.component.html',
  styleUrls: ['./article-type-info.component.scss']
})
export class ArticleTypeInfoComponent implements OnInit {

  formFields: FormField[] = [
    {
      type: 'string',
      component: 'InputComponent',
      key: 'articleTypeName',
      label: '分类名称'
    }
  ]

  formGroup: UntypedFormGroup | undefined;

  @Input()
  articleType: ArticleType | undefined;

  constructor(private articleTypeService: ArticleTypeService, private nzDrawerRef: NzDrawerRef) {
  }

  ngOnInit(): void {
  }

  formGroupInit(formGroup: UntypedFormGroup) {
    this.formGroup = formGroup;
    debugger
    if (this.articleType) {
      this.formGroup.patchValue(this.articleType)
    }
  }

  /**
   * 保存文章分类
   */
  save() {
    if (this.articleType) {
      const articleInfo = {
        ...this.articleType,
        ...this.formGroup?.value
      };
      this.articleTypeService.updateArticleType(articleInfo).subscribe((data: ArticleType) => {
        this.nzDrawerRef.close(data);
      })
    } else {
      this.articleTypeService.addArticleType(this.formGroup?.value).subscribe((data: ArticleType) => {
        this.nzDrawerRef.close(data);
      })
    }
  }

}
