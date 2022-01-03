import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";

export const LoadSvgResource = (matIconRegistry: MatIconRegistry, domSanitizer: DomSanitizer) => {
  const baseUrl = 'assets/svg';
  // 菜单
  matIconRegistry.addSvgIcon('menu', domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}/menu.svg`));
  // 系统管理
  matIconRegistry.addSvgIcon('systemManager', domSanitizer.bypassSecurityTrustResourceUrl(`${baseUrl}/systemManager.svg`));
}
