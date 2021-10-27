import React from "react";
import ReactDom from "react-dom";

export default function DemoModal() {
  return ReactDom.createPortal(
    <div class='ui modal'>
      <div class='header'>Header</div>
      <div class='content'>
        <p>HELLO WORLD</p>
      </div>
      <div class='actions'>
        <div class='ui approve button'>Approve</div>
        <div class='ui button'>Neutral</div>
        <div class='ui cancel button'>Cancel</div>
      </div>
    </div>,
    document.querySelector("#modal")
  );
}
