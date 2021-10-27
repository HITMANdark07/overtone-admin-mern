import axios from 'axios';
import {
  ROLE_LOADING,
  ROLE_STOPLOADING,
  ADD_ROLE,
  EDIT_ROLE,
  DELETE_ROLE,
  LIST_ROLE,
  GET_ERRORS,
} from './types';

// Get all role
export const listRole= () => dispatch => {
  dispatch(setRoleLoading());
  axios
    .get('/api/role/')
    .then(res =>{
      dispatch({
        type: LIST_ROLE,
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


export const listRoleOne= (data) => dispatch => {
  dispatch(setRoleLoading());
  axios
    .post('/api/role/getrole',data)
    .then(res =>{
      dispatch({
        type: LIST_ROLE,
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
// Create role
export const addRole= (roleData) => dispatch => {
    dispatch(setRoleLoading());
    axios
    .post('/api/role/',roleData)
    .then(res =>
        dispatch({
            type: ADD_ROLE,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopRoleLoading());
    });
};

// Edit role
export const editRole= (roleData) => dispatch => {
    dispatch(setRoleLoading());
    axios
    .post('/api/role/edit',roleData)
    .then(res =>
        dispatch({
            type: EDIT_ROLE,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopRoleLoading());
    });
};
// delete role
export const deleteRole= (deleteData) => dispatch => {
    dispatch(setRoleLoading());
    axios
    .post('/api/role/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_ROLE,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopRoleLoading());
    });
};
// Role loading
export const setRoleLoading = () => {
    return {
      type: ROLE_LOADING
    };
  };
  export const stopRoleLoading = () => {
    return {
      type: ROLE_STOPLOADING
    };
  };