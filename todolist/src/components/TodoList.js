import React from 'react'

function TodoList({todoObj, handleComplete, handleTodoListDelete}) {
    const clickedComplete = () => {
        handleComplete(todoObj)
    }

    const clickedDelete = () => {
        handleTodoListDelete(todoObj.id)
    }

    return (
        <div>
            <button onClick={clickedComplete}>완료</button>
            {todoObj.content}
            {/* 나중에 여기에 수정 기능을 만들 것이다. */}
            <button onClick={clickedDelete}>삭제</button>
        </div>
    )
}

export default TodoList
