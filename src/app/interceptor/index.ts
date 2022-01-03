import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandleInterceptor } from "./ErrorHandleInterceptor";
import { MatSnackBar } from "@angular/material/snack-bar";
import { SnackBarService } from "../service/snack-bar.service";
import { AuthInterceptor } from "./AuthInterceptor";
import { NzMessageService } from "ng-zorro-antd/message";

/**
 * http拦截器
 */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ErrorHandleInterceptor, multi: true },
  { provide: MatSnackBar, useClass: SnackBarService},
  { provide: NzMessageService, useClass: NzMessageService }
]
