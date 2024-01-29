import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/selection/active-line'
import { ECharts, init } from "echarts";
import { ChartsCodeService } from "../../../@core/charts/service/charts-code.service";
import { AjaxService } from "../../../@core/charts/service/AjaxService";
import { runCode } from "../../../utils/runCode";

@Component({
  selector: 'app-show-charts',
  templateUrl: './show-charts.component.html',
  styleUrls: ['./show-charts.component.scss']
})
export class ShowChartsComponent implements OnInit, AfterViewInit {
  @Input() className = '';
  /* name applied to the created textarea */
  @Input() name = 'codemirror';
  /* autofocus setting applied to the created textarea */
  @Input() autoFocus = false;

  myCharts: ECharts | undefined;

  editorOptions = {
    language: "javascript",
    roundedSelection: false,
    scrollBeyondLastLine: false,
    readOnly: false
  };
  code: string = '';


  isFocused = false;

  @ViewChild('ref', { static: true }) ref: ElementRef | undefined;

  @ViewChild('charts', { static: true }) echarts: ElementRef | undefined;

  constructor(private _ngZone: NgZone,
              private chartsCodeService: ChartsCodeService,
              private route: ActivatedRoute,
              private ajaxService: AjaxService
  ) {
  }

  ngOnInit(): void {
  }

  getChartsCode(id: string | null) {
    if (!id) {
      return
    }
    this.chartsCodeService.getChartsCodeById(id).subscribe(data => {
      this.code = data.code
      this.updateChartsOptions().then(() => {
      })
    })
  }

  async updateChartsOptions() {
    const options = await runCode(this.code, this.ajaxService, this.myCharts);
    this.myCharts?.clear()
    if (options) {
      this.myCharts?.setOption(options as any)
    }
  }

  back() {
    history.go(-1)
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      if (this.echarts) {
        this.myCharts = init(this.echarts.nativeElement)
      }

      this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
        this.getChartsCode(paramMap.get('cid'))
      })
    })
  }

}
