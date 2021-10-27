const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateCategoryInput(data,user){
    let errors = {};

    data.photoUrl       = !isEmpty(data.photoUrl) ? data.photoUrl : '';
    data.categoryID       = !isEmpty(data.categoryID) ? data.categoryID : '';
    data.subcategoryID       = !isEmpty(data.subcategoryID) ? data.subcategoryID : '';
    data.subCategoryChildName      = !isEmpty(data.subCategoryChildName) ? data.subCategoryChildName : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
    data.storeID      = !isEmpty(data.storeID) ? data.storeID : '';
  
  
   
    if(Validator.isEmpty(data.photoUrl)){
      errors.photoUrl= "Photo  is required";
    }
    if(Validator.isEmpty(data.categoryID)){
      errors.categoryID= "Category  is required";
    }
    if(Validator.isEmpty(data.subcategoryID)){
      errors.subcategoryID= "Sub-Category  is required";
    }
    if(Validator.isEmpty(data.subCategoryChildName)){
      errors.subCategoryChildName= "Sub Category Child Name is required";
    }
    
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "isEnabled is required";
    }
   
   
   
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

