import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {addSlider} from '../../../actions/sliderAction';
import {listCategory} from '../../../actions/categoryAction';
import {listProductOne} from '../../../actions/productAction';



import axios from 'axios';
import swal from 'sweetalert2';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AddSlider extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       uploadStatus:'',
       photoUrl:'',
       sliderName:'',
       productID:'',
       categoryID:'',
       visiblity:'',
       storeID:'',
       sliderTitle:'',
       sliderDesc:''
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
 
    if(nextProps.slider.addslider !== this.props.slider.addslider){
        Toast.fire({
            type: 'success',
            title: 'Slider Added Successfully',
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
    if(e.target.name==='categoryID' && e.target.value !=""){
        this.props.listProductOne({categoryID:e.target.value});
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
        sliderName :   this.state.sliderName,
        productID:this.state.productID,
        categoryID:this.state.categoryID,
        visiblity:   this.state.visiblity,  //visible,hidden
        storeID:this.state.storeID, 
        sliderTitle:this.state.sliderTitle,
       sliderDesc:this.state.sliderDesc
    }
    this.props.addSlider(Data);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        uploadStatus:'',
        photoUrl:'',
        sliderName:'',
        productID:'',
        categoryID:'',
        visiblity:'',
        storeID:'',
        sliderTitle:'',
        sliderDesc:''
    })
}

render() {
    const {errors} = this.state;
    const {sliderloading} = this.props.slider;

      //Category list
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

 //Product list
      const {listproduct,productloading}=this.props.product;

      var optionResultProduct=[];
      if(listproduct==null ||productloading){
          optionResultProduct=(<option value="">Loading...</option>)
      }else{
          if(Object.keys(listproduct).length >0){
              optionResultProduct= listproduct.map(result=>{
                  return <option value={result._id}>{result.name}</option>
              })
          }else{
              optionResultProduct=(<option value="">No Product Found...</option>)
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
              <SubHeader first="Home" second="Add Slider" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add Slider
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                          
                                <label className="col-lg-2 col-form-label">Slider Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="sliderName" onChange={this.onChange} value={this.state.sliderName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.sliderName}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Select Category:</label>
                                <div className="col-lg-3">
                                <select  name="categoryID" onChange={(e)=>this.onChange(e)} value={this.state.categoryID} className="form-control" placeholder="" >
                                            <option value="">Select Category</option>
                                            {optionResult}
                                </select>
                                        <span className="form-text text-danger">{errors.categoryID}</span>
                                </div>
                               
                            </div>

                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Select Product:</label>
                            <div className="col-lg-3">
                                <select  name="productID" onChange={(e)=>this.onChange(e)} value={this.state.productID} className="form-control" placeholder="" >
                                            <option value="">Select Product</option>
                                            {optionResultProduct}
                                </select>
                                        <span className="form-text text-danger">{errors.productID}</span>
                                </div>
                            <label className="col-lg-2 col-form-label">Upload Slider Image:</label>
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
                                 <label className="col-lg-2 col-form-label">Visiblity:</label>
                                <div className="col-lg-3">
                                <select  name="visiblity" onChange={this.onChange} value={this.state.visiblity} className="form-control" placeholder="" >
                                            <option value="">Select Visiblity</option>
                                            <option value="visible">Visible</option>
                                            <option value="hidden">Hidden</option>
                                </select>
                                        <span className="form-text text-danger">{errors.visiblity}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Slider Title:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="sliderTitle" onChange={this.onChange} value={this.state.sliderTitle} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.sliderTitle}</span>
                                </div>
                            </div> 
                            <div className="form-group row">
                               
                                <label className="col-lg-2 col-form-label">Slider Description:</label>
                                <div className="col-lg-3">
                                        <textarea type="text" name="sliderDesc" onChange={this.onChange} value={this.state.sliderDesc} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.sliderDesc}</span>
                                </div>
                            </div>                       
                           
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${sliderloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

AddSlider.propTypes ={
    auth: PropTypes.object.isRequired,
    addSlider: PropTypes.func.isRequired,
    listCategory:PropTypes.func.isRequired,
    listProductOne:PropTypes.func.isRequired,

}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    slider :state.slider,
    store:state.store,
    category:state.category,
    product:state.product
});
  
export default connect(mapStateToProps,{addSlider,listCategory,listProductOne})(AddSlider);