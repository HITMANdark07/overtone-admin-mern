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
//import TimeAgo from 'react-timeago'
import Axios from 'axios';
const Toast = swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000
  });

class AdminDashboard extends Component {
  constructor(){
    super();
    this.state={
       errors:{},
       count:{
            author:0,
            category:0,
            subCategory:0,
            product:0,
            order:0,
            subCategoryChild:0,
            blog:0,
       },
       authorList:[],
       loading:false,
       categoryList:[],
       subCategoryList:[],
       productList:[],
       subCategoryChildList:[]

      
    }   
}
componentDidMount(){
    this.setState({
        loading:true
    })
    Axios.get('/api/admin/dashboard')
    .then(result=>{
        const {count,authorList,categoryList,subCategoryList,productList,subCategoryChildList}=result.data;
            this.setState({
                count:count,
                authorList:authorList,
                categoryList:categoryList,
                subCategoryList:subCategoryList,
                productList:productList,
                subCategoryChildList:subCategoryChildList,
                loading:false
            })
    })

}

componentWillReceiveProps(nextProps){}

render() {
   

    const {count,authorList,categoryList,subCategoryList,productList,subCategoryChildList,loading}=this.state;
   
//Get Authors
//get users
var SubCategoryChildList;
if(authorList===null || loading){
    SubCategoryChildList=(<div className="kt-widget4">
    <div className="kt-widget4__item">
        <div className="kt-widget4__info">
            <p className="kt-widget4__text">
                Loading....
            </p>
        </div>
    </div>
</div>)
}else{
    if(Object.keys(subCategoryChildList).length > 0){
        SubCategoryChildList=subCategoryChildList.map(result=>{
            return <div className="kt-widget4" style={{marginBottom:15}}>
            <div className="kt-widget4__item">
            <div className="kt-widget4__pic kt-widget4__pic--pic">
        {result.photoUrl ?<img src={'/static/'+result.photoUrl} alt="" /> :<img src="https://via.placeholder.com/50" alt="" /> }  
            </div>
            <div className="kt-widget4__info">
                <a href="javacript:void(0)" className="kt-widget4__username">
               {result.subCategoryChildName}
                </a>
            						 		 
            </div>	
            {/* <a href="javacript:void(0)" className="btn btn-sm btn-label-brand btn-bold"><TimeAgo date={result.date}  /></a>						 					  */}
            </div>  
        </div>  
        })
    }else{
        SubCategoryChildList=(<div className="kt-widget4">
                        <div className="kt-widget4__item">
                            <div className="kt-widget4__info">
                                <p className="kt-widget4__text">
                                    No Record Found
                                </p>
                            </div>
                        </div>
                  </div>)
    }
}  


//get Products
var ProductList;
if(productList===null || loading){
    ProductList=(<div className="kt-widget4">
    <div className="kt-widget4__item">
        <div className="kt-widget4__info">
            <p className="kt-widget4__text">
                Loading....
            </p>
        </div>
    </div>
</div>)
}else{
    if(Object.keys(productList).length > 0){
        ProductList=productList.map(result=>{
            return <div className="kt-widget4" style={{marginBottom:15}}>
            <div className="kt-widget4__item">
            <div className="kt-widget4__pic kt-widget4__pic--pic">
        {result.photoUrl ?<img src={'/static/'+result.photoUrl} alt="" /> :<img src="https://via.placeholder.com/50" alt="" /> }  
            </div>
            <div className="kt-widget4__info">
                <a href="javacript:void(0)" className="kt-widget4__username">
               {result.name}
                </a>
                <p className="kt-widget4__text">
                {result.description ?result.description : 'No Decription Found'}
                </p>							 		 
            </div>	
            {/* <a href="javacript:void(0)" className="btn btn-sm btn-label-brand btn-bold"><TimeAgo date={result.date}  /></a>						 					  */}
            </div>  
        </div>  
        })
    }else{
        ProductList=(<div className="kt-widget4">
                        <div className="kt-widget4__item">
                            <div className="kt-widget4__info">
                                <p className="kt-widget4__text">
                                    No Record Found
                                </p>
                            </div>
                        </div>
                  </div>)
    }
} 

//get Category
var CategoryList;
if(categoryList===null || loading){
    CategoryList=(<div className="kt-widget4">
    <div className="kt-widget4__item">
        <div className="kt-widget4__info">
            <p className="kt-widget4__text">
                Loading....
            </p>
        </div>
    </div>
</div>)
}else{
    if(Object.keys(categoryList).length > 0){
        CategoryList=categoryList.map(result=>{
            return <div className="kt-widget4" style={{marginBottom:15}}>
            <div className="kt-widget4__item">
            <div className="kt-widget4__pic kt-widget4__pic--pic">
        {result.photoUrl ?<img src={'/static/'+result.photoUrl} alt="" /> :<img src="https://via.placeholder.com/50" alt="" /> }  
            </div>
            <div className="kt-widget4__info">
                <a href="javacript:void(0)" className="kt-widget4__username">
               {result.categoryName}
                </a>							 		 
            </div>	
            {/* <a href="javacript:void(0)" className="btn btn-sm btn-label-brand btn-bold"><TimeAgo date={result.date}  /></a>	-->					 					  */}
            </div>  
        </div>  
        })
    }else{
        CategoryList=(<div className="kt-widget4">
                        <div className="kt-widget4__item">
                            <div className="kt-widget4__info">
                                <p className="kt-widget4__text">
                                    No Record Found
                                </p>
                            </div>
                        </div>
                  </div>)
    }
}


//get Category
var SubCategoryList;
if(categoryList===null || loading){
    SubCategoryList=(<div className="kt-widget4">
    <div className="kt-widget4__item">
        <div className="kt-widget4__info">
            <p className="kt-widget4__text">
                Loading....
            </p>
        </div>
    </div>
</div>)
}else{
    if(Object.keys(subCategoryList).length > 0){
        SubCategoryList=subCategoryList.map(result=>{
            return <div className="kt-widget4" style={{marginBottom:15}}>
            <div className="kt-widget4__item">
            <div className="kt-widget4__pic kt-widget4__pic--pic">
        {result.photoUrl ?<img src={'/static/'+result.photoUrl} alt="" /> :<img src="https://via.placeholder.com/50" alt="" /> }  
            </div>
            <div className="kt-widget4__info">
                <a href="javacript:void(0)" className="kt-widget4__username">
               {result.subCategoryName}
                </a>							 		 
            </div>	
            {/* <a href="javacript:void(0)" className="btn btn-sm btn-label-brand btn-bold"><TimeAgo date={result.date}  /></a>						 					  */}
            </div>  
        </div>  
        })
    }else{
        SubCategoryList=(<div className="kt-widget4">
                        <div className="kt-widget4__item">
                            <div className="kt-widget4__info">
                                <p className="kt-widget4__text">
                                    No Record Found
                                </p>
                            </div>
                        </div>
                  </div>)
    }
}


//get Category
var SubCategoryList;
if(categoryList===null || loading){
    SubCategoryList=(<div className="kt-widget4">
    <div className="kt-widget4__item">
        <div className="kt-widget4__info">
            <p className="kt-widget4__text">
                Loading....
            </p>
        </div>
    </div>
</div>)
}else{
    if(Object.keys(subCategoryList).length > 0){
        SubCategoryList=subCategoryList.map(result=>{
            return <div className="kt-widget4" style={{marginBottom:15}}>
            <div className="kt-widget4__item">
            <div className="kt-widget4__pic kt-widget4__pic--pic">
        {result.photoUrl ?<img src={'/static/'+result.photoUrl} alt="" /> :<img src="https://via.placeholder.com/50" alt="" /> }  
            </div>
            <div className="kt-widget4__info">
                <a href="javacript:void(0)" className="kt-widget4__username">
               {result.subCategoryName}
                </a>							 		 
            </div>	
            {/* <a href="javacript:void(0)" className="btn btn-sm btn-label-brand btn-bold"><TimeAgo date={result.date}  /></a>						 					  */}
            </div>  
        </div>  
        })
    }else{
        SubCategoryList=(<div className="kt-widget4">
                        <div className="kt-widget4__item">
                            <div className="kt-widget4__info">
                                <p className="kt-widget4__text">
                                    No Record Found
                                </p>
                            </div>
                        </div>
                  </div>)
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
              <SubHeader first="Home" second="Admin Dashboard" third=""/>
              {/* end:: Subheader */}
              {/* begin:: Content */}
              <div className="kt-content  kt-grid__item kt-grid__item--fluid" id="kt_content">
                    <div className="kt-portlet">
                            <div className="kt-portlet__head">
                                <div className="kt-portlet__head-label">
                                    <h3 className="kt-portlet__head-title">
                                Admin Dashboard
                                    </h3>
                                </div>
                            </div>
                           </div>              
                            <div className="kt-portlet">
                                <div className="kt-portlet__body  kt-portlet__body--fit">
                                <div className="row row-no-padding row-col-separator-lg">
                     
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                    {/*begin::New Feedbacks*/}
                                    <div className="kt-widget24">
                                        <div className="kt-widget24__details">
                                        <div className="kt-widget24__info">
                                            <h4 className="kt-widget24__title">
                                            Total Group
                                            </h4>
                                        
                                        </div>
                                        <span className="kt-widget24__stats kt-font-warning">
                                            {count.category}
                                        </span>
                                        </div>
                                        <div className="progress progress--sm">
                                        <div className="progress-bar kt-bg-warning" role="progressbar" style={{width:count.category/100}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <div className="kt-widget24__action">
                                        <span className="kt-widget24__number">
                                        {count.category/100} %
                                        </span>
                                        </div>
                                    </div>
                                    {/*end::New Feedbacks*/}
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                    {/*begin::New Orders*/}
                                    <div className="kt-widget24">
                                        <div className="kt-widget24__details">
                                        <div className="kt-widget24__info">
                                            <h4 className="kt-widget24__title">
                                            Total Sub-Group
                                            </h4>
                                            
                                        </div>
                                        <span className="kt-widget24__stats kt-font-danger">
                                           {count.subCategory}
                                        </span>
                                        </div>
                                        <div className="progress progress--sm">
                                        <div className="progress-bar kt-bg-danger" role="progressbar" style={{width: count.subCategory/100}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <div className="kt-widget24__action">
                                        <span className="kt-widget24__number">
                                          {count.subCategory/100} %
                                        </span>
                                        </div>
                                    </div>
                                    {/*end::New Orders*/}
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                    {/*begin::New Users*/}
                                    <div className="kt-widget24">
                                        <div className="kt-widget24__details">
                                        <div className="kt-widget24__info">
                                            <h4 className="kt-widget24__title">
                                            Total Products
                                            </h4>
                                        </div>
                                        <span className="kt-widget24__stats kt-font-success">
                                            {count.product}
                                        </span>
                                        </div>
                                        <div className="progress progress--sm">
                                        <div className="progress-bar kt-bg-success" role="progressbar" style={{width:count.product/100}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <div className="kt-widget24__action">
                                        <span className="kt-widget24__number">
                                           {count.product/100} %
                                        </span>
                                        </div>
                                    </div>
                                    
                                    {/*end::New Users*/}
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                    {/*begin::New Orders*/}
                                    <div className="kt-widget24">
                                        <div className="kt-widget24__details">
                                        <div className="kt-widget24__info">
                                            <h4 className="kt-widget24__title">
                                            Total Orders
                                            </h4>
                                            
                                        </div>
                                        <span className="kt-widget24__stats kt-font-danger">
                                           {count.order}
                                        </span>
                                        </div>
                                        <div className="progress progress--sm">
                                        <div className="progress-bar kt-bg-danger" role="progressbar" style={{width: count.order/100}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <div className="kt-widget24__action">
                                        <span className="kt-widget24__number">
                                          {count.order/100} %
                                        </span>
                                        </div>
                                    </div>
                                    {/*end::New Orders*/}
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                    {/*begin::New Feedbacks*/}
                                    <div className="kt-widget24">
                                        <div className="kt-widget24__details">
                                        <div className="kt-widget24__info">
                                            <h4 className="kt-widget24__title">
                                            Total Sub-Group Child
                                            </h4>
                                        
                                        </div>
                                        <span className="kt-widget24__stats kt-font-warning">
                                            {count.subCategoryChild}
                                        </span>
                                        </div>
                                        <div className="progress progress--sm">
                                        <div className="progress-bar kt-bg-warning" role="progressbar" style={{width:count.subCategoryChild/100}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <div className="kt-widget24__action">
                                        <span className="kt-widget24__number">
                                        {count.subCategoryChild/100} %
                                        </span>
                                        </div>
                                    </div>
                                    {/*end::New Feedbacks*/}
                                    </div>
                                    <div className="col-md-12 col-lg-6 col-xl-3">
                                    {/*begin::New Orders*/}
                                    <div className="kt-widget24">
                                        <div className="kt-widget24__details">
                                        <div className="kt-widget24__info">
                                            <h4 className="kt-widget24__title">
                                            Total Case Studies & Blog
                                            </h4>
                                            
                                        </div>
                                        <span className="kt-widget24__stats kt-font-danger">
                                           {count.blog}
                                        </span>
                                        </div>
                                        <div className="progress progress--sm">
                                        <div className="progress-bar kt-bg-danger" role="progressbar" style={{width: count.blog/100}} aria-valuenow={50} aria-valuemin={0} aria-valuemax={100} />
                                        </div>
                                        <div className="kt-widget24__action">
                                        <span className="kt-widget24__number">
                                          {count.blog/100} %
                                        </span>
                                        </div>
                                    </div>
                                    {/*end::New Orders*/}
                                    </div>
                                </div>

                                </div>
                            </div>
                    {/* {GET LAST ADDED ITEMS} */}

                <div>
                   <div className="row">
                      
                        <div className="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                            {/*begin:: Widgets/New Users*/}
                            <div className="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
                                <div className="kt-portlet__head">
                                <div className="kt-portlet__head-label">
                                    <h3 className="kt-portlet__head-title">
                                    New Products
                                    </h3>
                                </div>
                                </div>
                                <div className="kt-portlet__body">
                               
                                        {ProductList}
                                    </div>
                               </div>
                             
                            {/*end:: Widgets/New Users*/}
                        </div>  
                        <div className="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                        {/*begin:: Widgets/Download Files*/}
                        <div className="kt-portlet kt-portlet--height-fluid">
                            <div className="kt-portlet__head">
                            <div className="kt-portlet__head-label">
                                <h3 className="kt-portlet__head-title">
                              New Group
                                </h3>
                            </div>
                            </div>
                            <div className="kt-portlet__body">
                            {/*begin::k-widget4*/}
                            <div className="kt-widget4">
                                {CategoryList}
                            </div>
                            {/*end::Widget 9*/}
                            </div>
                        </div>
                        {/*end:: Widgets/Download Files*/}
                        </div>  

                    </div>
                </div>


                <div>
                   <div className="row">
                        
                        <div className="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                            {/*begin:: Widgets/New Users*/}
                            <div className="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
                                <div className="kt-portlet__head">
                                <div className="kt-portlet__head-label">
                                    <h3 className="kt-portlet__head-title">
                                    New Sub-Group
                                    </h3>
                                </div>
                                </div>
                                <div className="kt-portlet__body">
                                        {SubCategoryList}
                                    </div>
                               </div>
                             
                            {/*end:: Widgets/New Users*/}
                        </div>  
                        <div className="col-xl-4 col-lg-6 order-lg-1 order-xl-1">
                            {/*begin:: Widgets/New Users*/}
                            <div className="kt-portlet kt-portlet--tabs kt-portlet--height-fluid">
                                <div className="kt-portlet__head">
                                <div className="kt-portlet__head-label">
                                    <h3 className="kt-portlet__head-title">
                                    New Sub-Group Child
                                    </h3>
                                </div>
                                </div>
                                <div className="kt-portlet__body">
                               
                                        {SubCategoryChildList}
                                    </div>
                               </div>
                             
                            {/*end:: Widgets/New Users*/}
                        </div>  

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

AdminDashboard.propTypes ={
    auth: PropTypes.object.isRequired,
   

}
  
const mapStateToProps = (state)=>({
    auth : state.auth,
    errors: state.errors,
    dashboard:state.dashboard
});
  
export default connect(mapStateToProps,{})(AdminDashboard);
