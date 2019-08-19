/* global fetch */
/* global django */
let React = require('react')
let Question = require('./QuestionUser')

class StatisticsBox extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      questions: []
    }
  }

  getItems () {
    fetch(this.props.questions_api_url)
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

  countCategory (category) {
    let count = 0
    this.state.questions.forEach(function (question) {
      if (question.category === category) {
        count++
      }
    })
    return Math.round(count * 100 / this.state.questions.length) || 0
  }

  render () {
    return (
      <div>
        { this.props.categories.map((category, index) => {
          let count = this.countCategory(category)
          let style = { width: count + '%' }
          return (
            <div key={index} className='mt-3'>
              <span>{category}</span>
              <div className='progress'>
                <div className='progress-bar' style={style} role='progressbar' aria-valuenow='25' aria-valuemin='0'
                  aria-valuemax='100'>{count}%
                </div>
              </div>
            </div>
          )
        })
        }
        <h5 className='mt-5'>{django.gettext('Posts included')}</h5>
        {this.props.isModerator
          ? <div className='list-group mt-5'>
            { this.state.questions.map((question, index) => {
              if (question.is_answered || question.is_hidden) {
                return <Question
                  key={question.id}
                  id={question.id}
                  is_answered={question.is_answered}
                  is_on_shortlist={question.is_on_shortlist}
                  is_live={question.is_live}
                  is_hidden={question.is_hidden}
                  category={question.category}
                  likes={question.likes}
                >{question.text}</Question>
              }
            })
            }
          </div>
          : <div className='list-group mt-5'>
            { this.state.questions.map((question, index) => {
              if (question.is_answered && !question.is_hidden) {
                return <Question
                  key={question.id}
                  id={question.id}
                  is_answered={question.is_answered}
                  is_live={question.is_live}
                  is_hidden={question.is_hidden}
                  category={question.category}
                  likes={question.likes}
                >{question.text}</Question>
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
