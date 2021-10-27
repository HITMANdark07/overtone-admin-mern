import axios from 'axios';
import {
  USER_LOADING,
  USER_STOPLOADING,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  LIST_USER,
  GET_ERRORS,
} from './types';

// Get all user
export const listUser= () => dispatch => {
  dispatch(setUserLoading());
  axios
    .get('/api/user/')
    .then(res =>
      dispatch({
        type: LIST_USER,
        payload:res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload:err.response.data
      })

    );
};

// Create user
export const addUser= (userData) => dispatch => {
    dispatch(setUserLoading());
    axios
    .post('/api/user/register',userData)
    .then(res =>
        dispatch({
            type: ADD_USER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopUserLoading());
    });
};

// Edit user
export const editUser= (userData) => dispatch => {
    dispatch(setUserLoading());
    axios
    .post('/api/user/edit',userData)
    .then(res =>
        dispatch({
            type: EDIT_USER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopUserLoading());
    });
};
// delete user
export const deleteUser= (deleteData) => dispatch => {
    dispatch(setUserLoading());
    axios
    .post('/api/user/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_USER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopUserLoading());
    });
};
// User loading
export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  };
  export const stopUserLoading = () => {
    return {
      type: USER_STOPLOADING
    };
  };