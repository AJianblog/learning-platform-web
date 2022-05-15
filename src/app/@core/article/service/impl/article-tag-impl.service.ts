import { Injectable } from '@angular/core';
import { ArticleTagService } from "../article-tag.service";
import { Observable } from "rxjs";
import { ArticleTag } from "../../entity/ArticleTag";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { HttpClient } from "@angular/common/http";
import { PageParam } from "../../../common/entity/PageParam";
import { PageResult } from "../../../common/entity/PageResult";

@Injectable({
  providedIn: 'root'
})
export class ArticleTagImplService implements ArticleTagService {

  private url: string = `${ProxyPrefix.api}/articleTag`

  constructor(private http: HttpClient) { }

  addArticleTag(articleTag: ArticleTag): Observable<ArticleTag> {
    return this.http.post<ArticleTag>(`${this.url}/addArticleTag`, articleTag);
  }

  deleteArticleTag(articleTagId: string): Observable<number> {
    return this.http.delete<number>(`${this.url}/deleteArticleTag/${articleTagId}`);
  }

  page(pageParam: PageParam<ArticleTag>): Observable<PageResult<ArticleTag>> {
    return this.http.post<PageResult<ArticleTag>>(`${this.url}/page`, pageParam);
  }

  updateArticle(articleTag: ArticleTag): Observable<ArticleTag> {
    return this.http.put<ArticleTag>(`${this.url}/updateArticle`, articleTag);
  }

  findByArticleTypeId(articleTypeId: string): Observable<ArticleTag[]> {
    return this.http.get<ArticleTag[]>(`${this.url}/findByArticleTypeId/${articleTypeId}`);
  }
}
