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
  START_EDIT_PRODUCT,
  EDIT_PRODUCT_SUCCESS,
  EDIT_PRODUCT_ERROR
} from "../types";

import clientAxios from "../config/axios";
import Swal from "sweetalert2";

// Create new product
export function addNewProductAction(product, path) {
  return async dispatch => {
    dispatch(addProduct());

    try {
      // insert data API
      await clientAxios.post("/products", product);

      // ok, update state
      dispatch(addProductSuccess(product));

      // Alert Success
      Swal.fire({
        title: "Correto",
        text: "El producto se agrego correctamente",
        icon: "success",
        confirmButtonColor: "#78C2AD"
      });
      return (path = "/");
    } catch (error) {
      console.log(error);
      dispatch(addProductError(true));

      // Alert Error
      Swal.fire({
        title: "Error",
        text: "Hubo un error en la operación",
        icon: "error",
        confirmButtonColor: "#FF7851"
      });
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
      const answer = await clientAxios.get("/products");
      dispatch(downloadProductSuccess(answer.data));
    } catch (error) {
      console.log(error);
      dispatch(downloadProductsError());
    }
  };
}

const downloadProducts = () => ({
  type: START_DOWNLOAD_PRODUCT,
  payload: true
});

const downloadProductSuccess = products => ({
  type: DOWNLOAD_PRODUCT_SUCCESS,
  payload: products
});

const downloadProductsError = () => ({
  type: DOWNLOAD_PRODUCT_ERROR,
  payload: true
});

// select product and delete
export function deleteProductAction(id) {
  return async dispatch => {
    dispatch(deleteProductId(id));

    try {
      await clientAxios.delete(`/products/${id}`);

      dispatch(deleteProductSuccess());
      Swal.fire({
        title: "Eliminado!",
        text: "El producto ha sido eliminado.",
        icon: "success",
        confirmButtonColor: "#78C2AD"
      });
    } catch (error) {
      console.log(error);
      dispatch(deleteProductError());
    }
  };
}

const deleteProductId = id => ({
  type: DELETE_PRODUCT_ID,
  payload: id
});
const deleteProductSuccess = () => ({
  type: DELETE_PRODUCT_SUCCESS
});

const deleteProductError = () => ({
  type: DELETE_PRODUCT_ERROR,
  payload: true
});

export function editProducIdtAction(product) {
  return dispatch => {
    dispatch(editProductId(product));
  
  };
}
const editProductId = product => ({
  type: EDIT_PRODUCT_ID,
  payload: product
});

export function editProductAction(product) {
  return async dispatch => {
    dispatch(startEditProduct(product))


    try {
      await clientAxios.put(`/products/${product.id}`, product) 
      
      dispatch(editProductSuccess(product));

      // Alert Success
      Swal.fire({
        title: "Correto",
        text: "El producto se editó correctamente",
        icon: "success",
        confirmButtonColor: "#78C2AD"
      });
      
    } catch (error) {
      console.log(error)
      dispatch( editProductError() ) 
      Swal.fire({
        title: "Error",
        text: "Hubo un error en la operación",
        icon: "error",
        confirmButtonColor: "#FF7851"
      });     
    }

  }
}


const startEditProduct = () => ({
  type: START_EDIT_PRODUCT,
  
});

const editProductSuccess = product => ({
  type: EDIT_PRODUCT_SUCCESS,
  payload : product
})

const editProductError = () => ({
  type: EDIT_PRODUCT_ERROR,
  payload: true
});