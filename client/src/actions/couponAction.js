import axios from 'axios';
import {
  COUPON_LOADING,
  COUPON_STOPLOADING,
  ADD_COUPON,
  EDIT_COUPON,
  DELETE_COUPON,
  LIST_COUPON,
  GET_ERRORS,
} from './types';

// Get all coupon
export const listCoupon= () => dispatch => {
  dispatch(setCouponLoading());
  axios
    .get('/api/coupon/')
    .then(res =>{
      console.log("coupon Result",res.data)
      dispatch({
        type: LIST_COUPON,
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

// Create coupon
export const addCoupon= (couponData) => dispatch => {
    dispatch(setCouponLoading());
    axios
    .post('/api/coupon/',couponData)
    .then(res =>
        dispatch({
            type: ADD_COUPON,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopCouponLoading());
    });
};

// Edit coupon
export const editCoupon= (couponData) => dispatch => {
    dispatch(setCouponLoading());
    axios
    .post('/api/coupon/edit',couponData)
    .then(res =>
        dispatch({
            type: EDIT_COUPON,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopCouponLoading());
    });
};
// delete coupon
export const deleteCoupon= (deleteData) => dispatch => {
    dispatch(setCouponLoading());
    axios
    .post('/api/coupon/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_COUPON,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopCouponLoading());
    });
};
// Coupon loading
export const setCouponLoading = () => {
    return {
      type: COUPON_LOADING
    };
  };
  export const stopCouponLoading = () => {
    return {
      type: COUPON_STOPLOADING
    };
  };