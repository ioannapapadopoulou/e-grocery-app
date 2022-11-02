import Axios from 'axios';
import { CART_EMPTY } from '../constants/cartConstants';
import {
  ORDER_DELETE_FAIL,
  ORDER_DELETE_REQUEST,
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_FAIL,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_USER_LIST_FAIL,
  ORDER_USER_LIST_REQUEST,
  ORDER_USER_LIST_SUCCESS,
} from '../constants/orderConstants';

export const createOrder = (order) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_REQUEST,
    payload: order,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post('/api/orders', order, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({
      type: ORDER_SUCCESS,
      payload: data.order,
    });
    dispatch({ type: CART_EMPTY });
    localStorage.removeItem('cartItems');
  } catch (error) {
    dispatch({
      type: ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const detailsOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DETAILS_REQUEST,
    payload: orderId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/orders', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_LIST_FAIL,
      payload: errorMessage,
    });
  }
};

export const deleteOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DELETE_REQUEST,
    payload: orderId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = Axios.delete(`/api/orders/${orderId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DELETE_FAIL,
      payload: errorMessage,
    });
  }
};

export const payOrder =
  (order, paymentResult) => async (dispatch, getState) => {
    dispatch({
      type: ORDER_PAY_REQUEST,
      payload: { order, paymentResult },
    });
    try {
      const {
        userSignin: { userInfo },
      } = getState();
      const { data } = await Axios.put(
        `/api/orders/${order._id}/pay`,
        paymentResult,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        },
      );
      dispatch({
        type: ORDER_PAY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: ORDER_PAY_FAIL,
        payload: errorMessage,
      });
    }
  };

export const deliverdOrder = (orderId) => async (dispatch, getState) => {
  dispatch({
    type: ORDER_DELIVER_REQUEST,
    payload: orderId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(
      `/api/orders/${orderId}/deliver`,
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    );
    dispatch({ type: ORDER_DELIVER_SUCCESS, payload: data });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload: errorMessage,
    });
  }
};

export const listUserOrder = () => async (dispatch, getState) => {
  dispatch({
    type: ORDER_USER_LIST_REQUEST,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.get('/api/orders/myOrders', {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: ORDER_USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const errorMessage =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_USER_LIST_FAIL,
      payload: errorMessage,
    });
  }
};
