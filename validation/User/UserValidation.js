const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateUserInput(data){
    let errors = {};

    data.name       = !isEmpty(data.name) ? data.name : '';
     data.mobile       = !isEmpty(data.mobile) ? data.mobile : '';
    data.email      = !isEmpty(data.email) ? data.email : '';
    data.password      = !isEmpty(data.password) ? data.password : '';
    data.password2  = !isEmpty(data.password2) ? data.password2 : '';

    if(!Validator.isLength(data.name,{min:2,max:30})){
      errors.name = 'Name must be between 2 and 30 Characters';
    }
    if(Validator.isEmpty(data.name)){
      errors.name= "Name field is required";
    }

    if (!Validator.isEmail(data.email)){
      errors.email= "Email is Invalid";
    }
    
    // if (!Validator.isMobilePhone(data.mobile,['ar-IN']) && data.mobile !=""){
    //   errors.mobile= "Mobile No is Invalid";
    // }
    if(Validator.isEmpty(data.mobile)){
      errors.mobile= "Moble field is required";
    }
    
  //   if(!Validator.matches(data.password, /^(?=.*[A-Z]{2})(?=.*[0-9]{2})/g)){
  //  // if(!Validator.matches(data.password, /(?=^.{8,30}$)(?=(.*\\d){2})(?=(.*[A-Za-z]){2})(?=.*[!@#$%^&*?])(?!.*[\\s])^.*/g)){
  //     errors.password= "Password Must Contains 2 Capital Letters and Numbers";
  //   }
    if(!Validator.isLength(data.password,{min:8,max:30})){
      errors.password= "Password must be atleast 8 characters";
    }

    if(Validator.isEmpty(data.email)){
      errors.email= "Email field is required";
    }


    if(Validator.isEmpty(data.password)){
      errors.password= "Password field is required";
    }
    if(Validator.isEmpty(data.password2)){
      errors.password2= "Confirm Password field is required";
    }
    // if(Validator.isEmpty(data.mobile)){
    //   errors.mobile= "Mobile No is required";
    // }
   
   
  

 

    if(!Validator.equals(data.password,data.password2)){
      errors.password2= "Password must match";
    }
    
    return{
      errors,
      isValid: isEmpty(errors)
    };
};

