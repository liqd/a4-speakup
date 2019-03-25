/* global django */
let React = require('react')
let QuestionList = require('./QuestionList')
let Filters = require('./Filters')

class QuestionBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: [],
      filteredQuestions: [],
      category: '-1',
      categoryName: django.gettext('all'),
      filterChanged: false
    }
  }

  setCategory(category) {
    let newName = (category === '-1') ? django.gettext('all') : category
    this.setState({
      filterChanged: true,
      categoryName: newName,
      category: category
    })
  }

  isInFilter(item) {
    return (this.state.category === '-1' || this.state.category === item.category)
  }

  filterQuestions(questions) {
    let filteredQuestions = []
    questions.forEach((item) => {
      if (this.isInFilter(item)) {
        filteredQuestions.push(item)
      }
    })
    return filteredQuestions
  }

  updateList() {
    let filteredQuestions = this.filterQuestions(this.state.questions)
    this.setState({
      filterChanged: false,
      filteredQuestions: filteredQuestions
    })
  }

  getItems() {
    fetch(this.props.questions_api_url)
      .then(response => response.json())
      .then(data => this.setState({
        questions: data,
        filteredQuestions: this.filterQuestions(data)
      }))
  }

  handleDelete(id) {
    this.setState(prevState => ({
      questions: prevState.questions.filter(question => question.id != id)
    }))
  }

  componentDidMount() {
    this.getItems()
    this.timer = setInterval(() => this.getItems(), 5000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  componentDidUpdate() {
    if (this.state.filterChanged === true) {
      this.updateList()
    }
  }

  render() {
    return (
      <div>
        <Filters
          categories={this.props.categories}
          currentCategory={this.state.categoryName}
          setCategories={this.setCategory.bind(this)}
        />
        <QuestionList
          questions={this.state.questions}
          handleDelete={this.handleDelete.bind(this)}
          isModerator={this.props.isModerator}
        />
      </div>)
  }

}

module.exports = QuestionBox
