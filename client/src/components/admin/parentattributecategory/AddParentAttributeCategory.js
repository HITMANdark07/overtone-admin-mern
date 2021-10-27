import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {addParentAttributeCategory} from '../../../actions/parentattributecategoryAction';
import axios from 'axios';
import swal from 'sweetalert2';
import ListParentAttributeCategory from './ListParentAttributeCategory';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AddParentAttributeCategory extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       attributeName:'',
       isEnabled:'',
       storeID:''
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);

}
componentDidMount(){

}

componentWillReceiveProps(nextProps){
 
    if(nextProps.parentattributecategory.addparentattributecategory !== this.props.parentattributecategory.addparentattributecategory){
        Toast.fire({
            type: 'success',
            title: 'Parent Attribute Category Added Successfully',
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


//onchange state value for category
onChange(e){
    this.setState({[e.target.name]:e.target.value})
    
}


//submit data to server
onSubmit(e){
    this.setState({errors:{}})
    e.preventDefault();
    const Data ={  
        attributeName :   this.state.attributeName,
        isEnabled:   this.state.isEnabled,  //visible,hidden
        storeID:this.state.storeID, 
    }
    this.props.addParentAttributeCategory(Data);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        attributeName:'',
        isEnabled:'',
        storeID:''
    })
}

render() {
    const {errors} = this.state;
    const {parentattributecategoryloading} = this.props.parentattributecategory;
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
              <SubHeader first="Home" second="Add Parent Attribute Category" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add Parent Attribute Category
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Attribute Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="attributeName" onChange={this.onChange} value={this.state.attributeName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.attributeName}</span>
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
                                <button type="submit" className={`btn btn-success ${parentattributecategoryloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

             <ListParentAttributeCategory history={this.props.history}/>
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

AddParentAttributeCategory.propTypes ={
    auth: PropTypes.object.isRequired,
    addParentAttributeCategory: PropTypes.func.isRequired,
  
}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    parentattributecategory :state.parentattributecategory,
    store:state.store

});
  
export default connect(mapStateToProps,{addParentAttributeCategory})(AddParentAttributeCategory);