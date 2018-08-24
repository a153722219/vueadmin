import request from '@/utils/request'

export function fetchOnlineTime(params) {
  return request({
    url: '/api/admin/info2',
    method: 'get',
    params
  })
}
