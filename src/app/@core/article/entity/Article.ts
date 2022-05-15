/**
 * 文章实体
 */
import { ArticleTag } from "./ArticleTag";

export interface Article {

  /**
   * 文章id
   */
  articleId: string;

  /**
   * 文章标题
   */
  articleTitle: string;

  /**
   * 文章内容
   */
  articleValue: string;

  /**
   * 文章创建时间
   * YYYY-MM-DD HH:mm:ss
   */
  createTime: string;

  /**
   * 创建人id
   */
  createUserId: string;

  /**
   * 最后更新时间
   * YYYY-MM-DD HH:mm:ss
   */
  lastUpdateTime: string;

  /**
   * 文章分类id
   */
  articleTypeId: string;

  /**
   * 文章标签id列表
   */
  articleTagIds: string[];

  /**
   * 文章对标签详细信息
   */
  articleTags?: ArticleTag[];

}
