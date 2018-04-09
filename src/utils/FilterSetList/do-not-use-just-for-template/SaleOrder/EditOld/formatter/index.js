import React, {Component } from 'react';
import {Button,Select,Input,Cascader} from 'element-react'
import './SelectFormatter.css'
import { observer } from 'mobx-react'

export class TimeStampFormatter extends Component{

  render(){
    const dateStr=this.timeStampFormatToStr(this.props.value);
    return (<div style={{textAlign:"left"}} title={dateStr}>{dateStr}</div>);
  }

  timeStampFormatToStr(ts){
    if (!ts && ts !==0)
      return ''
    const d=new Date(ts);
    return d.toLocaleDateString().replace(/\//g,'-')+' '+d.toTimeString().split(' ')[0];
  }
}

export class OperationFormatter extends Component{

  render(){
    const {value,dependentValues,foo} = this.props
    return (<div style={{textAlign:"left"}}>
    <Button type='text' size='small' onClick={this.editShow}>修改</Button>
    <Button type='text' size='small' onClick={this.resourceShow}>角色</Button>
    <Button type='text' size='small' onClick={this.delete}>删除</Button>
    </div>);
  }

  editShow =()=>{
    this.props.foo.editShow(this.props.dependentValues)
  }

  resourceShow = ()=>{
    this.props.foo.resourceShow(this.props.dependentValues)
  }

