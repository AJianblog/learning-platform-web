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


const SERVICE = [
  { provide: UserService, useClass: UserImplService },
  { provide: MenuService, useClass: MenuServiceImpl },
  { provide: ArticleTypeService, useClass: ArticleTypeImplService },
  { provide: ArticleTagService, useClass: ArticleTagImplService },
  { provide: ArticleService, useClass: ArticleImplService },
  { provide: ManualService, useClass: ManualImplService }
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
