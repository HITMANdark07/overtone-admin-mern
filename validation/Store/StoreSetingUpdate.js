const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validatStoreSettingInput(data){
    let errors = {};

    data.storeName       = !isEmpty(data.storeName) ? data.storeName : '';
    data.storeLogo      = !isEmpty(data.storeLogo) ? data.storeLogo : '';
    data.storeEmail      = !isEmpty(data.storeEmail) ? data.storeEmail : '';
    data.currency      = !isEmpty(data.currency) ? data.currency : '';
    data.phoneNumber      = !isEmpty(data.phoneNumber) ? data.phoneNumber : '';
    data.theme      = !isEmpty(data.theme) ? data.theme : '';
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
    if(Validator.isEmpty(data.phoneNumber)){
      errors.phoneNumber= "Phone Number is required";
    }
    if(Validator.isEmpty(data.theme)){
      errors.theme= "Theme is required";
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
    if(Validator.isEmpty(data.currency)){
      errors.currency= "Currency is required";
    }

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

