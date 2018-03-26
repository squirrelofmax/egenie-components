import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import EgFetchAPI from './components/EgFetchAPI'
import EgFuncAPI from './components/EgFuncAPI'

const EgenieRouter = () => {
  return (
    <Router>
      <div>
        <Route path='/egFetch' component={EgFetchAPI} />
        <Route path='/egFunc' component={EgFuncAPI} />
      </div>
    </Router>
  )
}

export default EgenieRouter
