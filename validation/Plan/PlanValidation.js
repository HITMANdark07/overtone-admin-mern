const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validatePlanInput(data){
    let errors = {};

    data.planName       = !isEmpty(data.planName) ? data.planName : '';
    data.amount      = !isEmpty(data.amount) ? data.amount : '';
    data.type      = !isEmpty(data.type) ? data.type : '';
    data.featureList      = !isEmpty(data.featureList) ? data.featureList : '';

    if(Validator.isEmpty(data.planName)){
      errors.planName= "Plan Name is required";
    }
    if(Validator.isEmpty(data.amount)){
      errors.amount= "Amount is required";
    }
    if(Validator.isEmpty(data.type)){
      errors.type= "Plan Type is required";
    }
    if(Object.keys(data.featureList).length===0){
      errors.featureList= "Feature List is required";
    }
    return{
      errors,
      isValid: isEmpty(errors)
    };
};

