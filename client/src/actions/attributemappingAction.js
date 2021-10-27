import axios from 'axios';
import {
  ATTRIBUTE_MAPPING_LOADING,
  ATTRIBUTE_MAPPING_STOPLOADING,
  ADD_ATTRIBUTE_MAPPING,
  EDIT_ATTRIBUTE_MAPPING,
  DELETE_ATTRIBUTE_MAPPING,
  LIST_ATTRIBUTE_MAPPING,
  GET_ERRORS,
} from './types';

// Get all attributemapping
export const listAttributeMapping= (data) => dispatch => {
  dispatch(setAttributeMappingLoading());
  axios
    .post('/api/attributemapping/getattributebyproduct',data)
    .then(res =>{
      dispatch({
        type: LIST_ATTRIBUTE_MAPPING,
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


export const listAttributeMappingOne= (data) => dispatch => {
  dispatch(setAttributeMappingLoading());
  axios
    .post('/api/attributemapping/getattributemapping',data)
    .then(res =>{
      dispatch({
        type: LIST_ATTRIBUTE_MAPPING,
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
// Create attributemapping
export const addAttributeMapping= (attributemappingData) => dispatch => {
    dispatch(setAttributeMappingLoading());
    axios
    .post('/api/attributemapping/',attributemappingData)
    .then(res =>
        dispatch({
            type: ADD_ATTRIBUTE_MAPPING,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAttributeMappingLoading());
    });
};

// Edit attributemapping
export const editAttributeMapping= (attributemappingData) => dispatch => {
    dispatch(setAttributeMappingLoading());
    axios
    .post('/api/attributemapping/edit',attributemappingData)
    .then(res =>
        dispatch({
            type: EDIT_ATTRIBUTE_MAPPING,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAttributeMappingLoading());
    });
};
// delete attributemapping
export const deleteAttributeMapping= (deleteData) => dispatch => {
    dispatch(setAttributeMappingLoading());
    axios
    .post('/api/attributemapping/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_ATTRIBUTE_MAPPING,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopAttributeMappingLoading());
    });
};
// AttributeMapping loading
export const setAttributeMappingLoading = () => {
    return {
      type: ATTRIBUTE_MAPPING_LOADING
    };
  };
  export const stopAttributeMappingLoading = () => {
    return {
      type: ATTRIBUTE_MAPPING_STOPLOADING
    };
  };