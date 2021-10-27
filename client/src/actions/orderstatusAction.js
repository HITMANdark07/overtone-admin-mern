import axios from 'axios';
import {
  ORDERSTATUS_LOADING,
  ORDERSTATUS_STOPLOADING,
  ADD_ORDERSTATUS,
  EDIT_ORDERSTATUS,
  DELETE_ORDERSTATUS,
  LIST_ORDERSTATUS,
  GET_ERRORS,
} from './types';

// Get all orderstatus
export const listOrderStatus= () => dispatch => {
  dispatch(setOrderStatusLoading());
  axios
    .get('/api/orderstatus/')
    .then(res =>{
      dispatch({
        type: LIST_ORDERSTATUS,
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


export const listOrderStatusOne= (data) => dispatch => {
  dispatch(setOrderStatusLoading());
  axios
    .post('/api/orderstatus/getorderstatus',data)
    .then(res =>{
      dispatch({
        type: LIST_ORDERSTATUS,
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
// Create orderstatus
export const addOrderStatus= (orderstatusData) => dispatch => {
    dispatch(setOrderStatusLoading());
    axios
    .post('/api/orderstatus/',orderstatusData)
    .then(res =>
        dispatch({
            type: ADD_ORDERSTATUS,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopOrderStatusLoading());
    });
};

// Edit orderstatus
export const editOrderStatus= (orderstatusData) => dispatch => {
    dispatch(setOrderStatusLoading());
    axios
    .post('/api/orderstatus/edit',orderstatusData)
    .then(res =>
        dispatch({
            type: EDIT_ORDERSTATUS,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopOrderStatusLoading());
    });
};
// delete orderstatus
export const deleteOrderStatus= (deleteData) => dispatch => {
    dispatch(setOrderStatusLoading());
    axios
    .post('/api/orderstatus/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_ORDERSTATUS,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopOrderStatusLoading());
    });
};
// OrderStatus loading
export const setOrderStatusLoading = () => {
    return {
      type: ORDERSTATUS_LOADING
    };
  };
  export const stopOrderStatusLoading = () => {
    return {
      type: ORDERSTATUS_STOPLOADING
    };
  };