const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateCategoryInput(data,user){
    let errors = {};

   
    data.categoryName      = !isEmpty(data.categoryName) ? data.categoryName : '';
    data.dropdown      = !isEmpty(data.dropdown) ? data.dropdown : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
    data.sliderStyle      = !isEmpty(data.sliderStyle) ? data.sliderStyle : '';

     
  
  
    if(Validator.isEmpty(data.categoryName)){
      errors.categoryName= "Category Name is required";
    }
    if(Validator.isEmpty(data.dropdown)){
      errors.dropdown= "dropdown is required";
    }
 
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "isEnabled is required";
    }

    if(Validator.isEmpty(data.sliderStyle)){
      errors.sliderStyle= "Slider Style is required";
    }
  
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

