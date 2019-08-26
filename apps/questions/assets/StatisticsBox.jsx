/* global fetch */
/* global django */
import { updateItem } from './helpers.js'

const React = require('react')
const QuestionUser = require('./QuestionUser')
const QuestionModerator = require('./QuestionModerator')

class StatisticsBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: [],
    }
  }

  getItems () {
    fetch(this.props.questions_api_url)
      .then(response => response.json())
      .then(data => this.setState({
        questions: data
      }))
  }

  updateQuestion (data, id) {
    })
    const url = this.props.questions_api_url + id + '/'
    return updateItem(data, url, 'PATCH')
  }

  removeFromList (id, data) {
    this.updateQuestion(data, id)
      .then(response => this.setState(prevState => ({
      })))
  }

  componentDidMount () {
    this.getItems()
    this.timer = setInterval(() => this.getItems(), 5000)
  }

  componentWillUnmount () {
    this.timer = null
  }

  countCategory (category) {
    let countPerCategory = 0
    let answeredQuestions = 0
    this.state.questions.forEach(function (question) {
      if (question.is_answered && !question.is_hidden) {
        answeredQuestions++
        if (question.category === category) {
          countPerCategory++
        }
      }
    })
    return Math.round(countPerCategory * 100 / answeredQuestions) || 0
  }

  render () {
    return (
      <div>
        <div className="row justify-content-center">
          <div className="col-12 col-md-8">
            { this.props.categories.map((category, index) => {
              const countPerCategory = this.countCategory(category)
              const style = { width: countPerCategory + '%' }
              return (
                <div key={index} className="mt-3">
                  <span>{category}</span>
                  <div className="progress">
                    <div className="progress-bar" style={style} role="progressbar" aria-valuenow="25" aria-valuemin="0"
                      aria-valuemax="100">{countPerCategory}%
                    </div>
                  </div>
                </div>
              )
            })
            }
          </div>
        </div>
        <h3 className="mt-5">{django.gettext('Posts included')}</h3>
        {this.props.isModerator
          ? <div className="list-group mt-5">
            { this.state.questions.map((question, index) => {
              if (question.is_answered || question.is_hidden) {
                return <QuestionModerator
                  updateQuestion={this.updateQuestion.bind(this)}
                  showAllButtons={false}
                  removeFromList={this.removeFromList.bind(this)}
                  key={question.id}
                  id={question.id}
                  is_answered={question.is_answered}
                  is_on_shortlist={question.is_on_shortlist}
                  is_live={question.is_live}
                  is_hidden={question.is_hidden}
                  category={question.category}
                  likes={question.likes}
                >{question.text}</QuestionModerator>
              }
            })
            }
          </div>
          : <div className="list-group mt-5">
            { this.state.questions.map((question, index) => {
              if (question.is_answered && !question.is_hidden) {
                return <QuestionUser
                  key={question.id}
                  id={question.id}
                  is_answered={question.is_answered}
                  is_on_shortlist={question.is_on_shortlist}
                  is_live={question.is_live}
                  is_hidden={question.is_hidden}
                  category={question.category}
                  likes={question.likes}
                >{question.text}</QuestionUser>
              }
            })
            }
          </div>
        }
      </div>
    )
  }
}

module.exports = StatisticsBox
