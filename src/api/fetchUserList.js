import request from '@/utils/request'

export default function fetchUserList(pno,limit,key) {
  return request({
    url: '/api/admin/user/list',
    method: 'get',
    params:{
      pno,
      limit,
      key
    }
  })
}
