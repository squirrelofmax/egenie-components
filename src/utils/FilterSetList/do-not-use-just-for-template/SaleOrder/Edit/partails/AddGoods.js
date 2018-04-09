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
  Form,
  Dialog
} from 'element-react'
// modules
import EgGrid from '../../../../utils/EgGrid/EgGridMobx.js'

const Header = observer(({
                           store: {searchObj: {present: {
                             product_name, // 商品名称
                             product_no, // 商品编码
                             product_seller_outer_no, // 商品货号
                             sku_no, // SKU编码
                             vendor_name, // 供应商
                             bar_code, // 条形码
                             color, // 颜色
                             size // 尺码
                           }}, onValueChange,
                             onSearch,
                             onReset, formData}
                         }) => (<Form labelWidth='80'
  // rules={rules}
                           model={formData}
  // ref="form"
>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={5}>
                               <Form.Item label='商品名称' prop='product_name'>
                                 <Input type='text' value={product_name || ''} onKeyUp={(e) => { if (e.keyCode == 13) return onSearch() }}
                                   onChange={onValueChange.bind(this, 'product_name')}
        />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={5}>
                               <Form.Item label='商品编码' prop='product_no'>
                                 <Input value={product_no || ''} onKeyUp={(e) => { if (e.keyCode == 13) return onSearch() }}
                                   onChange={onValueChange.bind(this, 'product_no')}
        />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={5}>
                               <Form.Item label='商品货号' prop='product_seller_outer_no'>
                                 <Input value={product_seller_outer_no || ''} onKeyUp={(e) => { if (e.keyCode == 13) return onSearch() }}
                                   onChange={onValueChange.bind(this, 'product_seller_outer_no')}
         />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={5}>
                               <Form.Item label='SKU编码' prop='sku_no'>
                                 <Input value={sku_no || ''} onKeyUp={(e) => { if (e.keyCode == 13) return onSearch() }}
                                   onChange={onValueChange.bind(this, 'sku_no')}
         />
                               </Form.Item>
                             </Layout.Col>
                           </Layout.Row>
                           <Layout.Row gutter={10}>
                             <Layout.Col span={5}>
                               <Form.Item label='条形码' prop='bar_code'>
                                 <Input value={bar_code || ''} onKeyUp={(e) => { if (e.keyCode == 13) return onSearch() }}
                                   onChange={onValueChange.bind(this, 'bar_code')}
         />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={5}>
                               <Form.Item label='颜色' prop='color'>
                                 <Input value={color || ''} onKeyUp={(e) => { if (e.keyCode == 13) return onSearch() }}
                                   onChange={onValueChange.bind(this, 'color')}
         />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={5}>
                               <Form.Item label='尺码' prop='size'>
                                 <Input type='text' value={size || ''} onKeyUp={(e) => { if (e.keyCode == 13) return onSearch() }}
                                   onChange={onValueChange.bind(this, 'size')}
        />
                               </Form.Item>
                             </Layout.Col>
                             <Layout.Col span={5}>
                               <div style={{height: 1}} />
                             </Layout.Col>
                             <Layout.Col span={4}>
                               <Button style={{marginTop: 5}} size='small' type='primary' icon='search' onClick={onSearch}>查询</Button>
                               <Button size='small' onClick={onReset}>重置</Button>
                             </Layout.Col>
                           </Layout.Row>

                         </Form>))

const AddGoods = observer(class AddGoods extends Component {
  render () {
    const {
        show,
        onSave,
        onClose,
        topGridModel,
        bottomGridModel,
        // onRefresh,

        // onPageOrSizeChange,
        onMultiAdd,

        onMultiDelete,

        loading
        // columns,
        // displayList,
        // totalCount,
        // _totalCount,

        // _columns,
        // _displayList

      } = this.props.store

    return (
      <div className='purchase-order-add-goods'>
        <Dialog title='销售订单添加商品' size='large' visible={show} top='4%' onCancel={onClose} closeOnClickModal={false}>
          <Dialog.Body>
            <Header store={this.props.store} />
            {/* 表格 */}
            <div>
              <Button disabled={loading} style={{marginBottom: 10}} size='small' onClick={onMultiAdd}>批量添加</Button>
            </div>
            <div className='purchase-order-edit__grid-container' style={{height: 380}}>
              <EgGrid store={topGridModel} />
            </div>
            <div>
              <Button style={{marginBottom: 10}} size='small' onClick={onMultiDelete}>批量删除</Button>
            </div>
            <div className='purchase-order-edit__grid-container' style={{height: 380}}>
              <EgGrid store={bottomGridModel} />
            </div>
            {/* 底部 */}
            <div className='button-wrapper' style={{display: 'flex'}}>
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
export default AddGoods
