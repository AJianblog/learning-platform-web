import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ResumeScene } from "./model/resumeScene";

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  styleUrls: ['./resume.component.scss']
})
export class ResumeComponent implements OnInit, AfterViewInit {

  @ViewChild("canvasElement", { static: true })
  canvasElement: ElementRef | undefined;

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    new ResumeScene({
      $canvas: this.canvasElement?.nativeElement,
      useComposer: true
    })
  }



}
