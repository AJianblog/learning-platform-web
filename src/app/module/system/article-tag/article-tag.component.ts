import { Component, OnInit } from '@angular/core';
import { PaginationTableConfig } from "dynamic-table/lib/entity/paginationTableConfig";
import { ColumnTypeEnum } from "dynamic-table";
import { Button } from "dynamic-table/lib/entity/Button";
import { ArticleTag } from "../../../@core/article/entity/ArticleTag";
import { ArticleTypeService } from "../../../@core/article/service/article-type.service";
import { ArticleType } from "../../../@core/article/entity/ArticleType";
import { NzDrawerService } from "ng-zorro-antd/drawer";
import { ArticleTagInfoComponent } from "./article-tag-info/article-tag-info.component";
import { ArticleTagService } from "../../../@core/article/service/article-tag.service";
import { PageResult } from "../../../@core/common/entity/PageResult";
import { NzModalService } from "ng-zorro-antd/modal";

@Component({
  selector: 'app-tag-type',
  templateUrl: './article-tag.component.html',
  styleUrls: ['./article-tag.component.scss']
})
export class ArticleTagComponent implements OnInit {
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
          key: 'articleTagName',
          name: '文章标签名称',
          type: ColumnTypeEnum.textCell
        },
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

  articleType: ArticleType[] = []


  constructor(private articleTypeService: ArticleTypeService,
              private drawerService: NzDrawerService,
              private articleTagService: ArticleTagService,
              private modalService: NzModalService) {
  }

  ngOnInit(): void {
    this.findAllArticleType();
    this.page();
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

  tableClickEvent(data: any) {
    if (data.operator.key === 'delete') {
      this.delete(data.rowData);
    } else if (data.operator.key === 'edit') {
      this.articleTagDrawer('编辑文章分类', data.rowData);
    }
  }

  page() {
    this.articleTagService.page({
      currentPage: 1,
      pageSize: 10,
      param: {
        articleTagName: ''
      } as any
    }).subscribe((data: PageResult<ArticleTag>) => {
      this.config.tableConfig.dataSource = data.records;
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
      nzWidth: '45%',
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

}
