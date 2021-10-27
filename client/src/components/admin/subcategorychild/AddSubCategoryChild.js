import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {addSubCategoryChild} from '../../../actions/subCategoryChildAction';
import {listCategory} from '../../../actions/categoryAction';
import {listSubCategoryOne} from '../../../actions/subCategoryAction';
import axios from 'axios';
import swal from 'sweetalert2';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AddSubCategoryChildChild extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       uploadStatus:'',
       photoUrl:'',
       subCategoryChildName:'',
       isEnabled:'',
       categoryID:'',
       subcategoryID:'',
       storeID:''
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}
componentDidMount(){
    this.props.listCategory();
   

}

componentWillReceiveProps(nextProps){
 
    if(nextProps.subCategoryChild.addsubCategoryChild !== this.props.subCategoryChild.addsubCategoryChild){
        Toast.fire({
            type: 'success',
            title: 'SubCategoryChild Added Successfully',
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


//onchange state value for subCategoryChild
onChange(e){
    this.setState({[e.target.name]:e.target.value})
    if(e.target.name==='categoryID' && e.target.value !=""){
        this.props.listSubCategoryOne({categoryID:e.target.value,authorID:this.state.authorID});
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
    this.setState({errors:{}})
    e.preventDefault();
    const Data ={
        photoUrl   :   this.state.photoUrl,
        subCategoryChildName :   this.state.subCategoryChildName,
        isEnabled:   this.state.isEnabled,  //visible,hidden
        storeID:this.state.storeID, 
        categoryID :   this.state.categoryID,
        subcategoryID :  this.state.subcategoryID,
    }
    this.props.addSubCategoryChild(Data);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        uploadStatus:'',
        photoUrl:'',
        subCategoryChildName:'',
        isEnabled:'',
        categoryID:"",
        subcategoryID:'',
    })
}

render() {
    const {errors} = this.state;
    const {subCategoryChildloading} = this.props.subCategoryChild;
  //SubCategoryChild list
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
          optionResult=(<option value="">No Store Found...</option>)
      }
  }
  const {listsubCategory,subCategoryloading}=this.props.subCategory;

     var optionResultSubCategory=[];
     if(listsubCategory==null ||subCategoryloading){
        optionResultSubCategory=(<option value="">Loading...</option>)
     }else{
         if(Object.keys(listsubCategory).length >0 && this.state.categoryID!=""){
             var filterSub=listsubCategory.filter(x=>x.categoryID===this.state.categoryID)
             if(Object.keys(filterSub).length >0){
                optionResultSubCategory= listsubCategory.map(result=>{
                    return <option value={result._id}>{result.subCategoryName}</option>
                })
             }else{
                optionResultSubCategory=(<option value="">No SubCategory Found For Selected Category..</option>)
             }
            
         }else{
            optionResultSubCategory=(<option value="">No SubCategory Found...</option>)
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
              <SubHeader first="Home" second="Add Sub-Group Child" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add Sub-Group Child
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
                                <label className="col-lg-2 col-form-label">Select Sub-Group:</label>
                                <div className="col-lg-3">
                                <select  name="subcategoryID" onChange={(e)=>this.onChange(e)} value={this.state.subcategoryID} className="form-control" placeholder="" >
                                            <option value="">Select Sub-Group</option>
                                            {optionResultSubCategory}
                                </select>
                                        <span className="form-text text-danger">{errors.subcategoryID}</span>
                                </div>
                               
                               
                            </div>

                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Sub-Group Child Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="subCategoryChildName" onChange={this.onChange} value={this.state.subCategoryChildName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.subCategoryChildName}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Upload Sub-Group Child Image:</label>
                                <div className="col-lg-3">
                                    <div className="kt-input-icon">
                                    <input type="file"  name="photoUrl" onChange={this.uploadImage}   className="form-control" placeholder="" />
                                    <span className="form-text text-danger">{errors.photoUrl}</span>
                                    </div>
                                    <span className="form-text text-success">{this.state.uploadStatus}</span>
                                    <span className="form-text text-muted">File Resolution (292px X 69px)</span>
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
                                <button type="submit" className={`btn btn-success ${subCategoryChildloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

AddSubCategoryChildChild.propTypes ={
    auth: PropTypes.object.isRequired,
    addSubCategoryChildChild: PropTypes.func.isRequired,
    listCategory:PropTypes.func.isRequired,


}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    subCategoryChild :state.subCategoryChild,
    subCategory :state.subCategory,
    category:state.category,
    store:state.store

});
  
export default connect(mapStateToProps,{addSubCategoryChild,listCategory,listSubCategoryOne})(AddSubCategoryChildChild);