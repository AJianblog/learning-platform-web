/**
 * 分页结果
 */
export interface PageResult<T> {
  /**
   * 总条数
   */
  total: number;
  /**
   * 页条数
   */
  size: number;
  /**
   * 当前页数
   */
  current: number;
  /**
   * 数据
   */
  records: T[];
}
