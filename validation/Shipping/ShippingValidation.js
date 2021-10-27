const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateShippingInput(data,user){
    let errors = {};

    data.shippingName       = !isEmpty(data.shippingName) ? data.shippingName : '';
    data.shippingDesc       = !isEmpty(data.shippingDesc) ? data.shippingDesc : '';
    data.amount      = !isEmpty(data.amount) ? data.amount : '';
 
 
  


    if(Validator.isEmpty(data.shippingName)){
      errors.shippingName= "Shipping Name  is required";
    }
      if(Validator.isEmpty(data.shippingDesc)){
      errors.shippingDesc= "Shipping Description is required";
    }
    if(Validator.isEmpty(data.amount)){
      errors.amount= "Amount is required";
    }
   
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

