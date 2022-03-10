import produce, { current } from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    users: [],
    currentUser: null,
    adminAuth: '987654321',
    adminEmail: 'admin@gmail.com',
    isAdmin: false,
    userBasket: []
}

const user = {
    getAllUsers(state, action) {
        state.users = action.payload
    },
    addUser(state, action) {
        state.currentUser = action.payload
        if (action.payload?._id)
            state.users.push(action.payload)
    },
    login(state, action) {
        state.currentUser = action.payload
        if (state.currentUser.email == state.adminEmail && state.currentUser.password == state.adminAuth)
            state.isAdmin = true
        // state.users.push(action.payload) 
    },
    updateUser(state, action) {
        state.currentUser = action.payload
    },
    logout(state, action) {
        state.currentUser = null
        state.isAdmin = false
    },
    getBasketByUserId(state, action) {
        state.userBasket = action.payload
    }
    , initialState
}

export default produce((state, action) => {
    execHandler(state, action, user)
}, initialState)