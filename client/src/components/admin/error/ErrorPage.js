import React from 'react'

export default function ErrorPage() {
    return (
        <div className="kt-header--fixed kt-header-mobile--fixed kt-subheader--fixed kt-subheader--enabled kt-subheader--solid kt-aside--enabled kt-aside--fixed kt-page--loading">
    <div className="kt-grid kt-grid--ver kt-grid--root">
        <div className="kt-grid__item kt-grid__item--fluid kt-grid  kt-error-v6" style={{backgroundImage: 'url(/images/error.jpg)'}}>
          <div className="kt-error_container">
            <div className="kt-error_subtitle kt-font-light">
              <h1>Oops...</h1>
            </div>
            <p className="kt-error_description kt-font-light">
              Looks like something went wrong.<br />
              We're working on it
            </p>
          </div>
        </div>
      </div>
        </div>
    
    )
}
