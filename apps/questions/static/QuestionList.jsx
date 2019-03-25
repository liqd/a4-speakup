Question = require('./Question')


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
