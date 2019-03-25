/* global django */
let React = require('react')
let Question = require('./Question')


class StatisticsBox extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      questions: []
    }
  }

  getItems() {
    fetch(this.props.questions_api_url + '?is_answered=1')
      .then(response => response.json())
      .then(data => this.setState({
        questions: data
      }))
  }

  componentDidMount() {
    this.getItems()
    this.timer = setInterval(() => this.getItems(), 5000);
  }

  componentWillUnmount() {
    this.timer = null;
  }

  countCategory(category) {
    let count = 0
    this.state.questions.forEach(function (question) {
      if (question.category === category) {
        count++
      }
    })
    return Math.round(count * 100 / this.state.questions.length)
  }

  render() {
    return (
      <div>
        { this.props.categories.map((category, index) => {
          let count = this.countCategory(category)
          let style = {width: count + '%'}
          return (
            <div key={index}>
              <span>{category}</span>
              <div className="progress">
                <div className="progress-bar" style={style} role="progressbar" aria-valuenow="25" aria-valuemin="0"
                     aria-valuemax="100">{count}%
                </div>
              </div>
            </div>
          )
        })
        }
        <div className="list-group mt-5">
        { this.state.questions.map((question, index) => {
          return <Question
            key={question.id}
            id={question.id}
            is_answered={question.is_answered}
            is_favourite={question.is_favourite}
            category={question.category}
          >{question.text}</Question>
        })
        }
        </div>
      </div>
    )
  }

}

module.exports = StatisticsBox
