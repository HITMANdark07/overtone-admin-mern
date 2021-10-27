import React from "react";
import ReactDom from "react-dom";
import { useHistory } from "react-router";
import history from "../../components/common/history";
import { withRouter } from "react-router";

export default function DeleteModal({ title, content, actions, onDismiss }) {
  const history = useHistory();
  return ReactDom.createPortal(
    <div
      id='user-modal'
      className='delete_user_modal_container'
      style={{ display: "none" }}
    >
      <div onClick={onDismiss} className='ui dimmer modals visible active'>
        <div
          className='ui standard modal visible active'
          onClick={(e) => e.stopPropagation()}
          style={{
            width: "600px",
            height: "200px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div className='header'>{title}</div>
          <div className='content'>{content}</div>
          <div className='actions'>{actions}</div>
        </div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}
