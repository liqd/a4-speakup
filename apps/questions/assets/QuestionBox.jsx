/* global django */
const React = require('react')
const QuestionList = require('./QuestionList')
const Filters = require('./Filters')
const cookie = require('js-cookie')

class QuestionBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: [],
      filteredQuestions: [],
      displayInfo: true,
      category: '-1',
      categoryName: django.gettext('select category'),
      displayOnShortlist: false,
      orderedByLikes: false,
      filterChanged: false,
      orderingChanged: false,
      csrfToken: cookie.get('csrftoken')
    }
  }

  setCategory (category) {
    const newName = (category === '-1') ? django.gettext('select category') : category
    this.setState({
      filterChanged: true,
      categoryName: newName,
      category: category
    })
  }

  toggleDisplayOnShortlist () {
    const displayOnShortlist = !this.state.displayOnShortlist
    this.setState({
      filterChanged: true,
      displayOnShortlist: displayOnShortlist
    })
  }

  toggleOrdering () {
    const orderedByLikes = !this.state.orderedByLikes
    this.setState({
      orderingChanged: true,
      orderedByLikes: orderedByLikes
    })
  }

  isInFilter (item) {
    return (this.state.category === '-1' || this.state.category === item.category) &&
      (!this.state.displayOnShortlist || item.is_on_shortlist)
  }

  filterQuestions (questions) {
    const filteredQuestions = []
    questions.forEach((item) => {
      if (this.isInFilter(item)) {
        filteredQuestions.push(item)
      }
    })
    return filteredQuestions
  }

  updateList () {
    const filteredQuestions = this.filterQuestions(this.state.questions)
    this.setState({
      filterChanged: false,
      filteredQuestions: filteredQuestions
    })
  }

  getUrl () {
    const url = this.props.questions_api_url + '?is_answered=0' + '&is_hidden=0'
    if (this.state.orderedByLikes) {
      return url + '&ordering=-like_count'
    }
    return url
  }

  getItems () {
    fetch(this.getUrl())
      .then(response => response.json())
      .then(data => this.setState({
        questions: data,
        filteredQuestions: this.filterQuestions(data),
        orderingChanged: false
      }))
  }

  updateQuestion (data, id) {
    return fetch(this.props.questions_api_url + id + '/', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRFToken': this.state.csrfToken
      },
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }

  handleDelete (id) {
    const data = { is_answered: 1 }
    this.updateQuestion(data, id)
      .then(response => this.setState(prevState => ({
        filteredQuestions: prevState.filteredQuestions.filter(question => question.id !== id)
      })))
  }

  handleLike (id, value) {
    return fetch('/api/questions/' + id + '/likes/', {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRFToken': this.state.csrfToken
      },
      method: 'POST',
      body: JSON.stringify({ value: value })
    })
  }

  componentDidMount () {
    this.getItems()
    this.timer = setInterval(() => this.getItems(), 5000)
  }

  componentWillUnmount () {
    this.timer = null
  }

  componentDidUpdate () {
    if (this.state.filterChanged === true) {
      this.updateList()
    }
    if (this.state.orderingChanged === true) {
      this.getItems()
    }
  }

  toggleInformation () {
    const displayInfo = !this.state.displayInfo
    this.setState({
      displayInfo: displayInfo
    })
  }

  render () {
    return (
      <div>
        <Filters
          categories={this.props.categories}
          currentCategory={this.state.category}
          currentCategoryName={this.state.categoryName}
          setCategories={this.setCategory.bind(this)}
          orderedByLikes={this.state.orderedByLikes}
          toggleOrdering={this.toggleOrdering.bind(this)}
          displayOnShortlist={this.state.displayOnShortlist}
          toggleDisplayOnShortlist={this.toggleDisplayOnShortlist.bind(this)}
          isModerator={this.props.isModerator}
        />
        {this.props.isModerator && this.state.displayInfo &&
          <div className="alert alert-secondary alert-dismissible">
            <div className="row pt-4">
              <div className="col-lg-3 pb-2"><i className='icon-push-in-list'/> {django.gettext('add favourite question to shortlist')}</div>
              <div className="col-lg-3 pb-2"><i className='icon-public-view'/> {django.gettext('display question on screen when being answered')}</div>
              <div className="col-lg-3 pb-2"><i className='icon-answered'/> {django.gettext('mark question a answered')}</div>
              <div className="col-lg-3 pb-2"><i className='icon-clear'/> {django.gettext('hide question from audiance when unaproppriate')}</div>
            </div>
            <button type='button' className='close' onClick={this.toggleInformation.bind(this)} aria-label='Close information'>
              <span aria-hidden='true'>&times;</span>
            </button>
          </div>
        }
        {this.props.isModerator && !this.state.displayInfo &&
          <div className='row justify-content-end'>
            <button type='button' className='btn btn-outline-secondary' onClick={this.toggleInformation.bind(this)} aria-label='Open information'>
              <span aria-hidden='true'><i className='fas fa-info-circle'></i></span>
            </button>
          </div>
        }
        <QuestionList
          questions={this.state.filteredQuestions}
          handleDelete={this.handleDelete.bind(this)}
          updateQuestion={this.updateQuestion.bind(this)}
          handleLike={this.handleLike.bind(this)}
          isModerator={this.props.isModerator}
          hasLikingPermission={this.props.hasLikingPermission}
        />
      </div>)
  }
}

module.exports = QuestionBox
