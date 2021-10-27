import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editTeam} from '../../../actions/teamAction';

import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditTeam extends Component {
  constructor(){
    super();
    this.state={
        errors:{},
        uploadStatus:'',
        photoUrl:'',
        name:'',
        nameAr:'',
        position:'',
        positionAr:'',
        visiblity:'',
        storeID:'',
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}

//set all the values to input fields
componentDidMount(){
  
    var editResult={}
    if(!localStorage.editteam){
        this.props.history.push('/admin/listteam')

    }else{
        editResult=JSON.parse(localStorage.getItem('editteam'))
    }
    this.setState({
        _id:editResult._id,
        photoUrl   :   editResult.photoUrl,
        name: editResult.name,
        nameAr: editResult.nameAr,
        position: editResult.position,
        positionAr: editResult.positionAr,
        visiblity:   editResult.visiblity,  //visible,hidden
        storeID:editResult.storeID, 

    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.team.editteam !== this.props.team.editteam){
        Toast.fire({
            type: 'success',
            title: 'Team Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/listteam');
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

//onchange state value for team
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
//submit data to server
onSubmit(e){
    e.preventDefault();
    const teamData ={
        photoUrl   :   this.state.photoUrl,
        name: this.state.name,
        nameAr: this.state.nameAr,
        position: this.state.position,
        positionAr: this.state.positionAr,
        visiblity:   this.state.visiblity,  //visible,hidden
        storeID:this.state.storeID, 
        _id:this.state._id
    }
    this.props.editTeam(teamData);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        uploadStatus:'',
        photoUrl:'',
        name:'',
        nameAr:'',
        position:'',
        positionAr:'',
        visiblity:'',
        storeID:'',
    })
}

render() {
    const {errors} = this.state;
    const {teamloading} = this.props.team;

   

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
              <SubHeader first="Home" second="Edit Team" third="Edit Team"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Edit Team
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                          
                                <label className="col-lg-2 col-form-label">Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="name" onChange={this.onChange} value={this.state.name} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.name}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Name Arabic:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="nameAr" onChange={this.onChange} value={this.state.nameAr} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.nameAr}</span>
                                </div>
                               
                            </div>
                            <div className="form-group row">
                          
                                <label className="col-lg-2 col-form-label">Position:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="position" onChange={this.onChange} value={this.state.position} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.position}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Position Arabic:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="positionAr" onChange={this.onChange} value={this.state.positionAr} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.positionAr}</span>
                                </div>
                               
                            </div>

                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Upload  Image:</label>
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
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${teamloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

EditTeam.propTypes ={
  auth: PropTypes.object.isRequired,
  editTeam: PropTypes.func.isRequired,
 
}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    team :state.team,
    store:state.store
});

export default connect(mapStateToProps,{editTeam})(EditTeam);