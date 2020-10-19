/**
 *
 * ContributionConfirm
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import queryString from "query-string";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectContributionConfirm from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { toast, ToastContainer } from "react-toastify";
import { ENGINE_METHOD_DH } from "constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {  Steps, Divider} from "antd";
import Web3 from 'web3';
const { Step } = Steps;
export class ContributionConfirm extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  // Begin constructor
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      copied: false,
      valid: true,
      validBlank: true,
      currentReceivingWalletAddress : '',
      curTime: new Date().toLocaleString(),
      txHash : ''
    };
    this.goBack = this.goBack.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.copyFunction = this.copyFunction.bind(this);
    this.txValidator = this.txValidator.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
    //this.makeFinalPayment = this.makeFinalPayment.bind(this);
  }
  // End Constructor

  // Begin life cycle methods
  componentDidMount() {
      this.intervalID = setInterval(
        () => this.tick(),
        1000
      );
    if (this.props.currency == "Bitcoin") {
      const href =
        "https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2";
      const query = queryString.parse(href);
      query.chl = this.props.currentReceivingWalletAddress;
      const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(
        query
      )}`;
      this.setState({
        url: uri,
        currentReceivingWalletAddress: this.props.currentReceivingWalletAddress
      });
    } else {
      const href =
        "https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2";
      const query = queryString.parse(href);
      query.chl = this.props.ethAddress;
      const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(
        query
      )}`;
      this.setState({
        url: uri
      });
    }
  }

  // End life cycle methods
  componentWillUnmount(){
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      curTime: new Date().toLocaleString()
    });
  }
  // Begin Container functions
  txValidator(e) {
    let hash = e.target.value;
    if (hash.length > 0) {
      if (this.props.currency == "Ethereum") {
        if (hash.match(/^(0x)?([A-Fa-f0-9]{64})$/)) {
          this.setState({
            valid: true,
            validBlank: true,
            txHash: hash
          });
        } else {
          this.setState({
            valid: false,
            validBlank: false
          });
        }
      } else if (this.props.currency == "Bitcoin") {
        if (hash.match(/^[a-fA-F0-9]{64}$/)) {
          this.setState({
            valid: true,
            validBlank: true
          });
        } else {
          this.setState({
            valid: false,
            validBlank: false
          });
        }
      }
    } else {
      this.setState({
        validBlank: true
      });
    }
  }
  goBack() {
    this.props.back();
  }

  confirmPayment(e) {
    e.preventDefault();
    // const hash = document.getElementById("txhash").value;
    // if (this.state.valid) {
    //   this.props.finalPayment(hash);
    // } else {
    //   toast.error("Please enter a valid transaction hash");
    // }

    this.props.finalPayment(this.state.currentReceivingWalletAddress)
  }
  copyFunction() {
    let range = document.getSelection().getRangeAt(0);
    range.selectNode(document.getElementById("address"));
    window.getSelection().addRange(range);
    document.execCommand("copy");
    toast.success("Address copied");
  }

  makeFinalPayment(sender, hash){
    //toast.success(`Trxn Hash:  ${res}`);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    this.props.finalPayment(sender, hash)
  }

  makeTransaction = () => {
    if(this.props.paymentMode === 'viaMetamaskExt'){
      //console.log("sthereum payment started", this.props.metamaskAccount);
      let receiver = this.props.ethAddress;
      let sender = this.props.metamaskAccount;
      let amount = this.props.currencyQty;
      try{
        //const web3 = new Web3(window.web3.currentProvider);
        var txnhash = web3.eth.sendTransaction({to:receiver,
          from:sender, 
        value:web3.toWei(amount, "ether")}
          ,function (err, res){
            if(err){
              toast.error(`Error: ${err.message}`)
              //this.setState({transactionData:err, open:true})
            }else{
              toast.success(`Trxn Hash:  ${res}`);
              //this.makeFinalPayment(sender, res)
              this.props.finalPayment(sender, res)
              // console.log("txnHash:",res);
              
            }
          }.bind(this));
        
      }catch(error){
        console.log("error in send transactaion", error);
      }
      //console.log("buabuhaubuahbuhbauhabhuabuahbauhbaubhua, ", txnhash);
      
    } else if(this.props.paymentMode === 'viaPvtWallet'){
      const hash = document.getElementById("txhash").value;
        if(!hash){
          toast.error("Please enter the transaction hash");
          return ''
        }
            if (this.state.valid) {
              this.props.finalPayment(this.props.fromAddress, hash);
            } else {
              toast.error("Please enter a valid transaction hash");
            }
        //this.props.finalPayment(hash);
    }
  }



  // End Container functions

  // Begin render function
  render() {
    console.log(this.props,"props in contribution confirm ");
    console.log(this.state,"state in contribution confirm ");
    if (this.props.usdEurContributionConfirm) {
      return (
        <div>
        </div>

        // <div id="content" className="ui-content ui-content-aside-overlay">
        //   <div className="ui-content-body">
        //     <div className="ui-container container-fluid">
        //       <div className="panel panel-default">
        //         <div className="panel-heading">Make Investment</div>
        //         <div className="panel-body" style={{ fontSize: "16px" }}>
        //           <div className="row">
        //             {
        //               // <div className="row">
        //               //   <div className='col-sm-12'>
        //               //   <span className="makeInvestment">Make Investment</span>
        //               //   </div>
        //               // </div>
        //             }
        //
        //             <div className="row">
        //               <div className="col-sm-12">
        //                 <div className="goBackImagecontainer">
        //                   <span className="goBackIcon">
        //                     <img
        //                       onClick={this.goBack}
        //                       src="/assets/img/waka.svg"
        //                       alt="goBack"
        //                     />
        //                   </span>
        //                 </div>
        //               </div>
        //               <div className="col-sm-12 makeinvestextcontainer">
        //                 <span className="makeinvesTExt">
        //                   You have chosen to make a contribution via a SWIFT
        //                   transfer. Please make this transfer using the banking
        //                   information below. if you need Instructions on how to
        //                   make a SWIFT transfer, the following article is
        //                   helpful for automatic or bank branch initiated
        //                   transfer:
        //                 </span>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 litagContainer">
        //                 <span className="litagText">
        //                   <a href="#">
        //                     How to Make an International Wire Transfer
        //                   </a>
        //                 </span>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 minimunReqContainer">
        //                 <span className="minimunReqText">
        //                   The Minimum enrollment amount required from each
        //                   investor for this offering is{" "}
        //                   {this.props.successData.minInvest} USD. Token price:{" "}
        //                   {this.props.successData.tokenUsd} USD
        //                 </span>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 companyDataContainer">
        //                 <div className="row">
        //                   <div className="col-sm-4">Bank Name</div>
        //                   <div className="col-sm-8">United Overseas Bank</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">
        //                     Bank Code
        //                   </div>
        //                   <div className="col-sm-8">7375</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Branch Name</div>
        //                   <div className="col-sm-8">
        //                   UOB Orchard
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Branch Code</div>
        //                   <div className="col-sm-8">068</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Branch Address</div>
        //                   <div className="col-sm-8"><div>230 Orchard Road</div>
        //                     <div>#01-230 Faber House</div>
        //                     <div>Singapore 238854</div>
        //                     <br/>
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Swift Code</div>
        //                   <div className="col-sm-8">UOVBSGSG</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Account Number</div>
        //                   <div className="col-sm-8"><div>380-330-688-3(SGD)</div>
        //                     <div>380-946-743-9(USD)</div>
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Account Name</div>
        //                   <div className="col-sm-8">centralex</div>
        //                 </div>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 afterCompleteContainer">
        //                 <span className="afterCompleteText">
        //                   After completing your investment (through a funds
        //                   transfer) please check the box below to continue.
        //                   You'll be notified once receipt of funds is confirmed
        //                 </span>
        //               </div>
        //             </div>
        //             {
        //               //   <div className='row'>
        //               //   <div className='col-md-12 checkboxContainer'>
        //               //   <span><input type='checkbox'></input> I have enrolled by contributing the amount above using my declared account/wallet</span>
        //               //   </div>
        //               //   <div>
        //               //   </div>
        //               // </div>
        //             }
        //
        //               <div className="buttonInputContainer">
        //                 <div className="row">
        //                   <div className="col-md-6">
        //                   <form onSubmit={this.confirmPayment}>
        //                     <div className="form-group enterBankAcc">
        //                       <label
        //                         htmlFor="bankAccNumber"
        //                         className="form-label"
        //                       >
        //                         Enter the Transaction number of Bank account
        //                       </label>
        //                       <input
        //                         id="txhash"
        //                         type="number"
        //                         className="form-input form-control"
        //                         required
        //                       />
        //
        //                     </div>
        //                   <div className='row'>
        //                   <div className="col-md-6">
        //                   <input
        //                     type="submit"
        //                     className="form-button btn btn-primary"
        //                     value="Confirm"
        //                     style={{ margin: "10px" }}
        //                   />
        //                   </div>
        //                   <div className="col-md-6">
        //                     <button
        //                       className="form-button btn btn-primary"
        //                       style={{ margin: "10px" }}
        //                       onClick={this.goBack}
        //                     >
        //                       Go Back
        //                     </button>
        //                   </div>
        //                   </div>
        //                      </form>
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //
        //                 </div>
        //               </div>
        //
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

      );
    } else {
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">
          <div className="ui-content-body">
            <div className="ui-container container-fluid">
              <div className="row confirm-payment-card">
              <div className="col-sm-12">
                <IconButton
                disableRipple
                onClick={this.goBack}
                >
                  <ArrowBackIosIcon
                    style={{color : '#2D6DCD' , fontSize : '24px' , backgroundColor : 'transparent' }}
                  />
                </IconButton>
              </div>
              <div className="col-sm-12 nomarginpadding">
                <hr style={{borderBottom : '1px solid #D6E4FE' , marginTop : '0' }} />
              </div>
              <div className="col-sm-3">
                <div className="purchase-container">
                     <h3 className="main-color--blue" style={{ fontSize : '22px' ,font: 'normal normal bold 19px/23px Lato' }}>Purchase Status</h3>
                      <h5 style={{ color : '#2D6DCD' , fontWeight : 'lighter' , marginTop : '3.5em' }} >Purchase Initiated</h5>    
                      <div className="step-conatiner"> 
                     <Steps progressDot current={0} direction="vertical" labelPlacement="horizontal">
                      <Step />
                      <Step />
                    </Steps>
                    </div>
                    <h5 style={{ color : '#2D6DCD' , fontWeight : 'lighter' , marginTop : '1.5em' }} >Purchase Confirmation</h5>    
                </div>
              </div>
              <div className="col-sm-1">
                <hr className="contribution-hr" />
              </div>
              <div className="col-sm-8">
                <div className="purchase-container">
                  <h4 className="main-color--blue">Confirm Payment</h4>
                  <p className="main-color--blue">
                    {this.props.paymentMode == 'viaMetamaskExt'?'This is the QR code of Centralex`s Ethereum address':
                        `Scan this Address QR Code from your${" "}
                        ${this.props.currency} wallet${" "}`
                    }
                 </p>
                  <div className="qr-code" style={{ }}>
                      {this.props.currency === "Bitcoin" ? (
                        <img src={this.state.url} alt="" />
                      ) : (
                        <img src={this.state.url} alt="" />
                      )}
                  </div>
                  <p className="main-color--blue">
                  {this.props.paymentMode == 'viaMetamaskExt'?'Click the button below to ':
                        ''
                    }
                 Send the indicated amount to this {this.props.currency} Address </p>
                 <div style={{width: '27em' , position: 'relative', marginBottom : '20px'}}>
                              <input value={`${this.props.currencyQty} ETH`}
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input" style={{textAlign:'center', font: 'normal 18px Lato'}}
                              />
                            <CopyToClipboard text={this.props.currencyQty}
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
                        <div style={{width: '27em' , position: 'relative', marginBottom : '20px'}}>
                            <input value={this.props.ethAddress }
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input " style={{textAlign:'center', font: 'normal 18px Lato'}}
                              />
                            <CopyToClipboard text={this.props.ethAddress}
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

                 <p className="main-color--blue">
                 You will receive <input value={(this.props.tokens).toFixed(2)} style={{width:'6em'}} /> Centralex coins </p>
                 {
                    this.props.paymentMode === 'viaMetamaskExt' ? <div className="btn-row confirm-transaction-button">
                    <button 
                     className="form-button btn btn-primary"
                     style={{ marginBottom : '20px' }}
                     onClick={() => this.makeTransaction()}
                   >
                     Initiate Payment
                   </button>
                 </div> : 
                 <div className="blockchain-tx">
                 <p className="main-color--blue">
                   Please paste your transaction's TX hash below
                   and click Confirm:{" "}
                 </p>
                 <input
                   required
                   id="txhash"
                   onChange={this.txValidator}
                   type="text"
                   className="form-input form-control main-color--blue"
                   placeholder="Paste your payment's transaction hash"
                 />
                   <button
                     className="form-button btn btn-primary"
                     onClick={() => this.makeTransaction()}
                   >
                     Confirm
                   </button>
                      {this.state.valid || this.state.validBlank ? (
                        <p />
                      ) : (
                        <p style={{ color: "#ff0000" }}>
                          Please enter a valid Transaction Hash
                        </p>
                      )}
               </div>

                  }
                  <hr className="qr-code-hr" />
                  
                            {/* {
                              <div className="btn-row confirm-transaction-button">
                               <button
                                className="form-button btn btn-primary"
                                type="submit"
                                style={{ marginBottom : '20px' }}
                              >
                                Confirm
                              </button>
                            </div>
                            }

                          { 
                           <div className="blockchain-tx">
                              <p className="main-color--blue">
                                Please paste your blockchain TX hash below
                                and click Confirm:{" "}
                                <span>
                                  {this.props.currency === "Bitcoin" ? (
                                    <h4>{this.props.btcAddress}</h4>
                                  ) : (
                                    <h4>{this.props.ethAddress}</h4>
                                  )}
                                </span>
                              </p>
                              <input
                                required
                                id="txhash"
                                onChange={this.txValidator}
                                type="text"
                                className="form-input form-control main-color--blue"
                                placeholder="Paste hash payment code"
                              />
                            </div> */}
                  <div className="confirm-block" style={{maxWidth:'35em' , textAlign : 'center' }}>
                        {  
                        // <ol>
                        //     <li className="main-color--blue">
                        //       Wallet address to deposit{" "}
                        //       <strong>
                        //         {this.props.currencyQty}{" "}
                        //         {this.props.currency === "Ethereum"
                        //           ? "ETH"
                        //           : "BTC"}
                        //       </strong>{" "}
                        //       for purchase of{" "}
                        //       <strong>
                        //         {this.props.tokens} Centralex Tokens
                        //       </strong>
                        //       <div className="mt-10">
                        //         <div className="mt-20">
                        //           <div className="blockchain-tx text-center ">
                        //             <p>
                        //               <span>
                        //                 <h4
                        //                   id="address"
                        //                   defaultValue={
                        //                     this.props.ethAddress
                        //                   }
                        //                 >
                        //                   {this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
                        //                 </h4>
                        //                 {/* <button style={{margin:"10px" ,borderRadius:"30px"}} className="form-buy-button" onClick={this.copyFunction}> */}
                        //                 <div className="row">
                        //                   <div className="col-sm-6">
                        //                     <CopyToClipboard
                        //                       text={this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
                        //                       onCopy={() =>
                        //                         this.setState({
                        //                           copy: true
                        //                         })
                        //                       }
                        //                     >
                        //                       <button
                        //                         style={{
                        //                           borderRadius: "30px"
                        //                         }}
                        //                         className="form-button"
                        //                       >
                        //                         Copy
                        //                       </button>
                        //                     </CopyToClipboard>
                        //                   </div>
                        //                   <div
                        //                     className="col-sm-6"
                        //                     style={{ paddingTop: "10px" }}
                        //                   >
                        //                     {this.state.copy ? (
                        //                       <p>Address Copied</p>
                        //                     ) : (
                        //                       ""
                        //                     )}
                        //                   </div>
                        //                 </div>
                        //               </span>
                        //             </p>
                        //             {!(
                        //               this.props.currency === "Bitcoin"
                        //             ) ? (
                        //               <div className="row">
                        //                 <div className="col-md-6 ">
                        //                   <span className="gas1">
                        //                     SET GAS LIMIT:
                        //                     {this.props.gasLimit
                        //                       ? this.props.gasLimit
                        //                       : `120000`}
                        //                   </span>
                        //                 </div>
                        //                 <div className="col-md-6 ">
                        //                   <span className="gas2">
                        //                     SET GAS PRICE:
                        //                     {this.props.gasPrice
                        //                       ? this.props.gasPrice
                        //                       : 95}{" "}
                        //                     GWei
                        //                   </span>
                        //                 </div>
                        //               </div>
                        //             ) : (
                        //               ""
                        //             )}
                        //           </div>
                        //         </div>
                        //       </div>
                        //     </li>
                        //     <li className="main-color--blue">
                        //       Please visit your cryptocurrency wallet and
                        //       make payment to the above address.
                        //     </li>
                        //     <li className="main-color--blue">
                        //       Only send{" "}
                        //       {this.props.currency === "Bitcoin"
                        //         ? "BTC"
                        //         : "ETH"}{" "}
                        //       to this address
                        //     </li>
                        //       {this.props.currency=='Ethereum'? <li className="main-color--blue">
                        // Don't make payment through exchange.You can
                        //       use Metmask, MyEtherWallet, Mist Wallet etc
                        //     </li>:""}
                        //     <li className="main-color--blue">
                        //       To avoid delays, you must paste and confirm
                        //       your Blockchain TX Code as soon as available
                        //       and confirm for our records.
                        //     </li>
                        //   </ol>
                          }
                          {/* <form onSubmit={this.confirmPayment}> */}
                            <div className="transaction-time">
                            <p className="main-color--blue">
                            Time of initiation : {this.state.curTime}
                             <br/>
                             This transaction will expire within 5 hours of initiation.
                            </p>
                            <p className="main-color--blue">
                            Any payments after 5 hours will receive tokens based on the exchange 
                            rate at that time of payment.
                            </p>
                            </div>
                            {
                            //   <div className="btn-row confirm-transaction-button">
                            //    <button
                            //     className="form-button btn btn-primary"
                            //     type="submit"
                            //     style={{ marginBottom : '20px' }}
                            //   >
                            //     Confirm
                            //   </button>
                            // </div>
                            }

                          { 
                          //  <div className="blockchain-tx">
                          //     <p className="main-color--blue">
                          //       Please paste your blockchain TX hash below
                          //       and click Confirm:{" "}
                          //       <span>
                          //         {this.props.currency === "Bitcoin" ? (
                          //           <h4>{this.props.btcAddress}</h4>
                          //         ) : (
                          //           <h4>{this.props.ethAddress}</h4>
                          //         )}
                          //       </span>
                          //     </p>
                          //     <input
                          //       required
                          //       id="txhash"
                          //       onChange={this.txValidator}
                          //       type="text"
                          //       className="form-input form-control main-color--blue"
                          //       placeholder="Paste hash payment code"
                          //     />
                          //   </div>
                          //   {this.state.valid || this.state.validBlank ? (
                          //     <p />
                          //   ) : (
                          //     <p style={{ color: "#ff0000" }}>
                          //       Please enter a valid Transaction Hash
                          //     </p>
                          //   )}
                          //   <div className="btn-row">
                          //     <button
                          //       className="form-button btn btn-primary"
                          //       type="submit"
                          //       style={{ marginBottom : '20px' }}
                          //     >
                          //       Confirm
                          //     </button>
                          //   </div>
                            }
                          {/* </form> */}
                        </div>
                      </div>
                    </div>
                    </div>
             
             
             
             {
              //   <div className="panel panel-default">
              //   <div className="panel-heading">Confirm Payment</div>
              //   <div className="panel-body" style={{ fontSize: "16px" }}>
              //     <div className="row">
              //       <div className="col-sm-12">
              //         <div className="contribution">
              //           <div className="row">
              //             <div className="col-sm-12 col-md-12 text-center">
              //               <h2>You are almost there!</h2>
              //               {/* <h4> Time remaining for this transaction: <span style={{ color: '#ff0000' }}>{this.props.min}:{this.props.sec}</span> (mm:ss)</h4> */}
              //               {/* <div id="timer"></div> */}
              //             </div>
              //           </div>

              //           <div className="confirm-block">
              //             <div className="row">
              //               <div className="col-sm-12 col-md-6">
              //                 <ol>
              //                   <li>
              //                     Wallet address to deposit{" "}
              //                     <strong>
              //                       {this.props.currencyQty}{" "}
              //                       {this.props.currency === "Ethereum"
              //                         ? "ETH"
              //                         : "BTC"}
              //                     </strong>{" "}
              //                     for purchase of{" "}
              //                     <strong>
              //                       {this.props.tokens} Centralex Tokens
              //                     </strong>
              //                     <div className="mt-10">
              //                       <div className="mt-20">
              //                         <div className="blockchain-tx text-center ">
              //                           <p>
              //                             <span>
              //                               <h4
              //                                 id="address"
              //                                 defaultValue={
              //                                   this.props.ethAddress
              //                                 }
              //                               >
              //                                 {this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
              //                               </h4>
              //                               {/* <button style={{margin:"10px" ,borderRadius:"30px"}} className="form-buy-button" onClick={this.copyFunction}> */}
              //                               <div className="row">
              //                                 <div className="col-sm-6">
              //                                   <CopyToClipboard
              //                                     text={this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
              //                                     onCopy={() =>
              //                                       this.setState({
              //                                         copy: true
              //                                       })
              //                                     }
              //                                   >
              //                                     <button
              //                                       style={{
              //                                         borderRadius: "30px"
              //                                       }}
              //                                       className="form-button"
              //                                     >
              //                                       Copy
              //                                     </button>
              //                                   </CopyToClipboard>
              //                                 </div>
              //                                 <div
              //                                   className="col-sm-6"
              //                                   style={{ paddingTop: "10px" }}
              //                                 >
              //                                   {this.state.copy ? (
              //                                     <p>Address Copied</p>
              //                                   ) : (
              //                                     ""
              //                                   )}
              //                                 </div>
              //                               </div>
              //                             </span>
              //                           </p>
              //                           {!(
              //                             this.props.currency === "Bitcoin"
              //                           ) ? (
              //                             <div className="row">
              //                               <div className="col-md-6 ">
              //                                 <span className="gas1">
              //                                   SET GAS LIMIT:
              //                                   {this.props.gasLimit
              //                                     ? this.props.gasLimit
              //                                     : `120000`}
              //                                 </span>
              //                               </div>
              //                               <div className="col-md-6 ">
              //                                 <span className="gas2">
              //                                   SET GAS PRICE:
              //                                   {this.props.gasPrice
              //                                     ? this.props.gasPrice
              //                                     : 95}{" "}
              //                                   GWei
              //                                 </span>
              //                               </div>
              //                             </div>
              //                           ) : (
              //                             ""
              //                           )}
              //                         </div>
              //                       </div>
              //                     </div>
              //                   </li>
              //                   <li>
              //                     Please visit your cryptocurrency wallet and
              //                     make payment to the above address.
              //                   </li>
              //                   <li>
              //                     Only send{" "}
              //                     {this.props.currency === "Bitcoin"
              //                       ? "BTC"
              //                       : "ETH"}{" "}
              //                     to this address
              //                   </li>
              //                     {this.props.currency=='Ethereum'? <li>
              //               Don't make payment through exchange.You can
              //                     use Metmask, MyEtherWallet, Mist Wallet etc
              //                   </li>:""}
              //                   <li>
              //                     To avoid delays, you must paste and confirm
              //                     your Blockchain TX Code as soon as available
              //                     and confirm for our records.
              //                   </li>
              //                 </ol>
              //                 <form onSubmit={this.confirmPayment}>
              //                   <div className="blockchain-tx">
              //                     <p>
              //                       Please paste your blockchain TX hash below
              //                       and click Confirm:{" "}
              //                       <span>
              //                         {this.props.currency === "Bitcoin" ? (
              //                           <h4>{this.props.btcAddress}</h4>
              //                         ) : (
              //                           <h4>{this.props.ethAddress}</h4>
              //                         )}
              //                       </span>
              //                     </p>
              //                     <input
              //                       required
              //                       id="txhash"
              //                       onChange={this.txValidator}
              //                       type="text"
              //                       className="form-input form-control"
              //                       placeholder="Paste hash payment code"
              //                     />
              //                   </div>
              //                   {this.state.valid || this.state.validBlank ? (
              //                     <p />
              //                   ) : (
              //                     <p style={{ color: "#ff0000" }}>
              //                       Please enter a valid Transaction Hash
              //                     </p>
              //                   )}
              //                   <div className="btn-row">
              //                     <button
              //                       className="form-button btn btn-primary"
              //                       type="submit"
              //                     >
              //                       Confirm
              //                     </button>
              //                     <button
              //                       className="form-button btn btn-primary"
              //                       style={{ margin: "10px" }}
              //                       onClick={this.goBack}
              //                     >
              //                       Go Back
              //                     </button>
              //                   </div>
              //                 </form>
              //               </div>
              //               <div className="col-sm-12 col-md-6">
              //                 <div className="qr-code">
              //                   <h4>
              //                     {" "}
              //                     <text style={{ fontSize: "25px" }}>
              //                       OR
              //                     </text>{" "}
              //                     Scan this Address QR Code from your{" "}
              //                     {this.props.currency} wallet{" "}
              //                   </h4>
              //                   {this.props.currency === "Bitcoin" ? (
              //                     <img src={this.state.url} alt="" />
              //                   ) : (
              //                     <img src={this.state.url} alt="" />
              //                   )}
              //                 </div>
              //               </div>
              //             </div>
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
             }
            
            </div>
          </div>
        </div>
      );
    }
  }
}

ContributionConfirm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  contributionconfirm: makeSelectContributionConfirm()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "contributionConfirm", reducer });
const withSaga = injectSaga({ key: "contributionConfirm", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ContributionConfirm);
