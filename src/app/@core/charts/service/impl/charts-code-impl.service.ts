import { Injectable } from '@angular/core';
import { ChartsCodeService } from "../charts-code.service";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { Observable } from "rxjs";
import { ChartsCode } from "../../entity/ChartsCode";
import { HttpClient } from "@angular/common/http";
import { PageParam } from "../../../common/entity/PageParam";
import { PageResult } from "../../../common/entity/PageResult";

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

  /**
   * 批量添加图表代码
   * @param chartCodeList
   */
  batchAddChartsCode(chartCodeList: ChartsCode[]): Observable<any> {
    return this.http.post(`${this.url}/batchAddChartsCode`, chartCodeList);
  }

  page(param: PageParam<ChartsCode>): Observable<PageResult<ChartsCode>> {
    return this.http.post<PageResult<ChartsCode>>(`/diagram/chartsCode/page`, param);
    // return this.http.post<PageResult<ChartsCode>>(`${this.url}/page`, param);
  }

}
