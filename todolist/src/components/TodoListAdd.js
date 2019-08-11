import React, { Component } from 'react'

class TodoListAdd extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleTodoListAdd = this.handleTodoListAdd.bind(this)
    }

    handleInputChange(e) {
        this.setState({ value: e.target.value })
    }

    handleTodoListAdd() {
        if (this.state.value.length !== 0) {//빈 input이 아닌 경우에 그 이름으로 TodoList 추가
            this.props.handleTodoListAdd(this.state.value)
            this.setState({value:""})
        }
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleInputChange} />
                <button onClick={this.handleTodoListAdd} >Add TodoList</button>
            </div>
        )
    }
}

export default TodoListAdd