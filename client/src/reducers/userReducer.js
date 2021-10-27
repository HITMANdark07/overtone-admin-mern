import {
    USER_LOADING,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
    LIST_USER,
    USER_STOPLOADING,
  } from '../actions/types';
   
   const initialState = {
     adduser: null,
     userloading: false,
     edituser:null,
     deleteuser:null,
     listuser:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case USER_LOADING:
         return {
           ...state,
           userloading: true
         };
         case USER_STOPLOADING:
         return {
           ...state,
           userloading: false
         };
         
       case ADD_USER:
         return {
           ...state,
           adduser: action.payload,
           userloading: false
        };
        case EDIT_USER:
         return {
           ...state,
           edituser: action.payload,
           userloading: false
        };
        case LIST_USER:
        return {
          ...state,
          listuser: action.payload,
          userloading: false
       };
       case DELETE_USER:
        return {
          ...state,
          deleteuser: action.payload,
          userloading: false
       }; 
       default:
         return state;
     }
   }
   