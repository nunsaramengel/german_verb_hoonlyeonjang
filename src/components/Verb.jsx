import React from 'react'
import "../styles/CurrentVerbStyles.css"

const Verb = ({question, isPastTense}) => {

  const QUESTION = question || "TEST"


  return (
    <div>
      <h1 className="currentVerbStyles" lang="de">
        {isPastTense ? QUESTION.pastTense : QUESTION.presentPerfect}
      </h1>
    </div>
  )
}

export default Verb