import {
    SLIDER_LOADING,
    ADD_SLIDER,
    EDIT_SLIDER,
    DELETE_SLIDER,
    LIST_SLIDER,
    SLIDER_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addslider: null,
     sliderloading: false,
     editslider:null,
     deleteslider:null,
     listslider:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case SLIDER_LOADING:
         return {
           ...state,
           sliderloading: true
         };
         case SLIDER_STOPLOADING:
         return {
           ...state,
           sliderloading: false
         };
         
       case ADD_SLIDER:
         return {
           ...state,
           addslider: action.payload,
           sliderloading: false
        };
        case EDIT_SLIDER:
         return {
           ...state,
           editslider: action.payload,
           sliderloading: false
        };
        case LIST_SLIDER:
        return {
          ...state,
          listslider: action.payload,
          sliderloading: false
       };
       case DELETE_SLIDER:
        return {
          ...state,
          deleteslider: action.payload,
          sliderloading: false
       }; 
       default:
         return state;
     }
   }
   