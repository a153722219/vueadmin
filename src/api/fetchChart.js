import request from '@/utils/request'

export default function fetchChart() {
  return request({
    url: '/api/admin/info',
    method: 'get',
    params: {
    }
  })
}

