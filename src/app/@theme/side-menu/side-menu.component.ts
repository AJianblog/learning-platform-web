import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from "../../@core/system/entity/menu";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input()
  menus: Menu[] = [];

  @Input()
  inlineCollapsed: boolean = false;

  @Output()
  toggleCollapsed: EventEmitter<void> = new EventEmitter<void>();


  constructor() {
    console.log(this.menus);
  }

  ngOnInit(): void {

  }

  menuFoldClick() {
    this.toggleCollapsed.emit();
  }

  showMenu() {
    console.log(this.menus);
  }

  protected readonly isFinite = isFinite;
}
