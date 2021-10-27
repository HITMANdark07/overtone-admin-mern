const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateTeamInput(data,user){
    let errors = {};

    data.photoUrl       = !isEmpty(data.photoUrl) ? data.photoUrl : '';
    data.name      = !isEmpty(data.name) ? data.name : '';
    data.nameAr      = !isEmpty(data.nameAr) ? data.nameAr : '';
    data.position      = !isEmpty(data.position) ? data.position : '';
    data.positionAr      = !isEmpty(data.positionAr) ? data.positionAr : '';
    data.visiblity      = !isEmpty(data.visiblity) ? data.visiblity : '';
 
  


    if(Validator.isEmpty(data.photoUrl)){
      errors.photoUrl= "Photo  is required";
    }
    if(Validator.isEmpty(data.name)){
      errors.name= "Name is required";
    }
    if(Validator.isEmpty(data.nameAr)){
      errors.nameAr= "Name Arabic is required";
    }
    if(Validator.isEmpty(data.position)){
      errors.position= "Position is required";
    }
    if(Validator.isEmpty(data.positionAr)){
      errors.positionAr= "Position Arabic is required";
    }
 
    if(Validator.isEmpty(data.visiblity)){
      errors.visiblity= "Visiblity is required";
    }
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

