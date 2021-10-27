import React, { useEffect, useState, useMemo } from "react";

import "./App.css";
import { listProduct, productId } from "../../../actions/productAction";
import { listUser, addUser } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import axios from "axios";
// import DemoModal from "./modals/DemoModal";
import Helper from "./modals/Helper";
import AttributeModal from "./modals/AttributeModal";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
});

let pid = [];
let prod;
let found;
let attributes;
let result = "";

const OrderCreateComponent = () => {
  const dispatch = useDispatch();

  const { listproduct } = useSelector((state) => state.product);
  const { listuser } = useSelector((state) => state.user);

  const { selectedAttribute } = useSelector((state) => state.product);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mailing, setMailing] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [click, setClick] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [product, setProduct] = useState([]);

  const imgBaseURL = "/static/";

  //   console.log(product);

  useEffect(() => {
    dispatch(listProduct());
    dispatch(listUser());
    // document.getElementById("modal_btn").click();
  }, [selectedAttribute]);
  const createUserHandler = async (e) => {
    e.preventDefault();
    const userData = {
      name: username,
      email: email,
      mobile: mobile,
      password: password,
      password2: password,
    };
    console.log(userData);
    await dispatch(addUser(userData));

    Toast.fire({
      type: "success",
      title: "An New user has been created",
    });
  };

  // Product Selection and filtering
  // let subtotal = 0;
  // let discount = 0;
  const addProductHandler = (id) => {
    found = pid.find((_id) => _id == id);
    if (found) {
      pid = pid.filter((p) => p !== id);
      prod = listproduct.find((prod) => prod._id == id);

      setSubtotal((prev) => prev - Number(prod.price));
      setDiscount((prev) => prev - Number(prod.discountPrice));
    } else {
      pid.push(id);
      prod = listproduct.find((prod) => prod._id == id);
      document.getElementById("modal_btn").click();
      console.log(prod);
      setProduct(prod);
      setSubtotal((prev) => prev + Number(prod.price));
      setDiscount((prev) => prev + Number(prod.discountPrice));
      // dispatch(productId(id));
    }
    // console.log(pid);
  };

  // product total price

  let userId = [];
  const userSelectHandler = (id) => {
    if (userId) {
      userId.pop();
      userId.push(id);
    } else {
      userId.push;
    }
    console.log(userId);

    let mail = listuser.find((user) => {
      if (user._id == userId) {
        return user.email;
      }
    }).email;

    setMailing(mail);
  };

  const submitOrder = async () => {
    if (pid.length > 0 && userId.length > 0) {
      pid.map((id) => (result += `-${id}`));

      result += `&userId=${userId[0]}`;

      result = result.slice(1, -1);

      let mail = listuser.find((user) => {
        if (user._id == userId) {
          return user.email;
        }
      }).email;

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // console.log(
      //   "fahim",
      //   selectedAttribute.key,
      //   selectedAttribute.additionalPrice,
      //   selectedAttribute.mapValue
      // // );
      // let qstring = `${selectedAttribute.key}-${selectedAttribute.mapValue}-${selectedAttribute.additionalPrice}`;
      // console.log(result + qstring);
      // If you deploy in production, please change it url

      try {
        await axios.post(
          `http://localhost:5000/api/orderemail/productId=${result}`,

          { email: mail },
          config
        );
        console.log("success");
      } catch (error) {
        console.error(error);
      }
      console.log(mail);
      console.log("success");
      Toast.fire({
        type: "success",
        title: "An Email has been sent to the user",
      });
    } else {
      Toast.fire({
        type: "error",
        title: "Please select a user or product",
      });
    }
  };

  return (
    <React.Fragment>
      <Helper
        email={mailing}
        id={pid[0]}
        price={subtotal}
        name={product.name}
        photo={product.photoUrl1}
      ></Helper>
      ;
      <div className='body container my-4 '>
        <div className='row row-1'>
          <div className='col dis_flex'>
            <h4>Admin Create Order</h4>
            <div onClick={submitOrder} className='create_order_submit_btn'>
              Submit Order
            </div>
            {/* here */}
            {/* <button
              type='button'
              class='btn btn-primary'
              data-toggle='modal'
              data-target='#exampleModal'
            >
              Launch demo modal
            </button>

            <div
              class='modal fade'
              id='exampleModal'
              tabindex='-1'
              role='dialog'
              aria-labelledby='exampleModalLabel'
              aria-hidden='true'
            >
              <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                  <div class='modal-header'>
                    <h5 class='modal-title' id='exampleModalLabel'>
                      Modal title
                    </h5>
                    <button
                      type='button'
                      class='close'
                      data-dismiss='modal'
                      aria-label='Close'
                    >
                      <span aria-hidden='true'>&times;</span>
                    </button>
                  </div>
                  <div class='modal-body'>...</div>
                  <div class='modal-footer'>
                    <button
                      type='button'
                      class='btn btn-secondary'
                      data-dismiss='modal'
                    >
                      Close
                    </button>
                    <button type='button' class='btn btn-primary'>
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            {/* end */}
          </div>
        </div>

        <div className='row mt-4'>
          <div className='body-container-1 col-lg-7'>
            <div className='products'>
              <div className='pt-4'>
                <h4>Products</h4>

                <div className='input-group mb-3 input-field'>
                  <span className='input-group-text' id='basic-addon1'>
                    <i className='fas fa-search'></i>
                  </span>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Products'
                    aria-label='Products'
                    aria-describedby='basic-addon1'
                  />
                  <button className='btn btn-outline-secondary' type='button'>
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='col-lg-5 pt-4 order_user_list_container'>
            <h4>Find or create a customer</h4>
            <div className='input-group mb-3'>
              <span className='input-group-text' id='basic-addon1'>
                <i className='fas fa-search'></i>
              </span>
              <input
                type='text'
                className='form-control'
                placeholder='Email'
                aria-label='Email'
                aria-describedby='basic-addon1'
              />
            </div>
          </div>
        </div>

        <div className='row row-2'>
          <div className='col-lg-7'>
            <div className='payment pt-4'>
              <h4 className='text-left'>Product List</h4>

              <table
                className='table table-striped- table-bordered table-hover table-checkable  '
                id='kt_table_1'
              >
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {listproduct &&
                    listproduct.map((product, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{product.name}</td>
                          <td>
                            <img
                              width={50}
                              height={50}
                              src={imgBaseURL + product.photoUrl1}
                              alt={product.photoUrl1}
                            />
                          </td>

                          <td>${product.price}</td>
                          <td>
                            <div className='form-check'>
                              <input
                                onClick={() => addProductHandler(product._id)}
                                className='form-check-input'
                                type='checkbox'
                                value=''
                                id='flexCheckDefault'
                              />
                              <label className='form-check-label'>Add</label>
                            </div>
                          </td>
                        </tr>
                      );
                    })}

                  {/* ))}    */}
                </tbody>
                <tfoot>
                  <tr>
                    <th>Product Name</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
          <div className='col-lg-5 pt-4 order_user_list_container'>
            <h4>User List</h4>
            <div className='input-group mb-3'></div>
            <table
              className='table table-striped- table-bordered table-hover table-checkable'
              id='kt_table_1'
            >
              <thead>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {listuser &&
                  listuser.map((user, idx) => (
                    <tr key={idx}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <input
                          onClick={() => userSelectHandler(user._id)}
                          type='radio'
                          id='html'
                          name='fav_language'
                          value='HTML'
                        ></input>
                      </td>
                    </tr>
                  ))}
              </tbody>
              <tfoot>
                <tr>
                  <th>User Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        <div className='row row-2'>
          <div className='col-lg-7'>
            <div className='payment pt-4'>
              <h4>Payment</h4>
              <table className='payment-table'>
                <tbody>
                  <tr>
                    <td>
                      <p>
                        <b>Subtotal</b>
                      </p>
                    </td>
                    <td>
                      <p>${subtotal}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Add discount</p>
                    </td>
                    <td>
                      <p>${discount}</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Add shipping</p>
                    </td>
                    <td>
                      <p>$0.0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>Tips</p>
                    </td>
                    <td>
                      <p>$0.0</p>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <p>
                        <b>total</b>
                      </p>
                    </td>
                    <td>
                      <p>${subtotal + discount}</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className='col-lg-5 p-0'>
            <div className='order_list_create_user_contianer pt-4'>
              <h4>Create New User</h4>
              <form onSubmit={createUserHandler}>
                <div className='form_input_flex'>
                  <label>Email</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    type='email'
                  />
                </div>
                <div className='form_input_flex'>
                  <label>Password</label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    type='password'
                  />
                </div>
                <div className='form_input_flex'>
                  <label>Username</label>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    type='text'
                  />
                </div>
                <div className='form_input_flex'>
                  <label>Mobile</label>
                  <input
                    onChange={(e) => setMobile(e.target.value)}
                    value={mobile}
                    type='text'
                  />
                </div>
                <button className='order_user_create_submit_btn' type='submit'>
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <AttributeModal id={pid[0]}></AttributeModal> */}
    </React.Fragment>
  );
};

export default OrderCreateComponent;
