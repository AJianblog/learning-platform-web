import { Observable } from "rxjs";
import { ArticleType } from "../entity/ArticleType";
import { PageParam } from "../../common/entity/PageParam";
import { PageResult } from "../../common/entity/PageResult";

export abstract class ArticleTypeService {
  /**
   * 添加文章分类
   * @param articleType 文章分类信息
   */
  abstract addArticleType(articleType: ArticleType): Observable<ArticleType>;

  /**
   * 删除文章分类
   * @param articleTypeId 文章分类id
   */
  abstract deleteArticleType(articleTypeId: string): Observable<number>;

  /**
   * 分页查询
   * @param pageParam 查询条件
   */
  abstract page(pageParam: PageParam<ArticleType>): Observable<PageResult<ArticleType>>;

  abstract findAllArticleType(): Observable<ArticleType[]>;

  /**
   * 更新文章分类
   * @param articleType 文章分类信息
   */
  abstract updateArticleType(articleType: ArticleType): Observable<ArticleType>;
}
