/* global django */
let React = require('react')

class Filter extends React.Component {
  constructor (props) {
    super(props)
  }

  selectCategory (e) {
    e.preventDefault()
    let category = e.target.getAttribute('data-value')
    this.props.setCategories(category)
  }

  render () {
    return (
      <div className="row mb-5">
        <div className="col text-center">
          <div className="dropdown">
            <button className="btn btn-secondary btn-round dropdown-toggle" type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.currentCategory}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <a className="dropdown-item" data-value={-1} onClick={this.selectCategory.bind(this)} href="#">{django.gettext('all')}</a>
              { this.props.categories.map((category, index) => {
                return <a className="dropdown-item" key={index} data-value={category} onClick={this.selectCategory.bind(this)} href="#">{category}</a>
              })
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Filter
