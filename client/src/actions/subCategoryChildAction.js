import axios from 'axios';
import {
  SUBCATEGORYCHILD_LOADING,
  SUBCATEGORYCHILD_STOPLOADING,
  ADD_SUBCATEGORYCHILD,
  EDIT_SUBCATEGORYCHILD,
  DELETE_SUBCATEGORYCHILD,
  LIST_SUBCATEGORYCHILD,
  GET_ERRORS,
} from './types';

// Get all subcategorychild
export const listSubCategoryChild= () => dispatch => {
  dispatch(setSubCategoryChildLoading());
  axios
    .get('/api/subcategorychild/')
    .then(res =>{
      dispatch({
        type: LIST_SUBCATEGORYCHILD,
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

// Get all subcategorychild
export const listSubCategoryChildOne= (data) => dispatch => {
  dispatch(setSubCategoryChildLoading());
  axios
    .post('/api/subcategorychild/getsubcategorychild',data)
    .then(res =>{
      dispatch({
        type: LIST_SUBCATEGORYCHILD,
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

// Create subcategorychild
export const addSubCategoryChild= (subcategorychildData) => dispatch => {
    dispatch(setSubCategoryChildLoading());
    axios
    .post('/api/subcategorychild/',subcategorychildData)
    .then(res =>
        dispatch({
            type: ADD_SUBCATEGORYCHILD,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSubCategoryChildLoading());
    });
};

// Edit subcategorychild
export const editSubCategoryChild= (subcategorychildData) => dispatch => {
    dispatch(setSubCategoryChildLoading());
    axios
    .post('/api/subcategorychild/edit',subcategorychildData)
    .then(res =>
        dispatch({
            type: EDIT_SUBCATEGORYCHILD,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSubCategoryChildLoading());
    });
};
// delete subcategorychild
export const deleteSubCategoryChild= (deleteData) => dispatch => {
    dispatch(setSubCategoryChildLoading());
    axios
    .post('/api/subcategorychild/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_SUBCATEGORYCHILD,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSubCategoryChildLoading());
    });
};
// SubCategoryChild loading
export const setSubCategoryChildLoading = () => {
    return {
      type: SUBCATEGORYCHILD_LOADING
    };
  };
  export const stopSubCategoryChildLoading = () => {
    return {
      type: SUBCATEGORYCHILD_STOPLOADING
    };
  };