import { ModuleWithProviders, NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from "../@material/Material.module";
import { ZorroModule } from "../@zorro/zorroModule";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { TableToolsComponent } from './table-tools/table-tools.component';
import { CoreModule } from "core";
import { ArticleShowPipe } from "./pipe/article-show.pipe";
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideMenuComponent,
    AdminLayoutComponent,
    TableToolsComponent,
    ArticleShowPipe,
    FooterComponent
  ],
  imports: [
    MaterialModule,
    ZorroModule,
    CommonModule,
    RouterModule,
    CoreModule
  ],
  exports: [
    HeaderComponent,
    SideMenuComponent,
    AdminLayoutComponent,
    TableToolsComponent,
    ArticleShowPipe,
    FooterComponent
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
