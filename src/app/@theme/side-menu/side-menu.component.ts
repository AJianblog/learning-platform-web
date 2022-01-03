import { Component, Input, OnInit } from '@angular/core';
import { Menu } from "../../@core/system/entity/menu";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit {
  @Input()
  menus: Menu[] = [];


  constructor() {
  }

  ngOnInit(): void {

  }

}
