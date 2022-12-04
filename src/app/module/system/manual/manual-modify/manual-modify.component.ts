import { Component, Input, OnInit } from '@angular/core';
import { FormField } from "form-render/lib/entity/FormField";
import { FormFieldEnum } from "form-render";
import { FormGroup } from "@angular/forms";
import { ManualService } from "../../../../@core/article/service/ManualService";
import { Manual } from "../../../../@core/article/entity/Manual";
import { NzDrawerRef } from "ng-zorro-antd/drawer";

@Component({
  selector: 'app-manual-modify',
  templateUrl: './manual-modify.component.html',
  styleUrls: ['./manual-modify.component.scss']
})
export class ManualModifyComponent implements OnInit {

  formGroup: FormGroup | undefined;

  formFields: FormField[] = [
    {
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '手册名称',
      key: 'manualName'
    },
    {
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '描述',
      key: 'description'
    }
  ];

  saveLoading: boolean = false;

  @Input()
  manual: Manual | undefined;

  constructor(private manualService: ManualService, private drawerRef: NzDrawerRef) { }

  ngOnInit(): void {
  }

  formGroupInit(formGroup: FormGroup) {
    this.formGroup = formGroup;
    if (this.manual) {
      this.formGroup.patchValue(this.manual);
    }
  }

  save() {
    this.saveLoading = true
    if (this.manual) {
      this.manualService.updateManual({
        ...this.manual,
        ...this.formGroup?.value
      }).subscribe((manual: Manual) => {
        this.drawerRef.close(manual);
      }, () => {
        this.saveLoading = false;
      })
    } else {
      this.manualService.addManual(this.formGroup?.value).subscribe((manual: Manual) => {
        this.drawerRef.close(manual);
      }, () => {
        this.saveLoading = false;
      })
    }
  }

  close() {
    this.drawerRef.close()
  }

}
