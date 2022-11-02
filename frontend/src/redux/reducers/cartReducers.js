import {
  CART_ADD_ITEM,
  CART_EMPTY,
  REMOVE_CART_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';
import {
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x,
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case SAVE_SHIPPING_ADDRESS:
      return {
        ...state,
        shippingInfo: action.payload,
      };
    case SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    case CART_EMPTY:
      return { ...state, cartItems: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
