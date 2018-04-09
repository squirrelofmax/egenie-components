// 框架
import React, { Component } from 'react'
import { observer } from 'mobx-react'
// partails

// requests

// element-UI
import {
  Layout,
  Button,
  Select,
  Form,
  Dialog,
   InputNumber, DatePicker
} from 'element-react'

const MultiEdit = observer(class AddGoods extends Component {
  render () {
    const {
        show,
        taxRate, // 税率
        salePrice, // 含税单价
        saleNum,
        planSendDate,
        customer,

        formData,

        onValueChange,
        onSave,
        onClose,
        top
         } = this.props.store
    return (
      <div className='purchase-order-multi-edit'>
        <Dialog title='批量修改' size='small' visible={show} top='4%' onCancel={onClose} closeOnClickModal={false}>
          <Dialog.Body>
            {/* 底部 */}
            <Form labelWidth='100'
              model={formData}>
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='客户' prop='customer'>
                    <Select filterable={top._dict.customer.length > 10} clearable style={{ width: '100%' }} value={customer != null ? String(customer) : ''}
                      onChange={onValueChange.bind(this, 'customer')}>
                      {
                        top._dict.customer.map(el => (<Select.Option key={el.value} label={el.label} value={el.value + ''} />))
                      }
                    </Select>
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span={12}>
                  <Form.Item label='销售数量' prop='saleNum'>
                    <InputNumber value={saleNum == null ? saleNum : +saleNum}
                      defaultValue={undefined} onKeyDown={(e) => { e.stopPropagation() }}
                      onChange={onValueChange.bind(this, 'saleNum')}
                    />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='税率(%)' prop='taxRate'>
                    <InputNumber disabled={salePrice != null} value={taxRate == null ? taxRate : +taxRate}
                      min={0} step={1} defaultValue={undefined}
                      max={100} onKeyDown={(e) => { e.stopPropagation() }}
                      onChange={onValueChange.bind(this, 'taxRate')}
                    />
                  </Form.Item>
                </Layout.Col>
                <Layout.Col span={12}>
                  <Form.Item label='含税售价' prop='salePrice'>
                    <InputNumber disabled={taxRate != null} value={salePrice == null ? salePrice : +salePrice}
                      defaultValue={undefined} onKeyDown={(e) => { e.stopPropagation() }}
                      onChange={onValueChange.bind(this, 'salePrice')}
                    />
                  </Form.Item>
                </Layout.Col>
              </Layout.Row>
              <Layout.Row gutter={10}>
                <Layout.Col span={12}>
                  <Form.Item label='预计送货日期' prop='planSendDate'>
                    <DatePicker value={planSendDate}
                      format='yyyy-MM-dd HH:mm:ss' isShowTime onKeyDown={(e) => { e.stopPropagation() }}
                      onChange={onValueChange.bind(this, 'planSendDate')}
                    />
                  </Form.Item>
                </Layout.Col>
                {/* <Layout.Col span={12}>
                  <Form.Item label='含税售价' prop='salePrice'>
                    <InputNumber disabled={taxRate != null} value={salePrice == null ? salePrice : +salePrice}
                      defaultValue={undefined} onKeyDown={(e) => { e.stopPropagation() }}
                      onChange={onValueChange.bind(this, 'salePrice')}
                    />
                  </Form.Item>
                </Layout.Col> */}
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
