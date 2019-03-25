/* global django */
let React = require('react')


class Question extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_favourite: this.props.is_favourite
    }
  }

  markFavourite () {
    let value = !this.state.is_favourite
    this.props.markFavourite(this.props.id, value)
    this.setState({is_favourite: value})
  }

  render () {
    return (
      <div className={this.state.is_favourite ? "list-group-item list-group-item-warning mb-2" : "list-group-item mb-2" }>
        <div>
          <p>{this.props.children}</p>
          <span className="badge badge-info">{ this.props.category }</span>
        </div>
        {this.props.isModerator &&
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-primary float-right" onClick={this.markFavourite.bind(this)}>{django.gettext('mark favourite')}</button>
            <button type="button" className="btn btn-primary float-right" onClick={this.props.handleDelete.bind(this, this.props.id)}>{django.gettext('done')}</button>
          </div>
        </div>
        }
      </div>)
  }
}

module.exports = Question
