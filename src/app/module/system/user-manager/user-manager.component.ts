import { Component, OnInit } from '@angular/core';
import { UserService } from "../../../@core/system/service/user.service";
import { User } from "../../../@core/system/entity/User";
import { PageParam } from "../../../@core/common/entity/PageParam";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { UserEditComponent } from "./user-edit/user-edit.component";
import { BaseColumn } from "table-render/lib/entity/BaseColumn";
import { TableColumnEnum, TableConfig } from "table-render";
import { OperatorColumn } from "table-render/lib/entity/OperatorColumn";
import { Button } from "core/lib/entity/Button";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  tools: Button[] = [
    {
      name: '创建用户',
      key: 'createUser'
    }
  ]

  columns: BaseColumn[] = [
    {
      key: 'username',
      title: '用户名',
      type: 'string',
      component: TableColumnEnum.TEXT,
    },
    {
      type: 'string',
      key: 'nickname',
      title: '昵称',
      component: TableColumnEnum.TEXT
    },
    {
      type: 'string',
      key: 'email',
      title: '邮箱',
      component: TableColumnEnum.TEXT
    },
    {
      type: 'string',
      key: 'emailStatus',
      title: '邮箱状态',
      component: TableColumnEnum.TEXT,
      formatter: (value: boolean) => {
        return value ? '已绑定' : '未绑定'
      }
    },
    {
      type: 'string',
      key: 'freezeStatus',
      title: '冻结状态',
      component: TableColumnEnum.TEXT,
      formatter: (value: boolean) => {
        return value ? '已冻结' : '未冻结'
      }
    },
    {
      type: 'object',
      key: 'operator',
      title: '操作',
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
    pageSize: 20,
    pageIndex: 10,
    showSizeChanger: true
  }

  constructor(private userService: UserService,
              private drawerService: NzDrawerService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.tableConfig.pageSize = Number(paramMap.get('pageSize')) || 20;
      this.tableConfig.pageIndex = Number(paramMap.get('pageIndex')) || 1;
      this.page();
    })
  }

  page() {
    const param: PageParam<User> = {
      pageSize: this.tableConfig.pageSize,
      currentPage: this.tableConfig.pageIndex,
      param: {} as User
    }
    this.userService.userPage(param).subscribe(res => {
      this.tableConfig.data = res.records;
      this.tableConfig.total = res.total;
    })
  }

  toolsClick(data: Button) {
    switch (data.key) {
      case 'createUser':
        this.createUser(data);
        break;
    }
  }

  tableClickEvent(data: Button) {
  }

  createUser(data: any) {
    this.drawerService.create<UserEditComponent, {}, {}>({
      nzTitle: '创建用户',
      nzMaskClosable: false,
      nzWidth: '45%',
      nzContent: UserEditComponent,
      nzContentParams: {}
    })
  }

  pageIndexChange(pageIndex: number) {
    this.router.navigate(['./'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        pageIndex: pageIndex
      },
      relativeTo: this.route
    }).then()
  }

  pageSizeChange(pageSize: number) {
    this.router.navigate(['./'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        pageSize: pageSize
      },
      relativeTo: this.route
    }).then()
  }

}
