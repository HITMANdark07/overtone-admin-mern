import {
    COUPON_LOADING,
    ADD_COUPON,
    EDIT_COUPON,
    DELETE_COUPON,
    LIST_COUPON,
    COUPON_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addcoupon: null,
     couponloading: false,
     editcoupon:null,
     deletecoupon:null,
     listcoupon:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case COUPON_LOADING:
         return {
           ...state,
           couponloading: true
         };
         case COUPON_STOPLOADING:
         return {
           ...state,
           couponloading: false
         };
         
       case ADD_COUPON:
         return {
           ...state,
           addcoupon: action.payload,
           couponloading: false
        };
        case EDIT_COUPON:
         return {
           ...state,
           editcoupon: action.payload,
           couponloading: false
        };
        case LIST_COUPON:
        return {
          ...state,
          listcoupon: action.payload,
          couponloading: false
       };
       case DELETE_COUPON:
        return {
          ...state,
          deletecoupon: action.payload,
          couponloading: false
       }; 
       default:
         return state;
     }
   }
   