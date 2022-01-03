import { ModuleWithProviders, NgModule } from "@angular/core";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzMenuModule } from "ng-zorro-antd/menu";
import { NzTreeViewModule } from "ng-zorro-antd/tree-view";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzTreeModule } from "ng-zorro-antd/tree";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzDescriptionsModule } from "ng-zorro-antd/descriptions";
import { NzEmptyModule } from "ng-zorro-antd/empty";
import { NzDrawerModule } from "ng-zorro-antd/drawer";
import { NzModalModule } from "ng-zorro-antd/modal";

const zorroModule = [
  NzButtonModule,
  NzMenuModule,
  NzTreeViewModule,
  NzIconModule,
  NzTreeModule,
  NzDropDownModule,
  NzDescriptionsModule,
  NzEmptyModule,
  NzDrawerModule,
  NzModalModule
]

@NgModule({
  declarations: [],
  imports: [
    ...zorroModule
  ],
  exports: [
    ...zorroModule
  ]
})
export class ZorroModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: ZorroModule,
      providers: []
    }
  }
}
