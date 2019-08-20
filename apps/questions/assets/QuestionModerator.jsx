/* global django */
const React = require('react')

class QuestionModerator extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      is_on_shortlist: this.props.is_on_shortlist,
      is_live: this.props.is_live,
      likes: this.props.likes.count,
      session_like: this.props.likes.session_like
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
          <p>{this.props.children}</p>
        </div>
        <div className="row">
          <div className="col-12">
            <span className="badge badge-gray">{ this.props.category }</span>
            <div>
              <button type="button" className="btn btn-transparent float-right px-3"
                onClick={this.hiddenList.bind(this)}>
                <i className="fas fa-times text-primary px-1" aria-label={django.gettext('mark as hidden')} />
              </button>

              <button type="button" className="btn btn-transparent float-right px-3"
                onClick={this.props.handleDelete.bind(this, this.props.id)}>
                <i className="fas fa-check text-primary px-1" aria-label={django.gettext('mark as done')} />
              </button>
              <button type="button" className="btn btn-transparent float-right px-3" onClick={this.shortList.bind(this)}>
                <i className={this.state.is_on_shortlist ? 'fas fa-align-justify px-2 text-secondary' : 'fas fa-align-justify text-primary px-2'} aria-label={this.state.is_on_shortlist ? django.gettext('added to shortlist') : django.gettext('remove from shortlist')} />
              </button>
              <button type="button" className="btn btn-transparent float-right px-3" onClick={this.liveList.bind(this)}>
                <i className={this.state.is_live ? 'fas fa-satellite-dish px-2 text-secondary' : 'fas fa-satellite-dish text-primary px-2'} aria-label={this.state.is_live ? django.gettext('added to live list') : django.gettext('remove from live list')} />
              </button>
            </div>
            <div>
              {this.props.hasLikingPermission
                ? <button type="button" className="btn btn-transparent float-right px-3" onClick={this.handleLike.bind(this)}>
                  <span className="text-muted">{this.state.likes}</span>
                  <span className="sr-only">{django.gettext('likes')}</span>
                  <i className={this.state.session_like ? 'fas fa-thumbs-up text-secondary ml-2' : 'fas fa-thumbs-up text-muted ml-2'} aria-label={this.state.session_like ? django.gettext('add like') : django.gettext('undo like')} />
                </button>
                : <div className="float-left">
                  <span className="text-muted">{this.state.likes}</span>
                  <span className="sr-only">{django.gettext('likes')}</span>
                  <i className="fas fa-thumbs-up text-muted ml-2" aria-hidden="true" />
                </div>
              }
            </div>
          </div>
        </div>
      </div>)
  }
}

module.exports = QuestionModerator