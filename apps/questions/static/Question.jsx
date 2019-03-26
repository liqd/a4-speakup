/* global django */
let React = require('react')


class Question extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      is_favourite: this.props.is_favourite
    }
  }

  markFavourite() {
    let value = !this.state.is_favourite
    this.props.markFavourite(this.props.id, value)
    this.setState({is_favourite: value})
  }

  render() {
    return (
      <div className="list-group-item border-bottom mb-2">
        <div>
          <p>{this.props.children}</p>
        </div>
        <div className="row">
          <div className="col-12">
            <span className="badge badge-light">{ this.props.category }</span>
            {this.props.isModerator &&
            <div>
              <button type="button" className="btn btn-transparent float-right"
                      onClick={this.props.handleDelete.bind(this, this.props.id)}>
                <i className="fas fa-check"/>
              </button>
              <button type="button" className="btn btn-transparent float-right" onClick={this.markFavourite.bind(this)}>
                <i className={this.state.is_favourite ? "fas fa-star text-secondary" : "far fa-star" }/>
              </button>
            </div>
            }
          </div>
        </div>
      </div>)
  }
}

module.exports = Question
