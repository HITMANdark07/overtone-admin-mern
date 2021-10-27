import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {logoutUser} from '../../actions/authAction';
import axios from 'axios';
import appendScript from '../../utils/appendScript'
import removeScript from '../../utils/removeScript'

class HeaderTopbar extends Component {
  onLogoutClick(e){
    e.preventDefault();
    this.props.logoutUser();
  }
  componentDidMount () {
    // appendScript("/assets/vendors/general/jquery/dist/jquery.js");
    // appendScript("/assets/vendors/general/popper.js/dist/umd/popper.js");
    // appendScript("/assets/vendors/general/sticky-js/dist/sticky.min.js");
    // appendScript("/assets/vendors/general/bootstrap/dist/js/bootstrap.min.js");
    // appendScript("/assets/vendors/general/perfect-scrollbar/dist/perfect-scrollbar.js");
    // appendScript("/assets/demo/default/base/scripts.bundle.js");
    // appendScript("/assets/app/bundle/app.bundle.js");
    appendScript("/js/jquery.js");
    appendScript("/js/popper.js");
    appendScript("/js/sticky.min.js");
    appendScript("/js/bootstrap.min.js");
    appendScript("/js/perfect-scrollbar.js");
    appendScript("/js/scripts.bundle.js");
    appendScript("/js/app.bundle.js");
}
// componentDidUnmount () {
//   removeScript("/assets/vendors/general/jquery/dist/jquery.js");
//   removeScript("/assets/vendors/general/perfect-scrollbar/dist/perfect-scrollbar.js");
//   removeScript("/assets/demo/default/base/scripts.bundle.js");
//   removeScript("/assets/app/bundle/app.bundle.js");
// }

  render(){
    const {user}=this.props.auth;
  return  <div className="kt-header__topbar">

  
 


  {/*begin: User Bar */}
  <div className="kt-header__topbar-item kt-header__topbar-item--user">
    <div className="kt-header__topbar-wrapper" data-toggle="dropdown" data-offset="0px,0px">
      <div className="kt-header__topbar-user">
        <span className="kt-header__topbar-welcome kt-hidden-mobile">Hi,</span>
        <span className="kt-header__topbar-username kt-hidden-mobile">{user.name}</span>
        <img className="kt-hidden" alt="Pic" src="../assets/media/users/300_25.jpg" />
        {/*use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) */}
        <div className="kt-notification__custom">
          <button  onClick={this.onLogoutClick.bind(this)}   className="btn btn-brand btn-sm btn-bold text-white">Sign Out</button>
        </div>
      </div>
    </div>
    <div className="dropdown-menu dropdown-menu-fit dropdown-menu-right dropdown-menu-anim dropdown-menu-top-unround dropdown-menu-xl">
      {/*begin: Head */}
      <div className="kt-user-card kt-user-card--skin-dark kt-notification-item-padding-x" style={{backgroundImage: 'url(../assets/media/misc/bg-1.jpg)'}}>
        <div className="kt-user-card__avatar">
          <img className="kt-hidden" alt="Pic" src="../assets/media/users/300_25.jpg" />
          {/*use below badge element instead the user avatar to display username's first letter(remove kt-hidden class to display it) */}
          <span className="kt-badge kt-badge--lg kt-badge--rounded kt-badge--bold kt-font-success">M</span>
        </div>
        <div className="kt-user-card__name">
        {user.name}
        </div>
        <div className="kt-notification__custom">
          <a  onClick={this.onLogoutClick.bind(this)} href="javascript:void(0);" target="_blank" className="btn btn-label-brand btn-sm btn-bold text-white">Sign Out</a>
        </div>
      </div>
      {/*end: Head */}
      {/*begin: Navigation */}
      {/* <div className="kt-notification">
       
       
      </div> */}
      {/*end: Navigation */}
    </div>
  </div>
  {/*end: User Bar */}
</div>
  } 
}


HeaderTopbar.propTypes ={
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
  auth : state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps,{logoutUser})(HeaderTopbar);
