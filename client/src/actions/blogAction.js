import axios from 'axios';
import {
  BLOG_LOADING,
  BLOG_STOPLOADING,
  ADD_BLOG,
  EDIT_BLOG,
  DELETE_BLOG,
  LIST_BLOG,
  GET_ERRORS,
} from './types';

// Get all blog
export const listBlog= () => dispatch => {
  dispatch(setBlogLoading());
  axios
    .get('/api/blog/')
    .then(res =>{
      console.log("blog Result",res.data)
      dispatch({
        type: LIST_BLOG,
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

// Create blog
export const addBlog= (blogData) => dispatch => {
    dispatch(setBlogLoading());
    axios
    .post('/api/blog/',blogData)
    .then(res =>
        dispatch({
            type: ADD_BLOG,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopBlogLoading());
    });
};

// Edit blog
export const editBlog= (blogData) => dispatch => {
    dispatch(setBlogLoading());
    axios
    .post('/api/blog/edit',blogData)
    .then(res =>
        dispatch({
            type: EDIT_BLOG,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopBlogLoading());
    });
};
// delete blog
export const deleteBlog= (deleteData) => dispatch => {
    dispatch(setBlogLoading());
    axios
    .post('/api/blog/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_BLOG,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopBlogLoading());
    });
};
// Blog loading
export const setBlogLoading = () => {
    return {
      type: BLOG_LOADING
    };
  };
  export const stopBlogLoading = () => {
    return {
      type: BLOG_STOPLOADING
    };
  };