import React from 'react'

const Verb = ({question, isPastTense}) => {

  const QUESTION = question || "TEST"


  return (
    <div>
      <h1 style={{color: "#1ED3DF", fontSize: "2.7rem"}} className="currentVerbStyles">
        {isPastTense ? QUESTION.pastTense : QUESTION.presentPerfect}
      </h1>
    </div>
  )
}

export default Verb