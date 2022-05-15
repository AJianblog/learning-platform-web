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
      { path: 'editArticle/:id', component: EditArticleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {
}
