import React, { Component } from 'react'
import {AppSetting} from '../../AppSetting'

export default class AuthLeft extends Component {
    render() {
        var currentDate = new Date();
        var currentYear = currentDate.getFullYear();
        return (
          
      
            <div className="kt-grid__item kt-grid__item--order-tablet-and-mobile-2 kt-grid kt-grid--hor kt-login__aside" style={{backgroundImage: 'linear-gradient(rgba(0,0,0,0.8),rgba(0,0,0,0.8)),url(/images/login-bg.png)',backgroundPosition:"left"}}>
              <div className="kt-grid__item">
                <a href="#" className="kt-login__logo">
                <img src="/images/logo1.png" />
                </a>
              </div>
              <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver">
                <div className="kt-grid__item kt-grid__item--middle">
                  <h3 className="kt-login__title">Welcome to {AppSetting.name} ADMIN!</h3>
                  <h4 className="kt-login__subtitle">CMS for Managing Products and Orders.</h4>
                </div>
              </div>
              <div className="kt-grid__item">
                <div className="kt-login__info">
                  <div className="kt-login__copyright">
                    © {currentYear} {AppSetting.name}
                  </div>
                  <div className="kt-login__menu">
                    <a href="http://overtoneacoustics.com/" className="kt-link">Main Website</a>
                    <a href="#" className="kt-link">Legal</a>
                    <a href="#" className="kt-link">Contact</a>
                  </div>
                </div>
              </div>
            </div>
          
        )
    }
}
