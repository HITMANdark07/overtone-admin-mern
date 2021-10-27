import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter,Link} from 'react-router-dom';
import { loginAdmin } from '../../actions/authAction';
import { ToastContainer, toast } from 'react-toastify';
import Axios from 'axios';
import AuthLeft from './AuthLeft';


class Login extends Component {
  constructor(){
    super();
    this.state={
      name: '',
      email:'',
      mobile:'',
      password:'',
      password2:'',
      securityQn:'',
      hint:'',
      errors:{},
      userType:'',
     errors:{}
    
    }
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    

}

componentDidMount(){
 Axios.get('/api/setting/')
 .then(result=>{
   localStorage.setItem("currency",result.data.currency)
 })
  if(this.props.auth.isAuthenticated && this.props.auth.user.userType=="admin"){
  //  window.location='/dashboard';
  this.props.history.push('/admin/dashboard')
  }
}

componentWillReceiveProps(nextProps){
  if(nextProps.auth.isAuthenticated){
    this.props.history.push('/admin/dashboard')
  }

  if(nextProps.errors){
    this.setState({errors:nextProps.errors});
  }
}

onChange(e){
  this.setState({[e.target.name]:e.target.value})
}
////////////////////////////////LOGIN SUBMIT//////////////////////////////////////////////////////
onSubmit(e){
  e.preventDefault();
  this.setState({errors:{}})
  const userData ={
      email: this.state.email,
      password: this.state.password,
  }
this.props.loginAdmin(userData,this.props.history);
}

render() {
    const {errors} =this.state;
    const {isAuthenticated} = this.props.auth;
   
    return (
      <div className="kt-grid kt-grid--ver kt-grid--root">
        <div className="kt-grid kt-grid--hor kt-grid--root  kt-login kt-login--v1" id="kt_login">
          <div className="kt-grid__item kt-grid__item--fluid kt-grid kt-grid--desktop kt-grid--ver-desktop kt-grid--hor-tablet-and-mobile">
          <AuthLeft />
            {/*begin::Content*/}
            <div className="kt-grid__item kt-grid__item--fluid  kt-grid__item--order-tablet-and-mobile-1  kt-login__wrapper">
             
              {/*begin::Body*/}
              <div className="kt-login__body">
                {/*begin::Signin*/}
                <div className="kt-login__form">
                  <div className="kt-login__title">
                    <h3>Sign In to Admin</h3>
                  </div>
                  {/*begin::Form*/}
                  <form className="kt-form"  onSubmit={this.onSubmit}>
                    <div className="form-group">
                    <input className="form-control" name="email" type="text" onChange={this.onChange} placeholder="email"  autoComplete="off" />
                      <small className="text-danger">{errors.email}</small>
                    </div>
                    <div className="form-group">
                    <input className="form-control form-control-last"  name="password" onChange={this.onChange} type="Password" placeholder="Password" name="password" />
                       <small className="text-danger">{errors.password}</small>
                    </div>
                    {/*begin::Action*/}
                    <div className="kt-login__actions">
                      <Link to="/admin/forget" className="kt-link kt-login__link-forgot">
                        Forgot Password ?
                      </Link>
                      <button type="submit"  className="btn btn-primary btn-elevate kt-login__btn-primary">Sign In</button>
                    </div>
                    {/*end::Action*/}
                  </form>
                  {/*end::Form*/}
                
                 
                  {/*end::Options*/}
                </div>
                {/*end::Signin*/}
              </div>
              {/*end::Body*/}
            </div>
            {/*end::Content*/}
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  loginAdmin: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export default connect(mapStateToProps,{loginAdmin})(withRouter(Login));
