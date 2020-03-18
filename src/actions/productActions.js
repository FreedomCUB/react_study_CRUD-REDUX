import {
  ADD_PRODUCT,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_ERROR,
  START_DOWNLOAD_PRODUCT,
  DOWNLOAD_PRODUCT_SUCCESS,
  DOWNLOAD_PRODUCT_ERROR
} from "../types";

import clientAxios from "../config/axios";
import Swal from "sweetalert2";
import Products from "../components/Products";

export function addNewProductAction(product, path) {
  return async dispatch => {
    dispatch(addProduct());

    try {
      // insert data API
      await clientAxios.post("/products", product);

      // ok, update state
      dispatch(addProductSuccess(product));

      // Alert Success
      Swal.fire("Correto", "El producto se agrego correctamente", "success");
      return (path = "/");
    } catch (error) {
      console.log(error);
      dispatch(addProductError(true));

      // Alert Error
      Swal.fire("Error", "Hubo un error en la operación", "error");
      return (path = "/products/new");
    }
  };
}

const addProduct = () => ({
  type: ADD_PRODUCT
});

const addProductSuccess = product => ({
  type: ADD_PRODUCT_SUCCESS,
  payload: product
});

const addProductError = state => ({
  type: ADD_PRODUCT_ERROR,
  payload: state
});

// Download products from DB

export function downloadProductsAction() {
  return async dispatch => {
    dispatch(downloadProducts());

    try {
        const answer = await clientAxios.get('/products')
        dispatch( downloadProductSuccess(answer.data) )
        
    } catch (error) {
        console.log(error)
        dispatch( downloadProductsError() )
        
    }
  };
}

const downloadProducts = () => ({
    type: START_DOWNLOAD_PRODUCT,
    payload: true
})

const downloadProductSuccess = products => ({
    type: DOWNLOAD_PRODUCT_SUCCESS,
    payload: products
})

const downloadProductsError = () => ({
    type: DOWNLOAD_PRODUCT_ERROR,
    payload: true
})