import React, { Component } from 'react';
import '../css/App.css';

class Errors extends Component {

  renderErrors(){
    return this.props.errors.map((err, i)=>{
      return(
        <li className='error' key={i}>
          <p>
            <span className='errorTitle'>{err.title}</span>
            <span className='errorMsg'>{err.msg}</span>
          </p>
          <button onClick={(e)=>{this.props.remove(i)}}>&#x2612;</button>
        </li>
      )
    })
  }

  render(){
    return (
      <ul className="Errors">
        {this.renderErrors()}
      </ul>
    )
  }
}
export default Errors;
