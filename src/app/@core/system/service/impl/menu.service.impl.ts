import { MenuService } from "../menu.service";
import { Observable } from "rxjs";
import { ResponseResult } from "../../../common/entity/ResponseResult";
import { Menu } from "../../entity/menu";
import { HttpClient } from "@angular/common/http";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class MenuServiceImpl extends MenuService {

  private url: string = `${ProxyPrefix.api}/menu`;

  constructor(private http: HttpClient) {
    super();
  }
  /**
   * 查询用户的菜单数据
   */
  findUserMenu(): Observable<Menu[]> {
    return this.http.get<Menu[]>(`${this.url}/findUserMenu`);
  }

  /**
   * 通过菜单id查询菜单信息
   * @param id 菜单id
   */
  findMenuById(id: string | undefined): Observable<Menu> {
    return this.http.get<any>(`${this.url}/findByMenuId/${id}`);
  }

  /**
   * 新增菜单
   * @param menu 菜单信息
   */
  addMenu(menu: Menu): Observable<ResponseResult<Menu>> {
    return this.http.post<ResponseResult<Menu>>(`${this.url}/addMenu`, menu);
  }

  /**
   * 更新菜单信息
   * @param menu 菜单信息
   */
  updateMenu(menu: Menu): Observable<ResponseResult<Menu>> {
    return this.http.put<ResponseResult<Menu>>(`${this.url}/updateMenu`, menu);
  }

  /**
   * 删除菜单信息,通过id
   * @param id 菜单id
   */
  deleteMenuById(id: string | undefined): Observable<ResponseResult<number>> {
    return this.http.delete<ResponseResult<number>>(`${this.url}/deleteMenuById/${id}`);
  }

}
