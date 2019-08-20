/* global django */
let React = require('react')

class QuestionPresent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      is_on_shortlist: this.props.is_on_shortlist,
      is_live: this.props.is_live,
      likes: this.props.likes.count,
      session_like: this.props.likes.session_like
    }
  }

  componentDidUpdate (prevProps) {
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

  render () {
    return (
      <div className='list-group-item border-bottom mb-2'>
        <div>
          <p>{this.props.children}</p>
        </div>
        <div className='row'>
          <div className='col-12'>
            <div>
              <div className='float-right'>
                <span className='text-muted'>{this.state.likes}</span>
                <i className='fas fa-thumbs-up text-muted ml-2' aria-hidden='true' />
                <span className='sr-only'>{django.gettext('likes')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}

module.exports = QuestionPresent
