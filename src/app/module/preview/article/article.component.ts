import { Component, OnInit } from '@angular/core';
import { Article } from "../../../@core/article/entity/Article";
import { ArticleService } from "../../../@core/article/service/article.service";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  article: Article | undefined;

  tocMenu: any[] = [];

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) {
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
}
