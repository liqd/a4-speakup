/* global django */
let React = require('react')

class QuestionUser extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      is_on_shortlist: this.props.is_on_shortlist,
      likes: this.props.likes.count,
      session_like: this.props.likes.session_like
    }
  }

  markFavourite () {
    let value = !this.state.is_on_shortlist
    let boolValue = (value) ? 1 : 0
    let data = { is_on_shortlist: boolValue }
    this.props.updateQuestion(data, this.props.id)
      .then((response) => response.json())
      .then(responseData => this.setState(
        {
          is_on_shortlist: responseData.is_on_shortlist
        }
      ))
  }

  componentDidUpdate (prevProps) {
    if (this.props.is_on_shortlist !== prevProps.is_on_shortlist) {
      this.setState({
        is_on_shortlist: this.props.is_on_shortlist
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
    let value = !this.state.session_like
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
      <div className='list-group-item border-bottom mb-2 user'>
        <div>
          <p>{this.props.children}</p>
        </div>
        <div className='row'>
          <div className='col-12'>
            <span className='badge badge-gray'>{ this.props.category }</span>
            <div>
              {this.props.hasLikingPermission
                ? <button type='button' className='btn btn-transparent float-right px-3' onClick={this.handleLike.bind(this)}>
                  <i className={this.state.session_like ? 'fas fa-thumbs-up text-secondary mr-1' : 'far fa-thumbs-up mr-1'} aria-label={this.state.session_like ? django.gettext('add like') : django.gettext('undo like')} />
                  <span>{this.state.likes}</span>
                  <span className='sr-only'>{django.gettext('likes')}</span>
                </button>
                : <div className='float-right'>
                  <i className='far fa-thumbs-up text-muted mr-1' aria-hidden='true' />
                  <span>{this.state.likes}</span>
                  <span className='sr-only'>{django.gettext('likes')}</span>
                </div>
              }
            </div>
          </div>
        </div>
      </div>)
  }
}

module.exports = QuestionUser
