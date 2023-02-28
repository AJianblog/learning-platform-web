import { ManualDirectory } from "../entity/ManualDirectory";
import { Observable } from "rxjs";

export abstract class ManualDirectoryService {
  abstract addManualDirectory(manualMenu: ManualDirectory): Observable<ManualDirectory>;
}
