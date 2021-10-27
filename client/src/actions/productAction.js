import axios from 'axios';
import {
  PRODUCT_LOADING,
  PRODUCT_STOPLOADING,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  DELETE_PRODUCT,
  LIST_PRODUCT,
  GET_ERRORS,
  ADD_PRODUCT_ID,
  ADD_ORDER_ATTRIBUTES,
  SEARCH_PRODUCT_FAIL,
  SEARCH_PRODUCT_REQUEST,
  SEARCH_PRODUCT_SUCCESS
} from './types';

// Get all product
export const listProduct= () => dispatch => {
  dispatch(setProductLoading());
  axios
    .get('/api/product/')
    .then(res =>{
      console.log("product Result",res.data)
      dispatch({
        type: LIST_PRODUCT,
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

// Get one product
export const listProductOne= (data) => dispatch => {
  dispatch(setProductLoading());
  axios
    .post('/api/product/getproduct',data)
    .then(res =>{
      dispatch({
        type: LIST_PRODUCT,
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

export const addProduct= (productData) => dispatch => {
  dispatch(setProductLoading());
  axios
  .post('/api/product/',productData)
  .then(res =>
      dispatch({
          type: ADD_PRODUCT,
          payload:res.data
      })
  )
  .catch(err =>{
      dispatch({
          type: GET_ERRORS,
          payload:err.response.data
      })
      dispatch(stopProductLoading());
  });
};

// Create Draft Product

export const createDraftProduct = () => dispatch => {
    dispatch(setProductLoading());
    axios
    .post('/api/product/draft')
    .then(res =>
        dispatch({
            type: ADD_PRODUCT,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopProductLoading());
    });
};


// Edit product
export const editProduct= (productData) => dispatch => {
    dispatch(setProductLoading());
    axios
    .post('/api/product/edit',productData)
    .then(res =>
        dispatch({
            type: EDIT_PRODUCT,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopProductLoading());
    });
};
// delete product
export const deleteProduct= (deleteData) => dispatch => {
    dispatch(setProductLoading());
    axios
    .post('/api/product/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_PRODUCT,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopProductLoading());
    });
};
// Product loading
export const setProductLoading = () => {
    return {
      type: PRODUCT_LOADING
    };
  };
  export const stopProductLoading = () => {
    return {
      type: PRODUCT_STOPLOADING
    };
  };


export const productId = (id) => (dispatch) => {
  dispatch({ type: ADD_PRODUCT_ID, payload: id });
};

export const productAttributes = (data) => (dispatch) => {
  dispatch({ type: ADD_ORDER_ATTRIBUTES, payload: data });
};



// Added By Fahim

export const searchProduct = (keyword) => async (dispatch) => {
  console.log(keyword);
  dispatch({ type: SEARCH_PRODUCT_REQUEST });
  try {
    const { data } = await axios.post(`/api/product/web`, { search: keyword });

    console.log(data);

    dispatch({ type: SEARCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: SEARCH_PRODUCT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
