import React from "react";
import "./addProductScreen.css";
import Sidebarmobile from "../../layouts/SidebarMobile";
import Asidebar from "../../layouts/Asidebar";
import Header from "../../layouts/Header";
import SubHeader from "../../layouts/SubHeader";
import HeaderTopbar from "../../layouts/HeaderTopbar";
import { Link } from "react-router-dom";
import axios from 'axios'
import swal from "sweetalert2";
// import DemoModal from './DemoModal'
// import DeleteModal from "./DeleteUser";

import skuGen from "./logic-sku/app";
import ListParentAttributeCategory from "../parentattributecategory/ListParentAttributeCategory";
import AddParentAttributeCategory from "./AddParentAttributeCategory";

// Imported
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Footer from "../../layouts/Footer";
import { addProduct, createDraftProduct } from "../../../actions/productAction";
import { listParentAttributeCategory } from '../../../actions/parentattributecategoryAction';
import {listAttributeMapping,deleteAttributeMapping} from '../../../actions/attributemappingAction'
import { listAttributeCategory } from '../../../actions/attributecategoryAction';
import { addAttributeMapping, editAttributeMapping } from '../../../actions/attributemappingAction';
import { listCategory } from "../../../actions/categoryAction";
import { listSubCategoryOne } from "../../../actions/subCategoryAction";
import { listSubCategoryChildOne } from "../../../actions/subCategoryChildAction";
import { listProductOne } from '../../../actions/productAction';
import ListAttributeMapping from "./ListAttributeMapping";
import EditAttributeMapping from "./EditAttributeMapping";
import { editProduct } from "../../../actions/productAction";

// import ArrowBackIcon from "@mui/icons-material";
// import {
//   ArrowBack,
//   Publish,
//   KeyboardArrowDown,
//   KeyboardArrowUp
// } from "@material-ui/icons";


const Toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

let lenRes = 1;

class AddProductScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      name: "",
      productId: "",
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
      productValue: "",
      attributeValue: "",
      variantValue: "",
      count: 0,
      sku: [],
      click: false,
      attributeCount: 0,
      demo: [1, 2, 3],
      tempAtbName: [],
      tempAtbValue: [],
      tempVarLen: [{ num: '' }],
      demoValue: [{ num: '' }],
      quickship: 'Yes',
      dependentField: [{ parentAttributeCategoryID: '', attributeCategoryID: '', mappingType: "", mappingLabel: "", mappingValue: "", additionalPrice: "0", mappingName: '', isEnabled: '', subField: '' }],
      parentAttributeCategoryID: '',
      productID: "",
      mappingName: '',
      mappingLabel: '',
      mappingType: '',
      mappingValue: '',
      photoUrl: '',
      additionalPrice: "0",
      isEnabled: '',
      subField: "No",
      parsed: "",
      nextScreen: false,
      // value: '',
      label: '',
      type: '',
      variantDependentField: [
        {

          label: "", value: "", additionalPrice: "0", type: '', sku: ''
        },
      ],
      finalVariant: [],

    };


    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onReset = this.onReset.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.uploadImageBulk = this.uploadImageBulk.bind(this);

  }

  componentDidMount() {
    // this.props.createDraftProduct();
    this.props.listCategory();
    this.props.listParentAttributeCategory();
    this.props.listAttributeCategory();
    this.setState({ productID: this.props.match.params.id })

    var editResult = {}
    if (!localStorage.editproduct) {
      // this.props.history.push('/admin/listproduct')

    } else {
      editResult = JSON.parse(localStorage.getItem('editproduct'))
    }
    this.setState({
      _id: editResult._id,
      name: editResult.name,
      productValue: editResult.value,
      description: editResult.description,
      price: editResult.price,
      discountPrice: editResult.discountPrice,
      stockCount: editResult.stockCount,
      photoUrl1: editResult.photoUrl1,
      photoUrl2: editResult.photoUrl2,
      documents: editResult.documents ? JSON.parse(editResult.documents) : [{ url: '', uploadstatus: '', fileName: '' }],
      maintenanceText: editResult.maintenanceText,
      maintenanceBtnText: editResult.maintenanceBtnText,
      maintenanceFileUrl: editResult.maintenanceFileUrl,
      acousticsText: editResult.acousticsText,
      categoryID: editResult.categoryID,
      subcategoryID: editResult.subcategoryID,
      subcategoryChildID: editResult.subcategoryChildID,
      isEnabled: editResult.isEnabled,
      quickship: editResult.quickship,
      keyword: editResult.keyword,
    }, () => {

      this.props.listSubCategoryOne({ categoryID: this.state.categoryID });
      this.props.listSubCategoryChildOne({ subcategoryID: this.state.subcategoryID });
    })


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

  onSkuSubmit(submit = false, index = null) {
    let atbName = this.state.dependentField.map((res) => res.mappingValue)
    this.setState({ tempAtbName: [...this.state.tempAtbName, atbName] })
    let firstPortion = this.state.productValue;

    if (!firstPortion) {
      if (!(atbValue && thirdArg)) {
        Toast.fire({
          type: 'error',
          title: 'Please Enter the product value',
        })
        return;
      }
    }
    // second portion
    let atbValue = this.state.dependentField.map((res) => res.mappingValue).toString();

    let variantLen = atbValue.toString().split(',').length;
    this.setState({ tempVarLen: [...this.state.tempVarLen, variantLen] });
    let thirdArg = ''
    let forthArg = ''

    if (this.state.dependentField.length == 2) {

      thirdArg = this.state.dependentField[1].mappingValue;
      atbValue = this.state.dependentField[0].mappingValue;
      if (!(atbValue && thirdArg)) {
        Toast.fire({
          type: 'error',
          title: 'Please Enter value field',
        })
        return;
      }
    } else if (this.state.dependentField.length == 3) {
      thirdArg = this.state.dependentField[1].mappingValue;
      atbValue = this.state.dependentField[0].mappingValue;
      forthArg = this.state.dependentField[2].mappingValue;
      if (!(atbValue && thirdArg && forthArg)) {
        Toast.fire({
          type: 'error',
          title: 'Please Enter value field',
        })
        return;
      }
    }

    if (!submit) {
      Toast.fire({
        type: 'success',
        title: 'An Attribute Value was added',
      })
    }

    if (submit) {

      console.log(forthArg);
      const result = skuGen(firstPortion, atbValue, thirdArg, forthArg)
      console.log(result);
      this.setState({ sku: result });

      // const tempVarLen = {...result}
      // this.setState({tempVarLen});

      let varLength = this.state.tempAtbValue;
      for (let i = 0; i < result.length; i++) {
        varLength = this.state.tempAtbValue.concat([{ num: '1' }])
      }
      this.setState({ tempVarLen: varLength })

      Toast.fire({
        type: 'success',
        title: 'SKU has been generated Successfully',
      })
    }



    lenRes = 1;
    lenRes = lenRes * variantLen;
    console.log(lenRes)


    const demoValue = this.state.demoValue.concat([{ num: '' }])
    this.setState({ demoValue })
    console.log(this.state.dependentField)

    if ((typeof index) === 'number') {

      let newVarient = [
        {
          type: '',
          label: "",
          list: this.state.variantDependentField
        }
      ]
      let tempAttribute = this.state.dependentField[index];
      let saveAttribute = {
        ...tempAttribute,
        photoUrl: '',
        dependentField: JSON.stringify(newVarient),
        productID: this.state.productID
      }
      this.props.addAttributeMapping(saveAttribute);
      console.log(saveAttribute)
    }

  }


  onChange(e) {

    this.setState({ [e.target.name]: e.target.value });
    // if(e.target.name==='authorID' && e.target.value !=""){
    //     this.props.listCategory({authorID:e.target.value});
    // }
    if (this.state.productValue) {
      this.setState({ count: 1 })
    } else {
      this.setState({ count: 0 })
    }

    if (this.state.attributeValue) {
      this.setState({ count: 2 })
    } else {
      this.setState({ count: 1 })
    }

    if (this.state.variantValue) {
      this.setState({ count: 3 })
    } else {
      this.setState({ count: 2 })
    }

    if (e.target.name === "categoryID" && e.target.value != "") {
      this.props.listSubCategoryOne({ categoryID: e.target.value });
    }
    if (e.target.name === "subcategoryID" && e.target.value != "") {
      this.props.listSubCategoryChildOne({ subcategoryID: e.target.value });
    }
  }

  onSubmit(e) {
    this.setState({ errors: {} });
    // e.preventDefault();
    const Data = {
      _id: this.state.productID,
      name: this.state.name,
      value: this.state.productValue,
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
      quickship: this.state.quickship,
    };
    console.log(Data)
    // console.log(this.props.product.addproduct._id)
    // this.props.addProduct(Data);
    // const res = axios.get('/api/product/fahim')
    // console.log(res)

    if (this.state.categoryID && this.state.subcategoryID) {

      this.props.editProduct(Data);

      Toast.fire({
        type: 'success',
        title: 'A Product Was Added SuccessFully',
      })
    } else {
      Toast.fire({
        type: 'error',
        title: 'Please select a categroy group and sub group',
      })
    }

    localStorage.setItem('editproduct', JSON.stringify(Data))
  }

  onSubmitVariant(index) {
    let temp = this.state.variantDependentField;

    let finalVariation = [
      {
        type: this.state.type,
        label: this.state.label,
        list: temp
      }
    ]

    let tempAttribute = this.state.dependentField[0];
    let saveAttribute = {
      ...tempAttribute,
      photoUrl: this.state.photoUrl,
      dependentField: JSON.stringify(finalVariation),
      productID: this.state.productID,
      _id: this.props.attributemapping.addattributemapping._id,
    }
    this.props.editAttributeMapping(saveAttribute);


    temp = temp.concat([{

      label: "", value: "", additionalPrice: "0", type: '', sku: ''
    }])
    // let varType = this.state.variantDependentField[index].type;

    this.setState({ variantDependentField: temp });



    this.setState({ finalVariant: finalVariation })
    console.log(finalVariation)
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

  handleModal(e) {
    if (e.target.value == 'modal') {
      this.setState({ click: true })
    } else {
      this.setState({ click: false })
    }
  }
  onAttributeAdd() {
    this.setState({ attributeCount: this.state.attributeCount + 1 });
    const dependentField = this.state.dependentField.concat([{ type: "", label: "", value: "", additionalPrice: "0", mappingName: '', isEnabled: '', subField: '' }]);
    this.setState({ dependentField });
  }


  onhandleChangeField(e, index) {
    const name = e.target.name;
    const value = e.target.value;
    if (name === "type") {
      this.setState({ type: value });
    } else if (name === "label") {
      this.setState({ label: value });
    }

  }


  // need to uncomment 437 for productId
  onhandleChangeSubField(e, index, indexSub) {
    const name = e.target.name;
    const value = e.target.value;
    console.log(value)
    const temp = this.state.dependentField;
    if (name === "label") {
      temp[index].mappingLabel = value;
    } else if (name === "value") {
      temp[index].mappingValue = value;
    } else if (name === "additionalPrice") {
      temp[index].additionalPrice = value;
    } else if (name === 'parentCategory') {
      temp[index].parentAttributeCategoryID = value;
    } else if (name === 'category') {
      temp[index].attributeCategoryID = value;
    } else if (name === 'mappingName') {
      temp[index].mappingName = value;
    } else if (name === "isEnabled") {
      temp[index].isEnabled = value;
    } else if (name === "subField") {
      temp[index].subField = value;
    } else if (name === 'type') {
      temp[index].mappingType = value;
    }
    this.setState({
      dependentField: temp
    })
  }

  onhandleChangeVariantField(e, index, sku) {
    const name = e.target.name;
    const value = e.target.value;
    const temp = this.state.variantDependentField;
    if (name === "label") {
      temp[index].label = value;
    } else if (name === "value") {
      temp[index].value = value;
    } else if (name === "additionalPrice") {
      temp[index].additionalPrice = value;
    } else if (name === 'type') {
      temp[index].type = value;
    }
    console.log('hello')
    console.log(sku);

    if (sku) {
      temp[index].sku = sku;
    }
    this.setState({
      variantDependentField: temp,
    });
  }

  resetAllAttribute() {
    window.location.reload();
    this.setState({
      errors: {},
      parentAttributeCategoryID: '',
      attributeCategoryID: '',
      // productID:'',
      mappingName: '',
      mappingLabel: '',
      mappingType: '',
      mappingValue: '',
      photoUrl: '',
      additionalPrice: '',
      dependentField: [{ type: "", label: "", list: [{ label: "", value: "", additionalPrice: "0" }] }],
      variantDependentField: [
        {

          label: "", value: "", additionalPrice: "0", type: '', sku: ''
        },
      ]
    })
  }

  deleteAttribute(index) {
    console.log(index)
    if (this.state.dependentField.length > 1) {

      let temporary = this.state.dependentField;
      temporary.splice(index,1)
      console.log(temporary)
      this.setState({dependentField:temporary})
    }

  //    const deleteData={
  //     // id:id
  // }
  // this.props.deleteAttributeMapping(deleteData)
// console.log(this.state.dependentField[index])
    
  }


  render() {
    console.log(this.state.categoryID);

    // console.log(this.state.finalVariant)
    // console.log(this.state.variantDependentField)

    const { addproduct } = this.props.product;


    if (addproduct) {

      //   let prodId = this.props.product.addproduct._id;
      //   console.log(prodId)

      // this.setState({ productID: addproduct._id })
    }
    const elements = ['one', 'two', 'three'];

    const items = []

    for (const [index, value] of this.state.sku.entries()) {
      items.push(<div style={{ backgroundColor: '#fff' }} key={index} className='attribute_dropdown_container'>
        <div className='attribute_dropdown_wrapper'>

          <div className='attirbute_dropdown_content'>
            Added Variants SKU: {value}
          </div>
          <div div className='attribute_dropdown_icon_container'>
            {/* <KeyboardArrowDown></KeyboardArrowDown>
            <KeyboardArrowUp></KeyboardArrowUp> */}
            <span className='attribute_dropdown_delete'>Delete</span>
          </div>
        </div>
        <div className='create_attribute_row'>
          <div className='add_product_value'>
            <label className='main_title'>Label</label>
            <input required name='label' onChange={(e) =>
              this.onhandleChangeVariantField(e, index, value)
            }
              // value={this.state.variantDependentField[index].label}  

              type='text'
              className='add_product_input' />
          </div>
          <div className='add_product_value'>
            <label className='main_title'>Additional Cost</label>
            <input name='additionalPrice'
              onChange={(e) =>
                this.onhandleChangeVariantField(e, index)
              }
              // value={this.state.variantDependentField[index].additionalPrice} 

              type='text' className='add_product_input' />
          </div>


        </div>
        <div className='create_attribute_row'>

          <div className='add_product_value'>
            <label className='main_title'>Value</label>
            <input required name='value' onChange={(e) =>
              this.onhandleChangeSubField(e, index, value)
            }
              // value={this.state.variantDependentField[index].value}                                                            name='value'        
              onChange={(e) => this.onhandleChangeVariantField(e, index)} type='text' className='add_product_input' />

          </div>
        </div>
        <button onClick={() => this.onSubmitVariant(index)} className='product_publish_btn mt-3'>Save</button>
      </div>

      )
    }


    // console.log(this.state.tempVarLen)
    console.log(this.state.sku)
    // console.log(this.state.tempAtbName)
    // console.log(this.state.dependentField)
    const { listparentattributecategory, parentattributecategoryloading } = this.props.parentattributecategory;

    var optionParentCategory = [];
    if (listparentattributecategory == null || parentattributecategoryloading) {
      optionParentCategory = (<option value="">Loading...</option>)
    } else {
      if (Object.keys(listparentattributecategory).length > 0) {
        optionParentCategory = listparentattributecategory.map(result => {
          return <option value={result._id}>{result.attributeName}</option>
        })
      } else {
        optionParentCategory = (<option value="">No Parent Attributes  Found...</option>)
      }
    }


    if (this.state.click) {
      document.getElementById('parent-attribute-modal').style.display = 'block';
      // document.getElementById('pagerender').style.background='#000'
    }


    const list = this.state.sku.toString()
    // const list = this.state.sku.length >1 && this.state.sku.forEach(function(result, idx) {
    //   console.log('hiii')
    //   return <li>{this.state.sku[idx]}</li>
    // })
    console.log(list)
    const { listattributemapping, attributemappingloading } = this.props.attributemapping;

    if (Object.keys(listAttributeMapping).length > 0) {

      let fa = listattributemapping.map(result => (result.mappingName))
      console.log(fa)
    }


    console.log(this.props.attributemapping.listattributemapping)

    const { errors, productValue, count } = this.state;
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

    // Learn this

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


    // Parent Attribute

    // Document

    const documents = this.state.documents.map((value, index) => {
      return (
        <React.Fragment>
          <div className='col-lg-12 mt-3'>
            <label style={{ minWidth: '200px' }} className='col-lg-2 col-form-label main_title'>Button Name</label>
            <div className='col-lg-3'>
              <input
                style={{ minWidth: '245px', border: '1px solid #000' }}
                type='text'
                required
                name='buttonName'
                onChange={(e) => this.handleChange(e, index)}
                className='form-control'
                placeholder=''
              />
              <div className='row'>
              </div>
              <label style={{ minWidth: '200px' }} className='col-lg-2 col-form-label main_title'>
                File {index + 1}
              </label>
              <div className='col-lg-3'>
                <div className='kt-input-icon'>
                  {value.fileName === "" ? (
                    <input
                      style={{ minWidth: '245px', marginLeft: '-8px', border: '1px solid #000' }}
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
                <span style={{ minWidth: '200px' }} className='col-lg-2 col-form-label main_title'>Upload Image Only</span>
              </div>
              <div className='col-lg-2'>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    });




    //AttributeCategory list
    const { listattributecategory, attributecategoryloading } =
      this.props.attributecategory;

    var optionCategory = [];
    if (listattributecategory == null || attributecategoryloading) {
      optionCategory = <option value=''>Loading...</option>;
    } else {
      if (Object.keys(listattributecategory).length > 0) {
        optionCategory = listattributecategory.map((result) => {
          return <option value={result._id}>{result.attributeName}</option>;
        });
      } else {
        optionCategory = (
          <option value=''>No Attributes Category Found...</option>
        );
      }
    }

    // Variant list

    // 


    return (
      <React.Fragment>
        <div className={"add_product_screen"}>
          <Asidebar></Asidebar>
          <div
            id='kt_header'
            className='kt-header kt-grid__item  kt-header--fixed '
          >
            <Header></Header>
            <HeaderTopbar></HeaderTopbar>
            <SubHeader first='Home' second='Add Product' third=''></SubHeader>
          </div>
          <div id='dark-bg' className={"add_main_wrapper"}>
            <div className={"add_heading"}>
              <Link to='/'>
                {/* <ArrowBack className='arrow_icon'></ArrowBack> */}
              </Link>
              <span className={"add_main_title"}>Add Product</span>
            </div>
            <div className='add_product_row'>
              <div className='add_product_main_col'>
                <div className='main_content_container'>
                  <div className='title_and_value'>
                    <div className='add_product_title'>
                      <label className='main_title'>Title</label>
                      <input
                        name='name'
                        onChange={this.onChange}
                        value={this.state.name}
                        type='text' className='add_product_input'
                      />
                      <span className='form-text text-danger'>
                        {errors.name}
                      </span>
                    </div>
                    <div className='add_product_value'>
                      <label className='main_title'>Value</label>
                      <input value={this.state.productValue} type='text' name='productValue' onChange={this.onChange} className='add_product_input' />
                    </div>
                  </div>
                  <div className='text_area_container'>
                    <label className='main_title'>Description</label>
                    <textarea name='description'
                      onChange={this.onChange}
                      value={this.state.description} id='' cols='55' rows='5'></textarea>
                  </div>
                </div>
                <div className='add_product_media_container'>
                  <label className='main_title'>Media</label>
                  <div className='media_row'>
                    <div className='media_col'>
                      <label htmlFor='file'>

                        {/* <Publish className='upload_img_icon'></Publish> */}
                      </label>
                      <input
                        type='file'
                        name='photoUrl1'
                        onChange={(e) => this.uploadImage(e, "uploadStatus1")}
                        className='form-control_upload'
                        placeholder='Upload Image'
                        style={{ margin: '20px 0 15px 100px' }}
                      // style={{ display: 'none' }}
                      />
                      <span className="form-text text-danger">{errors.photoUrl1}</span>
                      <span className="form-text text-success">{this.state.uploadStatus1}</span>

                      <div className='product_img_titile'>Product Image 1 <span className='red' style={{ color: '#ff0000' }}>*</span> </div>
                    </div>
                    <div className='media_col'>
                      <label htmlFor="file">
                        {/* <Publish className='upload_img_icon'></Publish> */}
                      </label>
                      <input
                        type='file'
                        name='photoUrl2'
                        onChange={(e) => this.uploadImage(e, "uploadStatus2")}
                        className='form-control_upload'
                        placeholder='Upload Image'
                        style={{ margin: '20px 0 15px 100px' }}
                      // style={{ display: 'none' }}
                      />
                      <span className="form-text text-danger">{errors.photoUrl2}</span>
                      <span className="form-text text-success">{this.state.uploadStatus2}</span>
                      <div className='product_img_titile'>Product Image 2</div>
                    </div>
                  </div>
                </div>
                <div className='add_price_container'>
                  <div className='add_product_title'>
                    <label className='main_title'>Price</label>
                    <input type='text' name='price'
                      onChange={this.onChange}
                      value={this.state.price} className='add_product_input' />
                    <span className='form-text text-danger'>
                      {errors.price}
                    </span>
                  </div>
                  <div className='add_product_value'>
                    <label className='main_title'>Discount Price</label>
                    <input
                      name='discountPrice'
                      onChange={this.onChange}
                      value={this.state.discountPrice} type='text' className='add_product_input' />
                    <span className='form-text text-danger'>
                      {errors.discountPrice}
                    </span>
                  </div>
                </div>
                <div className='add_inventory_container'>

                  <div className='add_product_title'>
                    <label className='main_title'>Count In Stock</label>
                    <input name='stockCount'
                      onChange={this.onChange}
                      value={this.state.stockCount} type='text' className='add_product_input' />
                    <span className='form-text text-danger'>
                      {errors.stockCount}
                    </span>
                  </div>
                  <div className='add_product_title'>
                    <label style={{ width: '100%' }} className='main_title'>Genarated SKU </label>
                    <div className='add_product_input sku_genarated_text'>
                      {this.state.sku.length > 0 ? <div>
                        {list}
                      </div> :
                        <p>

                          No SKU Genarated
                        </p>
                      }


                    </div>
                  </div>
                </div>

                <div className='add_attribute_container'>
                  {/* {this.state.demo.forEach((res))} */}
                  <label className='main_title'>Add Attribute</label>
                  <div className='select_container'>

                    <select
                      name='subcategoryChildID'
                      onChange={(e) => this.onChange(e)}
                      value={this.state.subcategoryChildID}
                      className='form-control_select'
                      placeholder=''
                    >
                      <option value=''>Custom Add Attribute</option>
                    </select>
                    <span onClick={() => this.onAttributeAdd()} className='select_add_btn'>Add</span>
                    <span onClick={() => this.onSkuSubmit(true)} className='select_add_btn'>Create SKU</span>
                  </div>
                  {this.state.dependentField.map((res, index) => (
                    <div className='attribute_dropdown_container'>
                      <div className='attribute_dropdown_wrapper'>

                        <div className='attirbute_dropdown_content'>

                          New Attribute
                        </div>
                        <div className='attribute_dropdown_icon_container'>
                          {/* <KeyboardArrowDown></KeyboardArrowDown>
                          <KeyboardArrowUp></KeyboardArrowUp> */}
                          <span onClick={() => this.deleteAttribute(index)} className='attribute_dropdown_delete'>Delete</span>
                        </div>
                      </div>
                      <div className='create_attribute_container'>
                        <div className='create_attribute_row'>
                          <div className='add_product_title'>
                            <label className='main_title'>Select Parent Category</label>
                            <select
                              name='parentCategory'
                              onChange={(e) => this.onhandleChangeSubField(e, index)}
                              value={res.parentAttributeCategoryID}
                              className='form-control_select'
                              placeholder=''
                            >
                              <option value=''>Select Category</option>
                              {optionParentCategory}
                            </select>
                            <span className="form-text text-danger">{errors.parentAttributeCategoryID}</span>
                          </div>
                          <div className='add_product_value'>
                            <label className='main_title'>Mapping Name</label>
                            <input type='text' name='mappingName' onChange={(e) => this.onhandleChangeSubField(e, index)}
                              value={res.mappingName}
                              className='add_product_input' />
                          </div>
                        </div>
                        <div className='create_attribute_row'>
                          <div className='add_product_title'>
                            <label className='main_title'>Select Category</label>
                            <select name="category" onChange={(e) => this.onhandleChangeSubField(e, index)} value={res.attributeCategoryID} className="form-control_select" placeholder="" >
                              <option value="">Select</option>
                              {optionCategory}
                            </select>
                            <span className="form-text text-danger">{errors.attributeCategoryID}</span>
                          </div>
                          <div className='add_product_value'>
                            <label className='main_title'>Additional Cost</label>
                            <input name='additionalPrice' onChange={(e) => this.onhandleChangeSubField(e, index)}
                              value={res.additionalPrice} type='text' className='add_product_input' />
                          </div>

                          {/* */}
                        </div>
                        <div className='create_attribute_row'>
                          <div className='add_product_title'>
                            <label className='main_title'>Type</label>
                            <select
                              name='type'
                              onChange={(e) => this.onhandleChangeSubField(e, index)}
                              value={res.type}
                              className='form-control_select'
                              placeholder=''
                            >
                              <option value=''>Select</option>
                              <option value="dropdown">Dropdown</option>
                              <option value="color">Color Code</option>
                              <option value="image+text">Image+Text</option>
                            </select>
                          </div>
                          <div className='add_product_value'>
                            <label className='main_title'>Label</label>
                            <input type='text' name='label' onChange={(e) => this.onhandleChangeSubField(e, index)}
                              value={res.mappingLabel} className='add_product_input' />
                          </div>


                        </div>
                        <div className='create_attribute_row'>
                          <div className='add_product_title'>
                            <label className='main_title'>isEnabled</label>
                            <select
                              name='isEnabled'
                              onChange={(e) => this.onhandleChangeSubField(e, index)}
                              value={res.isEnabled}
                              className='form-control_select'
                              placeholder=''
                            >
                              <option value="">Select isEnabled</option>
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                          <div className='add_product_value'>
                            <div className='add_product_title'>
                              <label className='main_title'>Value</label>
                              <input name='value' onChange={(e) => this.onhandleChangeSubField(e, index)}
                                value={res.mappingValue} className='add_product_input' type='text'></input>
                            </div>

                          </div>



                        </div>
                        <div className='create_attribute_row'>
                          <div className='add_product_title'>

                            <label className='main_title'>Sub Field</label>
                            <select
                              name='subField'
                              onChange={(e) => this.onhandleChangeSubField(e, index)}
                              value={res.subField}
                              className='form-control_select'
                              placeholder=''
                            >
                              <option value='select'>Select</option>
                              <option value='Yes'>Yes</option>
                              <option value='No'>No</option>
                            </select>
                          </div>
                          <div className='add_product_title'>
                            {res.mappingType === "image+text" && <React.Fragment>
                              <label className="main_title">Upload  Image:</label>
                              <input type="file" name="photoUrl" onChange={this.uploadImage} className='form-control_upload'
                                placeholder='Upload Image'
                              />
                              <span className="form-text text-danger">{errors.photoUrl}</span>
                              <span className="form-text text-success">{this.state.uploadStatus}</span>
                              <span className="form-text text-muted">File Resolution (292px X 69px)</span>
                            </React.Fragment>}
                          </div>
                        </div>
                      </div>
                      <div className='attribute_create_button'>
                        <button onClick={() => this.onSkuSubmit(false, index)} className='product_publish_btn'>Save</button>
                      </div>
                    </div>
                  ))}


                </div>
                {/* Attribute Container End */}
                {/* <EditAttributeMapping /> */}
                {this.props.attributemapping.addattributemapping && this.state.dependentField.map((res, index) => (
                  <div className='add_variant_container'>
                    <label className='main_title'>Add Variants</label>

                    <div style={{ marginTop: '35px' }} className='create_attribute_row'>
                      <div className='add_product_value'>

                        <label className='main_title'>Variant Type</label>
                        <select
                          name='type'
                          onChange={(e) => this.onhandleChangeField(e)}
                          value={this.state.type}
                          className='form-control_select'
                          placeholder=''
                        >
                          <option value=''>Select type</option>
                          <option value='dropdown'>Dropdown</option>
                          <option value='color'>Color Code</option>
                        </select>
                      </div>
                      <div className='add_product_value'>
                        <label className='main_title'>Label</label>
                        <input
                          type='text'
                          name='label'
                          onChange={(e) => this.onhandleChangeField(e)}
                          value={this.state.label}
                          className='add_product_input'
                          placeholder=''
                        />
                      </div>
                    </div>
                    <button style={{ margin: '17px 0 10px 0' }} onClick={() => this.resetAllAttribute()} className='select_add_btn'>Add New</button>

                    {items}




                  </div>
                ))}

              </div>
              <div className='add_product_secondary_col'>
                <div className='product_status_container'>
                  <div className='product_status'>Product Status</div>
                  <div className='product_status_value_container'>
                    <div className='product_status_value'>Status: Draft</div>
                    <div className='product_status_value'>Visibility: Public</div>
                    <div className='product_status_value'>Created At: </div>
                  </div>
                  <div style={{ marginLeft: '20px' }} className='product_publish_container'>
                    <button onClick={() => this.onSubmit()} className='product_publish_btn'>Publish</button>
                  </div>
                </div>
                <div className='product_group_container'>
                  <div className='product_status'>Product Group</div>
                  <div style={{ padding: '30px 20px 0 20px' }} className='add_product_title'>
                    <label className='main_title'>Select Group  <span className='red' style={{ color: '#ff0000' }}>*</span></label>
                    <select
                      required
                      name='categoryID'
                      onChange={(e) => this.onChange(e)}
                      value={this.state.categoryID}
                      className='form-control_select'
                      placeholder=''
                    >
                      <option value=''>Select Group</option>

                      {optionResultCategory}
                    </select>
                  </div>
                  <div style={{ padding: '0 20px' }} className='add_product_title'>
                    <label className='main_title'>Select Sub Group  <span className='red' style={{ color: '#ff0000' }}>*</span></label>
                    <select
                      required
                      name='subcategoryID'
                      onChange={(e) => this.onChange(e)}
                      value={this.state.subcategoryID}
                      className='form-control_select'
                      placeholder=''
                    >
                      <option value=''>Select Sub-Group</option>
                      {optionResultSubCategory}
                    </select>
                    <span className='form-text text-danger'>
                      {errors.subcategoryID}
                    </span>
                  </div>
                  <div style={{ padding: '0 20px 30px 20px' }} className='add_product_title'>
                    <label className='main_title'>Select Sub Group Child</label>
                    <select
                      name='subcategoryChildID'
                      onChange={(e) => this.onChange(e)}
                      value={this.state.subcategoryChildID}
                      className='form-control_select'
                      placeholder=''
                    >
                      <option value=''>Select</option>
                      {optionResultSubCategoryChild}
                    </select>
                    <span className='form-text text-danger'>
                      {errors.subcategoryChildID}
                    </span>
                  </div>
                </div>
                <div className='product_options_container'>
                  <div className='product_status'>Product Options</div>
                  <div style={{ padding: '30px 20px 0 20px' }} className='add_product_title'>
                    <label className='main_title'>Keyword (Optional)</label>
                    <input
                      name='keyword'
                      onChange={this.onChange}
                      value={this.state.keyword}
                      className='form-control_select'
                      placeholder=''
                    >
                    </input>
                    <span className='form-text text-danger'>
                      {errors.keyword}
                    </span>
                    <span className='form-text'>
                      Enter the values seprated by Comma (Dress,Jeans)
                    </span>
                  </div>
                  <div style={{ padding: '0 20px 0 20px' }} className='add_product_title'>
                    <label className='main_title'>Quick Ship</label>
                    <select
                      onChange={this.onChange} value={this.state.quickship}
                      name='quickship'

                      className='form-control_select'
                      placeholder=''
                    >
                      <option value=''>Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                  <div style={{ padding: '0px 20px 30px 20px' }} className='add_product_title'>
                    <label className='main_title'>isEnabled</label>
                    <select
                      name='isEnabled'
                      onChange={this.onChange}
                      value={this.state.isEnabled}
                      className='form-control_select'
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
                </div>
                <div className='product_gallery_conatiner'>
                  <div className='product_status_container'>
                    <div className='product_status'>Product Gallery</div>
                    <div className='product_gallery_upload_container'>
                      {documents}
                      {/* <div className='add_gallery_link'>
                    <Link to='#'>Add Product Image Gallery <span className='red' style={{color:'#ff0000'}}>*</span></Link>

                    </div>
                  <div className='product_btn_name_container'>
                    <label style={{marginLeft:'20px'}} className='main_title mt-3'>Button Name</label>
                    <input name='buttonName'
                  onChange={(e) => this.handleChange(e, index)} style={{width:'245px', marginTop:'10px', marginLeft:'20px', marginRight:'20px', marginBottom: '30px'}} type='text' className='add_product_input'></input>
                  </div> */}
                    </div>
                  </div>
                </div>
                <div className='product_maintanence_container'>
                  <div className='product_status'>Product Maintanence</div>
                  <div className='maintancence_upload'>
                    <div className='add_gallery_link'>
                      <Link to='#'>Maintenance File Upload </Link>
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
                  <div style={{ padding: '30px 20px 0 20px' }} className='add_product_title'>
                    <label className='main_title'>Maintanence Button Text</label>
                    <textarea type='text'
                      name='maintenanceBtnText'
                      onChange={this.onChange}
                      value={this.state.maintenanceBtnText} style={{ height: '30px' }} type='text' />
                  </div>
                  <span className='form-text text-danger'>
                    {errors.maintenanceBtnText}
                  </span>
                  <div style={{ padding: '30px 20px 0 20px' }} className='add_product_title'>
                    <label className='main_title'>Maintanence Text</label>
                    <textarea name='maintenanceText'
                      onChange={this.onChange}
                      value={this.state.maintenanceText} style={{ height: '75px' }} type='text' />
                    <span className='form-text text-danger'>
                      {errors.maintenanceText}
                    </span>
                  </div>
                  <div style={{ padding: '30px 20px 30px 20px' }} className='add_product_title'>
                    <label className='main_title'>Acoustic Text</label>
                    <textarea name='acousticsText'
                      onChange={this.onChange}
                      value={this.state.acousticsText} style={{ height: '75px' }} type='text' />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ marginTop: '280px' }}>

          <Footer style={{ marginTop: '280px' }} />
        </div>
      </React.Fragment>
    );
  }
}

AddProductScreen.propTypes = {
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
  attributemapping: state.attributemapping,
  parentattributecategory: state.parentattributecategory,
  attributecategory: state.attributecategory,
  addAttributeMapping: state.addAttributeMapping,
});

export default connect(mapStateToProps, {
  addProduct,
  listCategory,
  listSubCategoryOne,
  listSubCategoryChildOne,
  editProduct,
  createDraftProduct,
  listParentAttributeCategory,
  addAttributeMapping,
  listAttributeCategory,
  editAttributeMapping,
  listProductOne,
  deleteAttributeMapping,


})(AddProductScreen);
