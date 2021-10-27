import axios from 'axios';
import {
  TEAM_LOADING,
  TEAM_STOPLOADING,
  ADD_TEAM,
  EDIT_TEAM,
  DELETE_TEAM,
  LIST_TEAM,
  GET_ERRORS,
} from './types';

// Get all team
export const listTeam= () => dispatch => {
  dispatch(setTeamLoading());
  axios
    .get('/api/team/')
    .then(res =>{
      console.log("team Result",res.data)
      dispatch({
        type: LIST_TEAM,
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

// Create team
export const addTeam= (teamData) => dispatch => {
    dispatch(setTeamLoading());
    axios
    .post('/api/team/',teamData)
    .then(res =>
        dispatch({
            type: ADD_TEAM,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopTeamLoading());
    });
};

// Edit team
export const editTeam= (teamData) => dispatch => {
    dispatch(setTeamLoading());
    axios
    .post('/api/team/edit',teamData)
    .then(res =>
        dispatch({
            type: EDIT_TEAM,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopTeamLoading());
    });
};
// delete team
export const deleteTeam= (deleteData) => dispatch => {
    dispatch(setTeamLoading());
    axios
    .post('/api/team/delete',deleteData)
    .then(res =>
        dispatch({
            type: DELETE_TEAM,
            payload:res.data
        })
    )
    .catch(err =>{
        dispatch({
            type: GET_ERRORS,
            payload:err.response.data
        })
        dispatch(stopTeamLoading());
    });
};
// Team loading
export const setTeamLoading = () => {
    return {
      type: TEAM_LOADING
    };
  };
  export const stopTeamLoading = () => {
    return {
      type: TEAM_STOPLOADING
    };
  };