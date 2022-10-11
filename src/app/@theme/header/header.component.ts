import { Component, OnInit } from '@angular/core';
import { getUserInfo, tokenIsExpire } from "../../utils/localStorageMessage";
import { Router } from "@angular/router";
import { UserService } from "../../@core/system/service/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  get isLogin() {
    return tokenIsExpire();
  }

  loginOut() {
    this.userService.loginOut().subscribe(() => {
      localStorage.clear()
      this.router.navigate(['/login'])
    })
  }

  get nickName() {
    return getUserInfo()?.nickname
  }

}
