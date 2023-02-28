import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from "../../@theme/admin-layout/admin-layout.component";
import { MenuManagerComponent } from "./menu-manager/menu-manager.component";
import { UserManagerComponent } from "./user-manager/user-manager.component";
import { ArticleTypeComponent } from "./article-type/article-type.component";
import { ArticleTagComponent } from "./article-tag/article-tag.component";
import { ArticleComponent } from "./article/article.component";
import { AddArticleComponent } from "./article/add-article/add-article.component";
import { EditArticleComponent } from "./article/edit-article/edit-article.component";
import { ManualComponent } from "./manual/manual.component";
import { ComponentSchemaComponent } from "./component-manager/component-schema/component-schema.component";
import { ManualArticleComponent } from "./manual/manual-article/manual-article.component";
import { NotFindPageComponent } from "../../@theme/not-find-page/not-find-page.component";

const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'menuManager', component: MenuManagerComponent },
      { path: 'userManager', component: UserManagerComponent },
      { path: 'articleTypeManager', component: ArticleTypeComponent },
      { path: 'articleTag', component: ArticleTagComponent },
      { path: 'article', component: ArticleComponent },
      { path: 'addArticle', component: AddArticleComponent },
      { path: 'editArticle/:id', component: EditArticleComponent },
      { path: 'manualManager', component: ManualComponent },
      { path: 'manualArticle/:manualId', component: ManualArticleComponent },
      { path: 'componentSchema', component: ComponentSchemaComponent },
      {
        path: '**',
        component: NotFindPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
