import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import axios from 'axios';
import swal from 'sweetalert2';
import Axios from 'axios';
import {checkPermission} from '../../common/MenuList';
import Heading from './Heading'

const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AddSetting extends Component {
  constructor(){
    super();
    this.state={
        errors:{},
        uploadStatus:'',
        applicationName:'',
        applicationEmail:'',
        logoUrl:'',
        currency:'',
        contactNo:'',
        address:'',
        homebgUrl :   '', 
        homeTitle :   '', 
        homePara : '', 
        homeBtnText :   '',
        homeBtnPath:'',
        aboutHeading:'',
        aboutPara:"",
        aboutCoverUrl:"",
        aboutVideoUrl :"",
        clientList:[{url:'',uploadstatus:'',fileName:''}],
        featurebgUrl :"",
        featureTitle :"",
        featurePara :"",
        featureList :[{url:'',uploadstatus:'',fileName:"",title:'',para:''}],
        bannerBgUrl :"",
        bannerText :"",
        bannerPara :"",
        bannerBtnText :"",
        bannerBtnPath :"",
        hashtag:"",
        hashImageList:[{url:'',uploadstatus:'',fileName:''}],
        footerText:"",
        contactText:"",
        socialLinksList:[{icon:"",url:""}],
       _id:""
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.uploadImage=this.uploadImage.bind(this); 
    this.uploadImageBulk=this.uploadImageBulk.bind(this);

}
componentDidMount(){
   this.getData();
}

addClient() {
    const clientList = this.state.clientList.concat([{url:'',uploadstatus:'',fileName:''}]);
    this.setState({ clientList });
}

removeClient(idx,sub) {
    this.setState({
        clientList: this.state.clientList.filter((s, sidx) => idx !== sidx)
    });   
}

addHash() {
    const hashImageList = this.state.hashImageList.concat([{url:'',uploadstatus:'',fileName:''}]);
    this.setState({ hashImageList });
}

removeHash(idx,sub) {
    this.setState({
        hashImageList: this.state.hashImageList.filter((s, sidx) => idx !== sidx)
    });   
}

addSocial() {
    const socialLinksList = this.state.socialLinksList.concat([{icon:"",url:""}]);
    this.setState({ socialLinksList });
}

removeSocial(idx,sub) {
    this.setState({
        socialLinksList: this.state.socialLinksList.filter((s, sidx) => idx !== sidx)
    });   
}

addFeature() {
    const featureList = this.state.featureList.concat([{url:'',uploadstatus:'',fileName:'',title:'',para:''}]);
    this.setState({ featureList });
}

removeFeature(idx,sub) {
    this.setState({
        featureList: this.state.featureList.filter((s, sidx) => idx !== sidx)
    });   
}

onhandleChangeFeature(e,index){
    const name=e.target.name;
    const value=e.target.value;
    const temp=this.state.featureList;
    if(name==="title"){
        temp[index].title=value;
    }else if(name==="para"){
        temp[index].para=value;
    }
    this.setState({
        featureList:temp
    })

}

onhandleChangeSocial(e,index){
    const name=e.target.name;
    const value=e.target.value;
    const temp=this.state.socialLinksList;
    if(name==="icon"){
        temp[index].icon=value;
    }else if(name==="url"){
        temp[index].url=value;
    }
    this.setState({
        socialLinksList:temp
    })

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

getData(){
    Axios.get('/api/setting/')
    .then(result=>{
        const temp=result.data;
        console.log("temp",temp);
            this.setState({
                applicationName   :   temp.applicationName,
                applicationEmail :   temp.applicationEmail,
                logoUrl :   temp.logoUrl,
                currency :   temp.currency, 
                contactNo :   temp.contactNo, 
                address :   temp.address, 
                homebgUrl :   temp.homebgUrl, 
                homeTitle :   temp.homeTitle, 
                homePara :   temp.homePara, 
                homeBtnText :   temp.homeBtnText, 
                homeBtnPath :   temp.homeBtnPath,
                aboutHeading :   temp.aboutHeading,
                aboutPara :   temp.aboutPara,
                aboutCoverUrl :   temp.aboutCoverUrl,
                aboutVideoUrl :   temp.aboutVideoUrl,
                clientList :   JSON.parse(temp.clientList),
                featurebgUrl :   temp.featurebgUrl,
                featureTitle :   temp.featureTitle,
                featurePara :   temp.featurePara,
                featureList :   JSON.parse(temp.featureList),
                bannerBgUrl :   temp.bannerBgUrl,
                bannerText :   temp.bannerText,
                bannerPara :   temp.bannerPara,
                bannerBtnText :   temp.bannerBtnText,
                bannerBtnPath :   temp.bannerBtnPath,
                hashtag :   temp.hashtag,
                hashImageList :    JSON.parse(temp.hashImageList),
                footerText :   temp.footerText,
                contactText :   temp.contactText,
                socialLinksList :   JSON.parse(temp.socialLinksList),
                _id:temp._id
            })
    })
    .catch(err=>{
        console.log("errr",err)
    })
}

componentWillReceiveProps(nextProps){
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
uploadImage(e,name){
        var self=this;
        var status=name+"Status";

        const data = new FormData();
        data.append('file', e.target.files[0]);
        data.append('filename',e.target.files[0].name);
        axios.post('/upload', data)
        .then(function (response) {
            self.setState({
                [name]:response.data.file,
                [status]:'Uploaded SuccessFully'
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

    var Data ={
        applicationName   :   this.state.applicationName,
        applicationEmail :   this.state.applicationEmail,
        logoUrl :   this.state.logoUrl,
        currency :   this.state.currency, 
        contactNo :   this.state.contactNo, 
        address :   this.state.address, 
        homebgUrl :   this.state.homebgUrl, 
        homeTitle :   this.state.homeTitle, 
        homePara :   this.state.homePara, 
        homeBtnText :   this.state.homeBtnText, 
        homeBtnPath :   this.state.homeBtnPath,
        aboutHeading :   this.state.aboutHeading,
        aboutPara :   this.state.aboutPara,
        aboutCoverUrl :   this.state.aboutCoverUrl,
        aboutVideoUrl :   this.state.aboutVideoUrl,
        clientList :   JSON.stringify(this.state.clientList),
        featurebgUrl :   this.state.featurebgUrl,
        featureTitle :   this.state.featureTitle,
        featurePara :   this.state.featurePara,
        featureList :   JSON.stringify(this.state.featureList),
        bannerBgUrl :   this.state.bannerBgUrl,
        bannerText :   this.state.bannerText,
        bannerPara :   this.state.bannerPara,
        bannerBtnText :   this.state.bannerBtnText,
        bannerBtnPath :   this.state.bannerBtnPath,
        hashtag :   this.state.hashtag,
        hashImageList :   JSON.stringify(this.state.hashImageList),
        footerText :   this.state.footerText,
        contactText :   this.state.contactText,
        socialLinksList :   JSON.stringify(this.state.socialLinksList),

    }
    if(this.state._id !=""){
        Data ={
            applicationName   :   this.state.applicationName,
        applicationEmail :   this.state.applicationEmail,
        logoUrl :   this.state.logoUrl,
        currency :   this.state.currency, 
        contactNo :   this.state.contactNo, 
        address :   this.state.address, 
        homebgUrl :   this.state.homebgUrl, 
        homeTitle :   this.state.homeTitle, 
        homePara :   this.state.homePara, 
        homeBtnText :   this.state.homeBtnText, 
        homeBtnPath :   this.state.homeBtnPath,
        aboutHeading :   this.state.aboutHeading,
        aboutPara :   this.state.aboutPara,
        aboutCoverUrl :   this.state.aboutCoverUrl,
        aboutVideoUrl :   this.state.aboutVideoUrl,
        clientList :   JSON.stringify(this.state.clientList),
        featurebgUrl :   this.state.featurebgUrl,
        featureTitle :   this.state.featureTitle,
        featurePara :   this.state.featurePara,
        featureList :   JSON.stringify(this.state.featureList),
        bannerBgUrl :   this.state.bannerBgUrl,
        bannerText :   this.state.bannerText,
        bannerPara :   this.state.bannerPara,
        bannerBtnText :   this.state.bannerBtnText,
        bannerBtnPath :   this.state.bannerBtnPath,
        hashtag :   this.state.hashtag,
        hashImageList :   JSON.stringify(this.state.hashImageList),
        footerText :   this.state.footerText,
        contactText :   this.state.contactText,
        socialLinksList :   JSON.stringify(this.state.socialLinksList),
        _id:this.state._id,
        }
    }
    Axios.post('/api/setting',Data)
    .then(res=>{
        Toast.fire({
            type: 'success',
            title: 'Setting Updated Successfully',
          })
    })
    .catch(err=>{
        this.setState({errors:err.response.data});
    })
}


render() {
    const {errors} = this.state;
     
    //Client List

    const clientList = this.state.clientList.map((value, index) => {

        return <React.Fragment>
            <div className="col-lg-6">
                <div className="row">
                    <label className="col-lg-2 col-form-label mt-3">Image{index+1}</label>
                    <div className="col-lg-6">
                        <div className="kt-input-icon mt-3">
                            {value.fileName ==="" ?
                            <input type="file"    name="clientList" onChange={(e)=>this.uploadImageBulk(e,index,"clientList")}   className="form-control" placeholder="" />
                        :<button type="button" value={value.fileName}   className="btn btn-success btn-sm mt-1">{value.fileName}</button>}
                            <span className="form-text text-danger">{errors.url}</span>
                            </div>
                            <span className="form-text text-success">{value.uploadstatus}</span>
                            <span className="form-text text-muted">Upload Image Only</span>
                    </div>
                    <div className="col-lg-4 mt-3"> 
                            <button type="button" value={value.fileurl} onClick={() => this.addClient()} className="btn btn-success btn-sm mt-1"><i class="fa fa-plus"></i></button>
                        &nbsp;&nbsp;&nbsp;
                        { this.state.clientList.length > 1 ?<button type="button" value={value.fileurl} onClick={() => this.removeClient(index,value.fileurl)} className="btn btn-danger btn-sm mt-1"><i class="fa fa-trash"></i></button> : null }
                    </div>
                </div>
       </div>
    </React.Fragment>
    })

    const hashImageList = this.state.hashImageList.map((value, index) => {

        return <React.Fragment>
            <div className="col-lg-6">
                <div className="row">
                    <label className="col-lg-2 col-form-label mt-3">Image{index+1}</label>
                    <div className="col-lg-6">
                        <div className="kt-input-icon mt-3">
                            {value.fileName ==="" ?
                            <input type="file" required   name="clientList" onChange={(e)=>this.uploadImageBulk(e,index,"hashImageList")}   className="form-control" placeholder="" />
                        :<button type="button" value={value.fileName}   className="btn btn-success btn-sm mt-1">{value.fileName}</button>}
                            <span className="form-text text-danger">{errors.url}</span>
                            </div>
                            <span className="form-text text-success">{value.uploadstatus}</span>
                            <span className="form-text text-muted">Upload Image Only</span>
                    </div>
                    <div className="col-lg-4 mt-3"> 
                            <button type="button" value={value.fileurl} onClick={() => this.addHash()} className="btn btn-success btn-sm mt-1"><i class="fa fa-plus"></i></button>
                        &nbsp;&nbsp;&nbsp;
                        { this.state.clientList.length > 1 ?<button type="button" value={value.fileurl} onClick={() => this.removeHash(index,value.fileurl)} className="btn btn-danger btn-sm mt-1"><i class="fa fa-trash"></i></button> : null }
                    </div>
                </div>
       </div>
    </React.Fragment>
    })

    const featureList = this.state.featureList.map((value, index) => {
        return <React.Fragment>
            <div class="row mt-2">
                <label className="col-lg-2 col-form-label">Image{index+1}</label>
                    <div className="col-lg-2">
                        <div className="kt-input-icon">
                            {value.fileName ==="" ?
                            <input type="file" required   name="featureList" onChange={(e)=>this.uploadImageBulk(e,index,"featureList")}   className="form-control" placeholder="" />
                        :<button type="button" value={value.fileName}   className="btn btn-success btn-sm mt-1">{value.fileName}</button>}
                            <span className="form-text text-danger">{errors.url}</span>
                            </div>
                            <span className="form-text text-success">{value.uploadstatus}</span>
                            <span className="form-text text-muted">Upload Image Only</span>
                    </div>
                <label className="col-lg-1 col-form-label">Title:</label>
                <div className="col-lg-2">
                    <input type="text" required name="title" onChange={(e)=>this.onhandleChangeFeature(e,index)} value={value.title} className="form-control" placeholder="" />
                </div>
                <label className="col-lg-1 col-form-label">Para Text:</label>
                <div className="col-lg-2">
                    <input type="text" required name="para" onChange={(e)=>this.onhandleChangeFeature(e,index)} value={value.para} className="form-control" placeholder="" />
                </div>
                <div className="col-lg-2 "> 
                            <button type="button" value={value.title} onClick={() => this.addFeature()} className="btn btn-success btn-sm mt-1"><i class="fa fa-plus"></i></button>
                        &nbsp;&nbsp;&nbsp;
                        { this.state.featureList.length > 1 ?<button type="button" value={value.title} onClick={() => this.removeFeature(index,value.title)} className="btn btn-danger btn-sm mt-1"><i class="fa fa-trash"></i></button> : null }
                </div>
            </div>
        </React.Fragment>
    })

    const socialLinksList = this.state.socialLinksList.map((value, index) => {
        return <React.Fragment>
            <div class="row mt-2">
        
                <label className="col-lg-2 col-form-label">Icon Name:</label>
                <div className="col-lg-3">
                    <input type="text" required name="icon" onChange={(e)=>this.onhandleChangeSocial(e,index)} value={value.icon} className="form-control" placeholder="" />
                </div>
                <label className="col-lg-2 col-form-label">Links:</label>
                <div className="col-lg-3">
                    <input type="text" required name="url" onChange={(e)=>this.onhandleChangeSocial(e,index)} value={value.url} className="form-control" placeholder="" />
                </div>
                <div className="col-lg-2 "> 
                            <button type="button" value={value.url} onClick={() => this.addSocial()} className="btn btn-success btn-sm mt-1"><i class="fa fa-plus"></i></button>
                        &nbsp;&nbsp;&nbsp;
                        { this.state.featureList.length > 1 ?<button type="button" value={value.url} onClick={() => this.removeSocial(index,value.url)} className="btn btn-danger btn-sm mt-1"><i class="fa fa-trash"></i></button> : null }
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
              <SubHeader first="Home" second="App Setting" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            App Setting
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                                 <label className="col-lg-2 col-form-label">Application Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="applicationName" onChange={this.onChange} value={this.state.applicationName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.applicationName}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Application Email:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="applicationEmail" onChange={this.onChange} value={this.state.applicationEmail} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.applicationEmail}</span>
                                </div>
                               
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Logo Image:</label>
                                <div className="col-lg-3">
                                    <div className="kt-input-icon">
                                    <input type="file"  name="logoUrl" onChange={(e)=>this.uploadImage(e,"logoUrl")} className="form-control" placeholder="" />
                                    <span className="form-text text-danger">{errors.logoUrl}</span>
                                    </div>
                                    <span className="form-text text-success">{this.state.logoUrlStatus}</span>
                                   {this.state.logoUrl !="" &&<img src={"/static/"+this.state.logoUrl} width={50} />}
                                </div>
                                <label className="col-lg-2 col-form-label">Currency Symbol:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="currency" onChange={this.onChange} value={this.state.currency} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.currency}</span>
                                </div>
                               
                            </div>    
                            <div className="form-group row">
                    
                                <label className="col-lg-2 col-form-label">Contact No:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="contactNo" onChange={this.onChange} value={this.state.contactNo} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.contactNo}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Address:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="address" onChange={this.onChange} value={this.state.address} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.address}</span>
                                </div>
                               
                            </div> 
                             
                        </div> 
                        <Heading heading="Home Section" />
                             <div className="kt-portlet__body">
                                <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Home Background Image:</label>
                                        <div className="col-lg-3">
                                            <div className="kt-input-icon">
                                            <input type="file"  name="homebgUrl" onChange={(e)=>this.uploadImage(e,"homebgUrl")} className="form-control" placeholder="" />
                                            <span className="form-text text-danger">{errors.homebgUrl}</span>
                                            </div>
                                            <span className="form-text text-success">{this.state.homebgUrlStatus}</span>
                                            {this.state.homebgUrl !="" &&<img src={"/static/"+this.state.homebgUrl} width={50} />}
                                        </div>
                                        <label className="col-lg-2 col-form-label">Home Title</label>
                                        <div className="col-lg-3">
                                                <input type="text" name="homeTitle" onChange={this.onChange} value={this.state.homeTitle} className="form-control" placeholder="" />
                                                <span className="form-text text-danger">{errors.homeTitle}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Home Paragraph</label>
                                        <div className="col-lg-3">
                                             <textarea rows={4}  name="homePara" onChange={this.onChange} value={this.state.homePara} className="form-control" placeholder="" ></textarea>

                                                <span className="form-text text-danger">{errors.homePara}</span>
                                        </div>
                                        <label className="col-lg-2 col-form-label">Home Button Text</label>
                                        <div className="col-lg-3">
                                                <input type="text" name="homeBtnText" onChange={this.onChange} value={this.state.homeBtnText} className="form-control" placeholder="" />
                                                <span className="form-text text-danger">{errors.homeBtnText}</span>
                                        </div>
                                    </div> 
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Home Button Path</label>
                                        <div className="col-lg-3">
                                                <input type="text" name="homeBtnPath" onChange={this.onChange} value={this.state.homeBtnPath} className="form-control" placeholder="" />
                                                <span className="form-text text-danger">{errors.homeBtnPath}</span>
                                        </div>
                                    </div> 
                                </div>
                                <Heading heading="About Us Section" />
                                    <div className="kt-portlet__body">
                                            <div className="form-group row">
                                                <label className="col-lg-2 col-form-label">About Heading</label>
                                                <div className="col-lg-3">
                                                        <input type="text" name="aboutHeading" onChange={this.onChange} value={this.state.aboutHeading} className="form-control" placeholder="" />
                                                        <span className="form-text text-danger">{errors.aboutHeading}</span>
                                                </div>
                                                <label className="col-lg-2 col-form-label">About Paragraph</label>
                                                <div className="col-lg-3">
                                                        <textarea rows={4}  name="aboutPara" onChange={this.onChange} value={this.state.aboutPara} className="form-control" placeholder="" ></textarea>
                                                        <span className="form-text text-danger">{errors.aboutPara}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-2 col-form-label">About Cover Image:</label>
                                                <div className="col-lg-3">
                                                    <div className="kt-input-icon">
                                                    <input type="file"  name="aboutCoverUrl" onChange={(e)=>this.uploadImage(e,"aboutCoverUrl")} className="form-control" placeholder="" />
                                                    <span className="form-text text-danger">{errors.aboutCoverUrl}</span>
                                                    </div>
                                                    <span className="form-text text-success">{this.state.aboutCoverUrlStatus}</span>
                                                    {this.state.aboutCoverUrl !="" &&<img src={"/static/"+this.state.aboutCoverUrl} width={50} />}
                                                </div>

                                                <label className="col-lg-2 col-form-label">About Video Url</label>
                                                <div className="col-lg-3">
                                                        <input type="text" name="aboutVideoUrl" onChange={this.onChange} value={this.state.aboutVideoUrl} className="form-control" placeholder="" />
                                                        <span className="form-text text-danger">{errors.aboutVideoUrl}</span>
                                                        <span className="form-text text-muted">Youtube,Vimeo YRL</span>
                                                </div>
                                            </div>                  
                                    </div>   
                                <Heading heading="Clients Section" />
                                    <div className="kt-portlet__body">
                                            <div className="form-group row">
                                                {clientList}   
                                            </div>
                                    </div>
                                <Heading heading="Feature Section" />
                                    <div className="kt-portlet__body">
                                            <div className="form-group row">
                                                <label className="col-lg-2 col-form-label">Feature Background Image:</label>
                                                <div className="col-lg-3">
                                                    <div className="kt-input-icon">
                                                    <input type="file"  name="featurebgUrl" onChange={(e)=>this.uploadImage(e,"featurebgUrl")} className="form-control" placeholder="" />
                                                    <span className="form-text text-danger">{errors.featurebgUrl}</span>
                                                    </div>
                                                    <span className="form-text text-success">{this.state.featurebgUrlStatus}</span>
                                                    {this.state.featurebgUrl !="" &&<img src={"/static/"+this.state.featurebgUrl} width={50} />}
                                                </div>

                                                <label className="col-lg-2 col-form-label">Feature Title</label>
                                                <div className="col-lg-3">
                                                        <input type="text" name="featureTitle" onChange={this.onChange} value={this.state.featureTitle} className="form-control" placeholder="" />
                                                        <span className="form-text text-danger">{errors.featureTitle}</span>
                                                      
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                <label className="col-lg-2 col-form-label">Feature Para</label>
                                                <div className="col-lg-3">
                                                        <textarea rows={4}  name="featurePara" onChange={this.onChange} value={this.state.featurePara} className="form-control" placeholder="" ></textarea>
                                                        <span className="form-text text-danger">{errors.featurePara}</span>   
                                                </div>
                                           
                                            </div>
                                    </div>
                                    <Heading heading="Feature Card Section" />
                                        <div className="kt-portlet__body">
                                                <div className="form-group row">
                                                    {featureList}
                                                </div>
                                        </div>
                                    <Heading heading="Banner Section" />
                                    <div className="kt-portlet__body">
                                         <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Banner Background Image:</label>
                                        <div className="col-lg-3">
                                            <div className="kt-input-icon">
                                            <input type="file"  name="bannerBgUrl" onChange={(e)=>this.uploadImage(e,"bannerBgUrl")} className="form-control" placeholder="" />
                                            <span className="form-text text-danger">{errors.bannerBgUrl}</span>
                                            </div>
                                            <span className="form-text text-success">{this.state.bannerBgUrlStatus}</span>
                                            {this.state.bannerBgUrl !="" &&<img src={"/static/"+this.state.bannerBgUrl} width={50} />}
                                        </div>
                                        <label className="col-lg-2 col-form-label">Banner Title</label>
                                        <div className="col-lg-3">
                                                <input type="text" name="bannerText" onChange={this.onChange} value={this.state.bannerText} className="form-control" placeholder="" />
                                                <span className="form-text text-danger">{errors.bannerText}</span>
                                        </div>
                                    </div>
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Banner Paragraph</label>
                                        <div className="col-lg-3">
                                             <textarea rows={4}  name="bannerPara" onChange={this.onChange} value={this.state.bannerPara} className="form-control" placeholder="" ></textarea>

                                                <span className="form-text text-danger">{errors.bannerPara}</span>
                                        </div>
                                        <label className="col-lg-2 col-form-label">Banner Button Text</label>
                                        <div className="col-lg-3">
                                                <input type="text" name="bannerBtnText" onChange={this.onChange} value={this.state.bannerBtnText} className="form-control" placeholder="" />
                                                <span className="form-text text-danger">{errors.bannerBtnText}</span>
                                        </div>
                                    </div> 
                                    <div className="form-group row">
                                        <label className="col-lg-2 col-form-label">Banner Button Path</label>
                                        <div className="col-lg-3">
                                                <input type="text" name="bannerBtnPath" onChange={this.onChange} value={this.state.bannerBtnPath} className="form-control" placeholder="" />
                                                <span className="form-text text-danger">{errors.bannerBtnPath}</span>
                                        </div>
                                    </div> 
                                </div>
                                <Heading heading="HashTag Section" />
                                    <div className="kt-portlet__body">
                                            <div className="form-group row">
                                                <label className="col-lg-2 col-form-label">Hashtag Text</label>
                                                <div className="col-lg-3">
                                                        <input type="text" name="hashtag" onChange={this.onChange} value={this.state.hashtag} className="form-control" placeholder="" />
                                                        <span className="form-text text-danger">{errors.hashtag}</span>
                                                </div>
                                            </div>
                                            <div className="form-group row">
                                                {hashImageList}
                                            </div>
                                    </div>
                                <Heading heading="Footer Section" />
                                    <div className="kt-portlet__body">
                                                <div className="form-group row">
                                                    <label className="col-lg-2 col-form-label">Footer Text</label>
                                                    <div className="col-lg-3">
                                                            <input type="text" name="footerText" onChange={this.onChange} value={this.state.footerText} className="form-control" placeholder="" />
                                                            <span className="form-text text-danger">{errors.footerText}</span>
                                                    </div>
                                                    <label className="col-lg-2 col-form-label">Contact Text</label>
                                                    <div className="col-lg-3">
                                                            <input type="text" name="contactText" onChange={this.onChange} value={this.state.contactText} className="form-control" placeholder="" />
                                                            <span className="form-text text-danger">{errors.contactText}</span>
                                                    </div>
                                                </div>
                                                <div className="form-group row">
                                                    {socialLinksList}
                                                </div>
                                    </div>
                                <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                                    <div className="kt-form__actions">
                                    <div className="row">
                                    <div className="col-lg-3 d-flex justify-content-start">
                                    {checkPermission(this.props.auth,"SETTING","UPDATE") &&<button type="submit" className={`btn btn-success`}>Submit</button>}
                                    
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

AddSetting.propTypes ={
    auth: PropTypes.object.isRequired,
}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
});
  
export default connect(mapStateToProps,{})(AddSetting);