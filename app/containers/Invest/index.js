/**
 *
 * InvestPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';;
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { toast, ToastContainer } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectInvestPage, {
makeSelectWalletNotAdded, makeSelectWalletAddedSuccess, makeSelectWalletFetchedSuccess, makeSelectContributionData,makeSelectContributionSuccess,makeSelectContributionNotSuccess, makeSelectGetHotWalletRet, makeSelectGetHotWalletLoading, makeSelectCreateHotWalletRet, makeSelectCreateHotWalletLoading
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { selectAction, getData, confirmPayment, reload,finalizePayment,listHotWallet, addCenxWallet,
  createHotWallet ,clearContribution, getCenxWallet } from './actions';
import { Stake } from '../../components/Stake';
import { EarnInterest } from '../../components/EarnInterest';
import { makeGlobalParent } from '../App/selectors';
import makeSelectDashBoardWelcomePage from '../DashBoardWelcomePage/selectors';
import { Helmet } from 'react-helmet';
import {LoadingSpinner} from 'components/LoadingSpinner/Loadable';
import Web3 from 'web3';
import { Modal,Dropdown, Button, MenuItem} from 'react-bootstrap';

import Info from "../../components/Info";
import { Link } from 'react-router-dom';
import { isInteger, concat } from 'lodash';
import littleStar from "../../images/littleStar.svg";
import bigStar from "../../images/bigStar.svg";
import Ellipse from '../../images/Ellipse.svg';
import Planet from "../../images/Planet.svg";
import Satelite from "../../images/Satelite.svg";
import { TransactionHistory } from "../TransactionHistory";
import {ethLogo} from '../../images/logoETH.png';
import logo from '../../images/swan-logo-big.svg';
// import {Footer} from '../../components/footer/footer.js'
import queryString from "query-string";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import constants from '../../utils/contractConfig'
let loadSimplex = false;
export class InvestPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // Begin constructor
  constructor(props) {
    super(props);
    this.state = {
      //@aj
      infoShow: false,
      language: '',
      confirmContri: false,
      usdEurContributionConfirm: false,
      curr: '',
      apySort :'High to Low',
      lookUpSort:'High to Low',
      btcToDollar: 7500,
      ethToDollar: 600,
      eurToDollar: 0,
      currencyQuantity: 0,
      dollarQuantity: 0,
      tokens: 0,
      tokensWithBonus: 0,
      tokensPerEther: 0,
      tokensPerBitcoin: 0,
      tokensPerUsd: 0,
      tokensPerEur: 0,
      ethAddress: false,
      btcAddress: '',
      fromAddress: '',
      fromAddressEth:'',
      tokenReceiveAddress: false,
      timer: 1800,
      minutes: 30,
      seconds: 0,
      tokenPrice: 0,
      // interval: '',
      amtInvested: '',
      dollarsInvested: '',
      valid: '',
      validWallet: '',
      validBlank: '',
      validWalletBlank: '',
      bonus: 0,
      stage: '',
      minInvest: 100,
      contribution: false,
      body:{},
      isBonusOrDiscount:'',
      discount:'',
      loading: true,
      hotWalletList : [],
      hotWalletListCount: 0,
      iswalletCreating:false,
      metamaskAccount: '',
      metamaskConnected :false,
      open: false,
      transactionData: '',
      paymentMode: '',
      showEthWalletCreate: false,
      cenxWalletAddress: '',
      cenxWalletPvtKey: '',
      buyEth: false,
      balance:0,
      temp:false,
      url:logo,
      showDeposit: false,
      ethWallet:'',
      btcWallet:'',
      usdtWallet:'',
      xlmWallet:'',
      currAddress: '',
      stake: false,
      earnInterest: false,
      depositCount:0,
      swanBalance:0,
      interestAccountDetails:[],
      showDetails: false,
      currInterestAccountDetails:'',
      claimLoader: false,
      trxnReceipt: '',
      isStaker: false,
      monthDuration:16,
    };

    // this.onContributionConfirm = this.onContributionConfirm.bind(this);
    this.currencyChange = this.currencyChange.bind(this);
    // this.paymentModeChange = this.paymentModeChange.bind(this);
    // this.currencyQuantityChange = this.currencyQuantityChange.bind(this);
    this.comeBack = this.comeBack.bind(this);
    this.confirm = this.confirm.bind(this);
    // // this.updatetime = this.updatetime.bind(this);
    // this.amtInvested = this.amtInvested.bind(this);
    // this.validator = this.validator.bind(this);
    // this.validatorWallet = this.validatorWallet.bind(this);
    this.createCenxWallet = this.createCenxWallet.bind(this);
    this.openSimplex = this.openSimplex.bind(this);
    this.openDeposit = this.openDeposit.bind(this);
    this.showQR = this.showQR.bind(this);
    // //this.openShowEthWalletCreate = this.openShowEthWalletCreate.bind(this);
    // this.checkWallet = this.checkWallet.bind(this);
    this.getSwanBalance = this.getSwanBalance.bind(this);
    this.getDepositCount = this.getDepositCount.bind(this);
    this.getInterestAccountDetails = this.getInterestAccountDetails.bind(this);
    this.updateStatusFromContract = this.updateStatusFromContract.bind(this);
    this.checkHashStatus = this.checkHashStatus.bind(this);
    this.claimTokens = this.claimTokens.bind(this);
    this.getStakedOrNot = this.getStakedOrNot.bind(this);


    console.log("yetopropshai",this.props)

  }
  
  // @aj
  // handleInfoModal = () => {
  //   this.setState({
  //     infoShow: !this.state.infoShow
  //   });
  //   console.log('infoShow : ', this.state.infoShow);
  // }

  // End Constructor

  // Begin Lifecycle methods

  componentDidMount() {
    this.props.getData();
    this.props.listHotWallet();
    // if(this.state.paymentMode=='viaMetamaskExt')
    // {this.interval = setInterval(() => this.getMetamaskAddress(), 1000);}
    
    // if(this.props.userInfo!=undefined)
    // {this.setState({
    //   cenxWalletAddress: this.props.userInfo.ethAddress?this.props.userInfo.ethAddress:'',
    // },()=>{
    //   if(this.state.cenxWalletAddress){
    //     const href =
    //       "https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2";
    //     const query = queryString.parse(href);
    //     query.chl = this.state.cenxWalletAddress;
    //     const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(
    //       query
    //     )}`;
    //     this.setState({url:uri});
    //     const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/6dab407582414625bc25b19122311c8b`)); //--prodChange
    //     web3.eth.getBalance(web3.utils.toChecksumAddress(this.state.cenxWalletAddress), function(err,res){
    //       if(err){console.log("aggaya : ", err)}
    //       else{
    //         console.log("agaya balance", res)

    //         this.setState({balance:web3.utils.fromWei(res)});
    //       }
    //     }.bind(this));
    //   }
    // })}

    


  }
  checkHashStatus(hash, callback) {

    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
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
      // if(this.state.trxnReceipt.status && this.state.claimLoader){
      //   toast.success('Claim successfull')
      //   this.setState({
      //     claimLoader:false
      //   })
      // } else {
      //   toast.error('Transaction not confirmed. Error encountered.')
      //   this.setState({
      //     claimLoader:false
      //   })
      // }
      if(this.state.trxnReceipt.status && this.state.claimLoader){
        this.setState({
          claimLoader:false,
        });
        toast.success('Claim Successfull');
      } else if(this.state.trxnReceipt.status && this.state.withdrawLoader){
        this.setState({
          withdrawLoader:false
        })
        toast.success('Withdraw Successfull');
      } else {
        toast.error('Transaction not confirmed');
        this.setState({
          claimLoader:false,
          withdrawStart:false,
        });
      }
      
      console.log("got callback");
    }
  claimTokens=()=>{
    console.log("enetered claim tokens")
    var address = constants.stakeContractAddress;
    var abi = constants.stakeContractAbi;
    var id = this.state.currInterestAccountDetails.proposalId;
    //var spender = constants.stakeContractAddress;

    try{    
    
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
    //let recipientAddress = web3.utils.toChecksumAddress(req.body.recipientAddress);
    //let tokenAmount = this.state.tokens;
    const contract = new web3.eth.Contract(abi, address);
    console.log("contract hai: ")

    let pvtKey = this.state.ethWallet.private_key;
    let rawTransaction = {
    "from": this.state.ethWallet.address,
      "to": address,
      "value": '0x0',
      'gasPrice': web3.utils.toHex(20 * 1e9),
      'gasLimit': web3.utils.toHex(210000),
      "chainId": "0x03",
      "data": contract.methods.payOuts(id).encodeABI(),
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
                claimLoader:true
              })
              setTimeout( () => this.setState({
                claimLoader:false
              }) , 3000)
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
        toast.error(`Error in claiming tokens: ${err}`)
        console.log(err,"error hai")
    }
  }
  withdrawTokens=()=>{
    console.log("enetered withdraw tokens")
    var address = constants.stakeContractAddress;
    var abi = constants.stakeContractAbi;
    var id = this.state.currInterestAccountDetails.proposalId;
    
    //var spender = constants.stakeContractAddress;

    try{    
    
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
    //let recipientAddress = web3.utils.toChecksumAddress(req.body.recipientAddress);
    //let tokenAmount = this.state.tokens;
    const contract = new web3.eth.Contract(abi, address);
    console.log("contract hai: ", id)

    let pvtKey = this.state.ethWallet.private_key;
    let rawTransaction = {
    "from": this.state.ethWallet.address,
      "to": address,
      "value": '0x0',
      'gasPrice': web3.utils.toHex(20 * 1e9),
      'gasLimit': web3.utils.toHex(210000),
      "chainId": "0x03",
      "data": contract.methods.claimInterestTokens(id).encodeABI(),
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
                withdrawLoader:true
              })
              var id = setTimeout( () => this.setState({
                withdrawLoader:false
              }) , 3000)
             
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
        toast.error(`Error in claiming tokens: ${err}`)
        console.log(err,"error hai")
    }
  }

  claimStakedTokens=()=>{
    console.log("enetered claimStaked tokens")
    var address = constants.stakeContractAddress;
    var abi = constants.stakeContractAbi;
    //var id = this.state.currInterestAccountDetails.proposalId;
    
    //var spender = constants.stakeContractAddress;

    try{    
    
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
    //let recipientAddress = web3.utils.toChecksumAddress(req.body.recipientAddress);
    //let tokenAmount = this.state.tokens;
    const contract = new web3.eth.Contract(abi, address);
    console.log("contract hai: ")

    let pvtKey = this.state.ethWallet.private_key;
    let rawTransaction = {
    "from": this.state.ethWallet.address,
      "to": address,
      "value": '0x0',
      'gasPrice': web3.utils.toHex(20 * 1e9),
      'gasLimit': web3.utils.toHex(210000),
      "chainId": "0x03",
      "data": contract.methods.claimStakeTokens().encodeABI(),
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
                withdrawLoader:true
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
        toast.error(`Error in claiming tokens: ${err}`)
        console.log(err,"error hai")
    }
  }


  getInterestAccountDetails=async()=>{
    var address = constants.stakeContractAddress;
    var abi = constants.stakeContractAbi, result,finResult=[],i=1;
    console.log("abi: ", abi, address, this.state.ethWallet)
    try{
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`))
    let userAddress = web3.utils.toChecksumAddress(this.state.ethWallet.address);
    const contract = new web3.eth.Contract(abi, address);
    //console.log("contract hai: ", contract)
    while (i <= this.state.depositCount) {
      result = await contract.methods.interestAccountDetails(userAddress,i).call();
      //result.id=i;
      console.log("ay result", result)
      result.amount = web3.utils.fromWei(result.amount)
      console.log("fir ay result", result.amount)
      i++;
      finResult.push(result);
    }
    
    
    this.setState({interestAccountDetails: finResult});
    console.log("finResult", finResult);
    } catch(err){
      toast.error(`Error in getInterestAccountDEtaisl ${err}`)
        console.log("error in get swan balance")
    }
  }

  getDepositCount=async()=>{
    var address = constants.stakeContractAddress;
    var abi = constants.stakeContractAbi, result=0;
    console.log("abi: ", abi, address, this.state.ethWallet)
    try{
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`))
    let userAddress = web3.utils.toChecksumAddress(this.state.ethWallet.address);
    const contract = new web3.eth.Contract(abi, address);
    //console.log("contract hai: ", contract)
        
    result = await contract.methods.interestAccountNumber(userAddress).call();
    
    this.setState({depositCount: result},()=>{
      this.getInterestAccountDetails();
    });
    console.log("hehe", result);
    } catch(err){
      toast.error(`Error in getDEpositCount ${err}`)
        console.log("error in get swan balance")
    }
  }

  getSwanBalance=async()=>{
    var address = constants.tokenContractAddress;
    var abi = constants.tokenContractAbi, result=0;
    console.log("abi: ", abi, address, this.state.ethWallet)
    try{
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`))
    let userAddress = web3.utils.toChecksumAddress(this.state.ethWallet.address);
    const contract = new web3.eth.Contract(abi, address);
    //console.log("contract hai: ", contract)
        
    result = await contract.methods.balanceOf(userAddress).call();
    
    this.setState({swanBalance: web3.utils.fromWei(result)});
    console.log("hehe",web3.utils.fromWei(result));
    } catch(err){
      toast.error(`Error in getSwanBalance ${err}`)
        console.log("error in get swan balance")
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.successData,"success data in contributeepegE");
    const data = nextProps.successData;
    this.setState({
      eurToDollar: data.eurUsd,
      ethToDollar: data.ethUsd,
      btcToDollar: data.btcUsd,
      tokensPerEther: data.tokenPerEther,
      tokensPerBitcoin: data.tokenPerBtc,
      tokensPerUsd:  1 / data.tokenUsd,
      tokensPerEur: 1 / data.tokenUsd * data.eurUsd,
      ethAddress: data.ethAddress,
      btcAddress: data.btcAddress,
      time: nextProps.deadline,
      bonus: data.bonus,
      stage: data.stage,
      minInvest: data.minInvest,
      tokenPrice: data.tokenUsd,
      isBonusOrDiscount:data.isBonusOrDiscount,
      discount:data.discount,
      loading: false,
    });
    if (nextProps.successPayment) {
      console.log(nextProps.successPayment);

      // this.notifyDeposit(nextProps.successPayment);
    }
    if (nextProps.successNotPayment) {
      toast.error(nextProps.successNotPayment.message);
      nextProps.clearContribution()
    }
    if (nextProps.walletAddedSuccess) {
      toast.info(nextProps.walletAddedSuccess.message);
      console.log(nextProps.walletAddedSuccess, "allolooloo")
      const data = nextProps.walletAddedSuccess;
      this.setState({
        cenxWalletAddress: data.publicKey,
        cenxWalletPvtKey: data.privateKey
      })
      nextProps.clearContribution()
    }
    if (nextProps.walletNotAddedSuccess) {
      toast.info(nextProps.walletNotAddedSuccess.message);
      nextProps.clearContribution()
    }
    if(nextProps.walletFetchedSuccess){
      if(localStorage.getItem('language')=='chinese'){
        toast.info('导出私钥');
      }else{
        toast.info('Exporting your private key');
      }
      
      const data = nextProps.walletFetchedSuccess;
      console.log("aboabo: ", nextProps)
      this.setState({
        cenxWalletAddress: data.publicKey,
        cenxWalletPvtKey: data.privateKey
      },()=>{
        const element = document.createElement("a");
        const file = new Blob(["Address: ",this.state.cenxWalletAddress, '\nPrivate Key: ', this.state.cenxWalletPvtKey],    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "CenXAccountDetails.txt";
        document.body.appendChild(element);
        element.click();
      })
      nextProps.clearContribution()
    }
    if(nextProps.listHotWalletRet.count>0){
      console.log("getHotWqalletREt", nextProps.listHotWalletRet);
      if(nextProps.listHotWalletRet.success){
        this.setState({
          hotWalletList : nextProps.listHotWalletRet.data,
          hotWalletListCount : nextProps.listHotWalletRet.count,
          currentReceivingWalletAddress : nextProps.listHotWalletRet.data[0].address
        },()=>{
          if(this.state.hotWalletListCount>0){
            let hasBtcWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "BTC")
            let hasEthWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "ETH")
            let hasXlmWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "XLM")
            let hasUsdtWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "USDT")
            console.log("mil gya bitcoin hot wallet", hasBtcWalletCreated)
            if(hasBtcWalletCreated){
              this.setState({
                btcWallet: hasBtcWalletCreated
              })
            }
            if(hasEthWalletCreated){
              this.setState({
                ethWallet: hasEthWalletCreated
              },()=>{
                this.getSwanBalance();
                this.getDepositCount();
                this.getStakedOrNot();
                
              })
            }
            if(hasUsdtWalletCreated){
              this.setState({
                usdtWallet: hasUsdtWalletCreated
              })
            }
            if(hasXlmWalletCreated){
              this.setState({
                xlmWallet: hasXlmWalletCreated
              })
            }
          }
        })
      }
      else{
        toast.error(nextProps.listHotWalletRet.message) 
      }
      nextProps.clearContribution()
    }

    if(nextProps.createHotWalletRet){
      console.log("in createWWWallet dibba", nextProps.createHotWalletRet);
      if(nextProps.createHotWalletRet.success){
        if(this.state.curr=='BTC'){
          this.setState({
            btcWallet:nextProps.createHotWalletRet.walletAddress,
            currAddress: nextProps.createHotWalletRet.walletAddress.address
          })
          this.showQR(nextProps.createHotWalletRet.walletAddress.address)
        } else if(this.state.curr=='ETH'){
          this.setState({
            ethWallet:nextProps.createHotWalletRet.walletAddress,
            currAddress: nextProps.createHotWalletRet.walletAddress.address
          })
          this.showQR(nextProps.createHotWalletRet.walletAddress.address)
        } else if(this.state.curr=='XLM'){
          this.setState({
            xlmWallet:nextProps.createHotWalletRet.walletAddress,
            currAddress: nextProps.createHotWalletRet.walletAddress.address
          })
          this.showQR(nextProps.createHotWalletRet.walletAddress.address);
        } else if(this.state.curr=='USDT'){
          this.setState({
            usdtWallet:nextProps.createHotWalletRet.walletAddress,
            currAddress: nextProps.createHotWalletRet.walletAddress.address
          })
          this.showQR(nextProps.createHotWalletRet.walletAddress.address)
        }
        // this.setState({
        //   currentReceivingWalletAddress : nextProps.createHotWalletRet.address,
        //   iswalletCreating : false
        // })
        toast.info(nextProps.createHotWalletRet.message) 
      }
      else{
        toast.error(nextProps.createHotWalletRet.message) 
      }
      nextProps.clearContribution()
    }


   //  if(nextProps.userInfo.kycDone)
   // {
   //   this.setState({
   //     ethAddress:nextProps.successData.ethAddress
   //   })
   // }
 }
 componentWillUnmount(){
   //clearInterval(this.interval);
 }

  // End of Life Cycle methods

  // Begin of container functions

// gobackDollar=(e)=>{
//   this.setState({
//       usdEurContributionConfirm : false
//   })
// }


  // onContributionConfirm(e) {

  //   e.preventDefault();
  //   /*  form = document.getElementById('contriForm'); */
  //   if( this.state.curr == 'Bitcoin' || this.state.curr == 'Ethereum') {
  //     const fromAddress = document.getElementById('fromAddress').value;
  //     console.log(typeof(this.state.dollarsInvested));
  //     if (parseInt(this.state.dollarsInvested) < this.state.minInvest) {
  //       this.notifyMinimum();
  //     }else if(this.state.curr == 'Bitcoin'&&this.state.valid) {
  //      if(this.state.curr !='Ethereum'){
  //          if (!this.state.valid) {
  //          const curr = this.state.curr;
  //          toast.error(`Please enter a valid ${curr} address`);
  //        }
  //      }
  //       const tokenReceive = document.getElementById('tokenReceive').value;

  //         if(!this.state.validWallet){
  //           toast.error('Please enter a valid ERC20 address');
  //         }
  //         else{
  //           this.setState({
  //             confirmContri: true,
  //             fromAddress,
  //             // tokenReceiveAddress: fromAddress,
  //           })
  //           const body = {
  //             tokens: this.state.tokensWithBonus,
  //             type: this.state.curr,
  //             amount: this.state.currencyQuantity,
  //             fromAddress,
  //             toAddress: this.state.btcAddress,
  //             tokenReceivingAddress: tokenReceive,
  //             usdAmount: this.state.dollarsInvested,
  //             rate:this.state.btcToDollar,
  //             phase:this.state.stage,
  //             tokenPrice : this.state.tokenPrice,
  //             bonus:this.state.bonus,
  //             discount:this.state.discount,
  //             isBonusOrDiscount:this.state.isBonusOrDiscount
  //           };
  //           console.log(body,"body bitcoin  in contribution page")
  //           this.setState({
  //             body
  //           })

  //          }
  //     } else if(this.state.curr == 'Ethereum'){
  //         this.setState({
  //           confirmContri: true,
  //           fromAddress,
  //           tokenReceiveAddress: fromAddress,
  //         });
  //         const body = {
  //           tokens: this.state.tokensWithBonus,
  //           type: this.state.curr,
  //           amount: this.state.currencyQuantity,
  //           fromAddress:this.state.fromAddressEth,
  //           toAddress: this.state.ethAddress,
  //           tokenReceivingAddress:this.state.fromAddressEth,
  //           usdAmount: this.state.dollarsInvested,
  //           rate:this.state.ethToDollar,
  //           phase:this.state.stage,
  //           tokenPrice : this.state.tokenPrice,
  //           bonus:this.state.bonus,
  //           discount:this.state.discount,
  //           isBonusOrDiscount:this.state.isBonusOrDiscount
  //         };
  //         console.log(body," body ethereum  in contribution page")
  //         this.setState({
  //           body
  //         })
  //     }

  //   }else {
  //     console.log('dollar :' , this.state.dollarsInvested);
  //       if (parseInt(this.state.dollarsInvested) < this.state.minInvest) {
  //         this.notifyMinimum();
  //       } else if (this.state.curr == 'Dollar' || this.state.curr == 'Euro') {
  //         console.log(" in usd  contributionnnnnnnnnnn ")
  //         this.setState({
  //           usdEurContributionConfirm : true
  //         })
  //         const body = {
  //           tokens: this.state.tokensWithBonus,
  //           type: "USD",
  //           amount: this.state.currencyQuantity,
  //           // fromAddress:this.state.fromAddressEth,
  //           // toAddress: this.state.ethAddress,
  //           tokenReceivingAddress:this.state.fromAddressEth,
  //           usdAmount: this.state.dollarsInvested,
  //           rate:this.state.ethToDollar,
  //           phase:this.state.stage,
  //           tokenPrice : this.state.tokenPrice,
  //           bonus:this.state.bonus
  //         };
  //         console.log(body," body usd in contribution page")
  //         this.setState({
  //           body
  //         })
  //       }
  //     }
  // }


  // notifyMinimum() {
  //   toast.error(`Minimum contribution is $ ${this.state.minInvest}`);
  // }


  confirm(type, duration, APY, fromAdd, investment, data) {
    let body = {
      type: type,
      duration: duration,
      ethAddress:fromAdd,
      apy: APY,
      tokenAmount: investment,
      txHash : data
    };
    console.log("dddddddddddddddddddddddd",data,"hash");
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb",body,"body")
    this.props.confirmPayment(body);
  }

  comeBack() {
    this.setState({
      stake: false,
      earnInterest: false
    })

  }

  // validatorWallet() {
  //   const add = document.getElementById('tokenReceive').value;
  //   this.setState({
  //     tokenReceiveAddress: add
  //   })
  //   if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
  //     this.setState({
  //       validWallet: true,
  //       validWalletBlank: 'false'
  //     });
  //   }else if(add == ''){
  //     this.setState({
  //       validWalletBlank: 'true'
  //     })
  //   }else {
  //     this.setState({
  //       validWallet: false,
  //       validWalletBlank: 'false'
  //     });
  //   }
  // }

  // validator() {
  //   const add = document.getElementById('fromAddress').value;
  //   this.setState({
  //     fromAddress: add
  //   })

  //   if(this.state.curr == 'Ethereum'){
  //     if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
  //     //  console.log('done eth');
  //       this.setState({
  //         valid: true,
  //         validBlank: 'false'
  //       });
  //     }else if(add == ''){
  //      // console.log('Empty');
  //       this.setState({
  //         validBlank: 'true'
  //       })
  //     }else {
  //      // console.log('not done');
  //       this.setState({
  //         valid: false,
  //         validBlank: 'false'
  //       });
  //     }
  //   }
  //   else if(this.state.curr == 'Bitcoin'){
  //     if ( add.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/)) {
  //      // console.log('done btc');
  //       this.setState({
  //         valid: true,
  //         validBlank: 'false',
  //       });
  //     }else if(add == ''){
  //      // console.log('Empty');
  //       this.setState({
  //         validBlank: 'true'
  //       })
  //     }else {
  //     //  console.log('not done');
  //       this.setState({
  //         valid: false,
  //         validBlank: 'false'
  //       });
  //     }

  //   }

  // }
  // currencyQuantityChange(e) {

  //   let currencyQuantity;
  //   // console.log(e.target.value);
  //   if (e.target.value === '') {
  //     // console.log('got ot');
  //   }
  //   if (e.target.value === '') {
  //     currencyQuantity = 0;
  //   } else {
  //     currencyQuantity = e.target.value;
  //   }
  //   if (this.state.curr === 'Bitcoin') {
  //     this.setState({
  //       currencyQuantity,
  //       dollarsInvested: currencyQuantity * this.state.btcToDollar,
  //       tokens: this.state.tokensPerBitcoin * currencyQuantity,
  //       tokensWithBonus: this.state.tokensPerBitcoin * currencyQuantity + this.state.tokensPerBitcoin * currencyQuantity * 0.01 * this.state.bonus,
  //     });
  //   } else if (this.state.curr === 'Ethereum') {
  //     this.setState({
  //       currencyQuantity,
  //       dollarsInvested: currencyQuantity * this.state.ethToDollar,
  //       tokens: currencyQuantity * this.state.tokensPerEther,
  //       tokensWithBonus: currencyQuantity * this.state.tokensPerEther + currencyQuantity * this.state.tokensPerEther * 0.01 * this.state.bonus,
  //       dollars: e.target.value,
  //     });
  //   } else if (this.state.curr === 'Dollar') {
  //     this.setState({
  //       currencyQuantity,
  //       dollarsInvested: currencyQuantity,
  //       tokens: currencyQuantity * this.state.tokensPerUsd,
  //       tokensWithBonus: currencyQuantity * this.state.tokensPerUsd + currencyQuantity * this.state.tokensPerUsd * 0.01 * this.state.bonus,
  //       dollars: e.target.value,
  //     });
  //   } else if (this.state.curr === 'Euro') {
  //     this.setState({
  //       currencyQuantity,
  //       dollarsInvested: currencyQuantity * 1.16,
  //       tokens: currencyQuantity * this.state.tokensPerEur,
  //       tokensWithBonus: currencyQuantity * this.state.tokensPerEur + currencyQuantity * this.state.tokensPerEur * 0.01 * this.state.bonus,
  //     });
  //   }
  //   document.getElementById('tokens').value = this.state.tokens;
  // }

  // metamaskCall=async () => {
  //   if (window.ethereum !== undefined) {
  //     const web3 = new Web3(window.web3.currentProvider);
  //      await window.ethereum.enable();
  //     try {
  //       let netId = await web3.eth.net.getId();
  //       console.log("network",netId)
  //       let contractNetId = 1;

  //       if(contractNetId !== netId) {
  //         toast.error(`Please switch metamask network to mainet`);
  //         // this.setState({
  //         //   errorContract: true,
  //         //   errorMessage: `Please switch metamask network to ${this.props.contractData.contractNetwork}`
  //         // })
  //       } else {
  //       //   let metamaskAccounts = '';
  //       //   window.ethereum.on('accountsChanged', function () {
  //       //     web3.eth.getAccounts(function(error, accounts) {
  //       //       if(error){
  //       //         console.log("inside ethereum function", error);
  //       //       }else{
  //       //         console.log("ye kya hai",accounts[0]);
  //       //         metamaskAccounts = accounts;}
                
  //       //     });
  //       // });
  //         const accounts = await web3.eth.getAccounts();
  //         console.log('accounts :::::::: ', accounts[0]);
  //         //console.log('accounts :::::::: ', metamaskAccounts);

  //         if(accounts.length === 0) {
  //           toast.error('Please unlock metamask or Add the site URL in Connections');
  //           // this.setState({
  //           //   errorContract: true,
  //           //   errorMessage: 'Please unlock metamask. Add the site URL in Settings>Connections'
  //           // })
          
  //         } else {
  //           this.setState({
  //             metamaskAccount : accounts[0],
  //             metamaskConnected : true
  //           })
  //         }
  //       }
        
  //     }catch(err) {
  //      console.log("Metamask Integration error", err);
  //      toast.error(`Metamask Integration error: ${err}`);
  //     }
  //   } else {
  //     toast.error('Please install metamask or disable privacy feature');
  //     // this.setState({
  //     //   errorContract: true,
  //     //   errorMessage: 'Please install metamask or disable privacy feature'
  //     // })
  //   }
  // }
  // paymentModeChange(e){
  //   e.preventDefault();
  //   let currencyQuantity = document.getElementById('amt');
  //   let add = this.state.fromAddress;
  //   console.log(currencyQuantity.value);
  //   if (currencyQuantity.value === 0) {
  //     currencyQuantity = 0;
  //   }
  //   // let add = document.getElementById('fromAddress').value;
  //   //this.metamaskCall();
  //   // this.setState({
  //   //   fromAddress: this.props.userInfo.userInfo.ethAddress,
  //   //   tokenReceiveAddress: false,
  //   //   validBlank: true
  //   // })
  //   if(e.target.value === 'viaCenxWallet'){
  //     this.setState({showEthWalletCreate:true})
  //   }
    
  //   if(e.target.value === 'viaMetamaskExt'){
  //     this.metamaskCall();
  //   }
  //   // if(e.target.value === 'viaCenxWallet'){
  //   //   this.setState({
  //   //     showEthWalletCreate: true,
  //   //   });
  //   // }
  //   if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
  //     console.log(" inside  ethererererer------------------------ add match")
  //    // console.log('done eth');
  //    if(this.state.isBonusOrDiscount==='staticDiscount'){
  //      console.log(" inside  etherium type",this.state)
  //      this.setState({
  //        paymentMode : e.target.value,
  //        valid: true,
  //        validBlank: 'false',
  //        curr: 'Ethereum',
  //        validWallet: true,
  //        currencyQuantity: this.state.amtInvested,
  //       dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //       tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
  //       tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //      });
  //    }else{
  //      this.setState({
  //       paymentMode : e.target.value,
  //        valid: true,
  //        validBlank: 'false',
  //        curr: 'Ethereum',
  //        validWallet: true,
  //        currencyQuantity: this.state.amtInvested,
  //       dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //       tokens: currencyQuantity.value * this.state.tokensPerEther,
  //       tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
  //      });
  //    }

  //   }else if(add == ''){
  //     // console.log('Empty');
  //     if(this.state.isBonusOrDiscount==='staticDiscount'){

  //       this.setState({
  //         paymentMode : e.target.value,
  //         validBlank: 'true',
  //         curr: 'Ethereum',
  //         currencyQuantity: this.state.amtInvested,
  //         dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //         tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
  //         tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //       })
  //     }
  //     else {
  //       this.setState({
  //         paymentMode : e.target.value,
  //         validBlank: 'true',
  //         curr: 'Ethereum',
  //         currencyQuantity: this.state.amtInvested,
  //         dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //         tokens: currencyQuantity.value * this.state.tokensPerEther,
  //         tokensWithBonus: (currencyQuantity.value * this.state.tokensPerEther) + ((currencyQuantity.value * this.state.tokensPerEther) * (this.state.bonus / 100)),
  //       })
  //     }
  //   }else {
  //    // console.log('not done');
  //    if(this.state.isBonusOrDiscount==='staticDiscount'){
  //      this.setState({
  //       paymentMode : e.target.value,
  //        valid: false,
  //        validBlank: 'false',
  //        curr: 'Ethereum',
  //       currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
  //       dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //       tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
  //       tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //      });
  //    }
  //    else{
  //      this.setState({
  //       paymentMode : e.target.value,
  //        valid: false,
  //        validBlank: 'false',
  //        curr: 'Ethereum',
  //      currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
  //      dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //      tokens: currencyQuantity.value * this.state.tokensPerEther,
  //      tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
  //      });
  //    }

  //   }

  // }

  showQR(currAddress){
    const href =
            "https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2";
          const query = queryString.parse(href);
          query.chl = currAddress;
          const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(
            query
          )}`;
          this.setState({url:uri,currAddress:currAddress}) 
  }
  currencyChange(e){
    this.setState({
      curr:e.target.value
    },()=>{
      if(this.state.curr == 'BTC'){
        if(this.state.btcWallet == ''){
          console.log("call api for btcWallet");
            this.props.createHotWallet({
            wallet_type : 'BTC'
            })
        } else {
          this.showQR(this.state.btcWallet.address);          
        }
      } else if(this.state.curr == 'ETH'){
        if(this.state.ethWallet == ''){
          console.log("call api for ethWallet")
          this.props.createHotWallet({
            wallet_type : 'ETH'
            })
        } else {
          this.showQR(this.state.ethWallet.address);  
        }
      } else if(this.state.curr == 'XLM'){
        if(this.state.xlmWallet == ''){
          console.log("call api for xlmWallet")
          this.props.createHotWallet({
            wallet_type : 'XLM'
            })
        } else {
          this.showQR(this.state.xlmWallet.address);  
        }
      } else if(this.state.curr == 'USDT'){
        if(this.state.usdtWallet == ''){
          console.log("call api for usdtWallet")
          this.props.createHotWallet({
            wallet_type : 'USDT'
            })
        } else {
          this.showQR(this.state.usdtWallet.address);  
      }
      }
    })

    console.log("sadde wallet", this.state.ethWallet, this.state.btcWallet, this.state.xlmWallet, this.state.usdtWallet)
    // this.props.createHotWallet({
    //   wallet_type : 'BTC'
    // })
  }

  // CurrencyChange(e) {
  //   /* console.log(e.target.value); */
  //   let currencyQuantity = document.getElementById('amt');
  //   let add = this.state.fromAddress;
  //   console.log(currencyQuantity.value);
  //   if (currencyQuantity.value === 0) {
  //     currencyQuantity = 0;
  //   }
  //   if(e.target.value === 'BTC') {
  //       // let add = document.getElementById('fromAddress').value;

  //       this.setState({
  //         fromAddress: '',
  //         tokenReceiveAddress: this.props.userInfo.userInfo.ethAddress,
  //         validWallet: true
  //       })
  //       // currencyQuantity.value = this.state.dollarsInvested / this.state.btcToDollar;
  //       if (add.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/)) {
  //         // console.log('done btc');
  //               if(this.state.isBonusOrDiscount==='staticDiscount'){
  //               this.setState({
  //                 valid: true,
  //                 validBlank: 'false',
  //                 curr: 'Bitcoin',
  //                 currencyQuantity: currencyQuantity.value,
  //                 dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
  //                 tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
  //                 tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //               })
  //               }
  //               else{
  //                 this.setState({
  //                   valid: true,
  //                   validBlank: 'false',
  //                   curr: 'Bitcoin',
  //                   currencyQuantity: currencyQuantity.value,
  //                   dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
  //                   tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
  //                   tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
  //                 });
  //               }
  //       }else if(add == ''){
  //        // console.log('Empty');
  //          if(this.state.isBonusOrDiscount==='staticDiscount'){
  //            this.setState({
  //              validBlank: 'true',
  //              curr: 'Bitcoin',
  //              currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
  //              dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
  //              tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
  //              tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //            })
  //          } else {
  //            this.setState({
  //              validBlank: 'true',
  //              curr: 'Bitcoin',
  //              currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
  //              dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
  //              tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
  //              tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
  //            })
  //          }

  //       }else {
  //         // console.log('not done');
  //       if(this.state.isBonusOrDiscount==='staticDiscount'){
  //         this.setState({
  //           valid: false,
  //           curr: 'Bitcoin',
  //           currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
  //           dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
  //           tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
  //           tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //         });
  //       }
  //       else {
  //         this.setState({
  //           valid: false,
  //           curr: 'Bitcoin',
  //           currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
  //           dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
  //           tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
  //           tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
  //         });
  //       }
  //       }
  //   } else  if(e.target.value === 'ETH') {
  //     let currencyQuantity = document.getElementById('amt');
  //     // let add = document.getElementById('fromAddress').value;
  //     //this.metamaskCall();
  //     this.setState({
  //       fromAddress: this.props.userInfo.userInfo.ethAddress,
  //       tokenReceiveAddress: false,
  //       validBlank: true
  //     })
  //     if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
  //       console.log(" inside  ethererererer------------------------ add match")
  //      // console.log('done eth');
  //      if(this.state.isBonusOrDiscount==='staticDiscount'){
  //        console.log(" inside  etherium type",this.state)
  //        this.setState({
  //          valid: true,
  //          validBlank: 'false',
  //          curr: 'Ethereum',
  //          validWallet: true,
  //          currencyQuantity: this.state.amtInvested,
  //         dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //         tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
  //         tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //        });
  //      }else{
  //        this.setState({
  //          valid: true,
  //          validBlank: 'false',
  //          curr: 'Ethereum',
  //          validWallet: true,
  //          currencyQuantity: this.state.amtInvested,
  //         dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //         tokens: currencyQuantity.value * this.state.tokensPerEther,
  //         tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
  //        });
  //      }

  //     }else if(add == ''){
  //       // console.log('Empty');
  //       if(this.state.isBonusOrDiscount==='staticDiscount'){

  //         this.setState({
  //         validBlank: 'true',
  //         curr: 'Ethereum',
  //         currencyQuantity: this.state.amtInvested,
  //         dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //         tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
  //         tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //         })
  //       }
  //       else {
  //         this.setState({
  //           validBlank: 'true',
  //           curr: 'Ethereum',
  //         currencyQuantity: this.state.amtInvested,
  //         dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //         tokens: currencyQuantity.value * this.state.tokensPerEther,
  //         tokensWithBonus: (currencyQuantity.value * this.state.tokensPerEther) + ((currencyQuantity.value * this.state.tokensPerEther) * (this.state.bonus / 100)),
  //         })
  //       }
  //     }else {
  //      // console.log('not done');
  //      if(this.state.isBonusOrDiscount==='staticDiscount'){
  //        this.setState({
  //          valid: false,
  //          validBlank: 'false',
  //          curr: 'Ethereum',
  //        currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
  //        dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //        tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
  //        tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //        });
  //      }
  //      else{
  //        this.setState({
  //          valid: false,
  //          validBlank: 'false',
  //          curr: 'Ethereum',
  //        currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
  //        dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
  //        tokens: currencyQuantity.value * this.state.tokensPerEther,
  //        tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
  //        });
  //      }

  //     }


  //   } else if (e.target.value === 'USD') {
  //     let currencyQuantity = document.getElementById('amt');
  //     this.setState({
  //       valid: true,
  //       validBlank: 'false',
  //       curr: 'Dollar',
  //       validWallet: true,
  //       dollarsInvested: currencyQuantity.value,
  //       currencyQuantity: currencyQuantity.value,
  //       tokens: currencyQuantity.value * this.state.tokensPerUsd,
  //       tokensWithBonus: currencyQuantity.value * this.state.tokensPerUsd + this.state.tokensPerUsd * currencyQuantity.value * 0.01 * this.state.bonus
  //     })
  //   } else if (e.target.value === 'EUR') {
  //     let currencyQuantity = document.getElementById('amt');
  //     this.setState({
  //       valid: true,
  //       validBlank: 'false',
  //       curr: 'Euro',
  //       validWallet: true,
  //       dollarsInvested: currencyQuantity.value * 1.16,
  //       currencyQuantity: currencyQuantity.value,
  //       tokens: currencyQuantity.value * this.state.tokensPerEur,
  //       tokensWithBonus: currencyQuantity.value * this.state.tokensPerEur + this.state.tokensPerEur * currencyQuantity.value * 0.01 * this.state.bonus
  //     })
  //   }
  // }

  // amtInvested(e) {
  //    const currencyQuant = document.getElementById('amt');
  //    this.setState({
  //      amtInvested: e.target.value,
  //    });
  //    if (this.state.curr == 'Ethereum') {
  //     //  currencyQuant.value = e.target.value / this.state.ethToDollar;
  //       if(this.state.isBonusOrDiscount==='staticDiscount'){
  //           console.log(this.state," inside staticDiscount ")
  //         this.setState({
  //           currencyQuantity: currencyQuant.value,
  //           dollarsInvested: currencyQuant.value * this.state.ethToDollar,
  //           tokens: (currencyQuant.value*this.state.ethToDollar)/this.state.tokenPrice,
  //           tokensWithBonus: (currencyQuant.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //         });
  //       }else {
  //         this.setState({
  //           currencyQuantity: currencyQuant.value,
  //           dollarsInvested: currencyQuant.value * this.state.ethToDollar,
  //           tokens: this.state.tokensPerEther * currencyQuant.value,
  //           tokensWithBonus: this.state.tokensPerEther * currencyQuant.value + this.state.tokensPerEther * currencyQuant.value * 0.01 * this.state.bonus
  //         });
  //       }


  //    } else if (this.state.curr == 'Bitcoin') {
  //     //  currencyQuant.value = e.target.value / this.state.btcToDollar;
  //     if(this.state.isBonusOrDiscount==='staticDiscount'){
  //         console.log(this.state," inside bitcoin staticDiscount ")
  //       this.setState({
  //         currencyQuantity: currencyQuant.value,
  //         dollarsInvested: currencyQuant.value * this.state.btcToDollar,
  //         tokens: (currencyQuant.value*this.state.btcToDollar)/this.state.tokenPrice,
  //         tokensWithBonus: (currencyQuant.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
  //      });
  //    }else {
  //      this.setState({
  //        currencyQuantity: currencyQuant.value,
  //        dollarsInvested: currencyQuant.value * this.state.btcToDollar,
  //        tokens: currencyQuant.value * this.state.tokensPerBitcoin,
  //        tokensWithBonus: this.state.tokensPerBitcoin * currencyQuant.value + this.state.tokensPerBitcoin * currencyQuant.value * 0.01 * this.state.bonus
  //     });
  //    }
  //    } else if (this.state.curr == 'Dollar') {
  //      this.setState({
  //        currencyQuantity: currencyQuant.value,
  //        dollarsInvested: currencyQuant.value,
  //        tokens: currencyQuant.value * this.state.tokensPerUsd,
  //        tokensWithBonus: this.state.tokensPerUsd * currencyQuant.value + this.state.tokensPerUsd * currencyQuant.value * 0.01 * this.state.bonus
  //      })
  //    } else if (this.state.curr == 'Euro') {
  //      this.setState({
  //        currencyQuantity: currencyQuant.value,
  //        dollarsInvested: currencyQuant.value * 1.16,
  //        tokens: currencyQuant.value * this.state.tokensPerEur,
  //        tokensWithBonus: this.state.tokensPerEur * currencyQuant.value + this.state.tokensPerEur * currencyQuant.value * 0.01 * this.state.bonus
  //      })
  //    }
  //  }
  // //  updatetime() {
  // //   if (this.state.timer > 0) {
  // //     const min = this.state.timer / 60;
  // //     const minutes = Math.floor(min);
  // //     const seconds = this.state.timer % 60;
  // //     this.setState({
  // //       timer: this.state.timer - 1,
  // //       minutes,
  // //       seconds: seconds < 10 ? `0${seconds}` : seconds,
  // //     });
  // //   } else {
  // //     clearInterval(this.state.interval);
  // //     this.props.dash();
  // //     this.props.reload();
  // //   }
  // // }

  // resetInfo=()=>{
  //   this.props.toggleInfo()
  // }


  checkWallet = async () => {

    // let amount =  document.getElementById('amt').value;
    // if(!amount){
    //     toast.error("Please enter the correct amount");
    //     // toast('txnJash: 0xfa03207cb875340aec8f81408a39994c616c284a13bd2589c453810bb63b4a87', {
    //     //   position: "top-center",
    //     //   autoClose: 5000,
    //     //   hideProgressBar: false,
    //     //   closeOnClick: false,
    //     //   pauseOnHover: true,
    //     //   draggable: true,
    //     //   progress: 3,
    //     //   className: 'toast-success-container '
    //     //   });
          
    //     return ''
    // }
  //   if(amount<=0){
  //     toast.error("Amount should be greater than zero");
  //       return ''
  //   }
  //   if(this.state.paymentMode==='viaPvtWallet'){
  //   let fromAddress = document.getElementById('fromAddress').value;
  //   if(!fromAddress){
  //     toast.error("Please enter the ETH Wallet Address");
  //     return ''
  //   }
  // } else if(this.state.paymentMode === 'viaCenxWallet'){
  //   if(!this.state.cenxWalletAddress){
  //     toast.error("Create CENX Wallet and get details");
  //     return ''
  //   }
  // } else {
  //   if(!this.state.metamaskAccount){
  //     toast.error("Connect Metamask wallet");
  //     return ''
  //   }
  // }

    if( this.state.hotWalletList.length > 0 ){
      let hasBtcWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "BTC")
      console.log("WWWWWWWWWWWHHHHHHHHHHHHHHHHaaaaaaaaaaaaattttttttttttttSSSSSSSSSSS this: ",hasBtcWalletCreated);
      if(hasBtcWalletCreated){ //btc wallet already present
        toast.info("Please wait while your btc wallet is being fetched")
        console.log("EEEEEEEEEEEEXXXXXXXXXXEEEEEEEEEEEECUTED AAAAAA");
        // this.setState({
        //   confirmContri : true
        // })
      } else { //btc wallet created
        console.log("EEEEEEEEEEEXXXXXXXXXXXXEEEEEECCCCCCCCCCCCUUUUUUUUUUUUTEEEEEEEEEE BBBBB")
        toast.info("Please wait while your btc wallet is being created")
        // this.setState({
        //   confirmContri : true,
        //   iswalletCreating : true
        // },
        //   () => {
            this.props.createHotWallet({
              wallet_type : 'BTC'
            })
        //   }
        // )
      }
    }else{
      console.log("EEEEEEEEXXXXXXXXXUUUUUUUECCCCCCCCCCUTED CCCCCCC")
      toast.info("Please wait while your wallet is being created")
      this.setState({
        confirmContri : true,
        iswalletCreating : true
      },
        () => {
          this.props.createHotWallet({
            wallet_type : 'BTC'
          })
        }
      )
    }

    // if(this.state.hotWalletList.length > 0 ){
    //   let hasEthWalletCreated =  this.state.hotWalletList.find(wallet => wallet.ticker !== "BTC" )
    //   if(hasEthWalletCreated){ // if btc wallet has not created yet
    //     toast.info("Please wait while your btc wallet is being created")
    //     this.setState({
    //       confirmContri : true,
    //       iswalletCreating : true
    //     },
    //       () => {
    //         this.props.createHotWallet({
    //           wallet_type : 'BTC'
    //         })
    //       }
    //     )
    //     }
    // }
    // else{
    //   toast.info("Please wait while your wallet is being created")
    //   this.setState({
    //     confirmContri : true,
    //     iswalletCreating : true
    //   },
    //     () => {
    //       this.props.createHotWallet({
    //         wallet_type : 'BTC'
    //       })
    //     }
    //   )
    // }
  }

  getStakedOrNot=async()=>{
    var address = constants.stakeContractAddress;
    var abi = constants.stakeContractAbi, result=0;
    console.log("abi: ", abi, address, this.state.ethWallet)
    try{
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`))
    let userAddress = web3.utils.toChecksumAddress(this.state.ethWallet.address);
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

  downloadTxtFile = () => {
    if(this.state.cenxWalletPvtKey==''){
      this.props.getCenxWallet();
    }else{
      const element = document.createElement("a");
        const file = new Blob(["Address: ",this.state.cenxWalletAddress, '\nPrivate Key: ', this.state.cenxWalletPvtKey],    
                    {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = "CenXAccountDetails.txt";
        document.body.appendChild(element);
        element.click();
    }
   
  }

  createCenxWallet () {
    if(this.props.userInfo.kycStatus!=='ACCEPTED'){
      if(localStorage.getItem('language')=='chinese'){toast.error("您的KYC应该可以创建钱包")}
      else
      {toast.error("Your KYC should be accepted for creating wallet")}
    }else
    {const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`));//--prodChange
    let account = web3.eth.accounts.create(web3.utils.randomHex(32));
    if(account.address){
      const href =
        "https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2";
      const query = queryString.parse(href);
      query.chl = account.address;
      const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(
        query
      )}`;
      this.setState({url:uri});
    }

    this.setState({
      cenxWalletAddress: account.address,
      cenxWalletPvtKey: account.privateKey,
    },()=>{

      let body = {
        publicKey : this.state.cenxWalletAddress,
        privateKey : this.state.cenxWalletPvtKey,
        balance : 0
      }
      this.props.addCenxWallet(body);

    })

    this.setState({temp:true});
  }
    
  }

  openSimplex () {
  //   loadSimplex=true;
  //   window.simplexAsyncFunction = function () {
  //     Simplex.init({public_key: 'pk_test_99237f76-be5c-4905-9c03-db95d44d8e0a'})
  // };
  if(this.state.cenxWalletAddress==''){
    if(localStorage.getItem('language')=='chinese'){
      toast.error("创建钱包以从Simplex购买资金")
    }else{
      toast.error("Create wallet to buy funds from Simplex")
    }

  } else{
    window.simplex.createForm()
  }
}

//   getMetamaskAddress = async() => {
//     const web3 = new Web3(window.web3.currentProvider);
//     const accounts = await web3.eth.getAccounts();


//     if(accounts.length !== 0) {
//       this.setState({
//         metamaskAccount : accounts[0],
//         metamaskConnected : true
//       })

//     }

     
// }

  showDate (time) {
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let userCreatedAt = new Date(time*1000)
  return <span className="depositText" style={{fontWeight:"bold"}}>{userCreatedAt.getDate()}<br />{months[userCreatedAt.getMonth()]} {userCreatedAt.getFullYear()}</span>
}

openDeposit () {
  this.setState({
    showDeposit:true
  })
}

hide=(e)=>{
  this.setState({
    open:false,
    showEthWalletCreate: false,
    buyEth: false,
    showDeposit: false,
    curr:'',
    currAddress:'',
    url:logo
  })
}

apyMode = (e)=>{
  var sorted = [];
  sorted = this.state.interestAccountDetails.map(d=>{
    return d
  })

  // sorted.push(this.state.interestAccountDetails)
  console.log(sorted , "vfdjksnvnvbtkbg")
  if(e.currentTarget.dataset.myValue ==='lTh'){
    this.setState({
      apySort : 'Low to High'
    })
    sorted.sort(function(a , b) {
      return (a.interestRate - b.interestRate )
    })
  }
  else if (e.currentTarget.dataset.myValue ==='hTl'){
    this.setState({
      apySort : 'High to Low'
    })
  sorted.sort(function(a , b) {
    return (b.interestRate - a.interestRate )
  })
  }
  this.setState({
    interestAccountDetails : sorted
  })
}

lookupPeriod = (e) =>{
  var sorted = []
  sorted = this.state.interestAccountDetails.map(d=>{
    return d
  })
  console.log(sorted , "vfdjksnvnvbtkbg")
  if(e.currentTarget.dataset.myValue ==='lTh'){
    this.setState({
      lookUpSort : 'Low to High'
    })
    sorted.sort(function(a , b) {
      // var adate = new Date(a.time * 1000);
      // var aday = adate.getDay();
      // var bdate = new Date(b.time * 1000);
      // var bday = bdate.getDay();


      var adate = new Date(a.time * 1000);
      var bdate = new Date(b.time * 1000);
      var currentDate = new Date();
      var aminutes = ((currentDate.getTime()-adate.getTime()))/60000;
      var bminutes = ((currentDate.getTime()-bdate.getTime()))/60000;
      var aday = Math.round(aminutes/1440)
      var bday = Math.round(bminutes/1440)
      return (bday - aday )
    })
  }
  else if (e.currentTarget.dataset.myValue ==='hTl'){
    this.setState({
      lookUpSort : 'High to Low'
    })
  sorted.sort(function(a , b) {
    var adate = new Date(a.time * 1000);
      var aday = adate.getDay();
      var bdate = new Date(b.time * 1000);
      var bday = bdate.getDay();

      var adate = new Date(a.time * 1000);
      var bdate = new Date(b.time * 1000);
      var currentDate = new Date();
      var aminutes = ((currentDate.getTime()-adate.getTime()))/60000;
      var bminutes = ((currentDate.getTime()-bdate.getTime()))/60000;
      var aday = Math.round(aminutes/1440)
      var bday = Math.round(bminutes/1440)
    return (aday - bday )
  })
}
  this.setState({
    interestAccountDetails : sorted
  })
}

// openShowEthWalletCreate () {
//   this.setState({
//     showEthWalletCreate: true
//   })
// }

  // End of container functions
  render() {
        

      
     console.log(this.state.interestAccountDetails," sttate in contribution page")
    // console.log(this.state," state in contribution page")
    const { loading } = this.props
    const {language} = this.state
 
    // this.setState({
    //   loading : this.props
    // });
    //console.log(loading," loading in ");

//     if(this.state.iswalletCreating){
//       return(
//         <div id="content" className="ui-content ui-content-aside-overlay">

//           <div className="ui-content-body">
//             <div className="ui-container container-fluid">
//             <LoadingSpinner />
// </div></div></div> 
//       );
//     }
    //console.log(".phir....................se............aaya.");





    if (this.state.stake){
      return (
      <div>
        <Stake  
        confirmInvestPayment={this.confirm}
        ethWallet = {this.state.ethWallet}
        back={this.comeBack}
        />  
      </div>
      )
    } else if (this.state.earnInterest){
      return (
      <div>
        <EarnInterest  
        confirmInvestPayment={this.confirm}
        isStaker={this.state.isStaker}
        monthDuration={this.state.monthDuration}
        ethWallet = {this.state.ethWallet}
        back={this.comeBack}
        />  
      </div>
      )
    }
    

    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>{language==='chinese'?'钱包':'Stake Swan'}</title>
        <meta name="description" content="Description of Invest" />
        

      </Helmet>
      <div className="static-modal">
          <Modal show={this.state.showDetails} bsSize="medium" onHide={this.hide} dialogClassName="">
            <Modal.Body>
              <div>
                <div className="row">
                  <div className="col-sm-12 text-right">
                    <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ showDetails:false })}}></i>
                  </div>
                </div>
                <div className="row" style={{textAlign:"center"}}>
                  <h3>Earn Interest</h3>
                  <h4>{this.state.currInterestAccountDetails.amount} SWAN</h4>
                </div>
                <div className="row">
                  <div className="col-sm-6 col-md-6 col-lg-6 depositText" style={{paddingLeft:"40px"}}>
                    Total tokens
                    <br />
                    APY
                    <br />
                    Total Interest Earned
                  </div>
                  <div className="col-sm-1 col-md-1 col-lg-1"><div className="balance-hr"></div></div>
                  <div className="col-sm-5 col-md-5 col-lg-5" style={{fontWeight:"bold"}}>
                  {this.state.currInterestAccountDetails.amount} SWAN
                  <br />
                  {this.state.currInterestAccountDetails.interestRate}%
                  <br />
                  {this.state.currInterestAccountDetails.amount * this.state.currInterestAccountDetails.interestRate/100} SWAN
                  </div>
                </div>
                <div className="row" style={{marginTop:"20px", textAlign:"center"}}>
                  <div className="col-sm-6 col-md-6 col-lg-6" style={{marginTop:"20px"}}>
                  Claim Weekly Interests </div><div className="col-sm-6 col-md-6 col-lg-6" style={{marginTop:"20px", textAlign:"center"}}> <span style={{backgroundColor:"#D6E4FE", marginLeft:"10px", cursor:"pointer", padding:"7px", width:"100px"}} onClick={()=>this.claimTokens()}>{this.state.claimLoader?<i className="fa fa-cog fa-spin fa-3x fa-fw" style={{fontSize:'15px'}} />:<i className="fa fa-plus-circle" style={{color:'rgb(45, 109, 205)'}}></i>}Claim</span>
                  </div><div className="col-sm-6 col-md-6 col-lg-6" style={{marginTop:"20px", textAlign:"center"}}>
                  Withdraw Staked Tokens </div><div className="col-sm-6 col-md-6 col-lg-6" style={{marginTop:"20px", textAlign:"center"}}> <span style={{backgroundColor:"#D6E4FE", marginLeft:"10px", cursor:"pointer", padding:"7px", width:"100px"}} onClick={()=>this.withdrawTokens()}>{this.state.withdrawLoader?<i className="fa fa-cog fa-spin fa-3x fa-fw" style={{fontSize:'15px'}} />:<i className="fa fa-plus-circle" style={{color:'rgb(45, 109, 205)'}}></i>}Withdraw</span>
                  </div>
                </div>
            
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div className="static-modal">
          <Modal show={this.state.buyEth} bsSize="large" onHide={this.hide} dialogClassName="myModal">
          <Modal.Header>
            <div className="col-sm-12 text-right">
                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ buyEth:false })}}></i>
            </div>
          <Modal.Title>
            {
              language === 'chinese' ?   <div className='text-center'>{this.state.cenxWalletAddress?<h2>这是您的帐户</h2>:<h2>创建自己的以太坊钱包</h2>}</div>
              :
              <div className='text-center'>{this.state.cenxWalletAddress?<h2>Here is your account</h2>:<h2>Create your own Ethereum Wallet</h2>}</div>
            }
          
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div>
              <div className="row">
                <div className="col-md-6">
                <div className="col-sm-12" >

                    <div className="row">
                    <div className="col-md-9">
                    <h3>{language==='chinese'?'钱包地址：':'Wallet Address:'} &nbsp;
                    <CopyToClipboard text={this.state.cenxWalletAddress}
                            onCopy={() => {this.setState({copied: true});
                            if(localStorage.getItem('language')=='chinese'){
                              toast.success("复制的")
                            }else{
                              toast.success("Copied")
                            }
                            }}>
                            <span className="file-copy-container">
                            <FileCopyOutlinedIcon
                              style={{ outline : 'none' ,fontSize : '16px'  }}
                              />
                            </span>
                          </CopyToClipboard>
                    <br />{this.state.cenxWalletAddress?this.state.cenxWalletAddress:"Not created yet"}
                          </h3>
                    <br />
                    </div>
                    </div>
                </div>
                </div>
                  <div className="col-md-6">
                      <button className="btn-primary form-button-small" onClick={()=>this.openSimplex()} >{language==='chinese'?'购买伦理':'Buy ETH'}</button>
                  </div>
              </div>
            
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
            <div className="col-sm-12 col-md-12 col-lg-12">
          <div className="balance-card" style={{ marginBottom : '2em', height:"360px" }}>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                  {/* <h4 className="wallet-panel-heading" style={{ paddingLeft: '20px',paddingTop: '10px' }}>Wallet</h4> */}
                  <div className="customCard-header transaction-container">
                        <h2 className="trasnaction">Stake SWAN</h2>
                      </div>  
                  </div>
              </div>
              {/* <hr className="contribution-hr" /> */}
            
              <div style={{ paddingLeft: '20px',paddingTop: '10px' }}>          
            <div className="row">
              <div className="col-md-6 col-lg-6 col-sm-6" style={{fontSize:"20px"}}>
              Stake 2,000,000 SWAN tokens to earn higher interest rates for SWAN and all other cryptocurrencies and stablecoins. Without staking 2,000,000 SWAN tokens here, the interest rates are 4% less.
              </div>
              <div className="col-md-6 col-lg-6 col-sm-6" style={{textAlign:'center'}}>
               {this.state.isStaker?<button className='fractal-id-btn' onClick={()=>this.claimStakedTokens()}>{this.state.withdrawLoader?<i className="fa fa-cog fa-spin fa-3x fa-fw" style={{fontSize:'15px'}} />:'UNSTAKE'}</button>
               :<button className='fractal-id-btn' onClick={()=>this.setState({stake:true})}>STAKE NOW</button> }
              </div>

            </div>
             
            </div>
            <div className="row" style={{marginTop:"35px"}}>
              <div className="col-sm-12 col-md-5">
                  {/* <h4 className="wallet-panel-heading" style={{ paddingLeft: '20px',paddingTop: '10px' }}>Wallet</h4> */}
                  <div className="customCard-header transaction-container">
                        <h2 className="trasnaction">Account Balance</h2>
                      </div>  
                  </div>
              </div>
              <div style={{ paddingLeft: '20px',paddingTop: '10px' }}>          
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-sm-6" style={{fontSize:"20px",color:'#465490'}}>
                                Stake SWAN Account
                  </div>
                  <div className="col-md-6 col-lg-6 col-sm-6" style={{textAlign:'center'}}>
                    120 days remaining &nbsp;
                  <button className='swanBox'>{this.state.swanBalance==0?'0 (NA)':this.state.tokenPrice*this.state.swanBalance+'~'}</button> 
                  </div>

                </div>
             
            </div>

            </div>

            {/* Earn Interest started */}
            <div className="balance-card" style={{ height:"100%" }}>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                  {/* <h4 className="wallet-panel-heading" style={{ paddingLeft: '20px',paddingTop: '10px' }}>Wallet</h4> */}
                  <div className="customCard-header transaction-container">
                        <h2 className="trasnaction">Earn interest</h2>
                      </div>  
                  </div>
              </div>
              {/* <hr className="contribution-hr" /> */}
            
              <div style={{ paddingLeft: '40px',paddingTop: '10px' }}>          
            <div className="row">
              <div style={{fontSize:"20px"}}>
                <div className="row">
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    Staked Amount
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    Without Staked
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    With Staked
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3" style={{marginBottom:'5px'}}>
                    &nbsp;
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    1 Month
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    12% APY
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    16% APY
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3" style={{marginBottom:'5px'}}>
                    <button className="swanBox" style={{padding:'6px 14px'}} onClick={()=>this.setState({earnInterest:true, monthDuration:1})}>EARN INTEREST</button>
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    3 Months
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    16% APY
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3">
                    20%APY
                  </div>
                  <div className="col-md-3 col-mg-3 col-sm-3" style={{marginBottom:'5px'}}>
                    <button className="swanBox" style={{padding:'6px 14px'}} onClick={()=>this.setState({earnInterest:true, monthDuration:3})}>EARN INTEREST</button>
                  </div>

                </div>
              </div>

            </div>
             
            </div>
            <div className="row" style={{marginTop:"35px"}}>
              <div className="col-sm-12">
                  {/* <h4 className="wallet-panel-heading" style={{ paddingLeft: '20px',paddingTop: '10px' }}>Wallet</h4> */}
                  <div className="customCard-header transaction-container">
                        <h2 className="trasnaction">Investments</h2>
                      </div>  
                  </div>
              </div>
              <div style={{ paddingLeft: '20px',paddingTop: '10px' }}> 
              <div className="row">
              <div className="col-md-3 col-lg-3 col-sm-3">
              <span style={{color:'#ACBDD8'}} >APY</span>

                <div className="select-wrapper">
                <Dropdown className="sorting-dropdown" >
                                  <Button className="sorting-button" variant="success">{this.state.apySort}</Button>
                                  <Dropdown.Toggle className="sorting-dropdown-toggle" split variant="success" id="dropdown-split-basic"/>
                                  <Dropdown.Menu className="currency-menu" >
                                    <MenuItem data-my-value="hTl" onClick={this.apyMode}>
                                      High to Low
                                      </MenuItem>
                                    <MenuItem data-my-value="lTh" onClick={this.apyMode}>
                                      Low to High
                                      </MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>
                    </div>
                </div>     
                <div className="col-md-3 col-lg-3 col-sm-3">
                <span style={{color:'#ACBDD8'}} >Lookup Period</span>
                <div className="select-wrapper">
                <Dropdown className="sorting-dropdown" >
                                  <Button className="sorting-button" variant="success">{this.state.lookUpSort}</Button>
                                  <Dropdown.Toggle className="sorting-dropdown-toggle" split variant="success" id="dropdown-split-basic"/>
                                  <Dropdown.Menu className="currency-menu" >
                                    <MenuItem data-my-value="hTl" onClick={this.lookupPeriod}>
                                      High to Low
                                      </MenuItem>
                                    <MenuItem data-my-value="lTh" onClick={this.lookupPeriod}>
                                      Low to High
                                      </MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>

                    </div>
                </div>
                </div>
                <br />
                <hr />
                <div className="row">
                  


                {this.state.interestAccountDetails.map(d=>{
                  var date = new Date(d.time * 1000);
                  var currentDate = new Date();
                  var minutes = ((currentDate.getTime()-date.getTime()))/60000;
                  var day = Math.round(minutes/1440)
                  return(
                <div className="col-sm-12 col-md-12 col-lg-12">
                  <div style={{textAlign:"center", marginLeft:"-40px"}} >
                    <div className="col-md-3 col-lg-3 col-sm-3" style={{fontSize:"20px"}}>{this.showDate(d.time)}</div>
                    <div className="col-md-2 col-lg-2 col-sm-2" style={{fontWeight:"bold",fontSize:"20px"}}>{d.amount} SWAN<div className="depositText" style={{fontWeight:"16px"}}>Ends in {30-day} days</div></div>
                    <div className="col-md-3 col-lg-3 col-sm-3 depositText" style={{fontSize:"16px"}}>Total Earnings<br /><span style={{fontWeight:"bold",fontSize:"20px",color:"#414857"}}>{d.amount*d.interestRate/100} SWAN</span></div>
                    <div className="col-md-2 col-lg-2 col-sm-2 depositText" >APY<br /><span style={{fontSize:"30px"}}>{d.interestRate}%</span></div>
                    <div className="col-md-2 col-lg-2 col-sm-2" style={{fontSize:"16px"}} onClick={()=>this.setState({showDetails:true,currInterestAccountDetails:d})}><a style={{color:'#2498D5',textDecoration:'underline'}}>Check Details</a></div>
                  </div>
                  <div className="row" style={{margin:"20px"}}>
                    <div className="col-sm-12 col-md-12 col-lg-12" style={{height:"2px",borderWidth:"0",color:"gray",backgroundColor:"gray",opacity:"10%"}}></div>
                  </div>
                </div>
                  )}

                  )}


                </div>
                <br />

                <br />
                <br />
             
            </div>

            </div>

        </div>

        </div>
        </div>
       </div>
    );
  }
}


InvestPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  investpage: makeSelectInvestPage(),
  // contributionCurrency: makeSelectContributionCurrency(),
  successData: makeSelectContributionData(),
  successPayment: makeSelectContributionSuccess(),
  successNotPayment : makeSelectContributionNotSuccess(),
  // global: makeGlobalParent(),
  // transactionId: makeSelectTransactionId(),
  // userInfo: makeSelectDashBoardWelcomePage(),
  // loading:makeSelectLoading(),
  listHotWalletRet:makeSelectGetHotWalletRet(),
  getHotWalletLoading:makeSelectGetHotWalletLoading(),
  createHotWalletRet:makeSelectCreateHotWalletRet(),
  createHotWalletLoading:makeSelectCreateHotWalletLoading(),
  walletNotAddedSuccess: makeSelectWalletNotAdded(),
  walletAddedSuccess: makeSelectWalletAddedSuccess(),
  walletFetchedSuccess: makeSelectWalletFetchedSuccess()

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // selectCurrency: () => (dispatch(selectAction())),
    getData: () => (dispatch(getData())),
    confirmPayment: (data) => (dispatch(confirmPayment(data))),
    addCenxWallet: (data) => (dispatch(addCenxWallet(data))),
    getCenxWallet: () => (dispatch(getCenxWallet())),
    // reload: () => (dispatch(reload())),
    // finalizePayment: (data) => (dispatch(finalizePayment(data))),
    listHotWallet : data => dispatch(listHotWallet(data)),
    createHotWallet : data => dispatch(createHotWallet(data)),
    clearContribution : _ => dispatch(clearContribution())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'investPage', reducer });
const withSaga = injectSaga({ key: 'investPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(InvestPage);


