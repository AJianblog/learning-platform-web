import { Component, OnInit } from '@angular/core';
import { ArticleTag } from "../../../@core/article/entity/ArticleTag";
import { ArticleTypeService } from "../../../@core/article/service/article-type.service";
import { ArticleType } from "../../../@core/article/entity/ArticleType";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ArticleTagInfoComponent } from "./article-tag-info/article-tag-info.component";
import { ArticleTagService } from "../../../@core/article/service/article-tag.service";
import { PageResult } from "../../../@core/common/entity/PageResult";
import { NzModalService } from "ng-zorro-antd/modal";
import { BaseColumn } from "table-render/lib/entity/BaseColumn";
import { TableColumnEnum, TableConfig } from "table-render";
import { OperatorColumn } from "table-render/lib/entity/OperatorColumn";
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { Button } from "core/lib/entity/Button";
import { TABLE_SCROLL_X } from "../../../utils/constant";
import { getFitWidth } from "../../../utils/drawerWidth";

@Component({
  selector: 'app-tag-type',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.scss']
})
export class ArticleTagComponent implements OnInit {
  tools: Button[] = [
    {
      name: '新增',
      key: 'add'
    }
  ]

  columns: BaseColumn[] = [
    {
      title: '标签名称',
      key: 'articleTagName',
      type: 'string',
      component: TableColumnEnum.TEXT
    },
    {
      key: 'articleTypeId',
      title: '分类名称',
      type: 'string',
      component: TableColumnEnum.TEXT,
      formatter: (articleTypeId: string) => {
        const articleType = this.articleType.find(item => item.articleTypeId === articleTypeId);
        return articleType && articleType.articleTypeName || '-'
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
          name: '编辑',
          key: 'edit'
        },
        {
          name: '删除',
          key: 'delete'
        }
      ]
    } as OperatorColumn
  ];

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

  articleType: ArticleType[] = []


  constructor(private articleTypeService: ArticleTypeService,
              private drawerService: NzDrawerService,
              private articleTagService: ArticleTagService,
              private modalService: NzModalService,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params: ParamMap) => {
      debugger
      this.tableConfig.pageSize = Number(params.get('pageSize')) || 20;
      this.tableConfig.pageIndex = Number(params.get('pageIndex')) || 1;
      this.page();
    })
  }

  ngOnInit(): void {
    this.findAllArticleType();
  }

  toolsClickEvent(button: Button) {
    if (button.key === 'add') {
      this.articleTagDrawer('创建文章标签')
    }
  }

  findAllArticleType() {
    this.articleTypeService.findAllArticleType().subscribe((data: ArticleType[]) => {
      this.articleType = data;
    })
  }

  cellClick(data: any) {
    if (data.operator.key === 'delete') {
      this.delete(data.rowData);
    } else if (data.operator.key === 'edit') {
      this.articleTagDrawer('编辑文章分类', data.rowData);
    }
  }

  page() {
    this.articleTagService.page({
      currentPage: this.tableConfig.pageIndex,
      pageSize: this.tableConfig.pageSize,
      param: {
        articleTagName: ''
      } as any
    }).subscribe((data: PageResult<ArticleTag>) => {
      this.tableConfig.data = data.records;
      this.tableConfig.total = data.total;
    })
  }

  /**
   * 创建文章标签抽屉
   */
  articleTagDrawer(title: string, articleTag?: ArticleTag) {
    const drawerRef = this.drawerService.create<ArticleTagInfoComponent, {
      articleType: ArticleType[],
      articleTag: ArticleTag
    }, ArticleTag>({
      nzTitle: title,
      nzContent: ArticleTagInfoComponent,
      nzWidth: getFitWidth(),
      nzContentParams: {
        articleType: this.articleType,
        articleTag: articleTag
      }
    })
    drawerRef.afterClose.subscribe((data: ArticleTag) => {
      if (data) {
        this.page();
      }
    })
  }

  delete(articleTag: ArticleTag) {
    this.modalService.create({
      nzTitle: '删除提示',
      nzContent: `是否要删除${articleTag.articleTagName}`,
      nzClosable: false,
      nzOnOk: () => {
        return new Promise(resolve => {
          this.articleTagService.deleteArticleTag(articleTag.articleTagId).subscribe(() => {
            this.page();
            resolve();
          })
        })
      }
    })
  }

  pageSizeChange(pageSize: number) {
    const queryParams = this.route.snapshot.queryParams
    this.router.navigate(['./'], {
      queryParams: {
        ...queryParams,
        pageSize: pageSize
      },
      relativeTo: this.route
    }).then()
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

}
