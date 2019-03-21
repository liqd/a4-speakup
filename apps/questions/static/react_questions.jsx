var QuestionBox = require('./QuestionBox')
var React = require('react')
var ReactDOM = require('react-dom')

module.exports.renderQuestions = function (el) {
  let props = JSON.parse(el.getAttribute('data-attributes'))
  ReactDOM.render(<QuestionBox {...props} />, el)
}
