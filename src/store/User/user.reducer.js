import { createReducer } from '@reduxjs/toolkit'
import { addTodo } from './user.action'

export const reducer = createReducer({}, (builder) => {
  // actionCreator.toString() will automatically be called here
  // also, if you use TypeScript, the action type will be correctly inferred
  builder.addCase(addTodo, (state, action) => {
    state.username = action.payload
  })

  // // Or, you can reference the .type field:
  // // if using TypeScript, the action type cannot be inferred that way
  // builder.addCase(addTodo.type, (state, action) => {
  //   console.log(`action2`, action)
  // })
})