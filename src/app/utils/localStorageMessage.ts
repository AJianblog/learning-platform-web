import { User } from "../@core/system/entity/User";
import { Base64 } from "js-base64";

const TOKEN = 'token';

/**
 *  设置token信息
 * @param value token值
 */
export function setToken(value: string) {
  localStorage.setItem(TOKEN, value);
}

/**
 * 移除token信息
 */
export function removeToken() {
  localStorage.removeItem(TOKEN);
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN);
}

/**
 * 得到用户信息
 */
export function getUserInfo(): User | null {
  const token: string = getToken() || '';
  const userStr = Base64.decode(token?.split('.')[1] || '')
  try {
    if (userStr) {
      return JSON.parse(userStr) as User
    }
  } catch (err) {
    console.error(err)
  }
  return null
}

/**
 * token是否失效
 * @return true: 未失效， false: 已经失效
 */
export function tokenIsExpire(): boolean {
  const userInfo: User = getUserInfo() || ({ iat: 0, exp: 0 } as any);
  const currentTime = new Date().getTime();
  return currentTime >= new Date(userInfo.iat * 1000).getTime() && currentTime <= new Date(userInfo.exp * 1000).getTime();
}
