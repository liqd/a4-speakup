var StatisticsBox = require('./StatisticsBox')
var React = require('react')
var ReactDOM = require('react-dom')

module.exports.renderData = function (el) {
  let props = JSON.parse(el.getAttribute('data-attributes'))
  ReactDOM.render(<StatisticsBox {...props} />, el)
}
