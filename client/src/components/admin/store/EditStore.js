import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editStore} from '../../../actions/storeAction';
import {listPlan} from '../../../actions/planAction';
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditStore extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       _id:'',
       uploadStatus:'',
       storeName:'',
       storeLogo:'',
       storeEmail:'',
       password:'',
       latitude:'',
       longitude:'',
       phoneNumber:'',
       theme:'',
       planID:'',
       expireAt:'',
       expireAtOriginal:'',
       visiblity:'',
       address:'',
       description:'',
       passwordChange:false,
       country:"",
       state:""
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}

//set all the values to input fields
componentDidMount(){
    this.props.listPlan()
    var editResult={}
    if(!localStorage.editstore){
        this.props.history.push('/admin/liststore')

    }else{
        editResult=JSON.parse(localStorage.getItem('editstore'))
    }
    this.setState({
        _id:editResult._id,
        storeName:editResult.storeName,
        storeLogo:editResult.storeLogo,
        storeEmail:editResult.storeEmail,
       // password:editResult.password,
        latitude:editResult.latitude,
        longitude:editResult.longitude,
        phoneNumber:editResult.phoneNumber,
        theme:editResult.theme,
        planID:editResult.planID,
        expireAt:editResult.expireAt,
        expireAtOriginal:editResult.expireAt,
        visiblity:editResult.visiblity,
        address:editResult.address,
        country:editResult.country,
        state:editResult.state,
        description:editResult.description

    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.store.editstore !== this.props.store.editstore){
        Toast.fire({
            type: 'success',
            title: 'Store Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/liststore');
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

//onchange state value for store
onChange(e){
    this.setState({[e.target.name]:e.target.value}) 
    if(e.target.name==='password'){
        this.setState({
            passwordChange:true
        })
    }
}

onPlanChange(e){
    if(e.target.value !=""){
        const {listplan,planloading}=this.props.plan;
        const filterData=listplan.find(x=>x._id===e.target.value)
        var selectedplanID=e.target.value
        if(filterData){
            //Date Difference
            var d = new Date();
            var dateSplit=this.state.expireAtOriginal.split("-")
            var date2 = new Date(`${dateSplit[1]}/${dateSplit[0]}/${dateSplit[2]}`); 
            // To calculate the time difference of two dates 
            var Difference_In_Time = date2.getTime() - d.getTime(); 
            // To calculate the no. of days between two dates 
            var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
            if(filterData.type==="month"){
                d.setMonth(d.getMonth() + 1); 
            }else if(filterData.type==="year"){
                d.setMonth(d.getMonth() + 12); 
            }  
            d.setDate(d.getDate() + parseInt(Difference_In_Days)); 
            var month = '' + (d.getMonth() + 1);
            var day = '' + d.getDate();
            var year = d.getFullYear();
            if (month.length < 2) 
                month = '0' + month;
            if (day.length < 2) 
                day = '0' + day;
        var current=[day, month,year].join('-'); 
        console.log("curre daaa Out",current)
          if(Difference_In_Days>=7){
           
            swal.fire({
                title: 'Are you sure?',
                text: `Current Plan already Available for  next ${parseInt(Difference_In_Days)} Days!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Upgrade it!'
              }).then((result) => {
                console.log("Curr inside IF", result)
               
                if (result.value) {
                    console.log("curre daaa",current)
                    this.setState({
                        planID:selectedplanID,
                        expireAt:current
                    })
                }
              })
            
          }else{
            swal.fire({
                title: 'Are you sure?',
                text: `Current Plan going to expire ${parseInt(Difference_In_Days)} Days!`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, Upgrade it!'
              }).then((result) => {
                if (result.value) {
                    this.setState({
                        planID:selectedplanID,
                        expireAt:current
                    })
                }
              })
          }
            
            
        }
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
            storeLogo:response.data.file,
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
    var  editResult=JSON.parse(localStorage.getItem('editstore'))
    const storeData ={
        storeName:this.state.storeName,
        storeLogo:this.state.storeLogo,
        storeEmail:this.state.storeEmail,
        password:this.state.passwordChange ?this.state.password :editResult.password ,
        latitude:this.state.latitude,
        longitude:this.state.longitude,
        phoneNumber:this.state.phoneNumber,
        theme:this.state.theme,
        planID:this.state.planID,
        expireAt:this.state.expireAt,
        visiblity:this.state.visiblity,
        address:this.state.address,
        country:this.state.country,
        state:this.state.state,
        description:this.state.description,
        _id:this.state._id,
        passwordChange:this.state.passwordChange
    }
    this.props.editStore(storeData);
}
//Reset all statevalues
onReset(){
    this.setState({
      errors:{},
      storeName:'',
      storeLogo:'',
      storeEmail:'',
      password:'',
      latitude:'',
      longitude:'',
      phoneNumber:'',
      theme:'',
      planID:'',
      expireAt:'',
      visiblity:'',
      address:'',
      description:''
    })
}

selectCountry (val) {
    this.setState({ country: val });
  }
 
  selectRegion (val) {
    this.setState({ state: val });
  }

render() {
    const {errors} = this.state;
    const {storeloading} = this.props.store;
    console.log("this.state.expireAT",this.state.expireAt)
     //plan list
     const {listplan,planloading}=this.props.plan;

     var optionResult=[];
     if(listplan==null ||planloading){
         optionResult=(<option value="">Loading...</option>)
     }else{
         if(Object.keys(listplan).length >0){
             optionResult= listplan.map(result=>{
                 return <option value={result._id}>{result.planName} ({result.type})</option>
             })
         }else{
             optionResult=(<option value="">No Plan Found...</option>)
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
              <SubHeader first="Home" second="List Restaurant" third="Edit Store"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add Restaurant
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                   {/*begin::Form*/}
                   <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Store Name:</label>
                            <div className="col-lg-3">
                                <input type="text" name="storeName" onChange={this.onChange} value={this.state.storeName} className="form-control" placeholder="" />
                                <span className="form-text text-danger">{errors.storeName}</span>
                            </div>
                            <label className="col-lg-2 col-form-label">Upload Store Logo:</label>
                            <div className="col-lg-3">
                                <div className="kt-input-icon">
                                <input type="file"  name="image" onChange={this.uploadImage}   className="form-control" placeholder="" />
                                <span className="form-text text-danger">{errors.storeLogo}</span>
                                </div>
                                <span className="form-text text-success">{this.state.uploadStatus}</span>
                                <span className="form-text text-muted">File Resolution (292px X 69px)</span>
                                <img src={'/static/'+this.state.storeLogo} width={50} />
                            </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Store Email:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="storeEmail" onChange={this.onChange} value={this.state.storeEmail} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.storeEmail}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Password:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="password" onChange={this.onChange} value={this.state.password} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.password}</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Latitude:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="latitude" onChange={this.onChange} value={this.state.latitude} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.latitude}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Longitude:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="longitude" onChange={this.onChange} value={this.state.longitude} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.longitude}</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Phone Number:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="phoneNumber" onChange={this.onChange} value={this.state.phoneNumber} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.phoneNumber}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Theme:</label>
                                <div className="col-lg-3">
                                        <select  name="theme" onChange={this.onChange} value={this.state.theme} className="form-control" placeholder="" >
                                            <option value="">Select Theme</option>
                                            <option value="default">Default</option>
                                        </select>
                                        <span className="form-text text-danger">{errors.theme}</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Select Plan:</label>
                                <div className="col-lg-3">
                                <select  name="planID" onChange={(e)=>this.onPlanChange(e)} value={this.state.planID} className="form-control" placeholder="" >
                                            <option value="">Select Plan</option>
                                            {optionResult}
                                </select>
                                        <span className="form-text text-danger">{errors.phoneNumber}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Expired At:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="expireAt" readOnly value={this.state.expireAt} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.expireAt}</span>
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
                                <label className="col-lg-2 col-form-label">Address:</label>
                                <div className="col-lg-3">
                                        <textarea rows={3} name="address" onChange={this.onChange} value={this.state.address} className="form-control" placeholder="" ></textarea>
                                        <span className="form-text text-danger">{errors.address}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Country:</label>
                                <div className="col-lg-3">
                                    <CountryDropdown
                                        classes="form-control"
                                        value={this.state.country}
                                        onChange={(val) => this.selectCountry(val)} />
                                        <span className="form-text text-danger">{errors.country}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">State:</label>
                                <div className="col-lg-3">
                                        <RegionDropdown
                                        classes="form-control"
                                            country={this.state.country}
                                            value={this.state.state}
                                            onChange={(val) => this.selectRegion(val)} />
                                        <span className="form-text text-danger">{errors.state}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                    
                                <label className="col-lg-2 col-form-label">Description:</label>
                                <div className="col-lg-3">
                                        <textarea rows={3} name="description" onChange={this.onChange} value={this.state.description} className="form-control" placeholder="" ></textarea>
                                        <span className="form-text text-danger">{errors.description}</span>
                                </div>
                            </div>
                           
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${storeloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

EditStore.propTypes ={
  auth: PropTypes.object.isRequired,
  editStore: PropTypes.func.isRequired,
  listPlan:PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    store :state.store,
    plan:state.plan
});

export default connect(mapStateToProps,{editStore,listPlan})(EditStore);