import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'; 
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser, logoutUser} from './actions/authAction';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';
import {Provider} from 'react-redux';
import store from './store';
import Login   from './components/auth/Login';
import Forget   from './components/auth/Forget';
import './App.css';

import Landing from './components/layouts/Landing';
import AddStore from './components/admin/store/AddStore';
import EditStore from './components/admin/store/EditStore';
import ListStore from './components/admin/store/ListStore';


import AddSlider from './components/admin/slider/AddSlider';
import EditSlider from './components/admin/slider/EditSlider';
import ListSlider from './components/admin/slider/ListSlider';
import AddCategory from './components/admin/category/AddCategory';
import EditCategory from './components/admin/category/EditCategory';
import ListCategory from './components/admin/category/ListCategory';
import AddSubCategory from './components/admin/subcategory/AddSubCategory';
import EditSubCategory from './components/admin/subcategory/EditSubCategory';
import ListSubCategory from './components/admin/subcategory/ListSubCategory';
import AddSubCategoryChild from './components/admin/subcategorychild/AddSubCategoryChild';
import EditSubCategoryChild from './components/admin/subcategorychild/EditSubCategoryChild';
import ListSubCategoryChild from './components/admin/subcategorychild/ListSubCategoryChild';
import AddProduct from './components/admin/product/AddProduct';
import EditProduct from './components/admin/product/EditProduct';
import ListProduct from './components/admin/product/ListProduct';
import AddSetting from './components/admin/setting/AddSetting';
import UpdatePassword from './components/admin/updatepassword/UpdatePassword';
import AdminDashboard from './components/admin/dashboard/AdminDashboard';


import AddUsers from './components/admin/users/AddUsers';
import ListUsers from './components/admin/users/ListUsers';
import EditUsers from './components/admin/users/EditUsers';


import AddParentAttributeCategory from './components/admin/parentattributecategory/AddParentAttributeCategory';
import ListParentAttributeCategory from './components/admin/parentattributecategory/ListParentAttributeCategory';
import EditParentAttributeCategory from './components/admin/parentattributecategory/EditParentAttributeCategory';

import AddAttributeCategory from './components/admin/attributecategory/AddAttributeCategory';
import ListAttributeCategory from './components/admin/attributecategory/ListAttributeCategory';
import EditAttributeCategory from './components/admin/attributecategory/EditAttributeCategory';


import ListOrder from './components/admin/order/ListOrder';
import AddOrderStatus from './components/admin/orderstatus/AddOrderStatus';
import EditOrderStatus from './components/admin/orderstatus/EditOrderStatus';
import ListOrderStatus from './components/admin/orderstatus/ListOrderStatus';

import AddTeam from './components/admin/team/AddTeam';
import EditTeam from './components/admin/team/EditTeam';
import ListTeam from './components/admin/team/ListTeam';

import AddBlog from './components/admin/blog/AddBlog';
import EditBlog from './components/admin/blog/EditBlog';
import ListBlog from './components/admin/blog/ListBlog';


import AddShipping from './components/admin/shipping/AddShipping';
import EditShipping from './components/admin/shipping/EditShipping';
import ListShipping from './components/admin/shipping/ListShipping';

import AddCoupon from './components/admin/coupon/AddCoupon';
import EditCoupon from './components/admin/coupon/EditCoupon';
import ListCoupon from './components/admin/coupon/ListCoupon';
import ListOrderDetail from './components/admin/order/ListOrderDetail';


//Role
import AddRole from './components/admin/role/AddRole';
import EditRole from './components/admin/role/EditRole';
import ListRole from './components/admin/role/ListRole';

//Admin
import AddAdmins from './components/admin/admins/AddAdmins';
import EditAdmins from './components/admin/admins/EditAdmins';
import ListAdmins from './components/admin/admins/ListAdmins';
import ErrorPages from './components/admin/error/ErrorPage';

//Attribute Mapping
import AddAttributeMapping from './components/admin/attributemapping/AddAttributeMapping';
import EditAttributeMapping from './components/admin/attributemapping/EditAttributeMapping';
import ListAttributeMapping from './components/admin/attributemapping/ListAttributeMapping';

//Sub Products Mapping
import AddProductSub from './components/admin/productsub/AddProductSub';
import EditProductSub from './components/admin/productsub/EditProductSub';
import ListProductSub from './components/admin/productsub/ListProductSub';
import QuickbookCallback from './components/admin/productsub/QuickbookCallback';
import CreateOrder from "./components/admin/order/CreateOrder";
import AddProductNew from "./components/admin/product-new/AddProduct";
import EditProductNew from "./components/admin/product-new/EditProduct";
import ListProductNew from "./components/admin/product-new/ListProduct";
import AddProductScreen from "./components/admin/productpage/AddProductScreen";
import AddProductTempScreeen from "./components/admin/productpage/AddProductTempScreeen";

