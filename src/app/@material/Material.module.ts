import { ModuleWithProviders, NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatDialogModule } from "@angular/material/dialog";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

const MAT_MODULE = [
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatSnackBarModule,
  MatDialogModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatSelectModule,
  MatProgressSpinnerModule

]

@NgModule({
  declarations: [],
  imports: [
    ...MAT_MODULE
  ],
  exports: [
    ...MAT_MODULE
  ]
})
export class MaterialModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: MaterialModule,
      providers: []
    }
  }
}
