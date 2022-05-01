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


const SERVICE = [
  { provide: UserService, useClass: UserImplService },
  { provide: MenuService, useClass: MenuServiceImpl },
  { provide: ArticleTypeService, useClass: ArticleTypeImplService }
]

@NgModule({
  declarations: [],
  imports: [],
  exports: []
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    if (parentModule) {
      throw new Error('CoreModule has already been loaded. Import Core modules in the AppModule only.');
    }
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
