import React,{ Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {checkPermission} from '../common/MenuList'
import {AppSetting} from '../../AppSetting'
class Asidebar extends Component {
  constructor(){
    super();
    this.state={
       errors:{}  
    }

}

render() {
  const {errors} = this.state;
  const {isAuthenticated,user} = this.props.auth;
  const {permissionList} =user;
console.log("res",checkPermission(this.props.auth,"DASHBOARD","READ"))

    return <div>
    <button className="kt-aside-close " id="kt_aside_close_btn"><i className="la la-close" /></button>
          <div className="kt-aside  kt-aside--fixed  kt-grid__item kt-grid kt-grid--desktop kt-grid--hor-desktop" id="kt_aside">
            {/* begin:: Aside */}
            <div className="kt-aside__brand kt-grid__item " id="kt_aside_brand">
              <div className="kt-aside__brand-logo">
                <Link to="/admin/dashboard">
                  {/* <img alt="Logo" src="/images/logo-21.png"  width={80} align="center"/> */}
                 <h3 style={{color:'white',textAlign:'center'}}> {AppSetting.name}</h3>
                </Link>
              </div>
            </div>
            {/* end:: Aside */}
            {/* begin:: Aside Menu */}
            <div className="kt-aside-menu-wrapper kt-grid__item kt-grid__item--fluid" id="kt_aside_menu_wrapper">
              <div id="kt_aside_menu" className="kt-aside-menu " data-ktmenu-vertical={1} data-ktmenu-scroll={1} data-ktmenu-dropdown-timeout={500}>
                <ul className="kt-menu__nav ">
                  {checkPermission(this.props.auth,"DASHBOARD","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/dashboard" className="kt-menu__link "><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <polygon id="Bound" points="0 0 24 0 24 24 0 24" />
                            <path d="M12.9336061,16.072447 L19.36,10.9564761 L19.5181585,10.8312381 C20.1676248,10.3169571 20.2772143,9.3735535 19.7629333,8.72408713 C19.6917232,8.63415859 19.6104327,8.55269514 19.5206557,8.48129411 L12.9336854,3.24257445 C12.3871201,2.80788259 11.6128799,2.80788259 11.0663146,3.24257445 L4.47482784,8.48488609 C3.82645598,9.00054628 3.71887192,9.94418071 4.23453211,10.5925526 C4.30500305,10.6811601 4.38527899,10.7615046 4.47382636,10.8320511 L4.63,10.9564761 L11.0659024,16.0730648 C11.6126744,16.5077525 12.3871218,16.5074963 12.9336061,16.072447 Z" id="Shape" fill="#000000" fillRule="nonzero" />
                            <path d="M11.0563554,18.6706981 L5.33593024,14.122919 C4.94553994,13.8125559 4.37746707,13.8774308 4.06710397,14.2678211 C4.06471678,14.2708238 4.06234874,14.2738418 4.06,14.2768747 L4.06,14.2768747 C3.75257288,14.6738539 3.82516916,15.244888 4.22214834,15.5523151 C4.22358765,15.5534297 4.2250303,15.55454 4.22647627,15.555646 L11.0872776,20.8031356 C11.6250734,21.2144692 12.371757,21.2145375 12.909628,20.8033023 L19.7677785,15.559828 C20.1693192,15.2528257 20.2459576,14.6784381 19.9389553,14.2768974 C19.9376429,14.2751809 19.9363245,14.2734691 19.935,14.2717619 L19.935,14.2717619 C19.6266937,13.8743807 19.0546209,13.8021712 18.6572397,14.1104775 C18.654352,14.112718 18.6514778,14.1149757 18.6486172,14.1172508 L12.9235044,18.6705218 C12.377022,19.1051477 11.6029199,19.1052208 11.0563554,18.6706981 Z" id="Path" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Dashboard</span></Link>
                        
                  </li>}
                  <li className="kt-menu__section ">
                    <h4 className="kt-menu__section-text">Users</h4>
                    <i className="kt-menu__section-icon flaticon-more-v2" />
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                            <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" id="Combined-Shape" fill="#000000" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Users</span><i className="kt-menu__ver-arrow la la-angle-right" /></a>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Users</span></span></li>
                        {checkPermission(this.props.auth,"USER","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/adduser" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Users</span></Link></li>}
{checkPermission(this.props.auth,"USER","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listuser" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Users</span></Link></li> }
                    </ul>
                    </div>
                  </li>

                  <li className="kt-menu__section ">
                    <h4 className="kt-menu__section-text">Page Builder</h4>
                    <i className="kt-menu__section-icon flaticon-more-v2" />
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Slider</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Slider</span></span></li>
                        {checkPermission(this.props.auth,"SLIDER","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addslider" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Slider</span></Link></li>}
                        {checkPermission(this.props.auth,"SLIDER","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listslider" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Slider</span></Link></li>}
                      </ul>
                    </div>
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                            <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" id="Combined-Shape" fill="#000000" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Group</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Group</span></span></li>
                        {checkPermission(this.props.auth,"CATEGORY","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addcategory" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Group</span></Link></li>}
                        {checkPermission(this.props.auth,"CATEGORY","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listcategory" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Group</span></Link></li>}
                      </ul>
                    </div>
                  </li>

                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><a href="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Sub-Group</span><i className="kt-menu__ver-arrow la la-angle-right" /></a>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Sub-Group</span></span></li>
                        {checkPermission(this.props.auth,"SUB_CATEGORY","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addsubcategory" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Sub-Group</span></Link></li>}
                        {checkPermission(this.props.auth,"SUB_CATEGORY","READ") && <li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listsubcategory" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Sub-Group</span></Link></li>}
                      </ul>
                    </div>
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                            <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" id="Combined-Shape" fill="#000000" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Sub-Group Child</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Sub-Group Child</span></span></li>
                        {checkPermission(this.props.auth,"SUB_CATEGORY_CHILD","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addsubcategorychild" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Sub-Group Child</span></Link></li>}
                        {checkPermission(this.props.auth,"SUB_CATEGORY_CHILD","READ") && <li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listsubcategorychild" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Sub-Group Child</span></Link></li>}
                      </ul>
                    </div>
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Blog & Case Studies</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Blog & Case Studies</span></span></li>
                        {checkPermission(this.props.auth,"BLOG","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addblog" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Blog & News</span></Link></li>}
                        {checkPermission(this.props.auth,"BLOG","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listblog" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Blog & News</span></Link></li>}
                      </ul>
                    </div>
                  </li>

                 
                  <li className="kt-menu__section ">
                    <h4 className="kt-menu__section-text">Product Management</h4>
                    <i className="kt-menu__section-icon flaticon-more-v2" />
                  </li>
                 

                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                            <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" id="Combined-Shape" fill="#000000" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Products</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Products</span></span></li>
                        {checkPermission(this.props.auth,"PRODUCTS","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addproduct" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Products</span></Link></li>}
                        {checkPermission(this.props.auth,"PRODUCTS","READ") && <li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listproduct" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Products</span></Link></li>}
                      </ul>
                    </div>
                  </li>

                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                            <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" id="Combined-Shape" fill="#000000" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Product Attribute Setup</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Product Attribute Setup</span></span></li>
                        {checkPermission(this.props.auth,"PRODUCTS","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addparentattribute" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Parent Attribute Category</span></Link></li>}
                        {checkPermission(this.props.auth,"PRODUCTS","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addattribute" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Attribute Category</span></Link></li>}
                        
      
                      </ul>
                    </div>
                  </li>

                
                  <li className="kt-menu__section ">
                    <h4 className="kt-menu__section-text">Order  Management</h4>
                    <i className="kt-menu__section-icon flaticon-more-v2" />
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Orders</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Orders</span></span></li>
                        {checkPermission(this.props.auth,"ORDER","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listorder" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Order List</span></Link></li>}
                      </ul>
                    </div>
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M2.56066017,10.6819805 L4.68198052,8.56066017 C5.26776695,7.97487373 6.21751442,7.97487373 6.80330086,8.56066017 L8.9246212,10.6819805 C9.51040764,11.267767 9.51040764,12.2175144 8.9246212,12.8033009 L6.80330086,14.9246212 C6.21751442,15.5104076 5.26776695,15.5104076 4.68198052,14.9246212 L2.56066017,12.8033009 C1.97487373,12.2175144 1.97487373,11.267767 2.56066017,10.6819805 Z M14.5606602,10.6819805 L16.6819805,8.56066017 C17.267767,7.97487373 18.2175144,7.97487373 18.8033009,8.56066017 L20.9246212,10.6819805 C21.5104076,11.267767 21.5104076,12.2175144 20.9246212,12.8033009 L18.8033009,14.9246212 C18.2175144,15.5104076 17.267767,15.5104076 16.6819805,14.9246212 L14.5606602,12.8033009 C13.9748737,12.2175144 13.9748737,11.267767 14.5606602,10.6819805 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                            <path d="M8.56066017,16.6819805 L10.6819805,14.5606602 C11.267767,13.9748737 12.2175144,13.9748737 12.8033009,14.5606602 L14.9246212,16.6819805 C15.5104076,17.267767 15.5104076,18.2175144 14.9246212,18.8033009 L12.8033009,20.9246212 C12.2175144,21.5104076 11.267767,21.5104076 10.6819805,20.9246212 L8.56066017,18.8033009 C7.97487373,18.2175144 7.97487373,17.267767 8.56066017,16.6819805 Z M8.56066017,4.68198052 L10.6819805,2.56066017 C11.267767,1.97487373 12.2175144,1.97487373 12.8033009,2.56066017 L14.9246212,4.68198052 C15.5104076,5.26776695 15.5104076,6.21751442 14.9246212,6.80330086 L12.8033009,8.9246212 C12.2175144,9.51040764 11.267767,9.51040764 10.6819805,8.9246212 L8.56066017,6.80330086 C7.97487373,6.21751442 7.97487373,5.26776695 8.56066017,4.68198052 Z" id="Combined-Shape" fill="#000000" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Order Status</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Order Status</span></span></li>
                        {checkPermission(this.props.auth,"PRODUCTS","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addorderstatus" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Order Status</span></Link></li>}
                        {checkPermission(this.props.auth,"PRODUCTS","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listorderstatus" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Order Status</span></Link></li>}
                      </ul>
                    </div>
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Shipping</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Shipping</span></span></li>
                        {checkPermission(this.props.auth,"SHIPPING","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addshipping" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Shipping</span></Link></li>}
                        {checkPermission(this.props.auth,"SHIPPING","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listshipping" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Shipping</span></Link></li>}
                      </ul>
                    </div>
                  </li>
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Coupon</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Coupon</span></span></li>
                        {checkPermission(this.props.auth,"COUPON","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addcoupon" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Coupon</span></Link></li>}
                        {checkPermission(this.props.auth,"COUPON","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listcoupon" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Coupon</span></Link></li>}
                      </ul>
                    </div>
                  </li>
                  <li className="kt-menu__section ">
                    <h4 className="kt-menu__section-text">Site Setup</h4>
                    <i className="kt-menu__section-icon flaticon-more-v2" />
                  </li>

                  

                   <li className="kt-menu__item  kt-menu__item--submenu  " aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z" id="Path" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Settings</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Settings</span></span></li>
                        {checkPermission(this.props.auth,"SETTING","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/sitesetting" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Site Settings</span></Link></li>}
                        <li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/updatepassword" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Update Password</span></Link></li>
                        
                      </ul>
                    </div>
                  </li> 
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Team</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Team</span></span></li>
                        {checkPermission(this.props.auth,"COUPON","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addteam" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Team</span></Link></li>}
                        {checkPermission(this.props.auth,"COUPON","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listteam" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Team</span></Link></li>}
                      </ul>
                    </div>
                  </li>  
                  {/* Manage Admin*/}
                  <li className="kt-menu__section ">
                    <h4 className="kt-menu__section-text">Manage Admin</h4>
                    <i className="kt-menu__section-icon flaticon-more-v2" />
                  </li>
                   <li className="kt-menu__item  kt-menu__item--submenu  " aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M4,9.67471899 L10.880262,13.6470401 C10.9543486,13.689814 11.0320333,13.7207107 11.1111111,13.740321 L11.1111111,21.4444444 L4.49070127,17.526473 C4.18655139,17.3464765 4,17.0193034 4,16.6658832 L4,9.67471899 Z M20,9.56911707 L20,16.6658832 C20,17.0193034 19.8134486,17.3464765 19.5092987,17.526473 L12.8888889,21.4444444 L12.8888889,13.6728275 C12.9050191,13.6647696 12.9210067,13.6561758 12.9368301,13.6470401 L20,9.56911707 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M4.21611835,7.74669402 C4.30015839,7.64056877 4.40623188,7.55087574 4.5299008,7.48500698 L11.5299008,3.75665466 C11.8237589,3.60013944 12.1762411,3.60013944 12.4700992,3.75665466 L19.4700992,7.48500698 C19.5654307,7.53578262 19.6503066,7.60071528 19.7226939,7.67641889 L12.0479413,12.1074394 C11.9974761,12.1365754 11.9509488,12.1699127 11.9085461,12.2067543 C11.8661433,12.1699127 11.819616,12.1365754 11.7691509,12.1074394 L4.21611835,7.74669402 Z" id="Path" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Role</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Role</span></span></li>
                        {checkPermission(this.props.auth,"ROLE","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addrole" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Role</span></Link></li>}
                         {checkPermission(this.props.auth,"ROLE","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listrole" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Role</span></Link></li>}
                        
                      </ul>
                    </div>
                  </li> 
                  <li className="kt-menu__item  kt-menu__item--submenu" aria-haspopup="true" data-ktmenu-submenu-toggle="hover"><Link to="javascript:;" className="kt-menu__link kt-menu__toggle"><span className="kt-menu__link-icon"><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px" viewBox="0 0 24 24" version="1.1" className="kt-svg-icon">
                          <g stroke="none" strokeWidth={1} fill="none" fillRule="evenodd">
                            <rect id="bound" x={0} y={0} width={24} height={24} />
                            <path d="M7,3 L17,3 C19.209139,3 21,4.790861 21,7 C21,9.209139 19.209139,11 17,11 L7,11 C4.790861,11 3,9.209139 3,7 C3,4.790861 4.790861,3 7,3 Z M7,9 C8.1045695,9 9,8.1045695 9,7 C9,5.8954305 8.1045695,5 7,5 C5.8954305,5 5,5.8954305 5,7 C5,8.1045695 5.8954305,9 7,9 Z" id="Combined-Shape" fill="#000000" />
                            <path d="M7,13 L17,13 C19.209139,13 21,14.790861 21,17 C21,19.209139 19.209139,21 17,21 L7,21 C4.790861,21 3,19.209139 3,17 C3,14.790861 4.790861,13 7,13 Z M17,19 C18.1045695,19 19,18.1045695 19,17 C19,15.8954305 18.1045695,15 17,15 C15.8954305,15 15,15.8954305 15,17 C15,18.1045695 15.8954305,19 17,19 Z" id="Combined-Shape" fill="#000000" opacity="0.3" />
                          </g>
                        </svg></span><span className="kt-menu__link-text">Admins</span><i className="kt-menu__ver-arrow la la-angle-right" /></Link>
                    <div className="kt-menu__submenu "><span className="kt-menu__arrow" />
                      <ul className="kt-menu__subnav">
                        <li className="kt-menu__item  kt-menu__item--parent" aria-haspopup="true"><span className="kt-menu__link"><span className="kt-menu__link-text">Admins</span></span></li>
                        {checkPermission(this.props.auth,"ADMIN","CREATE") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/addadmin" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">Add Admin</span></Link></li>}
                        {checkPermission(this.props.auth,"ADMIN","READ") &&<li className="kt-menu__item " aria-haspopup="true"><Link to="/admin/listadmin" className="kt-menu__link "><i className="kt-menu__link-bullet kt-menu__link-bullet--dot"><span /></i><span className="kt-menu__link-text">List Admin</span></Link></li>}
                      </ul>
                    </div>
                  </li>  
                </ul>
              </div>
            </div>
            {/* end:: Aside Menu */}
          </div>

  </div>
  
  
 

  }
}

Asidebar.propTypes = {

  auth:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{})(Asidebar);
