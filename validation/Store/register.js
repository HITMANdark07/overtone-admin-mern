const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateStoreRegisterInput(data){
    let errors = {};

    data.storeName       = !isEmpty(data.storeName) ? data.storeName : '';
    data.storeEmail      = !isEmpty(data.storeEmail) ? data.storeEmail : '';
    data.phoneNumber     = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.password   = !isEmpty(data.password) ? data.password : '';
    data.password2  = !isEmpty(data.password2) ? data.password2 : '';
 

    if(!Validator.isLength(data.storeName,{min:2,max:30})){
      errors.storeName = 'Name must be between 2 and 30 Characters';
    }

    if(Validator.isEmpty(data.storeName)){
      errors.storeName= "Store Name field is required";
    }
    if (!Validator.isEmail(data.storeEmail)){
      errors.storeEmail= "Email is Invalid";
    }

    if(Validator.isEmpty(data.storeEmail)){
      errors.storeEmail= "Email field is required";
    }
    if(Validator.isEmpty(data.phoneNumber)){
      errors.phoneNumber= "Phone Number field is required";
    }

    if(Validator.isEmpty(data.password)){
      errors.password= "Password field is required";
    }
    if(Validator.isEmpty(data.password2)){
      errors.password2= "Confirm Password field is required";
    }
  
  
    if(!Validator.isLength(data.password,{min:6,max:30})){
      errors.password= "Password must be atleast 6 characters";
    }

    if(!Validator.equals(data.password,data.password2)){
      errors.password2= "Password must match";
    }
  

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

