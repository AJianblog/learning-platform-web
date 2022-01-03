import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { getToken } from "../utils/localStorageMessage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = getToken();
    if (token && !req.headers.has('Authorization')) {
      req = req.clone({
        headers: req.headers.set('Authorization', token)
      })
    }
    return next.handle(req);
  }

}
