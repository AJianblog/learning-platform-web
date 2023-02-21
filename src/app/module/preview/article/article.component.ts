import { Component, OnInit, ViewChild } from '@angular/core';
import { Article } from "../../../@core/article/entity/Article";
import { ArticleService } from "../../../@core/article/service/article.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { NzModalService } from "ng-zorro-antd/modal";
import { ImageShowDialogComponent } from "./image-show-dialog/image-show-dialog.component";
import { PreviewComponent } from "editor";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article | undefined;

  tocMenu: any[] = [];

  previewComponent: any;

  @ViewChild(PreviewComponent)
  set preview(v: PreviewComponent) {
    setTimeout(() => {
      this.previewComponent = v;
      console.log(this.previewComponent)
    }, 0);
  }

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              protected modalService: NzModalService,
              private messageService: NzMessageService) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.selectArticleById(<string>paramMap.get('id'))
      }
    })
  }

  selectArticleById(id: string) {
    return this.articleService.selectById(id).subscribe((data: Article) => {
      this.article = data;
    })
  }

  setTocMenu(tocMenu: any[]) {
    setTimeout(() => {
      this.tocMenu = tocMenu || [];
    }, 0)
  }

  /**
   * 展示图片
   * @param imageUrl 图片地址
   */
  showImageDialog(imageUrl: string) {
    this.modalService.create({
      nzContent: ImageShowDialogComponent,
      nzTitle: '',
      nzFooter: null,
      nzCloseIcon: '',
      nzCentered: true,
      nzWidth: 'auto',
      nzComponentParams: {
        imageUrl: imageUrl
      }
    })
  }

  clickHandle(data: any) {
    if (data.target && data.target.nodeName.toLowerCase() === 'img') {
      this.showImageDialog(data.target.src);
    }
  }

  copySuccess() {
    this.messageService.success('复制成功');
  }
}
