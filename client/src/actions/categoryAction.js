import axios from 'axios';
import {
  CATEGORY_LOADING,
  CATEGORY_STOPLOADING,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  DELETE_CATEGORY,
  LIST_CATEGORY,
  GET_ERRORS,
} from './types';

// Get all category
export const listCategory= () => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .get('/api/category/')
    .then(res =>{
      dispatch({
        type: LIST_CATEGORY,
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


export const listCategoryOne= (data) => dispatch => {
  dispatch(setCategoryLoading());
  axios
    .post('/api/category/getcategory',data)
    .then(res =>{
      dispatch({
        type: LIST_CATEGORY,
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
// Create category
export const addCategory= (categoryData) => dispatch => {
    dispatch(setCategoryLoading());
    axios
    .post('/api/category/',categoryData)
    .then(res =>
        dispatch({
            type: ADD_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopCategoryLoading());
    });
};

// Edit category
export const editCategory= (categoryData) => dispatch => {
    dispatch(setCategoryLoading());
    axios
    .post('/api/category/edit',categoryData)
    .then(res =>
        dispatch({
            type: EDIT_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopCategoryLoading());
    });
};
// delete category
export const deleteCategory= (deleteData) => dispatch => {
    dispatch(setCategoryLoading());
    axios
    .post('/api/category/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopCategoryLoading());
    });
};
// Category loading
export const setCategoryLoading = () => {
    return {
      type: CATEGORY_LOADING
    };
  };
  export const stopCategoryLoading = () => {
    return {
      type: CATEGORY_STOPLOADING
    };
  };