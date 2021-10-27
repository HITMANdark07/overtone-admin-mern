import React, { Component } from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import Sidebarmobile from '../../layouts/SidebarMobile';
import Asidebar from '../../layouts/Asidebar';
import Header from '../../layouts/Header';
import HeadeTopbar from '../../layouts/HeaderTopbar';
import SubHeader from '../../layouts/SubHeader';
import Footer from '../../layouts/Footer';
import {addProductSub,listProductSub} from '../../../actions/productsubAction';
import axios from 'axios';
import swal from 'sweetalert2';
import ListProductSub from './ListProductSub';
import {checkPermission} from '../../common/MenuList'
import ProductSubData from '../../../utils/ProductSub.json';
import SearchInput, {createFilter} from 'react-search-input';
import Axios from 'axios';
const KEYS_TO_FILTERS = ['productSubName','saleDesc','sku','type','salePrice','taxable'];

const queryString = require('query-string');


const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AddProductSub extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       productID:'',
       parsed:"",
       searchTerm: '',
       productSubName:'',
       saleDesc:'',
       sku:'',
       type:'',
       salePrice:'',
       taxable:'',
       incomeAccount:'',
       purchaseDesc:'',
       purchaseCost:'',
       expenseAccount:'',
       quantity:'',
       recorder:'',
       inventoryAsset:'',
       quantityAsDate:'',
       isEnabled:'',
       quickBookLogin:false,
      

    }   
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onReset = this.onReset.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);

   

}
componentDidMount(){
console.log("my data",ProductSubData)

  Axios.get('api/productsub/quickbook/tokenisvalid')
  .then(result=>{
      var temp=result.data;
      this.setState({quickBookLogin:temp.login})
  })
  .catch(err=>{
    this.setState({quickBookLogin:false})
  })

  const parsed=queryString.parse(this.props.location.search)
  this.props.listProductSub({productID:parsed.productID});
  if(!parsed.productID){
    this.props.history.push('/admin/listproduct')
    return;
  }
  this.setState({
    productID:parsed.productID
  })
 
}



