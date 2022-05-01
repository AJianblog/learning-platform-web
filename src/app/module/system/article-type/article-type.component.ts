import { Component, OnInit } from '@angular/core';
import { PaginationTableConfig } from "dynamic-table/lib/entity/paginationTableConfig";
import { ColumnTypeEnum } from "dynamic-table";
import { Button } from "dynamic-table/lib/entity/Button";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ArticleTypeInfoComponent } from "./article-type-info/article-type-info.component";
import { ArticleTypeService } from "../../../@core/article/service/article-type.service";
import { PageResult } from "../../../@core/common/entity/PageResult";
import { ArticleType } from "../../../@core/article/entity/ArticleType";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: 'app-article-type-manager',
  templateUrl: './article-type.component.html',
  styleUrls: ['./article-type.component.scss']
})
export class ArticleTypeComponent implements OnInit {

  config: PaginationTableConfig = {
    toolsConfig: {
      title: '查询结果',
      tools: [
        {
          name: '新增',
          key: 'add'
        }
      ]
    },
    tableConfig: {
      dataSource: [],
      columns: [
        {
          key: 'articleTypeName',
          name: '文章分类名称',
          type: ColumnTypeEnum.textCell
        },
        {
          type: ColumnTypeEnum.operatorCell,
          key: 'operator',
          name: '操作',
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
        }
      ]
    }
  }

  constructor(private drawerService: NzDrawerService,
              private articleTypeService: ArticleTypeService,
              private modalService: NzModalService) { }

  ngOnInit(): void {
    this.page();
  }

  toolsClickEvent(button: Button) {
    if (button.key === 'add') {
      this.articleTypeInfoDrawer('新增文章分类')
    }
  }

  tableClickEvent(data: any) {
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
      pageSize: 20,
      currentPage: 1,
      param: {
        articleTypeName: ''
      } as ArticleType
    }).subscribe((data: PageResult<ArticleType>) => {
      this.config.tableConfig.dataSource = data.records;
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

}
