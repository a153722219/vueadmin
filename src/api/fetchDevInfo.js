/**
 * /api/admin/dev/info
 */

import request from '@/utils/request'

export default function fetchDevInfo(devId) {
  return request({
    url: '/api/admin/dev/info',
    method: 'get',
    params:{
      devId
    }
  })
}
