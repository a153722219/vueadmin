import request from '@/utils/request'

export function fetchDevList(pno,limit) {
  return request({
    url: '/api/admin/dev/list',
    method: 'get',
    params:{
      pno,
      limit
    }
  })
}
