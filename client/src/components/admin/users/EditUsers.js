import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editUser} from '../../../actions/userAction';
import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditUsers extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       _id:'',
       name:'',
       email:'',
       mobile:'',
       password:'',
       password2:''
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}

//set all the values to input fields
componentDidMount(){
    var editResult={}
    if(!localStorage.edituser){
        this.props.history.push('/listusers')

    }else{
        editResult=JSON.parse(localStorage.getItem('edituser'))
    }
    this.setState({
        _id:editResult._id,
        name:editResult.name,
        email:editResult.email,
        mobile:editResult.mobile,
        password:editResult.password,
    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.user.edituser !== this.props.user.edituser){
        Toast.fire({
            type: 'success',
            title: 'User Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/listuser');
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

//onchange state value for user
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
            userImage:response.data,
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
    const userData ={
        name:this.state.name,
        email:this.state.email,
        mobile:this.state.mobile,
        _id:this.state._id
    }
    this.props.editUser(userData);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
       name:'',
       email:'',
       mobile:'',
       password:'',
       password2:''
    })
}

render() {
    const {errors} = this.state;
    const {userloading} = this.props.user;
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
              <SubHeader first="Home" second="List Users" link='/listusers' third="Edit Users"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add Users
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Users Name:</label>
                            <div className="col-lg-3">
                                <input type="text" name="name" onChange={this.onChange} value={this.state.name} className="form-control" placeholder="" />
                                <span className="form-text text-danger">{errors.name}</span>
                            </div>

                            <label className="col-lg-2 col-form-label">Email:</label>
                            <div className="col-lg-3">
                                <input type="text" name="email" onChange={this.onChange} value={this.state.email} className="form-control" placeholder="" />
                                <span className="form-text text-danger">{errors.email}</span>
                            </div>
                           
                            </div>
                            <div className="form-group row">
                            <label className="col-lg-2 col-form-label">Mobile:</label>
                            <div className="col-lg-3">
                                <input type="text" name="mobile" onChange={this.onChange} value={this.state.mobile} className="form-control" placeholder="" />
                                <span className="form-text text-danger">{errors.mobile}</span>
                            </div>

                            
                           
                            </div>
                           
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${userloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
                                <button  type="button" onClick={this.onReset} className="btn btn-secondary">Clear</button>
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

EditUsers.propTypes ={
  auth: PropTypes.object.isRequired,
  editUser: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    user :state.user
});

export default connect(mapStateToProps,{editUser})(EditUsers);