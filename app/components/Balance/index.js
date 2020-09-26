/**
 *
 * Balance
 *
 */

import React from "react";
// import styled from 'styled-components';
import { Link } from "react-router-dom";
import Info from "../Info";
import Bar from "../../components/Bar";
import Referral from "../../images/Referral.png"
import mdCopy from "../../images/md-copy.svg";
import Planet from "../../images/Planet.svg";
import Satelite from "../../images/Satelite.svg";
import { Menu, Dropdown ,Popconfirm, message} from "antd";
import { DownOutlined } from "@ant-design/icons";
import btcStatus from "../../images/btcStatus.svg";
import EthStatus from "../../images/EthStatus.svg";
import OthersStatus from "../../images/OthersStatus.svg";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import TextFieldInput from "../../components/TextFieldInput";
import ethLogo from "../../images/ethLogo.png";
import { Navbar, Nav, MenuItem, NavDropdown, Modal ,Badge , DropdownButton} from 'react-bootstrap';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import littleStar from "../../images/littleStar.svg";
import bigStar from "../../images/bigStar.svg";
import Ellipse from '../../images/Ellipse.svg';

class Balance extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      infoShow: false,
      show : false,
      referalUrl : ''
    };
  }

  componentDidMount(){
    this.setState({
      referalUrl:`https://tokensale.centralex.io/signup/refer/${this.props.referralCode}`
    })
  }

  toggleTranActive = (e) => {
    this.props.compact();
    this.props.toggleTranActive();
    // console.log('toggling', e);
  };
  togglemyReferal = (e) => {
    this.props.compact();
    this.props.togglemyReferal();
  };
  toggleContriActive = (e) => {
    // if(this.props.kycStatus == 'ACCEPTED'){
    this.props.compact();
    this.props.toggleContActive();
    // }else{
    // toast.error('Please complete your kyc to contribute.')
    // }
  };

  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow,
    });
    console.log("infoShow : ", this.state.infoShow);
  };

  resetInfo = () => {
    this.props.toggleInfo();
  };


   confirm =  (e) => {
    console.log(e);
    message.success('Click on Yes');
  }
  
  render() {

    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
          </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
      </Menu>
    );

    return (
      <div>
        <div className="container-fluid nomarginpadding">
          <div className="row">
            <div className="col-lg-7 col-sm-12">
              <div className="balance-card">
                <div className="balance-card-inner-wrappper">
                  <h3 className="balance-card-inner-wrapper-heading">
                    Account Balance
                  </h3>
                  
                  <p className="balance-text">
                    Note: Transaction may take up to 24 hours to approve due to
                    our comprehensive verification methods to protect our
                    customers.
                  </p>
                  <div className="col-sm-6">
                    <div className="balance-botton-inner-wrapper">
                      <h5
                        style={{
                          font: "normal normal bold 20px/24px Lato",
                          letterSpacing: "0.43px",
                          color: "#B0C9F0",
                          opacity: 1,
                          marginTop: 0,
                          fontSize: "16px",
                        }}
                      >
                        Your Balance
                      </h5>
                      <div className="balance">
                        <span style={{ marginTop: '7px' }}>
                          USD
                         { 
                        //  <span
                        //   style={{ marginLeft : '10px' , cursor : 'pointer' , position : 'relative' }}
                        //   onClick={() => this.setState({...this.state, show : !this.state.show })}
                        //   overlay={this.menu}
                          
                        // >
                        //   <svg
                        //     className="icon_mid_hover"
                        //     xmlns="http://www.w3.org/2000/svg"
                        //     width="10"
                        //     height="10"
                        //     viewBox="0 0 22 22"
                        //     data-toggle="dropdown"
                        //   >
                        //     <circle
                        //       id="Ellipse_54"
                        //       className="svg_pointer"
                        //       data-name="Ellipse 54"
                        //       cx="10.5"
                        //       cy="10.5"
                        //       r="10.5"
                        //       fill="#31708f"
                        //     />
                        //     <g
                        //       className={""
                        //         // item._id === notificationExpand
                        //         //   ? 'rotate-angledown-180 '
                        //         //   : ''
                        //       }
                        //     >
                        //       <path
                        //         id="Icon_awesome-angle-up"
                        //         data-name="Icon awesome-angle-up"
                        //         d="M6.849,18.462,12.113,13.2a.925.925,0,0,0,0-1.312l-.875-.875a.925.925,0,0,0-1.312,0L6.191,14.738,2.46,11.007a.925.925,0,0,0-1.312,0l-.879.875a.925.925,0,0,0,0,1.312l5.264,5.264A.926.926,0,0,0,6.849,18.462Z"
                        //         transform="translate(4 -3)"
                        //         fill="#fff"
                        //       />
                        //     </g>
                        //   </svg>
                        // </span>
                        }
                    </span>
                      <span >
                      <Nav eventKey={0}>
                    <DropdownButton 
                      eventKey={3} 
                      className="account-balance-dropdown"
                    >
                      <MenuItem eventKey='1'> CEX token</MenuItem>
                     </DropdownButton>
                  </Nav>  
                      </span>     
                        <span style={{ fontSize: "32px", marginLeft: "12px" }}>
                          $ {this.props.userInfo.tokens.total} ~{" "}
                          {this.props.userInfo.totalBalanceUsd}{" "}
                        </span>{" "}
                      </div>
                    </div>
                  </div>
                  <div className="balance-hr" />
                  <div className="col-sm-5">
                    <div className="balance-botton-inner-wrapper">
                      <h5
                        style={{
                          font: "normal normal bold 20px/24px Lato",
                          letterSpacing: "0.43px",
                          color: "#B0C9F0",
                          opacity: 1,
                          marginTop: 0,
                          fontSize: "16px",
                        }}
                      >
                        USD/BTC
                      </h5>
                      <div className="account-balance-statistics">
                      <div style={{ width : '90px' }}>
                      <CircularProgressbarWithChildren value={74}
                        styles={{ 
                          path : {
                            stroke : '#2D6DCD'
                          }
                         }}
                         strokeWidth="9"
                      >
                        <div style={{
                            font: 'normal normal normal 20px/24px Lato',
                            color : '#2D6DCD',
                            letterSpacing: '0px'
                          }}>
                           74%  <strong><br /> BTC</strong>
                        </div>
                      </CircularProgressbarWithChildren>
                      </div>
                      <div className="eth-other-balance-stats">
                      <div style={{ display : 'flex' }}>
                      <div style={{ width : '50px' }}>
                      <CircularProgressbar value={23}
                        styles={{ 
                          path : {
                            stroke : '#2D6DCD'
                          }
                         }}
                         strokeWidth="17"
                         />
                      </div>
                      <span
                      style={{marginLeft: '12px', width: 'max-content'}}
                      >
                      <span className="main-color--blue ">23%</span>   
                        <br />
                        <span className="main-color--blue font-weight-bold ">Ethereum</span>
                        </span>
                     
                      </div>
                      <div style={{ display : 'flex' , marginTop : '10px' }}>
                      <div style={{ width : '50px' }}>
                      <CircularProgressbar value={2}
                        styles={{ 
                          path : {
                            stroke : '#2D6DCD'
                          }
                         }}
                         strokeWidth="17"
                         />
                      </div>
                      <span
                      style={{marginLeft: '12px', width: 'max-content'}}
                      >
                      <span className="main-color--blue ">2%</span>   
                        <br />
                        <span className="main-color--blue font-weight-bold ">Others</span>
                        </span>
                     
                      </div>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12">
              <div
                className="balance-card"
                style={{
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                }}
              >
                <div
                  className="balance-card-inner-wrappper"
                  style={{ height: "276px" }}
                >
                  <h4 className="exchange-heading">Exchange Rates</h4>
                  <div className="exchange-trading-container">
                    <div className="exchange-trading-top">
                      <p style={{ marginBottom: "0px", color: "#2D6DCD" }}>
                        You get*
                      </p>
                      <div>
                      <div style={{ width : '60%'  , display : 'inline-block'}} >
                      <TextFieldInput
                        type="text"
                      />
                      {
                      //   <input
                      //   type="text"
                      //   class="form-control"
                      //   style={{
                      //     height: "40px",
                      //     borderRadius: "5px",
                      //     border: "1px solid #979BA2",
                      //     marginTop: "3px",
                      //     padding : '8px'
                      //   }}
                      // ></input>
                      }
                      </div>
                      <div style={{ width : '35%'  , display : 'inline-block'}} className="centralex-coins">
                        Centralex Coins 
                      </div>
                      </div>
                    </div>
                    <span className="refresh">
                      Exchange rates refreshed in every 15 mins.
                    </span>
                    <div className="exchange-trading-bottom">
                      <div className="btn-group mt-30">
                        <button
                          type="button"
                          className="btn btn-default exchange-button"
                          style={{ width: "181px", textAlign: "left" ,padding: '8px',
                          border: "1px solid #979BA2" }}
                        >
                          <span><img style={{ width: '26px' }} src={ethLogo} />
                          <span style={{ marginLeft : '3px' ,color : '#7F7F7F'  }} >Eth</span>
                           </span>
                        </button>
                        <button
                          type="button"
                          className="btn btn-default dropdown-toggle"
                          aria-haspopup="true"
                          aria-expanded="false"
                          style={{ padding: '11px',
                          border: "1px solid #979BA2" }}
                          //onClick={handleMenu}
                        >
                          <span className="caret"></span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <hr style={{ borderTop: "1px solid #CEE2FE", width: "90%" }} />
              </div>
            </div>
            <div
              className="col-lg-7 col-sm-12"
              style={{ 
                //transform: "translateY(-39px)" ,
               marginTop : '12px' }}
            >
              <div className="balance-card" id="fixed-height">
                <div
                  className="balance-card-inner-wrappper"
                >
                  <h5
                    style={{
                      font: "normal normal bold 20px/24px Lato",
                      letterSpacing: "0.43px",
                      color: "#B0C9F0",
                      display: "inline-block",
                      opacity: 1,
                      marginTop: 0,
                      fontSize: "16px",
                    }}
                  >
                    Tokens Earned by Referral (This week)
                  </h5>
                  <div className="token-earned-by-monthly-yearly">
                  <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Monthly <DownOutlined />
                  </a>
                </Dropdown>
                <Dropdown overlay={menu}>
                  <a className="ant-dropdown-link"
                  style={{marginLeft : '50px' }}
                  onClick={e => e.preventDefault()}>
                    Yearly <DownOutlined />
                  </a>
                </Dropdown>
                </div>
                  <Bar />
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-sm-12"
              style={{marginTop: '13px' }}
            >
              <div
                className="balance-card"
                style={{
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  padding: "12px 0px 29px 15px",
                  height: "348px",
                }}
              >
                <div className="balance-botton-inner-wrapper" style={{marginTop : '-15px' }}>
                  <h4 className="exchange-heading">Referral Tokens Earned</h4>
                    <p style={{ marginBottom: "0px", color: "#2D6DCD" ,fontSize: "32px", marginLeft : '10px' }}>
                    $ 728
                    </p>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Pending-referrals">
                        <div id="circle">
                          <span className="circle-text">3 <span className="Pending-referrals-count"> # of Pending Referrals</span></span>
                        </div>
                      </div>
                  </div>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Confirmed-referrals">
                        <div id="confirmed-circle">
                          <span className="confirmed-circle-text">8<span className="Confirmed-referrals-count"># of Confirmed Referrals</span></span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-7"style={{ marginBottom : '30px' , marginTop : '12px' }} >
                 <div className="balance-card" style={{ height : '347px' }}>
                    <div className="balance-card-inner-wrappper">
                      <div style={{ display : 'flex' , justifyContent : 'space-between' }}>
                        <div>
                        <h3 className="balance-card-inner-wrapper-heading" style={{ lineHeight: '1.3'}}>
                          Invite Your Friends <br />
                          & Earn Coins
                          </h3>
                          <p className="mt-30 referral-content">Earn 10% or Up to 250 Tokens <br />
                            For the first purchase by the referred.</p>
                            <p className="main-color--blue" style={{fontSize : '15px'}}>Share the Unique Invite Link</p>
                            {
                          //     <div className="code copy-clipboard">
                          //   <input id="foo" value={this.state.referalUrl}
                          //   className="copy-clipboard-input"
                          //   disabled
                          //   />
                          //   <button className="btn file-copy" style={{ right: '-145px' }}
                          //   onCopy={this.state.referalUrl}
                          //   >
                          //   <FileCopyOutlinedIcon
                          //  // onClick={(e) => console.log(e.target.files ) }
                          //   style={{ outline : 'none' }}
                          //   />
                          //   </button>
                          //   {
                          //   //   <button class="btn" data-clipboard-target="#foo" id="clipboard-target-buttton">
                          //   // <img src={mdCopy} className="copy-clip" />
                          //   // </button>
                          //   }
                          //   </div>
                            }
                            
                        </div>
                        <div className="referral-logo-container">
                          <img src={Referral} className="referral-logo" />
                        </div>
                      </div>
                      <div style={{width: '27em' , position: 'relative'}}>
                            <input value={this.state.referalUrl }
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input"
                              />
                            <CopyToClipboard text={this.state.referalUrl}
                              onCopy={() => {this.setState({copied: true});
                               toast.success("Copied");
                              }}>
                              <span className="file-copy-conatiner">
                              <FileCopyOutlinedIcon
                                style={{ outline : 'none' ,fontSize : '20px'  }}
                                />
                              </span>
                            </CopyToClipboard>
                        </div>
                    </div>
                   
                 </div>
            </div>
            <div className="col-lg-5" style={{ marginBottom : '30px' , marginTop : '12px' }}>
              <div className="balance-card" id="fixed-height" style={{ overflow : 'hidden' }}>
                <div className="balance-card-inner-wrappper">
                  <h3 className="balance-card-inner-wrapper-heading">
                    ICO Details
                  </h3>
                  <div className="ico-details-middle">
                    <div>
                    <img src={Planet} />
                    </div>
                    <div className="ico-details-circle">
                      <span className="upto-2-percentage" >Up To <br/>
                       <span style={{ fontSize : '32px' }} >2%</span>  
                       <br /> Extra</span>
                    </div>
                    <div className="satalite-logo-container">
                      <img src={littleStar} className="little-star"/>
                    <img src={Satelite} />
                    </div>
                  </div>
                  <img src={littleStar}/>
                  <img src={bigStar} style={{ float : 'right' }} />
                  <img src={Ellipse} className="ellipse-one"/>
                  <img src={Ellipse} className="ellipse-two" />
                  <div className="text-center">
                    <p className="secondary-text">Total Coins</p>
                    <p className="total-coins">16,000,000</p>
                  </div>
                  <div className="coins-left-container">
                  <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width : '60%' }}>
                    60%
                  </div>
                  </div>
                  </div>
                  <div className="text-center mt-30">
                  <button className="invest">Invest Now</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>       
      </div>
    );
  }
}

