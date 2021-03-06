/* eslint no-unused-vars: "off", no-new: "off" */

// make jquery available for non-webpack js
var $ = window.jQuery = window.$ = require('jquery')

// load bootstrap components
require('bootstrap')

var django = require('django')

// expose react components
var ReactQuestions = require('../../../apps/questions/assets/react_questions.jsx')
var ReactQuestionsStatisitics = require('../../../apps/questions/assets/react_questions_statistics.jsx')
var ReactQuestionsPresent = require('../../../apps/questions/assets/react_questions_present.jsx')
var ReactComments = require('adhocracy4').comments
var ReactRatings = require('adhocracy4').ratings
var ReactReports = require('adhocracy4').reports
var ReactFollows = require('adhocracy4').follows

var initialiseWidget = function (namespace, name, fn) {
  var key = 'data-' + namespace + '-widget'
  var selector = '[' + key + '=' + name + ']'
  $(selector).each(function (i, el) {
    fn(el)

    // avoid double-initialisation
    el.removeAttribute(key)
  })
}

var init = function () {
  initialiseWidget('speakup', 'questions', ReactQuestions.renderQuestions)
  initialiseWidget('speakup', 'statistics', ReactQuestionsStatisitics.renderData)
  initialiseWidget('speakup', 'present', ReactQuestionsPresent.renderData)
  initialiseWidget('a4', 'comment', ReactComments.renderComment)
  initialiseWidget('a4', 'follows', ReactFollows.renderFollow)
  initialiseWidget('a4', 'ratings', ReactRatings.renderRatings)
  initialiseWidget('a4', 'reports', ReactReports.renderReports)
}

$(init)
