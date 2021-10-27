import axios from 'axios';
import {
  ADMIN_LOADING,
  ADMIN_STOPLOADING,
  ADD_ADMIN,
  EDIT_ADMIN,
  DELETE_ADMIN,
  LIST_ADMIN,
  GET_ERRORS,
} from './types';

// Get all admin
export const listAdmin= () => dispatch => {
  dispatch(setAdminLoading());
  axios
    .get('/api/admin/')
    .then(res =>{
      dispatch({
        type: LIST_ADMIN,
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


export const listAdminOne= (data) => dispatch => {
  dispatch(setAdminLoading());
  axios
    .post('/api/admin/getadmin',data)
    .then(res =>{
      dispatch({
        type: LIST_ADMIN,
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
// Create admin
export const addAdmin= (adminData) => dispatch => {
    dispatch(setAdminLoading());
    axios
    .post('/api/admin/',adminData)
    .then(res =>
        dispatch({
            type: ADD_ADMIN,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAdminLoading());
    });
};

// Edit admin
export const editAdmin= (adminData) => dispatch => {
    dispatch(setAdminLoading());
    axios
    .post('/api/admin/edit',adminData)
    .then(res =>
        dispatch({
            type: EDIT_ADMIN,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAdminLoading());
    });
};
// delete admin
export const deleteAdmin= (deleteData) => dispatch => {
    dispatch(setAdminLoading());
    axios
    .post('/api/admin/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_ADMIN,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAdminLoading());
    });
};
// Admin loading
export const setAdminLoading = () => {
    return {
      type: ADMIN_LOADING
    };
  };
  export const stopAdminLoading = () => {
    return {
      type: ADMIN_STOPLOADING
    };
  };