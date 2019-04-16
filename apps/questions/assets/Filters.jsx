/* global django */
let React = require('react')

class Filter extends React.Component {
  selectCategory (e) {
    e.preventDefault()
    let category = e.target.getAttribute('data-value')
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
      <div className='row mb-5'>
        <div className='col justify-content-center form-inline'>
          <div className='dropdown'>
            <button className={this.getButtonClass()} type='button' id='dropdownMenuButton'
              data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>
              {this.props.currentCategoryName}
            </button>
            <div className='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <a className='dropdown-item' data-value={-1} onClick={this.selectCategory.bind(this)} href='#'>{django.gettext('all')}</a>
              { this.props.categories.map((category, index) => {
                return <a className='dropdown-item' key={index} data-value={category} onClick={this.selectCategory.bind(this)} href='#'>{category}</a>
              })
              }
            </div>
          </div>
          {this.props.isModerator &&
          <div>
            <label htmlFor='markedCheck' className='pl-4'>
              <input
                type='checkbox'
                id='markedCheck'
                name='markedCheck'
                checked={this.props.onlyMarked}
                onChange={this.props.toggleOnlyMarked} />
              <span className='pl-2'>
                {django.gettext('only show marked questions')}
              </span>
            </label>
            <label htmlFor='orderedByLikes' className='pl-4'>
              <input
                type='checkbox'
                id='orderedByLikes'
                name='orderedByLikes'
                checked={this.props.orderedByLikes}
                onChange={this.props.toggleOrdering} />
              <span className='pl-2'>
                {django.gettext('order by likes')}
              </span>
            </label>
          </div>

          }
        </div>
      </div>
    )
  }
}

module.exports = Filter
