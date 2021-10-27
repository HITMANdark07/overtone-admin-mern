import axios from 'axios';
import {
  PLAN_LOADING,
  PLAN_STOPLOADING,
  ADD_PLAN,
  EDIT_PLAN,
  DELETE_PLAN,
  LIST_PLAN,
  GET_ERRORS,
} from './types';

// Get all plan
export const listPlan= () => dispatch => {
  dispatch(setPlanLoading());
  axios
    .get('/api/plan/')
    .then(res =>
      dispatch({
        type: LIST_PLAN,
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

// Create plan
export const addPlan= (planData) => dispatch => {
    dispatch(setPlanLoading());
    axios
    .post('/api/plan/',planData)
    .then(res =>
        dispatch({
            type: ADD_PLAN,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopPlanLoading());
    });
};

// Edit plan
export const editPlan= (planData) => dispatch => {
    dispatch(setPlanLoading());
    axios
    .post('/api/plan/edit',planData)
    .then(res =>
        dispatch({
            type: EDIT_PLAN,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopPlanLoading());
    });
};
// delete plan
export const deletePlan= (deleteData) => dispatch => {
    dispatch(setPlanLoading());
    axios
    .post('/api/plan/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_PLAN,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopPlanLoading());
    });
};
// Plan loading
export const setPlanLoading = () => {
    return {
      type: PLAN_LOADING
    };
  };
  export const stopPlanLoading = () => {
    return {
      type: PLAN_STOPLOADING
    };
  };