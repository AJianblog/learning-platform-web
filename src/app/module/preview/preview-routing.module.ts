import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreviewComponent } from "./preview.component";
import { HomeComponent } from "./home/home.component";
import { ArticleComponent } from "./article/article.component";

const routes: Routes = [
  {
    path: '',
    component: PreviewComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'article/:id', component: ArticleComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviewRoutingModule {
}
