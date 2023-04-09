import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { ThemeModule } from "../../@theme/theme.module";
import { ChartsHomeComponent } from './charts-home/charts-home.component';
import { ZorroModule } from "../../@zorro/zorroModule";
import { ShowChartsComponent } from './show-charts/show-charts.component';


@NgModule({
  declarations: [
    ChartsComponent,
    ChartsHomeComponent,
    ShowChartsComponent
  ],
  imports: [
    CommonModule,
    ChartsRoutingModule,
    ThemeModule,
    ZorroModule
  ]
})
export class ChartsModule { }
