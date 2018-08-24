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

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
