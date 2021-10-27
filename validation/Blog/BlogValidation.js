const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateBlogInput(data,user){
    let errors = {};

    data.photoUrl       = !isEmpty(data.photoUrl) ? data.photoUrl : '';
    data.title       = !isEmpty(data.title) ? data.title : '';
    data.content      = !isEmpty(data.content) ? data.content : '';
    data.shortContent      = !isEmpty(data.shortContent) ? data.shortContent : '';
    data.blogType      = !isEmpty(data.blogType) ? data.blogType : '';
    data.visiblity      = !isEmpty(data.visiblity) ? data.visiblity : '';
 
  


    if(Validator.isEmpty(data.photoUrl)){
      errors.photoUrl= "Blog Photo  is required";
    }
    if(Validator.isEmpty(data.title)){
      errors.title= "Title  is required";
    }
    if(Validator.isEmpty(data.content)){
      errors.content= "Short Content is required";
    }
    if(Validator.isEmpty(data.content)){
      errors.content= "Blog Content is required";
    }
    if(Validator.isEmpty(data.blogType)){
      errors.blogType= "Type is required";
    }
 
    if(Validator.isEmpty(data.visiblity)){
      errors.visiblity= "Visiblity is required";
    }
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

