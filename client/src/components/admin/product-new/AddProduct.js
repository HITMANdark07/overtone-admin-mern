import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Sidebarmobile from "../../layouts/SidebarMobile";
import Asidebar from "../../layouts/Asidebar";
import Header from "../../layouts/Header";
import HeadeTopbar from "../../layouts/HeaderTopbar";
import SubHeader from "../../layouts/SubHeader";
import Footer from "../../layouts/Footer";
import { addProduct } from "../../../actions/productAction";
import { listCategory } from "../../../actions/categoryAction";
import { listSubCategoryOne } from "../../../actions/subCategoryAction";
import { listSubCategoryChildOne } from "../../../actions/subCategoryChildAction";
// import {listAuthor} from '../../../actions/authorAction';
import AddAttributeMapping from "../attributemapping/AddAttributeMapping";
import ListAttributeMapping from "../attributemapping/ListAttributeMapping";
import AddProductSKU from "./AddProductSKU";
import AddAttribute from "./AddAttribute";
import AddSubProduct from "./AddSubProduct";

import axios from "axios";
import swal from "sweetalert2";
import NewDemo from "./NewDemo";
const Toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

class AddProduct extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      stockCount: "",
      photoUrl1: "",
      photoUrl2: "",
      documents: [{ url: "", uploadstatus: "", fileName: "", buttonName: "" }],
      maintenanceText: "",
      maintenanceBtnText: "",
      maintenanceFileUrl: "",
      acousticsText: "",
      categoryID: "",
      subcategoryID: "",
      subcategoryChildID: "",
      isEnabled: "Yes",
      keyword: "",
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadImageBulk = this.uploadImageBulk.bind(this);
  }
  componentDidMount() {
    this.props.listCategory();
  }

  addDocument() {
    const documents = this.state.documents.concat([
      { url: "", uploadstatus: "", fileName: "", buttonName: "" },
    ]);
    this.setState({ documents });
  }

  removeDocument(idx, sub) {
    this.setState({
      documents: this.state.documents.filter((s, sidx) => idx !== sidx),
    });
  }

  //for upload url
  uploadImageBulk(e, index) {
    var self = this;
    const data = new FormData();
    var sFileName = e.target.files[0].name;
    let temp = this.state.documents;
    temp[index].uploadstatus = "Uploading please wait..";
    this.setState({ documents: temp });
    console.log("temp");
    var sFileExtension = sFileName
      .split(".")
      [sFileName.split(".").length - 1].toLowerCase();

    data.append("file", e.target.files[0]);
    data.append("filename", e.target.files[0].name);
    axios
      .post("/upload", data)
      .then((response) => {
        temp[index].url = response.data.file;
        temp[index].fileName = sFileName;
        temp[index].uploadstatus = "Uploaded SuccessFully";
        self.setState({ documents: temp }, () => {
          Toast.fire({
            type: "success",
            title: "File Uploaded SuccessFully",
          });
        });

        // self.setState({
        //     url:response.data,
        //     uploadStatus:'Uploaded SuccessFully'
        // })
      })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.product.addproduct !== this.props.product.addproduct) {
      Toast.fire({
        type: "success",
        title: "Product Added Successfully",
      });
      var productData = nextProps.product.addproduct;
      this.onReset();
      this.onAddAttribute(productData._id);
    }
    if (nextProps.errors !== this.props.errors) {
      Toast.fire({
        type: "error",
        title: "Check all the fields",
      });
      this.setState({ errors: nextProps.errors });
    }
  }

  onAddAttribute(id) {
    this.props.history.push(`/admin/addmapping?productID=${id}`);
  }

  onAddSub(id) {
    this.props.history.push(`/admin/addsub?productID=${id}`);
  }

  //onchange state value for category
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // if(e.target.name==='authorID' && e.target.value !=""){
    //     this.props.listCategory({authorID:e.target.value});
    // }
    if (e.target.name === "categoryID" && e.target.value != "") {
      this.props.listSubCategoryOne({ categoryID: e.target.value });
    }
    if (e.target.name === "subcategoryID" && e.target.value != "") {
      this.props.listSubCategoryChildOne({ subcategoryID: e.target.value });
    }
  }

  //for upload image
  uploadImage(e, status) {
    var self = this;
    var name = e.target.name;
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("filename", e.target.files[0].name);
    axios
      .post("/upload", data)
      .then(function (response) {
        self.setState({
          [name]: response.data.file,
          [status]: "Uploaded SuccessFully",
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //submit data to server
  onSubmit(e) {
    this.setState({ errors: {} });
    e.preventDefault();
    const Data = {
      name: this.state.name,
      description: this.state.description,
      price: this.state.price,
      discountPrice: this.state.discountPrice,
      stockCount: this.state.stockCount,
      photoUrl1: this.state.photoUrl1,
      photoUrl2: this.state.photoUrl2,
      documents: JSON.stringify(this.state.documents),
      maintenanceText: this.state.maintenanceText,
      maintenanceBtnText: this.state.maintenanceBtnText,
      maintenanceFileUrl: this.state.maintenanceFileUrl,
      acousticsText: this.state.acousticsText,
      categoryID: this.state.categoryID,
      subcategoryID: this.state.subcategoryID,
      subcategoryChildID: this.state.subcategoryChildID,
      isEnabled: this.state.isEnabled,
      keyword: this.state.keyword,
    };
    this.props.addProduct(Data);
  }
  //Reset all statevalues
  onReset() {
    this.setState({
      errors: {},
      name: "",
      description: "",
      price: "",
      discountPrice: "",
      stockCount: "",
      photoUrl1: "",
      photoUrl2: "",
      documents: [{ url: "", uploadstatus: "", fileName: "", buttonName: "" }],
      maintenanceText: "",
      maintenanceBtnText: "",
      maintenanceFileUrl: "",
      acousticsText: "",
      categoryID: "",
      subcategoryID: "",
      subcategoryChildID: "",
      isEnabled: "Yes",
      keyword: "",
    });
  }

  handleChange(e, index) {
    const temp = this.state.documents;
    const name = e.target.name;
    const value = e.target.value;
    if (name === "buttonName") {
      temp[index].buttonName = value;
    }
    this.setState({
      documents: temp,
    });
  }

  render() {
    const { errors } = this.state;
    const { productloading } = this.props.product;

    //category  list
    const { listcategory, categoryloading } = this.props.category;

    var optionResultCategory = [];
    if (listcategory == null || categoryloading) {
      optionResultCategory = <option value=''>Loading...</option>;
    } else {
      if (Object.keys(listcategory).length > 0) {
        optionResultCategory = listcategory.map((result) => {
          return <option value={result._id}>{result.categoryName}</option>;
        });
      } else {
        optionResultCategory = <option value=''>No Category Found...</option>;
      }
    }

    const { listsubCategory, subCategoryloading } = this.props.subCategory;

    var optionResultSubCategory = [];
    if (listsubCategory == null || subCategoryloading) {
      optionResultSubCategory = <option value=''>Loading...</option>;
    } else {
      if (
        Object.keys(listsubCategory).length > 0 &&
        this.state.categoryID != ""
      ) {
        var filterSub = listsubCategory.filter(
          (x) => x.categoryID === this.state.categoryID
        );
        if (Object.keys(filterSub).length > 0) {
          optionResultSubCategory = listsubCategory.map((result) => {
            return <option value={result._id}>{result.subCategoryName}</option>;
          });
        } else {
          optionResultSubCategory = (
            <option value=''>
              No SubCategory Found For Selected Category..
            </option>
          );
        }
      } else {
        optionResultSubCategory = (
          <option value=''>No SubCategory Found...</option>
        );
      }
    }

    const { listsubCategoryChild, subCategoryChildloading } =
      this.props.subCategoryChild;

    var optionResultSubCategoryChild = [];
    if (listsubCategoryChild == null || subCategoryChildloading) {
      optionResultSubCategoryChild = <option value=''>Loading...</option>;
    } else {
      if (
        Object.keys(listsubCategoryChild).length > 0 &&
        this.state.categoryID != ""
      ) {
        var filterSub = listsubCategoryChild.filter(
          (x) => x.categoryID === this.state.categoryID
        );
        if (Object.keys(filterSub).length > 0) {
          optionResultSubCategoryChild = listsubCategoryChild.map((result) => {
            return (
              <option value={result._id}>{result.subCategoryChildName}</option>
            );
          });
        } else {
          optionResultSubCategoryChild = (
            <option value=''>
              No SubCategory Found For Selected Category..
            </option>
          );
        }
      } else {
        optionResultSubCategoryChild = (
          <option value=''>No SubCategory Found...</option>
        );
      }
    }

    const documents = this.state.documents.map((value, index) => {
      return (
        <React.Fragment>
          <div className='col-lg-12 mt-3'>
            <div className='row'>
              <label className='col-lg-2 col-form-label'>Button Name</label>
              <div className='col-lg-3'>
                <input
                  type='text'
                  required
                  name='buttonName'
                  onChange={(e) => this.handleChange(e, index)}
                  className='form-control'
                  placeholder=''
                />
              </div>
              <label className='col-lg-2 col-form-label'>
                File {index + 1}
              </label>
              <div className='col-lg-3'>
                <div className='kt-input-icon'>
                  {value.fileName === "" ? (
                    <input
                      type='file'
                      required
                      name='url'
                      onChange={(e) => this.uploadImageBulk(e, index)}
                      className='form-control'
                      placeholder=''
                    />
                  ) : (
                    <button
                      type='button'
                      value={value.fileName}
                      className='btn btn-success btn-sm mt-1'
                    >
                      {value.fileName}
                    </button>
                  )}
                  <span className='form-text text-danger'>{errors.url}</span>
                </div>
                <span className='form-text text-success'>
                  {value.uploadstatus}
                </span>
                <span className='form-text text-muted'>Upload Image Only</span>
              </div>
              <div className='col-lg-2'>
                <button
                  type='button'
                  value={value.fileurl}
                  onClick={() => this.addDocument()}
                  className='btn btn-success btn-sm mt-1'
                >
                  <i class='fa fa-plus'></i>
                </button>
                &nbsp;&nbsp;&nbsp;
                {this.state.documents.length > 1 ? (
                  <button
                    type='button'
                    value={value.fileurl}
                    onClick={() => this.removeDocument(index, value.fileurl)}
                    className='btn btn-danger btn-sm mt-1'
                  >
                    <i class='fa fa-trash'></i>
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });

    return (
      <div>
        <Sidebarmobile />
        <div className='kt-grid kt-grid--hor kt-grid--root'>
          <div className='kt-grid__item kt-grid__item--fluid kt-grid kt-grid--ver kt-page'>
            {/* begin:: Aside */}
            <Asidebar />
            {/* end:: Aside */}
            <div
              className='kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor kt-wrapper'
              id='kt_wrapper'
            >
              {/* begin:: Header */}
              <div
                id='kt_header'
                className='kt-header kt-grid__item  kt-header--fixed '
              >
                {/* begin:: Header Menu */}
                <Header />
                {/* end:: Header Menu */}
                {/* begin:: Header Topbar */}
                <HeadeTopbar />
                {/* end:: Header Topbar */}
              </div>
              {/* end:: Header */}
              <div className='kt-grid__item kt-grid__item--fluid kt-grid kt-grid--hor'>
                {/* begin:: Subheader */}
                <SubHeader first='Home' second='Add Product' third='' />
                {/* end:: Subheader */}
                {/* begin:: Content */}
                <div
                  className='kt-content  kt-grid__item kt-grid__item--fluid'
                  id='kt_content'
                >
                  <div className='kt-portlet'>
                    <div className='kt-portlet__head'>
                      <div className='kt-portlet__head-label'>
                        <h3 className='kt-portlet__head-title'>Add Product</h3>
                      </div>
                    </div>
                    {/*begin::Form*/}
                    <form
                      className='kt-form kt-form--fit kt-form--label-right'
                      onSubmit={this.onSubmit}
                    >
                      <div className='kt-portlet__body'>
                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            Product Name:
                          </label>
                          <div className='col-lg-3'>
                            <input
                              type='text'
                              name='name'
                              onChange={this.onChange}
                              value={this.state.name}
                              className='form-control'
                              placeholder=''
                            />
                            <span className='form-text text-danger'>
                              {errors.name}
                            </span>
                          </div>
                          <label className='col-lg-2 col-form-label'>
                            Description:
                          </label>
                          <div className='col-lg-3'>
                            <textarea
                              name='description'
                              onChange={this.onChange}
                              value={this.state.description}
                              className='form-control'
                              placeholder=''
                            ></textarea>
                            <span className='form-text text-danger'>
                              {errors.description}
                            </span>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            Price:
                          </label>
                          <div className='col-lg-3'>
                            <input
                              type='text'
                              name='price'
                              onChange={this.onChange}
                              value={this.state.price}
                              className='form-control'
                              placeholder=''
                            />
                            <span className='form-text text-danger'>
                              {errors.price}
                            </span>
                          </div>
                          <label className='col-lg-2 col-form-label'>
                            Discount Price:
                          </label>
                          <div className='col-lg-3'>
                            <input
                              type='text'
                              name='discountPrice'
                              onChange={this.onChange}
                              value={this.state.discountPrice}
                              className='form-control'
                              placeholder=''
                            />
                            <span className='form-text text-danger'>
                              {errors.discountPrice}
                            </span>
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            Stock Count:
                          </label>
                          <div className='col-lg-3'>
                            <input
                              type='text'
                              name='stockCount'
                              onChange={this.onChange}
                              value={this.state.stockCount}
                              className='form-control'
                              placeholder=''
                            />
                            <span className='form-text text-danger'>
                              {errors.stockCount}
                            </span>
                          </div>
                          <label className='col-lg-2 col-form-label'>
                            Select Group:
                          </label>
                          <div className='col-lg-3'>
                            <select
                              name='categoryID'
                              onChange={(e) => this.onChange(e)}
                              value={this.state.categoryID}
                              className='form-control'
                              placeholder=''
                            >
                              <option value=''>Select Group</option>
                              {optionResultCategory}
                            </select>
                            <span className='form-text text-danger'>
                              {errors.categoryID}
                            </span>
                          </div>
                        </div>

                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            Select Sub-Group:
                          </label>
                          <div className='col-lg-3'>
                            <select
                              name='subcategoryID'
                              onChange={(e) => this.onChange(e)}
                              value={this.state.subcategoryID}
                              className='form-control'
                              placeholder=''
                            >
                              <option value=''>Select Sub-Group</option>
                              {optionResultSubCategory}
                            </select>
                            <span className='form-text text-danger'>
                              {errors.subcategoryID}
                            </span>
                          </div>

                          <label className='col-lg-2 col-form-label'>
                            Select Sub-Group Child:
                          </label>
                          <div className='col-lg-3'>
                            <select
                              name='subcategoryChildID'
                              onChange={(e) => this.onChange(e)}
                              value={this.state.subcategoryChildID}
                              className='form-control'
                              placeholder=''
                            >
                              <option value=''>Select Sub-Group Child</option>
                              {optionResultSubCategoryChild}
                            </select>
                            <span className='form-text text-danger'>
                              {errors.subcategoryChildID}
                            </span>
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            isEnabled:
                          </label>
                          <div className='col-lg-3'>
                            <select
                              name='isEnabled'
                              onChange={this.onChange}
                              value={this.state.isEnabled}
                              className='form-control'
                              placeholder=''
                            >
                              <option value=''>Select isEnabled</option>
                              <option value='Yes'>Yes</option>
                              <option value='No'>No</option>
                            </select>
                            <span className='form-text text-danger'>
                              {errors.isEnabled}
                            </span>
                          </div>
                          <label className='col-lg-2 col-form-label'>
                            Keywords: (If any)
                          </label>
                          <div className='col-lg-3'>
                            <textarea
                              name='keyword'
                              onChange={this.onChange}
                              value={this.state.keyword}
                              className='form-control'
                              placeholder=''
                            ></textarea>
                            <span className='form-text text-danger'>
                              {errors.keyword}
                            </span>
                            <span className='form-text'>
                              Enter the values seprated by Comma (Dress,Jeans)
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='kt-portlet__head'>
                        <div className='kt-portlet__head-label'>
                          <h3 className='kt-portlet__head-title'>
                            Product Image Section
                          </h3>
                        </div>
                      </div>
                      <div className='kt-portlet__body'>
                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            Upload Product Image 1:
                          </label>
                          <div className='col-lg-3'>
                            <div className='kt-input-icon'>
                              <input
                                type='file'
                                name='photoUrl1'
                                onChange={(e) =>
                                  this.uploadImage(e, "uploadStatus1")
                                }
                                className='form-control'
                                placeholder=''
                              />
                              <span className='form-text text-danger'>
                                {errors.photoUrl1}
                              </span>
                            </div>
                            <span className='form-text text-success'>
                              {this.state.uploadStatus1}
                            </span>
                          </div>
                          <label className='col-lg-2 col-form-label'>
                            Upload Product Image 2:
                          </label>
                          <div className='col-lg-3'>
                            <div className='kt-input-icon'>
                              <input
                                type='file'
                                name='photoUrl2'
                                onChange={(e) =>
                                  this.uploadImage(e, "uploadStatus2")
                                }
                                className='form-control'
                                placeholder=''
                              />
                            </div>
                            <span className='form-text text-success'>
                              {this.state.uploadStatus2}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className='kt-portlet__head'>
                        <div className='kt-portlet__head-label'>
                          <h3 className='kt-portlet__head-title'>
                            Product Gallery Section
                          </h3>
                        </div>
                      </div>
                      <div className='kt-portlet__body'>
                        <div class='row form-group'>{documents}</div>
                      </div>
                      <div className='kt-portlet__head'>
                        <div className='kt-portlet__head-label'>
                          <h3 className='kt-portlet__head-title'>
                            Maintenance & Acoustics Section
                          </h3>
                        </div>
                      </div>
                      <div className='kt-portlet__body'>
                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            Maintenance Text:
                          </label>
                          <div className='col-lg-3'>
                            <textarea
                              name='maintenanceText'
                              onChange={this.onChange}
                              value={this.state.maintenanceText}
                              className='form-control'
                              placeholder=''
                            ></textarea>
                            <span className='form-text text-danger'>
                              {errors.maintenanceText}
                            </span>
                          </div>
                          <label className='col-lg-2 col-form-label'>
                            Maintenance Button Text:
                          </label>
                          <div className='col-lg-3'>
                            <input
                              type='text'
                              name='maintenanceBtnText'
                              onChange={this.onChange}
                              value={this.state.maintenanceBtnText}
                              className='form-control'
                              placeholder=''
                            />
                            <span className='form-text text-danger'>
                              {errors.maintenanceBtnText}
                            </span>
                          </div>
                        </div>
                        <div className='form-group row'>
                          <label className='col-lg-2 col-form-label'>
                            Maintenance File Upload:
                          </label>
                          <div className='col-lg-3'>
                            <div className='kt-input-icon'>
                              <input
                                type='file'
                                name='maintenanceFileUrl'
                                onChange={(e) =>
                                  this.uploadImage(e, "uploadStatus3")
                                }
                                className='form-control'
                                placeholder=''
                              />
                            </div>
                            <span className='form-text text-danger'>
                              {errors.maintenanceFileUrl}
                            </span>

                            <span className='form-text text-success'>
                              {this.state.uploadStatus3}
                            </span>
                          </div>

                          <label className='col-lg-2 col-form-label'>
                            Acoustics Text:
                          </label>
                          <div className='col-lg-3'>
                            <textarea
                              name='acousticsText'
                              onChange={this.onChange}
                              value={this.state.acousticsText}
                              className='form-control'
                              placeholder=''
                            ></textarea>
                            <span className='form-text text-danger'>
                              {errors.acousticsText}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className='kt-portlet__foot kt-portlet__foot--fit-x'>
                        <div className='kt-form__actions'>
                          <div className='row'>
                            <div className='col-lg-3 d-flex justify-content-around'>
                              <button
                                type='submit'
                                className={`btn btn-success ${
                                  productloading
                                    ? "kt-spinner kt-spinner--sm kt-spinner--light"
                                    : ""
                                }`}
                              >
                                Save & Continue
                              </button>
                              <button
                                type='button'
                                onClick={this.onReset}
                                className='btn btn-secondary'
                              >
                                Cancel
                              </button>
                            </div>
                            <div className='col-lg-10' />
                          </div>
                        </div>
                      </div>
                    </form>
                    {/*end::Form*/}
                  </div>
                  <AddSubProduct />
                  <AddAttribute />
                  <AddProductSKU></AddProductSKU>
                  <NewDemo></NewDemo>
                  {/* <ListAttributeMapping />  */}

                  {/*end::Portlet*/}

                  {/*end::Portlet datatable*/}
                </div>
                {/* end:: Content */}
              </div>
              {/* begin:: Footer */}
              <Footer />
              {/* end:: Footer */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddProduct.propTypes = {
  auth: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
  listCategory: PropTypes.func.isRequired,
  listSubCategoryOne: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  product: state.product,
  author: state.author,
  category: state.category,
  subCategory: state.subCategory,
  subCategoryChild: state.subCategoryChild,
});

export default connect(mapStateToProps, {
  addProduct,
  listCategory,
  listSubCategoryOne,
  listSubCategoryChildOne,
})(AddProduct);
