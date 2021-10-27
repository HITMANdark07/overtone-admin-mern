import {
    PARENT_ATTRIBUTE_CATEGORY_LOADING,
    ADD_PARENT_ATTRIBUTE_CATEGORY,
    EDIT_PARENT_ATTRIBUTE_CATEGORY,
    DELETE_PARENT_ATTRIBUTE_CATEGORY,
    LIST_PARENT_ATTRIBUTE_CATEGORY,
    PARENT_ATTRIBUTE_CATEGORY_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addparentattributecategory: null,
     parentattributecategoryloading: false,
     editparentattributecategory:null,
     deleteparentattributecategory:null,
     listparentattributecategory:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case PARENT_ATTRIBUTE_CATEGORY_LOADING:
         return {
           ...state,
           parentattributecategoryloading: true
         };
         case PARENT_ATTRIBUTE_CATEGORY_STOPLOADING:
         return {
           ...state,
           parentattributecategoryloading: false
         };
         
       case ADD_PARENT_ATTRIBUTE_CATEGORY:
         return {
           ...state,
           addparentattributecategory: action.payload,
           parentattributecategoryloading: false
        };
        case EDIT_PARENT_ATTRIBUTE_CATEGORY:
         return {
           ...state,
           editparentattributecategory: action.payload,
           parentattributecategoryloading: false
        };
        case LIST_PARENT_ATTRIBUTE_CATEGORY:
        return {
          ...state,
          listparentattributecategory: action.payload,
          parentattributecategoryloading: false
       };
       case DELETE_PARENT_ATTRIBUTE_CATEGORY:
        return {
          ...state,
          deleteparentattributecategory: action.payload,
          parentattributecategoryloading: false
       }; 
       default:
         return state;
     }
   }
   