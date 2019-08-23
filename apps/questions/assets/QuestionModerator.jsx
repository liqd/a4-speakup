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
      is_hidden: this.props.is_hidden
    }
  }

  shortList () {
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
  }

  liveList () {
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
  }

  hiddenList () {
    const value = !this.state.is_hidden
    const boolValue = (value) ? 1 : 0
    const data = { is_hidden: boolValue }
    this.props.updateQuestion(data, this.props.id)
      .then((response) => response.json())
      .then(responseData => this.setState(
        {
          is_hidden: responseData.is_hidden
        }
      ))
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
    if (this.props.likes !== prevProps.likes) {
      this.setState({
        likes: this.props.likes.count,
        session_like: this.props.likes.session_like
      })
    }
  }

  handleErrors (response) {
    if (!response.ok) {
      throw Error(response.statusText)
    }
    return response
  }

  handleLike () {
    const value = !this.state.session_like
    this.props.handleLike(this.props.id, value)
      .then(this.handleErrors)
      .then((response) => this.setState(
        {
          session_like: value,
          likes: value ? this.state.likes + 1 : this.state.likes - 1
        }
      ))
      .catch((response) => { console.log(response.message) })
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
            <span className="badge">{this.state.likes}<i className="icon-vote ml-2" /></span>
          </div>
          <div className="col-12 col-md-8 col-sm-7">
            <button type="button" className="btn btn-transparent float-sm-right px-3"
              onClick={this.hiddenList.bind(this)}>
              <i className={this.props.is_hidden ? 'icon-clear text-primary px-2 text-secondary' : 'icon-clear text-primary px-2 text-primary'} aria-label={this.props.is_hidden ? django.gettext('mark as hidden') : django.gettext('undo mark as hidden')} />
            </button>

            {this.props.showAllButtons &&
              <button type="button" className="btn btn-transparent float-sm-right px-3"
                onClick={this.props.handleDelete.bind(this, this.props.id)}>
                <i className="icon-answered text-primary px-1" aria-label={django.gettext('mark as done')} />
              </button>
            }
            {this.props.showAllButtons &&
              <button type="button" className="btn btn-transparent float-sm-right px-3" onClick={this.liveList.bind(this)}>
                <i className={this.state.is_live ? 'icon-public-view px-2 text-secondary' : 'icon-public-view text-primary px-2'} aria-label={this.state.is_live ? django.gettext('added to live list') : django.gettext('remove from live list')} />
              </button>
            }
            {this.props.showAllButtons &&
              <button type="button" className="btn btn-transparent float-sm-right px-3" onClick={this.shortList.bind(this)}>
                <i className={this.state.is_on_shortlist ? 'icon-push-in-list px-2 text-secondary' : 'icon-push-in-list text-primary px-2'} aria-label={this.state.is_on_shortlist ? django.gettext('added to shortlist') : django.gettext('remove from shortlist')} />
              </button>

            }
          </div>
        </div>
      </div>)
  }
}

module.exports = QuestionModerator
