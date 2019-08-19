/* global fetch */
/* global django */
let React = require('react')
let Question = require('./QuestionUser')

class PresentBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: []
    }
  }

  getItems () {
    fetch(this.props.questions_api_url + '?is_live=1')
      .then(response => response.json())
      .then(data => this.setState({
        questions: data
      }))
  }

  componentDidMount () {
    this.getItems()
    this.timer = setInterval(() => this.getItems(), 5000)
  }

  componentWillUnmount () {
    this.timer = null
  }

  render () {
    if (this.state.questions.length > 0) {
      return (
        <div>
          <div className='list-group mt-5'>
            { this.state.questions.map((question, index) => {
              return <Question
                key={question.id}
                id={question.id}
                is_answered={question.is_answered}
                is_on_shortlist={question.is_on_shortlist}
                category={question.category}
                likes={question.likes}
              >{question.text}</Question>
            })
            }
          </div>
        </div>
      )
    } else {
      return (
        <div className='row justify-content-center'>
          <div className='col-8 text-center'>
            <h1>{this.props.title}</h1>
            <p>{django.gettext('join in')} <a href={this.props.url}>{this.props.url}</a></p>
          </div>
        </div>
      )
    }
  }
}

module.exports = PresentBox
