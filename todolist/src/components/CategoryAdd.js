import React, { Component } from 'react'

class CategoryAdd extends Component {
    constructor(props) {
        super(props)
        this.categoryIdMaker = 100//카테고리의 id를 만들어준다.
        this.state = {
            value: ""
        }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleCategoryAdd = this.handleCategoryAdd.bind(this)
    }

    handleInputChange(e) {
        this.setState({ value: e.target.value })
    }

    handleCategoryAdd() {
        if (this.state.value.length !== 0) {//빈 input이 아닌 경우에 그 이름으로 새 카테고리 추가
            this.props.handleCategoryAdd(this.state.value, this.categoryIdMaker)
            this.categoryIdMaker++
            this.setState({value:""})
        }
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleInputChange} />
                <button onClick={this.handleCategoryAdd} >Add Category</button>
            </div>
        )
    }
}

export default CategoryAdd