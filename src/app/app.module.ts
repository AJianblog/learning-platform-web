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
    FormsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
