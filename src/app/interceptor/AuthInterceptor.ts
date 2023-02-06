import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getToken, tokenIsExpire } from "../utils/localStorageMessage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getToken();
    // token存在并且没有失效
    if (token && tokenIsExpire() && !req.headers.has('Authorization')) {
      req = req.clone({
        headers: req.headers.set('Authorization', token)
      })
    }
    return next.handle(req);
  }

}
