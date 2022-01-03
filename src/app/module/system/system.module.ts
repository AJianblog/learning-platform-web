import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { ZorroModule } from "../../@zorro/zorroModule";
import { MaterialModule } from "../../@material/Material.module";
import { MenuEditComponent } from './menu-manager/menu-edit/menu-edit.component';
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormModule } from "dynamic-form";


@NgModule({
  declarations: [
    SystemComponent,
    MenuManagerComponent,
    MenuEditComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ZorroModule,
    MaterialModule,
    ReactiveFormsModule,
    DynamicFormModule
  ]
})
export class SystemModule { }
