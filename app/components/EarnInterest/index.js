import React from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import { toast, ToastContainer } from 'react-toastify';
import Web3 from 'web3';
import { Modal } from 'react-bootstrap';
//import {Loader} from '../../../static/assets/img/loaderNu.svg';
import LoadingSpinner from '../LoadingSpinner'
import constants from '../../utils/contractConfig';

export class EarnInterest extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
          interest: 16,
          duration: this.props.monthDuration,
          tokens:0,
          trxnReceipt: '',
          approveLoader: false,
          approveSuccess: false,
          approveStart: false,
          stakeLoader: false,
          stakeSuccess: false,
          stakeStart: false,
          showEarnInterest: false,
          isStaker: this.props.isStaker,
        };
        this.goBack = this.goBack.bind(this);
        this.changeInterest = this.changeInterest.bind(this);
        this.goBack = this.goBack.bind(this);
        this.amtApprove = this.amtApprove.bind(this);
        this.updateStatusFromContract = this.updateStatusFromContract.bind(this);
        this.checkHashStatus = this.checkHashStatus.bind(this);
        this.getStakedOrNot = this.getStakedOrNot.bind(this);
    }
    componentDidMount(){
      //this.getStakedOrNot();
      this.changeInterest(this.state.duration);
      
    }

    goBack() {
      this.props.back();
    }

    changeInterest = (view)=>{
     if(view === 1) {
       if(this.state.isStaker){
        this.setState({
          interest:16,
          duration: 1
        })
       } else {
        this.setState({
          interest:12,
          duration: 1
        })
       }
     } else if(view === 3){
       if(this.state.isStaker){
        this.setState({
          interest:20,
          duration: 3
        })
       } else {
        this.setState({
          interest:16,
          duration: 3
        })
       }
     }
    }

    amtApprove(e) {
      //const currencyQuant = document.getElementById('amt');
      this.setState({
        tokens: e.target.value,
      });
    }

    getStakedOrNot=async()=>{
      var address = constants.stakeContractAddress;
      var abi = constants.stakeContractAbi, result=0;
      console.log("abi: ", abi, address, this.props.ethWallet)
      try{
      const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`))
      let userAddress = web3.utils.toChecksumAddress(this.props.ethWallet.address);
      const contract = new web3.eth.Contract(abi, address);
      //console.log("contract hai: ", contract)
          
      result = await contract.methods.isStaker(userAddress).call();
      
      this.setState({isStaker: result});
      //console.log("hehe",web3.utils.fromWei(result));
      } catch(err){
        toast.error(`Error in getStakedOrNot ${err}`)
          console.log("error in get swan balance")
      }
    }

    approveTokens=()=>{
      console.log("enetered approve tokens")
      var address = constants.tokenContractAddress;
      var abi = constants.tokenContractAbi;
      var spender = constants.stakeContractAddress;

      try{    
      
      const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
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
        "chainId": "0x03",
        "data": contract.methods.approve(spender, tokenAmount).encodeABI(),
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
                  approveLoader:true,
                  approveStart: true
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
          toast.error(`Error in approving tokens: ${err}`)
          console.log(err,"error hai")
      }
    }

    checkHashStatus(hash, callback) {

      const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
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
          toast.success('Transaction confirmed. Start Deposit');
        } else if(this.state.trxnReceipt.status && this.state.stakeStart){
          this.setState({
            stakeLoader:false,
            stakeStart:false,
            stakeSuccess:true
          })
          toast.success('Transaction confirmed. Tokens Deposited');
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
        console.log("enetered (EI)stake tokens")
        var address = constants.stakeContractAddress;
        var abi = constants.stakeContractAbi;
        //var spender = constants.stakeContractAddress;
  
        try{    
        
        const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
        //let recipientAddress = web3.utils.toChecksumAddress(req.body.recipientAddress);
        let tokenAmount = web3.utils.toWei(this.state.tokens);
        const contract = new web3.eth.Contract(abi, address);
        console.log("contract hai: ", tokenAmount)
  
        let pvtKey = this.props.ethWallet.private_key;
        let rawTransaction = {
        "from": this.props.ethWallet.address,
          "to": address,
          "value": '0x0',
          'gasPrice': web3.utils.toHex(20 * 1e9),
          'gasLimit': web3.utils.toHex(210000),
          "chainId": "0x03",
          "data": contract.methods.earnInterest(tokenAmount, this.state.duration).encodeABI(),
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
                    stakeStart: true
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
            toast.error(`Error in (EI)staking tokens: ${err}`)
            console.log(err,"error hai")
        }
      }
  

    render(){

        return(
            <div>
                    <div className="static-modal">
                      <Modal show={this.state.showEarnInterest} bsSize="medium" onHide={this.hide} dialogClassName="">
                        <Modal.Body>
                          <div>
                            <div className="row">
                              <div className="col-sm-12 text-right">
                                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ showEarnInterest:false })}}></i>
                              </div>
                            </div>
                            <div className="row" style={{textAlign:"center"}}>
                              <h3 style={{fontStyle:"Lato"}}>TRANSACTION DETAILS</h3>
                            </div>
                            <div className="row">
                              <div className="col-sm-12 col-md-12 col-lg-12" style={{paddingLeft:"20px"}}>
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <div className="col-sm-6 col-md-6 col-lg-6">Digital Asset</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>SWAN</div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <div className="col-sm-6 col-md-6 col-lg-6">Quantity</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>{this.state.tokens}</div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <div className="col-sm-6 col-md-6 col-lg-6">Lockup Period</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>{this.state.duration} Months</div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12">
                                  <div className="col-sm-6 col-md-6 col-lg-6">APY</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>{this.state.interest}%</div>
                                </div>

                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{marginBottom:"50px"}}>
                                  <div className="col-sm-6 col-md-6 col-lg-6">Total Value</div>
                                  <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"right", fontWeight:"bold"}}>${this.state.tokens}</div>
                                </div>
                                
                                <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",paddingLeft:"20px",opacity:"10%"}}></div>
                                
                                
                              </div>
                              
                            </div>
                            <div className="row" style={{marginTop:"20px", textAlign:"center"}}>
                              <div className="col-sm-12 col-md-12 col-lg-12" style={{marginTop:"20px"}}>
                                <button className="btn btn-primary" onClick={()=>this.stakeTokens()}>Confirm</button>
                              </div>
                              <div className="col-sm-12 col-md-12 col-lg-12" style={{marginTop:"20px"}}>
                                <button className="btn" onClick={()=>this.setState({showEarnInterest:false})}>Cancel</button>
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
                                      <h2 className="trasnaction">Earn Interest</h2>
                                    </div>  
                              </div>
                              
                            </div>
                            <div style={{marginLeft:"-100px", marginTop:"50px"}}>
                            <div className="row" style={{textAlign:"center"}}>
                              <div>
                                <span className="swanBox">Choose Digital Asset</span>
                                <select id="CDAMode" name="CDAMode" className="form-style" required>
                                  <option value="SWAN">SWAN (SWAN)</option>
                                  <option value="BTC">BTC</option>
                                  <option value="USDT">USDT</option>
                                  <option value="XLM">XLM</option>
                                </select>
                              </div>
                            </div>
                            <div className="row" style={{textAlign:"center", marginTop:"55px"}}>
                              <div style={{color:"#465490", fontSize:"20px", fontWeight:"bold"}}>Choose Earn Interest Period</div>
                            <div className="col-md-12">
                              <div style={{display:'flex',flexDirection:'row', justifyContent:'center', }}>
                                { this.state.duration === 1 ? (
                                  <div onClick={ ()=>this.changeInterest(1)} style={{margin:"5px",cursor:'pointer', backgroundColor: '#2498D5', color: 'white', borderRadius: '5px'}} className="personal"><h2  style={{margin:"5px", fontSize: '16px',color : '#fff'}}>1 Month</h2></div>
                                ) : (
                                  <div onClick={ ()=>this.changeInterest(1)} style={{margin:"5px",cursor:'pointer'}}><h2  style={{margin:"5px", fontSize: '16px' , color : '#2498D5'}}>1 Month</h2></div>
                                )}
                                { this.state.duration === 3 ? (
                                  <div  onClick={()=>this.changeInterest(3)} style={{margin:"5px",cursor:'pointer', backgroundColor: '#2498D5', color: 'white', borderRadius: '5px'}}><h2  style={{margin:"5px", fontSize: '16px',color : '#fff'}}>3 Months</h2></div>
                                ) : (
                                  <div  onClick={()=>this.changeInterest(3)} style={{margin:"5px",cursor:'pointer'}}><h2  style={{margin:"5px", fontSize: '16px',color : '#2498D5'}}>3 Months</h2></div>
                                )}
                              </div>
                            </div>
                            </div>
                            </div>
                            {this.state.isStaker?
                            <div className="row" style={{marginTop:"40px"}}>
                            <div className="col-sm-12 col-md-12 col-lg-12" style={{textAlign:"center"}}>

                              <div className="" style={{position:"relative",justifyContent:"center",border:"1px solid #F2F7FF", borderRadius:"2px", boxShadow:"1px 1px 1px 2px #00000029", width:"auto"}}>
                                Interest Rate<br />{this.state.interest} % APY
                              </div>
                            </div>
                          </div>
                            :<div className="row" style={{marginTop:"40px"}}>
                              <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"center"}}>

                                <div className="" style={{border:"1px solid #F2F7FF", borderRadius:"2px", boxShadow:"1px 1px 1px 2px #00000029"}}>
                                  Interest Rate<br />{this.state.interest} % APY
                                </div>
                              </div>
                              <div className="col-sm-6 col-md-6 col-lg-6" style={{textAlign:"center"}}>
                                You have not staked SWAN tokens yet. Stake $2000 of SWAN tokens to earn higher interest rates.
                                <br />
                                <button className="btn btn-primary" onClick={this.goBack}>STAKE NOW</button>
                              </div>
                            </div>}
                            <div style={{padding:'10px'}}>
                              <div className={this.state.approveStart||this.state.approveSuccess?"balance-card disabledDiv":"balance-card"} style={{ marginBottom : '2em', marginTop:'3em', height:"100%"}}>
                                <div className=" transaction-container" style={{textAlign:"center", marginLeft:"40px"}}>
                                        <div className="trasnaction">1. Contract Approval</div>
                                </div> 
                                <div className="form-group" style={{margin:"0px 50px"}}>
                                  <input className="investInputBox" onChange={this.amtApprove} />Approved: 0 SWAN
                                </div> 
                                {this.state.approveLoader?<div className="signForDone"><LoadingSpinner></LoadingSpinner></div>:null}
                                <div style={{textAlign:"right"}}>
                                  <button className="btn btn-primary">CANCEL</button>
                                  <button className="btn-primary btn" onClick={()=>this.approveTokens()}>APPROVE</button>
                                </div>
                              </div>
                            </div>
                            <div style={{padding:'10px'}}>
                              <div className={this.state.stakeStart||this.state.stakeSuccess?"balance-card disabledDiv":"balance-card"} style={{ marginBottom : '2em', marginTop:'3em', height:"100%"}}>
                                <div className=" transaction-container" style={{textAlign:"center", marginLeft:"40px"}}>
                                        <div className="trasnaction">2. Stake SWAN Tokens</div>
                                </div> 
                                <div className="form-group" style={{margin:"0px 50px"}}>
                                  <input className="investInputBox" onChange={this.amtApprove} /> Minimum Required: 50
                                </div> 
                                {this.state.stakeLoader?<div className="signForDone"><LoadingSpinner></LoadingSpinner></div>:null}
                                <div style={{textAlign:"right"}}>
                                  <button className="btn btn-primary">CANCEL</button>
                                  <button className="btn-primary btn" onClick={()=>this.setState({showEarnInterest:true})}>EARN INTEREST</button>
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

