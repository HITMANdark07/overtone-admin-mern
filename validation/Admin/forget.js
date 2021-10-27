const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateAdminForgetInput(data){
    let errors = {};
    
    data.email   = !isEmpty(data.email) ? data.email : '';
    if(Validator.isEmpty(data.email)){
      errors.email= "Email is Required";
    }
  
    return{
      errors,
      isValid: isEmpty(errors)
    };
};