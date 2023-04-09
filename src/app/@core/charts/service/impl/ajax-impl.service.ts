import { Injectable } from '@angular/core';
import { AjaxService } from "../AjaxService";
import { HttpClient } from "@angular/common/http";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";

@Injectable({
  providedIn: 'root'
})
export class AjaxImplService extends AjaxService {

  private url: string = `${ProxyPrefix.ossApi}`

  constructor(private http: HttpClient) {
    super()
  }

  get(url: string, callback: Function): void {
    this.http.get(`${this.url}${url}`).subscribe(data => {
      callback(data)
    })
  }

  getJsonFile(fileName: string): any {
    return this.http.get(`assets/map/${fileName}`).toPromise();
  }

  getJSON(url: string, callback: Function): void {
    this.get(url, callback);
  }
}
