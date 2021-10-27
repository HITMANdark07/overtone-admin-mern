import {
    BLOG_LOADING,
    ADD_BLOG,
    EDIT_BLOG,
    DELETE_BLOG,
    LIST_BLOG,
    BLOG_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addblog: null,
     blogloading: false,
     editblog:null,
     deleteblog:null,
     listblog:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case BLOG_LOADING:
         return {
           ...state,
           blogloading: true
         };
         case BLOG_STOPLOADING:
         return {
           ...state,
           blogloading: false
         };
         
       case ADD_BLOG:
         return {
           ...state,
           addblog: action.payload,
           blogloading: false
        };
        case EDIT_BLOG:
         return {
           ...state,
           editblog: action.payload,
           blogloading: false
        };
        case LIST_BLOG:
        return {
          ...state,
          listblog: action.payload,
          blogloading: false
       };
       case DELETE_BLOG:
        return {
          ...state,
          deleteblog: action.payload,
          blogloading: false
       }; 
       default:
         return state;
     }
   }
   