import axios from 'axios';
import {
  SUBCATEGORY_LOADING,
  SUBCATEGORY_STOPLOADING,
  ADD_SUBCATEGORY,
  EDIT_SUBCATEGORY,
  DELETE_SUBCATEGORY,
  LIST_SUBCATEGORY,
  GET_ERRORS,
} from './types';

// Get all subcategory
export const listSubCategory= () => dispatch => {
  dispatch(setSubCategoryLoading());
  axios
    .get('/api/subcategory/')
    .then(res =>{
      dispatch({
        type: LIST_SUBCATEGORY,
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

// Get all subcategory
export const listSubCategoryOne= (data) => dispatch => {
  dispatch(setSubCategoryLoading());
  axios
    .post('/api/subcategory/getsubcategory',data)
    .then(res =>{
      dispatch({
        type: LIST_SUBCATEGORY,
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

// Create subcategory
export const addSubCategory= (subcategoryData) => dispatch => {
    dispatch(setSubCategoryLoading());
    axios
    .post('/api/subcategory/',subcategoryData)
    .then(res =>
        dispatch({
            type: ADD_SUBCATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSubCategoryLoading());
    });
};

// Edit subcategory
export const editSubCategory= (subcategoryData) => dispatch => {
    dispatch(setSubCategoryLoading());
    axios
    .post('/api/subcategory/edit',subcategoryData)
    .then(res =>
        dispatch({
            type: EDIT_SUBCATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSubCategoryLoading());
    });
};
// delete subcategory
export const deleteSubCategory= (deleteData) => dispatch => {
    dispatch(setSubCategoryLoading());
    axios
    .post('/api/subcategory/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_SUBCATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSubCategoryLoading());
    });
};
// SubCategory loading
export const setSubCategoryLoading = () => {
    return {
      type: SUBCATEGORY_LOADING
    };
  };
  export const stopSubCategoryLoading = () => {
    return {
      type: SUBCATEGORY_STOPLOADING
    };
  };