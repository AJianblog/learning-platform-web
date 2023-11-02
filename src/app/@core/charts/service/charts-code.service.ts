import { Observable } from "rxjs";
import { ChartsCode } from "../entity/ChartsCode";
import { PageParam } from "../../common/entity/PageParam";
import { PageResult } from "../../common/entity/PageResult";

export abstract class ChartsCodeService {

  abstract page(param: PageParam<ChartsCode>): Observable<PageResult<ChartsCode>>

  abstract getChartsCodeById(id: string): Observable<ChartsCode>;

  abstract batchAddChartsCode(chartCodeList: ChartsCode[]): Observable<any>;
}
