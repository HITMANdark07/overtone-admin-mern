import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editAttributeMapping} from '../../../actions/attributemappingAction';
import {listParentAttributeCategory} from '../../../actions/parentattributecategoryAction';
import {listAttributeCategory} from '../../../actions/attributecategoryAction';
import {listProduct} from '../../../actions/productAction';
import axios from 'axios';
import swal from 'sweetalert2';
import ListProductSub from './ListProductSub';
const queryString = require('query-string');


const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class EditProductSub extends Component {
  constructor(){
    super();
    this.state={
      _id:'',
       errors:{},
       parentAttributeCategoryID:'',
       attributeCategoryID:'',
       productID:'',
       mappingName:'',
       mappingLabel:'',
       mappingType:'',
       mappingValue:'',
       photoUrl:'',
       additionalPrice:"0",
       dependentField:[{type:"",label:"",list:[{label:"",value:"",additionalPrice:"0"}]}],
       isEnabled:'',
       subField:"No",
       parsed:"",
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);

}
componentDidMount(){
  this.props.listParentAttributeCategory();
  this.props.listAttributeCategory();
  this.props.listProduct();
  var editResult={}
  if(!localStorage.editattributemapping){
      this.props.history.push('/admin/listproduct')

  }else{
      editResult=JSON.parse(localStorage.getItem('editattributemapping'))
  }
  this.setState({
      _id:editResult._id,
       parentAttributeCategoryID:editResult.parentAttributeCategoryID,
       attributeCategoryID:editResult.attributeCategoryID,
       productID:editResult.productID,
       mappingName:editResult.mappingName,
       mappingLabel:editResult.mappingLabel,
       mappingType:editResult.mappingType,
       mappingValue:editResult.mappingValue,
       photoUrl:editResult.photoUrl,
       additionalPrice:editResult.additionalPrice,
       dependentField:editResult.dependentField ? JSON.parse(editResult.dependentField):[{type:"",label:"",list:[{label:"",value:"",additionalPrice:"0"}]}],
       isEnabled:editResult.isEnabled,
       subField:"Yes",
  })
 
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

componentWillReceiveProps(nextProps){
   
  if(nextProps.attributemapping.editattributemapping !== this.props.attributemapping.editattributemapping){
      Toast.fire({
          type: 'success',
          title: ' Attribute Category Edited Successfully',
        }).then(navigate=>{
          const parsed=queryString.parse(this.props.location.search)
          this.props.history.push(`addmapping?productID=${parsed.productID}`)
          //this.props.history.push('/admin/addattribute');
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
    this.setState({errors:{}})
    e.preventDefault();
    const Data ={  
      parentAttributeCategoryID:this.state.parentAttributeCategoryID,
      attributeCategoryID:this.state.attributeCategoryID,
      productID:this.state.productID,
      mappingName:this.state.mappingName,
      mappingLabel:this.state.mappingLabel,
      mappingType:this.state.mappingType,
      mappingValue:this.state.mappingValue,
      photoUrl:this.state.photoUrl,
      additionalPrice:this.state.additionalPrice,
      dependentField:JSON.stringify(this.state.dependentField),
      isEnabled:this.state.isEnabled, 
      _id:this.state._id,
    }
    this.props.editAttributeMapping(Data);
}
//Reset all statevalues
onReset(){
    this.setState({
      errors:{},
      parentAttributeCategoryID:'',
      attributeCategoryID:'',
      productID:'',
      mappingName:'',
      mappingLabel:'',
      mappingType:'',
      mappingValue:'',
      photoUrl:'',
      additionalPrice:'',
      dependentField:[{type:"",label:"",list:[{label:"",value:"",additionalPrice:"0"}]}],
      isEnabled:'',
    })
}

////LOGIC START FOR DEPENDENT FIELD
addField() {
  const dependentField = this.state.dependentField.concat([{type:"",label:"",list:[{label:"",value:"",additionalPrice:"0"}]}]);
  this.setState({ dependentField });
}

removeField(idx,sub) {
  this.setState({
    dependentField: this.state.dependentField.filter((s, sidx) => idx !== sidx)
  });   
}

onhandleChangeField(e,index){
  const name=e.target.name;
  const value=e.target.value;
  const temp=this.state.dependentField;
  if(name==="type"){
      temp[index].type=value;
  }else if(name==="label"){
      temp[index].label=value;
  }
  this.setState({
    dependentField:temp
  })
}

onhandleChangeSubField(e,index,indexSub){
  const name=e.target.name;
  const value=e.target.value;
  const temp=this.state.dependentField;
  if(name==="label"){
      temp[index].list[indexSub].label=value;
  }else if(name==="value"){
    temp[index].list[indexSub].value=value;
  }
  else if(name==="additionalPrice"){
    temp[index].list[indexSub].additionalPrice=value;
}
  this.setState({
    dependentField:temp
  })
}

addSubField(index){
  const temp=this.state.dependentField;
  temp[index].list=temp[index].list.concat([{type:"",label:"",list:[{label:"",value:"",additionalPrice:"0"}]}])
  this.setState({ dependentField:temp });
}

removeSubField(index,idx,sub) {
  const temp=this.state.dependentField;
  temp[index].list=temp[index].list.filter((s, sidx) => idx !== sidx)
  this.setState({
    dependentField: temp
  });   
}

render() {
    const {errors} = this.state;
    const {attributemappingloading} = this.props.attributemapping;

    //Parent AttributeList list
  const {listparentattributecategory,parentattributecategoryloading}=this.props.parentattributecategory;

  var optionParentCategory=[];
  if(listparentattributecategory==null ||parentattributecategoryloading){
    optionParentCategory=(<option value="">Loading...</option>)
  }else{
      if(Object.keys(listparentattributecategory).length >0){
        optionParentCategory= listparentattributecategory.map(result=>{
              return <option value={result._id}>{result.attributeName}</option>
          })
      }else{
        optionParentCategory=(<option value="">No Parent Attributes  Found...</option>)
      }
  }


    //AttributeCategory list
    const {listattributecategory,attributecategoryloading}=this.props.attributecategory;

    var optionCategory=[];
    if(listattributecategory==null ||attributecategoryloading){
        optionCategory=(<option value="">Loading...</option>)
    }else{
        if(Object.keys(listattributecategory).length >0){
            optionCategory= listattributecategory.map(result=>{
                return <option value={result._id}>{result.attributeName}</option>
            })
        }else{
            optionCategory=(<option value="">No Attributes Category Found...</option>)
        }
    }

    //Product  list
    const {listproduct,productloading}=this.props.product;

    var optionResult=[];
    if(listproduct==null ||productloading){
        optionResult=(<option value="">Loading...</option>)
    }else{
        if(Object.keys(listproduct).length >0){
            optionResult= listproduct.map(result=>{
                return <option value={result._id}>{result.name}</option>
            })
        }else{
            optionResult=(<option value="">No Products Found...</option>)
        }
    }

    const dependentField = this.state.dependentField.map((value, index) => {
          var list=value.list;
      return <React.Fragment>
              <div className="row border py-2 mt-4">
                  <div class="col-md-2">
                      <label className="col-form-label">Type </label>
                      <select name="type" onChange={(e)=>this.onhandleChangeField(e,index)} value={value.type} className="form-control" placeholder="" >
                                    <option value="">Select type</option>
                                    <option value="dropdown">Dropdown</option>
                                    <option value="color">Color Code</option>                         
                        </select>
                        <label className="col-form-label mt-3">Label </label>
                        <input type="text" name="label"  onChange={(e)=>this.onhandleChangeField(e,index)} value={value.label} className="form-control" placeholder="" />
                  </div>
                  <div class="col-md-8 border border-success py-2">

                  {list.map((result,indexSub)=>{
                  return <div class="row mt-3">
                          <label className="col-lg-1 col-form-label">Label:</label>
                          <div className="col-lg-2">
                              <input type="text" required name="label" onChange={(e)=>this.onhandleChangeSubField(e,index,indexSub)} value={result.label} className="form-control" placeholder="" />
                          </div>
                          <label className="col-lg-1 col-form-label">Value:</label>
                          <div className="col-lg-2">
                              <input type="text" required name="value" onChange={(e)=>this.onhandleChangeSubField(e,index,indexSub)} value={result.value} className="form-control" placeholder="" />
                          </div>
                          <label className="col-lg-1 col-form-label">Price:</label>
                          <div className="col-lg-2">
                              <input type="text" required name="additionalPrice" onChange={(e)=>this.onhandleChangeSubField(e,index,indexSub)} value={result.additionalPrice} className="form-control" placeholder="" />
                          </div>
                          <div className="col-lg-3 "> 
                            <button type="button" value={value.type} onClick={() => this.addSubField(index)} className="btn btn-success btn-sm mt-1"><i class="fa fa-plus"></i></button>
                        &nbsp;&nbsp;&nbsp;
                        { list.length > 1 ?<button type="button" value={value.type} onClick={() => this.removeSubField(index,indexSub,value.label)} className="btn btn-danger btn-sm mt-1"><i class="fa fa-trash"></i></button> : null }
                  </div>
                        </div>})}
                  </div> 
                  <div className="col-lg-2 d-flex align-content-center"> 
                            <button type="button" value={value.type} onClick={() => this.addField()} className="btn btn-success btn-sm mt-1"><i class="fa fa-plus"></i></button>
                        &nbsp;&nbsp;&nbsp;
                        { this.state.dependentField.length > 1 ?<button type="button" value={value.type} onClick={() => this.removeField(index,value.title)} className="btn btn-danger btn-sm mt-1"><i class="fa fa-trash"></i></button> : null }
                  </div> 
              </div>
            </React.Fragment>
  })


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
              <SubHeader first="Home" second="Add  Attribute Category" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add  Attribute Mapping
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                             <div className="form-group row">
                                  <label className="col-lg-2 col-form-label">Select Parent Category Attribute:</label>
                                  <div className="col-lg-3">
                                  <select  name="parentAttributeCategoryID" onChange={(e)=>this.onChange(e)} value={this.state.parentAttributeCategoryID} className="form-control" placeholder="" >
                                              <option value="">Select</option>
                                              {optionParentCategory}
                                  </select>
                                          <span className="form-text text-danger">{errors.parentAttributeCategoryID}</span>
                                  </div>
                                  
                                  <label className="col-lg-2 col-form-label">Select Parent Category Attribute:</label>
                                  <div className="col-lg-3">
                                  <select  name="attributeCategoryID" onChange={(e)=>this.onChange(e)} value={this.state.attributeCategoryID} className="form-control" placeholder="" >
                                              <option value="">Select</option>
                                              {optionCategory}
                                  </select>
                                          <span className="form-text text-danger">{errors.attributeCategoryID}</span>
                                  </div>
                            </div>
                            <div className="form-group row">

                                <label className="col-lg-2 col-form-label">Mapping Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="mappingName" onChange={this.onChange} value={this.state.mappingName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.mappingName}</span>
                                        <span className="form-text">name for reference not shown in frontend</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Type:</label>
                                <div className="col-lg-3">
                                <select  name="mappingType" onChange={(e)=>this.onChange(e)} value={this.state.mappingType} className="form-control" placeholder="" >
                                            <option value="">Select type</option>
                                            <option value="dropdown">Dropdown</option>
                                            <option value="color">Color Code</option>
                                            <option value="image+text">Image+Text</option>
                                           
                                </select>
                                        <span className="form-text text-danger">{errors.attributeCategoryID}</span>
                                </div>
                                
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Label:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="mappingLabel" onChange={this.onChange} value={this.state.mappingLabel} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.mappingLabel}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Value:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="mappingValue" onChange={this.onChange} value={this.state.mappingValue} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.mappingValue}</span>
                                </div>   
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Additional Cost:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="additionalPrice" onChange={this.onChange} value={this.state.additionalPrice} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.additionalPrice}</span>
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
                            <div className="form-group row">
                              {this.state.mappingType==="image+text" && <React.Fragment>
                                <label className="col-lg-2 col-form-label">Upload  Image:</label>
                                <div className="col-lg-3">
                                    <div className="kt-input-icon">
                                    <input type="file"  name="photoUrl" onChange={this.uploadImage}   className="form-control" placeholder="" />
                                    <span className="form-text text-danger">{errors.photoUrl}</span>
                                    </div>
                                    <span className="form-text text-success">{this.state.uploadStatus}</span>
                                    <span className="form-text text-muted">File Resolution (292px X 69px)</span>
                                </div>
                              </React.Fragment>}
                               


                                <React.Fragment>
                                    <label className="col-lg-2 col-form-label">Sub-Fields:</label>
                                    <div className="col-lg-3">
                                    <select  name="subField" onChange={this.onChange} value={this.state.subField} className="form-control" placeholder="" >
                                                <option value="">Select</option>
                                                <option value="Yes">Yes</option>
                                                <option value="No">No</option>
                                    </select>
                                            <span className="form-text text-danger">{errors.subField}</span>
                                    </div>
                                </React.Fragment>
                               
                            </div>
                                                      
                        </div>
                        {this.state.subField==="Yes" && <React.Fragment>
                        <div className="kt-portlet__head">
                            <div className="kt-portlet__head-label">
                                <h3 className="kt-portlet__head-title">
                                Add  Sub-Fields
                                </h3>
                            </div>
                         </div>
                         <div className="kt-portlet__body">
                            {dependentField}
                         </div>
                        </React.Fragment>}
                       
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${attributemappingloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

EditProductSub.propTypes ={
    auth: PropTypes.object.isRequired,
    editAttributeMapping: PropTypes.func.isRequired,
    listParentAttributeCategory: PropTypes.func.isRequired,
    listAttributeCategory: PropTypes.func.isRequired,
}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    attributemapping :state.attributemapping,
    parentattributecategory:state.parentattributecategory,
    attributecategory:state.attributecategory,
    product:state.product,
});
  
export default connect(mapStateToProps,{editAttributeMapping,listParentAttributeCategory,listAttributeCategory,listProduct})(EditProductSub);