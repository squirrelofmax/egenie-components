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
import EgGrid from '../../../modules/EgGridMobx.js'

const Header = observer(({style,
                           store: { flag, dict, deptProps, _dict,
                             pms_purchase_order_no, purchase_date, purchase_order_type_code, product_type_code, vendor_id, warehouse_id, sales_type, pay_type
                             , deliver_address, province_id, city_id, district_id, remarks, contract_terms, organization_id, onValueChange, formData, deletePayTypeDict, addPayTypeDict
                           }
                         }) => (<Form labelWidth='80' model={formData} ref='form' style={style}>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={6}>
                               <Form.Item label='销售日期:' prop='purchase_date'>
                                 <DatePicker format='yyyy-MM-dd HH:mm:ss' isShowTime style={{width: '100%'}} value={purchase_date || null}
                                   onChange={onValueChange.bind(this, 'purchase_date')} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='客户:' prop='pay_type'>
                                 <Select style={{ width: 'calc(100% - 20px)' }} value={pay_type == null ? '' : String(pay_type)} onChange={onValueChange.bind(this, 'pay_type')}>
                                   {Object.keys(dict.pay_type).map(key => {
                                     return (
                                       <Select.Option style={{ display: 'flex', alignItems: 'center' }} key={key} label={dict.pay_type[key]} value={key + ''} >
                                         <span >{dict.pay_type[key]}</span><i className='el-icon-close' style={{ marginLeft: 'auto' }} onClick={e => {
                                           e.stopPropagation()
                                           deletePayTypeDict(key)
                                         }} />
                                       </Select.Option>
                                     )
                                   })}
                                 </Select>
                                 <i className='el-icon-plus' style={{ marginLeft: 5, cursor: 'pointer' }} onClick={addPayTypeDict} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='订单类型:' prop='purchase_order_type_code'>
                                 <Select filterable={dict.purchase_order_type.length > 10} clearable style={{width: '100%'}} value={purchase_order_type_code != null ? String(purchase_order_type_code) : ''}
                                   onChange={onValueChange.bind(this, 'purchase_order_type_code')}>
                                   {dict.purchase_order_type.map(el => (<Select.Option key={el.code} label={el.name} value={el.code + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='商品类型:' prop='product_type_code'>
                                 <Select filterable={dict.product_type.length > 10} clearable style={{width: '100%'}} value={product_type_code != null ? String(product_type_code) : ''}
                                   onChange={onValueChange.bind(this, 'product_type_code')}>
                                   {dict.product_type.map(el => (<Select.Option key={el.code} label={el.name} value={el.code + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                           </Layout.Row>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={6}>
                               <Form.Item label='销售方式:' prop='sales_type'>
                                 <Select filterable={dict.sales_type.length > 10} clearable style={{width: '100%'}} value={sales_type != null ? sales_type + '' : ''}
                                   onChange={onValueChange.bind(this, 'sales_type')}>
                                   {dict.sales_type.map(el => (<Select.Option key={el.code} label={el.name} value={el.code + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='结算方式:' prop='pay_type'>
                                 <Select style={{ width: 'calc(100% - 20px)' }} value={pay_type == null ? '' : String(pay_type)} onChange={onValueChange.bind(this, 'pay_type')}>
                                   {Object.keys(dict.pay_type).map(key => {
                                     return (
                                       <Select.Option style={{ display: 'flex', alignItems: 'center' }} key={key} label={dict.pay_type[key]} value={key + ''} >
                                         <span >{dict.pay_type[key]}</span><i className='el-icon-close' style={{ marginLeft: 'auto' }} onClick={e => {
                                           e.stopPropagation()
                                           deletePayTypeDict(key)
                                         }} />
                                       </Select.Option>
                                     )
                                   })}
                                 </Select>
                                 <i className='el-icon-plus' style={{ marginLeft: 5, cursor: 'pointer' }} onClick={addPayTypeDict} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='交货方式:' prop='vendor_id'>
                                 <Select filterable={Object.keys(dict.vendor_id).length > 10} clearable style={{width: '100%'}} value={vendor_id != null ? String(vendor_id) : ''}
                                   onChange={onValueChange.bind(this, 'vendor_id')}>
                                   {Object.keys(dict.vendor_id).map(key => (<Select.Option key={dict.vendor_id[key]} label={key} value={dict.vendor_id[key] + ''} />))}
                                 </Select>
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={6}>
                               <Form.Item label='备注:' prop='remarks'>
                                 <Input value={remarks || ''}
                                   onChange={onValueChange.bind(this, 'remarks')} />
                               </Form.Item>
                             </Layout.Col>
                           </Layout.Row>
                           <Layout.Row gutter={10}>
                             <Form.Item label='收货地址:' prop='deliver_address'>
                               <Layout.Col span={3}>
                                 <Select style={{width: '100%'}} value={province_id != null ? String(province_id) : ''} clearable filterable={dict.province_id.length > 10}
                                   onChange={onValueChange.bind(this, 'province_id')}>
                                   {dict.province_id.map(el => (<Select.Option key={el.province_id} label={el.province_name} value={el.province_id + ''} />))}
                                 </Select>
                               </Layout.Col>
                               <Layout.Col span={3}>
                                 <Select style={{width: '100%'}} value={city_id != null ? String(city_id) : ''} clearable filterable={dict.province_id.length > 10}
                                   onChange={onValueChange.bind(this, 'city_id')}>
                                   {dict.city_id.map(el => (<Select.Option key={el.city_id} label={el.city_name} value={el.city_id + ''} />))}
                                 </Select>
                               </Layout.Col>
                               <Layout.Col span={3}>
                                 <Select style={{width: '100%'}} value={district_id != null ? String(district_id) : ''} clearable filterable={dict.province_id.length > 10}
                                   onChange={onValueChange.bind(this, 'district_id')}>
                                   {dict.district_id.map(el => (<Select.Option key={el.district_id} label={el.district_name} value={el.district_id + ''} />))}
                                 </Select>
                               </Layout.Col>
                               <Layout.Col span={15}>
                                 <Input value={deliver_address || ''}
                                   onChange={onValueChange.bind(this, 'deliver_address')} />
                               </Layout.Col>
                             </Form.Item>
                           </Layout.Row>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={14}>
                               <Form.Item label='合同条款:' prop='contract_terms'>
                                 <Input value={contract_terms || ''}
                                   onChange={onValueChange.bind(this, 'contract_terms')} />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={10}>
                               <Form.Item label='上传附件:'>
                                 <Button size='small'>上传</Button>
                                 <Button size='small'>清除</Button>
                                 <Button size='small'>下载</Button>
                               </Form.Item>
                             </Layout.Col>
                           </Layout.Row>
                         </Form>))

const EditPurchaseOrder = observer(class EditPurchaseOrder extends Component {
  render () {
    const {details, flag, onSave, onClose, fullScreen, toggleFullScreen, show, showMultiEditDialog} = this.props.store
    const { gridModel, onSearch, onMultiDelete, filteritems, cursorFilteritem,
      numOfHasValue, onFilterValueChange, getDisplayValueOfFilteritem, onCursorFilteritemFieldChange} = details
    return (
      <div className='purchase-order-edit'>
        <Dialog title={flag === 'add' ? '新建采购订单' : '编辑采购订单'} size='large' visible={show} top='4%' onCancel={onClose} closeOnClickModal={false}>
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
              <div className='search-key' style={{marginLeft: 'auto', display: flag === 'add' ? 'none' : 'flex', flex: '0 0 420px'}}>
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
                <Button size='small' type='primary' icon='search' onClick={onSearch} style={{marginLeft: 10}}>查询</Button>
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
