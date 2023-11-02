import { Component, Input, OnInit } from '@angular/core';
import { FormField } from "form-render/lib/entity/FormField";
import { FormFieldEnum } from "form-render";
import { TreeSelectFormField } from "form-render/lib/entity/TreeSelectFormField";
import { NzTreeNodeOptions } from "ng-zorro-antd/tree";
import { ManualDirectoryService } from "../../../../../@core/article/service/manual-directory.service";
import { ManualDirectory } from "../../../../../@core/article/entity/ManualDirectory";
import { FormGroup } from "@angular/forms";
import { NzDrawerRef } from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-modify-manual-directory',
  templateUrl: './modify-manual-directory.component.html',
  styleUrls: ['./modify-manual-directory.component.scss']
})
export class ModifyManualDirectoryComponent implements OnInit {

  formFields: FormField[] = [
    {
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '手册目录名称',
      key: 'manualMenuName',
      labelSpan: 3
    },
    {
      type: 'string',
      component: FormFieldEnum.TREE_SELECT,
      label: '父目录',
      key: 'parentManualDirectoryId',
      labelSpan: 3,
      treeSelectNodes: []
    } as TreeSelectFormField,
    {
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '目录顺序',
      key: 'sort',
      labelSpan: 3
    }
  ];

  formGroup: FormGroup | undefined;

  @Input()
  manualId: string = '';

  @Input()
  set parentManualDirectoryIds(parentManualDirectoryIds: NzTreeNodeOptions[]) {
    const field: TreeSelectFormField | undefined = this.formFields.find(item => item.key === 'parentManualDirectoryId');
    if (field) {
      field.treeSelectNodes = parentManualDirectoryIds;
    }
  }


  saveLoading: boolean = false;

  constructor(private manualDirectoryService: ManualDirectoryService,
              private drawerRef: NzDrawerRef) {
  }

  ngOnInit(): void {
  }

  formGroupInit(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  close() {
    this.drawerRef.close();
  }

  save() {
    this.saveLoading = true
    const data: ManualDirectory = this.formGroup?.value;
    data.sort = Number(data.sort);
    data.manualId = this.manualId;
    this.manualDirectoryService.addManualDirectory(data).subscribe({
      next: (manualDirectory: ManualDirectory) => {
        this.drawerRef.close(manualDirectory);
      },
      error: () => {
        this.saveLoading = false
      }
    })
  }

}
