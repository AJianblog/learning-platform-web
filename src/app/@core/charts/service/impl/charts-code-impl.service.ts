import { Injectable } from '@angular/core';
import { ChartsCodeService } from "../charts-code.service";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { Observable } from "rxjs";
import { ChartsCode } from "../../entity/ChartsCode";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ChartsCodeImplService extends ChartsCodeService {

  private url: string = `${ProxyPrefix.api}/chartsCode`;

  constructor(private http: HttpClient) {
    super()
  }

  getChartsCodeById(id: string): Observable<ChartsCode> {
    return this.http.get<ChartsCode>(`${this.url}/getChartsCodeById/${id}`);
  }
}
