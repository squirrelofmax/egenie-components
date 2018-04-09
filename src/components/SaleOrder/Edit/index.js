// 框架
import React, { Component } from 'react'
import { observer } from 'mobx-react'
// models
// partails
import AddGoods from './partails/AddGoods'
import MultiEdit from './partails/MultiEdit'
// requests
// 样式
import './index.css'
// element-UI
import {
  Layout,
  Button,
  Input,
  Select,
  Form,
  Dialog,
  DatePicker,
  Badge
} from 'element-react'

// modules
import {EgGrid} from '@/lib'

const Header = observer(({style,
                           store: { flag, dict, deptProps, _dict,
                             pms_purchase_order_no, saleDate, tradeSaleOrderType, productType, deliveryType, warehouse_id, salesType, payType, customer
                             , deliverAddress, provinceId, cityId, districtId, remark, contractTerms, organization_id, onValueChange, formData, deletePayTypeDict, addPayTypeDict,
                             deleteCustomerDict, addCustomerDict, testOp, rules, setFormRef
                           }
                         }) => (<Form labelWidth='82' model={formData} ref={setFormRef} style={style} rules={rules}>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={6}>
                               <Form.Item label='销售日期:' prop='saleDate'>
                                 <DatePicker format='yyyy-MM-dd HH:mm:ss' isShowTime style={{width: '100%'}} value={saleDate || null}
                                   onChange={onValueChange.bind(this, 'saleDate')} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='客户:' prop='customer'>
                                 <Select style={{ width: 'calc(100% - 20px)' }} value={customer == null ? '' : String(customer)} onChange={onValueChange.bind(this, 'customer')}>
                                   {_dict.customer.map(({value, label}) => {
                                     return (
                                       <Select.Option style={{ display: 'flex', alignItems: 'center' }} key={value} label={label} value={value + ''} >
                                         <span>{label}</span><i className='el-icon-close' style={{ marginLeft: 'auto' }} onClick={e => {
                                           e.stopPropagation()
                                           deleteCustomerDict(value)
                                         }} />
                                       </Select.Option>
                                     )
                                   })}
                                 </Select>
                                 <i className='el-icon-plus' style={{ marginLeft: 5, cursor: 'pointer' }} onClick={addCustomerDict} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='订单类型:' prop='tradeSaleOrderType'>
                                 <Select filterable={_dict.tradeSaleOrderType.length > 10} clearable style={{width: '100%'}} value={tradeSaleOrderType != null ? String(tradeSaleOrderType) : ''}
                                   onChange={onValueChange.bind(this, 'tradeSaleOrderType')}>
                                   {_dict.tradeSaleOrderType.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='商品类型:' prop='productType'>
                                 <Select filterable={_dict.productType.length > 10} clearable style={{width: '100%'}} value={productType != null ? String(productType) : ''}
                                   onChange={onValueChange.bind(this, 'productType')}>
                                   {_dict.productType.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                           </Layout.Row>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={6}>
                               <Form.Item label='销售方式:' prop='salesType'>
                                 <Select filterable={_dict.salesType.length > 10} clearable style={{width: '100%'}} value={salesType != null ? salesType + '' : ''}
                                   onChange={onValueChange.bind(this, 'salesType')}>
                                   {_dict.salesType.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='结算方式:' prop='payType'>
                                 <Select style={{ width: 'calc(100% - 20px)' }} value={payType == null ? '' : String(payType)} onChange={onValueChange.bind(this, 'payType')}>
                                   {_dict.payType.map(el => {
                                     return (
                                       <Select.Option style={{ display: 'flex', alignItems: 'center' }} key={el.value} label={el.label} value={el.value + ''} >
                                         <span >{el.label}</span><i className='el-icon-close' style={{ marginLeft: 'auto' }} onClick={e => {
                                           e.stopPropagation()
                                           deletePayTypeDict(el.value)
                                         }} />
                                       </Select.Option>
                                     )
                                   })}
                                 </Select>
                                 <i className='el-icon-plus' style={{ marginLeft: 5, cursor: 'pointer' }} onClick={addPayTypeDict} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='交货方式:' prop='deliveryType'>
                                 <Select filterable={Object.keys(_dict.deliveryType).length > 10} clearable style={{width: '100%'}} value={deliveryType != null ? String(deliveryType) : ''}
                                   onChange={onValueChange.bind(this, 'deliveryType')}>
                                   {_dict.deliveryType.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='备注:' prop='remark'>
                                 <Input value={remark || ''}
                                   onChange={onValueChange.bind(this, 'remark')} />
                               </Form.Item>
                             </Layout.Col>
                           </Layout.Row>
                           <Layout.Row gutter={10}>
                             <Form.Item label='收货地址:' prop='deliverAddress'>
                               <Layout.Col span={3}>
                                 <Select style={{width: '100%'}} value={provinceId != null ? String(provinceId) : ''} clearable filterable={_dict.provinceId.length > 10}
                                   onChange={onValueChange.bind(this, 'provinceId')}>
                                   {_dict.provinceId.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))}
                                 </Select>
                               </Layout.Col>
                               <Layout.Col span={3}>
                                 <Select style={{width: '100%'}} value={cityId != null ? String(cityId) : ''} clearable filterable={_dict.provinceId.length > 10}
                                   onChange={onValueChange.bind(this, 'cityId')}>
                                   {_dict.cityId.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))}
                                 </Select>
                               </Layout.Col>
                               <Layout.Col span={3}>
                                 <Select style={{width: '100%'}} value={districtId != null ? String(districtId) : ''} clearable filterable={_dict.provinceId.length > 10}
                                   onChange={onValueChange.bind(this, 'districtId')}>
                                   {_dict.districtId.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))}
                                 </Select>
                               </Layout.Col>
                               <Layout.Col span={15}>
                                 <Input value={deliverAddress || ''}
                                   onChange={onValueChange.bind(this, 'deliverAddress')} />
                               </Layout.Col>
                             </Form.Item>
                           </Layout.Row>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={14}>
                               <Form.Item label='合同条款:' prop='contractTerms'>
                                 <Input value={contractTerms || ''}
                                   onChange={onValueChange.bind(this, 'contractTerms')} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={10}>
                               <Form.Item label='上传附件:'>
                                 <Button size='small' onClick={testOp}>上传</Button>
                                 <Button size='small'>清除</Button>
                                 <Button size='small'>下载</Button>
                               </Form.Item>
                             </Layout.Col>
                           </Layout.Row>
                         </Form>))

