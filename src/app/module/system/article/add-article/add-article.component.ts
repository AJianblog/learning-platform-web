import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms";
import { Article } from "../../../../@core/article/entity/Article";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ArticleInfoComponent } from "../article-info/article-info.component";

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent implements OnInit {

  private _article: Article | undefined;


  formGroup: FormGroup;

  lazy: boolean = false;

  @Input()
  set article(article: Article) {
    this._article = article;
    if (this.article && this.article.articleId) {
      this.formGroup.patchValue(this.article);
    }
  }

  get article(): Article {
    return <Article>this._article;
  }

  options: any = {
    lineNumbers: true,
    theme: 'material',
    mode: 'markdown',
    indentUnit: 4
  }

  constructor(private fb: FormBuilder, private drawerService: NzDrawerService) {
    this.formGroup = fb.group({
      articleValue: [''],
      articleTitle: ['']
    })
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.lazy = true;
    }, 0)
  }

  release() {
    this.article = { ...this.article, ...this.formGroup.value }
    const drawerRef = this.drawerService.create<ArticleInfoComponent, { article: Article }, Article>({
      nzTitle: '文章信息',
      nzContent: ArticleInfoComponent,
      nzMaskClosable: false,
      nzWidth: '45%',
      nzContentParams: {
        article: this.article
      }
    });
    drawerRef.afterClose.subscribe((data: Article) => {
      this.article = data;
    })
  }

}
