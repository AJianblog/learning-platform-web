import { ModuleWithProviders, NgModule, Optional, SkipSelf } from "@angular/core";
import { UserService } from "./system/service/user.service";
import { UserImplService } from "./system/service/impl/user.impl.service";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import { LoadSvgResource } from "../utils/loadSvgResource";
import { MenuServiceImpl } from "./system/service/impl/menu.service.impl";
import { MenuService } from "./system/service/menu.service";
import { ArticleTypeService } from "./article/service/article-type.service";
import { ArticleTypeImplService } from "./article/service/impl/article-type-impl.service";
import { ArticleTagService } from "./article/service/article-tag.service";
import { ArticleTagImplService } from "./article/service/impl/article-tag-impl.service";
import { ArticleService } from "./article/service/article.service";
import { ArticleImplService } from "./article/service/impl/article-impl.service";
import { ManualService } from "./article/service/ManualService";
import { ManualImplService } from "./article/service/impl/manual-impl.service";
import { DynamicComponentService } from "core";
import { EventCellComponent } from './table-column-components/event-cell/event-cell.component';
import { ManualDirectoryService } from "./article/service/manual-directory.service";
import { ManualDirectoryImplService } from "./article/service/impl/manual-directory-impl.service";
import { ChartsService } from "./charts/service/charts.service";
import { ChartsImplService } from "./charts/service/impl/charts-impl.service";
import { ChartsCodeService } from "./charts/service/charts-code.service";
import { ChartsCodeImplService } from "./charts/service/impl/charts-code-impl.service";
import { AjaxService } from "./charts/service/AjaxService";
import { AjaxImplService } from "./charts/service/impl/ajax-impl.service";


const SERVICE = [
  { provide: UserService, useClass: UserImplService },
  { provide: MenuService, useClass: MenuServiceImpl },
  { provide: ArticleTypeService, useClass: ArticleTypeImplService },
  { provide: ArticleTagService, useClass: ArticleTagImplService },
  { provide: ArticleService, useClass: ArticleImplService },
  { provide: ManualService, useClass: ManualImplService },
  { provide: ManualDirectoryService, useClass: ManualDirectoryImplService },
  { provide: ChartsService, useClass: ChartsImplService },
  { provide: ChartsCodeService, useClass: ChartsCodeImplService },
  { provide: AjaxService, useClass: AjaxImplService }
]

const DYNAMIC_COMPONENT = [
  { name: 'EventCellComponent', component: EventCellComponent }
]

@NgModule({
  declarations: [
    EventCellComponent
  ],
  imports: [],
  exports: [
    EventCellComponent
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private dynamicComponentService: DynamicComponentService) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
    dynamicComponentService.registerComponent(DYNAMIC_COMPONENT)
    LoadSvgResource(matIconRegistry, domSanitizer);
  }

  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        ...SERVICE
      ]
    }
  }
}
