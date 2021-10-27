import React, { useState, useEffect } from "react";
import Helper from "./Helper";
export default function AttributeModal({ id }) {
  let pid = id;
  console.log(pid);
  //   console.log(id);
  const [prodId, setProdId] = useState("");
  useEffect(() => {
    setProdId(pid);
  }, []);

//   console.log(prodId);
  //   setProdId(id);
  return (
    <div>
      {/* here */}
      <button
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
              {prodId && <Helper id={prodId}></Helper>}
            </div>
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
  );
}
