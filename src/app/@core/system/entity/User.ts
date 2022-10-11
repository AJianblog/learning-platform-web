/**
 * 用户实体
 * @author 何志坚
 */
export interface User {
  /**
   * 用户id
   */
  userId: string;

  /**
   * 账户名称
   */
  account: string;

  /**
   * 密码
   */
  password: string;

  /**
   * 昵称
   */
  nickname: string;

  token: string;

  /**
   * token过期时间撮，为秒
   */
  exp: number;

  /**
   * token创建时间撮，为秒
   */
  iat: number;

}
