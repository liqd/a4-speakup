let React = require('react')
let QuestionList = require('./QuestionList')

class QuestionBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: []
    }
  }

  getItems () {
    fetch(this.props.questions_api_url)
      .then(response => response.json())
      .then(data => this.setState({questions: data}))
  }

  componentDidMount() {
    this.getItems()
    this.timer = setInterval(()=> this.getItems(), 5000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  render () {
    return (<QuestionList
      questions={this.state.questions}
      is_moderator={this.props.is_moderator}
    />)
  }

}

module.exports = QuestionBox
