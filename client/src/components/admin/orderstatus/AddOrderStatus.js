import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {addOrderStatus} from '../../../actions/orderstatusAction';
import axios from 'axios';
import swal from 'sweetalert2';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AddOrderStatus extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       StatusName:'',
       visibility:'',
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}
componentDidMount(){

}

componentWillReceiveProps(nextProps){
 
    if(nextProps.orderstatus.addorderstatus !== this.props.orderstatus.addorderstatus){
        Toast.fire({
            type: 'success',
            title: 'OrderStatus Added Successfully',
          })
          this.onReset();
    }
    if(nextProps.errors !== this.props.errors){
        Toast.fire({
            type: 'error',
            title: 'Check all the fields',
          })
        this.setState({errors:nextProps.errors});
    }
}


//onchange state value for orderstatus
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
    this.setState({errors:{}})
    e.preventDefault();
    const Data ={
        StatusName   :   this.state.StatusName,
        visibility :   this.state.visibility,
    }
    this.props.addOrderStatus(Data);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        uploadStatus:'',
        StatusName:'',
        visibility:'',
    })
}

render() {
    const {errors} = this.state;
    const {orderstatusloading} = this.props.orderstatus;

      //store list
      const {liststore,storeloading}=this.props.store;

      var optionResult=[];
      if(liststore==null ||storeloading){
          optionResult=(<option value="">Loading...</option>)
      }else{
          if(Object.keys(liststore).length >0){
              optionResult= liststore.map(result=>{
                  return <option value={result._id}>{result.storeName}</option>
              })
          }else{
              optionResult=(<option value="">No Store Found...</option>)
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
              <SubHeader first="Home" second="Add Order Status" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add Order Status
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Order Status Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="StatusName" onChange={this.onChange} value={this.state.StatusName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.StatusName}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Visibility:</label>
                                <div className="col-lg-3">
                                <select  name="visibility" onChange={this.onChange} value={this.state.visibility} className="form-control" placeholder="" >
                                            <option value="">Select Visibility</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                </select>
                                        <span className="form-text text-danger">{errors.visibility}</span>
                                </div>
                            </div>
                                             
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${orderstatusloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

AddOrderStatus.propTypes ={
    auth: PropTypes.object.isRequired,
    addOrderStatus: PropTypes.func.isRequired,
  
}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    orderstatus :state.orderstatus,
    store:state.store

});
  
export default connect(mapStateToProps,{addOrderStatus})(AddOrderStatus);