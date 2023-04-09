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
import { getFitWidth } from "../../../utils/drawerWidth";
import dayjs from "dayjs";
import { ActivatedRoute, Router } from "@angular/router";

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
      component: TableColumnEnum.TEXT,
      class: 'manual-name'
    },
    {
      title: '描述',
      key: 'description',
      type: 'string',
      component: TableColumnEnum.TEXT
    },
    {
      title: '创建时间',
      key: 'createTime',
      type: 'string',
      component: TableColumnEnum.TEXT,
      formatter: (data: string) => {
        return dayjs(data).format('YYYY-MM:DD HH:mm:ss')
      }
    },
    {
      title: '更新时间',
      key: 'updateTime',
      type: 'string',
      component: TableColumnEnum.TEXT,
      formatter: (data: string) => {
        return dayjs(data).format('YYYY-MM:DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'operator',
      type: 'string',
      width: '160px',
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
              private modalService: NzModalService,
              private activeRoute: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.page();
  }

  toolClick(button: Button) {
    if (button.key === 'add') {
      this.addManual()
    }
  }

  jumpAddManualArticle(data: any) {
    this.router.navigate(['../manualArticle', data?.rowData?.manualId], {
      relativeTo: this.activeRoute
    }).then(() => {
    })
  }

  addManual() {
    const drawerRef = this.drawerService.create<ManualModifyComponent, { manual: any }, any>({
      nzTitle: '新增',
      nzContent: ManualModifyComponent,
      nzMaskClosable: false,
      nzWidth: getFitWidth()
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
    } else if (data.config.key === 'manualName') {
      this.jumpAddManualArticle(data);
    }
  }

  deleteManual(manual: Manual) {
    this.modalService.create({
      nzTitle: '删除提示',
      nzContent: `是否要删除${manual.manualName}`,
      nzOnOk: () => {
        return new Promise((resolve, reject) => {
          this.manualService.deleteManualById(manual.manualId).subscribe({
            next: () => {
              this.page();
              resolve()
            },
            error: () => {
              reject()
            }
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
      nzWidth: getFitWidth(),
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
