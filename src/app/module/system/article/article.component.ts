import { Component, OnInit } from '@angular/core';
import { Button } from "core/lib/entity/Button";
import { BaseColumn } from "table-render/lib/entity/BaseColumn";
import { TableColumnEnum, TableConfig } from "table-render";
import { ActivatedRoute, Router } from "@angular/router";
import { ArticleService } from "../../../@core/article/service/article.service";
import { PageResult } from "../../../@core/common/entity/PageResult";
import { Article } from "../../../@core/article/entity/Article";
import * as dayjs from "dayjs";
import { OperatorColumn } from "table-render/lib/entity/OperatorColumn";
import { NzModalService } from "ng-zorro-antd/modal";
import { TABLE_SCROLL_X } from "../../../utils/constant";

@Component({
  selector: 'app-article-manager',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {

  tools: Button[] = [
    {
      name: '新增',
      key: 'add'
    }
  ]

  columns: BaseColumn[] = [
    {
      title: '文章名称',
      key: 'articleTitle',
      type: 'string',
      component: TableColumnEnum.TEXT
    },
    {
      title: '文章分类',
      key: 'articleType',
      type: 'object',
      component: TableColumnEnum.TEXT,
      formatter: (data: any) => {
        return data.articleTypeName
      }
    },
    {
      title: '文章标签',
      key: 'articleTags',
      type: 'object',
      component: TableColumnEnum.TEXT,
      formatter: (data: any[]) => {
        return data.map(item => item.articleTagName).join(', ')
      }
    },
    {
      title: '创建时间',
      key: 'createTime',
      type: 'string',
      component: TableColumnEnum.TEXT,
      formatter: (data: any) => {
        return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '最后更新时间',
      key: 'lastUpdateTime',
      type: 'string',
      component: TableColumnEnum.TEXT,
      formatter: (data: any) => {
        return dayjs(data).format('YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      title: '操作',
      key: 'operator',
      type: 'string',
      component: TableColumnEnum.OPERATOR,
      width: '160px',
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
    showSizeChanger: true,
    scroll: {
      x: TABLE_SCROLL_X
    }
  }


  constructor(private articleService: ArticleService,
              private route: ActivatedRoute,
              private router: Router,
              protected modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.page();
  }

  toolClick(button: Button) {
    if (button.key === 'add') {
      this.router.navigate(['../addArticle'], {
        relativeTo: this.route
      })
    }
  }

  page() {
    this.articleService.page({
      pageSize: this.tableConfig.pageSize,
      currentPage: this.tableConfig.pageIndex,
      param: {} as any
    }).subscribe((data: PageResult<Article>) => {
      this.tableConfig.data = data.records;
      this.tableConfig.total = data.total;
    })
  }

  cellClick(data: any) {
    // 点击的是操作列
    if (data.config.key === 'operator') {
      if (data.operator.key === 'delete') {
        this.deleteArticle(data.rowData)
      } else if (data.operator.key === 'edit') {
        this.router.navigate(['../editArticle', data.rowData.articleId], {
          relativeTo: this.route
        })
      }
    }
    console.log(data)
  }

  /**
   * 删除文章
   * @param article 文章信息
   */
  deleteArticle(article: Article) {
    this.modalService.create({
      nzTitle: '删除提示',
      nzContent: `是否要删除${article.articleTitle}`,
      nzClosable: false,
      nzOnOk: () => {
        return new Promise(resolve => {
          this.articleService.deleteById(article.articleId).subscribe(() => {
            this.page();
            resolve();
          })
        })
      }
    })
  }
}
