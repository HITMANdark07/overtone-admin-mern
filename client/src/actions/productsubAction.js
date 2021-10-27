import axios from 'axios';
import {
  PRODUCTSUB_LOADING,
  PRODUCTSUB_STOPLOADING,
  ADD_PRODUCTSUB,
  EDIT_PRODUCTSUB,
  DELETE_PRODUCTSUB,
  LIST_PRODUCTSUB,
  GET_ERRORS,
} from './types';

// Get all productsub
export const listProductSub= () => dispatch => {
  dispatch(setProductSubLoading());
  axios
    .get('/api/productsub/')
    .then(res =>{
      dispatch({
        type: LIST_PRODUCTSUB,
        payload:res.data
      })
    })
    .catch(err =>{
      console.log("err data",err)
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
      })

    });
};


export const listProductSubOne= (data) => dispatch => {
  dispatch(setProductSubLoading());
  axios
    .post('/api/productsub/getproductsub',data)
    .then(res =>{
      dispatch({
        type: LIST_PRODUCTSUB,
        payload:res.data
      })
    })
    .catch(err =>{
      console.log("err data",err)
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
      })

    });
};
// Create productsub
export const addProductSub= (productsubData) => dispatch => {
    dispatch(setProductSubLoading());
    axios
    .post('/api/productsub/',productsubData)
    .then(res =>
        dispatch({
            type: ADD_PRODUCTSUB,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopProductSubLoading());
    });
};

// Edit productsub
export const editProductSub= (productsubData) => dispatch => {
    dispatch(setProductSubLoading());
    axios
    .post('/api/productsub/edit',productsubData)
    .then(res =>
        dispatch({
            type: EDIT_PRODUCTSUB,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopProductSubLoading());
    });
};
// delete productsub
export const deleteProductSub= (deleteData) => dispatch => {
    dispatch(setProductSubLoading());
    axios
    .post('/api/productsub/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_PRODUCTSUB,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopProductSubLoading());
    });
};
// ProductSub loading
export const setProductSubLoading = () => {
    return {
      type: PRODUCTSUB_LOADING
    };
  };
  export const stopProductSubLoading = () => {
    return {
      type: PRODUCTSUB_STOPLOADING
    };
  };