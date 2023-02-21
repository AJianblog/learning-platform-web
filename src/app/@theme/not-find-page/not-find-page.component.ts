import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-not-find-page',
  templateUrl: './not-find-page.component.html',
  styleUrls: ['./not-find-page.component.scss']
})
export class NotFindPageComponent implements OnInit {

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  backHome() {
    this.router.navigate(['/']).then(() => {
    })
  }

}
