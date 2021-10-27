import {
    PRODUCTSUB_LOADING,
    ADD_PRODUCTSUB,
    EDIT_PRODUCTSUB,
    DELETE_PRODUCTSUB,
    LIST_PRODUCTSUB,
    PRODUCTSUB_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addproductsub: null,
     productsubloading: false,
     editproductsub:null,
     deleteproductsub:null,
     listproductsub:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case PRODUCTSUB_LOADING:
         return {
           ...state,
           productsubloading: true
         };
         case PRODUCTSUB_STOPLOADING:
         return {
           ...state,
           productsubloading: false
         };
         
       case ADD_PRODUCTSUB:
         return {
           ...state,
           addproductsub: action.payload,
           productsubloading: false
        };
        case EDIT_PRODUCTSUB:
         return {
           ...state,
           editproductsub: action.payload,
           productsubloading: false
        };
        case LIST_PRODUCTSUB:
        return {
          ...state,
          listproductsub: action.payload,
          productsubloading: false
       };
       case DELETE_PRODUCTSUB:
        return {
          ...state,
          deleteproductsub: action.payload,
          productsubloading: false
       }; 
       default:
         return state;
     }
   }
   