/* global django */
const React = require('react')

class QuestionModerator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      is_on_shortlist: this.props.is_on_shortlist,
      is_live: this.props.is_live,
      likes: this.props.likes.count,
      session_like: this.props.likes.session_like,
      is_hidden: this.props.is_hidden,
      is_answered: this.props.is_answered
    }
  }

  toggleIsOnShortList () {
    const value = !this.state.is_on_shortlist
    const boolValue = (value) ? 1 : 0
    const data = { is_on_shortlist: boolValue }
    this.props.updateQuestion(data, this.props.id)
      .then((response) => response.json())
      .then(responseData => this.setState(
        {
          is_on_shortlist: responseData.is_on_shortlist
        }
      ))
      .then(() => this.props.togglePollingPaused())
  }

  toggleIslive () {
    const value = !this.state.is_live
    const boolValue = (value) ? 1 : 0
    const data = { is_live: boolValue }
    this.props.updateQuestion(data, this.props.id)
      .then((response) => response.json())
      .then(responseData => this.setState(
        {
          is_live: responseData.is_live
        }
      ))
      .then(() => this.props.togglePollingPaused())
  }

  toggleIsAnswered () {
    const value = !this.state.is_answered
    const boolValue = (value) ? 1 : 0
    const data = { is_answered: boolValue }
    this.props.removeFromList(this.props.id, data)
  }

  toggleIshidden () {
    const value = !this.state.is_hidden
    const boolValue = (value) ? 1 : 0
    const data = { is_hidden: boolValue }
    this.props.removeFromList(this.props.id, data)
  }

  componentDidUpdate (prevProps) {
    if (this.props.is_on_shortlist !== prevProps.is_on_shortlist) {
      this.setState({
        is_on_shortlist: this.props.is_on_shortlist
      })
    }
    if (this.props.is_live !== prevProps.is_live) {
      this.setState({
        is_live: this.props.is_live
      })
    }
    if (this.props.is_hidden !== prevProps.is_hidden) {
      this.setState({
        is_hidden: this.props.is_hidden
      })
    }
    if (this.props.is_answered !== prevProps.is_answered) {
      this.setState({
        is_answered: this.props.is_answered
      })
    }
    if (this.props.likes !== prevProps.likes) {
      this.setState({
        likes: this.props.likes.count,
        session_like: this.props.likes.session_like
      })
    }
  }

  render () {
    return (
      <div className="list-group-item border-bottom mb-2">
        <div>
          <p className={this.props.is_hidden ? 'text-muted u-text-decoration-line-through' : ''}>{this.props.children}</p>
        </div>
        <div className="row justify-content-between">
          <div className="col-12 col-md-4 col-sm-5 mb-3 mb-sm-0">
            <span className="badge badge-gray mr-1">{ this.props.category }</span>
            <span className="badge">{this.state.likes}<i className="icon-like ml-2" /></span>
          </div>
          <div className="col-12 col-md-8 col-sm-7">
            <button type="button" className="btn btn-transparent float-sm-right px-3"
              onClick={this.toggleIshidden.bind(this)}>
              <i className={this.props.is_hidden ? 'far fa-eye-slash text-secondary' : 'far fa-eye text-primary'} aria-label={this.props.is_hidden ? django.gettext('mark as hidden') : django.gettext('undo mark as hidden')} />
            </button>

            {this.props.showAllButtons &&
              <button type="button" className="btn btn-transparent float-sm-right px-3"
                onClick={this.toggleIsAnswered.bind(this)}>
                <i className="icon-answered text-primary" aria-label={django.gettext('mark as done')} />
              </button>
            }
            {this.props.showAllButtons &&
              <button type="button" className="btn btn-transparent float-sm-right px-3" onClick={this.toggleIslive.bind(this)}>
                <span className="fa-stack fa-1x">
                  <i className={this.state.is_live ? 'fas fa-tv fa-stack-2x text-secondary' : 'fas fa-tv fa-stack-2x text-primary'} aria-label={this.state.is_live ? django.gettext('added to live list') : django.gettext('remove from live list')} />
                  <i className={this.state.is_live ? 'fas fa-arrow-up fa-stack-1x fa-inverse text-secondary' : 'fas fa-arrow-up fa-stack-1x text-primary'} aria-hidden="true" />
                </span>
              </button>
            }
            {this.props.showAllButtons &&
              <button type="button" className="btn btn-transparent float-sm-right px-3" onClick={this.toggleIsOnShortList.bind(this)}>
                <i className={this.state.is_on_shortlist ? 'icon-in-list text-secondary' : 'icon-push-in-list text-primary'} aria-label={this.state.is_on_shortlist ? django.gettext('added to shortlist') : django.gettext('remove from shortlist')} />
              </button>

            }
          </div>
        </div>
      </div>)
  }
}

module.exports = QuestionModerator
