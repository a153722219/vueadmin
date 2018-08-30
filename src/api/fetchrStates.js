import request from '@/utils/request'

export default function fetchrStates(par) {
  return request({
    url: '/api/dev/state/realtime',
    method: 'get',
    params:{
      par
    }
  })
}