//Check for Token
if(localStorage.jwtToken){
  console.log("running")
  //Set Auth Token header Auth
  setAuthToken(localStorage.jwtToken);
  //Decode Token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  //Set User and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  //Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime){
    //Logout user
    store.dispatch(logoutUser());
   //ToDO : clear current profile
    //Redirect to Login page
    window.location.href = '/login';
  }

}

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <Router 
          exact 
          path="/"
           //forceRefresh={true}
      >
      <div>
          <Route exact path="/admin/login" component={Login}/>
          <Route exact path="/" component={Login}/>
            <Switch>  
              <Route exact path="/admin/forget" component={Forget}/>
              <Route exact path="/admin/error" component={ErrorPages}/> 
              

                <AdminRoute exact path="/admin/addstore" component={AddStore}/>
                <AdminRoute exact path="/admin/editstore" component={EditStore}/>
                <AdminRoute exact path="/admin/liststore" component={ListStore}/> 
               
               
                

                <AdminRoute exact path="/admin/addslider" component={AddSlider} menu="SLIDER" action="CREATE"/>
                <AdminRoute exact path="/admin/editslider" component={EditSlider} menu="SLIDER" action="UPDATE"/>
                <AdminRoute exact path="/admin/listslider" component={ListSlider} menu="SLIDER" action="READ"/>   

                <AdminRoute exact path="/admin/addcategory" component={AddCategory} menu="CATEGORY" action="CREATE"/>
                <AdminRoute exact path="/admin/editcategory" component={EditCategory} menu="CATEGORY" action="UPDATE"/>
                <AdminRoute exact path="/admin/listcategory" component={ListCategory} menu="CATEGORY" action="READ"/>   

                <AdminRoute exact path="/admin/addsubcategory" component={AddSubCategory} menu="SUB_CATEGORY" action="CREATE"/>
                <AdminRoute exact path="/admin/editsubcategory" component={EditSubCategory} menu="SUB_CATEGORY" action="UPDATE"/>
                <AdminRoute exact path="/admin/listsubcategory" component={ListSubCategory} menu="SUB_CATEGORY" action="READ"/> 


                <AdminRoute exact path="/admin/addsubcategorychild" component={AddSubCategoryChild} menu="SUB_CATEGORY_CHILD" action="CREATE"/>
                <AdminRoute exact path="/admin/editsubcategorychild" component={EditSubCategoryChild}  menu="SUB_CATEGORY_CHILD" action="UPDATE"/>
                <AdminRoute exact path="/admin/listsubcategorychild" component={ListSubCategoryChild} menu="SUB_CATEGORY_CHILD" action="READ"/> 


                 <AdminRoute exact path="/admin/addproduct" component={AddProduct} menu="PRODUCTS" action="CREATE"/>
                <AdminRoute exact path="/admin/editproduct" component={EditProduct} menu="PRODUCTS" action="UPDATE"/>
                <AdminRoute exact path="/admin/listproduct" component={ListProduct} menu="PRODUCTS" action="READ"/>  

                <AdminRoute exact path="/admin/addparentattribute" component={AddParentAttributeCategory} menu="PRODUCTS" action="CREATE"/>
                <AdminRoute exact path="/admin/editparentattribute" component={EditParentAttributeCategory} menu="PRODUCTS" action="UPDATE"/>
                <AdminRoute exact path="/admin/listparentattribute" component={ListParentAttributeCategory} menu="PRODUCTS" action="READ"/> 

                 <AdminRoute exact path="/admin/addattribute" component={AddAttributeCategory} menu="PRODUCTS" action="CREATE"/>
                <AdminRoute exact path="/admin/editattribute" component={EditAttributeCategory} menu="PRODUCTS" action="UPDATE"/>
                <AdminRoute exact path="/admin/listattribute" component={ListAttributeCategory} menu="PRODUCTS" action="READ"/> 

                <AdminRoute exact path="/admin/addmapping" component={AddAttributeMapping} menu="PRODUCTS" action="CREATE"/>
                <AdminRoute exact path="/admin/editmapping" component={EditAttributeMapping} menu="PRODUCTS" action="UPDATE"/>
                <AdminRoute exact path="/admin/listmapping" component={ListAttributeMapping} menu="PRODUCTS" action="READ"/>   

                 <AdminRoute exact path="/admin/addsub" component={AddProductSub} menu="PRODUCTS" action="CREATE"/>
                <AdminRoute exact path="/admin/editsub" component={EditProductSub} menu="PRODUCTS" action="UPDATE"/>
                <AdminRoute exact path="/admin/listsub" component={ListProductSub} menu="PRODUCTS" action="READ"/>   
                <AdminRoute exact path="/admin/quickbook/callback" component={QuickbookCallback} menu="PRODUCTS" action="READ"/>           

                <AdminRoute exact path="/admin/sitesetting" component={AddSetting} menu="SETTING" action="READ"/>
                <AdminRoute exact path="/admin/updatepassword" component={UpdatePassword} />
                <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} menu="DASHBOARD" action="READ"/>

                {/* //Users PrivateRoute */}
                <AdminRoute exact path="/admin/adduser" component={AddUsers} menu="USER" action="CREATE"/>
               <AdminRoute exact path="/admin/edituser" component={EditUsers} menu="USER" action="UPDATE"/>
               <AdminRoute exact path="/admin/listuser" component={ListUsers} menu="USER" action="READ"/>


               <AdminRoute exact path="/admin/addorderstatus" component={AddOrderStatus} menu="ORDER_STATUS" action="CREATE"/>
               <AdminRoute exact path="/admin/editorderstatus" component={EditOrderStatus} menu="ORDER_STATUS" action="UPDATE"/>
               <AdminRoute exact path="/admin/listorderstatus" component={ListOrderStatus} menu="ORDER_STATUS" action="READ"/>

               <AdminRoute exact path="/admin/addteam" component={AddTeam} menu="TEAM" action="CREATE"/>
               <AdminRoute exact path="/admin/editteam" component={EditTeam} menu="TEAM" action="UPDATE"/>
               <AdminRoute exact path="/admin/listteam" component={ListTeam} menu="TEAM" action="READ"/>
               
               <AdminRoute exact path="/admin/addblog" component={AddBlog}  menu="BLOG" action="CREATE"/>
               <AdminRoute exact path="/admin/editblog" component={EditBlog}  menu="BLOG" action="UPDATE"/>
               <AdminRoute exact path="/admin/listblog" component={ListBlog}  menu="BLOG" action="READ"/>

               <AdminRoute exact path="/admin/listorder" component={ListOrder} menu="ORDER" action="READ"/>
               <AdminRoute exact path="/admin/orderdetail" component={ListOrderDetail} menu="ORDER" action="READ"/>

                 <AdminRoute exact path="/admin/addshipping" component={AddShipping} menu="SHIPPING" action="CREATE"/>
                <AdminRoute exact path="/admin/editshipping" component={EditShipping} menu="SHIPPING" action="UPDATE"/>
                <AdminRoute exact path="/admin/listshipping" component={ListShipping} menu="SHIPPING" action="READ"/> 

                <AdminRoute exact path="/admin/addcoupon" component={AddCoupon} menu="COUPON" action="CREATE"/>
                <AdminRoute exact path="/admin/editcoupon" component={EditCoupon} menu="COUPON" action="UPDATE"/>
                <AdminRoute exact path="/admin/listcoupon" component={ListCoupon} menu="COUPON" action="READ"/>  

                <AdminRoute exact path="/admin/addrole" component={AddRole} menu="ROLE" action="CREATE"/>
                <AdminRoute exact path="/admin/editrole" component={EditRole} menu="ROLE" action="UPDATE"/>
                <AdminRoute exact path="/admin/listrole" component={ListRole} menu="ROLE" action="READ"/>  
 

                <AdminRoute exact path="/admin/addadmin" component={AddAdmins} menu="ADMIN" action="CREATE"/>
                <AdminRoute exact path="/admin/editadmin" component={EditAdmins} menu="ADMIN" action="UPDATE"/>
                <AdminRoute exact path="/admin/listadmin" component={ListAdmins} menu="ADMIN" action="READ"/>  

  <AdminRoute
                exact
                path='/admin/productpage/:id'
                component={AddProductScreen}
                menu='PRODUCTS'
                action='CREATE'
              />
               <AdminRoute
                exact
                path='/admin/createproduct'
                component={AddProductTempScreeen}
                menu='PRODUCTS'
                action='CREATE'
              />
 <AdminRoute
                exact
                path='/admin/createorder'
                component={CreateOrder}
                menu='ORDER_STATUS'
                action='READ'
              />

               
          </Switch>
        </div>
      </Router>
      </Provider>
    );
  }
}

export default App;
