import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs";
import { UserService } from "../user.service";
import { ProxyPrefix } from "../../../common/enum/ProxyPrefix";
import { ResponseResult } from "../../../common/entity/ResponseResult";
import { User } from "../../entity/User";

@Injectable({
  providedIn: 'root'
})
export class UserImplService extends UserService {

  private url: string = `${ProxyPrefix.api}/auth`;

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 用户登录
   * @param login 登录信息
   */
  login(login: { account: string, password: string }): Observable<ResponseResult<User>> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded'
      })
    }
    return this.http.post<ResponseResult<User>>(`${this.url}/login`, `username=${login.account}&password=${login.password}`, httpOptions);
  }

  /**
   * 用户注册
   * @param register 注册信息
   */
  register(register: { account: string; password: string }): Observable<ResponseResult<User>> {
    return this.http.post<ResponseResult<User>>(`${this.url}/register`, register);
  }

  /**
   * 通过用户的昵称查询用户的信息
   * @param nickName 用户昵称
   */
  findUserByNickname(nickName: string): Observable<ResponseResult<User>> {
    return this.http.get<ResponseResult<User>>(`${this.url}/findUserByNickname/${nickName}`);
  }

  /**
   * 发送邮箱验证码
   * @param email 邮箱地址
   */
  sendRegisterCode(email: string): Observable<ResponseResult<any>> {
    return this.http.get<ResponseResult<any>>(`${this.url}/sendEmail/${email}`);
  }

  /**
   * 腾讯防水墙验证
   * @param ticket 验证码客户端验证回调的票据
   * @param rand 验证码客户端验证回调的随机串
   */
  verifyTicket(ticket: string, rand: string): Observable<ResponseResult<any>> {
    return this.http.get<ResponseResult<any>>(`${this.url}/verifyTicket/${ticket}/${rand}`);
  }
}
