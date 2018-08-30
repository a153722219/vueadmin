import request from '@/utils/request'

export default function fetchHistory(par) {
  return request({
    url: '/api/dev/state/history',
    method: 'get',
    params:{
      par
    }
  })
}
