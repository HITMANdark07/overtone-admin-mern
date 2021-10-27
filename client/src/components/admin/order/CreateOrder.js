import React, { useEffect } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Sidebarmobile from "../../layouts/SidebarMobile";
import Asidebar from "../../layouts/Asidebar";
import Header from "../../layouts/Header";
import HeadeTopbar from "../../layouts/HeaderTopbar";
import SubHeader from "../../layouts/SubHeader";
import Footer from "../../layouts/Footer";
import { listOrder, deleteOrder } from "../../../actions/orderAction";
import { checkPermission } from "../../common/MenuList";
import swal from "sweetalert2";
import SearchInput, { createFilter } from "react-search-input";
import { Link } from "react-router-dom";

import OrderCreateComponent from "./OrderCreateComponent.jsx";

// import "/css/create-order.css";

const CreateOrder = () => {
  return (
    <div>
      <Sidebarmobile />
      <div className='kt-grid kt-grid--hor kt-grid--root'>
        <div className='kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page'>
          {/* begin:: Aside */}
          <Asidebar />
          {/* end:: Aside */}
          <div
            className='kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper'
            id='kt_wrapper'
          >
            {/* begin:: Header */}
            <div
              id='kt_header'
              className='kt-header kt-grid__item  kt-header--fixed '
            >
              {/* begin:: Header Menu */}
              <Header />
              {/* end:: Header Menu */}
              {/* begin:: Header Topbar */}
              <HeadeTopbar />
              {/* end:: Header Topbar */}
            </div>
            {/* end:: Header */}
            <div className='kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor'>
              {/* begin:: Subheader */}
              <SubHeader first='Home' second='Create Order' third='' />
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div
                className='kt-content  kt-grid__item kt-grid__item--fluid'
                id='kt_content'
              >
                <div className='kt-portlet'>
                  <div className='kt-portlet__head kt-portlet__head--lg'>
                    <div className='kt-portlet__head-label'>
                      <span className='kt-portlet__head-icon'>
                        <i className='kt-font-brand flaticon2-line-chart' />
                      </span>
                      <h3 className='kt-portlet__head-title'>Create Orders</h3>
                    </div>
                  </div>
                </div>
                <OrderCreateComponent></OrderCreateComponent>
              </div>
              {/* end:: Content */}
            </div>
            {/* begin:: Footer */}
            <Footer />
            {/* end:: Footer */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateOrder;
