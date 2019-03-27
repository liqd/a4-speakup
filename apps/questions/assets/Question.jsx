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

  handleLike () {
    let value = !this.state.session_like
    this.props.handleLike(this.props.id, value)
      .then(this.setState(
        {
          session_like: value,
          likes: value ? this.state.likes + 1 : this.state.likes - 1
        }
      ))
  }

  render () {
    return (
      <div className='list-group-item border-bottom mb-2'>
        <div>
          <p>{this.props.children}</p>
        </div>
        <div className='row'>
          <div className='col-12'>
            <span className='badge badge-secondary'>{ this.props.category }</span>
            {this.props.isModerator &&
            <div>
              <button type='button' className='btn btn-transparent float-right'
                onClick={this.props.handleDelete.bind(this, this.props.id)}>
                <i className='fas fa-check' />
              </button>
              <button type='button' className='btn btn-transparent float-right' onClick={this.markFavourite.bind(this)}>
                <i className={this.state.is_favourite ? 'fas fa-bookmark text-secondary' : 'far fa-bookmark'} />
              </button>
            </div>
            }
            <div>
              <button type='button' className='btn btn-transparent float-right' onClick={this.handleLike.bind(this)}>
                <i className={this.state.session_like ? 'fas fa-thumbs-up text-secondary' : 'far fa-thumbs-up'} />
                <span>{this.state.likes}</span>
              </button>
            </div>
          </div>
        </div>
      </div>)
  }
}

module.exports = Question
