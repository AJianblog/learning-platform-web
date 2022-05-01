import { Injectable } from '@angular/core';
import { ArticleTypeService } from "../article-type.service";
import { ArticleType } from "../../entity/ArticleType";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { PageParam } from "../../../common/entity/PageParam";
import { PageResult } from "../../../common/entity/PageResult";

@Injectable({
  providedIn: 'root'
})
export class ArticleTypeImplService implements ArticleTypeService {

  private url: string = `${ProxyPrefix.api}/articleType`

  constructor(private http: HttpClient) {
  }

  /**
   * 添加文章分类
   * @param articleType 文章分类信息
   */
  addArticleType(articleType: ArticleType): Observable<ArticleType> {
    return this.http.post<ArticleType>(`${this.url}/addArticleType`, articleType);
  }

  /**
   * 分页查询
   * @param pageParam 查询条件
   */
  page(pageParam: PageParam<ArticleType>): Observable<PageResult<ArticleType>> {
    return this.http.post<PageResult<ArticleType>>(`${this.url}/articleTypePage`, pageParam);
  }

  /**
   * 查询所有的文章分类
   */
  findAllArticleType(): Observable<ArticleType[]> {
    return this.http.get<ArticleType[]>(`${this.url}/findAllArticleType`);
  }

  /**
   * 删除文章分类
   * @param articleTypeId 文章分类id
   */
  deleteArticleType(articleTypeId: string): Observable<number> {
    return this.http.delete<number>(`${this.url}/deleteArticleType/${articleTypeId}`);
  }

  /**
   * 更新文章分类
   * @param articleType 文章分类信息
   */
  updateArticleType(articleType: ArticleType): Observable<ArticleType> {
    return this.http.put<ArticleType>(`${this.url}/updateArticleType`, articleType);
  }
}
