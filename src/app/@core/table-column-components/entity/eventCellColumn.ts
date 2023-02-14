import { BaseColumn } from "table-render/lib/entity/BaseColumn";

export interface EventCellColumn extends BaseColumn {
  clickEvent: Function;
}
