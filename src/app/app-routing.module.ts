import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./module/login/login.module').then(m => m.LoginModule) },
  { path: 'system', loadChildren: () => import('./module/system/system.module').then(m => m.SystemModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
