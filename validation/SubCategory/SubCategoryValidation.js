const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateCategoryInput(data,user){
    let errors = {};

    data.categoryID       = !isEmpty(data.categoryID) ? data.categoryID : '';
    data.subCategoryName      = !isEmpty(data.subCategoryName) ? data.subCategoryName : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
  
    if(Validator.isEmpty(data.categoryID)){
      errors.categoryID= "Category  is required";
    }
    if(Validator.isEmpty(data.subCategoryName)){
      errors.subCategoryName= "Sub Category Name is required";
    }
  
 
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "isEnabled is required";
    }
   
   
   
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

