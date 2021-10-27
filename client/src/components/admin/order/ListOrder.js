import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {listOrder,deleteOrder} from '../../../actions/orderAction'
import {checkPermission} from '../../common/MenuList'
import swal from 'sweetalert2';
import SearchInput, {createFilter} from 'react-search-input';
import { Link } from "react-router-dom";
const KEYS_TO_FILTERS = ['orderNo','status','StatusName'];
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});
var dateFormat = require("dateformat");

class ListOrder extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       searchTerm: '',
  
    }   
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);

  
}
componentDidMount(){
   this.props.listOrder();
  
}

//calls when edit button is clicked
onEditClick(res){
  localStorage.setItem('vieworder',JSON.stringify(res))
  this.props.history.push('orderdetail')
}
//calls when delete button is clicked
onDeleteClick(id){
  const deleteData={
      id:id
  }
  this.props.deleteOrder(deleteData)
}
searchUpdated (term) {
    this.setState({searchTerm: term})
}
componentWillReceiveProps(nextProps){
 
  if(nextProps.order.deleteorder !== this.props.order.deleteorder){
      Toast.fire({
          type: 'success',
          title: 'Order Deleted Successfully',
        }).then(getResult=>{
          this.props.listOrder();
        })
  }

  if(nextProps.errors !== this.props.errors){
      Toast.fire({
          type: 'error',
          title: 'Check all the fields',
        })
      this.setState({errors:nextProps.errors});
  }
}

render() {
  const {listorder,orderloading}=this.props.order;
  console.log("list Order",listorder);
  var tableResult;
  if(listorder==null ||orderloading){
      tableResult=(<tr><td colSpan={8} className="text-center">Loading.....</td></tr>)
  }else{
      if(Object.keys(listorder).length >0){
        var filterData= listorder.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
          tableResult=filterData.map(result=>{
                  return <tr>
                  <td>{result.orderNo}</td>
                  <td>{result.orderType}</td>
                  <td>{result.paymentMethod}</td>
                  <td>{result.finalAmount}</td>
          <td>{checkPermission(this.props.auth,"ORDER","READ")&&<button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View Order</span></button>}</td>
                  <td>{result.status.StatusName}</td>
                  <td>{result.date}</td>
              </tr>
          })
      }else{
          tableResult=(<tr><td colSpan={8} className="text-center">No Record Found.....</td></tr>)
      }

  }


   return (
      <div>
     <Sidebarmobile/>
      <div className="kt-grid kt-grid--hor kt-grid--root">
        <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page">
          {/* begin:: Aside */}
          <Asidebar/>
          {/* end:: Aside */}
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper" id="kt_wrapper">
            {/* begin:: Header */}
            <div id="kt_header" className="kt-header kt-grid__item  kt-header--fixed ">
              {/* begin:: Header Menu */}
               <Header />
              {/* end:: Header Menu */}
              {/* begin:: Header Topbar */}
             <HeadeTopbar />
              {/* end:: Header Topbar */}
            </div>
            {/* end:: Header */}
            <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor">
              {/* begin:: Subheader */}
              <SubHeader first="Home" second="List Orders" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head kt-portlet__head--lg">
                            <div className="kt-portlet__head-label">
                                <span className="kt-portlet__head-icon">
                                <i className="kt-font-brand flaticon2-line-chart" />
                                </span>
                                <h3 className="kt-portlet__head-title">
                            List Orders
                                </h3>
                            </div>
                             <div
                        className='create_order_btn'
                        // onClick={() => this.onEditClick(result)}
                      >
                        <Link to='/admin/createorder'>Create Order</Link>
                      </div>
                      {/* add here */}
                        </div>
                        <div className="col-sm-12 col-md-12">
                                    <SearchInput  placeholder="Search by Order ID" onChange={this.searchUpdated} className="search-input" />
                        </div>
                        <div className="kt-portlet__body" >
                        {/*begin: Datatable */}
                        <table   className="table table-striped table-bordered table-hover table-checkable">
                            <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Order Type</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                                <th>View Order</th>
                                <th>Order Status</th>
                                <th>Date</th>
                            </tr>
                            </thead>
                            <tbody>
                                  {tableResult}                   
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                <th>Order ID</th>
                                <th>Order Type</th>
                                <th>Payment Method</th>
                                <th>Amount</th>
                                <th>View Order</th>
                                <th>Order Status</th>
                                <th>Date</th>

                                </tr>
                            </tfoot>
                        </table>
                        {/*end: Datatable */}
                        </div>
                    </div>
                
             </div>
              {/* end:: Content */}
            </div>
            {/* begin:: Footer */}
            <Footer/>
            {/* end:: Footer */}
          </div>
        </div>
      </div>
    </div>
    )
  }
}

ListOrder.propTypes ={
    auth: PropTypes.object.isRequired,
    listOrder: PropTypes.func.isRequired,
    deleteOrder: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
  auth : state.auth,
  errors: state.errors,
  order :state.order
});

export default connect(mapStateToProps,{listOrder,deleteOrder})(ListOrder);