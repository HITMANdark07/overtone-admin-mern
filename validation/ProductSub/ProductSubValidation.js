const Validator = require('validator');
const isEmpty   = require('../is-empty');


module.exports = function validateProductSubInput(data,user){
    let errors = {};

   
    data.productID      = !isEmpty(data.productID) ? data.productID : '';
    data.productSubName      = !isEmpty(data.productSubName) ? data.productSubName : '';
    data.saleDesc      = !isEmpty(data.saleDesc) ? data.saleDesc : '';
    data.sku      = !isEmpty(data.sku) ? data.sku : '';
    data.type      = !isEmpty(data.type) ? data.type : '';
    data.salePrice      = !isEmpty(data.salePrice) ? data.salePrice : '';
    data.taxable      = !isEmpty(data.taxable) ? data.taxable : '';
    data.incomeAccount      = !isEmpty(data.incomeAccount) ? data.incomeAccount : '';
    data.purchaseDesc      = !isEmpty(data.purchaseDesc) ? data.purchaseDesc : '';
    data.purchaseCost      = !isEmpty(data.purchaseCost) ? data.purchaseCost : '';
    data.expenseAccount      = !isEmpty(data.expenseAccount) ? data.expenseAccount : '';
    data.isEnabled      = !isEmpty(data.isEnabled) ? data.isEnabled : '';
     
  
  
    if(Validator.isEmpty(data.productID)){
      errors.productID= "Product Name is required";
    }
    if(Validator.isEmpty(data.productSubName)){
      errors.productSubName= "Product Sub Name is required";
    }
    if(Validator.isEmpty(data.saleDesc)){
      errors.saleDesc= "Sale Description is required";
    }
    if(Validator.isEmpty(data.sku)){
      errors.sku= "SKU is required";
    }
    if(Validator.isEmpty(data.type)){
      errors.type= "Type is required";
    }
    if(Validator.isEmpty(data.salePrice)){
      errors.salePrice= "Sale Price is required";
    }
    if(Validator.isEmpty(data.taxable)){
      errors.taxable= "Taxable is required";
    }
    if(Validator.isEmpty(data.incomeAccount)){
      errors.incomeAccount= "Income Account is required";
    }
    if(Validator.isEmpty(data.purchaseDesc)){
      errors.purchaseDesc= "Purchase Description is required";
    }
    if(Validator.isEmpty(data.purchaseCost)){
      errors.purchaseCost= "Purchase Cost is required";
    }
    if(Validator.isEmpty(data.expenseAccount)){
      errors.expenseAccount= "Expense Account is required";
    }
 
    if(Validator.isEmpty(data.isEnabled)){
      errors.isEnabled= "isEnabled is required";
    }

   
   

    return{
      errors,
      isValid: isEmpty(errors)
    };
};

