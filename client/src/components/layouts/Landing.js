import React, { Component } from 'react'
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class Landing extends Component {


  constructor(){
    super();
    this.state={
     
    }
  }
 
  render() {
    const {counter}=this.state;
    return (
      <h1>Landing Page</h1>
    )
  }
}
