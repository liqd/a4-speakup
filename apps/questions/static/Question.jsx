let React = require('react')


class Question extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hidden: false
    }
  }

  render () {

    return (
      <div className="list-group-item mb-2">
        <div>
          <p>{this.props.children}</p>
          <span className="badge badge-info">{ this.props.category }</span>
        </div>
        {this.props.isModerator &&
        <div className="row">
          <div className="col-12">
            <button type="button" className="btn btn-primary float-right" onClick={this.props.handleDelete.bind(this, this.props.id)}>done</button>
          </div>
        </div>
        }
      </div>)
  }
}

module.exports = Question
