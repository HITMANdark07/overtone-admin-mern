import {
    TEAM_LOADING,
    ADD_TEAM,
    EDIT_TEAM,
    DELETE_TEAM,
    LIST_TEAM,
    TEAM_STOPLOADING
  } from '../actions/types';
   
   const initialState = {
     addteam: null,
     teamloading: false,
     editteam:null,
     deleteteam:null,
     listteam:null,
   };
   
   export default function(state = initialState, action) {
     switch (action.type) {
       case TEAM_LOADING:
         return {
           ...state,
           teamloading: true
         };
         case TEAM_STOPLOADING:
         return {
           ...state,
           teamloading: false
         };
         
       case ADD_TEAM:
         return {
           ...state,
           addteam: action.payload,
           teamloading: false
        };
        case EDIT_TEAM:
         return {
           ...state,
           editteam: action.payload,
           teamloading: false
        };
        case LIST_TEAM:
        return {
          ...state,
          listteam: action.payload,
          teamloading: false
       };
       case DELETE_TEAM:
        return {
          ...state,
          deleteteam: action.payload,
          teamloading: false
       }; 
       default:
         return state;
     }
   }
   