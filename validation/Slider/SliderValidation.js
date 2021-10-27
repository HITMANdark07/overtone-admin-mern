const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateSliderInput(data,user){
    let errors = {};

    data.photoUrl       = !isEmpty(data.photoUrl) ? data.photoUrl : '';
    data.sliderName      = !isEmpty(data.sliderName) ? data.sliderName : '';
    data.visiblity      = !isEmpty(data.visiblity) ? data.visiblity : '';
    data.categoryID      = !isEmpty(data.categoryID) ? data.categoryID : '';
    //data.productID      = !isEmpty(data.productID) ? data.productID : '';


 
  


    if(Validator.isEmpty(data.photoUrl)){
      errors.photoUrl= "Photo  is required";
    }
    if(Validator.isEmpty(data.sliderName)){
      errors.sliderName= "Slider Name is required";
    }
  
 
    if(Validator.isEmpty(data.visiblity)){
      errors.visiblity= "Visiblity is required";
    }
    if(Validator.isEmpty(data.categoryID)){
      errors.categoryID= "Category is required";
    }
    // if(Validator.isEmpty(data.productID)){
    //   errors.productID= "Product is required";
    // }
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

