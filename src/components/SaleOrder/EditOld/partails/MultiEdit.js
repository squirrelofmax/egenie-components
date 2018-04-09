// 框架
import React, { Component } from 'react'
import { observer } from 'mobx-react'
// partails

// requests

// element-UI
import {
  Layout,
  Button,
  Input,
  Select,
  Form,
  Dialog,
  DatePicker, Cascader
} from 'element-react'

const MultiEdit = observer(class AddGoods extends Component {
  render () {
    const {
        show,
        purchase_unit_options_key,

        warehouse_id, // 仓库
        vendor_id, // 供应商
        purchase_unit_id, // 采购单位
        tax_rate, // 税率
        plan_arrival_price, // 含税单价
        plan_arrival_date, // 预计到货日期
        plan_arrival_num,
        confirmed_price,
        confirmed_num,
        organization_id,

        formData,

        onValueChange,
        onBlur,
        onSave,
        onClose,

        top
         } = this.props.store
    return (
      <div className='purchase-order-multi-edit'>
        <Dialog title='批量修改' size='small' visible={show} top='4%' onCancel={onClose} closeOnClickModal={false}>
          <Dialog.Body>
            {/* 底部 */}
            <Form labelWidth='120'
              model={formData}>
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='仓库' prop='warehouse_id'>
                    <Select filterable={top.dict.warehouse_id.length > 10} clearable style={{width: '100%'}} value={warehouse_id != null ? String(warehouse_id) : ''}
                      onChange={onValueChange.bind(this, 'warehouse_id')}
                  >
                      {
                      top.dict.warehouse_id.map(el => (<Select.Option label={el.warehouse_name} value={el.warehouse_id + ''} />))
                    }
                    </Select>
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span={12}>
                  <Form.Item label='供应商' prop='vendor_id'>
                    <Select disabled={!Object.keys(top.dict.commonVendor).length} filterable={Object.keys(top.dict.commonVendor).length > 5} clearable style={{width: '100%'}} value={vendor_id != null ? String(vendor_id) : ''}
                      onChange={onValueChange.bind(this, 'vendor_id')}
                  >
                      {
                      Object.keys(top.dict.commonVendor).map(key => (<Select.Option key={key} value={key + ''} label={top.dict.commonVendor[key]} />))
                    }
                    </Select>
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='采购单位' prop='purchase_unit_id'>
                    <Select disabled={purchase_unit_options_key === 'none'} filterable={top._dict.purchase_unit[purchase_unit_options_key].length > 10} clearable style={{width: '100%'}} value={purchase_unit_id != null ? String(purchase_unit_id) : ''}
                      onChange={onValueChange.bind(this, 'purchase_unit_id')}
                    >
                      {
                        top._dict.purchase_unit[purchase_unit_options_key].map(({label, value}) => (<Select.Option label={label} value={value + ''} />))
                      }
                    </Select>
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span={12}>
                  <Form.Item label='税率(%)' prop='tax_rate'>
                    <Input disabled={plan_arrival_price !== ''} type='text' value={tax_rate || ''}
                      onChange={onValueChange.bind(this, 'tax_rate')} onBlur={onBlur.bind(this, 'tax_rate')}
                    />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='含税单价' prop='plan_arrival_price'>
                    <Input disabled={tax_rate !== ''} type='text' value={plan_arrival_price || ''}
                      onChange={onValueChange.bind(this, 'plan_arrival_price')} onBlur={onBlur.bind(this, 'plan_arrival_price')}
                    />
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span={12}>
                  <Form.Item label='预计到货日期' prop='plan_arrival_date'>
                    <DatePicker value={plan_arrival_date || null}
                      onChange={onValueChange.bind(this, 'plan_arrival_date')}
                    />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              {/* <Layout.Row gutter={10}> */}
              {/* <Layout.Col span={12}> */}
              {/* <Form.Item label="销售方式" prop="sales_type"> */}
              {/* <Select filterable={Object.keys(top.dict.sales_type).length > 10} clearable style={{width: '100%'}} value={sales_type != null ? String(sales_type) : ''} */}
              {/* onChange={onValueChange.bind(this, 'sales_type')} */}
              {/* > */}
              {/* { */}
              {/* Object.keys(top.dict.sales_type).map(key =>(<Select.Option label={top.dict.sales_type[key]} value={key + ''} />)) */}
              {/* } */}
              {/* </Select> */}
              {/* </Form.Item> */}
              {/* </Layout.Col> */}
              {/* <Layout.Col span={12}> */}
              {/* <Form.Item label="结算方式" prop="pay_type"> */}
              {/* <Select value={pay_type == null ? '' : String(pay_type)} onChange={onValueChange.bind(this,'pay_type')}> */}
              {/* {Object.keys(top.dict.pay_type).map(key=>{ */}
              {/* return ( */}
              {/* <Select.Option  key={key} label={top.dict.pay_type[key]} value={key+''}  /> */}
              {/* ) */}
              {/* })} */}
              {/* </Select> */}
              {/* </Form.Item> */}
              {/* </Layout.Col> */}
              {/* </Layout.Row> */}
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='计划采购数量' prop='plan_arrival_num'>
                    <Input type='text' value={plan_arrival_num || ''}
                      onChange={onValueChange.bind(this, 'plan_arrival_num')} onBlur={onBlur.bind(this, 'plan_arrival_num')}
                      />
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span={12}>
                  <Form.Item label='供应商确认单价' prop='confirmed_price'>
                    <Input type='text' value={confirmed_price || ''}
                      onChange={onValueChange.bind(this, 'confirmed_price')} onBlur={onBlur.bind(this, 'confirmed_price')}
                      />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='供应商确认数量' prop='confirmed_num'>
                    <Input type='text' value={confirmed_num || ''}
                      onChange={onValueChange.bind(this, 'confirmed_num')} onBlur={onBlur.bind(this, 'confirmed_num')}
                      />
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span={12}>
                  <Form.Item label='部门' prop='organization_id'>
                    <Cascader value={(organization_id || []).slice(0)} options={top._dict.dept} props={top.deptProps} filterable clearable changeOnSelect showAllLevels={false}
                      onChange={onValueChange.bind(this, 'organization_id')} beforeFilter={() => (Promise.resolve(true))}
                      />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
            </Form>
            <div className='button-wrapper' style={{display: 'flex', marginTop: 5}}>
              <Button type='primary' size='small' style={{width: 70, marginLeft: 'auto'}} onClick={onSave}>保存</Button>
              <Button size='small' style={{width: 70}} onClick={onClose}>取消</Button>
            </div>
          </Dialog.Body>
        </Dialog>
      </div>
    )
  }
  }
)
export default MultiEdit
