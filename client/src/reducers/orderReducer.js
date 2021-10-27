import {
    ORDER_LOADING,
    ADD_ORDER,
    EDIT_ORDER,
    DELETE_ORDER,
    LIST_ORDER,
    ORDER_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addorder: null,
     orderloading: false,
     editorder:null,
     deleteorder:null,
     listorder:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case ORDER_LOADING:
         return {
           ...state,
           orderloading: true
         };
         case ORDER_STOPLOADING:
         return {
           ...state,
           orderloading: false
         };
         
       case ADD_ORDER:
         return {
           ...state,
           addorder: action.payload,
           orderloading: false
        };
        case EDIT_ORDER:
         return {
           ...state,
           editorder: action.payload,
           orderloading: false
        };
        case LIST_ORDER:
        return {
          ...state,
          listorder: action.payload,
          orderloading: false
       };
       case DELETE_ORDER:
        return {
          ...state,
          deleteorder: action.payload,
          orderloading: false
       }; 
       default:
         return state;
     }
   }
   