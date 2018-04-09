// Created by Vincent on 17/08/2
import React, {Component} from 'react'

export default function getNewFormatter (comp, foo) {
  return class NewFormatter extends Component {
    render () {
      return React.createElement(comp, Object.assign({}, this.props, {foo: foo}))
    }
  }
}
