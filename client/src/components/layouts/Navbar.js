import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';


class Navbar extends Component {
 
////////////////////////////////REGISTER  SUBMIT END//////////////////////////////////////////////////////
onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }

  render() {
    const {isAuthenticated} = this.props.auth;
    const {user}            = this.props.auth;
    console.log("user",user);
    const authLinks = (
      <div>
      <aside className="main-sidebar fixed offcanvas b-r sidebar-tabs" data-toggle="offcanvas">
        <div className="sidebar">
          <div className="d-flex hv-100 align-items-stretch">
            <div className="indigo text-white">
              <div className="nav mt-5 pt-5 flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
                <a className="nav-link" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true"><i className="icon-inbox2" /></a>
                <a className="nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false"><i className="icon-add" /></a>
                <a className="nav-link blink skin_handle" href="#"><i className="icon-lightbulb_outline" /></a>
                <a className="nav-link" id="v-pills-messages-tab" href="#"><i className="icon-message" /></a>
                <a className="nav-link" id="v-pills-settings-tab" href="#"><i className="icon-settings" /></a>
                <a href>
                  <figure className="avatar">
                    <img src="assets/img/dummy/u3.png" alt />
                    <span className="avatar-badge online" />
                  </figure>
                </a>
              </div>
            </div>
            <div className="tab-content flex-grow-1" id="v-pills-tabContent">
              <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
                <div className="relative brand-wrapper sticky b-b">
                  <div className="d-flex justify-content-between align-items-center p-3">
                    <div className="text-xs-center">
                      <span className="font-weight-lighter s-18">Menu</span>
                    </div>
                    <div className="badge badge-danger r-0">New Panel</div>
                  </div>
                </div>
                <ul className="sidebar-menu">
                  <li className="treeview">
                    <a href="index.html">
                      <i className="icon icon-sailing-boat-water s-24" /> <span>Dashboard</span>
                    </a>
                  </li>
                  <li className="treeview"><a href="#">
                      <i className="icon icon icon-package s-24" />
                      <span>Vendor</span>
                      <span className="badge r-3 badge-primary pull-right">4</span>
                    </a>
                    <ul className="treeview-menu">
                      <li><a href="/viewvendor"><i className="icon icon-circle-o" />All
                          Vendors</a>
                      </li>
                      <li><a href="/vendorregister"><i className="icon icon-add" />Add
                          New </a>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview"><a href="#">
                      <i className="icon icon icon-package s-24" />
                      <span>Delivery Boy</span>
                      <span className="badge r-3 badge-primary pull-right">4</span>
                    </a>
                    <ul className="treeview-menu">
                      <li><a href="/deliveryboyview"><i className="icon icon-circle-o" />All
                          DeliveryBoy</a>
                      </li>
                      <li><a href="/deliveryboy"><i className="icon icon-add" />Add
                          New </a>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview"><a href="#">
                      <i className="icon icon icon-package s-24" />
                      <span>Promotions</span>
                      <span className="badge r-3 badge-primary pull-right">4</span>
                    </a>
                    <ul className="treeview-menu">
                    <li><a href="/addcategory"><i className="icon icon-circle-o" />Category</a>
                      </li>
                      <li><a href="/addsubcategory"><i className="icon icon-circle-o" />Sub-Category</a>
                      </li>
                      <li><a href=""><i className="icon icon-add" />Deal of the day</a>
                      </li>
                      <li><a href=""><i className="icon icon-add" />Popular Near You</a>
                      </li>
                      <li><a href="/addarea"><i className="icon icon-add" />Add Area</a>
                      </li>
                    </ul>
                  </li>
                  {/* <li className="treeview"><a href="#">
                      <i className="icon icon icon-package s-24" />
                      <span>Products/Categories</span>
                      <span className="badge r-3 badge-primary pull-right">4</span>
                    </a>
                    <ul className="treeview-menu">
                      <li><a href="/"><i className="icon icon-circle-o" />Deal of the Day</a>
                      </li>
                      <li><a href="panel-page-products-create.html"><i className="icon icon-add" /></a>
                      </li>
                    </ul>
                  </li> */}
                  {/* <li className="treeview"><a href="#"><i className="icon icon-account_box s-24" />Shops<i className=" icon-angle-left  pull-right" /></a>
                    <ul className="treeview-menu">
                      <li><a href="panel-page-users.html"><i className="icon icon-circle-o" />All Shops</a>
                      </li>
                      <li><a href="panel-page-users-create.html"><i className="icon icon-add" />Add Shops</a>
                      </li>
                    </ul>
                  </li>
                  <li className="treeview"><a href="#"><i className="icon icon-account_box s-24" />Products<i className=" icon-angle-left  pull-right" /></a>
                    <ul className="treeview-menu">
                      <li><a href="panel-page-users.html"><i className="icon icon-circle-o" />All Products</a>
                      </li>
                      <li><a href="panel-page-users-create.html"><i className="icon icon-add" />Add Products</a>
                      </li>
                    </ul>
                  </li> */}
                </ul>
              </div>
              <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">
                <div className="relative brand-wrapper sticky b-b p-3">
                  <form>
                    <div className="form-group input-group-sm has-right-icon">
                      <input className="form-control form-control-sm light r-30" placeholder="Search" type="text" />
                      <i className="icon-search" />
                    </div>
                  </form>
                </div>
                            </div>
            </div>
          </div>
        </div>
      </aside>
      <div className="has-sidebar-left">
        <div className="pos-f-t">
          <div className="collapse" id="navbarToggleExternalContent">
            <div className="bg-dark pt-2 pb-2 pl-4 pr-2">
              <div className="search-bar">
                <input className="transparent s-24 text-white b-0 font-weight-lighter w-128 height-50" type="text" placeholder="start typing..." />
              </div>
              <a href="#" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" className="paper-nav-toggle paper-nav-white active "><i /></a>
            </div>
          </div>
        </div>
      </div>
      <a href="#" data-toggle="push-menu" className="paper-nav-toggle left ml-2 fixed">
        <i />
      </a>
      <div className="has-sidebar-left has-sidebar-tabs">
        {/*navbar*/}
        <div className="sticky">
          <div className="navbar navbar-expand d-flex justify-content-between bd-navbar white shadow">
            <div className="relative">
              <div className="d-flex">
                <div className="d-none d-md-block">
                  <h1 className="nav-title">Dashboard</h1>
                </div>
              </div>
            </div>
            {/*Top Menu Start */}
            <div className="navbar-custom-menu">
              <ul className="nav navbar-nav">              
                {/* User Account*/}
                <li className="dropdown custom-dropdown user user-menu ">
                  <a href="#" className="nav-link" data-toggle="dropdown">
                    <img src="assets/img/dummy/u8.png" className="user-image" alt="User Image" />
                    <i className="icon-more_vert " />
                  </a>
                  <div className="dropdown-menu p-4 dropdown-menu-right">
                    <div className="row box justify-content-between my-4">
                      <div className="col">
                        <a onClick={this.onLogoutClick.bind(this)} href="#">
                          <i className="icon-apps purple lighten-2 avatar  r-5" />
                          <div className="pt-1">Logout</div>
                        </a>
                      </div>
                      {/* <div className="col"><a href="#">
                          <i className="icon-beach_access pink lighten-1 avatar  r-5" />
                          <div className="pt-1">Profile</div>
                        </a></div>
                      <div className="col">
                        <a href="#">
                          <i className="icon-perm_data_setting indigo lighten-2 avatar  r-5" />
                          <div className="pt-1">Settings</div>
                        </a>
                      </div>
                    </div>
                    <div className="row box justify-content-between my-4">
                      <div className="col">
                        <a href="#">
                          <i className="icon-star light-green lighten-1 avatar  r-5" />
                          <div className="pt-1">Favourites</div>
                        </a>
                      </div>
                      <div className="col">
                        <a href="#">
                          <i className="icon-save2 orange accent-1 avatar  r-5" />
                          <div className="pt-1">Saved</div>
                        </a>
                      </div>
                      <div className="col">
                        <a href="#">
                          <i className="icon-perm_data_setting grey darken-3 avatar  r-5" />
                          <div className="pt-1">Settings</div>
                        </a>
                      </div>
                    </div>
                    <hr />
                    <div className="row box justify-content-between my-4">
                      <div className="col">
                        <a href="#">
                          <i className="icon-apps purple lighten-2 avatar  r-5" />
                          <div className="pt-1">Apps</div>
                        </a>
                      </div>
                      <div className="col"><a href="#">
                          <i className="icon-beach_access pink lighten-1 avatar  r-5" />
                          <div className="pt-1">Profile</div>
                        </a></div>
                      <div className="col">
                        <a href="#">
                          <i className="icon-perm_data_setting indigo lighten-2 avatar  r-5" />
                          <div className="pt-1">Settings</div>
                        </a>
                      </div> */}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*#navbar*/}
      </div></div> 
      
    ); 

    
    return (
      <div>
   {isAuthenticated  ? authLinks: null}
   
   </div>
    )
  }
}


Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
   auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{logoutUser})(Navbar);
