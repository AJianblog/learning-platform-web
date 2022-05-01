import { Component, Input, OnInit } from '@angular/core';
import { FormField } from "form-render/lib/entity/FormField";
import { TreeSelectFormField } from "form-render/lib/entity/TreeSelectFormField";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { NzTreeNode } from "ng-zorro-antd/core/tree";
import { FormGroup } from "@angular/forms";
import { MenuService } from "../../../../@core/system/service/menu.service";
import { NzDrawerRef } from "ng-zorro-antd/drawer";
import { Menu } from "../../../../@core/system/entity/menu";
import { SelectField } from "form-render/lib/entity/SelectField";
import { FormFieldEnum } from "form-render";

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
    const parentMenu: TreeSelectFormField | undefined = this.menuField.find(item => item.key === 'parentMenuId')
    if (parentMenu) {
      parentMenu.treeSelectNodes = treeSelectNodes;
    }
  }

  @Input()
  menuInfo: Menu | undefined;

  formGroup: FormGroup | undefined;

  menuField: FormField[] = [
    {
      key: 'menuName',
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '菜单名称'
    },
    {
      key: 'code',
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '菜单标识'
    },
    {
      key: 'url',
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '菜单url'
    },
    {
      key: 'regexpUrl',
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '菜单匹配规则'
    },
    {
      key: 'type',
      component: FormFieldEnum.SELECT,
      type: 'string',
      label: '菜单类型',
      options: [
        {
          label: 'url',
          value: 'url'
        }
      ],
      nzSpan: 24
    } as SelectField,
    {
      key: 'position',
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '菜单顺序'
    },
    {
      key: 'parentMenuId',
      type: 'string',
      component: FormFieldEnum.TREE_SELECT,
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
      }).subscribe(() => {
        this.close()
      })
    } else {
      this.menuService.addMenu(this.formGroup?.value).subscribe(() => {
        this.close()
      })
    }
  }

  close() {
    this.nzDrawerRef.close({
      type: 'handleOk'
    })
  }

}
