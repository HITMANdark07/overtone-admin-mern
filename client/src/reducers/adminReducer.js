import {
    ADMIN_LOADING,
    ADD_ADMIN,
    EDIT_ADMIN,
    DELETE_ADMIN,
    LIST_ADMIN,
    ADMIN_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addadmin: null,
     adminloading: false,
     editadmin:null,
     deleteadmin:null,
     listadmin:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case ADMIN_LOADING:
         return {
           ...state,
           adminloading: true
         };
         case ADMIN_STOPLOADING:
         return {
           ...state,
           adminloading: false
         };
         
       case ADD_ADMIN:
         return {
           ...state,
           addadmin: action.payload,
           adminloading: false
        };
        case EDIT_ADMIN:
         return {
           ...state,
           editadmin: action.payload,
           adminloading: false
        };
        case LIST_ADMIN:
        return {
          ...state,
          listadmin: action.payload,
          adminloading: false
       };
       case DELETE_ADMIN:
        return {
          ...state,
          deleteadmin: action.payload,
          adminloading: false
       }; 
       default:
         return state;
     }
   }
   