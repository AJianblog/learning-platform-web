import { Component, HostListener, OnInit } from '@angular/core';
import { Menu } from "../../@core/system/entity/menu";
import { MenuService } from "../../@core/system/service/menu.service";
import { MatDrawerMode } from "@angular/material/sidenav";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  menus: Menu[] = [];

  /**
   * 抽屉的模式
   */
  mode: MatDrawerMode = 'side';

  /**
   * drawer首次出现的状态， true: 打开, false: 关闭
   */
  opened: boolean = true;
  isCollapsed: boolean = false;


  constructor(private menuService: MenuService) {
    this.opened = window.innerWidth > 1280;
  }

  ngOnInit(): void {
    this.findUserMenu();
    this.setMode();
  }

  /**
   * 查询用户的菜单数据
   */
  findUserMenu() {
    this.menuService.findUserMenu().subscribe(data => {
      this.menus = data;
    });
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.setMode();
  }

  /**
   * 小屏幕改变抽屉的模式
   */
  setMode() {
    if (window.innerWidth < 1280) {
      this.mode = 'over';
    } else {
      this.mode = 'side';
    }
  }

  toggleCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
