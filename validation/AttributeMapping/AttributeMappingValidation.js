const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateAttributeMappingInput(data,user){
    let errors = {};
    data.parentAttributeCategoryID      = !isEmpty(data.parentAttributeCategoryID) ? data.parentAttributeCategoryID : ''
    data.attributeCategoryID      = !isEmpty(data.attributeCategoryID) ? data.attributeCategoryID : '';
    data.productID      = !isEmpty(data.productID) ? data.productID : '';
    data.mappingLabel      = !isEmpty(data.mappingLabel) ? data.mappingLabel : '';
    data.mappingType      = !isEmpty(data.mappingType) ? data.mappingType : '';
    data.mappingValue      = !isEmpty(data.mappingValue) ? data.mappingValue : '';
    // data.photoUrl      = !isEmpty(data.photoUrl) ? data.photoUrl : '';
    data.additionalPrice      = !isEmpty(data.additionalPrice) ? data.additionalPrice : '';
    data.dependentField      = !isEmpty(data.dependentField) ? data.dependentField : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
    data.mappingName      = !isEmpty(data.mappingName) ? data.mappingName : '';

    if(Validator.isEmpty(data.parentAttributeCategoryID)){
      errors.parentAttributeCategoryID= "Parent Catgory Attribute is required";
    }

    if(Validator.isEmpty(data.attributeCategoryID)){
      errors.attributeCategoryID= "Attribute Category is required";
    }

    if(Validator.isEmpty(data.productID)){
      errors.productID= "Product Name is required";
    }

    if(Validator.isEmpty(data.mappingLabel)){
      errors.mappingLabel= "Label is required";
    }
    if(Validator.isEmpty(data.mappingType)){
      errors.mappingType= "Type is required";
    }

    if(Validator.isEmpty(data.mappingValue)){
      errors.mappingValue= "Value is required";
    }
  

    if(Validator.isEmpty(data.additionalPrice)){
      errors.additionalPrice= "Price is required";
    }
 
    if(Validator.isEmpty(data.dependentField)){
      errors.dependentField= "Dependent Field is required";
    }
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "isEnabled is required";
    }

    if(Validator.isEmpty(data.mappingName)){
      errors.mappingName= "Parent Category Position is required";
    }
  
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

