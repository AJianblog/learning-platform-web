import { Component, OnInit } from '@angular/core';
import { ChartsCodeService } from "../../../@core/charts/service/charts-code.service";
import { ChartsCode } from "../../../@core/charts/entity/ChartsCode";
import { PageParam } from "../../../@core/common/entity/PageParam";

@Component({
  selector: 'app-synchronization',
  templateUrl: './synchronization.component.html',
  styleUrls: ['./synchronization.component.scss']
})
export class SynchronizationComponent implements OnInit {

  syncList: ChartsCode[] = [];

  pageParam: PageParam<any> = {
    pageSize: 100,
    currentPage: 1,
    param: {}
  }

  constructor(private chartsCodeService: ChartsCodeService) { }

  ngOnInit(): void {
  }

  begin() {
    this.chartsCodeService.page(this.pageParam).subscribe(data => {
      this.syncList = data.records
      if (this.syncList.length) {
        this.batchAddChartsCode()
      }
    })
  }

  batchAddChartsCode(count: number = 10) {
    const data = this.syncList.splice(0, 50)
    this.chartsCodeService.batchAddChartsCode(data).subscribe(() => {
      if (this.syncList.length) {
        this.batchAddChartsCode()
      } else {
        this.pageParam.currentPage++;
        localStorage.setItem('currentPage', String(this.pageParam.currentPage));
        this.begin()
      }
    })
  }

}
