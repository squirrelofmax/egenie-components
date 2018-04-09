import egFetch from '../../../modules/egFetch'
import {Message} from 'element-react'


export async function getProductList (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/vendorSupply/querybyctgr'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取商品列表失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function addWhenAdd (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrderDetail/initPurchaseOrderDetailsByVendor'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：（新建时）添加商品失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function addWhenEdit (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrderDetail/initAndSavePurchaseOrderDetailsByVendor'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：（修改时）添加商品失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function singleDelete (id) {
  const myInit = {
    method: 'DELETE',
    credentials: 'include',
  }
  const url = '/api/pms/purchaseOrderDetail/delete/'+id
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：删除商品失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function multiDelete (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrderDetail/batchDelete'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：批量删除商品失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function singleUpdate (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrderDetail/updateNormalPurchaseOrderDetail'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：修改商品失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function multiUpdate (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrderDetail/batchUpdateNormalPurchaseOrderDetail'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：批量修改商品失败，请联系管理员！'}
  console.log(result)
  return result
}


export async function updateVendorProps (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrderDetail/updateVendorProps'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：修改失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function savePurchaseOrder (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrder/insert'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：保存失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getDictsByTypes (param) {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/api/trade/dict/getDictsByTypes?types='+param
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取字典项失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function addPayTypeDict (param) {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/api/baseinfo/baseCustomPropsDict/insertCustomDict/5/'+encodeURI(param)
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：自定义结算方式失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getPayTypeDict () {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/api/baseinfo/baseCustomPropsDict/findBaseCustomPropsDictMapByType/pay_type'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取结算方式字典项失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function deletePayTypeDict (id) {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/api/baseinfo/baseCustomPropsDict/delete/5/'+id
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：删除结算方式失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getVendorDictBySkuId (id) {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/api/pms/vendorSupply/findVendorBySkuId/'+id
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取分供商字典项失败，请联系管理员！'}
  console.log(result)
  return result
}


export async function getDetailListByCond (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  }
  const url = '/api/pms/purchaseOrderDetail/getPageDetailByPurchaseOrderIdAndCond'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取采购订单明细列表失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function findCommonVendorBySkuIds (data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body:JSON.stringify(data)
  }
  const url = '/api/pms/vendorSupply/findCommonVendorBySkuIds'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取供应商字典项交集失败，请联系管理员！'}
  console.log(result)
  return result
}


export async function updatePurchaseOrderMain (id,data) {
  const myInit = {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }
  const url ='/api/pms/purchaseOrder/update/'+id
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed', data:'网络错误：修改采购订单主表信息失败，请联系管理员！'}
  console.log(result)
  return result
}


export async function findMasterWarehouse () {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/api/baseinfo/warehouse/findMasterWarehouse'
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取主仓地址失败，请联系管理员！'}
  console.log(result)
  return result
}

export async function getAddressByWarehouseId (id) {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/api/baseinfo/warehouse/findById/'+id
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取仓库对应地址失败，请联系管理员！'}
  console.log(result)
  return result
}


//根据供应商id获取对应的采购员信息
export async function findEmployeeByVendorId (id) {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/employee/findByVendorId?vendorId='+id
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取供应商对应的采购员信息失败，请联系管理员！'}
  console.log(result)
  return result
}

//根据仓库id获取对应的库存信息
export async function findStockByWarehouseId (id,skuIds) {
  const myInit = {
    method: 'GET',
    credentials: 'include',
  }
  const url = '/hack/stock/queryMultiAllStocks?warehouseId='+id+'&'+'skuIds='+skuIds
  const response = await egFetch(url, myInit)
  const result = response || {status:'Failed',data:'网络错误：获取仓库对应的库存信息失败，请联系管理员！'}
  console.log(result)
  return result
}

