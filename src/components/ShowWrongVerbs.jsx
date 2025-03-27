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
        <>        
            <button onClick={handleButtonClick}>{showWrongVerbs ? "복습할 동사 가리기" : '복습할 동사 보여주기'}</button>  
            <ul style={{ border: showWrongVerbs ? '2px solid #1ED3DF' : " " }}>
                {showWrongVerbs && (wrongVerbs.map((verb, index) => (
                    <li
                        key={index}
                        style={{ color: index % 2 === 0 ? 'aquamarine' : 'mediumvioletred' }}
                    >{verb}
                    </li>
                )))}
            </ul>
        </>
  )
}

export default ShowWrongVerbs