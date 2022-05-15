import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../../../../@core/article/service/article.service";
import { Article } from "../../../../@core/article/entity/Article";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  article: Article | undefined;

  constructor(private route: ActivatedRoute,
              private articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.selectById(this.route.snapshot.paramMap.get('id'));
  }

  selectById(articleId: string | null) {
    if (articleId) {
      this.articleService.selectById(articleId).subscribe((data: Article) => {
        this.article = data;
        this.article.articleTagIds = data.articleTags?.map(item => item.articleTagId) || [];
      })
    }
  }

}
