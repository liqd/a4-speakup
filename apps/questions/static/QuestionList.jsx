let React = require('react')


class Question extends React.Component {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      <div className="list-group-item mb-2">
        <p>{this.props.children}</p>
        <span className="badge badge-info">{ this.props.category }</span>
      </div>)
  }
}


let QuestionList = (props) => {
  return (
    <div>
      {
        props.questions.map((question, index) => {
          return <Question
            key={question.id}
            authorIsModerator={props.is_moderator}
            id={question.id}
            is_answered={question.is_answered}
            category={question.category}
          >{question.text}</Question>
        })
      }
    </div>
  )
}

module.exports = QuestionList
