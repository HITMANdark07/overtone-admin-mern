import {
    ATTRIBUTE_CATEGORY_LOADING,
    ADD_ATTRIBUTE_CATEGORY,
    EDIT_ATTRIBUTE_CATEGORY,
    DELETE_ATTRIBUTE_CATEGORY,
    LIST_ATTRIBUTE_CATEGORY,
    ATTRIBUTE_CATEGORY_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addattributecategory: null,
     attributecategoryloading: false,
     editattributecategory:null,
     deleteattributecategory:null,
     listattributecategory:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case ATTRIBUTE_CATEGORY_LOADING:
         return {
           ...state,
           attributecategoryloading: true
         };
         case ATTRIBUTE_CATEGORY_STOPLOADING:
         return {
           ...state,
           attributecategoryloading: false
         };
         
       case ADD_ATTRIBUTE_CATEGORY:
         return {
           ...state,
           addattributecategory: action.payload,
           attributecategoryloading: false
        };
        case EDIT_ATTRIBUTE_CATEGORY:
         return {
           ...state,
           editattributecategory: action.payload,
           attributecategoryloading: false
        };
        case LIST_ATTRIBUTE_CATEGORY:
        return {
          ...state,
          listattributecategory: action.payload,
          attributecategoryloading: false
       };
       case DELETE_ATTRIBUTE_CATEGORY:
        return {
          ...state,
          deleteattributecategory: action.payload,
          attributecategoryloading: false
       }; 
       default:
         return state;
     }
   }
   