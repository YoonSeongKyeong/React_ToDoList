import React, { Component } from 'react'
import CategoryLabel from "./CategoryLabel"
import CategoryAdd from "./CategoryAdd"

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categoryStartIndex: 0
        }
        this.renderCategories = this.renderCategories.bind(this)
    }

    renderCategories() {//보여줄 카테고리의 object list를 array로 반환합니다.
        let startIndex = this.state.categoryStartIndex
        let numOFCategories = this.props.categoryList.length
        let allowedNumPerPage = this.props.maxNumOfCategoryPerPage
        let lastBound = (numOFCategories > (startIndex + allowedNumPerPage) ? (startIndex + allowedNumPerPage) : numOFCategories)//어떤 오브젝트들을 보내줄지 선택
        return this.props.categoryList.slice(startIndex, lastBound)
    }

    render() {
        return (
            <div>
                {
                    this.renderCategories().map(categoryObject => (
                        <CategoryLabel
                            key={categoryObject.categoryId}
                            categoryName={categoryObject.categoryName}
                            categoryObject={categoryObject}
                            handleCategorySelect={this.props.handleCategorySelect}
                            handleCategoryDelete={this.props.handleCategoryDelete}
                        />
                    ))
                }
                <CategoryAdd 
                    handleCategoryAdd={this.props.handleCategoryAdd}
                />
                {/* 이 곳에 카테고리 순회 <- -> 버튼을 넣을 것이다. */}
            </div>
        )
    }
}

export default Nav