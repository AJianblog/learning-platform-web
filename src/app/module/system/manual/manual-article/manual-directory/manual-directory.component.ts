import { Component, OnInit } from '@angular/core';
import { NzTreeNode, NzTreeNodeOptions } from "ng-zorro-antd/core/tree";
import { NzFormatEmitEvent } from "ng-zorro-antd/tree";
import { NzContextMenuService, NzDropdownMenuComponent } from "ng-zorro-antd/dropdown";
import { ManualDirectoryService } from "../../../../../@core/article/service/manual-directory.service";
import { ManualDirectory } from "../../../../../@core/article/entity/ManualDirectory";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ModifyManualDirectoryComponent } from "../modify-manual-directory/modify-manual-directory.component";
import { getFitWidth } from "../../../../../utils/drawerWidth";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
  selector: 'app-manual-directory',
  templateUrl: './manual-directory.component.html',
  styleUrls: ['./manual-directory.component.scss']
})
export class ManualDirectoryComponent implements OnInit {

  activatedNode?: NzTreeNode;
  nodes: NzTreeNodeOptions[] = [];

  manualId: string = '';

  constructor(private nzContextMenuService: NzContextMenuService,
              private manualDirectoryService: ManualDirectoryService,
              private drawerService: NzDrawerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params: Params) => {
      this.manualId = params.get('manualId')
      this.selectByManualId(this.manualId);
    })
  }

  openFolder(data: NzTreeNode | NzFormatEmitEvent): void {
    if (data instanceof NzTreeNode) {
      data.isExpanded = !data.isExpanded;
      data.icon = data.isExpanded ? 'folder-open' : 'folder'
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
    this.drawerService.create<ModifyManualDirectoryComponent>({
      nzTitle: '创建手册目录',
      nzMaskClosable: false,
      nzWidth: getFitWidth(),
      nzContent: ModifyManualDirectoryComponent,
      nzContentParams: {
        parentManualDirectoryIds: parentManualDirectoryIds,
        manualId: this.manualId
      }
    })
  }

  addManualMenu(manualMenu: ManualDirectory) {
    this.manualDirectoryService.addManualDirectory(manualMenu).subscribe(data => {
      console.log(data);
    })
  }

  selectByManualId(manualId: string) {
    this.manualDirectoryService.selectByManualId(manualId).subscribe(data => {
      this.nodes = data.map((item: ManualDirectory) => {
        return {
          ...item,
          title: item.manualMenuName,
          key: item.manualDirectoryId,
          icon: 'folder'
        }
      })
    })
  }

}
