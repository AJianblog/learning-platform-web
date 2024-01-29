import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { UserService } from "../../@core/system/service/user.service";
import { setToken } from "../../utils/localStorageMessage";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * 登录表单控件
   */
  loginFormGroup: UntypedFormGroup;

  loginButtonLoading: boolean = false;

  constructor(private fb: UntypedFormBuilder, private userService: UserService, private router: Router) {
    this.loginFormGroup = this.fb.group({
      account: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit(): void {
  }

  /**
   * 用户登录
   */
  userLogin() {
    if (this.loginFormGroup.invalid) {
      return;
    }
    this.loginButtonLoading = true
    this.userService.login(this.loginFormGroup.value).subscribe(data => {
      setToken(data.token);
      this.router.navigate(['/'])
      this.loginButtonLoading = false;
    }, (err) => {
      this.loginButtonLoading = false;
      console.error(err)
    });
  }

  /**
   * 得到登录的错误信息
   */
  getPasswordErrorMessage() {
    return this.password.hasError('required') ? '输入不能为空' :
      '';
  }

  /**
   * 得到登录账户的错误信息
   */
  getAccountErrorMessage() {
    if (this.account.hasError('required')) {
      return '输入不能为空'
    } else if (this.account.hasError('email')) {
      return '请输入正确的邮箱格式'
    }
    return ''
  }

  get account(): UntypedFormControl {
    return this.loginFormGroup.get('account') as UntypedFormControl;
  }

  get password(): UntypedFormControl {
    return this.loginFormGroup.get('password') as UntypedFormControl;
  }
}
