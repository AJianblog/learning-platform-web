export class ResponseResult<T> {
  /**
   * 返回的状态码
   */
  code: number;
  /**
   * 返回的消息
   */
  message: string;
  /**
   * 返回的数据
   */
  data: T;


  constructor(code: number, message: string, data: T) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}
