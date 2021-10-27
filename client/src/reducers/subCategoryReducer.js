import {
    SUBCATEGORY_LOADING,
    ADD_SUBCATEGORY,
    EDIT_SUBCATEGORY,
    DELETE_SUBCATEGORY,
    LIST_SUBCATEGORY,
    SUBCATEGORY_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addsubCategory: null,
     subCategoryloading: false,
     editsubCategory:null,
     deletesubCategory:null,
     listsubCategory:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case SUBCATEGORY_LOADING:
         return {
           ...state,
           subCategoryloading: true
         };
         case SUBCATEGORY_STOPLOADING:
         return {
           ...state,
           subCategoryloading: false
         };
         
       case ADD_SUBCATEGORY:
         return {
           ...state,
           addsubCategory: action.payload,
           subCategoryloading: false
        };
        case EDIT_SUBCATEGORY:
         return {
           ...state,
           editsubCategory: action.payload,
           subCategoryloading: false
        };
        case LIST_SUBCATEGORY:
        return {
          ...state,
          listsubCategory: action.payload,
          subCategoryloading: false
       };
       case DELETE_SUBCATEGORY:
        return {
          ...state,
          deletesubCategory: action.payload,
          subCategoryloading: false
       }; 
       default:
         return state;
     }
   }
   