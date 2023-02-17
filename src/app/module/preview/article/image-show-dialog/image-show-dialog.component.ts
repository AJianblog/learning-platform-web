import { Component, Input, OnInit } from '@angular/core';
import { NzModalRef } from "ng-zorro-antd/modal";

@Component({
  selector: 'app-image-show-dialog',
  templateUrl: './image-show-dialog.component.html',
  styleUrls: ['./image-show-dialog.component.scss']
})
export class ImageShowDialogComponent implements OnInit {

  @Input()
  imageUrl: string | undefined;

  constructor(protected modal: NzModalRef) { }

  ngOnInit(): void {
  }

  closeDialog() {
    this.modal.destroy();
  }

}
