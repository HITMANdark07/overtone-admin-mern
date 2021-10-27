import axios from 'axios';
import {
  SHIPPING_LOADING,
  SHIPPING_STOPLOADING,
  ADD_SHIPPING,
  EDIT_SHIPPING,
  DELETE_SHIPPING,
  LIST_SHIPPING,
  GET_ERRORS,
} from './types';

// Get all shipping
export const listShipping= () => dispatch => {
  dispatch(setShippingLoading());
  axios
    .get('/api/shipping/')
    .then(res =>{
      dispatch({
        type: LIST_SHIPPING,
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

// Create shipping
export const addShipping= (shippingData) => dispatch => {
    dispatch(setShippingLoading());
    axios
    .post('/api/shipping/',shippingData)
    .then(res =>
        dispatch({
            type: ADD_SHIPPING,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopShippingLoading());
    });
};

// Edit shipping
export const editShipping= (shippingData) => dispatch => {
    dispatch(setShippingLoading());
    axios
    .post('/api/shipping/edit',shippingData)
    .then(res =>
        dispatch({
            type: EDIT_SHIPPING,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopShippingLoading());
    });
};
// delete shipping
export const deleteShipping= (deleteData) => dispatch => {
    dispatch(setShippingLoading());
    axios
    .post('/api/shipping/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_SHIPPING,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopShippingLoading());
    });
};
// Shipping loading
export const setShippingLoading = () => {
    return {
      type: SHIPPING_LOADING
    };
  };
  export const stopShippingLoading = () => {
    return {
      type: SHIPPING_STOPLOADING
    };
  };