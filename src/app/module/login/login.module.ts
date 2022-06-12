import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from "../../@material/Material.module";
import { ZorroModule } from "../../@zorro/zorroModule";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    ZorroModule
  ]
})
export class LoginModule { }
