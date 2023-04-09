/**
 * @author hzj
 * 图表实体
 */
export interface Charts {
  /**
   * 图表的主健
   */
  cid: string;
  /**
   * 版本
   */
  version: string;
  /**
   * 图表的标题
   */
  title: string;
  /**
   * 描述信息
   */
  description: string;
  /**
   * 文件名称
   */
  fileName: string;
  /**
   * 创建时间
   */
  createTime: string;
  /**
   * 最后更新时间
   */
  lastUpdateTime: string;
  /**
   * 图片地址
   */
  thumbnailUrl: string;
}
