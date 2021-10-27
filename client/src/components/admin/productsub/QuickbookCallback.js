import React, { Component } from 'react'
import Axios from 'axios';
export default class QuickbookCallback extends Component {

    componentDidMount(){

            console.log("window.location",window.location.href)
            Axios.post('/api/productsub/quickbook/createtoken',{url:window.location.href})
            .then(result=>{
                window.location=localStorage.getItem("quickbook_back")
                console.log("result.data",result.data)
            })
            .catch(err=>{
                console.log("err",err)
            })

    }
    render() {
        
        return (
            <div>
                <h1>Please Wait....</h1>
            </div>
        )
    }
}
