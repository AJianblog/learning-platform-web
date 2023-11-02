import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from "./guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./module/preview/preview.module').then(m => m.PreviewModule),
    data: {
      code: 'note'
    }
  },
  {
    path: 'login',
    loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule),
    data: {
      code: 'login'
    }
  },
  {
    path: 'system',
    canActivate: [AuthGuard],
    loadChildren: () => import('./module/system/system.module').then(m => m.SystemModule),
    data: {
      code: 'system'
    }
  },
  {
    path: 'charts',
    canActivate: [AuthGuard],
    loadChildren: () => import('./module/charts/charts.module').then(m => m.ChartsModule),
    data: {
      code: 'charts'
    }
  },
  {
    path: 'resume',
    loadChildren: () => import('./module/resume/resume.module').then(m => m.ResumeModule),
    data: {
      code: 'resume'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
