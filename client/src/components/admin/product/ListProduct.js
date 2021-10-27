import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {listProduct,deleteProduct} from '../../../actions/productAction'
import swal from 'sweetalert2';
import SearchInput, {createFilter} from 'react-search-input';
import {checkPermission} from '../../common/MenuList'
import { Link } from "react-router-dom";
const KEYS_TO_FILTERS = ['author','name','photoUrl','price','description','category','categoryName','subCategory','subCategoryName','stockCount'];
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000
});


class ListProduct extends Component {
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
  this.props.listProduct();
}

//calls when edit button is clicked
onEditClick(res){
  localStorage.setItem('editproduct',JSON.stringify(res))
  this.props.history.push('editproduct')
}
//calls when delete button is clicked
onDeleteClick(id){
  const deleteData={
      id:id
  }
  this.props.deleteProduct(deleteData)
}
searchUpdated (term) {
    this.setState({searchTerm: term})
}
componentWillReceiveProps(nextProps){
 
  if(nextProps.product.deleteproduct !== this.props.product.deleteproduct){
      Toast.fire({
          type: 'success',
          title: 'Product Deleted Successfully',
        }).then(getResult=>{
          this.props.listProduct();
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


onAddAttribute(id){
  this.props.history.push(`/admin/addmapping?productID=${id}`)
}

onAddSub(id){
  this.props.history.push(`/admin/addsub?productID=${id}`)
}

render() {
  const {listproduct,productloading}=this.props.product;
  var tableResult;
  if(listproduct==null ||productloading){
      tableResult=(<tr><td colSpan={9} className="text-center">Loading.....</td></tr>)
  }else{
      if(Object.keys(listproduct).length >0){
        var filterData= listproduct.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
          tableResult=filterData.map(result=>{
                  return <tr>
                  <td>{result.name} ({result.stockCount})</td>
                  {/* <td>{result.description}</td> */}
                  <td><img src={'/static/'+result.photoUrl1} width={50} height={50} /></td>
                  <td>{result.price}</td>
                  <td>{result.discountPrice}</td>
                  <td>{result.category ? result.category.categoryName :"N/a"}</td>
                  <td>{result.subCategory ? result.subCategory.subCategoryName:"N/a"}</td>
                  <td>{result.subCategoryChild ? result.subCategoryChild.subCategoryChildName :"N/a"}</td>
                  {/* <td>{result.description}</td> */}
                  <td>{result.isEnabled}</td>
                  {/* <td>{result.isFeaturedProduct}</td> */}
                  {/* <td><button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span></button></td>
                  <td><button  className="btn btn-link" onClick={()=>this.onDeleteClick(result._id)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">Delete</span></button></td> */}
                      <td>
                    {(checkPermission(this.props.auth,"PRODUCT","UPDATE")||checkPermission(this.props.auth,"PRODUCT","READ")) &&
                    <React.Fragment>
                    <button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span>
                    </button>
                    {/* <button className="btn btn-link mt-2" onClick={()=>this.onAddSub(result._id)}><span className="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill" style={{height:'30px'}}>Sub-Products</span>
                    </button>
                    <button className="btn btn-link mt-2" onClick={()=>this.onAddAttribute(result._id)}><span className="kt-badge kt-badge--warning kt-badge--inline kt-badge--pill" style={{height:'30px'}}>Add Attribute</span>
                    </button> */}
                  
                    </React.Fragment>}
                    </td>
                  <td>
                  {checkPermission(this.props.auth,"PRODUCT","DELETE")&&
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
              <SubHeader first="Home" second="List Product" third=""/>
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
                            List Product
                                </h3>
                            </div>
                            <div
                        className='create_order_btn'
                        // onClick={() => this.onEditClick(result)}
                      >
                        <Link to='/admin/createproduct'>Create Product</Link>
                      </div>
                        </div>
                        <div className="col-sm-12 col-md-12">
                                    <SearchInput  placeholder="Search" onChange={this.searchUpdated} className="search-input" />
                        </div>
                        <div className="kt-portlet__body" style={{overflowX:'scroll'}}>
                        {/*begin: Datatable */}
                        <table   className="table table-striped table-bordered table-hover table-checkable">
                            <thead>
                            <tr>
                                <th>Product Name</th>
                                 {/* <th>Description</th> */}
                                <th>Image</th>
                                <th>Price</th>
                                <th>Discount Price</th>
                                <th>Group Name</th>
                                <th>Sub-Group Name</th>
                                <th>Sub-Group Child Name</th>
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
                                <th>Product Name</th>
                                 {/* <th>Description</th> */}
                                <th>Image</th>
                                <th>Price</th>
                                <th>Discount Price</th>
                                <th>Group Name</th>
                                <th>Sub-Group Name</th>
                                <th>Sub-Group Child Name</th>
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

ListProduct.propTypes ={
    auth: PropTypes.object.isRequired,
    listProduct: PropTypes.func.isRequired,
    deleteProduct: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=>({
  auth : state.auth,
  errors: state.errors,
  product :state.product
});

export default connect(mapStateToProps,{listProduct,deleteProduct})(ListProduct);