const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateProductInput(data,user){
    let errors = {};
    data.name      = !isEmpty(data.name) ? data.name : '';
    data.description      = !isEmpty(data.description) ? data.description : '';
    data.price      = !isEmpty(data.price) ? data.price : '';
    data.discountPrice      = !isEmpty(data.discountPrice) ? data.discountPrice : '';
    data.stockCount      = !isEmpty(data.stockCount) ? data.stockCount : '';
    data.photoUrl1      = !isEmpty(data.photoUrl1) ? data.photoUrl1 : '';
    data.maintenanceText      = !isEmpty(data.maintenanceText) ? data.maintenanceText : '';
    data.maintenanceBtnText      = !isEmpty(data.maintenanceBtnText) ? data.maintenanceBtnText : '';
    data.maintenanceFileUrl      = !isEmpty(data.maintenanceFileUrl) ? data.maintenanceFileUrl : '';
    data.acousticsText      = !isEmpty(data.maintenanceFileUrl) ? data.acousticsText : '';
    data.categoryID      = !isEmpty(data.categoryID) ? data.categoryID : '';
    data.subcategoryID      = !isEmpty(data.subcategoryID) ? data.subcategoryID : '';
    data.subcategoryChildID      = !isEmpty(data.subcategoryChildID) ? data.subcategoryChildID : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
    data.keyword      = !isEmpty(data.keyword) ? data.keyword : '';
    data.quickship      = !isEmpty(data.quickship) ? data.quickship : '';

 

    if(Validator.isEmpty(data.name)){
      errors.name= "Product Name is required";
    }
    if(Validator.isEmpty(data.description)){
      errors.description= "Product Description  is required";
    }
 
    if(Validator.isEmpty(data.price)){
      errors.price= "Price is required";
    }
    if(Validator.isEmpty(data.discountPrice)){
      errors.discountPrice= "Discount Price is required";
    }
    if(Validator.isEmpty(data.stockCount)){
      errors.stockCount= "Stock Count is required";
    }

    if(Validator.isEmpty(data.photoUrl1)){
      errors.photoUrl1= "Product Image is required";
    }

    if(Validator.isEmpty(data.maintenanceText)){
      errors.maintenanceText= "Maintenance Text is required";
    }

    if(Validator.isEmpty(data.maintenanceBtnText)){
      errors.maintenanceBtnText= "Maintenance Button Text is required";
    }

    if(Validator.isEmpty(data.maintenanceFileUrl)){
      errors.maintenanceFileUrl= "Maintenance File  is required";
    }

    if(Validator.isEmpty(data.acousticsText)){
      errors.acousticsText= "Acoustics Text File  is required";
    }
    if(Validator.isEmpty(data.categoryID)){
      errors.categoryID= "Category is required";
    }
    if(Validator.isEmpty(data.subcategoryID)){
      errors.subcategoryID= "Subcategory is required";
    }
    // if(Validator.isEmpty(data.subcategoryChildID)){
    //   errors.subcategoryChildID= "Subcategory Child is required";
    // }
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "isEnabled is required";
    }
    if(Validator.isEmpty(data.keyword)){
      errors.keyword= "Keyword is required";
    }
    if(Validator.isEmpty(data.quickship)){
      errors.quickship= "Quickship is required";
    }
   
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

