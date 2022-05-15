import { Article } from "../entity/Article";
import { Observable } from "rxjs";
import { PageParam } from "../../common/entity/PageParam";
import { PageResult } from "../../common/entity/PageResult";

export abstract class ArticleService {
  /**
   * 添加文章
   * @param article 文章信息
   */
  abstract addArticle(article: Article): Observable<Article>;

  /**
   * 删除文章
   * @param articleId 文章id
   */
  abstract deleteById(articleId: string): Observable<number>;

  /**
   * 分页查询
   * @param pageParam 查询参数
   */
  abstract page(pageParam: PageParam<Article>): Observable<PageResult<Article>>;

  /**
   * 查询文章信息，通过文章id
   * @param articleId 文章id
   */
  abstract selectById(articleId: string): Observable<Article>;

  /**
   * 更新文章信息
   * @param article 文章信息
   */
  abstract updateArticle(article: Article): Observable<Article>;
}
