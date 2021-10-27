import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {editRole} from '../../../actions/roleAction';
import {menuList} from '../../common/MenuList'

import swal from 'sweetalert2';
import axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });
class EditRole extends Component {
  constructor(){
    super();
    this.state={
        errors:{},
        roleName:'',
        permissionList:menuList,
        isEnabled:'',
        _id:""
    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
}

//set all the values to input fields
componentDidMount(){
   
    var editResult={}
    if(!localStorage.editrole){
        this.props.history.push('/admin/listrole')

    }else{
        editResult=JSON.parse(localStorage.getItem('editrole'))
    }
    this.setState({
        _id:editResult._id,
        roleName:editResult.roleName,
        permissionList:editResult.permissionList ?JSON.parse(editResult.permissionList):menuList ,
        isEnabled:editResult.isEnabled

    })
}

componentWillReceiveProps(nextProps){
 
    if(nextProps.role.editrole !== this.props.role.editrole){
        Toast.fire({
            type: 'success',
            title: 'Role Edited Successfully',
          }).then(navigate=>{
            this.props.history.push('/admin/listrole');
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

//onchange state value for role
onChange(e){
    this.setState({[e.target.name]:e.target.value}) 
}
onCheckBox = (index,name,value) =>{
    const temp=this.state.permissionList;
    temp[index][name]= !value;
    this.setState({
        permissionList:temp
    })
    console.log("temp value",temp)
}
onCheckRow = (name) =>{
    const temp=this.state.permissionList;
    temp.map((result,index)=>{
       if(name==="CREATE"){
        temp[index]["CREATE"]=!result.CREATE;
       }
       
    })
    this.setState({
        permissionList:temp
    })
   
}

//submit data to server
onSubmit(e){
    e.preventDefault();
    const roleData ={
        roleName   :   this.state.roleName,
        permissionList   :   JSON.stringify(this.state.permissionList),
        isEnabled :   this.state.isEnabled,
        _id:this.state._id
    }
    this.props.editRole(roleData);
}
//Reset all statevalues
onReset(){
    this.setState({
        errors:{},
        roleName:'',
        permissionList:menuList,
        isEnabled:''
    })
   
}

render() {
    const {errors,permissionList} = this.state;
    const {roleloading} = this.props.role;
 
    //Render Permission permissionList
    var permissionRender=permissionList.map((result,index)=>{
        return <tr>
                 <td><h6>{result.label}</h6></td>
                 <td><input type="checkbox" checked={result.CREATE} onChange={()=>this.onCheckBox(index,"CREATE",result.CREATE)} /></td>
                 <td><input type="checkbox" checked={result.READ} onChange={()=>this.onCheckBox(index,"READ",result.READ)}/></td>
                 <td><input type="checkbox" checked={result.UPDATE} onChange={()=>this.onCheckBox(index,"UPDATE",result.UPDATE)}/></td>
                 <td><input type="checkbox" checked={result.DELETE} onChange={()=>this.onCheckBox(index,"DELETE",result.DELETE)}/></td>

        </tr>
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
              <SubHeader first="Home" second="Edit Role" third="Edit Role"/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Edit Role
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                    <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmit}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                          
                                <label className="col-lg-2 col-form-label">Role Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" name="roleName" onChange={this.onChange} value={this.state.roleName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.roleName}</span>
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
                            <span className="form-text text-danger">{errors.permissionList}</span>
                            <div className="form-group row">
                                <table className="table table-striped table-bordered table-hover table-checkable">
                                <thead>
                                <tr>
                                    <th>Menu</th>
                                    <th>Create 
                                        {/* <br/> <input type="checkbox"  onChange={()=>this.onCheckRow("CREATE")} /> */}
                                    </th>
                                    <th>Read 
                                        {/* <br/> <input type="checkbox"  onChange={()=>this.onCheckRow("READ")} /> */}
                                    </th>
                                    <th>Update 
                                        {/* <br/> <input type="checkbox"  onChange={()=>this.onCheckRow("UPDATE")} /> */}
                                    </th>
                                    <th>Delete 
                                        {/* <br/> <input type="checkbox"  onChange={()=>this.onCheckRow("DELETE")} /> */}
                                    </th>
                                   
                                </tr>
                                </thead>
                                <tbody>
                                    {permissionRender}                   
                                    
                                </tbody>
                                <tfoot>
                                    <tr>
                                    <th>Menu</th>
                                    <th>Create </th>
                                    <th>Read</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                    </tr>
                                </tfoot>
                            </table>
                            </div>   
                                                    
                           
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${roleloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
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

EditRole.propTypes ={
  auth: PropTypes.object.isRequired,
  editRole: PropTypes.func.isRequired,


}

const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    role :state.role,
    store:state.store


});

export default connect(mapStateToProps,{editRole})(EditRole);