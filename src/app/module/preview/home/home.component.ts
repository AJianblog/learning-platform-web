import { Component, OnInit } from '@angular/core';
import { PageResult } from "../../../@core/common/entity/PageResult";
import { Article } from "../../../@core/article/entity/Article";
import { ArticleService } from "../../../@core/article/service/article.service";
import { PageParam } from "../../../@core/common/entity/PageParam";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  pageResult: PageResult<Article> | undefined;

  pageParam: PageParam<Article> = {
    currentPage: 1,
    pageSize: 10,
    param: {} as any
  }

  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.pageParam.currentPage = Number(paramMap.get('currentPage')) || 1;
      this.page();
    })
  }

  page() {
    this.articleService.page(this.pageParam).subscribe((data: PageResult<Article>) => {
      this.pageResult = data;
    })
  }

  pageIndexChange(pageIndex: number) {
    this.router.navigate(['./'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        currentPage: pageIndex
      },
      relativeTo: this.route
    })
  }

}
