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
import { map, tap } from "rxjs/operators";
import { MatSnackBar } from "@angular/material/snack-bar";
import { NzMessageService } from "ng-zorro-antd/message";
import { Router } from "@angular/router";

const messageBlackList = ['操作成功']

@Injectable()
export class ErrorHandleInterceptor implements HttpInterceptor {

  private snackBar: MatSnackBar | undefined;

  constructor(private injector: Injector, private messageService: NzMessageService, private router: Router) {
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
            this.router.navigate(['/login'])
          }
        }
      ),
      map(event => this.parseResponseData(event))
    );
  }

  /**
   * 将数据设置的code和message去掉
   * @param event
   */
  parseResponseData(event: HttpEvent<any>) {
    if (event instanceof HttpResponse && event.body) {
      return event.clone({ body: event.body.data });
    } else {
      return event
    }
  }

}
