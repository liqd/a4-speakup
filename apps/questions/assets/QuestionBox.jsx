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
      filterChanged: false,
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

  isInFilter (item) {
    return (this.state.category === '-1' || this.state.category === item.category)
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

  getItems () {
    fetch(this.props.questions_api_url + '?is_answered=0')
      .then(response => response.json())
      .then(data => this.setState({
        questions: data,
        filteredQuestions: this.filterQuestions(data)
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
  }

  render () {
    return (
      <div>
        <Filters
          categories={this.props.categories}
          currentCategory={this.state.categoryName}
          setCategories={this.setCategory.bind(this)}
        />
        <QuestionList
          questions={this.state.filteredQuestions}
          handleDelete={this.handleDelete.bind(this)}
          updateQuestion={this.updateQuestion.bind(this)}
          isModerator={this.props.isModerator}
        />
      </div>)
  }
}

module.exports = QuestionBox
