const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateOrderInput(data,user){
    let errors = {};

    data.name       = !isEmpty(data.name) ? data.name : '';
    data.mobile      = !isEmpty(data.mobile) ? data.mobile : '';
    data.email      = !isEmpty(data.email) ? data.email : '';
    data.address      = !isEmpty(data.address) ? data.address : '';
    data.total      = !isEmpty(data.total) ? data.total : '';
    data.status      = !isEmpty(data.status) ? data.status : '';
    data.paymentType= !isEmpty(data.paymentType) ? data.paymentType : '';

   
  
  
   
    if(Validator.isEmpty(data.name)){
      errors.name= "Name  is required";
    }
    if(Validator.isEmpty(data.mobile)){
      errors.mobile= "Mobile  is required";
    }
    if(Validator.isEmpty(data.email)){
      errors.email= "Email is required";
    }
    if(Validator.isEmpty(data.address)){
      errors.address= "Address is required";
    }
    if(Validator.isEmpty(data.total)){
      errors.total= "Total is required";
    }
    if(Validator.isEmpty(data.status)){
      errors.status= "Status is required";
    }
    if(Validator.isEmpty(data.paymentType)){
      errors.paymentType= "PaymentType is required";
    }
   
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

