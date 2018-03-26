import React from 'react'

// import { egFetch } from '../../utils'

class EgFetchAPI extends React.Component {
  render () {
    return (
      <div>
        <pre style={{fontSize: 16}}>

          {
`
				const myInit = {
				  method: 'POST',
				  credentials: 'include',
				  headers: {
				    'Content-Type': 'application/json'
				  },
				  body: JSON.stringify({})
				}

				egFetch(myInit).then(res => {
				  if(res.status === 'Successful'){
				    console.log(res.data)
				  }
				})
`
    			}
        </pre>
      </div>
    )
  }
}

export default EgFetchAPI
