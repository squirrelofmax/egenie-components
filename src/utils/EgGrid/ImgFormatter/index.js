import React, { Component } from 'react'
import '../../../css/EgGrid/ImgFormatter/ImgFormatter.css'

class ImgFormatter extends Component {
  componentDidMount () {
  }
  render () {
    return (
      <div className='img-formatter' style={{ textAlign: 'center', marginLeft: '-8px' }}>
        <img alt='' src={this.props.value} style={{ height: '30px', marginTop: 3 }}
          onMouseMove={e => showPic({ ...e }, this.props.value)} onMouseOut={hidePic}
        />
      </div>
    )
  }
}
export default ImgFormatter

function showPic (event, pic) {
  // console.log(event)

  if (!document.getElementById('picImg')) {
    const picDiv = document.createElement('div')
    picDiv.id = 'picUrl'
    picDiv.style.display = 'none'
    // <div id="picUrl" style="display: none;"></div>
    const picImg = document.createElement('img')
    picImg.style.width = '280px'
    picImg.style.height = '280px'
    picImg.id = 'picImg'
    // <img src="" style="width: 280px;height: 280px;;" alt="" id="picImg">
    picDiv.appendChild(picImg)
    document.body.appendChild(picDiv)
  }

  var x = event.clientX,
    y = event.clientY,
    lImgWidth = 280,
    sImgWidth = 20,
    windowHeight = window.innerHeight,
    windowWidth = window.innerWidth
  if (windowHeight - y < lImgWidth) {
    y -= lImgWidth + sImgWidth
  } else {
    y += sImgWidth
  }
  if (windowWidth - x < lImgWidth) {
    x -= lImgWidth + sImgWidth
  } else {
    x += sImgWidth
  }

  document.getElementById('picImg').src = pic

  const picStyle = document.getElementById('picUrl').style
  // console.log(picStyle)
  // console.log(x)
  // console.log(y)
  picStyle.display = 'block'
  picStyle.border = 0
  picStyle.position = 'absolute'
  picStyle.left = x + 'px'
  picStyle.top = y + 'px'
  picStyle.zIndex = 99999
}

function hidePic (event, pic) {
  document.getElementById('picUrl').style.display = 'none'
}
