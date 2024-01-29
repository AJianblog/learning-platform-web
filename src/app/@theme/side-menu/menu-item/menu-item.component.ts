import { Component, Input, OnInit } from '@angular/core';
import { Menu } from "../../../@core/system/entity/menu";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {

  @Input()
  menu: Menu | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

}