Balance.propTypes = {};

export default Balance;




{

//   <div className="panel panel-default">
//   <div className="panel-heading blueBG">
//     {/*<Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />*/}
//     {
//       !!this.props.flag ?
//         <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
//         :
//         null
//     }
//     Bounty Stakes
//   </div>
//     <div className="panel-body">
//     <div className="row">
//       <div className="col-sm-12"><p>To participate in bounty <a href="https://www.google.com" target="_blank" className="link">click here</a>.</p></div>
//     </div>
//     <div className="row">
//       <div className="col-sm-12">
//     <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Creative Stakes</h3>
//   <div className="balance">{(this.props.userInfo.tokens.bounty.creative)}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Youtube Stakes</h3>
//   <div className="balance">{this.props.userInfo.tokens.bounty.youtube}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Twitter Stakes</h3>
//   <div className="balance">{this.props.userInfo.tokens.bounty.twitter}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Facebook Stakes</h3>
//   <div className="balance">{this.props.userInfo.tokens.bounty.facebook}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Translation Stakes</h3>
//   <div className="balance">{(this.props.userInfo.tokens.bounty.translation)}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Reddit Stakes</h3>
//   <div className="balance">{this.props.userInfo.tokens.bounty.reddit}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Telegram Stakes</h3>
//   <div className="balance">{this.props.userInfo.tokens.bounty.telegram}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>Signature Stakes</h3>
//   <div className="balance">{this.props.userInfo.tokens.bounty.signature}</div>
// </div>
// </div>
// <div className="col-sm-6 col-md-3">
// <div className="bal-card">
//   <h3>LinkedIn Stakes</h3>
//   <div className="balance">{this.props.userInfo.tokens.bounty.linkedIn}</div>
// </div>
// </div>
// </div>
// </div>
// </div>

// </div>




// {
// //   <div className="panel panel-default">
// // <div className="panel-heading blueBG">
// //   {/* <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} /> */}
// //   {
// //     !!this.props.flag ?
// //       <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
// //       :
// //       null
// //   }
// //   Your Balance
// // </div>
// // <div className="panel-body">
// // <div className="row">
// //   <div className="col-sm-12">
// //     <p>Transaction may take up to 24 hours to approve due to our comprehensive verification methods to protect our customers.</p>
// //   </div>
// // </div>
// // <div className="row">
// //   <div className="col-sm-6 col-md-3">
// //     <div className="bal-card">
// //       <h3>Total Balance</h3>
// //       <div className="balance">{(this.props.userInfo.tokens.total)} ~ {(this.props.userInfo.totalBalanceUsd)} USD</div>
// //       {
// //         !!this.props.userInfo.tokens.total ?
// //           (
// //             <div className='link referalPageLink'><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive}><u>View Transactions</u></Link></div>
// //           ) :
// //           (
// //             <div>&nbsp; &nbsp; &nbsp;</div>
// //           )
// //       }
// //       {/* <div className='link referalPageLink'><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive}><u>View Transactions</u></Link></div> */}
// //     </div>
// //   </div>
// //   <div className="col-sm-6 col-md-3">
// //     <div className="bal-card">
// //       <h3>Referral Tokens Earned</h3>
// //       <div className="balance">{this.props.userInfo.tokens.referral}</div>
// //       {
// //         !!this.props.userInfo.tokens.referral ?
// //           (
// //             <div className='referalPageLink link'><Link to="/dashboard/myReferal" role="button" onClick={this.togglemyReferal}><u>View Referral Transactions</u> </Link></div>
// //           ) :
// //           (
// //             <div>&nbsp; &nbsp; &nbsp;</div>
// //           )
// //       }
// //       {/* <div className='referalPageLink link'><Link to="/dashboard/myReferal" role="button" onClick={this.togglemyReferal}><u>View Referral Transactions</u> </Link></div> */}
// //     </div>
// //   </div>
// //   <div className="col-sm-6 col-md-3">
// //     <div className="bal-card">
// //       <h3># of Confirmed Referrals</h3>
// //       <div className="balance">{this.props.userInfo.referral.success}</div>
// //         <div>&nbsp; &nbsp; &nbsp;</div>
// //     </div>
// //   </div>
// //   <div className="col-sm-6 col-md-3">
// //     <div className="bal-card">
// //       <h3># of Pending Referrals</h3>
// //       <div className="balance">{this.props.userInfo.referral.pending}</div>
// //       <div>&nbsp; &nbsp; &nbsp;</div>
// //     </div>
// //   </div>
// // </div>
// // <div className='row'>
// //   {
// //     this.props.userInfo.kycStatus !== "ACCEPTED" ?
// //         null
// //       :
// //       (<div className='text-center'>
// //         <Link to='/dashboard/contribution' role="button" onClick={this.toggleContriActive}>
// //           <button className="btn btn-primary"  style={{borderRadius: '25px', padding: '10px 60px', marginTop:'10px'}}>
// //             Invest Now
// //           </button>
// //         </Link>
// //       </div>)
// //   }
// //   {/*<div className='text-center'><Link to='/dashboard/contribution' role="button" onClick={this.toggleContriActive}><button disabled={this.props.userInfo.kycStatus!=="ACCEPTED"}  className="btn btn-primary"  style={{borderRadius: '25px', padding: '10px 60px', marginTop:'10px'}}>Invest Now</button></Link></div> */}
// // </div>
// // </div>
// // </div>
}

