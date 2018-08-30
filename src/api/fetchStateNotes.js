import request from '@/utils/request'

export default function fetchStateNotes(devId) {
  return request({
    url: '/api/dev/state/notes',
    method: 'get',
    params:{
      devId
    }
  })
}


