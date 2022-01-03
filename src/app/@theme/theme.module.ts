import { ModuleWithProviders, NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from "../@material/Material.module";
import { ZorroModule } from "../@zorro/zorroModule";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    AdminLayoutComponent
  ],
  imports: [
    MaterialModule,
    ZorroModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    SideMenuComponent,
    AdminLayoutComponent
  ]
})
export class ThemeModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ThemeModule,
      providers: []
    }
  }
}
