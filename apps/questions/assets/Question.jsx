/* global django */
let React = require('react')

class Question extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      is_favourite: this.props.is_favourite,
      likes: this.props.likes.count,
      session_like: this.props.likes.session_like
    }
  }

  markFavourite () {
    let value = !this.state.is_favourite
    let boolValue = (value) ? 1 : 0
    let data = { is_favourite: boolValue }
    this.props.updateQuestion(data, this.props.id)
      .then((response) => response.json())
      .then(responseData => this.setState(
        {
          is_favourite: responseData.is_favourite
        }
      ))
  }

  componentDidUpdate (prevProps) {
    if (this.props.is_favourite !== prevProps.is_favourite) {
      this.setState({
        is_favourite: this.props.is_favourite
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
      <div className='list-group-item border-bottom mb-2'>
        <div>
          <p>{this.props.children}</p>
        </div>
        <div className='row'>
          <div className='col-12'>
            <span className='badge badge-gray'>{ this.props.category }</span>
            <div>
              <div className='float-right'>
                <i className='far fa-star text-muted mr-1' aria-hidden='true' />
                <span>{this.props.weight}</span>
                <span className='sr-only'>{django.gettext('weight')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>)
  }
}

module.exports = Question
