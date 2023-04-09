/**
 * 手册目录
 */
export interface ManualDirectory {
  /**
   * 手册菜单id
   */
  manualMenuId: string;
  /**
   * 关联的手册id
   */
  manualId: string;

  /**
   * 关联的文章id
   */
  articleId: string;

  /**
   * 手册目录名称
   */
  manualMenuName: string;

  /**
   * 手册目录父节点id
   */
  parentManualDirectoryId: string;

  /**
   * 排序位置
   */
  sort: number;
}

