import axios from 'axios';
import {
  ORDER_LOADING,
  ORDER_STOPLOADING,
  ADD_ORDER,
  EDIT_ORDER,
  DELETE_ORDER,
  LIST_ORDER,
  GET_ERRORS,
} from './types';

// Get all order
export const listOrder= () => dispatch => {
  dispatch(setOrderLoading());
  axios
    .get('/api/order/')
    .then(res =>{
      dispatch({
        type: LIST_ORDER,
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

// Create order
export const addOrder= (orderData) => dispatch => {
    dispatch(setOrderLoading());
    axios
    .post('/api/order/',orderData)
    .then(res =>
        dispatch({
            type: ADD_ORDER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopOrderLoading());
    });
};

// Edit order
export const editOrder= (orderData) => dispatch => {
    dispatch(setOrderLoading());
    axios
    .post('/api/order/edit',orderData)
    .then(res =>
        dispatch({
            type: EDIT_ORDER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopOrderLoading());
    });
};
// delete order
export const deleteOrder= (deleteData) => dispatch => {
    dispatch(setOrderLoading());
    axios
    .post('/api/order/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_ORDER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopOrderLoading());
    });
};
// Order loading
export const setOrderLoading = () => {
    return {
      type: ORDER_LOADING
    };
  };
  export const stopOrderLoading = () => {
    return {
      type: ORDER_STOPLOADING
    };
  };