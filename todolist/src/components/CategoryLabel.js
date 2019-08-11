import React from 'react'

function CategoryLabel({ categoryName, categoryObject, handleCategorySelect, handleCategoryDelete }) {
    let handleSelect = () => {
        handleCategorySelect(categoryObject)
    }
    let handleDelete = () => {
        handleCategoryDelete(categoryObject.categoryId)
    }

    return (
        <div>
            <button onClick={handleSelect}>
                {categoryName/* 카테고리 선택 버튼 */}
            </button>
            <button onClick={handleDelete}>
                {"X"} {/* delete 버튼 */}
            </button>
        </div>
    )
}

export default CategoryLabel
