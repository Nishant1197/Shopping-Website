import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import { productDetailsReducer, productListReducer } from './reducers/productReducers'


const middleware=[thunk]
const reducer=combineReducers(
    {
        productList:productListReducer,
        productDetails:productDetailsReducer

    })
const store=createStore(reducer,composeWithDevTools(applyMiddleware(...middleware)))

export default store