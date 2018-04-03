import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import EgenieRouter from './EgenieRouter'

import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<EgenieRouter />, document.getElementById('root'))
registerServiceWorker()


