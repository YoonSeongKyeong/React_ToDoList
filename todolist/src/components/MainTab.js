import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoListAdd from './TodoListAdd'
import CompletedList from './CompletedList'

class MainTab extends Component {
    constructor(props) {
        super(props)

        this.todoListIdMaker = 100
        this.completedListIdMaker = 100

        this.numOfCompletedListsPerPage=7;//한 페이지에 보여줄 완료된 리스트 수
        this.numOfTodoListsPerPage=7;//한 페이지에 보여줄 할 일 리스트 수

        this.state = {
            completedListOn: false,// completedList를 펼칠지 결정한다.
            completedListStartIndex: 0,// completed list의 nav상태를 저장한다. 
            todoStartIndex: 0// todo list의 nav상태를 저장한다.
        }
        this.handleUnComplete = this.handleUnComplete.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.handleTodoListAdd = this.handleTodoListAdd.bind(this)
        this.handleTodoListDelete = this.handleTodoListDelete.bind(this)
        this.toggleCompletedListOn = this.toggleCompletedListOn.bind(this)
    }

    toggleCompletedListOn() {
        const {completedListOn} = this.state
        this.setState({completedListOn:!completedListOn})
    }

    handleUnComplete(completeObj) {
        const newObj = Object.assign({}, this.props.categoryObj)
        const newTodoObj = { content: completeObj.content, id: this.todoListIdMaker }//TodoList에 다시 할 일을 넣는다.
        this.todoListIdMaker++
        newObj.todoList = [...newObj.todoList, newTodoObj]
        newObj.completedList = newObj.completedList.filter(eachObj => eachObj.id !== completeObj.id)//completedList에서 다시 할 일을 빼준다.
        this.props.handleCategoryChange(newObj, newObj.categoryId)//change된 categoryObj를 적용한다.
    }

    handleComplete(todoObj) {
        const newObj = Object.assign({}, this.props.categoryObj)
        const newCompletedObj = { content: todoObj.content, id: this.completedListIdMaker }//completedList에 완료한 일을 넣는다.
        this.completedListIdMaker++
        newObj.completedList = [...newObj.completedList, newCompletedObj]
        newObj.todoList = newObj.todoList.filter(eachObj => eachObj.id !== todoObj.id)//todoList에서 완료한 일을 빼준다.
        this.props.handleCategoryChange(newObj, newObj.categoryId)//change된 categoryObj를 적용한다.
    }

    handleTodoListAdd(newContent) {
        if (newContent.length !== 0) {//빈 상태로 클릭하지 않았다면
            const newObj = Object.assign({}, this.props.categoryObj)
            const newTodoObj = { content: newContent, id: this.todoListIdMaker }
            this.todoListIdMaker++
            newObj.todoList = [...newObj.todoList, newTodoObj]//todoList에 새로운 할 일을 넣는다.
            this.props.handleCategoryChange(newObj, newObj.categoryId)//change된 categoryObj를 적용한다.
        }
    }

    handleTodoListDelete(idToDelete) {
        const newObj = Object.assign({}, this.props.categoryObj)
        newObj.todoList = newObj.todoList.filter(eachObj => eachObj.id !== idToDelete)//todoList에서 제거할 일을 빼준다.
        this.props.handleCategoryChange(newObj, newObj.categoryId)//change된 categoryObj를 적용한다.
    }

    render() {
        const { categoryName, todoList, completedList} = this.props.categoryObj
        const mainTab = this;
        return (
            <React.Fragment>
                <div>{categoryName}</div>
                {/* 이 자리에 visualizer가 들어갈 것이다. */}
                <button onClick={this.toggleCompletedListOn}>
                    {(this.completedListOn?`완료 목록 접기`:`현재까지 총 ${completedList.length}개의 일을 완료했습니다.`)}
                </button>
                {this.state.completedListOn&&completedList.map(completedObj => (
                    <CompletedList
                        key={completedObj.id}
                        completedObj={completedObj}
                        handleUnComplete={this.handleUnComplete}
                    />
                ))}
                {this.state.completedListOn&&//완료목록 navigation
                    <div><button>{`prev`}</button>
                    {`${ mainTab.state.completedListStartIndex / mainTab.numOfCompletedListsPerPage}번째 페이지`}
                    <button>{`next`}</button></div>
                }
                {todoList.map(todoObj => (
                    <TodoList
                        key={todoObj.id}
                        todoObj={todoObj}
                        handleComplete={this.handleComplete}
                        handleTodoListDelete={this.handleTodoListDelete}
                    />))}
                <TodoListAdd handleTodoListAdd={this.handleTodoListAdd}/>
            </React.Fragment>
        )
    }
}

export default MainTab