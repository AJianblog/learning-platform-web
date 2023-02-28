import { Component } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from "ng-zorro-antd/core/tree";
import { NzFormatEmitEvent } from "ng-zorro-antd/tree";
import { NzContextMenuService, NzDropdownMenuComponent } from "ng-zorro-antd/dropdown";
import { ManualDirectoryService } from "../../../../../@core/article/service/manual-directory.service";
import { ManualDirectory } from "../../../../../@core/article/entity/ManualDirectory";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ModifyManualDirectoryComponent } from "../modify-manual-directory/modify-manual-directory.component";
import { getFitWidth } from "../../../../../utils/drawerWidth";

@Component({
  selector: 'app-manual-directory',
  templateUrl: './manual-directory.component.html',
  styleUrls: ['./manual-directory.component.scss']
})
export class ManualDirectoryComponent {

  activatedNode?: NzTreeNode;
  nodes: NzTreeNodeOptions[] = [];

  constructor(private nzContextMenuService: NzContextMenuService,
              private manualMenuService: ManualDirectoryService,
              private drawerService: NzDrawerService) {
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
    } else {
      const node = data.node;
      if (node) {
        node.isExpanded = !node.isExpanded;
      }
    }
  }

  activeNode(data: NzFormatEmitEvent): void {
    this.activatedNode = data.node!;
  }

  contextMenu($event: MouseEvent, menu: NzDropdownMenuComponent): void {
    this.nzContextMenuService.create($event, menu);
  }

  selectDropdown(): void {
    // do something
  }

  createManualDirectory(parentManualDirectoryId: string) {
    const parentManualDirectoryIds: NzTreeNodeOptions[] = [
      {
        title: '根目录',
        key: '0',
        isLeaf: true
      }
    ]
    parentManualDirectoryIds.push(...this.nodes)
    this.drawerService.create<ModifyManualDirectoryComponent, undefined, {
      parentManualDirectoryIds: NzTreeNodeOptions[]
    }>({
      nzTitle: '创建手册目录',
      nzMaskClosable: false,
      nzWidth: getFitWidth(),
      nzContent: ModifyManualDirectoryComponent,
      nzContentParams: {
        parentManualDirectoryIds: parentManualDirectoryIds
      }
    })
  }

  addManualMenu(manualMenu: ManualDirectory) {
    this.manualMenuService.addManualDirectory(manualMenu).subscribe(data => {
      console.log(data);
    })
  }

}
