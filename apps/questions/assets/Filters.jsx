/* global django */
const React = require('react')

class Filter extends React.Component {
  selectCategory (e) {
    e.preventDefault()
    const category = e.target.getAttribute('data-value')
    this.props.setCategories(category)
  }

  getButtonClass () {
    if (this.props.currentCategory === '-1') {
      return 'btn btn-primary btn-round dropdown-toggle'
    } else {
      return 'btn btn-secondary btn-round dropdown-toggle'
    }
  }

  render () {
    return (
      <div className="mb-5">
        <div className="justify-content-center form-inline">
          <div className="dropdown">
            <button className={this.getButtonClass()} type="button" id="dropdownMenuButton"
              data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {this.props.currentCategoryName}
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <button className="dropdown-item" data-value={-1} onClick={this.selectCategory.bind(this)} href="#">{django.gettext('all')}</button>
              { this.props.categories.map((category, index) => {
                return <button className="dropdown-item" key={index} data-value={category} onClick={this.selectCategory.bind(this)} href="#">{category}</button>
              })
              }
            </div>
          </div>
          {this.props.isModerator &&
          <div>
            <div className="checkbox-btn">
              <label htmlFor="markedCheck" className="checkbox-btn__label--primary pl-3">
                <input
                  className='checkbox-btn__input'
                  type='checkbox'
                  id='markedCheck'
                  name='markedCheck'
                  checked={this.props.displayOnShortlist}
                  onChange={this.props.toggleDisplayOnShortlist} />
                <span className='checkbox-btn__text'>
                  <i className='fas fa-bookmark' aria-label={django.gettext('only show marked questions')} />
                </span>
              </label>
            </div>
            <div className="checkbox-btn">
              <label htmlFor="orderedByLikes" className="checkbox-btn__label--transparent">
                <input
                  className="checkbox-btn__input"
                  type="checkbox"
                  id="orderedByLikes"
                  name="orderedByLikes"
                  checked={this.props.orderedByLikes}
                  onChange={this.props.toggleOrdering} />
                <span className="checkbox-btn__text">
                  <i className="fas fa-sort-amount-up" aria-label={django.gettext('order by likes')} /> likes
                </span>
              </label>
            </div>
          </div>

          }
        </div>
      </div>
    )
  }
}

module.exports = Filter
