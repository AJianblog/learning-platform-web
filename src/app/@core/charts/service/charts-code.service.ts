import { Observable } from "rxjs";
import { ChartsCode } from "../entity/ChartsCode";

export abstract class ChartsCodeService {

  abstract getChartsCodeById(id: string): Observable<ChartsCode>;
}
