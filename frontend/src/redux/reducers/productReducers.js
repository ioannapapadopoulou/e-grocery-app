import {
  PRODUCT_CATEGORY_FAIL,
  PRODUCT_CATEGORY_REQUEST,
  PRODUCT_CATEGORY_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_RESET,
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
  PRODUCT_UPDATE_RESET,
  PRODUCT_UPDATE_SUCCESS,
} from '../constants/productConstants';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCategoryReducer = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT_CATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case PRODUCT_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSalesReducer = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT_SALES_REQUEST:
      return { loading: true };
    case PRODUCT_SALES_SUCCESS:
      return { loading: false, salesCategories: action.payload };
    case PRODUCT_SALES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSubcategoryReducer = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT_SUBCATEGORY_REQUEST:
      return { loading: true };
    case PRODUCT_SUBCATEGORY_SUCCESS:
      return { loading: false, subcategories: action.payload };
    case PRODUCT_SUBCATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productSubListReducer = (
  state = { loading: true, products: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT_SUBLIST_REQUEST:
      return { loading: true };
    case PRODUCT_SUBLIST_SUCCESS:
      return { loading: false, subLists: action.payload };
    case PRODUCT_SUBLIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = { loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: action.payload };
    case PRODUCT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: true, error: action.payload };
    case PRODUCT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
