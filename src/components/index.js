import React, { Component } from 'react'
// ui
import './index.css'
// 这个文档已经在使用自身
import {egFunc} from '@/utils'
// getStart
import getStart from './getStart'
// egFunc文档
import dealClass from './EgFuncAPI/defDoc/dealClass'
import dealCookie from './EgFuncAPI/defDoc/dealCookie'
import debounce from './EgFuncAPI/defDoc/debounce'
import time from './EgFuncAPI/defDoc/time'
import picture from './EgFuncAPI/defDoc/picture'
import getLocation from './EgFuncAPI/defDoc/getLocation'
import fullScreen from './EgFuncAPI/defDoc/fullScreen'
// egFetch文档
import egFetch from './EgFetchAPI/defDoc/fetch'

let startDocs = [getStart]
let egFuncDocs = [dealClass, dealCookie, debounce, time, picture, getLocation, fullScreen]
let egFetchDocs = [egFetch]

class Document extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus0: [
        {name: '开始', child: startDocs}, 
        {name: 'egFunc', child: egFuncDocs},
        {name: 'egFetch', child: egFetchDocs},
      ],
      selected0: 0,
      menus1: [],
      selected1: 0,
    }
  }
  componentWillMount = () => {
    // this.state.selected0 = 1
    // this.state.selected1 = 2
    // 编写文档直接跳转，完成后注释 ↑
    this.state.menus1 = this.state.menus0[this.state.selected0].child
  }
  render () {
    let {menus0, menus1, selected0, selected1} = this.state
    let mainTxt = menus1[selected1] !== undefined ? menus1[selected1].temp : <div></div>
    let code = menus1[selected1] !== undefined ? menus1[selected1].code : <div></div>
    return (
      <div className="B">
        <div className="left" onClick={this.e_select0}>
          {menus0.map((v, index) => {
            return <p className={selected0 === index ? 'docDefault active' : 'docDefault'} key={index} data-id={index}>
              {v.name}
            </p>
          })}
        </div>
        <div className="left" onClick={this.e_select1}>
          {menus1.map((v, index) => {
            return <p className={selected1 === index ? 'docDefault active' : 'docDefault'} key={index} data-id={index}>
            {v.title}
          </p>
          })}
        </div>
        <div className="right">
          {mainTxt}
          <h3>{this.state.selected0 === 0 ? '编写文档' : '源码'}</h3>
          <pre className="code">
           {code}
          </pre>
        </div>
        <div className="toTop0" ref="toTop0">↑</div>
        <div className="toTop1" ref="toTop1"></div>
      </div>
    )
  }
  componentDidMount = () => {
    let dom0 = this.refs.toTop0
    let dom1 = this.refs.toTop1
    dom0.addEventListener('mouseenter', () => {
      egFunc.toScreenTop()
    })
    dom1.addEventListener('mouseenter', () => {
      egFunc.toScreenTop()
    })
    console.log(this.refs.toTop1);
  }
  e_select0 = (event) => {
    let t = event.target
    let i = t.dataset.id
    if (i === undefined) {return}
    i = Number(i)
    this.setState({
      selected0: i,
      selected1: 0,
      menus1: this.state.menus0[i].child
    })
  }
  e_select1 = (event) => {
    let t = event.target
    let i = t.dataset.id
    if (i === undefined) {return}
    egFunc.toScreenTop()
    i = Number(i)
    this.setState({
      selected1: i,
    })
  }
}
export default Document
