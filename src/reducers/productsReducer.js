import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_SUCCESS,
  DOWNLOAD_PRODUCT_ERROR,
  DELETE_PRODUCT_ID,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  EDIT_PRODUCT_ID,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR,
  START_EDIT_PRODUCT
} from "../types";

const initialState = {
  products: [],
  error: null,
  loading: false,
  productDelete: null,
  productEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_DOWNLOAD_PRODUCT:
    case START_EDIT_PRODUCT:
    case ADD_PRODUCT:
      return {
        ...state,
        loading: true
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        products: [...state.products, action.payload]
      };
    case DELETE_PRODUCT_ERROR:
    case EDIT_PRODUCT_ERROR:
    case DOWNLOAD_PRODUCT_ERROR:
    case ADD_PRODUCT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case DOWNLOAD_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        productEdit: null,
        products: action.payload
      };
    case DELETE_PRODUCT_ID:
      return {
        ...state,
        productDelete: action.payload
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter(
          product => product.id !== state.productDelete
        ),
        productDelete: null
      };
    case EDIT_PRODUCT_ID:
      return {
        ...state,
        productEdit: action.payload
      };
    case EDIT_PRODUCT_SUCCESS:
      return {
        ...state,
        productEdit: null,
        products: state.products.map(product =>
          product.id === action.payload.id
            ? (product = action.payload)
            : product
        ),
        loading: false,
        error: null
      };

    default:
      return state;
  }
}
