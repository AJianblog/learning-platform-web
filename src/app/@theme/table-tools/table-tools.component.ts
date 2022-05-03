import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from "core/lib/entity/Button";

@Component({
  selector: 'app-table-tools',
  templateUrl: './table-tools.component.html',
  styleUrls: ['./table-tools.component.scss']
})
export class TableToolsComponent implements OnInit {
  @Input()
  title: string | undefined;

  @Input()
  tools: Button[] = []

  @Output()
  toolClick: EventEmitter<any> = new EventEmitter<any>();


  constructor() {
  }

  ngOnInit(): void {
  }

  clickHandle(button: Button) {
    this.toolClick.emit(button);
  }

}
