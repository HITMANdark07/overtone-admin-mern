import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {AppSetting} from '../../AppSetting'

class Footer extends Component {
  constructor(){
    super();
    this.state={
       errors:{}  
    }

}


render() {
  const {errors} = this.state;

  const {isAuthenticated} = this.props.auth;
  return (
    <div className="kt-footer kt-grid__item kt-grid kt-grid--desktop kt-grid--ver-desktop">
    <div className="kt-footer__copyright">
      2020&nbsp;©&nbsp;<a href={AppSetting.url} target="_blank" className="kt-link">{AppSetting.name}</a>
    </div>
    <div className="kt-footer__menu">
      <a href={AppSetting.url} target="_blank" className="kt-footer__menu-link kt-link">About</a>
      <a href={AppSetting.url} target="_blank" className="kt-footer__menu-link kt-link">Team</a>
      <a href={AppSetting.url} target="_blank" className="kt-footer__menu-link kt-link">Contact</a>
    </div>
  </div>
   
 
  )
 }
}

Footer.propTypes = {

  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{})(Footer);