import cookie from "cookie_js"//引入cookie
export function getToken(){
    return cookie.get('admin_token')
}