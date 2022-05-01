import { Observable } from "rxjs";
import { ResponseResult } from "../../common/entity/ResponseResult";
import { Menu } from "../entity/menu";

export abstract class MenuService {

  /**
   * 查询用户的菜单数据
   */
  abstract findUserMenu(): Observable<Menu[]>;

  /**
   * 通过菜单id查询菜单信息
   * @param id 菜单id
   */
  abstract findMenuById(id: string | undefined): Observable<Menu>;

  /**
   * 新增菜单
   * @param menu 菜单信息
   */
  abstract addMenu(menu: Menu): Observable<ResponseResult<Menu>>;

  /**
   * 更新菜单信息
   * @param menu 菜单信息
   */
  abstract updateMenu(menu: Menu): Observable<ResponseResult<Menu>>;

  /**
   * 删除菜单信息,通过id
   * @param id 菜单id
   */
  abstract deleteMenuById(id: string | undefined): Observable<ResponseResult<number>>;

}
