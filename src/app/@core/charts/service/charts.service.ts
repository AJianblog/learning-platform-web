import { Observable } from "rxjs";
import { PageParam } from "../../common/entity/PageParam";
import { Charts } from "../entity/Charts";
import { PageResult } from "../../common/entity/PageResult";

export abstract class ChartsService {


  abstract getAllFileName(): Observable<any>;

  abstract getCharts(fileName: string): Observable<any>;

  abstract addCharts(charts: any): Observable<any>;

  abstract addChartsCode(chartsCode: any): Observable<any>;

  abstract page(pageParam: PageParam<Charts>): Observable<PageResult<Charts>>;

}
