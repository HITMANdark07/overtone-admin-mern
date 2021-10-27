import React from 'react';
import {AppSetting} from '../../AppSetting'


function Sidebarmobile() {
  return <div id="kt_header_mobile" className="kt-header-mobile  kt-header-mobile--fixed ">
    <div className="kt-header-mobile__logo">
      <a href="/dashboard">
      <h3 style={{color:'white'}}> {AppSetting.name}</h3>
      </a>
    </div>
    <div className="kt-header-mobile__toolbar">
      <button className="kt-header-mobile__toggler kt-header-mobile__toggler--left" id="kt_aside_mobile_toggler"><span /></button>
      <button className="kt-header-mobile__toggler" id="kt_header_mobile_toggler"><span /></button>
      <button className="kt-header-mobile__topbar-toggler" id="kt_header_mobile_topbar_toggler"><i className="flaticon-more" /></button>
    </div>
  </div>
  {/* end:: Header Mobile */}

  
}

export default Sidebarmobile;
