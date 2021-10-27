const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateCouponInput(data,user){
    let errors = {};

    data.couponCode       = !isEmpty(data.couponCode) ? data.couponCode : '';
    data.type      = !isEmpty(data.type) ? data.type : '';
    data.value      = !isEmpty(data.value) ? data.value : '';
    data.validFrom      = !isEmpty(data.validFrom) ? data.validFrom : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';

 
  


    if(Validator.isEmpty(data.couponCode)){
      errors.couponCode= "Coupon Code  is required";
    }
    if(Validator.isEmpty(data.type)){
      errors.type= "Type is required";
    }
    if(Validator.isEmpty(data.value)){
      errors.value= "Value is Required";
    }
    if(Validator.isEmpty(data.validFrom)){
      errors.validFrom= "From Date is Required";
    }
    if(Validator.isEmpty(data.validTo)){
      errors.validTo= "To date is Required";
    }
 
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "Status is required";
    }
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

