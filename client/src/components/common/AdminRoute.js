import React from 'react'
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {menuList,checkPermission} from '../common/MenuList'

const PrivateRoute = ({component: Component, auth,menu,action, ...rest}) => (
    <Route 
    {...rest}
    render = {props =>{
        if(auth.isAuthenticated === true && auth.user.userType ==='admin'&& menu && action &&  checkPermission(auth,menu,action)){
            return   <Component {...props} />
        }else if(auth.isAuthenticated === true && auth.user.userType ==='admin'&& !menu && !action){
            return   <Component {...props} />
        }
        else if(auth.isAuthenticated === true && menu && action && !checkPermission(auth,menu,action)){
            return <Redirect to="/admin/error" />
        }else{
            return <Redirect to="/admin/login" /> 
        }
        // return   auth.isAuthenticated === true && auth.user.userType ==='admin'  ? (
        //      <Component {...props} />
        // ) : (
        //     <Redirect to="/admin/login" />
        // )
    }}
    />
);

PrivateRoute.propTypes = {
    auth:PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
