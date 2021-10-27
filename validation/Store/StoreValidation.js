const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validatStoreInput(data){
    let errors = {};

    data.storeName       = !isEmpty(data.storeName) ? data.storeName : '';
    data.storeLogo      = !isEmpty(data.storeLogo) ? data.storeLogo : '';
    data.storeEmail      = !isEmpty(data.storeEmail) ? data.storeEmail : '';
    data.password      = !isEmpty(data.password) ? data.password : '';
    data.phoneNumber      = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.theme      = !isEmpty(data.theme) ? data.theme : '';
    data.planID      = !isEmpty(data.planID) ? data.planID : '';
    data.visiblity      = !isEmpty(data.visiblity) ? data.visiblity : '';
    data.address      = !isEmpty(data.address) ? data.address : '';
    data.description      = !isEmpty(data.description) ? data.description : '';
    data.latitude      = !isEmpty(data.latitude) ? data.latitude : '';
    data.longitude      = !isEmpty(data.longitude) ? data.longitude : '';



    if(Validator.isEmpty(data.storeName)){
      errors.storeName= "Store Name is required";
    }
    if(Validator.isEmpty(data.storeLogo)){
      errors.storeLogo= "Store Logo is required";
    }
    if(Validator.isEmpty(data.storeEmail)){
      errors.storeEmail= "Store Email is required";
    }
    if(Validator.isEmpty(data.password)){
      errors.password= "Password is required";
    }
    if(Validator.isEmpty(data.phoneNumber)){
      errors.phoneNumber= "Phone Number is required";
    }
    if(Validator.isEmpty(data.theme)){
      errors.theme= "Theme is required";
    }

    if(Validator.isEmpty(data.planID)){
      errors.planID= "Plan is required";
    }
    if(Validator.isEmpty(data.visiblity)){
      errors.visiblity= "Visiblity is required";
    }

    if(Validator.isEmpty(data.address)){
      errors.address= "Address is required";
    }
    if(Validator.isEmpty(data.description)){
      errors.description= "Description is required";
    }
    if(Validator.isEmpty(data.latitude)){
      errors.latitude= "Latitude is required";
    }
    if(Validator.isEmpty(data.longitude)){
      errors.longitude= "Longitude is required";
    }

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

module.exports = function validatStoreInput(data){
    let errors = {};

    data.storeName       = !isEmpty(data.storeName) ? data.storeName : '';
    data.storeLogo      = !isEmpty(data.storeLogo) ? data.storeLogo : '';
    data.storeEmail      = !isEmpty(data.storeEmail) ? data.storeEmail : '';
    data.password      = !isEmpty(data.password) ? data.password : '';
    data.phoneNumber      = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.theme      = !isEmpty(data.theme) ? data.theme : '';
    data.planID      = !isEmpty(data.planID) ? data.planID : '';
    data.visiblity      = !isEmpty(data.visiblity) ? data.visiblity : '';
    data.address      = !isEmpty(data.address) ? data.address : '';
    data.description      = !isEmpty(data.description) ? data.description : '';
    data.latitude      = !isEmpty(data.latitude) ? data.latitude : '';
    data.longitude      = !isEmpty(data.longitude) ? data.longitude : '';
    data.currency      = !isEmpty(data.currency) ? data.currency : '';



    if(Validator.isEmpty(data.storeName)){
      errors.storeName= "Store Name is required";
    }
    if(Validator.isEmpty(data.storeLogo)){
      errors.storeLogo= "Store Logo is required";
    }
    if(Validator.isEmpty(data.storeEmail)){
      errors.storeEmail= "Store Email is required";
    }
    if(Validator.isEmpty(data.password)){
      errors.password= "Password is required";
    }
    if(Validator.isEmpty(data.phoneNumber)){
      errors.phoneNumber= "Phone Number is required";
    }
    if(Validator.isEmpty(data.theme)){
      errors.theme= "Theme is required";
    }

    if(Validator.isEmpty(data.planID)){
      errors.planID= "Plan is required";
    }
    if(Validator.isEmpty(data.visiblity)){
      errors.visiblity= "Visiblity is required";
    }

    if(Validator.isEmpty(data.address)){
      errors.address= "Address is required";
    }
    if(Validator.isEmpty(data.description)){
      errors.description= "Description is required";
    }
    if(Validator.isEmpty(data.latitude)){
      errors.latitude= "Latitude is required";
    }
    if(Validator.isEmpty(data.longitude)){
      errors.longitude= "Longitude is required";
    }

    if(Validator.isEmpty(data.country)){
      errors.country= "Country is required";
    }
    if(Validator.isEmpty(data.state)){
      errors.state= "State is required";
    }
    if(Validator.isEmpty(data.currency)){
      errors.currency= "Currency Symbol is required";
    }


    return{
      errors,
      isValid: isEmpty(errors)
    };
};

