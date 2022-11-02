import {
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_SALES_FAIL,
  PRODUCT_SALES_REQUEST,
  PRODUCT_SALES_SUCCESS,
  PRODUCT_SUBCATEGORY_FAIL,
  PRODUCT_SUBCATEGORY_REQUEST,
  PRODUCT_SUBCATEGORY_SUCCESS,
  PRODUCT_SUBLIST_FAIL,
  PRODUCT_SUBLIST_REQUEST,
  PRODUCT_SUBLIST_SUCCESS,
  PRODUCT_UPDATE_FAIL,
  PRODUCT_UPDATE_REQUEST,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';
import Axios from 'axios';

export const listProducts =
  ({ title = '', category = '' }) =>
  async (dispatch) => {
    dispatch({
      type: PRODUCT_LIST_REQUEST,
    });
    try {
      const { data } = await Axios.get(
        `/api/products?title=${title}&category=${category}`,
      );
      dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
    }
  };

export const listProductCategories = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_CATEGORY_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/products/categories`);
    dispatch({
      type: PRODUCT_CATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CATEGORY_FAIL,
      payload: error.message,
    });
  }
};

export const listProductSales = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_SALES_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/products/sales');
    dispatch({
      type: PRODUCT_SALES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SALES_FAIL,
      payload: error.message,
    });
  }
};

export const listProductSub = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_SUBLIST_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/products/subList');
    dispatch({
      type: PRODUCT_SUBLIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SUBLIST_FAIL,
      payload: error.message,
    });
  }
};

export const listProductSubcategory = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_SUBCATEGORY_REQUEST,
  });
  try {
    const { data } = await Axios.get('/api/products/subcategory');
    dispatch({
      type: PRODUCT_SUBCATEGORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_SUBCATEGORY_FAIL,
      payload: error.message,
    });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({
    type: PRODUCT_DETAILS_REQUEST,
    payload: productId,
  });
  try {
    const { data } = await Axios.get(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_CREATE_REQUEST });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.post(
      '/api/products',
      {},
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      },
    );
    dispatch({
      type: PRODUCT_CREATE_SUCCESS,
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateProductAction = (product) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_UPDATE_REQUEST,
    payload: product,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = await Axios.put(`/api/products/${product._id}`, product, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: PRODUCT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteProduct = (productId) => async (dispatch, getState) => {
  dispatch({
    type: PRODUCT_DELETE_REQUEST,
    payload: productId,
  });
  try {
    const {
      userSignin: { userInfo },
    } = getState();
    const { data } = Axios.delete(`/api/products/${productId}`, {
      headers: { Authorization: `Bearer ${userInfo.token}` },
    });
    dispatch({
      type: PRODUCT_DELETE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PRODUCT_DELETE_FAIL,
      payload: message,
    });
  }
};
