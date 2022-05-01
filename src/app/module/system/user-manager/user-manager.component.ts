import { Component, OnInit } from '@angular/core';
import { PaginationTableConfig } from "dynamic-table/lib/entity/paginationTableConfig";
import { ColumnTypeEnum } from "dynamic-table";
import { UserService } from "../../../@core/system/service/user.service";
import { User } from "../../../@core/system/entity/User";
import { PageParam } from "../../../@core/common/entity/PageParam";
import { Button } from "dynamic-table/lib/entity/Button";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { UserEditComponent } from "./user-edit/user-edit.component";

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.scss']
})
export class UserManagerComponent implements OnInit {

  config: PaginationTableConfig = {
    toolsConfig: {
      title: '查询结果',
      tools: [
        {
          name: '创建用户',
          key: 'createUser'
        }
      ]
    },
    tableConfig: {
      dataSource: [],
      columns: [
        {
          key: 'username',
          name: '用户名',
          type: ColumnTypeEnum.textCell
        },
        {
          type: ColumnTypeEnum.textCell,
          key: 'nickname',
          name: '昵称'
        },
        {
          type: ColumnTypeEnum.textCell,
          key: 'email',
          name: '邮箱'
        },
        {
          type: ColumnTypeEnum.textCell,
          key: 'emailStatus',
          name: '邮箱状态'
        },
        {
          type: ColumnTypeEnum.textCell,
          key: 'freezeStatus',
          name: '冻结状态'
        },
        {
          type: ColumnTypeEnum.operatorCell,
          key: 'operator',
          name: '操作',
          operators: [
            {
              name: '编辑'
            },
            {
              name: '删除'
            }
          ]
        }
      ]
    }
  }

  constructor(private userService: UserService, private drawerService: NzDrawerService) {
  }

  ngOnInit(): void {
    this.userPage();
  }

  userPage() {
    const param: PageParam<User> = {
      pageSize: 10,
      currentPage: 1,
      param: {} as User
    }
    this.userService.userPage(param).subscribe(res => {
      this.config.tableConfig.dataSource = res.records
    })
  }

  toolsClickEvent(data: Button) {
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

}
