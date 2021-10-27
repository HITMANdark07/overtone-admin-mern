import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productAttributes } from "../../../../actions/productAction";
import axios from "axios";
import "./helper.css";
let datas = [];

export default function Helper({ id, price, photo, name = "", email }) {
  const dispatch = useDispatch();
  // const { id } = useSelector((state) => state.product);
  console.log(photo, "lololl");
  name = name.split(" ")[0];

  // console.log("final" + id);
  const iid = id;
  console.log(iid);
  const [dat, setDat] = useState([]);
  let imgPath = "http://3.238.89.147:5000/static/";
  useEffect(() => {
    const attri = async () => {
      const { data } = await axios.post(
        "http://3.238.89.147:5000/api/product/attribute/",
        {
          productID: id,
        }
      );

      //   console.log(datas[0].attributes);
      setDat(data);
    };
    attri();
  }, [id]);

  const onClickAttribute = async (value) => {
    let key = value.attributeName;
    let mapValue = value.mappingValue;
    let additionalPrice = value.additionalPrice;

    const newData = {
      key,
      mapValue,
      additionalPrice,
      parentKey: "",
    };
    console.log("herre", email);
    dispatch(productAttributes(newData));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let mail = "fahim1.618555@gmail.com";
    let result = `${id}&name=${name}&imgurl=${photo}&prodPrice=${price}&key=${key}&value=${mapValue}&price=${additionalPrice}`;
    console.log(result);
    try {
      await axios.post(
        `http://localhost:5000/api/orderemail/productId=${result}`,

        { email: email },
        config
      );
      console.log("success");
    } catch (error) {
      console.error(error);
    }

    console.log(key);
    console.log(mapValue);
    console.log(additionalPrice);
  };

  const onChangeDropdown = async (value) => {
    let key = value.attributeName;
    let mapValue = value.mappingValue;
    let additionalPrice = value.additionalPrice;

    const newData = {
      key,
      mapValue,
      additionalPrice,
      parentKey: "",
    };
    console.log("herre", photo);
    dispatch(productAttributes(newData));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let mail = "fahim1.618555@gmail.com";
    let result = `${id}&name=${name}&imgurl=${photo}&prodPrice=${price}&key=${key}&value=${mapValue}&price=${additionalPrice}`;
    console.log(result);
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
  };
  const onColorClick = async (value) => {
    let key = value.attributeName;
    let mapValue = value.mappingValue;
    let additionalPrice = value.additionalPrice;

    const newData = {
      key,
      mapValue,
      additionalPrice,
      parentKey: "",
    };
    console.log("herre", photo);
    dispatch(productAttributes(newData));
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let mail = "fahim1.618555@gmail.com";
    let result = `${id}&name=${name}&imgurl=${photo}&prodPrice=${price}&key=${key}&value=${mapValue}&price=${additionalPrice}`;
    console.log(result);
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
  };
  //   console.log(datas);
  console.log(dat);
  return (
    <div>
      <div>
        {/* here */}
        <button
          style={{ opacity: "0" }}
          id='modal_btn'
          type='button'
          class='btn btn-primary'
          data-toggle='modal'
          data-target='#exampleModal'
        >
          Launch demo modal
        </button>

        <div
          class='modal show'
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
                  Add Attributes
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
              <div class='modal-body'>
                {dat.length > 0 &&
                  dat.map((result, index) => (
                    <React.Fragment>
                      {result.attributes[0].mappingType === "image+text" && (
                        <div>
                          {result.attributes &&
                            result.attributes.map((value, idx) => (
                              <div key={idx}>
                                <ul
                                  onClick={() => onClickAttribute(value)}
                                  className='d-flex attribute_img_text_container'
                                >
                                  <li className='pr-3'>
                                    {value.mappingName}: {value.mappingLabel}{" "}
                                    [+$ {value.additionalPrice}]
                                  </li>
                                  <img
                                    src={imgPath + value.photoUrl}
                                    alt=''
                                    height={50}
                                    width={50}
                                  />
                                </ul>
                              </div>
                            ))}
                        </div>
                      )}

                      {result.attributes[0].mappingType === "dropdown" && (
                        <div className='d-flex attribute_img_text_container'>
                          {result.attributes &&
                            result.attributes.map((value) => (
                              <div className='p-2'>
                                <label>
                                  {" "}
                                  {value.mappingName}: {value.mappingLabel} [+$
                                  {value.additionalPrice}]
                                </label>
                                <input
                                  className='p-2'
                                  onClick={() => onChangeDropdown(value)}
                                  type='radio'
                                  id='html'
                                  name='fav_language'
                                  value='HTML'
                                ></input>
                              </div>
                            ))}
                        </div>
                      )}
                      {result.attributes[0].mappingType === "color" && (
                        <div className='d-flex attribute_img_text_container'>
                          {result.attributes &&
                            result.attributes.map((value) => (
                              <li onClick={() => onColorClick(value)}>
                                {value.mappingName}: {value.mappingLabel} [+$
                                {value.additionalPrice}]
                              </li>
                            ))}
                        </div>
                      )}
                    </React.Fragment>
                  ))}
              </div>
              {/*  */}
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
        </div>
        {/* end */}
      </div>
    </div>
  );
}
