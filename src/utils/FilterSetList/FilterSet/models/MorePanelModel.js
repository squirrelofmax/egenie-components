import { extendObservable, action } from 'mobx'
import shortid from 'shortid'

export default class MorePanelModel {
  constructor (options) {
    extendObservable(this, {
      id: shortid.generate(),
      show: false,
      ...(options || {})
    })
  }
  /**
   * actions
   */
  toggleShow = action(() => {
    this.show = !this.show
  })
}
