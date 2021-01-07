import React from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import Web3 from 'web3';
import { Modal } from 'react-bootstrap';
//import {Loader} from '../../../static/assets/img/loaderNu.svg';
import LoadingSpinner from '../LoadingSpinner'
import constants from '../../utils/contractConfig';
import greenTick from '../../images/greentick.png'
export class Stake extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
          tokens:0,
          trxnReceipt: '',
          approveLoader: false,
          approveSuccess: false,
          approveStart: false,
          stakeLoader: false,
          stakeSuccess: false,
          stakeStart: false,
          showStake: false,
          currTxHash: '',
          approveError:'',
          stakeSwanError:'',
          approvedTokens: 0,
        };
        this.goBack = this.goBack.bind(this);
        this.amtApprove = this.amtApprove.bind(this);
        this.updateStatusFromContract = this.updateStatusFromContract.bind(this);
        this.checkHashStatus = this.checkHashStatus.bind(this);
        this.stakeTokens = this.stakeTokens.bind(this);
        this.getAllowance = this.getAllowance.bind(this);

    }
    componentDidMount(){
      this.getAllowance();
    }

    goBack() {
      this.props.back();
    }

    amtApprove(e) {
      //const currencyQuant = document.getElementById('amt');
      this.setState({
        tokens: e.target.value,
      });
    }

    getAllowance=async()=>{
      var address = constants.tokenContractAddress;
      var abi = constants.tokenContractAbi, result=0;

      try{
      const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/d7d0528ca2d9420f923a62ed98149712`))
      let userAddress = web3.utils.toChecksumAddress(this.props.ethWallet.address);
      const contract = new web3.eth.Contract(abi, address);
      //console.log("contract hai: ", contract)
          
      result = await contract.methods.allowance(constants.stakeContractAddress, userAddress).call();
      
      this.setState({approvedTokens: result});
 
      } catch(err){
        toast.error(`Error in getAllowance ${err}`)
     
      }
    }

    approveTokens=()=>{
   
      var address = constants.tokenContractAddress;
      var abi = constants.tokenContractAbi;
      var spender = constants.stakeContractAddress;

      try{    
      
      const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/d7d0528ca2d9420f923a62ed98149712`)) //--prodChange
      //let recipientAddress = web3.utils.toChecksumAddress(req.body.recipientAddress);
      let tokenAmount = web3.utils.toWei(this.state.tokens);
      const contract = new web3.eth.Contract(abi, address);


      let pvtKey = this.props.ethWallet.private_key;
      let rawTransaction = {
      "from": this.props.ethWallet.address,
        "to": address,
        "value": '0x0',
        'gasPrice': web3.utils.toHex(20 * 1e9),
        'gasLimit': web3.utils.toHex(210000),
        "chainId": "0x01",
        "data": contract.methods.approve(spender, tokenAmount).encodeABI(),
        }; //--prodChange
        try
        {let signTransaction = web3.eth.accounts.signTransaction(rawTransaction, pvtKey, function(err, res){
          if(err)
          {console.log("Error occured in signtrxn",err)}
          else
          {
          
            web3.eth.sendSignedTransaction(res.rawTransaction, function(err,res){
              if(err)
              { 
                this.setState({
                  approveError : `${err}`
                })
                // toast.error(`Error in sending trxn: ${err}`)
                }
              else
              {
                toast.success('Transaction initiated, Wait for confirmation');
         
                this.setState({
                  approveLoader:true,
                  approveStart: true
                })
                this.checkHashStatus(res, this.updateStatusFromContract);
              }
            }.bind(this))
        }
      }.bind(this));
      } catch(error){
        this.setState({
          approveError : ` ${error}`
        })
        // toast.error(`Error in signing trxn: ${error}`)
  
      }
      //const result = await contract.methods.transfer('0x8f69A29B647Ff8657Da8e37013Ec40fFe5860632','1').send({ from: '0xB32d0b0922e7bC945ccD5CB60e7B1ac53546d11E', value: web3.utils.toWei('0.01',"ether") });
      //console.log("hehe",result);
      } catch(err){
          this.setState({
            approveError : `${err}`
          })
          // toast.error(`Error in approving tokens: ${err}`)
      
      }
    }

    checkHashStatus(hash, callback) {

      const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/d7d0528ca2d9420f923a62ed98149712`)) //--prodChange
      web3.eth.getTransactionReceipt(hash, function(error, rcpt) {
                      if(error) {
                          console.error(error);
                      } else {
                          if(rcpt == null) {
                              setTimeout(function() {
      //call iteratively till hash matches and block is mined
                                  this.checkHashStatus(hash, callback);
                              }.bind(this), 5000);
                          } else {
                              console.log("rcpt",rcpt)
                              this.setState({
                                trxnReceipt: rcpt
                              },()=>callback())
                              //call the function once block is committed
                              
                          }
                      }
                  }.bind(this))
              }
      updateStatusFromContract(){
        if(this.state.trxnReceipt.status && this.state.approveStart){
          this.setState({
            approveLoader:false,
            approveStart:false,
            approveSuccess:true
          });
          this.getAllowance();
          toast.success('Transaction confirmed. Start Staking');
        } else if(this.state.trxnReceipt.status && this.state.stakeStart){
          this.setState({
            stakeLoader:false,
            stakeStart:false,
            stakeSuccess:true
          })
          toast.success('Transaction confirmed. Tokens Staked');
          this.props.confirmInvestPayment('Stake', 4, 14,this.props.ethWallet.address, this.state.tokens, this.state.currTxHash)
        } else if(!this.state.trxnReceipt.status && this.state.stakeStart){
          toast.error('Transaction not confirmed');
          this.setState({
            stakeLoader: false,
            stakeStart:false,
          });
        } else {
          toast.error('Transaction not confirmed');
          this.setState({
            approveLoader:false,
            approveStart:false,
          });
        }
        
        console.log("got callback");
      }


      stakeTokens=()=>{
        console.log("enetered stake tokens")
        var address = constants.stakeContractAddress;
        var abi = constants.stakeContractAbi;
        var checkbox = document.getElementById('stakeToken').checked
        //var spender = constants.stakeContractAddress;
        if(!checkbox){
          toast.error('Please confirm terms and conditions');
          return
        }
        try{    
        
        const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/d7d0528ca2d9420f923a62ed98149712`)) //--prodChange
        //let recipientAddress = web3.utils.toChecksumAddress(req.body.recipientAddress);
        let tokenAmount = web3.utils.toWei(this.state.tokens);
        const contract = new web3.eth.Contract(abi, address);
        console.log("contract hai: ")
  
        let pvtKey = this.props.ethWallet.private_key;
        let rawTransaction = {
        "from": this.props.ethWallet.address,
          "to": address,
          "value": '0x0',
          'gasPrice': web3.utils.toHex(20 * 1e9),
          'gasLimit': web3.utils.toHex(210000),
          "chainId": "0x01",
          "data": contract.methods.stake(tokenAmount).encodeABI(),
          }; //--prodChange
          try
          {let signTransaction = web3.eth.accounts.signTransaction(rawTransaction, pvtKey, function(err, res){
            if(err)
            {console.log("Error occured in signtrxn",err)}
            else
            {
              console.log("Sign trxn res: ", res);
              web3.eth.sendSignedTransaction(res.rawTransaction, function(err,res){
                if(err)
                { toast.error(`Error in sending trxn: ${err}`)
                  console.log("Error occured in sendDisngnedtrxnn", err)}
                else
                {
                  toast.success('Transaction initiated, Wait for confirmation');
                  console.log("Send signed trxn res: ", res);
                  this.setState({
                    stakeLoader:true,
                    stakeStart: true,
                    currTxHash: res
                  })
                  this.checkHashStatus(res, this.updateStatusFromContract);
                }
              }.bind(this))
          }
        }.bind(this));
        } catch(error){
          toast.error(`Error in signing trxn: ${error}`)
          console.log("in catch of sending transaction trxn: ",error);
        }
        //const result = await contract.methods.transfer('0x8f69A29B647Ff8657Da8e37013Ec40fFe5860632','1').send({ from: '0xB32d0b0922e7bC945ccD5CB60e7B1ac53546d11E', value: web3.utils.toWei('0.01',"ether") });
        //console.log("hehe",result);
        } catch(err){
            toast.error(`Error in staking tokens: ${err}`)
            console.log(err,"error hai")
        }
      }

    componentWillUnmount(){
      //clearInterval(this.intervalID);
    }

    hide=(e)=>{
      this.setState({
        showStake:false,
      })
    }

    onStakeToken = () =>{
      if(this.state.tokens>0){
        this.setState({showStake:true})
      }
      else{
        this.setState({
          stakeSwanError :'Please fill swan tokens'
        })
        // toast.error('Please fill swan tokens')
      }
    }
  

    render(){

        return(
            <div>
                    <div className="static-modal">
                      <Modal show={this.state.showStake} bsSize="medium" onHide={this.hide} dialogClassName="">
                        <Modal.Body>
                          <div>
                            <div className="row">
                              <div className="col-sm-12 text-right">
                                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ showStake:false })}}></i>
                              </div>
                            </div>
                            <div className="row" style={{textAlign:"center"}}>
                              <h3 style={{fontStyle:"Lato"}}>TRANSACTION DETAILS</h3>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 col-md-12 col-lg-12" style={{paddingLeft:"20px"}}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <div className="col-sm-6 col-md-6 col-lg-6">Quantity</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>{this.state.tokens} SWAN</div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <div className="col-sm-6 col-md-6 col-lg-6">Lockup Period</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>4 Months</div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <div className="col-sm-6 col-md-6 col-lg-6">ROI</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>14%</div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom:"50px"}}>
                                  <div className="col-sm-6 col-md-6 col-lg-6">Total Amount</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>$2000</div>
                                </div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{textAlign:"center"}}>
                                  By Staking  2,000,000  SWAN tokens, you qualify for higher interest rates in the 'Earn Interest' accounts for all cryptocurrencies and stablecoins.
                                </div>
                              </div>
                              
                            </div>
                            <div className="row" style={{marginTop:"20px", textAlign:"center"}}>
                            <div className="col-sm-12 col-md-12 col-lg-12" style={{marginTop:"20px"}}>
                            <label className="form-check-label" htmlFor="stakeToken">
                          <input
                            id="stakeToken"
                            className="boolean required form-check-input"
                            required
                            label="false"
                            data-title="Please confirm"
                            data-placement="left"
                            data-trigger="manual"
                            data-offset="0, 55"
                            aria-required="true"
                            type="checkbox"
                            name="stakeToken"
                          />
                          &nbsp; 
                          I Agree to Terms and Conditions
                        
                        </label>
                              </div>
                              <div className="col-sm-12 col-md-12 col-lg-12" style={{marginTop:"20px"}}>
                                <button className="btn btn-primary" disabled={this.state.stakeStart||this.state.stakeSuccess?true:false} onClick={()=>this.stakeTokens()}>Confirm</button>
                              </div>
                              <div className="col-sm-12 col-md-12 col-lg-12" style={{marginTop:"20px"}}>
                                <button className="btn" onClick={()=>this.setState({showStake:false})}>Cancel</button>
                              </div>
                              
                            </div>
                        
                          </div>
                        </Modal.Body>
                      </Modal>
                    </div>
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
                                      <h2 className="trasnaction" style={{paddingTop:30,fontWeight:'bold'}}>Stake SWAN Tokens</h2>
                                    </div>  
                              </div>
                              
                            </div>
                            <div className="row" style={{textAlign:"center", marginTop:"100px"}}>
                              <div className="colsm-12 col-md-12 col-lg-12">
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                                &nbsp;
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                                <div className="tempBack">Lock Up Period <span className="swanBox">4 Months</span></div>
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                              &nbsp;
                              </div>
                              </div>
                              <div className="colsm-12 col-md-12 col-lg-12" style={{marginTop:"25px"}}>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                              &nbsp;.
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4">
                                <div className="tempBack" >Rate of Interest&nbsp;<span className="swanBox" style={{paddingLeft:63,paddingRight:63 }}>14 %</span></div>
                              </div>
                              <div className="col-sm-4 col-md-4 col-lg-4" >
                              &nbsp;
                              </div>
                              </div>
                            </div>
                            <div style={{padding:'10px'}}>
                              
                              <div className={this.state.approveStart||this.state.approveSuccess?"balance-card disabledDiv":"balance-card"} style={{ marginBottom : '2em', marginTop:'3em', height:"100%",position:'relative'}}>
                              {
                                this.state.approveSuccess ? 
                              <img src={greenTick } height ='150px' width = '150px' style={{zIndex:'4',position:'absolute',top:'30px',left:'40%'}} />
                                : ''
                              }
                                <div className=" transaction-container" style={{textAlign:"center", marginLeft:"40px"}}>
                                        <div className="trasnaction" style={{padding:'20px 0px',fontWeight:'bold'}}>1. Contract Approval</div>
                                </div> 
                                <div className="form-group" style={{margin:"0px 50px",color:'#89ABDE'}}>
                                <span className="swanText">SWAN</span>
                                  <input className="investInputBox" style={{paddingLeft:'98px'}} onChange={this.amtApprove} />  Approved: {this.state.approvedTokens} SWAN
                                  
                                </div> 
                                {
                                  this.state.approveError &&
                                  <div style={{margin:'4px 50px',width:'54%',backgroundColor:'#ffcccc',color:'#D96363',padding:'6px 25px',fontWeight:'bold'}} >
                                  <div>An Error Occurred!</div>
                                      <span>{this.state.approveError}</span>
                                  </div>
                                }
                                
                                {this.state.approveLoader?<div className="signForDone"><LoadingSpinner></LoadingSpinner></div>:null}
                                <div style={{textAlign:"right",padding:'20px',paddingRight:'30px'}}>
                                  {/* <button className="swanCancel">CANCEL</button> */}
                                  <button className="swanApprove" style={{paddingLeft:65,paddingRight:65}} onClick={()=>this.approveTokens()}>APPROVE</button>
                                </div>
                              </div>
                            </div>
                            <div style={{padding:'10px'}}>
                              <div className={this.state.stakeStart||this.state.stakeSuccess?"balance-card disabledDiv":"balance-card"} style={{ marginBottom : '2em', marginTop:'3em', height:"100%"}}>
                                <div className=" transaction-container" style={{textAlign:"center", marginLeft:"40px"}}>
                                        <div className="trasnaction" style={{padding:'20px 0px',fontWeight:'bold'}}>2. Stake SWAN Tokens</div>
                                </div> 
                                <div className="form-group" style={{margin:"0px 50px",color:'#89ABDE'}}>
                                  <span className="swanText">SWAN</span>
                                  <input className="investInputBox" style={{paddingLeft:'98px'}} onChange={this.amtApprove} />  Minimum Required: 2,000,000
                                
                                </div> 
                                {
                                  this.state.stakeSwanError &&
                                  <div style={{margin:'4px 50px',width:'54%',backgroundColor:'#ffcccc',color:'#D96363',padding:'6px 25px',fontWeight:'bold'}} >
                                    <div>An error Occurred!</div>
                                      <span>{this.state.stakeSwanError}</span>
                                  </div>
                                }
                                
                                {this.state.stakeLoader?<div className="signForDone"><LoadingSpinner></LoadingSpinner></div>:null}
                                <div style={{textAlign:"right",padding:'20px',paddingRight:'30px'}}>
                                  
                                  <button className="swanApprove" onClick={this.onStakeToken}>STAKE TOKENS</button>
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

