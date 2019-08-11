import React from 'react'

function CompletedList({completedObj, handleUnComplete}) {
    
    const clickedUnComplete = () => {
        handleUnComplete(completedObj)
    }

    return (
        <div>
            {completedObj.content}
            <button onClick={clickedUnComplete}>undo</button>
        </div>
    )
}

export default CompletedList
