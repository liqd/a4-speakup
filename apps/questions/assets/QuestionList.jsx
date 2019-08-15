let QuestionModerator = require('./QuestionModerator')
let QuestionUser = require('./QuestionUser')
let React = require('react')

let QuestionList = (props) => {
  if (props.isModerator) {
    return (
      <div>
        {
          props.questions.map((question, index) => {
            return <QuestionModerator
              key={question.id}
              toggleAnswered={props.toggleAnswered.bind(this)}
              toggleHidden={props.toggleHidden.bind(this)}
              updateQuestion={props.updateQuestion.bind(this)}
              handleLike={props.handleLike.bind(this)}
              isModerator={props.isModerator}
              hasLikingPermission={props.hasLikingPermission}
              id={question.id}
              is_answered={question.is_answered}
              is_on_shortlist={question.is_on_shortlist}
              is_live={question.is_live}
              category={question.category}
              likes={question.likes}
            >{question.text}</QuestionModerator>
          })
        }
      </div>
    )
  } else {
    return (
      <div>
        {
          props.questions.map((question, index) => {
            return <QuestionUser
              key={question.id}
              toggleAnswered={props.toggleAnswered.bind(this)}
              toggleHidden={props.toggleHidden.bind(this)}
              updateQuestion={props.updateQuestion.bind(this)}
              handleLike={props.handleLike.bind(this)}
              isModerator={props.isModerator}
              hasLikingPermission={props.hasLikingPermission}
              id={question.id}
              is_answered={question.is_answered}
              is_favourite={question.is_favourite}
              category={question.category}
              likes={question.likes}
            >{question.text}</QuestionUser>
          })
        }
      </div>
    )
  }
}

module.exports = QuestionList
