import axios from 'axios';
import {
  PARENT_ATTRIBUTE_CATEGORY_LOADING,
  PARENT_ATTRIBUTE_CATEGORY_STOPLOADING,
  ADD_PARENT_ATTRIBUTE_CATEGORY,
  EDIT_PARENT_ATTRIBUTE_CATEGORY,
  DELETE_PARENT_ATTRIBUTE_CATEGORY,
  LIST_PARENT_ATTRIBUTE_CATEGORY,
  GET_ERRORS,
} from './types';

// Get all parentattributecategory
export const listParentAttributeCategory= () => dispatch => {
  dispatch(setParentAttributeCategoryLoading());
  axios
    .get('/api/parentattributecategory/')
    .then(res =>{
      dispatch({
        type: LIST_PARENT_ATTRIBUTE_CATEGORY,
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


export const listParentAttributeCategoryOne= (data) => dispatch => {
  dispatch(setParentAttributeCategoryLoading());
  axios
    .post('/api/parentattributecategory/getparentattributecategory',data)
    .then(res =>{
      dispatch({
        type: LIST_PARENT_ATTRIBUTE_CATEGORY,
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
// Create parentattributecategory
export const addParentAttributeCategory= (parentattributecategoryData) => dispatch => {
    dispatch(setParentAttributeCategoryLoading());
    axios
    .post('/api/parentattributecategory/',parentattributecategoryData)
    .then(res =>
        dispatch({
            type: ADD_PARENT_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopParentAttributeCategoryLoading());
    });
};

// Edit parentattributecategory
export const editParentAttributeCategory= (parentattributecategoryData) => dispatch => {
    dispatch(setParentAttributeCategoryLoading());
    axios
    .post('/api/parentattributecategory/edit',parentattributecategoryData)
    .then(res =>
        dispatch({
            type: EDIT_PARENT_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopParentAttributeCategoryLoading());
    });
};
// delete parentattributecategory
export const deleteParentAttributeCategory= (deleteData) => dispatch => {
    dispatch(setParentAttributeCategoryLoading());
    axios
    .post('/api/parentattributecategory/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_PARENT_ATTRIBUTE_CATEGORY,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopParentAttributeCategoryLoading());
    });
};
// ParentAttributeCategory loading
export const setParentAttributeCategoryLoading = () => {
    return {
      type: PARENT_ATTRIBUTE_CATEGORY_LOADING
    };
  };
  export const stopParentAttributeCategoryLoading = () => {
    return {
      type: PARENT_ATTRIBUTE_CATEGORY_STOPLOADING
    };
  };