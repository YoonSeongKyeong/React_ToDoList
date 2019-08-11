import React, { Component } from 'react'
import CategoryLabel from "./CategoryLabel"
import CategoryAdd from "./CategoryAdd"

class Nav extends Component {
    constructor(props) {
        super(props)
        this.maxNumOfCategoryPerPage=8
        this.state = {
            categoryStartIndex: 0
        }
        this.getLastPage = this.getLastPage.bind(this)
        this.renderCategories = this.renderCategories.bind(this)
        this.handleCategoryDelete = this.handleCategoryDelete.bind(this)
        this.handleCategoryAdd = this.handleCategoryAdd.bind(this)
        this.handleCategoryPrev = this.handleCategoryPrev.bind(this)
        this.handleCategoryNext = this.handleCategoryNext.bind(this)
    }

    getLastPage() {
        const numOFCategories = this.props.categoryList.length
        const allowedNumPerPage = this.maxNumOfCategoryPerPage
        return Math.floor((numOFCategories-1)/allowedNumPerPage) 
    }

    renderCategories() {//보여줄 카테고리의 object list를 array로 반환합니다.
        const startIndex = this.state.categoryStartIndex
        const numOFCategories = this.props.categoryList.length
        const allowedNumPerPage = this.maxNumOfCategoryPerPage
        const lastBound = (numOFCategories > (startIndex + allowedNumPerPage) ? (startIndex + allowedNumPerPage) : numOFCategories)//어떤 오브젝트들을 보내줄지 선택
        return this.props.categoryList.slice(startIndex, lastBound)
    }

    handleCategoryDelete(categoryId) {//카테고리를 지워서 마지막 페이지가 비는 경우를 handle
        const superDelete = this.props.handleCategoryDelete;
        const {categoryStartIndex} = this.state
        const numOFCategories = this.props.categoryList.length
        if(numOFCategories === categoryStartIndex + 1) {//ex 9개에서 1개 지우는데 한 페이지 표시가능 갯수가 8개인 경우 + 현재가 마지막 페이지인 경우
            this.setState({categoryStartIndex: categoryStartIndex-this.maxNumOfCategoryPerPage})//이전페이지로 돌아간다
        }
        superDelete(categoryId)//원래 지우는 기능
    }

    handleCategoryAdd(newCategoryName, newcategoryId) {//카테고리를 더했을 때 더해진 카테고리가 속한 페이지로 가는 기능
        const superAdd = this.props.handleCategoryAdd;
        const numOFCategories = this.props.categoryList.length
        const allowedNumPerPage = this.maxNumOfCategoryPerPage
        const startIndex = this.state.categoryStartIndex
        const lastPageIndex = allowedNumPerPage*(Math.floor((numOFCategories-1)/allowedNumPerPage))
        if(numOFCategories!==0 && numOFCategories % allowedNumPerPage === 0) {//ex 현재 8*n개인데 한페이지 표시가능 갯수가 8개라서 하나 더하면 새로운 페이지에 나오는 경우
            this.setState({categoryStartIndex: numOFCategories})// 새로운 페이지로 간다.
        }
        else if(startIndex!==lastPageIndex) {//마지막 페이지가 아니였으면 마지막 페이지로 간다.
            this.setState({categoryStartIndex: lastPageIndex})
        }
        superAdd(newCategoryName, newcategoryId)//원래 더하는 기능
    }

    handleCategoryPrev() {
        const {categoryStartIndex} = this.state
        if(categoryStartIndex>0) {//이전 페이지가 존재하면
            this.setState({categoryStartIndex: categoryStartIndex-this.maxNumOfCategoryPerPage})//이전 페이지로 돌아간다.
        }
    }

    handleCategoryNext() {
        const {categoryStartIndex} = this.state
        const numOFCategories = this.props.categoryList.length
        const nextCategoryStartIndex = categoryStartIndex + this.maxNumOfCategoryPerPage
        if(nextCategoryStartIndex<numOFCategories) {//다음 페이지에 표시할 게 있다면
            this.setState({categoryStartIndex: nextCategoryStartIndex})//다음 페이지로 넘어간다.
        }
    }

    render() {
        const nav = this;
        return (
            <div>
                {
                    this.renderCategories().map(categoryObject => (
                        <CategoryLabel
                            key={categoryObject.categoryId}
                            categoryName={categoryObject.categoryName}
                            categoryObject={categoryObject}
                            handleCategorySelect={this.props.handleCategorySelect}
                            handleCategoryDelete={this.handleCategoryDelete}
                        />
                    ))
                }
                <CategoryAdd
                    handleCategoryAdd={this.handleCategoryAdd}
                />
                <div>
                    <button onClick={this.handleCategoryPrev} >{`prev`}</button>
                    {`${nav.state.categoryStartIndex / nav.maxNumOfCategoryPerPage}번째 페이지 / ${this.getLastPage()}`}
                    <button onClick={this.handleCategoryNext} >{`next`}</button>
                </div>
            </div>
        )
    }
}

export default Nav