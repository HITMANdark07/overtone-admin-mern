import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import Sidebarmobile from "../../layouts/SidebarMobile";
import Asidebar from "../../layouts/Asidebar";
import Header from "../../layouts/Header";
import HeadeTopbar from "../../layouts/HeaderTopbar";
import SubHeader from "../../layouts/SubHeader";
import Footer from "../../layouts/Footer";
import {
  listProductSub,
  deleteProductSub,
} from "../../../actions/productsubAction";
import swal from "sweetalert2";
import SearchInput, { createFilter } from "react-search-input";
import { checkPermission } from "../../common/MenuList";
const queryString = require("query-string");
const KEYS_TO_FILTERS = [
  "productSubName",
  "saleDesc",
  "sku",
  "type",
  "salePrice",
  "taxable",
];
const Toast = swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
});

class ListProductSub extends Component {
  constructor() {
    super();
    this.state = {
      errors: {},
      searchTerm: "",
    };
    this.onEditClick = this.onEditClick.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
    this.searchUpdated = this.searchUpdated.bind(this);
  }
  componentDidMount() {
    // Editing here
    // const parsed = queryString.parse(this.props.location.search);
    // this.props.listProductSub({ productID: parsed.productID });
    const parsed = queryString.parse("this.props.location.search");
    this.props.listProductSub("{ productID: parsed.productID }");
  }

  //calls when edit button is clicked
  onEditClick(res) {
    localStorage.setItem("editproductsub", JSON.stringify(res));
    const parsed = queryString.parse(this.props.location.search);
    this.props.history.push(`editmapping?productID=${parsed.productID}`);
  }
  //calls when delete button is clicked
  onDeleteClick(id) {
    const deleteData = {
      id: id,
    };
    this.props.deleteProductSub(deleteData);
  }
  searchUpdated(term) {
    this.setState({ searchTerm: term });
  }
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.productsub.deleteproductsub !==
      this.props.productsub.deleteproductsub
    ) {
      Toast.fire({
        type: "success",
        title: " Sub-Products Deleted Successfully",
      }).then((getResult) => {
        const parsed = queryString.parse(this.props.location.search);
        this.props.listProductSub({ productID: parsed.productID });
      });
    }
    if (
      nextProps.productsub.addproductsub !== this.props.productsub.addproductsub
    ) {
      const parsed = queryString.parse(this.props.location.search);
      this.props.listProductSub({ productID: parsed.productID });
    }

    if (nextProps.errors !== this.props.errors) {
      Toast.fire({
        type: "error",
        title: "Check all the fields",
      });
      this.setState({ errors: nextProps.errors });
    }
  }

  render() {
    const { listproductsub, productsubloading } = this.props.productsub;
    var tableResult;
    if (listproductsub == null || productsubloading) {
      tableResult = (
        <tr>
          <td colSpan={9} className='text-center'>
            Loading.....
          </td>
        </tr>
      );
    } else {
      if (Object.keys(listproductsub).length > 0) {
        var filterData = listproductsub.filter(
          createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
        );
        tableResult = filterData.map((result) => {
          return (
            <tr>
              <td>{result.productSubName}</td>
              <td>{result.saleDesc}</td>
              <td>{result.sku}</td>
              <td>{result.type}</td>
              <td>{result.salePrice}</td>
              <td>{result.taxable}</td>
              <td>{result.incomeAccount}</td>
              <td>{result.purchaseDesc}</td>
              {/* <td><button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span></button></td>
                  <td><button  className="btn btn-link" onClick={()=>this.onDeleteClick(result._id)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--danger">Delete</span></button></td> */}
              {/* <td>
                    {checkPermission(this.props.auth,"PRODUCTS","UPDATE")&&
                    <button className="btn btn-link" onClick={()=>this.onEditClick(result)}><span className="kt-badge kt-badge--brand kt-badge--inline kt-badge--pill">View/Edit</span>
                    </button>}
                    </td> */}
              <td>
                {checkPermission(this.props.auth, "PRODUCTS", "DELETE") && (
                  <button
                    className='btn btn-link'
                    onClick={() => this.onDeleteClick(result._id)}
                  >
                    <span className='kt-badge kt-badge--brand kt-badge--inline kt-badge--danger'>
                      Delete
                    </span>
                  </button>
                )}
              </td>
            </tr>
          );
        });
      } else {
        tableResult = (
          <tr>
            <td colSpan={9} className='text-center'>
              No Record Found.....
            </td>
          </tr>
        );
      }
    }

    return (
      <div>
        <div
          className='kt-content  kt-grid__item kt-grid__item--fluid'
          id='kt_content'
        >
          <div className='kt-portlet'>
            <div className='kt-portlet__head kt-portlet__head--lg'>
              <div className='kt-portlet__head-label'>
                <span className='kt-portlet__head-icon'>
                  <i className='kt-font-brand flaticon2-line-chart' />
                </span>
                <h3 className='kt-portlet__head-title'>List Sub-Products</h3>
              </div>
            </div>
            <div className='col-sm-12 col-md-12'>
              <SearchInput
                placeholder='Search'
                onChange={this.searchUpdated}
                className='search-input'
              />
            </div>
            <div className='kt-portlet__body'>
              {/*begin: Datatable */}
              <table className='table table-striped table-bordered table-hover table-checkable'>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Sale Description</th>
                    <th>SKU</th>
                    <th>Type</th>
                    <th>Sale Price</th>
                    <th>Taxable</th>
                    <th>Income Account</th>
                    <th>Purchase Desc</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>{tableResult}</tbody>
                <tfoot>
                  <tr>
                    <th>Product Name</th>
                    <th>Sale Description</th>
                    <th>SKU</th>
                    <th>Type</th>
                    <th>Sale Price</th>
                    <th>Taxable</th>
                    <th>Income Account</th>
                    <th>Purchase Desc</th>
                    <th>Delete</th>
                  </tr>
                </tfoot>
              </table>
              {/*end: Datatable */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ListProductSub.propTypes = {
  auth: PropTypes.object.isRequired,
  listProductSub: PropTypes.func.isRequired,
  deleteProductSub: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  productsub: state.productsub,
});

export default connect(mapStateToProps, { listProductSub, deleteProductSub })(
  ListProductSub
);
