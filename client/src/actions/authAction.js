import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import {GET_ERRORS, SET_CURRENT_USER} from './types';

//Login - Get User Token
export const loginAdmin = (userData)=> dispatch => {
    axios.post('/api/admin/login',userData)
         .then(res => {
            // Save to LocalStorage
            const {token} = res.data;
            //Set Token to Localstorage
            localStorage.setItem('jwtToken',token);
            //Set Token to Header
            setAuthToken(token);
            //Decode Token to get user Data
            const decoded = jwt_decode(token);
            //set Current User
            dispatch(setCurrentUser(decoded));
         })
         .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
          
        );
};

//Login - Get User Token
export const loginStore = (userData)=> dispatch => {
  axios.post('/api/store/login',userData)
       .then(res => {
          // Save to LocalStorage
          const {token} = res.data;
          //Set Token to Localstorage
          localStorage.setItem('jwtToken',token);
          //Set Token to Header
          setAuthToken(token);
          //Decode Token to get user Data
          const decoded = jwt_decode(token);
          //set Current User
          dispatch(setCurrentUser(decoded));
       })
       .catch(err => dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        })
        
      );
};

export const Forgetpassword = (userData)=> dispatch => {
    axios.post('/api/admin/forget',userData)
    .then(res => {
        
    })
    .catch(err => dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })
 );
}


//Login - Get User Token
export const loginRegister = (userData)=> dispatch => {
    axios.post('/api/store/register',userData)
         .then(res => {
            // Save to LocalStorage
            const {token} = res.data;
            //Set Token to Localstorage
            localStorage.setItem('jwtToken',token);
            //Set Token to Header
            setAuthToken(token);
            //Decode Token to get user Data
            const decoded = jwt_decode(token);
            //set Current User
            dispatch(setCurrentUser(decoded));
         })
         .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
          
        );
};

export const purchasePlan = (userData)=> dispatch => {
    axios.post('/api/store/purchaseplan',userData)
         .then(res => {
            // Save to LocalStorage
            const {token} = res.data;
            //Set Token to Localstorage
            localStorage.setItem('jwtToken',token);
            //Set Token to Header
            setAuthToken(token);
            //Decode Token to get user Data
            const decoded = jwt_decode(token);
            //set Current User
            dispatch(setCurrentUser(decoded));
         })
         .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
          
        );
};
//set Logged in user
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
};

//Log out users
export const logoutUser = ()=> dispatch => {
    // Remove Token from localstorage
    localStorage.removeItem('jwtToken');
    //Remove Auth Header for future reference
    setAuthToken(false);
    //set Current user to {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}
