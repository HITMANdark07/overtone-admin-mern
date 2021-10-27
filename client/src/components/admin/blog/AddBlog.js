import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {addBlog} from '../../../actions/blogAction';
import { Editor } from '@tinymce/tinymce-react';

import axios from 'axios';
import swal from 'sweetalert2';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AddBlog extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       uploadStatus:'',
       photoUrl:'',
       content:'',
       shortContent:'',
       blogType:'',
       visiblity:'',
       storeID:'',
       title:"",
       sliderImage:[{url:'',uploadstatus:'',fileName:''}],
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
    this.uploadImageBulk=this.uploadImageBulk.bind(this);
}
componentDidMount(){
  

}


addSlider() {
  const sliderImage = this.state.sliderImage.concat([{url:'',uploadstatus:'',fileName:''}]);
  this.setState({ sliderImage });
}

removeSlider(idx,sub) {
  this.setState({
    sliderImage: this.state.sliderImage.filter((s, sidx) => idx !== sidx)
  });   
}

handleEditorChange = (contentVal, editor) => {
    this.setState({
        content:contentVal
    })
   
  }

  handleEditorShortChange = (contentVal, editor) => {
    this.setState({
      shortContent:contentVal
    })
  
  }

componentWillReceiveProps(nextProps){
 
    if(nextProps.blog.addblog !== this.props.blog.addblog){
        Toast.fire({
            type: 'success',
            title: 'Blog Added Successfully',
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

uploadImageBulk(e,index,name){
  var self=this;
  const data = new FormData();
  var sFileName = e.target.files[0].name;
  let temp = this.state[name];
  temp[index].uploadstatus = 'Uploading please wait..';
  this.setState({[name]: temp});

  var sFileExtension = sFileName.split('.')[sFileName.split('.').length - 1].toLowerCase();
  if (sFileExtension !== "pdf"){
      data.append('file', e.target.files[0]);
      data.append('filename',e.target.files[0].name);
      axios.post('/upload', data)
      .then(response => {
          temp[index].url = response.data.file;
          temp[index].fileName = sFileName;
          temp[index].uploadstatus = 'Uploaded SuccessFully';
          self.setState({[name]: temp},()=>{
              Toast.fire({
                  type: 'success',
                  title: 'File Uploaded SuccessFully',
                })
          });
      })
      .catch(err=> {
          console.log(err);
      });
  }else{
      temp[index].uploadstatus = '';
      self.setState({[name]: temp});
      e.target.value = null;
      Toast.fire({
          type: 'error',
          title: 'Please Upload Image File Only',
        })
  }
  
}
//submit data to server
onSubmit(e){
    this.setState({errors:{}})
    e.preventDefault();
    const Data ={
        photoUrl   :   this.state.photoUrl,
        content :   this.state.content,
        shortContent:this.state.shortContent,
        blogType :   this.state.blogType,
        title :   this.state.title,
        visiblity:   this.state.visiblity,  //visible,hidden
        sliderImage :   JSON.stringify(this.state.sliderImage),
       
    }
    this.props.addBlog(Data);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        uploadStatus:'',
        shortContent:"",
        photoUrl:'',
        content:'',
        blogType:'',
        visiblity:'',
        title:"",
        storeID:'',
        sliderImage:[{url:'',uploadstatus:'',fileName:''}],
    })
}

render() {
    const {errors} = this.state;
    const {blogloading} = this.props.blog;

    const sliderImage = this.state.sliderImage.map((value, index) => {

      return <React.Fragment>
          <div className="col-lg-6">
              <div className="row">
                  <label className="col-lg-2 col-form-label mt-3">Image{index+1}</label>
                  <div className="col-lg-6">
                      <div className="kt-input-icon mt-3">
                          {value.fileName ==="" ?
                          <input type="file"    name="sliderImage" onChange={(e)=>this.uploadImageBulk(e,index,"sliderImage")}   className="form-control" placeholder="" />
                      :<button type="button" value={value.fileName}   className="btn btn-success btn-sm mt-1">{value.fileName}</button>}
                          <span className="form-text text-danger">{errors.url}</span>
                          </div>
                          <span className="form-text text-success">{value.uploadstatus}</span>
                          <span className="form-text text-muted">Upload Image Only</span>
                  </div>
                  <div className="col-lg-4 mt-3"> 
                          <button type="button" value={value.fileurl} onClick={() => this.addSlider()} className="btn btn-success btn-sm mt-1"><i class="fa fa-plus"></i></button>
                      &nbsp;&nbsp;&nbsp;
                      { this.state.sliderImage.length > 1 ?<button type="button" value={value.fileurl} onClick={() => this.removeSlider(index,value.fileurl)} className="btn btn-danger btn-sm mt-1"><i class="fa fa-trash"></i></button> : null }
                  </div>
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
              <SubHeader first="Home" second="Add Blog" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add Blog
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">   
                             <label className="col-lg-2 col-form-label">Blog Type:</label>
                                <div className="col-lg-3">
                                <select  name="blogType" onChange={this.onChange} value={this.state.blogType} className="form-control" placeholder="" >
                                            <option value="">Select</option>
                                            <option value="case">Case Studies</option>
                                            {/* <option value="blog">Blog</option>
                                            <option value="news">News</option> */}
                                </select>
                                        <span className="form-text text-danger">{errors.blogType}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Blog Title:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="title" onChange={this.onChange} value={this.state.title} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.title}</span>
                                </div>
                               
                            </div>
                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Blog Short Description:</label>
                            <Editor
         initialValue={this.state.shortContent}
         init={{
           height: 200,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={this.handleEditorShortChange}
       />
                            {/* <textarea  name="content" onChange={this.onChange} value={this.state.content} className="form-control" placeholder="" ></textarea> */}
                            <span className="form-text text-danger">{errors.shortContent}</span>

                            </div>
                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Blog Description:</label>
                            <Editor
         initialValue={this.state.content}
         init={{
           height: 500,
           menubar: false,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar:
             'undo redo | formatselect | bold italic backcolor | \
             alignleft aligncenter alignright alignjustify | \
             bullist numlist outdent indent | removeformat | help'
         }}
         onEditorChange={this.handleEditorChange}
       />
                            {/* <textarea  name="content" onChange={this.onChange} value={this.state.content} className="form-control" placeholder="" ></textarea> */}
                            <span className="form-text text-danger">{errors.content}</span>

                            </div>
                         
                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Upload Blog Image:</label>
                                <div className="col-lg-3">
                                    <div className="kt-input-icon">
                                    <input type="file"  name="photoUrl" onChange={this.uploadImage}   className="form-control" placeholder="" />
                                    <span className="form-text text-danger">{errors.photoUrl}</span>
                                    </div>
                                    <span className="form-text text-success">{this.state.uploadStatus}</span>
                                    <span className="form-text text-muted">File Resolution (292px X 69px)</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Visiblity:</label>
                                <div className="col-lg-3">
                                <select  name="visiblity" onChange={this.onChange} value={this.state.visiblity} className="form-control" placeholder="" >
                                            <option value="">Select Visiblity</option>
                                            <option value="visible">Visible</option>
                                            <option value="hidden">Hidden</option>
                                </select>
                                        <span className="form-text text-danger">{errors.visiblity}</span>
                                </div>
                            </div>                         
                           
                        </div>
                        <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Slider Images
                            </h3>
                        </div>
                    </div>
                        <div className="kt-portlet__body">
                                            <div className="form-group row">
                                                {sliderImage}   
                                            </div>
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${blogloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

AddBlog.propTypes ={
    auth: PropTypes.object.isRequired,
    addBlog: PropTypes.func.isRequired,
  
}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    blog :state.blog,
    store:state.store
});
  
export default connect(mapStateToProps,{addBlog})(AddBlog);