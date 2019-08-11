import React, { Component } from 'react'
import TodoList from './TodoList'
import TodoListAdd from './TodoListAdd'
import CompletedList from './CompletedList'

class MainTab extends Component {
    constructor(props) {
        super(props)

        this.todoListIdMaker = 100
        this.completedListIdMaker = 100

        this.numOfCompletedListsPerPage = 7;//한 페이지에 보여줄 완료된 리스트 수
        this.numOfTodoListsPerPage = 7;//한 페이지에 보여줄 할 일 리스트 수

        this.state = {
            completedListOn: false,// completedList를 펼칠지 결정한다.
            completedListStartIndex: 0,// completed list의 nav상태를 저장한다. 
            todoStartIndex: 0// todo list의 nav상태를 저장한다.
        }
        this.toggleCompletedListOn = this.toggleCompletedListOn.bind(this)
        this.renderCompletedList = this.renderCompletedList.bind(this)
        this.handleUnComplete = this.handleUnComplete.bind(this)
        this.handleComplete = this.handleComplete.bind(this)
        this.handleCompletedNavPrev = this.handleCompletedNavPrev.bind(this)
        this.handleCompletedNavNext = this.handleCompletedNavNext.bind(this)
        this.renderTodoList = this.renderTodoList.bind(this)
        this.handleTodoListAdd = this.handleTodoListAdd.bind(this)
        this.handleTodoListDelete = this.handleTodoListDelete.bind(this)
        this.handleTodoNavPrev = this.handleTodoNavPrev.bind(this)
        this.handleTodoNavNext = this.handleTodoNavNext.bind(this)
        
    }

    toggleCompletedListOn() {
        const { completedListOn } = this.state
        this.setState({ completedListOn: !completedListOn })
    }

    renderCompletedList() {//보여줄 Completed Lists의 object list를 array로 반환합니다.
        let startIndex = this.state.completedListStartIndex
        let numOFCompleted = this.props.categoryObj.completedList.length
        let allowedNumPerPage = this.numOfCompletedListsPerPage
        let lastBound = (numOFCompleted > (startIndex + allowedNumPerPage) ? (startIndex + allowedNumPerPage) : numOFCompleted)//어떤 오브젝트들을 보내줄지 선택
        return this.props.categoryObj.completedList.slice(startIndex, lastBound)
    }

    handleUnComplete(completeObj) {
        const newObj = Object.assign({}, this.props.categoryObj)
        const newTodoObj = { content: completeObj.content, id: this.todoListIdMaker }//TodoList에 다시 할 일을 넣는다.
        this.todoListIdMaker++
        newObj.todoList = [...newObj.todoList, newTodoObj]
        newObj.completedList = newObj.completedList.filter(eachObj => eachObj.id !== completeObj.id)//completedList에서 다시 할 일을 빼준다.
        this.props.handleCategoryChange(newObj, newObj.categoryId)//change된 categoryObj를 적용한다.
        const {completedListStartIndex} = this.state
        const numOFCompleted = this.props.categoryObj.completedList.length
        if(numOFCompleted === completedListStartIndex + 1) {//Complete를 하나 지워서 마지막 페이지가 비는 경우를 handle. ex 9개에서 1개 지우는데 한 페이지 표시가능 갯수가 8개인 경우 + 현재가 마지막 페이지인 경우
            this.setState({completedListStartIndex: completedListStartIndex-this.numOfCompletedListsPerPage})//이전 페이지로 돌아간다.
        }
    }

    handleComplete(todoObj) {
        const newObj = Object.assign({}, this.props.categoryObj)
        const newCompletedObj = { content: todoObj.content, id: this.completedListIdMaker }//completedList에 완료한 일을 넣는다.
        this.completedListIdMaker++
        newObj.completedList = [...newObj.completedList, newCompletedObj]
        newObj.todoList = newObj.todoList.filter(eachObj => eachObj.id !== todoObj.id)//todoList에서 완료한 일을 빼준다.
        this.props.handleCategoryChange(newObj, newObj.categoryId)//change된 categoryObj를 적용한다.
    }

    handleCompletedNavPrev() {
        const {completedListStartIndex} = this.state
        if(completedListStartIndex>0) {//이전 페이지가 존재하면
            this.setState({completedListStartIndex: completedListStartIndex-this.numOfCompletedListsPerPage})//이전 페이지로 돌아간다.
        }
    }

