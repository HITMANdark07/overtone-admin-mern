import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editParentAttributeCategory} from '../../../actions/parentattributecategoryAction';


import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditParentAttributeCategory extends Component {
  constructor(){
    super();
    this.state={
       _id:'',
       errors:{},
       attributeName:'',
       isEnabled:'',
       storeID:''
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
  
}

//set all the values to input fields
componentDidMount(){
   
    var editResult={}
    if(!localStorage.editparentattribute){
        this.props.history.push('/admin/addparentattribute')

    }else{
        editResult=JSON.parse(localStorage.getItem('editparentattribute'))
    }
    this.setState({
        _id:editResult._id,
        attributeName :   editResult.attributeName,
        isEnabled:   editResult.isEnabled,  //visible,hidden
        storeID:editResult.storeID, 
    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.parentattributecategory.editparentattributecategory !== this.props.parentattributecategory.editparentattributecategory){
        Toast.fire({
            type: 'success',
            title: 'Parent Attribute Category Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/addparentattribute');
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

//onchange state value for category
onChange(e){
    this.setState({[e.target.name]:e.target.value}) 
}



//submit data to server
onSubmit(e){
    e.preventDefault();
    const categoryData ={
        attributeName :   this.state.attributeName,
        isEnabled:   this.state.isEnabled,  //visible,hidden
        storeID:this.state.storeID, 
        _id:this.state._id
    }
    this.props.editParentAttributeCategory(categoryData);
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
              <SubHeader first="Home" second="Edit Parent Attribute Category" third="Edit Parent Attribute Category"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Edit Parent Attribute Category
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

EditParentAttributeCategory.propTypes ={
  auth: PropTypes.object.isRequired,
  editParentAttributeCategory: PropTypes.func.isRequired,


}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    parentattributecategory :state.parentattributecategory,
    store:state.store


});

export default connect(mapStateToProps,{editParentAttributeCategory})(EditParentAttributeCategory);