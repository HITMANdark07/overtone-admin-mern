import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editSubCategory} from '../../../actions/subCategoryAction';
import {listCategoryOne} from '../../../actions/categoryAction';


import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditSubCategory extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       _id:'',
       subCategoryName:'',
       isEnabled:'',
       categoryID:'',
       storeID:''

    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}

//set all the values to input fields
componentDidMount(){
    this.props.listCategoryOne();
    var editResult={}
    if(!localStorage.editsubCategory){
        this.props.history.push('/admin/listsubCategory')

    }else{
        editResult=JSON.parse(localStorage.getItem('editsubCategory'))
    }
    this.setState({
        _id:editResult._id,
        subCategoryName :   editResult.subCategoryName,     
        isEnabled:   editResult.isEnabled,  //visible,hidden
        categoryID:editResult.categoryID, 
        storeID:editResult.storeID, 

    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.subCategory.editsubCategory !== this.props.subCategory.editsubCategory){
        Toast.fire({
            type: 'success',
            title: 'SubCategory Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/listsubCategory');
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

//onchange state value for subCategory
onChange(e){
    this.setState({[e.target.name]:e.target.value})
    if(e.target.name==='storeID' && e.target.value !=""){
        this.props.listCategoryOne({storeID:e.target.value});
    }
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
    const subCategoryData ={
        subCategoryName:this.state.subCategoryName,
        isEnabled:this.state.isEnabled,
        categoryID :   this.state.categoryID,
        storeID:this.state.storeID, 
        _id:this.state._id
    }
    this.props.editSubCategory(subCategoryData);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        subCategoryName:'',
        isEnabled:'',
        categoryID:'',
        storeID:''
    })
}

render() {
    const {errors} = this.state;
    const {subCategoryloading} = this.props.subCategory;

    //SubCategory list
    const {listcategory,categoryloading}=this.props.category;

    var optionResult=[];
    if(listcategory==null ||categoryloading){
        optionResult=(<option value="">Loading...</option>)
    }else{
        if(Object.keys(listcategory).length >0){
            optionResult= listcategory.map(result=>{
                return <option value={result._id}>{result.categoryName}</option>
            })
        }else{
            optionResult=(<option value="">No Category Found...</option>)
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
              <SubHeader first="Home" second="Edit Sub-Group" third="Edit Sub-Group"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Edit Sub-Group
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                           
                                <label className="col-lg-2 col-form-label">Select Group:</label>
                                <div className="col-lg-3">
                                <select  name="categoryID" onChange={(e)=>this.onChange(e)} value={this.state.categoryID} className="form-control" placeholder="" >
                                            <option value="">Select Group</option>
                                            {optionResult}
                                </select>
                                        <span className="form-text text-danger">{errors.categoryID}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Sub-Group Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="subCategoryName" onChange={this.onChange} value={this.state.subCategoryName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.subCategoryName}</span>
                                </div>
                               
                            </div>

                             
                            <div className="form-group row">
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
                                <button type="submit" className={`btn btn-success ${subCategoryloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

EditSubCategory.propTypes ={
  auth: PropTypes.object.isRequired,
  editSubCategory: PropTypes.func.isRequired,
  listCategoryOne:PropTypes.func.isRequired,

}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    subCategory :state.subCategory,
    category :state.category,
    store:state.store
});

export default connect(mapStateToProps,{editSubCategory,listCategoryOne})(EditSubCategory);