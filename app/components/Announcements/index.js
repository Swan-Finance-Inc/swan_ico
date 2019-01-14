/**
*
* News
*
*/

import React from 'react';
import { Button, Well, Collapse } from 'react-bootstrap';
// import styled from 'styled-components';


class Announcements extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);

    this.state = {
      open: false,
      open2: false,
      open3: false,
      open4: false,
      open5: false
    }
  }

  render() {
    console.log(this.props," props in dashboard/news")
    console.log(this.state," state in dashboard/news")
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <div className="ui-content-body">
        <div className="ui-container container-fluid">
            <div className="row">
              <div className="col-sm-12 text-center">
                  <h2>ANNOUNCEMENTS</h2><hr/>
              </div>
              <div className='col-sm-8 col-sm-offset-2'>
              {this.props.announcementsData.map((item,i)=>(
                <div className="row">
                  <div className="col-sm-12">
                  <Button onClick={() => this.setState({ [item._id]: !this.state[item._id] })} className="form-control" style={{marginBottom: '20px'}}>
                  {item.title}
                  </Button>
                  <Collapse in={this.state[item._id]}>
                    <div>
                      <Well>
                      {item.subject}
                      </Well>
                    </div>
                  </Collapse>
                  </div>
                </div>
              ))}
              </div>
            </div>
              </div>
              </div>
              </div>
    );
  }
}

Announcements.propTypes = {

};

export default Announcements;
