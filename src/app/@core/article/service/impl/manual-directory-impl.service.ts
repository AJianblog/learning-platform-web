import { Injectable } from '@angular/core';
import { ManualDirectoryService } from "../manual-directory.service";
import { ManualDirectory } from "../../entity/ManualDirectory";
import { Observable } from "rxjs";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManualDirectoryImplService implements ManualDirectoryService{

  private url: string = `${ProxyPrefix.api}/manualMenu`

  constructor(private http: HttpClient) { }

  addManualDirectory(manualMenu: ManualDirectory): Observable<ManualDirectory> {
    return this.http.post<ManualDirectory>(`${this.url}/addManualMenu`, manualMenu);
  }

  selectByManualId(manualId: string): Observable<ManualDirectory[]> {
    return this.http.get<ManualDirectory[]>(`${this.url}/selectByManualId/${manualId}`);
  }
}
