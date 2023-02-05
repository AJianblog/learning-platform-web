import { Manual } from "../entity/Manual";
import { Observable } from "rxjs";
import { PageParam } from "../../common/entity/PageParam";
import { PageResult } from "../../common/entity/PageResult";

export abstract class ManualService {
  /**
   * 添加手册
   * @param manual
   */
  abstract addManual(manual: Manual): Observable<Manual>;

  abstract deleteManualById(manualId: string): Observable<void>;

  /**
   * 分页查询
   * @param pageParam 分页查询参数
   */
  abstract page(pageParam: PageParam<Manual>): Observable<PageResult<Manual>>;

  /**
   * 更新手册信息
   * @param manual 手册信息
   */
  abstract updateManual(manual: Manual): Observable<Manual>;
}
