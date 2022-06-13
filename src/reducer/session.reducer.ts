import { createReducer } from '@reduxjs/toolkit'
import { setSession, clearSession } from '../action'
import { Session } from './types'

const defaultState = null as Session

const SessionReducer = createReducer(defaultState, (builder) => {
  builder.addCase(setSession, (state, action) => {
    state = action.payload
  })

  builder
    .addCase(clearSession, (state, action) => {
      return defaultState
    })

    .addDefaultCase((state, action) => null)
})

export default SessionReducer
