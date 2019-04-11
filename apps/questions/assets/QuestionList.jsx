let Question = require('./Question')
let React = require('react')

let QuestionList = (props) => {
  return (
    <div>
      {
        props.questions.map((question, index) => {
          return <Question
            key={question.id}
            handleDelete={props.handleDelete.bind(this)}
            updateQuestion={props.updateQuestion.bind(this)}
            handleLike={props.handleLike.bind(this)}
            isModerator={props.isModerator}
            hasRatingPermission={props.hasRatingPermission}
            id={question.id}
            is_answered={question.is_answered}
            is_favourite={question.is_favourite}
            category={question.category}
            likes={question.likes}
          >{question.text}</Question>
        })
      }
    </div>
  )
}

module.exports = QuestionList
