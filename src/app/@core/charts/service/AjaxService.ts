import 'echarts/extension/bmap/bmap'

export abstract class AjaxService {
  abstract getJsonFile(fileName: string): any;

  abstract get(url: string, callback: Function): void;

  abstract getJSON(url: string, callback: Function): void;
}
