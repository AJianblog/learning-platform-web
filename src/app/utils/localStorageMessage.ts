const token =  'token';
const userId = 'userId';

/**
 *  设置token信息
 * @param value token值
 */
export function setToken(value: string) {
  localStorage.setItem(token, value);
}

/**
 * 移除token信息
 */
export function removeToken() {
  localStorage.removeItem(token);
}

export function getToken(): string | null {
  return localStorage.getItem(token);
}

/**
 * 设置用户id
 * @param value 用户id
 */
export function setUserId(value: string) {
  localStorage.setItem(userId, value);
}

/**
 * 移除用户id
 */
export function removeUserId() {
  localStorage.removeItem(userId);
}

