import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { cartReducer, orderListReducer } from './redux/reducers/cartReducers';
import {
  orderCreateReducer,
  orderDeleteReducer,
  orderDeliverReducer,
  orderPayReducer,
  orderUserListReducer,
} from './redux/reducers/orderReducers';
import {
  productCategoryReducer,
  productCreateReducer,
  productDeleteReducer,
  productDetailsReducer,
  productListReducer,
  productSalesReducer,
  productSubcategoryReducer,
  productSubListReducer,
  productUpdateReducer,
} from './redux/reducers/productReducers';
import {
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userSigninReducer,
  userSignupReducer,
  // userUpdateReducer,
} from './redux/reducers/userReducer';
import { orderDetailsReducer } from './redux/reducers/orderReducers';

const initialState = {
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    shippingInfo: localStorage.getItem('shippingInfo')
      ? JSON.parse(localStorage.getItem('shippingInfo'))
      : {},
    paymentMethod: 'paypal',
  },
  userSignin: {
    userInfo: localStorage.getItem('userInfo')
      ? JSON.parse(localStorage.getItem('userInfo'))
      : null,
  },
};
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  userSignin: userSigninReducer,
  userSignup: userSignupReducer,
  cart: cartReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  userDetails: userDetailsReducer,
  // userUpdate: userUpdateReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  orderList: orderListReducer,
  orderDelete: orderDeleteReducer,
  orderPay: orderPayReducer,
  orderUserList: orderUserListReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  orderDeliver: orderDeliverReducer,
  productCategoryList: productCategoryReducer,
  productSalesList: productSalesReducer,
  productSubcategoryList: productSubcategoryReducer,
  productSubList: productSubListReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancer(applyMiddleware(thunk)),
);

export default store;
