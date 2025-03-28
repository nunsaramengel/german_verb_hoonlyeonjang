import React from 'react'
import { useState } from 'react'
import "../styles/WrongVerbsList.css"
const ShowWrongVerbs = ({ wrongVerbs }) => {
    const [showWrongVerbs, setShowWrongVerbs] = useState(false)
    const handleButtonClick = (event) => {
        event.preventDefault();
        setShowWrongVerbs(!showWrongVerbs)
    }
    return (
        <div style={{zIndex: "100", marginTop: "30px"}}>        
            <button lang="ko" onClick={handleButtonClick}>{showWrongVerbs ? "복습할 동사 가리기" : '복습할 동사 보여주기'}</button>  
            <ul style={{ borderTop: showWrongVerbs ? '3px solid #1ED3DF' : " ", borderBottom: showWrongVerbs ? '3px solid #1ED3DF' : " " }}>
                {showWrongVerbs && (wrongVerbs.map((verb, index) => (
                    <li
                        key={index}
                        style={{ color: index % 2 === 0 ? 'aquamarine' : 'mediumvioletred' }}
                        lang="de"
                    >{verb.infinitive}&nbsp;&nbsp;&nbsp;{verb.pastTense}&nbsp;&nbsp;&nbsp;{verb.presentPerfect}
                    </li>
                )))}
            </ul>
        </div>
  )
}

export default ShowWrongVerbs