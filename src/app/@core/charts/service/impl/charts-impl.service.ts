import { Injectable } from '@angular/core';
import { ChartsService } from "../charts.service";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { PageParam } from "../../../common/entity/PageParam";
import { Charts } from "../../entity/Charts";
import { PageResult } from "../../../common/entity/PageResult";

@Injectable({
  providedIn: 'root'
})
export class ChartsImplService extends ChartsService {

  private url: string = `${ProxyPrefix.api}/charts`

  constructor(private http: HttpClient) {
    super();
  }
  addCharts(charts: any): Observable<any> {
    return this.http.post<any>('/api/charts/addCharts', charts);
  }

  getCharts(fileName: string): Observable<any> {
    return this.http.get(`/api/makepie/${fileName}`, {responseType: 'text'});
  }

  getAllFileName(): Observable<any> {
    return this.http.get<any>('/api/file/fileList');
  }

  addChartsCode(chartsCode: any): Observable<any> {
    return this.http.post('/api/chartsCode/addChartsCode', chartsCode);
  }

  page(pageParam: PageParam<Charts>): Observable<PageResult<Charts>> {
    return this.http.post<PageResult<Charts>>(`${this.url}/page`, pageParam);
  }
}
