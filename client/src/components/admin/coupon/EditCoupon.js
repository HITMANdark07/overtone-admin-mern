import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editCoupon} from '../../../actions/couponAction';

import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditCoupon extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       _id:'',
       couponCode:'',
       type:'',
       value:'',
       validFrom:'',
       validTo:'',
       isEnabled:'',
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}

//set all the values to input fields
componentDidMount(){
  
    var editResult={}
    if(!localStorage.editcoupon){
        this.props.history.push('/admin/listcoupon')

    }else{
        editResult=JSON.parse(localStorage.getItem('editcoupon'))
    }
    this.setState({
        _id:editResult._id,
        couponCode   :   editResult.couponCode,
        type :   editResult.type,
        value :   editResult.value,
        validFrom:   editResult.validFrom,  
        validTo:editResult.validTo, 
        isEnabled:editResult.isEnabled, 
    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.coupon.editcoupon !== this.props.coupon.editcoupon){
        Toast.fire({
            type: 'success',
            title: 'Coupon Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/listcoupon');
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

//onchange state value for coupon
onChange(e){
    this.setState({[e.target.name]:e.target.value}) 
}

//for upload image
uploadImage(e){
    var self=this;
    const data = new FormData();
    data.append('file', e.target.files[0]);
    data.append('filename',e.target.files[0].name);
    axios.post('/upload', data)
    .then(function (response) {
        self.setState({
            photoUrl:response.data.file,
            uploadStatus:'Uploaded SuccessFully'
        })
    })
    .catch(function (error) {
    console.log(error);
    });
}
//submit data to server
onSubmit(e){
    e.preventDefault();
    const couponData ={
        couponCode   :   this.state.couponCode,
        type :   this.state.type,
        value :   this.state.value,
        validFrom:   this.state.validFrom, 
        validTo:   this.state.validTo, 
        isEnabled:   this.state.isEnabled, 
        _id:this.state._id
    }
    this.props.editCoupon(couponData);
}
//Reset all statevalues
onReset(){
    this.setState({
       errors:{},
       couponCode:'',
       type:'',
       value:'',
       validFrom:'',
       validTo:'',
       isEnabled:'',
    })
}

render() {
    const {errors} = this.state;
    const {couponloading} = this.props.coupon;



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
              <SubHeader first="Home" second="Edit Coupon" third="Edit Coupon"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Edit Coupon
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                          
                                <label className="col-lg-2 col-form-label">Coupon Code:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="couponCode" onChange={this.onChange} value={this.state.couponCode} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.couponCode}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Coupon Type:</label>
                                <div className="col-lg-3">
                                <select  name="type" onChange={this.onChange} value={this.state.type} className="form-control" placeholder="" >
                                            <option value="">Select</option>
                                            <option value="percent">Percent</option>
                                            <option value="amount">Flat Amount</option>
                                </select>
                                        <span className="form-text text-danger">{errors.type}</span>
                                </div>
                               
                            </div>

                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">{this.state.type} Value:</label>
                                <div className="col-lg-3">
                                    <div className="kt-input-icon">
                                    <input type="text" name="value" onChange={this.onChange} value={this.state.value} className="form-control" placeholder="" />
                                    <span className="form-text text-danger">{errors.value}</span>
                                    </div>
                                  
                                </div>
                                <label className="col-lg-2 col-form-label">Valid From:</label>
                                <div className="col-lg-3">
                                    <div className="kt-input-icon">
                                    <input type="date" name="validFrom" onChange={this.onChange} value={this.state.validFrom} className="form-control" placeholder="" />
                                    <span className="form-text text-danger">{errors.validFrom}</span>
                                    </div>
                                  
                                </div>
                            </div>  
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Valid To:</label>
                                    <div className="col-lg-3">
                                        <div className="kt-input-icon">
                                        <input type="date" name="validTo" onChange={this.onChange} value={this.state.validTo} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.validTo}</span>
                                        </div>
                                    
                                    </div>
                                    <label className="col-lg-2 col-form-label">isEnabled:</label>
                                    <div className="col-lg-3">
                                    <select  name="isEnabled" onChange={this.onChange} value={this.state.isEnabled} className="form-control" placeholder="" >
                                                <option value="">Select isEnabled</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                    </select>
                                            <span className="form-text text-danger">{errors.isEnabled}</span>
                                    </div>

                            </div>                       
                           
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${couponloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
                                <button  type="button" onClick={this.onReset} className="btn btn-secondary">Cancel</button>
                            </div>
                            <div className="col-lg-10" />
                                
                            </div>
                            </div>
                        </div>
                    </form>
                    {/*end::Form*/}
                </div>
                
                {/*end::Portlet*/}

                {/*end::Portlet datatable*/}
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

EditCoupon.propTypes ={
  auth: PropTypes.object.isRequired,
  editCoupon: PropTypes.func.isRequired,
 
}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    coupon :state.coupon,
    store:state.store
});

export default connect(mapStateToProps,{editCoupon})(EditCoupon);