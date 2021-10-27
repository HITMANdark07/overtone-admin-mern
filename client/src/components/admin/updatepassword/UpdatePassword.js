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
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class UpdatePassword extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       password:'',
       password2:'',
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage=this.uploadImage.bind(this);
}
componentDidMount(){

}



componentWillReceiveProps(nextProps){
    console.log("errors out",nextProps.errors);
    if(nextProps.errors !== this.props.errors){
        console.log("errors",nextProps.errors);
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
                logoUrl:response.data.file,
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

    var Data ={
        password   :   this.state.password,
        password2 :   this.state.password2,
    }
    Axios.post('/api/admin/update',Data)
    .then(res=>{
        Toast.fire({
            type: 'success',
            title: 'Password Updated Successfully',
          })
    })
    .catch(err=>{
        this.setState({errors:err.response.data});
    })
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        password:'',
        password2:'',
    })
}

render() {
    const {errors} = this.state;
   console.log("errors",errors);

   
  
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
              <SubHeader first="Home" second="Update Password" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Update Password
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                                 <label className="col-lg-2 col-form-label">Password:</label>
                                <div className="col-lg-3">
                                        <input type="password" name="password" onChange={this.onChange} value={this.state.password} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.password}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Confirm Password:</label>
                                <div className="col-lg-3">
                                        <input type="password" name="password2" onChange={this.onChange} value={this.state.password2} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.password2}</span>
                                </div>
                            </div>                   
                           
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-start">
                                <button type="submit" className={`btn btn-success`}>Submit</button>
                              
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

UpdatePassword.propTypes ={
    auth: PropTypes.object.isRequired,
}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
});
  
export default connect(mapStateToProps,{})(UpdatePassword);