componentWillReceiveProps(nextProps){
 
    if(nextProps.productsub.addproductsub !== this.props.productsub.addproductsub){
        Toast.fire({
            type: 'success',
            title: ' Sub-Products Added Successfully',
          })
          this.onReset();
    }
    if(nextProps.errors !== this.props.errors){
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


//submit data to server
onSubmit(data){
    this.setState({errors:{}})
   const Data ={  
      productID:this.state.productID,
      isEnabled:   this.state.isEnabled,
      ...data
    }
    this.props.addProductSub(Data);
}


onGetQuickBook(){
  Axios.get('/api/productsub/quickbook/getredirect')
  .then(result=>{
      var temp=result.data;
      window.location.href = temp.url;
      localStorage.setItem('quickbook_back',`/admin/addsub?productID=${this.state.productID}`)
  })
  .catch(err=>{
    Toast.fire({
      type: 'success',
      title: 'Error Occured Try Again',
    })
  })
}


onSubmitForm(e){
  this.setState({errors:{}})
  e.preventDefault();
  const Data ={  
       productID:this.state.productID,
      productSubName :   this.state.productSubName,
      saleDesc :   this.state.saleDesc,
      sku :   this.state.sku,
      type :   this.state.type,
      salePrice :   this.state.salePrice,
      taxable :   this.state.taxable,
      incomeAccount :   this.state.incomeAccount,
      purchaseDesc :   this.state.purchaseDesc,
      purchaseCost :   this.state.purchaseCost,
      expenseAccount :   this.state.expenseAccount,
      quantity :   this.state.quantity,
      recorder :   this.state.recorder,
      inventoryAsset :   this.state.inventoryAsset,
      quantityAsDate :   this.state.quantityAsDate,
      isEnabled :   this.state.isEnabled
  }
  this.props.addProductSub(Data);
}
//Reset all statevalues
onReset(){
    this.setState({
      errors:{},
     
    })
}

searchUpdated (term) {
  this.setState({searchTerm: term})
}



render() {
    const {errors,searchTerm} = this.state;
  const {listproductsub,productsubloading}=this.props.productsub;
  var tableResult;

    if(searchTerm==null ||searchTerm===""){
      tableResult=(<tr><td colSpan={9} className="text-center">Search Products....</td></tr>)
  }else{
      
        var filterData= ProductSubData.filter(createFilter(this.state.searchTerm, KEYS_TO_FILTERS))
          tableResult=filterData.map(result=>{
            var findSub=listproductsub.find(x=>x.productSubName ===result.productSubName)
                  return <tr>
                  <td>{result.productSubName}</td>
                  <td>{result.saleDesc}</td>
                  <td>{result.sku}</td>
                  <td>{result.type}</td>
                  <td>{result.salePrice}</td>
                  
                
                  {/* <td><button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span></button></td>
                  <td><button  className="btn btn-link" onClick={()=>this.onDeleteClick(result._id)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">Delete</span></button></td> */}
                   {/* <td>
                    {checkPermission(this.props.auth,"PRODUCTS","UPDATE")&&
                    <button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span>
                    </button>}
                    </td> */}
                  <td>
                  {checkPermission(this.props.auth,"PRODUCTS","CREATE")&& !findSub &&
                    <button  className="btn btn-link" onClick={()=>this.onSubmit(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--success">ADD</span>
                    </button>}
                    {findSub &&
                    <button  className="btn btn-link" ><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">ADDED</span>
                    </button>}
                  </td>
              </tr>
          })
      

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
              <SubHeader first="Home" second="Add  Attribute Category" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Add  Sub-Products
                            </h3>
                        </div>
                    </div>
                    {/*begin::Form*/}
                   {this.state.quickBookLogin ? <form className="kt-form kt-form--fit kt-form--label-right" onSubmit={this.onSubmitForm}>
                        <div className="kt-portlet__body">
                            <div className="form-group row">
                          
                                <label className="col-lg-2 col-form-label">Product Name:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="productSubName" onChange={this.onChange} value={this.state.productSubName} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.productSubName}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Sale Description:</label>
                                <div className="col-lg-3">
                                        <textarea rows="5" required name="saleDesc" onChange={this.onChange} value={this.state.saleDesc} className="form-control" placeholder="" ></textarea>
                                        <span className="form-text text-danger">{errors.saleDesc}</span>
                                </div>
                            </div>

                            <div className="form-group row">

                                <label className="col-lg-2 col-form-label">SKU:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="sku" onChange={this.onChange} value={this.state.sku} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.sku}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Type:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="type" onChange={this.onChange} value={this.state.type} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.type}</span>
                                </div>

                            </div>

                            <div className="form-group row">

                                <label className="col-lg-2 col-form-label">Sale Price:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="salePrice" onChange={this.onChange} value={this.state.salePrice} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.salePrice}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Taxable:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="taxable" onChange={this.onChange} value={this.state.taxable} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.taxable}</span>
                                </div>

                            </div>

                            <div className="form-group row">

                                <label className="col-lg-2 col-form-label">Income Account:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="incomeAccount" onChange={this.onChange} value={this.state.incomeAccount} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.incomeAccount}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Purchase Description:</label>
                                <div className="col-lg-3">
                                        <textarea rows="5" required name="purchaseDesc" onChange={this.onChange} value={this.state.purchaseDesc} className="form-control" placeholder="" ></textarea>
                                        <span className="form-text text-danger">{errors.purchaseDesc}</span>
                                </div>

                            </div>

                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Purchase Cost:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="purchaseCost" onChange={this.onChange} value={this.state.purchaseCost} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.purchaseCost}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Expense Account:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="expenseAccount" onChange={this.onChange} value={this.state.expenseAccount} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.expenseAccount}</span>
                                </div>
                            </div>

                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Quantity:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="quantity" onChange={this.onChange} value={this.state.quantity} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.quantity}</span>
                                </div>

                                <label className="col-lg-2 col-form-label">Recorder:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="recorder" onChange={this.onChange} value={this.state.recorder} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.recorder}</span>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-lg-2 col-form-label">Inventory Asset:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="inventoryAsset" onChange={this.onChange} value={this.state.inventoryAsset} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.inventoryAsset}</span>
                                </div>
                                <label className="col-lg-2 col-form-label">Quantity As Date:</label>
                                <div className="col-lg-3">
                                        <input type="text" required name="quantityAsDate" onChange={this.onChange} value={this.state.quantityAsDate} className="form-control" placeholder="" />
                                        <span className="form-text text-danger">{errors.quantityAsDate}</span>
                                </div>
                            </div>
 
                            <div className="form-group row">
                            
                                <label className="col-lg-2 col-form-label">isEnabled:</label>
                                <div className="col-lg-3">
                                <select required  name="isEnabled" onChange={this.onChange} value={this.state.isEnabled} className="form-control" placeholder="" >
                                            <option value="">Select isEnabled</option>
                                            <option value="Yes">Yes</option>
                                            <option value="No">No</option>
                                </select>
                                        <span className="form-text text-danger">{errors.isEnabled}</span>
                                </div>
                            </div>                         
                           
                        </div>
                        <div className="kt-portlet__foot kt-portlet__foot--fit-x">
                            <div className="kt-form__actions">
                            <div className="row">
                            <div className="col-lg-3 d-flex justify-content-around">
                                <button type="submit" className={`btn btn-success ${productsubloading ?  'kt-spinner kt-spinner--sm kt-spinner--light':''}`}>Submit</button>
                                <button  type="button" onClick={this.onReset} className="btn btn-secondary">Cancel</button>
                            </div>
                            <div className="col-lg-10" />
                                
                            </div>
                            </div>
                        </div>
                    </form> :<div className="text-center p-2">
                    <button  type="button"  className="btn btn-success" onClick={()=>this.onGetQuickBook()}>Connect With Quickbook</button>
                    </div>
                   }
                    
                    {/*end::Form*/}
                </div>
                
                {/*end::Portlet*/}

                {/*end::Portlet datatable*/}
             </div>

             {this.state.quickBookLogin ? <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                     <div className="kt-portlet__head">
                        <div className="kt-portlet__head-label">
                            <h3 className="kt-portlet__head-title">
                            Mapping  Sub-Products
                            </h3>
                        </div>
                    </div>
                   
                    <div className="col-sm-12 col-md-12">
                                    <SearchInput  placeholder="Search" onChange={this.searchUpdated} className="search-input" />
                        </div>
                   
                        <div className="kt-portlet__body">
                        <table   className="table table-striped table-bordered table-hover table-checkable">
                            <thead>
                            <tr>
                                <th>Product  Name</th>
                                <th>Sale Description</th>
                                <th>SKU</th>
                                <th>Type</th>
                                <th>Sale Price</th>
                              
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody>
                                  {tableResult}                   
                                
                            </tbody>
                            <tfoot>
                                <tr>
                                <th>Product  Name</th>
                                <th>Sale Description</th>
                                <th>SKU</th>
                                <th>Type</th>
                                <th>Sale Price</th>
                                <th>Action</th>
                                </tr>
                            </tfoot>
                        </table>                                              
                        </div>
                   
                </div>
                
             
             </div>:null}

             <ListProductSub history={this.props.history} location={this.props.location}/>
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

AddProductSub.propTypes ={
    auth: PropTypes.object.isRequired,
    addProductSub: PropTypes.func.isRequired,
    listProductSub:PropTypes.func.isRequired,
}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    productsub :state.productsub,
});
  
export default connect(mapStateToProps,{addProductSub,listProductSub})(AddProductSub);