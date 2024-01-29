import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { ThemeModule } from "../../@theme/theme.module";
import { ChartsHomeComponent } from './charts-home/charts-home.component';
import { ZorroModule } from "../../@zorro/zorroModule";
import { ShowChartsComponent } from './show-charts/show-charts.component';
import { SynchronizationComponent } from './synchronization/synchronization.component';
import { EditorModule } from "editor";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    ChartsComponent,
    ChartsHomeComponent,
    ShowChartsComponent,
    SynchronizationComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ThemeModule,
    ZorroModule,
    EditorModule,
    FormsModule
  ]
})
export class ChartsModule { }
