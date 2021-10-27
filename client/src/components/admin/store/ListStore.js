import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {listStore,deleteStore} from '../../../actions/storeAction'
import swal from 'sweetalert2';
import SearchInput, {createFilter} from 'react-search-input';
const KEYS_TO_FILTERS = ['storeName','storeEmail','phoneNumber','plan','planName','expireAt','visiblity','address','description'];
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});


class ListStore extends Component {
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
  this.props.listStore();
}

//calls when edit button is clicked
onEditClick(res){
  localStorage.setItem('editstore',JSON.stringify(res))
  this.props.history.push('/admin/editstore')
}
//calls when delete button is clicked
onDeleteClick(id){
  const deleteData={
      id:id
  }
  this.props.deleteStore(deleteData)
}
searchUpdated (term) {
    this.setState({searchTerm: term})
}
componentWillReceiveProps(nextProps){
 
  if(nextProps.store.deletestore !== this.props.store.deletestore){
      Toast.fire({
          type: 'success',
          title: 'Store Deleted Successfully',
        }).then(getResult=>{
          this.props.listStore();
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

onViewQR(result){
  this.props.history.push(`/admin/viewstoreqr?storeID=${result._id}&storeName=${result.storeName}`)
}

render() {
  const {liststore,storeloading}=this.props.store;
  var tableResult;
  if(liststore==null ||storeloading){
      tableResult=(<tr><td colSpan={6} className="text-center">Loading.....</td></tr>)
  }else{
      if(Object.keys(liststore).length >0){
        var filterData= liststore.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
          tableResult=filterData.map(result=>{
                  return <tr>
                  <td>{result.storeName}</td>
                  <td><img src={'/static/'+result.storeLogo} width={50} height={50} /></td>
                  <td>{result.qrScanned}</td>     
                  <td><button className="btn btn-link" onClick={()=>this.onViewQR(result)}>View QR</button></td>                  
                  <td>{result.storeEmail}</td>
                  <td><a href={`https://maps.google.com/?q=${result.latitude},${result.longitude}`} target="_blank">View On Map </a></td>
                  <td>{result.phoneNumber}</td>
                  <td>{result.plan.planName}</td>
                  <td>{result.expireAt}</td>
                  <td>{result.visiblity}</td>
                  <td><button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span></button></td>
                  <td><button  className="btn btn-link" onClick={()=>this.onDeleteClick(result._id)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">Delete</span></button></td>
              </tr>
          })
      }else{
          tableResult=(<tr><td colSpan={6} className="text-center">No Record Found.....</td></tr>)
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
              <SubHeader first="Home" second="List Restaurant" third=""/>
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
                            List Restaurant
                                </h3>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12">
                                    <SearchInput  placeholder="Search by Name,Email,Description,Phone Number,Address" onChange={this.searchUpdated} className="search-input" />
                        </div>
                        <div className="kt-portlet__body" style={{overflowX:"scroll"}}>
                        {/*begin: Datatable */}
                        <table className="table table-striped- table-bordered table-hover table-checkable">
                            <thead>
                            <tr>
                                <th>Store Name</th>
                                <th>Store Logo</th>
                                <th>Qr-Scanned</th>
                                <th>View Qr</th>                             
                                <th>Store Email</th>
                                <th>View on Map</th>
                                <th>Phone.No</th>
                                <th>Plan Name</th>
                                <th>Expire At</th>
                                <th>Visiblity</th>
                                <th>View/Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                  {tableResult}                   
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                <th>Store Name</th>
                                <th>Store Logo</th>
                                <th>Qr-Scanned</th>  
                                <th>Store Email</th>
                                <th>View on Map</th>
                                <th>Phone.No</th>
                                <th>Plan Name</th>
                                <th>Expire At</th>
                                <th>Visiblity</th>
                                <th>View/Edit</th>
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

ListStore.propTypes ={
    auth: PropTypes.object.isRequired,
    listStore: PropTypes.func.isRequired,
    deleteStore: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
  auth : state.auth,
  errors: state.errors,
  store :state.store
});

export default connect(mapStateToProps,{listStore,deleteStore})(ListStore);