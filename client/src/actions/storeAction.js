import axios from 'axios';
import {
  STORE_LOADING,
  STORE_STOPLOADING,
  ADD_STORE,
  EDIT_STORE,
  DELETE_STORE,
  LIST_STORE,
  GET_ERRORS,
} from './types';

// Get all store
export const listStore= () => dispatch => {
  dispatch(setStoreLoading());
  axios
    .get('/api/store/')
    .then(res =>
      dispatch({
        type: LIST_STORE,
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

// Create store
export const addStore= (storeData) => dispatch => {
    dispatch(setStoreLoading());
    axios
    .post('/api/store/',storeData)
    .then(res =>
        dispatch({
            type: ADD_STORE,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopStoreLoading());
    });
};

// Edit store
export const editStore= (storeData) => dispatch => {
    dispatch(setStoreLoading());
    axios
    .post('/api/store/edit',storeData)
    .then(res =>
        dispatch({
            type: EDIT_STORE,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopStoreLoading());
    });
};
// delete store
export const deleteStore= (deleteData) => dispatch => {
    dispatch(setStoreLoading());
    axios
    .post('/api/store/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_STORE,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopStoreLoading());
    });
};
// Store loading
export const setStoreLoading = () => {
    return {
      type: STORE_LOADING
    };
  };
  export const stopStoreLoading = () => {
    return {
      type: STORE_STOPLOADING
    };
  };