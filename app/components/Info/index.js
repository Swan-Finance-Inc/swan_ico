/**
*
* FaqPage
*
*/

import React from 'react';
import { Button, Well, Collapse, Modal } from 'react-bootstrap';
import Switch from 'react-toggle-switch'
import "../../../node_modules/react-toggle-switch/dist/css/switch.min.css"

// import styled from 'styled-components';


class Info extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
    open:false,
    switched:true
    }
  }

  hide=(e)=>{
    this.setState({
      open:false
    })
  }
  show=(e)=>{
    this.setState({
      open:true
    })
  }

  render() {
    console.log(" inside info Component ")
    return (
      <div>
        <i className="fa fa-info" style={{float:'right',marginRight:'20px', cursor:'pointer'}} onClick={this.show} ></i>
        <div className="static-modal">
          <Modal show={this.state.open} bsSize="large" onHide={this.hide}>
          <Modal.Header>
            <div className="col-sm-12 text-right">
                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ open:false })}}></i>
            </div>
            <Modal.Title><div className='text-center'>INFORMATION</div></Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    {this.props.data}
                  </div>
                  <div className='row' >
                  <div className='text-center'>
                   <Switch  onClick={this.props.hanldeToggle} on={this.state.switched} />
                   </div>
                  </div>
                </div>
                </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }
}

Info.propTypes = {

};

export default Info;
