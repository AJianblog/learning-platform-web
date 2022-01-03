/**
 * 菜单实体
 * @author hezhijian
 */
export interface Menu {
  /**
   * 菜单id
   */
  menuId: string;

  /**
   * 菜单名称
   */
  menuName: string;

  /**
   * 菜单url
   */
  url: string;

  /**
   * 菜单匹配规则
   */
  regexpUrl: string;

  /**
   * 菜单类型
   */
  type: string;

  /**
   * 菜单图标
   */
  icon: string;

  /**
   * 菜单顺序
   */
  position: number;

  /**
   * 父节点菜单id
   */
  parentMenuId: string;

  /**
   * 父节点菜单名称
   */
  parentMenuName: string;

  /**
   * 是否需要显示
   */
  showMenu: boolean;

  /**
   * 是否禁用
   */
  disabled: boolean;

  children: Menu[]
}
