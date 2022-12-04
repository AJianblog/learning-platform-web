import { Component, OnInit } from '@angular/core';
import { Button } from "core/lib/entity/Button";
import { BaseColumn } from "table-render/lib/entity/BaseColumn";
import { TableColumnEnum, TableConfig } from "table-render";
import { OperatorColumn } from "table-render/lib/entity/OperatorColumn";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ManualModifyComponent } from "./manual-modify/manual-modify.component";
import { ManualService } from "../../../@core/article/service/ManualService";
import { Manual } from "../../../@core/article/entity/Manual";
import { PageResult } from "../../../@core/common/entity/PageResult";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: 'app-manual',
  templateUrl: './manual.component.html',
  styleUrls: ['./manual.component.scss']
})
export class ManualComponent implements OnInit {

  tools: Button[] = [
    {
      name: '新增',
      key: 'add'
    }
  ]

  columns: BaseColumn[] = [
    {
      title: '手册名称',
      key: 'manualName',
      type: 'string',
      component: TableColumnEnum.TEXT
    },
    {
      title: '描述',
      key: 'description',
      type: 'string',
      component: TableColumnEnum.TEXT
    },
    {
      title: '操作',
      key: 'operator',
      type: 'string',
      component: TableColumnEnum.OPERATOR,
      operators: [
        {
          key: 'edit',
          name: '编辑'
        },
        {
          key: 'delete',
          name: '删除'
        }
      ]
    } as OperatorColumn
  ]

  tableConfig: TableConfig = {
    data: [],
    total: 0,
    pageIndex: 1,
    pageSize: 20,
    showSizeChanger: true
  }

  constructor(private drawerService: NzDrawerService,
              private manualService: ManualService,
              private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.page();
  }

  toolClick(button: Button) {
    if (button.key === 'add') {
      this.addManual()
    }
  }

  addManual() {
    const drawerRef = this.drawerService.create<ManualModifyComponent, { manual: any }, any>({
      nzTitle: '新增',
      nzContent: ManualModifyComponent,
      nzMaskClosable: false,
      nzWidth: '45%'
    });
    drawerRef.afterClose.subscribe((data) => {
      if (data) {
        this.page();
      }
    })
  }

  cellClick(data: any) {
    if (data.config.key === 'operator') {
      if (data.operator.key === 'edit') {
        this.updateManual(data.rowData);
      } else if (data.operator.key === 'delete') {
        this.deleteManual(data.rowData)
      }
    }
  }

  deleteManual(manual: Manual) {
    this.modalService.create({
      nzTitle: '删除提示',
      nzContent: `是否要删除${manual.manualName}`,
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.manualService.deleteManualById(manual.manualId).subscribe(() => {
            this.page();
            resolve()
          }, () => {
            reject()
          })
        })
      }
    })
  }

  updateManual(manual: Manual) {
    const drawerRef = this.drawerService.create<ManualModifyComponent, { manual: Manual }, any>({
      nzTitle: '编辑',
      nzContent: ManualModifyComponent,
      nzMaskClosable: false,
      nzWidth: '45%',
      nzContentParams: {
        manual: manual
      }
    })
    drawerRef.afterClose.subscribe((data: any) => {
      if (data) {
        this.page();
      }
    })
  }

  page() {
    this.manualService.page({
      pageSize: this.tableConfig.pageSize,
      currentPage: this.tableConfig.pageIndex,
      param: {} as any
    }).subscribe((data: PageResult<Manual>) => {
      this.tableConfig.data = data.records;
      this.tableConfig.total = data.total;
    })
  }

}
