import { ManualDirectory } from "../entity/ManualDirectory";
import { Observable } from "rxjs";

export abstract class ManualDirectoryService {
  abstract addManualDirectory(manualMenu: ManualDirectory): Observable<ManualDirectory>;

  /**
   * 查询手册目录，通过手册id
   * @param manualId
   */
  abstract selectByManualId(manualId: string): Observable<ManualDirectory[]>;
}
