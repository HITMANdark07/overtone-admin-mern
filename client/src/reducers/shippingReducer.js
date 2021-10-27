import {
    SHIPPING_LOADING,
    ADD_SHIPPING,
    EDIT_SHIPPING,
    DELETE_SHIPPING,
    LIST_SHIPPING,
    SHIPPING_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addshipping: null,
     shippingloading: false,
     editshipping:null,
     deleteshipping:null,
     listshipping:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case SHIPPING_LOADING:
         return {
           ...state,
           shippingloading: true
         };
         case SHIPPING_STOPLOADING:
         return {
           ...state,
           shippingloading: false
         };
         
       case ADD_SHIPPING:
         return {
           ...state,
           addshipping: action.payload,
           shippingloading: false
        };
        case EDIT_SHIPPING:
         return {
           ...state,
           editshipping: action.payload,
           shippingloading: false
        };
        case LIST_SHIPPING:
        return {
          ...state,
          listshipping: action.payload,
          shippingloading: false
       };
       case DELETE_SHIPPING:
        return {
          ...state,
          deleteshipping: action.payload,
          shippingloading: false
       }; 
       default:
         return state;
     }
   }
   