import { ModuleWithProviders, NgModule } from "@angular/core";
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from "../@material/Material.module";
import { TreeViewDirectoryComponent } from './tree-view-directory/tree-view-directory.component';
import { ZorroModule } from "../@zorro/zorroModule";
import { SideMenuComponent } from './side-menu/side-menu.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    HeaderComponent,
    TreeViewDirectoryComponent,
    SideMenuComponent,
    AdminLayoutComponent,
    ConfirmDialogComponent
  ],
  imports: [
    MaterialModule,
    ZorroModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent,
    TreeViewDirectoryComponent,
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
