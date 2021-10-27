const Validator = require('validator');
const isEmpty   = require('../is-empty');

module.exports = function validateverifyInput(data) {
  let errors = {};

  data.mobile = !isEmpty(data.mobile) ? data.mobile : '';
  data.pin = !isEmpty(data.pin) ? data.pin : '';

 
  if (Validator.isEmpty(data.mobile)) {
    errors.mobile = 'Mobile No  is required';
  }

  if (Validator.isEmpty(data.pin)) {
    errors.pin = 'OTP is required';
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
