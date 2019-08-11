import React, { Component } from 'react'
import Nav from './components/Nav'
import MainTab from './components/MainTab.js'

class App extends Component {
  constructor(props) {
    super(props)
    this.defaultCategory = {//디폴트 카테고리는 안내문서 -> 수정 불가능
      categoryId: -1,
      categoryName: "안내 문서",
      completedList: [
      ],
      todoList: [
      ]
    }
    this.state = {
      categoryList: [//전체 카테고리 목록
        {//한 카테고리
          categoryId: 0,
          categoryName: "할일 목록 1",
          completedList: [//카테고리 안의 완료 목록
            { content: "일어나기", id: 0 }
          ],
          todoList: [//카테고리 안의 할일 목록
            { content: "잠자기", id: 0 }
          ]
        },
        {//한 카테고리
          categoryId: 1,
          categoryName: "할일 목록 2",
          completedList: [//카테고리 안의 완료 목록
            { content: "놀기", id: 0 }
          ],
          todoList: [//카테고리 안의 할일 목록
            { content: "친구만나기", id: 0 }
          ]
        }
      ],
      nowCategory: this.defaultCategory//맨 처음은 defaultCategory를 표시
    }
    this.handleCategorySelect = this.handleCategorySelect.bind(this)
    this.handleCategoryDelete = this.handleCategoryDelete.bind(this)
    this.handleCategoryAdd = this.handleCategoryAdd.bind(this)
    this.handleCategoryChange = this.handleCategoryChange.bind(this)
  }

  handleCategorySelect(categoryObj) {//카테고리를 선택했을 때, 현재 카테고리로 설정
    this.setState({ nowCategory: categoryObj })
  }

  handleCategoryDelete(categoryId) {//카테고리를 삭제시, 해당 카테고리 삭제
    const { categoryList, nowCategory } = this.state
    this.setState({
      categoryList: categoryList.filter((categoryObj) => categoryId !== categoryObj.categoryId),
      nowCategory: (categoryId === nowCategory.categoryId ? this.defaultCategory : nowCategory)//지우려는 카테고리가 현재 카테고리인 경우
    })
  }

  handleCategoryAdd(newCategoryName, newcategoryId) {
    const { categoryList } = this.state
    const newCategoryObj = {
      categoryId: newcategoryId,
      categoryName: newCategoryName,
      completedList: [],
      todoList: []
    }
    this.setState({
      categoryList: [...categoryList, newCategoryObj]
    })
  }

  handleCategoryChange(alteredCategoryObj, categoryId) {// MainTab의 category Object를 새로 설정한 category Object로 대체한다
    if (categoryId !== -1) {//default category가 아닌 경우
      const { categoryList } = this.state
      this.setState({
        categoryList: categoryList.map(categoryObj => {
          if (categoryObj.categoryId === categoryId) {
            return alteredCategoryObj
          }
          return categoryObj
        }),
        nowCategory: alteredCategoryObj
      })
    }
  }

  render() {
    return (
      <React.Fragment>
        <Nav// 카테고리 목록을 표시한다.
          categoryList={this.state.categoryList}
          maxNumOfCategoryPerPage={8}
          handleCategorySelect={this.handleCategorySelect}
          handleCategoryDelete={this.handleCategoryDelete}
          handleCategoryAdd={this.handleCategoryAdd}
        />
        <MainTab
          categoryObj={this.state.nowCategory}
          handleCategoryChange={this.handleCategoryChange}
        />
      </React.Fragment>
    )
  }
}

export default App