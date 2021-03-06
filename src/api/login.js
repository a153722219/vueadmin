import request from '@/utils/request'

export function login(name, pwd) {
  return request({
    url: '/api/user/login/telephone',
    method: 'get',
    params: {
      name,
      pwd
    }
  })
}

export function getInfo(cookie) {
  return request({
    url: '/api/admin/user/info',
    method: 'get',
    params: { cookie }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
