import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreviewRoutingModule } from './preview-routing.module';
import { PreviewComponent } from './preview.component';
import { ThemeModule } from "../../@theme/theme.module";
import { HomeComponent } from './home/home.component';
import { ArticleItemComponent } from './home/article-item/article-item.component';
import { ZorroModule } from "../../@zorro/zorroModule";
import { ArticleComponent } from './article/article.component';
import { EditorModule } from "editor";
import { TocMenuComponent } from './article/toc-menu/toc-menu.component';
import { ImageShowDialogComponent } from './article/image-show-dialog/image-show-dialog.component';


@NgModule({
  declarations: [
    PreviewComponent,
    HomeComponent,
    ArticleItemComponent,
    ArticleComponent,
    TocMenuComponent,
    ImageShowDialogComponent
  ],
  imports: [
    CommonModule,
    PreviewRoutingModule,
    ThemeModule,
    ZorroModule,
    EditorModule
  ]
})
export class PreviewModule { }
