import produce from 'immer'
import execHandler from './reducerUtils'

const initialState = {
    categories: [],
    products: [],
    categoryProducts: [],
    shoppingCart: [],
    category: null,
    branch: [],
}

const product = {
    getAllCategories(state, action) {
        debugger
        state.categories = action.payload;
        // alert(JSON.stringify(state.categories));
    },
    getAllProducts(state, action) {
        debugger
        state.products = action.payload;
        // alert(JSON.stringify(state.products));
    },
    getProductByCategory(state, action) {
        debugger
        state.categoryProducts = [...state.products.filter(x => x.categoryCode == action.payload)]
    },
    changeCategory(state, action) {
        state.category = action.payload
    },
    getAllBranch(state, action) {
        state.branch = action.payload
    },
    deleteProduct(state, action) {
        state.products = state.products.filter(x => x._id != action.payload._id)
    },
    addCategory(state, action) {
        if (action.payload?._id)
            state.categories.push(action.payload)
    },
    addProduct(state, action) {
        if (action.payload?._id)
            state.products.push(action.payload)
    },
    addToCart(state, action) {
        debugger
        if (action.payload) {
            let index = state.shoppingCart?.indexOf(state.shoppingCart?.find(x => x.id == action.payload))
            if (index == -1)
                state.shoppingCart.push({ id: action.payload, count: 1 })
            else
                state.shoppingCart[index].count++
        }
    },
    updateCart(state, action) {
        if (action.payload) {
            let index = state.shoppingCart?.indexOf(state.shoppingCart?.find(x => x.id == action.payload.id))
            if (index !== -1)
                state.shoppingCart[index] = action.payload
        }
    },
    deleteFromCart(state, action) {
        if (action.payload) {
            state.shoppingCart = state.shoppingCart.filter(x => x.id !== action.payload)
        }
    },
    resetCart(state,action){
        state.shoppingCart = []
    },
    initialState
}

export default produce((state, action) => {
    execHandler(state, action, product)
}, initialState)