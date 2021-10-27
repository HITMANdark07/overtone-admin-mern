import {
    STORE_LOADING,
    ADD_STORE,
    EDIT_STORE,
    DELETE_STORE,
    LIST_STORE,
    STORE_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addstore: null,
     storeloading: false,
     editstore:null,
     deletestore:null,
     liststore:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case STORE_LOADING:
         return {
           ...state,
           storeloading: true
         };
         case STORE_STOPLOADING:
         return {
           ...state,
           storeloading: false
         };
         
       case ADD_STORE:
         return {
           ...state,
           addstore: action.payload,
           storeloading: false
        };
        case EDIT_STORE:
         return {
           ...state,
           editstore: action.payload,
           storeloading: false
        };
        case LIST_STORE:
        return {
          ...state,
          liststore: action.payload,
          storeloading: false
       };
       case DELETE_STORE:
        return {
          ...state,
          deletestore: action.payload,
          storeloading: false
       }; 
       default:
         return state;
     }
   }
   