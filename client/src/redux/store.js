import { createStore, combineReducers, applyMiddleware } from 'redux'
import user from './reducers/userReducer'
import product from './reducers/productReducer'
import actions from '../redux/actions'
import { crud } from './middleWares/middleWare'
import { productMiddle } from './middleWares/productMiddleWare'

const reducer = combineReducers({ user, product })
const store = createStore(reducer, applyMiddleware(crud))

// store.dispatch(actions.getAllCategories())
//store.dispatch(actions.getAllProducts())

window.store = store
export default store