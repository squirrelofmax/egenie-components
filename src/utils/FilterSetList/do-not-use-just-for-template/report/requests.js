import egFetch from '../../modules/egFetch.js'
import {Message} from 'element-react'

export async function saveAsNewFilterset (data) {
  const obj = {...data}
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }
  // const url = '/api/filterSet2/save/CRM'
  const url = '/api/filterSet2/save/ReportGoodsStats'
  // document.cookie='JSESSIONID=cc55b564-02d5-494e-b1bf-6509147d2945'
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：保存失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getConfig () {
  const myInit = {
    method: 'GET',
    credentials: 'include'
  }
  const url = '/api/filterSet2/getConfig2?dictList=&itemList=vendor,organization&module=ReportGoodsStats'
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：获取配置信息失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function deleteScheme (name) {
  const myInit = {
    method: 'DELETE',
    credentials: 'include'
  }
  const url = `/api/filterSet/filterSets/${name}/ReportGoodsStats`
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：删除失败，请联系管理员！'}
  console.log(result)
  return result
}

// export async function getList (data) {
//   const myInit = {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded'
//     },
//     body: data
//   }
//   const url = '/api/pms/old_purchaseOrder/querys'

//   const response = await egFetch(url, myInit)
//   let result = response || {status: 'Failed', data: '网络错误：获取采购订单列表失败，请联系管理员！'}
//   console.log(result)
//   if (result.status !== 'Failed') { result = {status: 'Successful', data: result} }
//   return result
// }

// export async function getDetailList (data) {
//   const myInit = {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }
//   const url = '/api/pms/purchaseOrderDetail/getPageDetailByPurchaseOrderIdAndCond'
//   const response = await egFetch(url, myInit)
//   const result = response || {status: 'Failed', data: '网络错误：获取采购订单明细列表失败，请联系管理员！'}
//   console.log(result)
//   return result
// }

export async function getSaleOrderLogList (pid, data) {
  data = data || {
    'page': '1',
    'pageSize': '20',
    'sord': 'asc'
  }
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/baseinfo/logBizRecordController/getLogsById/pms_purchase_order/' + pid
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：获取采购订单日志列表失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function updateSaleOrderDetail (data, id) {
  const obj = {...data}
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(obj)
  }
  const url = '/api/trade/saleOrderDetail/update/' + id
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：修改销售订单明细失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getDictsByTypes (param) {
  const myInit = {
    method: 'GET',
    credentials: 'include'
  }
  const url = '/api/trade/dict/getDictsByTypes?types=' + param
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：获取字典项失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function checkPurchaseOrder (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrder/check/true'
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：审核采购订单失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function recheckPurchaseOrder (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrder/check/false'
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：反审核采购订单失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function publishPurchaseOrder (ids) {
  const myInit = {
    method: 'GET',
    credentials: 'include'
  }
  const url = '/api/pms/tradeSaleOrder/pushSaleOrder/' + ids
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：发布采购订单失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function closePurchaseOrder (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrder/closeSimpleOrder'
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：关闭销售订单失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function createStockInOrder (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/wms/bill/other/purchase/create'
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：生成入库单失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function deletePurchaseOrder (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrder/cancel'
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：删除采购订单失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getPurchaseOrderById (id) {
  const myInit = {
    method: 'GET',
    credentials: 'include'
  }
  const url = '/api/pms/purchaseOrder/' + id
  const response = await egFetch(url, myInit)
  const result = response || {status: 'Failed', data: '网络错误：获取采购订单失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getList (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  }
  const url = '/api/productStatisticsController/getDetailNums'

  const response = await egFetch(url, myInit)
  let result = response || {status: 'Failed', data: '网络错误：获取商品汇总表格数据失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getTotalNums (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/productStatisticsController/getTotalNums'

  const response = await egFetch(url, myInit)
  let result = response || { status: 'Failed', data: '网络错误：获取商品汇总信息失败，请联系管理员！' }
  console.log(result)
  return result
}

export async function queryByProduct (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: data
  }
  const url = '/api/bi/purchaseOrder/compareQuerys'

  const response = await egFetch(url, myInit)
  let result = response || {status: 'Failed', data: '网络错误：获取列表失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function queryDetailOfProduct (id, wid) {
  const myInit = {
    method: 'GET',
    credentials: 'include'
  }
  const url = '/api/pms/vendorSupply/getDetail/' + id + '/' + wid

  const response = await egFetch(url, myInit)
  let result = response || {status: 'Failed', data: '网络错误：获取共享库存明细列表失败，请联系管理员！'}
  console.log(result)
  return result
}

// 仓库下拉
export async function getWarehouse (data) {
  const myInit = {
    method: 'GET',
    credentials: 'include'
  }
  const url = '/warehouse/listAll?_=' + Date.now()
  const response = await egFetch(url, myInit)

  const result = response || {status: 'Failed', data: '网络错误：获取仓库下拉数据失败，请重试'}
  // console.log(result)
  return result
}

// //供应商下拉
// export async function getVendorDict (data) {
//   const myInit = {
//     method: 'POST',
//     credentials: 'include',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({})
//   }
//   const url = '/api/baseinfo/vendor/vendorNameAndVendorIdMap'
//   const response = await egFetch(url, myInit)
//
//   const result = response || {status:'Failed',data:'网络错误：获取供应商下拉数据失败，请重试'}
//   //console.log(result)
//   return result
// }

// 供应商下拉
export async function getVendorDict (data) {
  const myInit = {
    method: 'GET',
    credentials: 'include'
  }
  const url = '/api/tenant/tenant/findCurrentAllVendor'
  const response = await egFetch(url, myInit)

  const result = response || {status: 'Failed', data: '网络错误：获取供应商下拉数据失败，请重试'}
  // console.log(result)
  return result
}

// 商品类型下拉
export async function getGoodsCategory (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({})
  }
  const url = '/api/baseinfo/category/categoryNameAndCategoryNoMapByType/1'
  const response = await egFetch(url, myInit)

  const result = response || {status: 'Failed', data: '网络错误：获取商品类型下拉数据失败，请重试'}
  // console.log(result)
  return result
}
