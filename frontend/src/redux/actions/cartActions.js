import Axios from 'axios';
import {
  CART_ADD_ITEM,
  REMOVE_CART_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
} from '../constants/cartConstants';

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await Axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      title: data.title,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      sales: data.sales,
      qty,
    },
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItem = (productId) => async (dispatch, getState) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: productId,
  });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const saveShippingInfo = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem('shippingInfo', JSON.stringify(data));
};
export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });
};
