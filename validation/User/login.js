const Validator = require('validator');
const isEmpty   = require('../is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.emailLogin = !isEmpty(data.emailLogin) ? data.emailLogin : '';
  data.passwordLogin = !isEmpty(data.passwordLogin) ? data.passwordLogin : '';

  // if (!Validator.isEmail(data.emailLogin)) {
  //   errors.emailLogin = 'Email is invalid';
  // }

  if (Validator.isEmpty(data.emailLogin)) {
    errors.emailLogin = 'Email/Username field is required';
  }

  if (Validator.isEmpty(data.passwordLogin)) {
    errors.passwordLogin = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
