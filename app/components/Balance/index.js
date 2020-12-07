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
import Referral from "../../images/referral_main_page.png"
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
import { Navbar, Nav, MenuItem, NavDropdown, Modal ,Badge , DropdownButton, Button} from 'react-bootstrap';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import littleStar from "../../images/littleStar.svg";
import bigStar from "../../images/bigStar.svg";
import Ellipse from '../../images/Ellipse.svg';
import { Left } from "react-bootstrap/lib/Media";

class Balance extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      infoShow: false,
      show : false,
      referalUrl : '',
      balanceType : 'USD',
      centralexCoinQuantity : '',
      CenInBtc : "",
      CenInEth : "",
      crowdsaleDetails : {},
      weeklyOrDaily: 'daily'
    };
  }

  componentDidMount(){
    console.log("dhoompichakdhoom")
    this.setState({
      referalUrl:`https://centralex.com/signup/refer/${this.props.referralCode}`
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

  componentWillReceiveProps(nextProps){
    console.log(nextProps)
    this.setState({
      ...this.state,
      // crowdsaleDetails : nextProps.crowdsaleStateData.crowdsaleDetails
    })
  }

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

  componentWillUnmount(){}

  handleCentralexCoinExchange = (e) => {
   
      this.setState({
        ...this.state,
        [e.target.name] : e.target.value
      },
        () => {
          this.exchangeCenInBtc();
          this.exchangeCenInEth();
        }
      )
  }

  chartType = (e) =>{
    console.log('pooooooooooooooooooooooooooo: ',e.target.name)
    this.setState({
      weeklyOrDaily : e.target.name
    })

  }

  exchangeCenInBtc = () => {
    const { crowdsaleDetails } = this.state;
    let centralexCoinQuantity = this.state.centralexCoinQuantity;

    let cenInDollar =  (Number(centralexCoinQuantity) * crowdsaleDetails.tokenUsd)
    let CenInBtc = cenInDollar ? (cenInDollar  / (crowdsaleDetails.btcUsd)) :''
    
    this.setState({
      CenInBtc
    })

  }

  exchangeCenInEth = () => {
    const { crowdsaleDetails } = this.state;
    let centralexCoinQuantity = this.state.centralexCoinQuantity;

    let cenInDollar =  (Number(centralexCoinQuantity) * crowdsaleDetails.tokenUsd)
    let CenInEth = cenInDollar ? (cenInDollar / ( crowdsaleDetails.ethUsd)) : ''
  
    this.setState({
      CenInEth
    })
  }





  
  render() {
    console.log(this.state,'state in balance')
    console.log(this.props,'props in balance')
    const { crowdsaleDetails } = this.state;
    // if(crowdsaleDetails.tokenUsd){
    //   crowdsaleDetails.tokenUsd = 0
    // }
  //   let b;
  //   if(this.props.crowdsaleStateData && this.props.crowdsaleStateData.crowdsaleState ) {

    
  //   b =  this.props.crowdsaleStateData.crowdsaleDetails.tokenUsd * this.props.userInfo.tokens.total;

  // }else {
  //   b=0.03 * this.props.userInfo.tokens.total;
  // }
    let a;
    if(this.props.crowdsaleStateData && this.props.crowdsaleStateData.crowdsaleState ) {
      a = Math.round((this.props.crowdsaleStateData.crowdsaleState.distributedTokens / this.props.crowdsaleStateData.crowdsaleState.totalTokens) * 100)  }else{a=0}  
    let btc = this.props.userInfo.tokens.tokensByMode.btc,
        eth = this.props.userInfo.tokens.tokensByMode.eth,
        usdt = this.props.userInfo.tokens.tokensByMode.usdt,
        stellar = this.props.userInfo.tokens.tokensByMode.stellar,
        total = this.props.userInfo.tokens.total;
        let others,btcPercent,ethPercent, usdtPercent,stellarPercent, othersPercent;
        if(total=== 0){
          others = (total-btc-eth-usdt-stellar),
          btcPercent = 0,
          ethPercent = 0,
          usdtPercent = 0,
          stellarPercent = 0,
          othersPercent = 0;

        } else {
          others = (total-btc-eth-usdt-stellar),
          btcPercent = Math.round(btc*100/total),
          ethPercent = Math.round(eth*100/total),
          usdtPercent = Math.round(usdt*100/total),
          stellarPercent = Math.round(stellar*100/total),
          othersPercent = Math.round(others*100/total);
        }


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
                          color: "#00296B",
                          opacity: 1,
                          marginTop: 0,
                          fontSize: "16px",
                        }}
                      >
                        Your Balance
                      </h5>
                      <div className="balance">
                      <span style={{ marginTop : '7px' }}>
                      <Nav eventKey={0}>
                    <DropdownButton 
                      eventKey={3} 
                      className="account-balance-dropdown"
                      title={this.state.balanceType}
                    >
                      <MenuItem eventKey='1' value="cexToken" onClick={() => 
                        this.setState({balanceType : this.state.balanceType === "USD" ? "SWAN Token" : 'USD' }) } >
                          {this.state.balanceType === "USD" ? "SWAN Token" : "USD"   }
                          </MenuItem>
                     </DropdownButton>
                    </Nav>  
                      </span>     
                        <span style={{ fontSize: "32px", marginLeft: "12px" }}>
                        {this.state.balanceType === "USD" ? (this.props.userInfo.tokens.total * 0.03).toFixed(3) :
                        this.props.userInfo.tokens.total.toFixed(3)
                        }
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-sm-5">
                    <div className="balance-botton-inner-wrapper" >
                      <h5
                        style={{
                          font: "normal normal bold 20px/24px Lato",
                          letterSpacing: "0.43px",
                          color: "#00296B",
                          opacity: 1,
                          marginTop: 0,
                          fontSize: "16px",
                        }}
                      >
                       USD/BTC
                      </h5>
                      

                      <div className="account-balance-statistics" style={{marginTop:'30px'}}>
                      <div className="balance-hr" />
                      <div style={{ width : '90px' }}>
                      <CircularProgressbarWithChildren value={ethPercent}
                        styles={{ 
                          path : {
                            stroke : '#00296B'
                          }
                         }}
                         strokeWidth="9"
                      >
                        <div style={{
                            font: 'normal normal normal 20px/24px Lato',
                            color : '#2D6DCD',
                            letterSpacing: '0px'
                          }}>
                           {ethPercent}%  <strong className="font-weight-bold " style={{font:'normal normal normal 20px/24px Lato'}} ><br />BTC</strong>
                        </div>
                      </CircularProgressbarWithChildren>
                      </div>
                      {/* <div style={{ width : '90px' }}>
                      <CircularProgressbarWithChildren value={othersPercent}
                        styles={{ 
                          path : {
                            stroke : '#465390'
                          }
                         }}
                         strokeWidth="9"
                      >
                        <div style={{
                            font: 'normal normal normal 20px/24px Lato',
                            color : '#2D6DCD',
                            letterSpacing: '0px'
                          }}>
                           {othersPercent}% <strong><br /> Refers</strong>
                        </div>
                        
                      </CircularProgressbarWithChildren>
                      </div> */}
                      <div className="eth-other-balance-stats">
                      <div style={{ display : 'flex' }}>
                      <div style={{ width : '50px' }}>
                      <CircularProgressbar value={23}
                        styles={{ 
                          path : {
                            stroke : '#00296B'
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
                            stroke : '#00296B'
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
            <div className="col-lg-5" style={{   }}>
              <div className="balance-card" id="fixed-height" style={{ overflow : 'hidden' }}>
                <div className="balance-card-inner-wrappper">
                  <h3 className="balance-card-inner-wrapper-heading">
                    Exchange Rates
                  </h3>
                  <div className="exchange-trading-container" >
                  <div className="exchange-text">You get*</div>
                    <div className="exchange-trading-input" >
                  <TextFieldInput
                      type="number"
                      value={this.state.CenInBtc}
                      inputStyle={{
                        fontSize: "15px",
                        fontWeight: "900",
                        color: "#748e94",
                        width : '100%',
                        height : '38px'
                      }}
                      auth={true}
                      disabled
                      />
                        <span style={{ marginBottom: "0px", color: "#465490" ,marginTop : '10px',marginLeft : '10px', fontSize : '13px' }}>
                       SWAN
                      </span>
                      </div>
                      </div>
                  <div className="ico-details-middle">
                    {/* <div>
                    <img src={Planet} />
                    </div> */}
                    <div className="balance-text" style={{width : '85%', padding : '18px 14px'}}>
                      {/* <span className="upto-2-percentage" >Up To <br/>
                       <span style={{ fontSize : '32px' }} >2%</span>  
                       <br /> Extra</span> */}
                       <span>Exchange rates refreshed in every 15 mins.</span>
                    </div>
                    {/* <div className="satalite-logo-container">
                      <img src={littleStar} className="little-star"/>
                    <img src={Satelite} />
                    </div> */}
                  </div>
                  {/* <img src={littleStar}/>
                  <img src={bigStar} style={{ float : 'right' }} />
                  <img src={Ellipse} className="ellipse-one"/>
                  <img src={Ellipse} className="ellipse-two" /> */}
                  {/* <DropdownButton 
                      eventKey={4} 
                      // className="account-balance-dropdown"
                      className= "dropdown-toggle-split"
                      title= "Ethereum"
                      variant="success"
                      width = "400px"
                    >
                      <MenuItem eventKey='5' value="weeklyOrDaily" name="daily" onClick={this.chartType } >
                          Daily
                          </MenuItem>
                          <MenuItem eventKey='5' value="weeklyOrDaily" name="weekly" onClick={this.chartType } >
                          Weekly
                          </MenuItem>
                          <MenuItem eventKey='5' value="weeklyOrDaily" name="monthly" onClick={this.chartType } >
                          Monthly
                          </MenuItem>
                     </DropdownButton> */}
                      <div className="exchange-dropdown-container">
                    <label htmlFor="paymentMode" className="form-label main-color--blue"></label>
                    <span className="select-wrapper">
                      <select id="paymentMode" name="paymentMode" onChange={this.CurrencyChange} className="form-input exchange-rate-dropdown" required>
                        {/* <option value="" hidden>Click to select wallet</option> */}
                        <option value="BTC">Bitcoin</option>
                        <option value="ETH">Ethereum</option>
                        <option value="XLM">Stellar</option>
                        <option value="USDT">USDT</option>
                        

                      {
                          // <option value="USD">USD</option>
                        // <option value="EUR">EUR</option>
                      }
                      </select>

                    </span>
                  </div>
                  {/* <div className="text-center">
                    <p className="secondary-text">Total Coins</p>
                    <p className="total-coins">{(this.props.crowdsaleStateData && this.props.crowdsaleStateData.crowdsaleState ) ? this.props.crowdsaleStateData.crowdsaleState.totalTokens : 0 }</p>
                  </div>
                  <div className="coins-left-container">
                  <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width : `${a}%` , color : '#465390' }}>
                <span> {(this.props.crowdsaleStateData && this.props.crowdsaleStateData.crowdsaleState ) ?
                  Math.round((this.props.crowdsaleStateData.crowdsaleState.distributedTokens / this.props.crowdsaleStateData.crowdsaleState.totalTokens) * 100)   :   '0'  } % </span>
                  </div>
                  {a==0?<span style={{textAlign:'center', marginLeft:'50%'}}>0%</span>:''}
                  </div>
                  </div>
                  <div style = {{marginBottom : 12}} className="text-center mt-30">
                  <Link to="/dashboard/contribution" onClick = {this.props.toggleContActive} role="button" className="invest">Invest Now</Link>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
          {/* <div className="row">
            <div
              className="col-lg-7 col-sm-12"
              style={{ 
                //transform: "translateY(-39px)" ,
               marginTop : '12px' }}
             >
              <div className="balance-card" id="fixed-height">
                <div
                  className="balance-card-inner-wrappper"
                ><div className="">
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
                    Tokens Earned by Referral {this.state.weeklyOrDaily==='weekly'?'(This Week)':''}
                  </h5>
                  
                  
                    <DropdownButton 
                      eventKey={4} 
                      className="account-balance-dropdown"
                      title={this.state.weeklyOrDaily}
                    >
                      <MenuItem eventKey='5' value="weeklyOrDaily" name="daily" onClick={this.chartType } >
                          Daily
                          </MenuItem>
                          <MenuItem eventKey='5' value="weeklyOrDaily" name="weekly" onClick={this.chartType } >
                          Weekly
                          </MenuItem>
                          <MenuItem eventKey='5' value="weeklyOrDaily" name="monthly" onClick={this.chartType } >
                          Monthly
                          </MenuItem>
                     </DropdownButton>
                     
                  <Dropdown overlay={menu} disabled>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Daily <DownOutlined />
                  </a>
                </Dropdown>
                <Dropdown overlay={menu} disabled>
                  <a className="ant-dropdown-link"
                  style={{marginLeft : '50px' }}
                  onClick={e => e.preventDefault()}>
                    Weekly <DownOutlined />
                  </a>
                </Dropdown>
                </div>
              <div>{this.state.weeklyOrDaily==='daily'?<Bar graphData={this.props.referralsEarned} typeChart={this.state.weeklyOrDaily} />:''}
              {this.state.weeklyOrDaily==='monthly'?<Bar graphData={this.props.referralsEarned} typeChart={this.state.weeklyOrDaily} />:''}
              {this.state.weeklyOrDaily==='weekly'?<Bar graphData={this.props.referralsEarned} typeChart={this.state.weeklyOrDaily} />:''}</div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 col-sm-12">
              <div
                className="balance-card"
                // style={{
                //   borderBottomLeftRadius: 0,
                //   borderBottomRightRadius: 0,
                // }}
                style={{ marginBottom : '30px' , marginTop : '12px' }}
              >
                <div
                  className="balance-card-inner-wrappper"
                  style={{ height: "321px" }}
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
                        type="number"
                        name="centralexCoinQuantity"
                        className="centralexCoinQuantity"
                        value={this.state.centralexCoinQuantity}
                        handleChange={e => this.handleCentralexCoinExchange(e) }
                        inputStyle={{
                          fontSize: "15px",
                          fontWeight: "900",
                          color: "#748e94",
                        }}
                        auth={true}
                      />
                      {
                        <input
                        type="text"
                        class="form-control"
                        style={{
                          height: "40px",
                          borderRadius: "5px",
                          border: "1px solid #979BA2",
                          marginTop: "3px",
                          padding : '8px'
                        }}
                      ></input>
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
                      <div style={{ marginTop : '-10px' }}>
                      <TextFieldInput
                      type="number"
                      value={this.state.CenInBtc}
                      inputStyle={{
                        fontSize: "15px",
                        fontWeight: "900",
                        color: "#748e94",
                        width : 'inherit'
                      }}
                      auth={true}
                      disabled
                      />
                      </div>
                      <div style={{ display : 'inline-block' }}>
                        <p style={{ marginBottom: "0px", color: "#2D6DCD" , display : 'inline-block',marginTop : '10px',marginLeft : '10px' }}>
                        BTC
                      </p>
                      </div>
                      <div style={{  marginTop : '-10px'  }}>
                        <TextFieldInput
                        type="number"
                        value={this.state.CenInEth}
                        inputStyle={{
                          fontSize: "15px",
                          fontWeight: "900",
                          color: "#748e94",
                        }}
                        auth={true}
                        disabled
                        />
                        </div>
                        <div style={{ display : 'inline-block' }}>
                          <p style={{ marginBottom: "0px", color: "#2D6DCD" , marginLeft : '10px'}}>
                            ETH
                          </p>
                          </div>
                      
                     { 
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
                      }
                    </div>
                  </div>
                </div>
                <hr style={{ borderTop: "1px solid #CEE2FE", width: "90%" }} />
              </div>
            </div>
            </div> */}
          {/* <div className="row">
            <div className="col-lg-7 last-card"style={{ marginBottom : '30px' , marginTop : '12px' , height : "auto" }} >
                 <div className="balance-card" style={{ height : '384px' }}>
                    <div className="balance-card-inner-wrappper">
                      <div style={{ display : 'flex' , justifyContent : 'space-between' }}>
                        <div>
                        <h3 className="balance-card-inner-wrapper-heading" style={{ lineHeight: '1.3'}}>
                        Invite Your friends 
                        <b/> & Earn SWAN tokens
                          </h3>
                          <p  className="mt-30 referral-content">
                          Earn up to 10% on the ongoing referral bonus <b/>
                          of your referred transaction fee. </p>
                            <p  className="main-color--blue" style={{fontSize : '15px'}}>Share the Unique Invite Link</p>
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
                      <div style={{width: '86%' , position: 'relative'}}>
                            <input value={this.state.referalUrl }
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input"
                              />
                            <CopyToClipboard text={this.state.referalUrl}
                              onCopy={() => {this.setState({copied: true});
                               toast.success("Copied");
                              }}>
                              <span className="file-copy-conatiner" style = {{height : '-webkit-fill-available'}} >
                              <FileCopyOutlinedIcon
                                style={{ outline : 'none' ,fontSize : '20px'  }}
                                />
                              </span>
                            </CopyToClipboard>
                        </div>
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
                  height: "384px",
                }}
              >
                <div className="balance-botton-inner-wrapper" style={{marginTop : '-15px' }}>
                  <h4 className="exchange-heading">Referral Tokens Earned</h4>
                    <p style={{ marginBottom: "0px", color: "#465390" ,fontSize: "32px", marginLeft : '10px' }}>
                    {
                    (this.props.userInfo.tokens.referralLevelOne + this.props.userInfo.tokens.referralLevelTwo).toFixed(2)
                    }
                    </p>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Pending-referrals">
                        <div id="circle">
                          <span className="circle-text">{this.props.userInfo.referral.pending} <span className="Pending-referrals-count"> # of Pending Referrals</span></span>
                        </div>
                      </div>
                  </div>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Confirmed-referrals">
                        <div id="confirmed-circle">
                          <span className="confirmed-circle-text">{this.props.userInfo.referral.success}<span className="Confirmed-referrals-count"># of Confirmed Referrals</span></span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div> */}
          <div className = "row" >
          <div className="col-lg-12 col-sm-12" style={{marginTop : 12}}>
              <div className="balance-card last-card">
                <div className="balance-card-inner-wrappper">
                  <h3 className="balance-card-inner-wrapper-heading text-center">
                    Purchase SWAN Tokens
                  </h3>
                  
                  {/* <p className="balance-text">
                  Total SWAN tokens available for purchase
                  </p> */}
                  <div className="col-sm-12">
                    <div className="balance-botton-inner-wrapper">
                     
                      {/* <div className="balance"> */}
                      <div className="text-center" style={{marginTop: '16px'}}>
                    <p className="secondary-text">Total SWAN tokens available for purchase</p>
                    <p className="total-coins">{(this.props.crowdsaleStateData && this.props.crowdsaleStateData.crowdsaleState ) ? this.props.crowdsaleStateData.crowdsaleState.totalTokens : 0 }</p>
                  </div>
                  <div className="coins-left-container">
                  <div className="progress">
                  <div className="progress-bar" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100" style={{width : `${a}%` , color : '#465390' }}>
                <span> {(this.props.crowdsaleStateData && this.props.crowdsaleStateData.crowdsaleState ) ?
                  Math.round((this.props.crowdsaleStateData.crowdsaleState.distributedTokens / this.props.crowdsaleStateData.crowdsaleState.totalTokens) * 100)   :   '0'  } % </span>
                  </div>
                  {a==0?<span style={{textAlign:'center', marginLeft:'50%'}}>0%</span>:''}
                  </div>
                  </div>
                  <div className="text-center">
                    <span>4,00,000</span>
                    <br/>
                    <span>Remaining SWAN Tokens for Purchase</span>
                  </div>
                  <div style = {{marginBottom : 12}} className="text-center mt-30">
                  <Link to="/dashboard/contribution" onClick = {this.props.toggleContActive} role="button" className="invest" style={{background : '#2498D5'}}>Purchase Now</Link>
                  </div>
                      {/* </div> */}
                    </div>
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

