//身份验证
import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken():string | undefined {
  console.log('this is init token:',Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token:any) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
