import { createStore, combineReducers } from 'redux'

import {
  notes,
} from './reducers'

const rootReducer = combineReducers({
  notes,
})


const store = createStore(rootReducer)
store.subscribe(() => console.log(store))

export default store
