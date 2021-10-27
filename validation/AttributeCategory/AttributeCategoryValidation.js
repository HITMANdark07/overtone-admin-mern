const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateAttributeCategoryInput(data,user){
    let errors = {};

   
    data.attributeName      = !isEmpty(data.attributeName) ? data.attributeName : ''
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
     
  
  
    if(Validator.isEmpty(data.attributeName)){
      errors.attributeName= "Attribute Name is required";
    }
  
 
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "isEnabled is required";
    }
  
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

