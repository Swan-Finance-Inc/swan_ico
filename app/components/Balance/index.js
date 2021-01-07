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
import { Menu,Popconfirm, message ,Input} from "antd";
import { DownOutlined } from "@ant-design/icons";
import btcStatus from "../../images/btcStatus.svg";
import EthStatus from "../../images/EthStatus.svg";
import OthersStatus from "../../images/OthersStatus.svg";
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar } from 'react-circular-progressbar';
import TextFieldInput from "../../components/TextFieldInput";
import ethLogo from "../../images/ethLogo.png";
import { Navbar, Nav, MenuItem, NavDropdown, Modal ,Badge , DropdownButton, Button,Dropdown} from 'react-bootstrap';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { ToastContainer, toast } from 'react-toastify';
import littleStar from "../../images/littleStar.svg";
import bigStar from "../../images/bigStar.svg";
import Ellipse from '../../images/Ellipse.svg';
import { Left } from "react-bootstrap/lib/Media";
import stellarLogo from '../../images/logoXLM.png'

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
      weeklyOrDaily: 'daily',
      curr: '',
      exchangeRate: 0,
      crowdsaleState: {}
    };
    this.CurrencyChange = this.CurrencyChange.bind(this);
  }

  componentDidMount(){
    this.setState({
      referalUrl:`https://centralex.com/signup/refer/${this.props.referralCode}`
    })
  }

  toggleTranActive = (e) => {
    this.props.compact();
    this.props.toggleTranActive();
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
    this.setState({
      ...this.state,
      crowdsaleDetails : nextProps.crowdsaleStateData.crowdsaleDetails,
      crowdsaleState : nextProps.crowdsaleStateData.crowdsaleState
    })
  }

  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow,
    });
  };

  resetInfo = () => {
    this.props.toggleInfo();
  };


   confirm =  (e) => {
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

  CurrencyChange(e){
    this.setState({
      curr:e.currentTarget.dataset.myValue
    },()=>{
      if(this.state.curr =='BTC'){
        this.setState({
          exchangeRate : this.state.crowdsaleDetails.tokenPerBtc
        })
      } else if(this.state.curr =='ETH'){
        this.setState({
          exchangeRate : this.state.crowdsaleDetails.tokenPerEther
        })
      } else if(this.state.curr =='XLM'){
        this.setState({
          exchangeRate : this.state.crowdsaleDetails.tokenPerXlm
        })
      } else if(this.state.curr =='USDT'){
        this.setState({
          exchangeRate : this.state.crowdsaleDetails.tokenPerUsdt
        })
      }
    })
  }
  render() {
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
    var a;
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
          others = (total-btc-eth),
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
        <div  ></div>
        <div className="container-fluid nomarginpadding">
          <div className="row">
            <div className="col-lg-7 col-sm-12 col-md-8">
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
                  <div className="col-sm-6" style={{width:'fit-content'}}>
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
                        {this.state.balanceType === "USD" ?  this.props.userInfo.tokens.total * 0.001<1?(`$ ${( this.props.userInfo.tokens.total * 0.001).toFixed(5)}`):(`$ ${( this.props.userInfo.tokens.total * 0.001).toFixed(5)}`) :
                         this.props.userInfo.tokens.total.toFixed(5)
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
                      <CircularProgressbarWithChildren value={btcPercent}
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
                           {btcPercent}%  <strong className="font-weight-bold " style={{font:'normal normal normal 20px/24px Lato'}} ><br />BTC</strong>
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
                      <CircularProgressbar value={ethPercent}
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
                      <span className="main-color--blue ">{ethPercent}%</span>   
                        <br />
                        <span className="main-color--blue font-weight-bold ">Ethereum</span>
                        </span>
                     
                      </div>
                      <div style={{ display : 'flex' , marginTop : '10px' }}>
                      <div style={{ width : '50px' }}>
                      <CircularProgressbar value={othersPercent}
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
                      <span className="main-color--blue ">{othersPercent}%</span>   
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
            <div className="col-lg-5 col-md-4 col-sm-12" style={{   }}>
              <div className="balance-card" id="fixed-height" >
                <div className="balance-card-inner-wrappper">
                  <h4 className="balance-card-inner-wrapper-heading">
                    Exchange Rates
                  </h4>
                  <div className="exchange-trading-container" >
                  <div className="exchange-text">You get*</div>
                    <div className="exchange-trading-input" >
                  <TextFieldInput
                      type="text"
                      value={this.state.exchangeRate}
                      inputStyle={{
                        fontSize: "15px",
                        fontWeight: "900",
                        color: "#748e94",
                        width : '100%',
                        height : '38px'
                      }}
                      
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
                      {/* <select id="paymentMode" name="paymentMode" onChange={this.CurrencyChange} className="form-input exchange-rate-dropdown" required>
                        <option value="" hidden>Click to select crypto</option>
                        <option value="BTC">1 Bitcoin</option>
                        <option value="ETH">1 Ethereum</option>
                        <option value="XLM">1 Stellar</option>
                        <option value="USDT">1 USDT</option>
                      </select> */}
                      <Dropdown className="currency-dropdown" style={{width:'88%'}} >
                                  <Button className="currency-button" style={{width:'85%'}} variant="success">{this.state.curr?this.state.curr:'Click to select crypto'}</Button>
                                  <Dropdown.Toggle  className="currency-dropdown-toggle" style={{width:'15%'}} split variant="success" id="dropdown-split-basic"/>
                                  <Dropdown.Menu className="currency-menu" >
                                    <MenuItem data-my-value="BTC" onClick={this.CurrencyChange}>
                                      <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAS1BMVEVHcEz4lBr4lhv/miT4lBr7lRz/szP4kxr4lBr4lBr9lx35lBr4kxr6lRv3kxr////++PH+7Nf937z7xIL80Z74pkL6uWr3min5r1Xgn4fZAAAADnRSTlMAq0YP7TkFwNaKHXj6XnPArAgAAASxSURBVHjazVvdmqsgDKy/qLUBBNT3f9Jz0e7ZaqlMEFdz269NCpNkEpLbLUaK6tFmQjRN2fdl0wiRtY+quP2JFHkrSlpJT0REpWjzY62o81b0tCm9aPP6IPVVWxIkZVul197dG2JIc+/S/vmM2JKlO4ZKUJSINCbkkeqJiES+/+4z2iXZPizU95J2Snnf4ZVVQwmkiYVC3VIiaaMOoROUTEQEEvKSEkrJdoeWEkvLu/6MkkvGAEIh6AARcKoumiP0U9+AFnTH6CeipjtXPxFyBsWB+hELanGkfupFyBcyOliyP44/zIiUc39tGIzjfmcjKnfs+K+klGowEysvdOkAOMunTLyQWCcDgHnq109rBjPvgkHFB9TwNMASEZF9XgeCCS9HqiMikHoaMBIRkX63JhCPfJdw5+tfQGCS79YE5J7CA9YQ4ADS4wlQCLTajm4DAv+t4QdELARpKaVU/42IhYAvHEEh4OeapdR2dDsgQEQixgVn+S5KR0Pg0xWxGGilT4YICKyPAIxB2mvAM/owIbA6AowFTPK7KCYElo7QYd+YzKBkQDhpqYsJgs7oTQMsgx78hkNeFhi3z0DDt9DEpkETuAZlmDDk8oApBASpMWLw4gU1Ow3JsEDuWNZxTHReos7vG3qCEwKbiS0wMH/zDcSClhGGP4nY0vGdVd4QHQ7HRR9JxNaxf1qnirA/9kUMBNxXsM3LQ9AYCBJA4JsFIwSCNBDwxigLgaBMBIHPDwEYlrdbkQ4CH5QBAEHBr4c2ILC+H8CA6vZICQH+CTz4TrAJgYkbilp2T2YbAstYBKTljO2FZsvRV1zFIcFY7IGA1HacvtJ2hKKLW7MDAj+s3JpxHD+zMkKMGq4BTsIC1SgNNxAaWL+C+HF56/dAYEs/Rgt7rgEK1D+AFUrPvALnK8c8sJzRHyyZIFwmgmn2E1KD/yDXCzyJYLYeQupwA0SCRPBJSBXeKBFpEoFRbEb6MiCLh8AyD645MYbDjJeON7nAKhMpsDx87IfAFwsgX3iwKJkLUN6BnwsqFik1gTt2bDpABYuWD6FukOLCsIQKE6ftPK3Lch3u442IFyKlmZVSSj0M4aqHW5lRixSnkzfpzGG2AlxBjpTnBm4IWi4I+wJpUGiUbznFjUQCadHM/pSvP57IVvqxsgRoUm2QsOH3/WQabQQryIE2XZAGKz0M2nNNKkzKXm26wB04oEUd2Sls4VZtjBEOSQScZjXTCOAAGn673sFlAdKmvHMfLBh1CVQWdRGDG69LsFbvL4uyiIdz9wswN34/DYyVV/xnu5+0oDZCpJQaGqjoRczswOKx+Ofp2tg399AWrQiqiKfb5WPxwprJzfM8O/zRTMQ8XrtFjFHsl8LPNMB8u/RCYIrSn0UNMHghEKXfN8pz3wMBrtyjhljSQcA7xAInxQQQqHYMMjljdkOgTTHKtQMC32cKOaM8L3owpvGAyHE+Z4YpQQi60kDj+SOdRw+1UnCo9dix3v7swWJouLs+e7T7uOHuBh+vP3m8//wFh/NXPC6w5HL+ms/5i07nr3pdYNnt/HW/Cyw8XmDl8wJLrxdY+73A4vMVVr83lt9f//zw5fcj1v//AUJgzq1BOb7uAAAAAElFTkSuQmCC"></img>
                                      (BTC) 1 Bitcoin</MenuItem>
                                    <MenuItem data-my-value="ETH" onClick={this.CurrencyChange}>
                                      <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAQlBMVEVHcExnge9if+tjf+xifutif+tvgvZjf+tkgexjgOtifurAy/b///+Bl+78/P5rheuSpfCltfO1wvV1ju3s7/zX3vmZ+KnyAAAACnRSTlMAHPpp1u0KuT+IQ31QMAAABPlJREFUeNrNW1uiqyAMVFTeIKDuf6v3o6etD9Qk0NuyABnJZBJC0jSUxWWnhBB9PzA29L0QQnWSN/9lcanEoDXTTK8W00zrQagPo+BSic2+x8U+CEKqQYPWoGT93VvVa8TqVVv354VGLyFrbs/wAFgtCJS/r3gKbcH2WmstyrjAu6Fsf81YV3L6va6werIdlK601FesX8oEOeiKa5BfO36iGUTt/TUTiBjFMdIXXHUELcb7xjlBz6BvP7C/Tt6Eughw+zvvjZnAmgRAwHHqt1hvTISrIgfwD7Oitd4Y4+CSxKv63zg/AKQRjqCq/hj7AADmodbsUpEkbn9nnwDgPNT6QpVbpP7PbwAJERfaWgIc7RsAwgjnNEASYPJrAAgengUmJAH0YtcAEGJwRgNk/hXsFgBCDHSf27/TaAnYAkDwUHflHpDsHgCGh6wt9YA/Bm4AmLHAE4gM3AKA85AdeChoDNwCwPBQFB3Ai4E7ABgxkCUHYGweAFkPsUHInwGgBiVBZeABQCQdQUsJQnkAcB4y3RKj0OSvACDEQBGjgLGXACI+IkiqBGQBIHgoSRaY7wAkrA04KgwlewcALgYDx1tgx8AsADgPJd4CiwUAiDgbiAIG5gGAxUA0TdNwRBV0nGEAwDd2jqRAsjAAYB5KHAWchwKAioHCUWDJ7G+XmAMQ4SSAq0DM/P5ijHORzMOhaTicgQcDzI+tnHMxEcWAIzhosts/ADgXEomHEn4fcTvTvw/7b4WI5yHr4E4w70x/ALCHkGBuINAM9PscaL0CzghMQAG8g9B84Pt2rcgwQvxQ4CRgyTjcfr0sESEAekQQ8ktOc5w7hXAvBj0MwDifam4WgPsTpwQAMACD0GwMCsCDDOFeChkoCC3GoAE4F9KtGDAQgGQMCYBzLtwCgJhgilQA03hrApgXuEQCMNbyAq11wAOABIMeno+MEQcAlhMJTEI0JTiACXg3EI0AuMF0SYVL44+3ABTI/k8IY4AAmN5mm25fD0AJSfKv8tPRJc+NH+6VsAOmZIudw5kdzk7fpftwyCQwKZ28tYvLu2R++ymCEgIOTcuDtda/PrhxyazxAywaD/CLibHWWh8z6pxxvQDPR8BXs0dKkKNCzvjQpFQhLqePi6G3y94lD66HSMsl5noen0lx2lIhY3zoxYRxVIHidTed4/q0M6cPvZ0KXIlmet9NVi6ZVq6XkHVzhSxSrQs0b3XOhkvY5Vhiy3SbMn28SBhgN9O/Mh2mRrKpEc3hLGUC1ogUvlS7KxM+qTBFUoFGEorVcV8gGjMxGlil60nl+n2daI6H0gSwPrTqJMA8WIz3xWpopbalPdkEX6dczwT10SpdAwDXyiX52W65AgAuVAv6w+XWF31RqZ52BOEcgKMdAPbd6PTlFP5iJYue70/fjqEfYKKwgWFVN/eUB7NcKw+uhSPmAMCfrrsabXQHAIQnywIeTscmlpHOQMoDZkEbj6rTS2i2AOAEELWa2eZNK5cu8QAiDfwKQDEBKDSIbwDlBCA1cyxPALFAAkslGddTet9ezZFtxdYjJJj1vHpjtfUID/xEa/Xi4QT4SHP55MEe2IPnLFCSGFw1/pFFufr+PzDi8f0hl++P+TQN//Kg0w+MejVNUzzspoeSYbdyJjBRPvr55YHHEgh1p06/uf0PjP3+wOAzdPRb/5f585OT+Pzw+yfG//8BUsAQ+7Jxz/gAAAAASUVORK5CYII="></img>
                                      (ETH) 1 Ethereum</MenuItem>
                                    <MenuItem data-my-value="XLM" onClick={this.CurrencyChange}>
                                      <img className="cryptoBuddy_Logo" style={{width:"31px"}} src={stellarLogo}></img>
                                     (XLM) 1 Stellar</MenuItem>
                                    <MenuItem data-my-value="USDT" onClick={this.CurrencyChange}>
                                      <img className="cryptoBuddy_Logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2326A17B'/%3E%3Cpath fill='%23FFF' d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'/%3E%3C/g%3E%3C/svg%3E"></img>
                                      (USDT) 1 USDT</MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>
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
                    (this.props.userInfo.tokens.referralLevelOne + this.props.userInfo.tokens.referralLevelTwo).toFixed(5)
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
                    <span>{
                    (this.props.crowdsaleStateData && this.props.crowdsaleStateData.crowdsaleState ) ?
                    Math.round(this.props.crowdsaleStateData.crowdsaleState.totalTokens-this.props.crowdsaleStateData.crowdsaleState.distributedTokens): 0}</span>
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

