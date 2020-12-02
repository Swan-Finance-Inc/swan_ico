import React from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';


export class Stake extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
        };
        this.goBack = this.goBack.bind(this);
    }
    componentDidMount(){
      
    }

    goBack() {
      this.props.back();
    }
  

    render(){

        return(
            <div>
              <div id="content" className="ui-content ui-content-aside-overlay">
                <div className="ui-content-body">
                  <div className="ui-container container-fluid">
                    <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="balance-card" style={{ marginBottom : '2em', height:"100%" }}>
                            <div className="row customCard-header">
                              <div className="col-sm-4 col-md-4 col-lg-4">
                                  <IconButton
                                  disableRipple
                                  onClick={this.goBack}
                                  >
                                    <ArrowBackIosIcon
                                      style={{color : '#2D6DCD' , fontSize : '24px' , backgroundColor : 'transparent' }}
                                    />
                                  </IconButton>
                              </div>
                              <div className="col-sm-8 col-md-8 col-lg-8">
                                   <div className=" transaction-container" style={{textAlign:"center", marginLeft:"40px"}}>
                                      <h2 className="trasnaction">Stake SWAN Tokens</h2>
                                    </div>  
                              </div>
                              
                            </div>
                            <div className="row" style={{textAlign:"center"}}>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                                &nbsp;
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                                <div className="tempBack">Lock Up Period <span className="fractal-id-btn">4 Months</span></div>
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                              &nbsp;
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                              &nbsp;
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4">
                                <div className="tempBack">Rate of Interest<span className="fractal-id-btn">14 %</span></div>
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                              &nbsp;
                              </div>
                            </div>
                            <div style={{padding:'10px'}}>
                              <div className="balance-card" style={{ marginBottom : '2em', marginTop:'3em', height:"100%"}}>
                                <div className=" transaction-container" style={{textAlign:"center", marginLeft:"40px"}}>
                                        <div className="trasnaction">1. Contract Approval</div>
                                </div> 
                                <div>
                                  <input />
                                </div> 
                                <div style={{textAlign:"right"}}>
                                  <button className="btn btn-primary">CANCEL</button>
                                  <button className="btn-primary btn">APPROVE</button>
                                </div>
                              </div>
                            </div>
                            
                          
                        </div>
                      </div>
                  </div>
                </div>
              </div>

            </div>
        )
    }
}

