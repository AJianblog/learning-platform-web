/**
 * 分页参数
 */
export class PageParam<T> {
  /**
   * 页条数
   */
  pageSize: number;
  /**
   * 当前页数
   */
  currentPage: number;
  /**
   * 查询条件
   */
  param: T;


  constructor(pageSize: number, currentPage: number, param: T) {
    this.pageSize = pageSize;
    this.currentPage = currentPage;
    this.param = param;
  }
}
