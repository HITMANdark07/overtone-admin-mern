import {
    PLAN_LOADING,
    ADD_PLAN,
    EDIT_PLAN,
    DELETE_PLAN,
    LIST_PLAN,
    PLAN_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addplan: null,
     planloading: false,
     editplan:null,
     deleteplan:null,
     listplan:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case PLAN_LOADING:
         return {
           ...state,
           planloading: true
         };
         case PLAN_STOPLOADING:
         return {
           ...state,
           planloading: false
         };
         
       case ADD_PLAN:
         return {
           ...state,
           addplan: action.payload,
           planloading: false
        };
        case EDIT_PLAN:
         return {
           ...state,
           editplan: action.payload,
           planloading: false
        };
        case LIST_PLAN:
        return {
          ...state,
          listplan: action.payload,
          planloading: false
       };
       case DELETE_PLAN:
        return {
          ...state,
          deleteplan: action.payload,
          planloading: false
       }; 
       default:
         return state;
     }
   }
   