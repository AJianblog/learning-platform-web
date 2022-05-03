import { Component, OnInit } from '@angular/core';
import { FormField } from "form-render/lib/entity/FormField";
import { FormGroup } from "@angular/forms";
import { UserService } from "../../../../@core/system/service/user.service";
import { FormFieldEnum } from "form-render";

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  formConfig: any = {
    labelWidth: '80px'
  }

  userField: FormField[] = [
    {
      key: 'account',
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '账户名称',
      labelSpan: 3,
      labelXXl: 2
    },
    {
      key: 'password',
      component: FormFieldEnum.INPUT,
      type: 'string',
      label: '密码',
      labelSpan: 3,
      labelXXl: 2
    },
    {
      key: 'nickname',
      component: FormFieldEnum.INPUT,
      type: 'string',
      label: '昵称',
      labelSpan: 3,
      labelXXl: 2
    },
    {
      key: 'email',
      type: 'string',
      component: FormFieldEnum.INPUT,
      label: '邮箱',
      labelSpan: 3,
      labelXXl: 2
    }
  ]

  formGroup: FormGroup | undefined;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
  }

  formGroupInit(formGroup: FormGroup) {
    this.formGroup = formGroup;
  }

  saveUser() {
  }

}
