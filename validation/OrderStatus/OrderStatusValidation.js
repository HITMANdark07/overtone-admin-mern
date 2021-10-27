const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateCategoryInput(data,user){
    let errors = {};

    data.StatusName       = !isEmpty(data.StatusName) ? data.StatusName : '';
    // data.StatusNameAr       = !isEmpty(data.StatusNameAr) ? data.StatusNameAr : '';
    data.visiblity      = !isEmpty(data.visiblity) ? data.visiblity : '';
   
  
  
   
    if(Validator.isEmpty(data.StatusName)){
      errors.StatusName= "Status Name  is required";
    }
    // if(Validator.isEmpty(data.StatusNameAr)){
    //   errors.StatusNameAr= "Status Name Arabic  is required";
    // }
    if(Validator.isEmpty(data.visibility)){
      errors.visibility= "Visibility is required";
    }
 
   
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

