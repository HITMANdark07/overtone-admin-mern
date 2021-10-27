import {
    CATEGORY_LOADING,
    ADD_CATEGORY,
    EDIT_CATEGORY,
    DELETE_CATEGORY,
    LIST_CATEGORY,
    CATEGORY_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addcategory: null,
     categoryloading: false,
     editcategory:null,
     deletecategory:null,
     listcategory:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case CATEGORY_LOADING:
         return {
           ...state,
           categoryloading: true
         };
         case CATEGORY_STOPLOADING:
         return {
           ...state,
           categoryloading: false
         };
         
       case ADD_CATEGORY:
         return {
           ...state,
           addcategory: action.payload,
           categoryloading: false
        };
        case EDIT_CATEGORY:
         return {
           ...state,
           editcategory: action.payload,
           categoryloading: false
        };
        case LIST_CATEGORY:
        return {
          ...state,
          listcategory: action.payload,
          categoryloading: false
       };
       case DELETE_CATEGORY:
        return {
          ...state,
          deletecategory: action.payload,
          categoryloading: false
       }; 
       default:
         return state;
     }
   }
   