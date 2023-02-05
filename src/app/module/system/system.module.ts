import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemRoutingModule } from './system-routing.module';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { ZorroModule } from "../../@zorro/zorroModule";
import { MaterialModule } from "../../@material/Material.module";
import { MenuEditComponent } from './menu-manager/menu-edit/menu-edit.component';
import { ReactiveFormsModule } from "@angular/forms";
import { UserManagerComponent } from './user-manager/user-manager.component';
import { UserEditComponent } from './user-manager/user-edit/user-edit.component';
import { ArticleComponent } from './article/article.component';
import { ArticleTypeComponent } from './article-type/article-type.component';
import { ArticleTypeInfoComponent } from './article-type/article-type-info/article-type-info.component';
import { FormRenderModule } from "form-render";
import { ArticleTagComponent } from './article-tag/article-tag.component';
import { ArticleTagInfoComponent } from './article-tag/article-tag-info/article-tag-info.component';
import { ThemeModule } from "../../@theme/theme.module";
import { TableRenderModule } from "table-render";
import { EditorModule } from "editor";
import { ArticleInfoComponent } from "./article/article-info/article-info.component";
import { AddArticleComponent } from './article/add-article/add-article.component';
import { EditArticleComponent } from './article/edit-article/edit-article.component';
import { ManualComponent } from './manual/manual.component';
import { ManualModifyComponent } from './manual/manual-modify/manual-modify.component';


@NgModule({
  declarations: [
    MenuManagerComponent,
    MenuEditComponent,
    UserManagerComponent,
    UserEditComponent,
    ArticleComponent,
    ArticleTypeComponent,
    ArticleTypeInfoComponent,
    ArticleTagComponent,
    ArticleTagInfoComponent,
    ArticleInfoComponent,
    AddArticleComponent,
    EditArticleComponent,
    ManualComponent,
    ManualModifyComponent
  ],
  imports: [
    CommonModule,
    SystemRoutingModule,
    ZorroModule,
    MaterialModule,
    ReactiveFormsModule,
    FormRenderModule,
    ThemeModule,
    TableRenderModule,
    EditorModule
  ]
})
export class SystemModule {
}
