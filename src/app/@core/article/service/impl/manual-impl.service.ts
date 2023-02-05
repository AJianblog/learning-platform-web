import { Injectable } from '@angular/core';
import { ManualService } from "../ManualService";
import { Manual } from "../../entity/Manual";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { PageParam } from "../../../common/entity/PageParam";
import { PageResult } from "../../../common/entity/PageResult";

@Injectable({
  providedIn: 'root'
})
export class ManualImplService implements ManualService {

  private url: string = `${ProxyPrefix.api}/manual`

  constructor(private http: HttpClient) { }

  /**
   * 添加手册
   * @param manual
   */
  addManual(manual: Manual): Observable<Manual> {
    return this.http.post<Manual>(`${this.url}/addManual`, manual);
  }

  page(pageParam: PageParam<Manual>): Observable<PageResult<Manual>> {
    return this.http.post<PageResult<Manual>>(`${this.url}/page`, pageParam);
  }

  updateManual(manual: Manual): Observable<Manual> {
    return this.http.put<Manual>(`${this.url}/updateManual`, manual);
  }

  deleteManualById(manualId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/deleteManualById/${manualId}`);
  }
}
