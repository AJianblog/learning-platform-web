import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent, NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { MenuService } from "../../../@core/system/service/menu.service";
import { Menu } from "../../../@core/system/entity/menu";
import { NzContextMenuService, NzDropdownMenuComponent } from "ng-zorro-antd/dropdown";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { MenuEditComponent } from "./menu-edit/menu-edit.component";
import { NzModalService } from "ng-zorro-antd/modal";
import { MessageService } from "../../../service/message.service";

@Component({
  selector: 'app-menu-manager',
  templateUrl: './menu-manager.component.html',
  styleUrls: ['./menu-manager.component.scss']
})
export class MenuManagerComponent implements OnInit {

  nodes: NzTreeNodeOptions[] = [];

  menuInfo: Menu | undefined;

  titleInfo: { [key: string]: string } = {
    add: '新增菜单',
    edit: '编辑菜单'
  }

  constructor(private menuService: MenuService,
              private nzContextMenuService: NzContextMenuService,
              private drawerService: NzDrawerService,
              private modalService: NzModalService,
              private messageService: MessageService
              ) {
  }

  ngOnInit(): void {
    this.findUserMenu();
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
  }

  /**
   * 查询用户的菜单数据
   */
  findUserMenu() {
    this.menuService.findUserMenu().subscribe(data => {
      this.nodes = data.data.map((item: Menu) => {
        return this.formatterMenu(item);
      });
    })
  }

  formatterMenu(menu: Menu): NzTreeNodeOptions {
    // 是否是叶子节点
    const isLeaf: boolean = !menu.children || !menu.children.length
    const result: NzTreeNodeOptions = {
      key: menu.menuId,
      title: menu.menuName,
      isLeaf: isLeaf,
      icon: menu.icon
    }
    if (!isLeaf) {
      result.children = menu.children.map(item => {
        return this.formatterMenu(item)
      })
    }
    return result;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  clickMenuHandle(nzFormatEmitEvent: NzFormatEmitEvent) {
    this.findMenuById(nzFormatEmitEvent.node?.key)
  }

  findMenuById(menuId: string | undefined) {
    this.menuService.findMenuById(menuId).subscribe(data => {
      this.menuInfo = data.data;
    })
  }

  addChildMenuHandle(title: string) {
    if (!this.menuInfo) {
      this.messageService.warning('请选择菜单')
      return;
    }
    const drawerRef = this.drawerService.create<MenuEditComponent, undefined, { type: string }>({
      nzTitle: title,
      nzMaskClosable: false,
      nzWidth: '45%',
      nzContent: MenuEditComponent,
      nzContentParams: {
        nodes: this.nodes,
        menuInfo: title === this.titleInfo.edit ? this.menuInfo : undefined
      }
    })
    drawerRef.afterClose.subscribe(data => {
      if (data?.type === 'handleOk') {
        this.findUserMenu()
        if (title === this.titleInfo.edit) {
          this.findMenuById(this.menuInfo?.menuId)
        }
      }
    })
  }

  /**
   * 删除菜单
   */
  deleteMenuHandle() {
    if (!this.menuInfo) {
      this.messageService.warning('请选择菜单')
      return;
    }
    this.modalService.create({
      nzTitle: '操作提示',
      nzContent: `是否要删除${this.menuInfo.menuName}`,
      nzClosable: false,
      nzOnOk: () => {
        return new Promise(resolve => {
          this.menuService.deleteMenuById(this.menuInfo?.menuId).subscribe(res => {
            this.findUserMenu();
            this.menuInfo = undefined;
            resolve()
          })
        })
      }
    })
  }


}
