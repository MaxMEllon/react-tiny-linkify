import React from 'react'
import ReactDOM from 'react-dom/server'
import linkfy from '../index.js'

describe('basic usage', () => {
  it('works', () => {
    const s = ReactDOM.renderToStaticMarkup(
      React.createElement('p', {}, linkfy('sample http://google.com contents'))
    )
    console.log(s)
  })
})
