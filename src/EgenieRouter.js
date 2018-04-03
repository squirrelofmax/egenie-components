import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import EgFetchAPI from './components/EgFetchAPI'
import EgFuncAPI from './components/EgFuncAPI'
import Document from './components/index.js'

const EgenieRouter = () => {
  return (
    <Router>
      <div>
        <Route path='/egFetch' component={EgFetchAPI} />
        <Route path='/egFunc' component={EgFuncAPI} />
        <Route path='/document' component={Document} />
      </div>
    </Router>
  )
}

export default EgenieRouter
