import {
    ATTRIBUTE_MAPPING_LOADING,
    ADD_ATTRIBUTE_MAPPING,
    EDIT_ATTRIBUTE_MAPPING,
    DELETE_ATTRIBUTE_MAPPING,
    LIST_ATTRIBUTE_MAPPING,
    ATTRIBUTE_MAPPING_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addattributemapping: null,
     attributemappingloading: false,
     editattributemapping:null,
     deleteattributemapping:null,
     listattributemapping:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case ATTRIBUTE_MAPPING_LOADING:
         return {
           ...state,
           attributemappingloading: true
         };
         case ATTRIBUTE_MAPPING_STOPLOADING:
         return {
           ...state,
           attributemappingloading: false
         };
         
       case ADD_ATTRIBUTE_MAPPING:
         return {
           ...state,
           addattributemapping: action.payload,
           attributemappingloading: false
        };
        case EDIT_ATTRIBUTE_MAPPING:
         return {
           ...state,
           editattributemapping: action.payload,
           attributemappingloading: false
        };
        case LIST_ATTRIBUTE_MAPPING:
        return {
          ...state,
          listattributemapping: action.payload,
          attributemappingloading: false
       };
       case DELETE_ATTRIBUTE_MAPPING:
        return {
          ...state,
          deleteattributemapping: action.payload,
          attributemappingloading: false
       }; 
       default:
         return state;
     }
   }
   