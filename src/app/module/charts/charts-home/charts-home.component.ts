import { Component, OnInit } from '@angular/core';
import { PageParam } from "../../../@core/common/entity/PageParam";
import { PageResult } from "../../../@core/common/entity/PageResult";
import { NzMessageService } from "ng-zorro-antd/message";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Charts } from "../../../@core/charts/entity/Charts";
import { ChartsService } from "../../../@core/charts/service/charts.service";

@Component({
  selector: 'app-charts-home',
  templateUrl: './charts-home.component.html',
  styleUrls: ['./charts-home.component.scss']
})
export class ChartsHomeComponent implements OnInit {

  pageParam: PageParam<any> = {
    currentPage: 1,
    pageSize: 24,
    param: {}
  }

  pageResult: PageResult<Charts> | undefined;

  constructor(private chartsService: ChartsService,
              private message: NzMessageService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.page()
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.pageParam.currentPage = Number(paramMap.get('currentPage')) || 1
      this.pageParam.pageSize = Number(paramMap.get('pageSize')) || 24
      Object.keys(this.pageParam.param).forEach(key => {
        this.pageParam.param[key] = paramMap.get(key) || this.pageParam.param[key]
      })
      this.page()
    })
  }

  page() {
    // https://hezhijian.oss-cn-beijing.aliyuncs.com/diagram/image/001_x5LaQcIME3.png
    this.chartsService.page(this.pageParam).subscribe((data: PageResult<Charts>) => {
      debugger
      this.pageResult = data
    })
  }

  pageIndexChange(num: number) {
    this.routerJump({
      currentPage: num,
      pageSize: this.pageParam.pageSize,
      ...this.pageParam.param
    })
  }

  pageSizeChange(size: number) {
    this.routerJump({
      currentPage: this.pageParam.currentPage,
      pageSize: size,
      ...this.pageParam.param
    })
  }

  handleClickCard(charts: Charts) {
    this.router.navigate(['./showCharts'], {
      queryParams: {
        cid: charts.cid
      },
      relativeTo: this.route
    }).catch((err) => {
      console.error(err)
      this.message.error('路径不存在')
    })
  }

  search(data: any) {
    Object.keys(data).forEach(key => {
      this.pageParam.param[key] = data[key]
    })
    this.routerJump({
      currentPage: this.pageParam.currentPage,
      pageSize: this.pageParam.pageSize,
      ...this.pageParam.param
    })
  }

  routerJump(queryParams: any) {
    this.router.navigate(['.'], {
      queryParams: queryParams,
      relativeTo: this.route
    }).catch(() => {
      this.message.error('路径不存在')
    })
  }

}
