import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editCategory} from '../../../actions/categoryAction';


import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditCategory extends Component {
  constructor(){
    super();
    this.state={
       _id:'',
       errors:{},
       categoryName:'',
       dropdown:'',
       sliderStyle:'',
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
    if(!localStorage.editcategory){
        this.props.history.push('/admin/listcategory')

    }else{
        editResult=JSON.parse(localStorage.getItem('editcategory'))
    }
    this.setState({
        _id:editResult._id,
        categoryName :   editResult.categoryName,
        dropdown :   editResult.dropdown,
        sliderStyle :   editResult.sliderStyle,
        isEnabled:   editResult.isEnabled,  //visible,hidden
        storeID:editResult.storeID, 
    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.category.editcategory !== this.props.category.editcategory){
        Toast.fire({
            type: 'success',
            title: 'Category Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/listcategory');
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
        categoryName :   this.state.categoryName,
        dropdown :   this.state.dropdown,
        sliderStyle :   this.state.sliderStyle,
        isEnabled:   this.state.isEnabled,  //visible,hidden
        storeID:this.state.storeID, 
        _id:this.state._id
    }
    this.props.editCategory(categoryData);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
       categoryName:'',
       dropdown:'',
       sliderStyle:'',
       isEnabled:'',
       storeID:''
    })
}

render() {
    const {errors} = this.state;
    const {categoryloading} = this.props.category;

   

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
              <SubHeader first="Home" second="Edit Group" third="Edit Group"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Edit Group
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                          
                                <label className="col-lg-2 col-form-label">Group Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="categoryName" onChange={this.onChange} value={this.state.categoryName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.categoryName}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Show Dropdown on Group:</label>
                                <div className="col-lg-3">
                                <select  name="dropdown" onChange={this.onChange} value={this.state.dropdown} className="form-control" placeholder="" >
                                            <option value="">Select Dropdown</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                </select>
                                        <span className="form-text text-danger">{errors.dropdown}</span>
                                </div> 
                            </div>
 
                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Slider Style:</label>
                                <div className="col-lg-3">
                                <select  name="sliderStyle" onChange={this.onChange} value={this.state.sliderStyle} className="form-control" placeholder="" >
                                            <option value="">Select Style</option>
                                            <option value="1">style-1</option>
                                            <option value="2">style-2</option>
                                </select>
                                        <span className="form-text text-danger">{errors.sliderStyle}</span>
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
                                <button type="submit" className={`btn btn-success ${categoryloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

EditCategory.propTypes ={
  auth: PropTypes.object.isRequired,
  editCategory: PropTypes.func.isRequired,


}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    category :state.category,
    store:state.store


});

export default connect(mapStateToProps,{editCategory})(EditCategory);