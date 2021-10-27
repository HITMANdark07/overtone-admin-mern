import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {listAdmin,deleteAdmin} from '../../../actions/adminAction'
import swal from 'sweetalert2';
import SearchInput, {createFilter} from 'react-search-input';
import {checkPermission} from '../../common/MenuList'
const KEYS_TO_FILTERS = ['name','email','mobile'];
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});


class ListAdmins extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       searchTerm: '',

  
    }   
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
}
componentDidMount(){
  this.props.listAdmin();
}

searchUpdated (term) {
  this.setState({searchTerm: term})
}
//calls when edit button is clicked
onEditClick(res){
  localStorage.setItem('editadmin',JSON.stringify(res))
  this.props.history.push('editadmin')
}
//calls when delete button is clicked
onDeleteClick(id){
  const deleteData={
      id:id
  }
  this.props.deleteAdmin(deleteData)
}
componentWillReceiveProps(nextProps){
 
  if(nextProps.admin.deleteadmin !== this.props.admin.deleteadmin){
      Toast.fire({
          type: 'success',
          title: 'Admin Deleted Successfully',
        }).then(getResult=>{
          this.props.listAdmin();
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

render() {
  const {listadmin,adminloading}=this.props.admin;
  var tableResult;
  if(listadmin==null ||adminloading){
      tableResult=(<tr><td colSpan={4} className="text-center">Loading.....</td></tr>)
  }else{
      if(Object.keys(listadmin).length >0){
        var filterData= listadmin.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))

          tableResult=filterData.map(result=>{
                  return <tr>
                  <td>{result.name}</td>
                  <td>{result.email}</td>
                  <td>{result.mobile}</td>
                   <td>{result.role && result.role.roleName}</td>
                  <td>
                    {checkPermission(this.props.auth,"ADMIN","UPDATE")&&
                    <button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">Edit</span>
                    </button>}
                    </td>
                  <td>
                  {checkPermission(this.props.auth,"ADMIN","DELETE")&&
                    <button  className="btn btn-link" onClick={()=>this.onDeleteClick(result._id)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">Delete</span>
                    </button>}
                  </td>
              </tr>
          })
      }else{
          tableResult=(<tr><td colSpan={7} className="text-center">No Record Found.....</td></tr>)
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
              <SubHeader first="Home" second="List Admins" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head kt-portlet__head--lg">
                            <div className="kt-portlet__head-label">
                                <span className="kt-portlet__head-icon">
                                <i className="kt-font-brand flaticon2-line-chart" />
                                </span>
                                <h3 className="kt-portlet__head-title">
                            List Admins
                                </h3>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12">
                                    <SearchInput  placeholder="Search" onChange={this.searchUpdated} className="search-input" />
                        </div>
                        <div className="kt-portlet__body">
                        {/*begin: Datatable */}
                        <table className="table table-striped- table-bordered table-hover table-checkable" id="kt_table_1">
                            <thead>
                            <tr>
                                <th>Admin Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                  {tableResult}                   
                                 
                            </tbody>
                            <tfoot>
                                <tr>
                                <th>Admin Name</th>
                                <th>Email</th>
                                <th>Mobile</th>
                                <th>Role</th>
                                <th>Edit</th>
                                <th>Delete</th>
                                </tr>
                            </tfoot>
                        </table>
                        {/*end: Datatable */}
                        </div>
                    </div>
                
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

ListAdmins.propTypes ={
    auth: PropTypes.object.isRequired,
    listAdmin: PropTypes.func.isRequired,
    deleteAdmin: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
  auth : state.auth,
  errors: state.errors,
  admin :state.admin
});

export default connect(mapStateToProps,{listAdmin,deleteAdmin})(ListAdmins);