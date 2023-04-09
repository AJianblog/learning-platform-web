import { AfterViewInit, Component, ElementRef, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from "@angular/router";
import { EditorFromTextArea } from "codemirror";
import * as CodeMirror from "codemirror";
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

  codeMirror: EditorFromTextArea | undefined;

  myCharts: ECharts | undefined;

  /**
   * either global variable or required library
   */
  private _codeMirror: any;


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
      if (this.codeMirror) {
        this.codeMirror.setValue(data.code);
        this.updateChartsOptions()
      }
    })
  }

  async updateChartsOptions() {
    if (this.codeMirror) {
      const options = await runCode(this.codeMirror.getValue(), this.ajaxService, this.myCharts);
      this.myCharts?.clear()
      debugger
      if (options) {
        debugger
        this.myCharts?.setOption(options as any)
      }
    }
  }

  back() {
    history.go(-1)
  }

  ngAfterViewInit() {
    this._ngZone.runOutsideAngular(() => {
      if (this.ref) {
        this.codeMirror = CodeMirror.fromTextArea(
          this.ref.nativeElement,{
            mode: 'javascript',
            styleActiveLine: true,
            lineNumbers: true
          }
        );
      }
      if (this.echarts) {
        this.myCharts = init(this.echarts.nativeElement)
      }

      this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
        this.getChartsCode(paramMap.get('cid'))
      })
    })
  }

}
