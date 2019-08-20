var PresentBox = require('./PresentBox')
var React = require('react')
var ReactDOM = require('react-dom')

module.exports.renderData = function (el) {
  const props = JSON.parse(el.getAttribute('data-attributes'))
  ReactDOM.render(<PresentBox {...props} />, el)
}
