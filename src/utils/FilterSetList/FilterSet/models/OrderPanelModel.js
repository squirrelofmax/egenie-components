import React from 'react'
import { extendObservable, action, autorun } from 'mobx'
import shortid from 'shortid'

export default class OrderPanelModel {
  constructor (options) {
    extendObservable(this, {
      id: shortid.generate(),
      show: false,
      diaY: 20,
      top: {},
      get firstIndexOfHiddenItem () {
        return this.top.filteritems.findIndex(item => !item.display)
      },
      ...(options || {})
    })
  }

  // actions
  toggleShow = action((e) => {
    e = { ...e }
    if (!this.show) {
      const { clientY, nativeEvent: {
            offsetY
          }, target: {
            offsetHeight
          } } = e
      const middleLine = clientY - offsetY + parseInt(offsetHeight / 2)
      const diaY = middleLine + 14 + 6 // 14是Button的高的一半，6是箭头高度
      this.diaY = diaY
    }
    this.show = !this.show
  })

  onSave = action(() => {
    this.toggleShow()
    // 赋值initIndex与initDisplay
    this.top.filteritems.forEach((item, index) => {
      item.initIndex = index
      item.initDisplay = item.display
    })
    // 把数据传给后端
    // ...
  })

  onCancel = action(() => {
    this.reset()
    this.toggleShow()
  })

  reset = action(() => {
    // 重置显示与否
    this.top.filteritems.forEach(item => {
      item.display = item.initDisplay
    })
    // 重置顺序，attention：这里sort并不能改变filteritems必须再次赋值，原因是
    // mobx 数组的sort/reverse方法是先slice再sort。
    this.top.filteritems = this.top.filteritems.sort(function (a, b) {
      return Number(a.initIndex) - Number(b.initIndex)
    })
  })

  resetToOriginalOrder = action(() => {
    const { firstIndexOfHiddenItem } = this
    const idx = ~firstIndexOfHiddenItem ? firstIndexOfHiddenItem : this.top.filteritems.length
    this.top.filteritems = this.top.filteritems.slice(0, idx).sort(function (a, b) {
      return Number(a.originalIndex) - Number(b.originalIndex)
    }).concat(this.top.filteritems.slice(idx))
  })

  onSortEnd = action(({ oldIndex, newIndex }) => {
    oldIndex += this.top.sliceFromIndex
    newIndex += this.top.sliceFromIndex
    const { firstIndexOfHiddenItem } = this
    const { display } = this.top.filteritems[oldIndex]
    newIndex = display// 控制使得display=true的都在前边，=false的都在后边
      ? ~firstIndexOfHiddenItem ? newIndex < firstIndexOfHiddenItem ? newIndex : firstIndexOfHiddenItem - 1 : newIndex
      : newIndex < firstIndexOfHiddenItem ? firstIndexOfHiddenItem : newIndex

    this.arrayMove(this.top.filteritems, oldIndex, newIndex)
  })

  onSwitch = action((index, v) => {
    index += this.top.sliceFromIndex
    const { firstIndexOfHiddenItem } = this// 必须在赋值v之前获取
    this.top.filteritems[index].display = v
    if (!v) return this.arrayMove(this.top.filteritems, index, this.top.filteritems.length - 1)
    this.arrayMove(this.top.filteritems, index, firstIndexOfHiddenItem)
  })

  // utils
  arrayMove (array, previousIndex, newIndex) {
    if (newIndex >= array.length) {
      var k = newIndex - array.length
      while (k-- + 1) {
        array.push(undefined)
      }
    }
    array.splice(newIndex, 0, array.splice(previousIndex, 1)[0])
  }
}
