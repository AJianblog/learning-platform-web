import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../@core/system/service/user.service";
import { setToken, setUserId } from "../../utils/localStorageMessage";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  /**
   * 登录表单控件
   */
  loginFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.loginFormGroup = this.fb.group({
      account: [null, Validators.compose([Validators.required])],
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
    this.userService.login(this.loginFormGroup.value).subscribe(data => {
      console.log(data)
      setToken(data.data.token);;
      setUserId(data.data.userId);
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
    return this.account.hasError('required') ? '输入不能为空' :
      '';
  }

  get account(): FormControl {
    return this.loginFormGroup.get('account') as FormControl;
  }

  get password(): FormControl {
    return this.loginFormGroup.get('password') as FormControl;
  }
}
