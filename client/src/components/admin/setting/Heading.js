import React from 'react'

export default function Heading(props) {
    return (
        <div className="kt-portlet__head">
        <div className="kt-portlet__head-label">
            <h3 className="kt-portlet__head-title">
           { props.heading}
            </h3>
        </div>
    </div>
    )
}
