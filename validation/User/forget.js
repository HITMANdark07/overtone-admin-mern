const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateForgetInput(data){
    let errors = {};
    
    data.emailLogin   = !isEmpty(data.emailLogin) ? data.emailLogin : '';

    if (!Validator.isEmail(data.emailLogin)) {
    errors.emailLogin = 'Email is invalid';
  }

    if(Validator.isEmpty(data.emailLogin)){
      errors.emailLogin= "This Field is Required";
    }
  
    return{
      errors,
      isValid: isEmpty(errors)
    };
};