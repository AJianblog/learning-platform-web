import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from "./@core/core.module";
import { HttpClientModule } from "@angular/common/http";
import { ThemeModule } from "./@theme/theme.module";
import { httpInterceptorProviders } from "./interceptor";
import { OverlayModule } from "@angular/cdk/overlay";
import { FormsModule } from '@angular/forms';
import { ZorroModule } from "./@zorro/zorroModule";
import { CoreModule as LowCodeCore } from 'core'
import { EditorModule } from "editor";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    OverlayModule,
    CoreModule.forRoot(),
    ThemeModule.forRoot(),
    ZorroModule.forRoot(),
    LowCodeCore,
    FormsModule,
    EditorModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    httpInterceptorProviders
  ],
  exports: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
