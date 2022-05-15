import { Injectable } from '@angular/core';
import { ArticleService } from "../article.service";
import { Article } from "../../entity/Article";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { PageParam } from "../../../common/entity/PageParam";
import { PageResult } from "../../../common/entity/PageResult";

@Injectable({
  providedIn: 'root'
})
export class ArticleImplService implements ArticleService {

  private url: string = `${ProxyPrefix.api}/article`;

  constructor(private http: HttpClient) { }

  addArticle(article: Article): Observable<Article> {
    return this.http.post<Article>(`${this.url}/addArticle`, article);
  }

  deleteById(articleId: string): Observable<number> {
    return this.http.delete<number>(`${this.url}/deleteArticle/${articleId}`);
  }

  page(pageParam: PageParam<Article>): Observable<PageResult<Article>> {
    return this.http.post<PageResult<Article>>(`${this.url}/page`, pageParam);
  }

  updateArticle(article: Article): Observable<Article> {
    return this.http.put<Article>(`${this.url}/updateArticle`, article);
  }

  selectById(articleId: string): Observable<Article> {
    return this.http.get<Article>(`${this.url}/selectById/${articleId}`);
  }
}
