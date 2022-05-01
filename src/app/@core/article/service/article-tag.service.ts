import { ArticleTag } from "../entity/ArticleTag";
import { Observable } from "rxjs";
import { PageParam } from "../../common/entity/PageParam";
import { PageResult } from "../../common/entity/PageResult";

export abstract class ArticleTagService {

  /**
   * 添加文章标签
   * @param articleTag 文章标签信息
   */
  abstract addArticleTag(articleTag: ArticleTag): Observable<ArticleTag>;

  /**
   * 删除文章标签
   * @param articleTagId 标签id
   */
  abstract deleteArticleTag(articleTagId: string): Observable<number>;

  /**
   * 分页
   * @param pageParam 分页查询参数
   */
  abstract page(pageParam: PageParam<ArticleTag>): Observable<PageResult<ArticleTag>>;

  /**
   * 更新文章标签
   * @param articleTag
   */
  abstract updateArticle(articleTag: ArticleTag): Observable<ArticleTag>;
}
