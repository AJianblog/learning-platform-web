import { Component, Input, OnInit } from '@angular/core';
import { EventCellColumn } from "../entity/eventCellColumn";

@Component({
  selector: 'app-event-cell',
  templateUrl: './event-cell.component.html',
  styleUrls: ['./event-cell.component.scss']
})
export class EventCellComponent implements OnInit {

  @Input()
  config: EventCellColumn | undefined;

  constructor() { }

  ngOnInit(): void {
  }

  get showValue(): string | number | boolean {
    if (this.config?.formatter instanceof Function) {
      return this.config.formatter(this.config.value, this.config.row);
    }
    return this.config?.value === undefined ? '-' : this.config.value;
  }

  clickHandle() {
    if (this.config?.clickEvent instanceof Function) {
      this.config.clickEvent(this.config?.value)
    }
  }

}
