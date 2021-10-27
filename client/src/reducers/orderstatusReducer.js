import {
    ORDERSTATUS_LOADING,
    ADD_ORDERSTATUS,
    EDIT_ORDERSTATUS,
    DELETE_ORDERSTATUS,
    LIST_ORDERSTATUS,
    ORDERSTATUS_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addorderstatus: null,
     orderstatusloading: false,
     editorderstatus:null,
     deleteorderstatus:null,
     listorderstatus:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case ORDERSTATUS_LOADING:
         return {
           ...state,
           orderstatusloading: true
         };
         case ORDERSTATUS_STOPLOADING:
         return {
           ...state,
           orderstatusloading: false
         };
         
       case ADD_ORDERSTATUS:
         return {
           ...state,
           addorderstatus: action.payload,
           orderstatusloading: false
        };
        case EDIT_ORDERSTATUS:
         return {
           ...state,
           editorderstatus: action.payload,
           orderstatusloading: false
        };
        case LIST_ORDERSTATUS:
        return {
          ...state,
          listorderstatus: action.payload,
          orderstatusloading: false
       };
       case DELETE_ORDERSTATUS:
        return {
          ...state,
          deleteorderstatus: action.payload,
          orderstatusloading: false
       }; 
       default:
         return state;
     }
   }
   