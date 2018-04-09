// 框架
import React, { Component } from 'react'
import { Button, Dialog, Message, Table } from 'element-react'

import '@/css/ReportWithCopy.css'

class ReportWithCopy extends Component {
  constructor (props) {
    super(props)
    this.state = {
      title: '批量处理报告',
      show: false,
      total: '',
      failure: '',
      columns: props.columns,
      rows: []
    }
    this.hideDialog = this.hideDialog.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    // 控制显示、隐藏
    if (nextProps.show !== this.state.show) {
      this.setState(prevState => {
        prevState.show = nextProps.show
      })
    }

    // 总数
    if (nextProps.total !== this.state.total) {
      this.setState(prevState => {
        prevState.total = nextProps.total
      })
    }

    // 失败的数量
    if (nextProps.failure !== this.state.failure) {
      this.setState(prevState => {
        prevState.failure = nextProps.failure
      })
    }

    // 如果有rows并且不相同
    if (nextProps.rows.length && nextProps.rows !== this.state.rows) {
      this.setState(prevState => {
        prevState.rows = this.getKey(nextProps.rows)
      })
    }
  }

  // 序号
  getKey (list) {
    list = list || []
    list.forEach((el, i) => el.key = i + 1)
    return list
  }

  // 复制功能
  onCopy () {
    let table = document.getElementsByClassName('react-batch-feed-back-table')[0],
      range, selection
    if (window.getSelection) {  // Others
      selection = window.getSelection()
      range = document.createRange()
      range.selectNodeContents(table)
      selection.removeAllRanges()
      selection.addRange(range)
    } else if (document.body.createTextRange) {  // IE
      range = document.body.createTextRange()
      range.moveToElementText(table)
      range.select()
    }
    document.execCommand('copy')
    Message.success('复制成功！')
    this.hideDialog()
  }

  // 隐藏
  hideDialog () {
    this.props.handleCancel && this.props.handleCancel()
  }

  render () {
    return (
      <div className='report-with-copy'>
        <Dialog title={this.state.title} size='small' visible={this.state.show} closeOnClickModal={false}
          onCancel={this.hideDialog}>
          <Dialog.Body>
            {/* 头部 */}
            <div className='header'>
              {/* icon图标 */}
              <div className='eg-dialog-alert dialog-alert-icon'>
                <i className='fa fa-exclamation' />
              </div>
              {/* information */}
              <div className='information'>
                共处理
                <span className='total'>{this.state.total}</span>
                条，成功
                <span className='success'>{this.state.total - this.state.failure}</span>
                条，失败
                <span className='failure'>{this.state.failure}</span>
                条！
              </div>
            </div>
            {/* 表格 */}
            <div className={this.state.show ? 'eg-grid react-batch-feed-back-table' : 'eg-grid'}>
              <Table
                style={{width: '100%'}}
                columns={this.state.columns}
                maxHeight={300}
                data={this.state.rows}
                border
              />
            </div>
            {/* 底部 */}
            <div className='button-wrapper'>
              <Button size='small' type='warning' onClick={this.onCopy.bind(this)}>复制</Button>
              <Button size='small' type='primary' onClick={this.hideDialog}>确定</Button>
            </div>
          </Dialog.Body>
        </Dialog>
      </div>
    )
  }
}

export default ReportWithCopy
