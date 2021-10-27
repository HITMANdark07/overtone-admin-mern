const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateCategoryInput(data,user){
    let errors = {};

    data.name       = !isEmpty(data.name) ? data.name : '';
    data.nameAr       = !isEmpty(data.nameAr) ? data.nameAr : '';  
    data.email      = !isEmpty(data.email) ? data.email : '';
    data.mobile      = !isEmpty(data.mobile) ? data.mobile : '';
    data.photo      = !isEmpty(data.photo) ? data.photo : '';
    data.description      = !isEmpty(data.description) ? data.description:'';
    data.descriptionAr      = !isEmpty(data.descriptionAr) ? data.descriptionAr:'';
     
   
    if(Validator.isEmpty(data.name)){
      errors.name= "Name  is required";
    }
    if(Validator.isEmpty(data.nameAr)){
      errors.nameAr= "Name  Arabic is required";
    }
    if(Validator.isEmpty(data.email)){
      errors.email= "Email is required";
    }
 
    if(Validator.isEmpty(data.mobile)){
      errors.mobile= "Mobile is required";
    }

    if(Validator.isEmpty(data.description)){
      errors.description= "Description is required";
    }

    if(Validator.isEmpty(data.descriptionAr)){
      errors.descriptionAr= "Description  Arabic is required";
    }
 

   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