const EditPurchaseOrder = observer(class EditPurchaseOrder extends Component {
  render () {
    const {details, flag, onSave, onClose, fullScreen, toggleFullScreen, show, showMultiEditDialog} = this.props.store
    const { gridModel, onFilter, onMultiDelete, filteritems, cursorFilteritem,
      numOfHasValue, onFilterValueChange, getDisplayValueOfFilteritem, onCursorFilteritemFieldChange} = details
    return (
      <div className='purchase-order-edit'>
        <Dialog title={flag === 'add' ? '新建销售订单' : '编辑销售订单'} size='large' visible={show} top='4%' onCancel={onClose} closeOnClickModal={false}>
          <Dialog.Body>
            <Header store={this.props.store} style={{display: fullScreen ? 'none' : ''}} />
            {/* 表格 */}
            <div className='purchase-order-edit__grid-header' style={{display: 'flex', paddingTop: 5, position: 'relative'}}>
              <Button style={{marginBottom: 10}} size='small' onClick={() => {
                const {addGoodsModel, addGoodsModel: {onSearch, onReset, topGridModel: {rows}}} = this.props.store
                addGoodsModel.show = true
                addGoodsModel.inited = true
                onReset()
                if (!rows.length) onSearch()
              }}>添加商品</Button>
              <Button size='small' onClick={onMultiDelete}>批量删除</Button>
              <Button size='small' onClick={showMultiEditDialog}>批量修改</Button>
              <i className={'fa tooltipstered fa-' + (fullScreen ? 'compress' : 'expand')} onClick={toggleFullScreen} />
              <div className='search-key' style={{marginLeft: 'auto', display: 'flex', flex: '0 0 420px'}}>
                <Badge style={{ flex: '0 0 180px', marginRight: 10 }} className={numOfHasValue ? '' : 'count0'} value={numOfHasValue} >
                  <Select size='small' style={{ width: '100%' }} value={cursorFilteritem ? cursorFilteritem.field : ''} onChange={onCursorFilteritemFieldChange}>
                    {filteritems.map(el => <Select.Option key={el.field} label={el.label} value={el.field}>
                      <span style={{ float: 'left', fontSize: 11 }}>{el.label}</span>
                      <span style={{ float: 'right', color: '#ff4949', fontSize: 11, maxWidth: 100, whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>
                        {getDisplayValueOfFilteritem(el)}
                      </span>
                    </Select.Option>)}
                  </Select>
                </Badge>
                {
                (cursorFilteritem && cursorFilteritem.type === 'select'
                ? <Select clearable size='small' style={{ flex: 'auto' }} value={cursorFilteritem.value} onChange={onFilterValueChange.bind(this, null)}>
                  {cursorFilteritem.options.map(el => <Select.Option key={el.value} label={el.label} value={el.value} />)}
                </Select>
                    : <Input size='small' style={{ }} value={cursorFilteritem ? cursorFilteritem.value : ''} onChange={onFilterValueChange.bind(this, null)} />)
                }
                <Button size='small' type='primary' icon='search' onClick={onFilter} style={{marginLeft: 10}}>查询</Button>
              </div>
            </div>
            <div className='purchase-order-edit__grid-container' style={{height: fullScreen ? 555 : 410}}>
              <EgGrid store={gridModel} />
            </div>
            {/* 底部 */}
            <div className='button-wrapper' style={{display: 'flex'}}>
              <Button type='primary' size='small' style={{width: 70, marginLeft: 'auto'}} onClick={onSave}>保存</Button>
              <Button size='small' style={{width: 70}} onClick={onClose}>取消</Button>
            </div>
          </Dialog.Body>
          <MultiEdit store={this.props.store.multiEditModel} />
        </Dialog>
        <AddGoods store={this.props.store.addGoodsModel} />
      </div>
    )
  }
  }
)
export default EditPurchaseOrder
