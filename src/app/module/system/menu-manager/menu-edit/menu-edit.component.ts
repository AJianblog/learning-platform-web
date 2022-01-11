import { Component, Input, OnInit } from '@angular/core';
import { FormField } from "dynamic-form/lib/entity/FormField";
import { TreeSelectFormField } from "dynamic-form/lib/entity/TreeSelectFormField";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { NzTreeNode } from "ng-zorro-antd/core/tree";
import { FormFieldTypeEnum } from "dynamic-form";
import { FormGroup } from "@angular/forms";
import { MenuService } from "../../../../@core/system/service/menu.service";
import { NzDrawerRef } from "ng-zorro-antd/drawer";
import { Menu } from "../../../../@core/system/entity/menu";

@Component({
  selector: 'app-menu-edit',
  templateUrl: './menu-edit.component.html',
  styleUrls: ['./menu-edit.component.scss']
})
export class MenuEditComponent implements OnInit {
  /**
   * 树形下拉框选项
   * @private
   */
  private treeSelectNodes: (NzTreeNode | NzTreeNodeOptions)[] = []
  formConfig: any = {
    labelWidth: '100px'
  }

  @Input()
  get nodes(): NzTreeNodeOptions[] {
    return this.treeSelectNodes;
  }
  set nodes(treeSelectNodes: NzTreeNodeOptions[]) {
    this.treeSelectNodes = treeSelectNodes;
    const parentMenu: TreeSelectFormField | undefined = this.menuField.find(item => item.name === 'parentMenuId')
    if (parentMenu) {
      parentMenu.treeSelectNodes = treeSelectNodes;
    }
  }

  @Input()
  menuInfo: Menu | undefined;

  formGroup: FormGroup | undefined;

  menuField: FormField[] = [
    {
      name: 'menuName',
      type: FormFieldTypeEnum.input,
      label: '菜单名称',
      nzSpan: 24
    },
    {
      name: 'code',
      type: FormFieldTypeEnum.input,
      label: '菜单标识',
      nzSpan: 24
    },
    {
      name: 'url',
      type: FormFieldTypeEnum.input,
      label: '菜单url',
      nzSpan: 24
    },
    {
      name: 'regexpUrl',
      type: FormFieldTypeEnum.input,
      label: '菜单匹配规则',
      nzSpan: 24
    },
    {
      name: 'type',
      type: FormFieldTypeEnum.select,
      label: '菜单类型',
      options: [
        {
          label: 'url',
          value: 'url'
        }
      ],
      nzSpan: 24
    },
    {
      name: 'position',
      type: FormFieldTypeEnum.input,
      label: '菜单顺序',
      nzSpan: 24
    },
    {
      name: 'parentMenuId',
      type: FormFieldTypeEnum.treeSelect,
      label: '上级菜单',
      nzSpan: 24,
      treeSelectNodes: []
    } as TreeSelectFormField

  ]

  constructor(private menuService: MenuService, private nzDrawerRef: NzDrawerRef) {
  }

  ngOnInit(): void {
  }

  formGroupInit(formGroup: FormGroup) {
    this.formGroup = formGroup;
    if (this.menuInfo) {
      this.formGroup.patchValue(this.menuInfo as any)
    }
  }

  saveMenu() {
    console.log(this.formGroup?.value)
    if (this.menuInfo) {
      this.menuService.updateMenu({
        ...this.menuInfo,
        ...this.formGroup?.value
      }).subscribe(res => {
        this.nzDrawerRef.close({
          type: 'handleOk'
        })
      })
    } else {
      this.menuService.addMenu(this.formGroup?.value).subscribe(res => {
        this.nzDrawerRef.close({
          type: 'handleOk'
        })
      })
    }

  }

}
