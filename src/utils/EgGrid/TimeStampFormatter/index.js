import React, { Component } from 'react'

class TimeStampFormatter extends Component {
  render () {
    const dateStr = this.timeStampFormatToStr(this.props.value)
    return (<div style={{ textAlign: 'left' }} title={dateStr}>{dateStr}</div>)
  }

  timeStampFormatToStr (ts) {
    if (!ts) { return '' }
    if (typeof ts === 'string') { return ts }
    const d = new Date(ts)
    const ydm = [d.getFullYear(), d.getMonth() + 1, d.getDate()].map(el => String(el).padStart(2, 0)).join('-')
    const hms = [d.getHours(), d.getMinutes(), d.getSeconds()].map(el => String(el).padStart(2, 0)).join(':')
    return ydm + ' ' + hms
  }
}
export default TimeStampFormatter
