import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {Forgetpassword} from '../../actions/authAction';
import AuthLeft from './AuthLeft';

class Forget extends Component {
  constructor(){
        super();
        this.state={
         mobile:'',
         errors:{}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
   }

componentDidMount(){
  if(this.props.auth.isAuthenticated){
    this.props.history.push('/addlocation');
  }
}

componentWillReceiveProps(nextProps){
  if(nextProps.auth.isAuthenticated){
    this.props.history.push('/addlocation');
  }

  if(nextProps.errors){
    this.setState({errors:nextProps.errors});
  }
}
onChange(e){
  this.setState({[e.target.name]:e.target.value})
}

onSubmit(e){
  e.preventDefault();
  const userData ={
      mobile: this.state.mobile,
  }
  this.props.Forgetpassword(userData,this.props.history);
}

render() {
    const {errors} = this.state;
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
                    <h3>Forgot Password</h3>
                  </div>
                  {/*begin::Form*/}
                  <form className="kt-form" onSubmit={this.onSubmit}>
              <div className="form-group">
                <input className="form-control" name="email" type="text" onChange={this.onChange} placeholder="Enter your Registered Email"  autoComplete="off" />
                <small className="text-danger">{errors.email}</small>
              </div>
              
              <div className="kt-login__actions">
                 <button type="submit"  className="btn btn-primary btn-elevate kt-login__btn-primary">Sign In</button>
              </div>
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

Forget.propTypes = {
  Forgetpassword: PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  errors:PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps,{Forgetpassword})(Forget);