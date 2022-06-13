import { createAction } from '@reduxjs/toolkit'
import { CategoryItem, Session } from '../reducer/types'

export const CATEGORY = {
  set: 'CATEGORY.SET',
  update: 'CATEGORY.UPDATE',
  clear: 'CATEGORY.CLEAR',
}

export const SESSION = {
  set: 'SESSION.SET',
  clear: 'SESSION.CLEAR',
}

// Category
export const setCategoryItems = createAction<CategoryItem[]>(CATEGORY.set)

export const updateCategoryItem = createAction<Required<CategoryItem>>(
  CATEGORY.update
)
export const clearCategoryitems = createAction(CATEGORY.clear)

// Session
export const setSession = createAction<Session>(SESSION.set)
export const clearSession = createAction(SESSION.clear)
