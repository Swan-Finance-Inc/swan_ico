/**
*
* LoadingSpinner
*
*/

import React from 'react';
// import styled from 'styled-components';


class LoadingSpinner extends React.PureComponent {
   // eslint-disable-line react/prefer-stateless-function
   constructor(props){
     super(props)
   }
  render() {
    console.log(" in spinnner");
    if(this.props.type==='text'){
      return (
        <div>Loading...... </div>
      )
    }
    if(this.props.type=='css'){
      return (
        <div style={this.props.style}>
          <div className=" text-center">
          <div className={this.props.class}></div>
          </div>
      </div>
      )
    }
    return (
      <div style={this.props.style}>
        <div className=" text-center">
          <img src="/assets/img/loaderNu.svg" alt="loading"/>
        </div>
    </div>
    );
  }
}

LoadingSpinner.propTypes = {

};

export default LoadingSpinner;
