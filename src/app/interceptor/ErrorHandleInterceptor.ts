/**
 * 处理错误信息的拦截器
 *
 */
import { Injectable, Injector } from "@angular/core";
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpStatusCode
} from "@angular/common/http";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NzMessageService } from "ng-zorro-antd/message";

const messageBlackList = ['操作成功']

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  private snackBar: MatSnackBar | undefined;
  constructor(private injector: Injector, private messageService: NzMessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    this.snackBar = this.injector.get(MatSnackBar)
    return next.handle(req).pipe(
      tap(
        event => {
          if (event instanceof HttpResponse) {
            if (event.body?.code === HttpStatusCode.Ok && messageBlackList.indexOf(event.body.message) === -1) {
              this.messageService.success(event.body.message)
            }
          }
        },
        error => {
          if (this.snackBar) {
            this.snackBar.open(error.error.message, "关闭", {
              duration: 2000
            })
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            localStorage.clear()
          }
        }
      )
    );
  }

}
