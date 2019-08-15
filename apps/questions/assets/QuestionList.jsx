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
            hasLikingPermission={props.hasLikingPermission}
            id={question.id}
            is_answered={question.is_answered}
            is_on_shortlist={question.is_on_shortlist}
            category={question.category}
            likes={question.likes}
          >{question.text}</Question>
        })
      }
    </div>
  )
}

module.exports = QuestionList
