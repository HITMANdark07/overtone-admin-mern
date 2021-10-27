import axios from 'axios';
import {
  SLIDER_LOADING,
  SLIDER_STOPLOADING,
  ADD_SLIDER,
  EDIT_SLIDER,
  DELETE_SLIDER,
  LIST_SLIDER,
  GET_ERRORS,
} from './types';

// Get all slider
export const listSlider= () => dispatch => {
  dispatch(setSliderLoading());
  axios
    .get('/api/slider/')
    .then(res =>{
      console.log("slider Result",res.data)
      dispatch({
        type: LIST_SLIDER,
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

// Create slider
export const addSlider= (sliderData) => dispatch => {
    dispatch(setSliderLoading());
    axios
    .post('/api/slider/',sliderData)
    .then(res =>
        dispatch({
            type: ADD_SLIDER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSliderLoading());
    });
};

// Edit slider
export const editSlider= (sliderData) => dispatch => {
    dispatch(setSliderLoading());
    axios
    .post('/api/slider/edit',sliderData)
    .then(res =>
        dispatch({
            type: EDIT_SLIDER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSliderLoading());
    });
};
// delete slider
export const deleteSlider= (deleteData) => dispatch => {
    dispatch(setSliderLoading());
    axios
    .post('/api/slider/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_SLIDER,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopSliderLoading());
    });
};
// Slider loading
export const setSliderLoading = () => {
    return {
      type: SLIDER_LOADING
    };
  };
  export const stopSliderLoading = () => {
    return {
      type: SLIDER_STOPLOADING
    };
  };