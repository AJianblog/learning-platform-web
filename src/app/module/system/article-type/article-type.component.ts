import { Component, OnInit } from '@angular/core';
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ArticleTypeInfoComponent } from "./article-type-info/article-type-info.component";
import { ArticleTypeService } from "../../../@core/article/service/article-type.service";
import { PageResult } from "../../../@core/common/entity/PageResult";
import { ArticleType } from "../../../@core/article/entity/ArticleType";
import { NzModalService } from "ng-zorro-antd/modal";
import { TableColumnEnum, TableConfig } from "table-render";
import { BaseColumn } from "table-render/lib/entity/BaseColumn";
import { OperatorColumn } from "table-render/lib/entity/OperatorColumn";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Button } from "core/lib/entity/Button";

@Component({
  selector: 'app-article-type-manager',
  templateUrl: './article-type.component.html',
  styleUrls: ['./article-type.component.scss']
})
export class ArticleTypeComponent implements OnInit {

  tools: Button[] = [
    {
      name: '新增',
      key: 'add'
    }
  ]

  tableConfig: TableConfig = {
    data: [],
    pageIndex: 1,
    total: 0,
    pageSize: 20,
    showSizeChanger: true
  }

  columns: BaseColumn[] = [
    {
      key: 'articleTypeName',
      title: '分类名称',
      type: 'string',
      component: TableColumnEnum.TEXT
    },
    {
      type: 'object',
      key: 'operator',
      title: '操作',
      width: '160px',
      component: TableColumnEnum.OPERATOR,
      operators: [
        {
          name: '编辑',
          key: 'edit'
        },
        {
          name: '删除',
          key: 'delete'
        }
      ]
    } as OperatorColumn
  ]

  constructor(private drawerService: NzDrawerService,
              private articleTypeService: ArticleTypeService,
              private modalService: NzModalService,
              private router: Router,
              private route: ActivatedRoute) {
    route.queryParamMap.subscribe((paramMap: ParamMap) => {
      this.tableConfig.pageIndex = Number(paramMap.get('pageIndex')) || 1;
      this.tableConfig.pageSize = Number(paramMap.get('pageSize')) || 20;
      this.page();
    })
  }

  ngOnInit(): void {
  }

  toolsClick(button: Button) {
    if (button.key === 'add') {
      this.articleTypeInfoDrawer('新增文章分类')
    }
  }

  cellClick(data: any) {
    if (data.operator.key === 'delete') {
      this.delete(data.rowData)
    } else if (data.operator.key === 'edit') {
      this.articleTypeInfoDrawer('编辑文章分类', data.rowData)
    }
  }

  /**
   * 创建文章分类编辑抽屉
   * @param title 抽屉名称
   * @param articleType 文章分类
   */
  articleTypeInfoDrawer(title: string, articleType?: ArticleType) {
    const drawerRef = this.drawerService.create<ArticleTypeInfoComponent, {
      articleType: ArticleType
    }, ArticleType>({
      nzTitle: title,
      nzMaskClosable: false,
      nzWidth: '45%',
      nzContent: ArticleTypeInfoComponent,
      nzContentParams: {
        articleType: articleType
      }
    })
    drawerRef.afterClose.subscribe(data => {
      if (data) {
        this.page();
      }
    })
  }

  /**
   * 分页
   */
  page() {
    this.articleTypeService.page({
      pageSize: this.tableConfig.pageSize,
      currentPage: this.tableConfig.pageIndex,
      param: {
        articleTypeName: ''
      } as ArticleType
    }).subscribe((data: PageResult<ArticleType>) => {
      this.tableConfig.data = data.records;
      this.tableConfig.total = data.total;
    })
  }

  /**
   * 删除
   * @param articleType
   */
  delete(articleType: ArticleType) {
    this.modalService.create({
      nzTitle: '删除提示',
      nzContent: `是否要删除${articleType.articleTypeName}`,
      nzClosable: false,
      nzOnOk: () => {
        return new Promise(resolve => {
          this.articleTypeService.deleteArticleType(articleType.articleTypeId).subscribe(() => {
            this.page()
            resolve()
          })
        })
      }
    })
  }

  pageIndexChange(pageIndex: number) {
    this.router.navigate(['./'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        pageIndex: pageIndex
      },
      relativeTo: this.route
    })
  }

  pageSizeChange(pageSize: number) {
    this.router.navigate(['./'], {
      queryParams: {
        ...this.route.snapshot.queryParams,
        pageSize: pageSize
      },
      relativeTo: this.route
    })
  }

}