    handleCompletedNavNext() {
        const {completedListStartIndex} = this.state
        const numOfCompleted = this.props.categoryObj.completedList.length
        const nextcompletedListStartIndex = completedListStartIndex + this.numOfCompletedListsPerPage
        if(nextcompletedListStartIndex<numOfCompleted) {//다음 페이지에 표시할 게 있다면
            this.setState({completedListStartIndex: nextcompletedListStartIndex})//다음 페이지로 넘어간다.
        }
    }

    renderTodoList() {//보여줄 Todo Lists의 object list를 array로 반환합니다.
        let startIndex = this.state.todoStartIndex
        let numOfTodo = this.props.categoryObj.todoList.length
        let allowedNumPerPage = this.numOfTodoListsPerPage
        let lastBound = (numOfTodo > (startIndex + allowedNumPerPage) ? (startIndex + allowedNumPerPage) : numOfTodo)//어떤 오브젝트들을 보내줄지 선택
        return this.props.categoryObj.todoList.slice(startIndex, lastBound)
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
        const {todoStartIndex} = this.state
        const numOFCompleted = this.props.categoryObj.todoList.length
        if(numOFCompleted === todoStartIndex + 1) {//todoList를 하나 지워서 마지막 페이지가 비는 경우를 handle. ex 9개에서 1개 지우는데 한 페이지 표시가능 갯수가 8개인 경우 + 현재가 마지막 페이지인 경우
            this.setState({todoStartIndex: todoStartIndex-this.numOfTodoListsPerPage})//이전 페이지로 돌아간다.
        }
    }

    handleTodoNavPrev() {
        const {todoStartIndex} = this.state
        if(todoStartIndex>0) {//이전 페이지가 존재하면
            this.setState({todoStartIndex: todoStartIndex-this.numOfTodoListsPerPage})//이전 페이지로 돌아간다.
        }
    }

    handleTodoNavNext() {
        const {todoStartIndex} = this.state
        const numOfTodo = this.props.categoryObj.todoList.length
        const nextTodoStartIndex = todoStartIndex + this.numOfTodoListsPerPage
        if(nextTodoStartIndex<numOfTodo) {//다음 페이지에 표시할 게 있다면
            this.setState({todoStartIndex: nextTodoStartIndex})//다음 페이지로 넘어간다.
        }
    }

    render() {
        const { categoryName, completedList } = this.props.categoryObj
        const mainTab = this;
        return (
            <React.Fragment>
                <div>{categoryName}</div>
                {/* 이 자리에 visualizer가 들어갈 것이다. */}
                <button onClick={this.toggleCompletedListOn}>
                    {(this.completedListOn ? `완료 목록 접기` : `현재까지 총 ${completedList.length}개의 일을 완료했습니다.`)}
                </button>
                {this.state.completedListOn && this.renderCompletedList().map(completedObj => (
                    <CompletedList
                        key={completedObj.id}
                        completedObj={completedObj}
                        handleUnComplete={this.handleUnComplete}
                    />
                ))}
                {this.state.completedListOn &&//완료목록 navigation
                    <div>
                        <button onClick={this.handleCompletedNavPrev} >{`prev`}</button>
                        {`${mainTab.state.completedListStartIndex / mainTab.numOfCompletedListsPerPage}번째 페이지`}
                        <button onClick={this.handleCompletedNavNext} >{`next`}</button>
                    </div>
                }
                {this.renderTodoList().map(todoObj => (
                    <TodoList
                        key={todoObj.id}
                        todoObj={todoObj}
                        handleComplete={this.handleComplete}
                        handleTodoListDelete={this.handleTodoListDelete}
                    />))}
                <TodoListAdd handleTodoListAdd={this.handleTodoListAdd} />
                    <div>
                        <button onClick={this.handleTodoNavPrev} >{`prev`}</button>
                        {`${mainTab.state.todoStartIndex / mainTab.numOfTodoListsPerPage}번째 페이지`}
                        <button onClick={this.handleTodoNavNext} >{`next`}</button>
                    </div>
            </React.Fragment>
        )
    }
}

export default MainTab