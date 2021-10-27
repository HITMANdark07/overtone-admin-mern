import {
    SUBCATEGORYCHILD_LOADING,
    ADD_SUBCATEGORYCHILD,
    EDIT_SUBCATEGORYCHILD,
    DELETE_SUBCATEGORYCHILD,
    LIST_SUBCATEGORYCHILD,
    SUBCATEGORYCHILD_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addsubCategoryChild: null,
     subCategoryChildloading: false,
     editsubCategoryChild:null,
     deletesubCategoryChild:null,
     listsubCategoryChild:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case SUBCATEGORYCHILD_LOADING:
         return {
           ...state,
           subCategoryChildloading: true
         };
         case SUBCATEGORYCHILD_STOPLOADING:
         return {
           ...state,
           subCategoryChildloading: false
         };
         
       case ADD_SUBCATEGORYCHILD:
         return {
           ...state,
           addsubCategoryChild: action.payload,
           subCategoryChildloading: false
        };
        case EDIT_SUBCATEGORYCHILD:
         return {
           ...state,
           editsubCategoryChild: action.payload,
           subCategoryChildloading: false
        };
        case LIST_SUBCATEGORYCHILD:
        return {
          ...state,
          listsubCategoryChild: action.payload,
          subCategoryChildloading: false
       };
       case DELETE_SUBCATEGORYCHILD:
        return {
          ...state,
          deletesubCategoryChild: action.payload,
          subCategoryChildloading: false
       }; 
       default:
         return state;
     }
   }
   