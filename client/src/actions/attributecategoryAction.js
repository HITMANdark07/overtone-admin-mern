import axios from 'axios';
import {
  ATTRIBUTE_CATEGORY_LOADING,
  ATTRIBUTE_CATEGORY_STOPLOADING,
  ADD_ATTRIBUTE_CATEGORY,
  EDIT_ATTRIBUTE_CATEGORY,
  DELETE_ATTRIBUTE_CATEGORY,
  LIST_ATTRIBUTE_CATEGORY,
  GET_ERRORS,
} from './types';

// Get all attributecategory
export const listAttributeCategory= () => dispatch => {
  dispatch(setAttributeCategoryLoading());
  axios
    .get('/api/attributecategory/')
    .then(res =>{
      dispatch({
        type: LIST_ATTRIBUTE_CATEGORY,
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


export const listAttributeCategoryOne= (data) => dispatch => {
  dispatch(setAttributeCategoryLoading());
  axios
    .post('/api/attributecategory/getattributecategory',data)
    .then(res =>{
      dispatch({
        type: LIST_ATTRIBUTE_CATEGORY,
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
// Create attributecategory
export const addAttributeCategory= (attributecategoryData) => dispatch => {
    dispatch(setAttributeCategoryLoading());
    axios
    .post('/api/attributecategory/',attributecategoryData)
    .then(res =>
        dispatch({
            type: ADD_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAttributeCategoryLoading());
    });
};

// Edit attributecategory
export const editAttributeCategory= (attributecategoryData) => dispatch => {
    dispatch(setAttributeCategoryLoading());
    axios
    .post('/api/attributecategory/edit',attributecategoryData)
    .then(res =>
        dispatch({
            type: EDIT_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAttributeCategoryLoading());
    });
};
// delete attributecategory
export const deleteAttributeCategory= (deleteData) => dispatch => {
    dispatch(setAttributeCategoryLoading());
    axios
    .post('/api/attributecategory/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAttributeCategoryLoading());
    });
};
// AttributeCategory loading
export const setAttributeCategoryLoading = () => {
    return {
      type: ATTRIBUTE_CATEGORY_LOADING
    };
  };
  export const stopAttributeCategoryLoading = () => {
    return {
      type: ATTRIBUTE_CATEGORY_STOPLOADING
    };
  };