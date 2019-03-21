let React = require('react')
let QuestionList = require('./QuestionList')

class QuestionBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: []
    }
  }

  fetchData () {
    fetch(this.props.questions_api_url)
      .then(response => response.json())
      .then(data => this.setState({questions: data}))
  }

  componentDidMount () {
    this.fetchData()
  }

  render () {
    return (<QuestionList
      questions={this.state.questions}
      is_moderator={this.props.is_moderator}
    />)
  }

}

module.exports = QuestionBox
