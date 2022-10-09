import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-toc-menu',
  templateUrl: './toc-menu.component.html',
  styleUrls: ['./toc-menu.component.scss']
})
export class TocMenuComponent implements OnInit {

  @Input()
  tocMenu: any[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  tocScrollTo(select: string) {
    const doc: any = document.querySelector(`.toc-${select}`)
    if (!doc) {
      return
    }
    debugger
    document.documentElement.scrollTo({
      top: doc.offsetTop - 60,
      behavior: 'smooth' // 让滚动更丝滑
    })
  }

}
