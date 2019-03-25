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
            markFavourite={props.markFavourite.bind(this)}
            isModerator={props.isModerator}
            id={question.id}
            is_answered={question.is_answered}
            is_favourite={question.is_favourite}
            category={question.category}
          >{question.text}</Question>
        })
      }
    </div>
  )
}

module.exports = QuestionList
