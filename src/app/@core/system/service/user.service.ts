import {Observable} from 'rxjs';
import { ResponseResult } from "../../common/entity/ResponseResult";
import { User } from "../entity/User";
import { PageParam } from "../../common/entity/PageParam";
import { PageResult } from "../../common/entity/PageResult";

export abstract class UserService {
  /**
   * 用户登录
   */
  abstract login(login: { account: string, password: string }): Observable<User>;

  /**
   * 退出登陆
   */
  abstract loginOut(): Observable<any>;

  /**
   * 用户注册
   * @param register 注册信息
   */
  abstract register(register: { account: string, password: string }): Observable<ResponseResult<User>>;

  /**
   * 通过用户的昵称查询用户的信息
   * @param nickName 用户昵称
   */
  abstract findUserByNickname(nickName: string): Observable<ResponseResult<User>>;

  /**
   * 发送邮箱验证码
   * @param email 邮箱地址
   */
  abstract sendRegisterCode(email: string): Observable<ResponseResult<any>>;

  /**
   * 腾讯防水墙验证
   * @param ticket 验证码客户端验证回调的票据
   * @param rand 验证码客户端验证回调的随机串
   */
  abstract verifyTicket(ticket: string, rand: string): Observable<ResponseResult<any>>;

  /**
   * 创建用户
   * @param user 用户信息
   */
  abstract createUser(user: User): Observable<ResponseResult<User>>;
  /**
   * 用户分页
   * @param pageParam 分页条件
   */
  abstract userPage(pageParam: PageParam<User>): Observable<PageResult<User>>;

}
