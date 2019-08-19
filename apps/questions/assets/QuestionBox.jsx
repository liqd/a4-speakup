/* global django fetch */
let React = require('react')
let QuestionList = require('./QuestionList')
let Filters = require('./Filters')
let cookie = require('js-cookie')

class QuestionBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: [],
      filteredQuestions: [],
      category: '-1',
      categoryName: django.gettext('select category'),
      onlyMarked: false,
      orderedByLikes: false,
      filterChanged: false,
      orderingChanged: false,
      csrfToken: cookie.get('csrftoken')
    }
  }

  setCategory (category) {
    let newName = (category === '-1') ? django.gettext('select category') : category
    this.setState({
      filterChanged: true,
      categoryName: newName,
      category: category
    })
  }

  toggleOnlyMarked () {
    let onlyMarked = !this.state.onlyMarked
    this.setState({
      filterChanged: true,
      onlyMarked: onlyMarked
    })
  }

  toggleOrdering () {
    let orderedByLikes = !this.state.orderedByLikes
    this.setState({
      orderingChanged: true,
      orderedByLikes: orderedByLikes
    })
  }

  isInFilter (item) {
    return (this.state.category === '-1' || this.state.category === item.category) &&
      (!this.state.onlyMarked || item.is_on_shortlist)
  }

  filterQuestions (questions) {
    let filteredQuestions = []
    questions.forEach((item) => {
      if (this.isInFilter(item)) {
        filteredQuestions.push(item)
      }
    })
    return filteredQuestions
  }

  updateList () {
    let filteredQuestions = this.filterQuestions(this.state.questions)
    this.setState({
      filterChanged: false,
      filteredQuestions: filteredQuestions
    })
  }

  getUrl () {
    let url = this.props.questions_api_url + '?is_answered=0' + '&is_hidden=0'
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
    let data = { is_answered: 1 }
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
          onlyMarked={this.state.onlyMarked}
          toggleOnlyMarked={this.toggleOnlyMarked.bind(this)}
          isModerator={this.props.isModerator}
        />
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
