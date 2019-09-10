import React from 'react'
import django from 'django'

const textDisplayQuestion = django.gettext('display question on screen')
const textAddQuestion = django.gettext('add question to shortlist')
const textHideQuestion = django.gettext('hide question from audience')
const textMarkAnswered = django.gettext('mark question as answered')
const textInFront = django.gettext('is shown in front of a question? It has been marked by the moderation.')

export default class InfoBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      displayInfo: false
    }
  }

  toggleInformation () {
    const displayInfo = !this.state.displayInfo
    this.setState({
      displayInfo: displayInfo
    })
  }

  render () {
    return (
      <div>
        {this.state.displayInfo
          ? (
            <div className="alert alert-secondary alert-dismissible">
              {this.props.isModerator &&
                <div className="row pt-4">
                  <div className="col-lg-3 pb-2 pb-xl-0">
                    <i className="icon-push-in-list" /> <span>{textAddQuestion}</span>
                  </div>
                  <div className="col-lg-3 pb-2 pb-xl-0">
                    <span className="fa-stack fa-1x"><i className="fas fa-tv fa-stack-2x" /><i className="fas fa-arrow-up fa-stack-1x" /></span> <span>{textDisplayQuestion}</span>
                  </div>
                  <div className="col-lg-3 pb-2 pb-xl-0">
                    <i className="icon-answered" /> <span>{textMarkAnswered}</span>
                  </div>
                  <div className="col-lg-3 pb-2 pb-xl-0">
                    <i className="icon-answered" /> <span>{textHideQuestion}</span>
                  </div>
                </div>}
              {!this.props.isModerator &&
                <div className="row">
                  <div className="col-12">
                    <i className="icon-in-list" /> {textInFront}
                  </div>
                </div>}
              <button type="button" className="close" onClick={this.toggleInformation.bind(this)} aria-label="Close information">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          )
          : (
            <div className="row">
              <div className="col-12 d-flex justify-content-end">
                <button type="button" className="btn btn-outline-secondary" onClick={this.toggleInformation.bind(this)} aria-label="Open information">
                  <span aria-hidden="true"><i className="fas fa-info-circle" /></span>
                </button>
              </div>
            </div>
          )}
      </div>
    )
  }
}
