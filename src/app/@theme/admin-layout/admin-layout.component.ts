import { Component, OnInit } from '@angular/core';
import { Menu } from "../../@core/system/entity/menu";
import { MenuService } from "../../@core/system/service/menu.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  menus: Menu[] = [];


  constructor(private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.findUserMenu();
  }

  /**
   * 查询用户的菜单数据
   */
  findUserMenu() {
    this.menuService.findUserMenu().subscribe(data => {
      this.menus = data.data;
    })
  }

}
