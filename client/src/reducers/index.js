import {combineReducers} from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
//Store Reducer
import storeReducer from './storeReducer';
//Plan Reducer
import planReducer from './planReducer';
//Slider Reducer
import sliderReducer from './sliderReducer';
//Category Reducer
import categoryReducer from './categoryReducer';
//Sub Category Reducer
import subCategoryReducer from './subCategoryReducer';
import subCategoryChildReducer from './subCategoryChildReducer';

//Product Reducer
import productReducer from './productReducer';

//User Reducer
import userReducer from './userReducer';
//Shipping Reducer
import shippingReducer from './shippingReducer';


//orderstatus Reducer
import orderstatusReducer from './orderstatusReducer';

//teamReducer Reducer
import teamReducer from './teamReducer';

//blogReducer Reducer
import blogReducer from './blogReducer';

//coupon Reducer
import couponReducer from './couponReducer';

//order Reducer
import orderReducer from './orderReducer';

//role Reducer
import roleReducer from './roleReducer';

//admin Reducer
import adminReducer from './adminReducer';

//parentattributecategory Reducer
import parentattributecategoryReducer from './parentattributecategoryReducer';

//attributecategory Reducer
import attributecategoryReducer from './attributecategoryReducer';

//attributecategory Reducer
import attributemappingReducer from './attributemappingReducer';

//productsubReducer Reducer
import productsubReducer from './productsubReducer';

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    store:storeReducer,
    plan:planReducer,
    slider:sliderReducer,
    category:categoryReducer,
    subCategory:subCategoryReducer,
    subCategoryChild:subCategoryChildReducer,
    product:productReducer,
    user:userReducer,
    orderstatus:orderstatusReducer,
    team:teamReducer,
    blog:blogReducer,
    shipping:shippingReducer,
    coupon:couponReducer,
    order:orderReducer,
    role:roleReducer,
    admin:adminReducer,
    parentattributecategory:parentattributecategoryReducer,
    attributecategory:attributecategoryReducer,
    attributemapping:attributemappingReducer,
    productsub:productsubReducer
});
