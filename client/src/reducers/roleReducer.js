import {
    ROLE_LOADING,
    ADD_ROLE,
    EDIT_ROLE,
    DELETE_ROLE,
    LIST_ROLE,
    ROLE_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addrole: null,
     roleloading: false,
     editrole:null,
     deleterole:null,
     listrole:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case ROLE_LOADING:
         return {
           ...state,
           roleloading: true
         };
         case ROLE_STOPLOADING:
         return {
           ...state,
           roleloading: false
         };
         
       case ADD_ROLE:
         return {
           ...state,
           addrole: action.payload,
           roleloading: false
        };
        case EDIT_ROLE:
         return {
           ...state,
           editrole: action.payload,
           roleloading: false
        };
        case LIST_ROLE:
        return {
          ...state,
          listrole: action.payload,
          roleloading: false
       };
       case DELETE_ROLE:
        return {
          ...state,
          deleterole: action.payload,
          roleloading: false
       }; 
       default:
         return state;
     }
   }
   