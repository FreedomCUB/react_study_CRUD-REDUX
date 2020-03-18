import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_SUCCESS,
  DOWNLOAD_PRODUCT_ERROR
} from "../types";

const initialState = {
  products: [],
  error: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case START_DOWNLOAD_PRODUCT:
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
            products: action.payload
        }  

    default:
      return state;
  }
}
