import { createReducer } from '@reduxjs/toolkit'
import {
  updateCategoryItem,
  clearCategoryitems,
  setCategoryItems,
} from '../action'
import { CategoryItem } from './types'

const defaultState = [] as CategoryItem[]

const CategoryReducer = createReducer(defaultState, (builder) => {
  builder.addCase(setCategoryItems, (state, action) => {
    return action.payload
  })

  builder.addCase(updateCategoryItem, (state, action) => {
    const { id } = action.payload
    // find item in category
    const foundIndex = state.findIndex((item) => item?.id === id)

    if (foundIndex !== -1) {
      state[foundIndex] = action.payload
    }
    return state
  })

  builder
    .addCase(clearCategoryitems, (state, action) => {
      return defaultState
    })

    .addDefaultCase((state, action) => [])
})

export default CategoryReducer
