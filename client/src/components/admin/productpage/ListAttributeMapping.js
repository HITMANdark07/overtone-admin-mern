import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {listAttributeMapping,deleteAttributeMapping} from '../../../actions/attributemappingAction'
import swal from 'sweetalert2';
import SearchInput, {createFilter} from 'react-search-input';
import {checkPermission} from '../../common/MenuList'

const queryString = require('query-string');
const KEYS_TO_FILTERS = ['parentattributecategory','attributecategory','attributeName','isEnabled','mappingType','mappingLabel','mappingValue'];
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});


class ListAttributeMapping extends Component {
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
  const parsed=queryString.parse("productID=614d7297a9c0ba3aeec9e672")
  console.log(parsed)
  this.props.listAttributeMapping({productID:parsed.productID});
 
}

//calls when edit button is clicked
onEditClick(res){
  localStorage.setItem('editattributemapping',JSON.stringify(res))
  const parsed=queryString.parse(this.props.location.search)
  this.props.history.push(`editmapping?productID=${parsed.productID}`)

}
//calls when delete button is clicked
onDeleteClick(id){
  console.log(id)
  const deleteData={
      id:id
  }
  this.props.deleteAttributeMapping(deleteData)
}
searchUpdated (term) {
    this.setState({searchTerm: term})
}
componentWillReceiveProps(nextProps){
 
  if(nextProps.attributemapping.deleteattributemapping !== this.props.attributemapping.deleteattributemapping){
      Toast.fire({
          type: 'success',
          title: ' Attribute Deleted Successfully',
        }).then(getResult=>{
          const parsed=queryString.parse(this.props.location.search)
          this.props.listAttributeMapping({productID:parsed.productID});
        })

  }
  if(nextProps.attributemapping.addattributemapping !== this.props.attributemapping.addattributemapping){
  
    const parsed=queryString.parse(this.props.location.search)
    this.props.listAttributeMapping({productID:parsed.productID});
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
  const {listattributemapping,attributemappingloading}=this.props.attributemapping;
  var tableResult;
  if(listattributemapping==null ||attributemappingloading){
      tableResult=(<tr><td colSpan={5} className="text-center">Loading.....</td></tr>)
  }else{
      if(Object.keys(listattributemapping).length >0){
        var filterData= listattributemapping.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
          tableResult=filterData.map(result=>{
                  return <tr>
                  <td>{result.parentattributecategory ? result.parentattributecategory.attributeName : "N/A"}</td>
                  <td>{result.attributecategory ? result.attributecategory.attributeName : "N/A"}</td>
                  <td>{result.mappingName}</td>
                  <td>{result.mappingType}</td>
                  <td>{result.mappingLabel}</td>
                  <td>{result.mappingValue}</td>
                  <td>{result.isEnabled}</td>
                  {/* <td><button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span></button></td>
                  <td><button  className="btn btn-link" onClick={()=>this.onDeleteClick(result._id)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">Delete</span></button></td> */}
                   <td>
                    {checkPermission(this.props.auth,"PRODUCTS","UPDATE")&&
                    <button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span>
                    </button>}
                    </td>
                  <td>
                  {checkPermission(this.props.auth,"PRODUCTS","DELETE")&&
                    <button  className="btn btn-link" onClick={()=>this.onDeleteClick(result._id)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">Delete</span>
                    </button>}
                  </td>
              </tr>
          })
      }else{
          tableResult=(<tr><td colSpan={9} className="text-center">No Record Found.....</td></tr>)
      }

  }

   return (
      <div style={{display:"none"}}>
    
        
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                        <div className="kt-portlet__head kt-portlet__head--lg">
                            <div className="kt-portlet__head-label">
                                <span className="kt-portlet__head-icon">
                                <i className="kt-font-brand flaticon2-line-chart" />
                                </span>
                                <h3 className="kt-portlet__head-title">
                               List  Attribute Mapping
                                </h3>
                            </div>
                        </div>
                        <div className="col-sm-12 col-md-12">
                                    <SearchInput  placeholder="Search" onChange={this.searchUpdated} className="search-input" />
                        </div>
                        <div className="kt-portlet__body" >
                        {/*begin: Datatable */}
                        <table   className="table table-striped table-bordered table-hover table-checkable">
                            <thead>
                            <tr>
                                <th>Parent Attribute Category</th>
                                <th>Attribite Category</th>
                                <th>Mapping Name</th>
                                <th>Type</th>
                                <th>Label</th>
                                <th>Value</th>
                                <th>Is Enabled</th>
                                <th>View/Edit</th>
                                <th>Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                                  {tableResult}                   
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                <th>Parent Attribute Category</th>
                                <th>Attribite Category</th>
                                <th>Mapping Name</th>
                                <th>Type</th>
                                <th>Label</th>
                                <th>Value</th>
                                <th>Is Enabled</th>
                                <th>View/Edit</th>
                                <th>Delete</th>
                                </tr>
                            </tfoot>
                        </table>
                        {/*end: Datatable */}
                        </div>
                    </div>
                
             </div>
          
    </div>
    )
  }
}

ListAttributeMapping.propTypes ={
    auth: PropTypes.object.isRequired,
    listAttributeMapping: PropTypes.func.isRequired,
    deleteAttributeMapping: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
  auth : state.auth,
  errors: state.errors,
  attributemapping :state.attributemapping
});

export default connect(mapStateToProps,{listAttributeMapping,deleteAttributeMapping})(ListAttributeMapping);