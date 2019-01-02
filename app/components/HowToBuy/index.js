

import React from 'react';
import { Button, Well, Collapse } from 'react-bootstrap';
// import styled from 'styled-components';


class HowToBuy extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);

    this.state = {
      open: false
    }
  }

  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <div className="ui-content-body">
        <div className="ui-container container-fluid">
        <div className="panel panel-default">
      <div className="panel-heading">WhitePaper</div>
        <div className="panel-body" style={{fontSize:'16px'}}>
        </div>
        </div>
              </div>
            </div>
          </div>
    )
  }
}

HowToBuy.propTypes = {

};

export default HowToBuy;