  delete=()=>{
    this.props.foo.delete(this.props.dependentValues.resourceId)
  }

}

export const getSelectFormatterForVendor=(that,url)=>{
  return class SelectFormatter extends Component {
    constructor (props) {
      super(props)
      const {value,dependentValues,foo,foo:{getDict}}=this.props
      const dict=getDict(dependentValues.sku_id)
      this.state={dict:dict.then ? [] : dict,loaded:false}
      Promise.resolve(dict).then(v =>this.setState({dict:v,loaded:true}))
    }

    handleValueChange =(value)=>{
      const {onChange,onBlur}=this.props.foo
      onChange && onChange(value,this.props.dependentValues)
      onBlur && onBlur(value,this.props.dependentValues)
    }

    getDict(){
      const {value,dependentValues,foo,foo:{getDict}}=this.props
      Promise.resolve(getDict(dependentValues.sku_id)).then(v =>this.setState({dict:v,loaded:true}))
    }

    componentDidMount(){
      const that=this
      const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
      if(!disabledFlag){
        const wrapper=this.wrapper
        window.$(wrapper).find('.el-input__inner').focus(function(e){e.stopPropagation();}).click(function(e){
          window.$(this).closest('.react-grid-Cell').addClass('editing')
          setTimeout(()=>window.$(this).focus(),0)
        }).dblclick(function(e){e.stopPropagation()})
        window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing')
      }
    }

    render () {
      const {value,dependentValues}=this.props
      const dict=this.state.dict
      const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
      let targetItem = null
      let showContent= null
      if(disabledFlag){
        targetItem=(dict||[]).find(option =>option.value == value)
        showContent=targetItem ? targetItem.label : ''
      }
      return (
        <div ref={wrapper=>{this.wrapper=wrapper}} className='select-formatter' style={{
          textAlign: 'left',padding:disabledFlag ? '0' : '3px 8px 3px 0px'
        }}>
          {disabledFlag ? showContent :(<Select value={this.props.value+''} clearable={true} filterable={(dict||[]).length > 10}
                                                 onBlur={this.handleBlur} onChange={this.handleValueChange} >
            {(dict||[]).map(option =>{
              return(<Select.Option label={option.label} value={option.value+''}  />)
            })}
          </Select>)}
        </div>
      )
    }
  }
}

export const getSelectFormatterForPurchaseUnit=(that,url)=>{
  return class SelectFormatter extends Component {
    handleValueChange =(value)=>{
      const {onChange,onBlur}=this.props.foo
      onChange && onChange(value,this.props.dependentValues)
      onBlur && onBlur(value,this.props.dependentValues)
    }

    componentDidMount(){
      const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
      if(!disabledFlag){
        const wrapper=this.wrapper
        window.$(wrapper).find('.el-input__inner').focus(function(e){e.stopPropagation();}).click(function(e){
          window.$(this).closest('.react-grid-Cell').addClass('editing')
          setTimeout(()=>window.$(this).focus(),0)
        }).dblclick(function(e){e.stopPropagation()})
        window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing')
      }
    }

    render () {
      const {optionsName} =this.props.foo
      const {value,dependentValues}=this.props
      const dict=optionsName() ? url.split('.').reduce((a,b)=>{
        return a[b]
      },that)[optionsName()] : url.split('.').reduce((a,b)=>{
        return a[b]
      },that).all
      const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
      let targetItem = null
      let showContent= null
      if(disabledFlag){
        targetItem=(dict||[]).find(option =>option.value == value)
        showContent=targetItem ? targetItem.label : ''
      }
      return (
        <div ref={wrapper=>{this.wrapper=wrapper}} className='select-formatter' style={{
          textAlign: 'left',padding:disabledFlag ? '0' : '3px 8px 3px 0px'
        }}>
          {disabledFlag ? showContent :(<Select  value={this.props.value+''}  filterable={(dict||[]).length > 10}
                                                 onBlur={this.handleBlur} onChange={this.handleValueChange} >
            {(dict||[]).map(option =>{
              return(<Select.Option label={option.label} value={option.value+''}  />)
            })}
          </Select>)}
        </div>
      )
    }
  }
}

export const getSelectFormatterForPayType=(that,url)=>{
  return class SelectFormatter extends Component {
    constructor (props) {
      super(props)
      const {optionsName} =this.props.foo
      const {value}=this.props
      const dict=url.split('.').reduce((a,b)=>{
        return a[b]
      },that)[optionsName]
      this.state={dict}
    }

    getDict(){
      const {optionsName} =this.props.foo
      const {value}=this.props
      const dict=url.split('.').reduce((a,b)=>{
        return a[b]
      },that)[optionsName]
      this.setState({dict})
    }

    handleValueChange =(value)=>{
      const {onChange,onBlur}=this.props.foo
      onChange && onChange(value,this.props.dependentValues)
      onBlur && onBlur(value,this.props.dependentValues)
    }

    componentDidMount(){
      const this2=this
      const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
      if(!disabledFlag){
        const wrapper=this.wrapper
        window.$(wrapper).find('.el-input__inner').focus(function(e){e.stopPropagation();}).click(function(e){
          window.$(this).closest('.react-grid-Cell').addClass('editing')
          this2.getDict()
          setTimeout(()=>window.$(this).focus(),0)
        }).dblclick(function(e){e.stopPropagation()})
        window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing')
      }
    }

    render () {
      const {dict} =this.state
      const {value}=this.props
      const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
      let targetItem=null
      let showContent=null
      if(disabledFlag){
        targetItem=(dict||[]).find(option =>option.value == value)
        showContent=targetItem ? targetItem.label : ''
      }
      return (
        <div ref={wrapper=>{this.wrapper=wrapper}} className='select-formatter' style={{
          textAlign: 'left',padding:disabledFlag ? '0' : '3px 8px 3px 0px'
        }}>
          {disabledFlag ? showContent :(<Select  value={this.props.value+''}  filterable={(dict || []).length > 10}
                                                 onBlur={this.handleBlur} onChange={this.handleValueChange} >
            {(dict||[]).map(option =>{
              return(<Select.Option label={option.label} value={option.value+''}  />)
            })}
          </Select>)}
        </div>
      )
    }
  }
}

export class InputFormatterForTaxRate  extends Component {

  handleBlur = (e) => {
    console.log('执行内部blur事件')
    e.stopPropagation()
    e.preventDefault()
    const value=this.input.refs.input.value  + '%'
    this.edited && this.props.foo.onBlur(value, this.props.dependentValues,this.input.refs.input)
    this.edited =false
  }

