import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsComponent } from "./charts.component";
import { ChartsHomeComponent } from "./charts-home/charts-home.component";
import { ShowChartsComponent } from "./show-charts/show-charts.component";
import { SynchronizationComponent } from "./synchronization/synchronization.component";

const routes: Routes = [
  {
    path: '',
    component: ChartsComponent,
    children: [
      { path: '', component: ChartsHomeComponent },
      { path: 'showCharts', component: ShowChartsComponent },
      { path: 'synchronization', component: SynchronizationComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
