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
import {listOrderStatus} from '../../../actions/orderstatusAction'
import swal from 'sweetalert2';
import SearchInput, {createFilter} from 'react-search-input';
import Axios from 'axios';
const KEYS_TO_FILTERS = ['photoUrl','orderName','isEnabled',];
var dateFormat = require("dateformat");
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});


class ListOrder extends Component {
  constructor(){
    super();
    this.state={
      name:"",
      email:"",
      mobile:"",
      password:"",
      password2:"",
      orderList:[],
      orderLoading:false,
      orderData:{},
      orderID:"",
      status:""
  
    }   


  
}
componentDidMount () {
  const orderData=JSON.parse(localStorage.getItem('vieworder'))
  console.log("orderData",orderData)

  this.setState({
      orderData:orderData,
      orderID:orderData._id,
      status:orderData.status ?orderData.status._id:null
  },()=>{
      this.getOrderMeta();
  })
  this.props.listOrderStatus();     
}
onChange(e){
  this.setState({[e.target.name]:e.target.value})

  Axios.post('/api/order/orderupdate',{orderID:this.state.orderID,status:e.target.value})
  .then(result=>{
      Toast.fire({
        type: 'success',
        title: 'Order Status Updated',
      }).then(getResult=>{
        this.props.history.push('listorder');
      })
  })
  .catch(err=>{
    Toast.fire({
      type: 'error',
      title: 'Error Occured Try Again',
    })
  })
}      

getOrderMeta(){
  console.log("his.state.orderID",this.state.orderID)
  this.setState({
      orderLoading:true
  })
  Axios.post('/api/order/getordermetaall',{orderID:this.state.orderID})
  .then(result=>{
          this.setState({
              orderList:result.data,
              orderLoading:false
          })
  })
  .catch(err=>{
      this.setState({
          orderList:[],
          orderLoading:false
      })
  })
}

render() {
  const {orderList,orderLoading,orderData} = this.state;

  var shippingAddress=orderData.shippingAddress?JSON.parse(orderData.shippingAddress) :{}
  
  var OrderContent
  if(orderLoading){
      OrderContent=(<tr><td colSpan={5} class="text-center">Loading</td></tr>) 
  }else{
      if(orderList.length>0){
          OrderContent=orderList.map(result=>{
            var arributeParse=result.selectedAttribute ? JSON.parse(result.selectedAttribute):[];
              return  <tr>
              <td>
                <span className="text-inverse">{result.product.name}</span><br />
               
              </td>
              
              <td>
                 <ul>
                        {arributeParse.map(res=>{
                          return  <li>{res.key} - {res.value} {parseFloat(res.price) > 0 && `[+ $ ${res.price}]` } </li>
                        })}
                  
                      </ul>
                </td>
                <td className="text-center">{result.sku}</td>
              <td className="text-center">{result.quantity}</td>
              <td className="text-center">{"$"} {result.price}</td>
              <td className="text-right">{parseInt(result.quantity) * parseInt(result.price)}</td>
            </tr>
          })
      }else{
          OrderContent=(<tr><td colSpan={5} class="text-center">No Orders Found</td></tr>) 
      }
  }

  const {listorderstatus,orderstatusloading}=this.props.orderstatus;
  var optionResult=[];
  if(listorderstatus==null ||orderstatusloading){
      optionResult=(<option value="">Loading...</option>)
  }else{
      if(Object.keys(listorderstatus).length >0){
          optionResult= listorderstatus.map(result=>{
              return <option value={result._id}>{result.StatusName}</option>
          })
      }else{
          optionResult=(<option value="">No Status Found...</option>)
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
                            View Order Detail 
                                </h3>
                            </div>
                              <div className="kt-portlet__head-label">
                                  <span className="kt-portlet__head-icon">
                                  <i className="kt-font-brand flaticon2-line-chart" />
                                  </span>
                                  
                                      <select  name="status" onChange={(e)=>this.onChange(e)} value={this.state.status } className="form-control" placeholder="" >
                                                  <option value="">Update Status</option>
                                                  {optionResult}
                                      </select>
                                  
                              </div>
                        </div>
                        <div className="container">
        <div className="col-md-12">
          <div className="invoice">
            {/* begin invoice-company */}
           
            {/* end invoice-company */}
            {/* begin invoice-header */}
            <div className="invoice-header">
           
              <div className="invoice-to">
                <small>Shipping To</small>
                <address className="m-t-5 m-b-5">
                  <strong className="text-inverse">{shippingAddress.firstName}</strong><br />
                  {shippingAddress.address}
                  {shippingAddress.city}<br />
                  {shippingAddress.email}<br />
                  {shippingAddress.phone}<br />
                  
                </address>
              </div>
              <div className="invoice-date">
                <small>Invoice</small>
                <div className="date text-inverse m-t-5">{orderData.date ? dateFormat(orderData.date, "fullDate"):null}</div>
                <div className="invoice-detail">
                  #{orderData.orderNo}<br />
                 
                </div>
              </div>
            </div>
            {/* end invoice-header */}
            {/* begin invoice-content */}
            <div className="invoice-content">
              {/* begin table-responsive */}
              <div className="table-responsive">
                <table className="table table-invoice">
                  <thead>
                    <tr>
                      <th>PRODUCT</th>
                      <th className="text-center" width="30%">ATTRIBUTE</th>
                      <th className="text-center" width="10%">SKU</th>

                      {/* <th className="text-center" width="10%">SIZE</th>
                      <th className="text-center" width="10%">ORDER TYPE</th> */}
                      <th className="text-center" width="10%">QUANTITY</th>

                      <th className="text-center" width="10%">AMOUNT</th>
                      <th className="text-right" width="20%">LINE TOTAL</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                {OrderContent}
                  </tbody>
                </table>
              </div>
              {/* end table-responsive */}
              {/* begin invoice-price */}
              <div className="invoice-price">
                <div className="invoice-price-left">
                  <div className="invoice-price-row">
                    <div className="sub-price">
                      <small>SUBTOTAL</small>
                      <span className="text-inverse">{"$"} {parseInt(orderData.totalAmount)-parseInt(orderData.shippingAmount)}</span>
                    </div>
                    <div className="sub-price">
                      <i className="fa fa-plus text-muted" />
                    </div>
                    <div className="sub-price">
                      <small>Shipping Amount</small>
                      <span className="text-inverse">{"$"} {orderData.shippingAmount}</span>
                    </div>
                    <div className="sub-price">
                      <i className="fa fa-minus text-muted" />
                    </div>
                    <div className="sub-price">
                      <small>Discount Amount</small>
                      <span className="text-inverse">{"$"} {orderData.couponAmount}</span>
                    </div>
                   
                  
                  </div>
                </div>
                <div className="invoice-price-right">
                  <small>TOTAL</small> <span className="f-w-600">{"$"} {orderData.finalAmount}</span>
                </div>
              </div>
              {/* end invoice-price */}
            </div>
            {/* end invoice-content */}
            {/* begin invoice-note */}
            {/* end invoice-note */}
            {/* begin invoice-footer */}
         
            {/* end invoice-footer */}
          </div>
        </div>
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
  order :state.order,
  orderstatus:state.orderstatus,
});

export default connect(mapStateToProps,{listOrder,deleteOrder,listOrderStatus})(ListOrder);