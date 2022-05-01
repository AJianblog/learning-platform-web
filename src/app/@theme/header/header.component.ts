import { Component, OnInit } from '@angular/core';
import { getToken, getUserInfo } from "../../utils/localStorageMessage";
import { Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  get isLogin() {
    return !!getToken()
  }

  loginOut() {
    localStorage.clear()
    this.router.navigate(['/login'])
  }

  get nickName() {
    return getUserInfo()?.nickname
  }

}