  handleValueChange =(value)=>{
    console.log('执行内部valueChang事件')
    this.edited=true
    value += '%'
    this.props.foo.onChange && this.props.foo.onChange(value,this.props.dependentValues)
  }

  componentDidMount(){
    this.edited=false
    const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
    if(!disabledFlag){
      const wrapper=this.wrapper
      const input =this.input.refs.input
      input.value=parseFloat(this.props.value)
      window.$(wrapper).focus(function(e){e.stopPropagation()}).click(function(e){
        setTimeout(()=>window.$(input).focus(),0)
      })
        .dblclick(function(e){e.stopPropagation()})
    }
  }

  componentWillReceiveProps(nextProps){
    const input =this.input.refs.input
    input.value=parseFloat(nextProps.value)
  }

  render () {
    const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
    return (
      <div ref={wrapper=>{this.wrapper=wrapper}} className={'input-formatter'+(this.props.foo._class ? ' '+this.props.foo._class :'')} style={{
        textAlign: 'left',padding:disabledFlag ? '0px' :"10px 13px 10px 0px"
      }}>
        {disabledFlag
          ?this.props.value
          :<Input  ref={input=>{this.input=input}}  onKeyUp={e=>{
            e.stopPropagation()
            e={...e};this.props.foo.onKeyUp && this.props.foo.onKeyUp(e,this.input.refs.input)
          }} onKeyDown={(e)=>{e.stopPropagation()}}
                   onBlur={this.handleBlur} onChange={this.handleValueChange}/>
        }
        {disabledFlag ? '' : '%'}
      </div>
    )
  }
}


export const TreeFormatterForDept=observer(class TreeFormatterForDept  extends Component {

  handleBlur = (e) => {
    console.log('执行内部blur事件')
    e.stopPropagation()
    e.preventDefault()
    const value=this.input.refs.input.value  + '%'
    this.props.foo.onBlur(value, this.props.dependentValues,this.input.refs.input)
  }

  handleValueChange =(value)=>{
    console.log('执行内部valueChang事件')
    this.props.foo.onChange && this.props.foo.onChange(value,this.props.dependentValues)
  }

  componentDidMount(){
    const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
    if(!disabledFlag){
      const wrapper=this.wrapper
      window.$(wrapper).find('.el-input__inner').focus(function(e){e.stopPropagation();}).click(function(e){
        window.$(this).closest('.react-grid-Cell').addClass('editing')
        setTimeout(()=>window.$(this).focus(),0)
      }).dblclick(function(e){e.stopPropagation()})
      window.$(this.wrapper).closest('.react-grid-Cell').addClass('editing')
    }
  }

  // componentWillReceiveProps(nextProps){
  //   const input =this.input.refs.input
  //   input.value=parseFloat(nextProps.value)
  // }

  render () {
    const disabledFlag=this.props.foo.isDisabled && !!this.props.foo.isDisabled()
    const {_dict:{dept},deptProps}=this.props.foo.top
    return (
      <div ref={wrapper=>{this.wrapper=wrapper}} className={'input-formatter'+(this.props.foo._class ? ' '+this.props.foo._class :'')} style={{
        textAlign: 'left',padding:disabledFlag ? '0px' :"3px 13px 3px 0px"
      }}>
        {disabledFlag
          ?this.props.value
          :<Cascader value={(this.props.value || []).slice(0)} options={dept} props={deptProps} filterable clearable changeOnSelect
                     showAllLevels={false}
                     beforeFilter={()=>(Promise.resolve(true))}
                     ref={input=>{this.input=input}}
                     onKeyUp={e=>{e.stopPropagation();e={...e};this.props.foo.onKeyUp && this.props.foo.onKeyUp(e,this.input.refs.input)}}
                     onKeyDown={(e)=>{e.stopPropagation()}}
                     onBlur={this.handleBlur} onChange={this.handleValueChange} />
        }
      </div>
    )
  }
})

