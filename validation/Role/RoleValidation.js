const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateRoleInput(data,user){
    let errors = {};

    data.roleName       = !isEmpty(data.roleName) ? data.roleName : '';
    data.permissionList       = !isEmpty(data.permissionList) ? data.permissionList : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
 

    if(Validator.isEmpty(data.roleName)){
      errors.roleName= "Role Name  is required";
    }
    if(Validator.isEmpty(data.permissionList)){
      errors.permissionList= "Select Atleast One Permission";
    }
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "IsEnabled is required";
    }
  
  
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

