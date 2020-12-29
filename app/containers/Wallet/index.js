/**
 *
 * WalletPage
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
import makeSelectWalletPage, {
makeSelectWalletNotAdded, makeSelectWalletAddedSuccess, makeSelectWalletFetchedSuccess, makeSelectContributionData, makeSelectGetHotWalletRet, makeSelectGetHotWalletLoading, makeSelectCreateHotWalletRet, makeSelectCreateHotWalletLoading,makeSelectGetOtp, makeSelectSendWithdraw, makeSelectSendWithdrawRet
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { selectAction, getData, confirmPayment, reload,finalizePayment,listHotWallet, addCenxWallet,
  createHotWallet ,clearContribution, getCenxWallet,getOtp , sendWithdrawData , sendWithdrawdataSuccess} from './actions';
import { ContributionConfirm } from '../ContributionConfirm';
import { makeGlobalParent } from '../App/selectors';
import makeSelectDashBoardWelcomePage from '../DashBoardWelcomePage/selectors';
import { Helmet } from 'react-helmet';
import LoadingSpinner from 'components/LoadingSpinner/Loadable';
import Web3 from 'web3';
import { Modal,Dropdown, Button, MenuItem} from 'react-bootstrap';
import Info from "../../components/Info";
import { Link } from 'react-router-dom';
import { isInteger } from 'lodash';
import littleStar from "../../images/littleStar.svg";
import bigStar from "../../images/bigStar.svg";
import Ellipse from '../../images/Ellipse.svg';
import Planet from "../../images/Planet.svg";
import Satelite from "../../images/Satelite.svg";
import { TransactionHistory } from "../TransactionHistory";
import {ethLogo} from '../../images/logoETH.png';
import logo from '../../images/swan-logo-big.svg';
import stellarLogo from '../../images/logoXLM.png'
// import {Footer} from '../../components/footer/footer.js'
import queryString from "query-string";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import axios from 'axios';
import StellarSdk from 'stellar-sdk';
import constants from '../../utils/contractConfig';


let loadSimplex = false;
export class WalletPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
      currWithdraw: '',
      btcToDollar: 7500,
      ethToDollar: 600,
      xlmToDollar : 1,
      usdtToDollar : 1,
      eurToDollar: 0,
      currencyQuantity: 0,
      dollarQuantity: 0,
      tokens: 0,
      tokensWithBonus: 0,
      tokensPerEther: 0,
      tokensPerBitcoin: 0,
      tokensPerStellar: 0,
      tokensPerUsdt: 0,
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
      showWithdraw: false,
      ethWallet:'',
      btcWallet:'',
      usdtWallet:'',
      xlmWallet:'',
      btcBalance: 0,
      ethBalance: 0,
      xlmBalance: 0,
      usdtBalance: 0,
      swanBalance: 0,
      currAddress: '',
      dollarBalanceUsdt: 0,
      dollarBalanceXlm: 0,
      dollarBalanceEth: 0,
      dollarBalanceBtc: 0,
      balanceFlag: false,
      withdrawAddress: '',
      otp: '',
      otpReceive: false
    };

    // this.onContributionConfirm = this.onContributionConfirm.bind(this);
    this.currencyChange = this.currencyChange.bind(this);
    this.currencyChangeWithdraw = this.currencyChangeWithdraw.bind(this);
    // this.paymentModeChange = this.paymentModeChange.bind(this);
    // this.currencyQuantityChange = this.currencyQuantityChange.bind(this);
    // this.comeBack = this.comeBack.bind(this);
    // this.confirm = this.confirm.bind(this);
    // // this.updatetime = this.updatetime.bind(this);
    // this.amtInvested = this.amtInvested.bind(this);
    // this.validator = this.validator.bind(this);
    // this.validatorWallet = this.validatorWallet.bind(this);
    this.createCenxWallet = this.createCenxWallet.bind(this);
    this.openSimplex = this.openSimplex.bind(this);
    this.openDeposit = this.openDeposit.bind(this);
    this.openWithdraw = this.openWithdraw.bind(this);
    this.showQR = this.showQR.bind(this);
    this.getBitcoinBalance = this.getBitcoinBalance.bind(this);
    this.getStellarBalance = this.getStellarBalance.bind(this);
    this.getEthereumBalance = this.getEthereumBalance.bind(this);
    this.getUsdtBalance = this.getUsdtBalance.bind(this);
    this.saveData = this.saveData.bind(this);
    // //this.openShowEthWalletCreate = this.openShowEthWalletCreate.bind(this);
    // this.checkWallet = this.checkWallet.bind(this);


    console.log("yetopropshai",this.props)

    // const script = document.createElement("script");

    // script.src = "https://cdn.test-simplexcc.com/sdk/v1/js/sdk.js";
    // script.async = true;

    // document.body.appendChild(script);
    // const s = document.createElement("script");

    // s.src = "https://iframe.sandbox.test-simplexcc.com/form-sdk.js";

    // document.body.appendChild(s);

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

  saveData(e){
    console.log(e.target.id, "dsjkbvdsv")
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  getBitcoinBalance=()=>{
    axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${this.state.btcWallet.address}`)
      .then((res) => res.data)
      .then((obj) => this.setState({btcBalance: obj.final_balance, dollarBalanceBtc: this.state.btcToDollar*this.satoshi_to_btc(obj.final_balance)}))
      .then(obj => console.log(obj))
      .catch((err) => console.log(err))
  }

  getEthereumBalance=()=>{
    console.log("dvafduvsbfd")
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`));//--prodChange
      web3.eth.getBalance(web3.utils.toChecksumAddress(this.state.ethWallet.address), function(err,res){
        if(err){console.log("aggaya : ", err)}
        else{
          console.log("agaya balance", res)

          this.setState({ethBalance:web3.utils.fromWei(res),
          dollarBalanceEth: this.state.ethToDollar*web3.utils.fromWei(res)});
        }
      }.bind(this));
      this.getSwanBalance();
  }


  getStellarBalance=async()=>{
    const server = new StellarSdk.Server("https://horizon-testnet.stellar.org"); //--prodChange
    const account = await server.loadAccount(this.state.xlmWallet.address)
      console.log("Balances for account: " + account);
      account.balances.forEach(function(balance) {
      console.log("Type:", balance.asset_type, ", Balance:", balance.balance);
      let totalbalance = balance.balance;
      if(balance.asset_type == 'native'){
        this.setState({xlmBalance: totalbalance,
        dollarBalanceXlm: this.state.xlmToDollar*totalbalance });
      }
    }.bind(this));
  }

  getUsdtBalance=async()=>{
    var address = '0xD92E713d051C37EbB2561803a3b5FBAbc4962431';
    var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
    var result=0;
    console.log("abi: ", abi, address, this.state.usdtWallet)
    try{
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
    let userAddress = web3.utils.toChecksumAddress(this.state.usdtWallet.address);
    const contract = new web3.eth.Contract(abi, address);
    //console.log("contract hai: ", contract)
        
    result = await contract.methods.balanceOf(userAddress).call();
    
    this.setState({usdtBalance: result,
    dollarBalanceUsdt: this.state.usdtToDollar*result/1000000});
    console.log("heheUSDTBalance",web3.utils.fromWei(result));
    } catch(err){
      toast.error(`Error in getSwanBalance ${err}`)
        console.log("error in get swan balance")
    }
  }

  getSwanBalance=async()=>{
    var address = constants.tokenContractAddress;
    var abi = constants.tokenContractAbi, result=0;
    console.log("abi: ", abi, address, this.state.ethWallet)
    try{
    const web3 = new Web3(new Web3.providers.HttpProvider(`https://ropsten.infura.io/v3/6dab407582414625bc25b19122311c8b`))       //--prodChange
    let userAddress = web3.utils.toChecksumAddress(this.state.ethWallet.address);
    const contract = new web3.eth.Contract(abi, address);
    //console.log("contract hai: ", contract)
        
    result = await contract.methods.balanceOf(userAddress).call();
    
    this.setState({
      swanBalance: web3.utils.fromWei(result),
      balanceFlag: true
    });
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
      xlmToDollar: data.xlmUsd,
      usdtToDollar: data.usdtUsd,
      tokensPerEther: data.tokenPerEther,
      tokensPerBitcoin: data.tokenPerBtc,
      tokensPerStellar: data.tokenPerXlm,
      tokensPerUsdt: data.tokenPerUsdt,
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
      //fromAddressEth:nextProps.userInfo.userInfo.ethAddress
    });
    // if (nextProps.successPayment) {
    //   console.log(nextProps.successPayment);

    //   // this.notifyDeposit(nextProps.successPayment);
    // }
    // if (nextProps.successNotPayment) {
    //   toast.error(nextProps.successNotPayment.message);
    //   nextProps.clearContribution()
    // }
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
              },()=>{
                this.getBitcoinBalance()
              })
              
            }
            if(hasEthWalletCreated){
              this.setState({
                ethWallet: hasEthWalletCreated
              },()=>{
                this.getEthereumBalance()
              })
            }
            if(hasUsdtWalletCreated){
              this.setState({
                usdtWallet: hasUsdtWalletCreated
              },()=>{
                this.getUsdtBalance()
              })
            }
            if(hasXlmWalletCreated){
              this.setState({
                xlmWallet: hasXlmWalletCreated
              },()=>{
                this.getStellarBalance()
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
      else{
        console.log("afrovjoei")
      this.setState({
        balanceFlag:true
      })
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
        this.setState({
          iswalletCreating : false
        })
        toast.success(nextProps.createHotWalletRet.message) 
      }
      else{
        this.setState({
          iswalletCreating : false
        })
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
   if(nextProps.otpdata){
     toast.success(nextProps.otpdata.message)
     this.setState({
       otpReceive : true
     })
     nextProps.clearContribution()

   }
   if(nextProps.sendWithdrawRet){
     toast.success(nextProps.sendWithdrawRet.message)
     toast.success(nextProps.sendWithdrawRet.hash)
     nextProps.clearContribution()
   }
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


  // confirm(fromAdd, data) {
  //   let body = {
  //     tokens: this.state.tokensWithBonus,
  //     type: this.state.curr,
  //     amount: this.state.currencyQuantity,
  //     fromAddress:fromAdd,
  //     toAddress: this.props.successData.ethAddress,
  //     tokenReceivingAddress:this.state.fromAddressEth,
  //     usdAmount: this.state.dollarsInvested,
  //     rate:this.state.ethToDollar,
  //     phase:this.state.stage,
  //     tokenPrice : this.state.tokenPrice,
  //     bonus:this.state.bonus,
  //     discount:this.state.discount,
  //     isBonusOrDiscount:this.state.isBonusOrDiscount,
  //     transactionHash : data
  //   };
  //   console.log("dddddddddddddddddddddddd",data,"hash");
  //   console.log("bbbbbbbbbbbbbbbbbbbbbbbb",body,"body")
  //   this.props.confirmPayment(body);
  // }

  // comeBack() {
  //   this.setState({
  //     confirmContri: false,
  //     curr: 'Ethereum',
  //     ethToDollar: this.props.successData.ethUsd,
  //     usdEurContributionConfirm:false,
  //     paymentMode: 'viaPvtWallet',
  //     currencyQuantity : 0,
  //     tokens : 0,
  //     tokensWithBonus: 0
  //   })

  // }

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
          this.setState({url:uri,currAddress:currAddress,iswalletCreating:false}) 
  }
  currencyChangeWithdraw(e){
    console.log(e.currentTarget.dataset.myValue , "vdvjarbesvbebvh")
    this.setState({
      currWithdraw:e.currentTarget.dataset.myValue
    });


  }
  currencyChange(e){
    // console.log(e.currentTarget.dataset.myValue,"dsjvabdkvbfdiuvbf")
    this.setState({
      curr:e.currentTarget.dataset.myValue,
      iswalletCreating: true
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

    // if( this.state.hotWalletList.length > 0 ){
    //   let hasBtcWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "BTC")
    //   console.log("WWWWWWWWWWWHHHHHHHHHHHHHHHHaaaaaaaaaaaaattttttttttttttSSSSSSSSSSS this: ",hasBtcWalletCreated);
    //   if(hasBtcWalletCreated){ //btc wallet already present
    //     toast.info("Please wait while your btc wallet is being fetched")
    //     console.log("EEEEEEEEEEEEXXXXXXXXXXEEEEEEEEEEEECUTED AAAAAA");
    //     // this.setState({
    //     //   confirmContri : true
    //     // })
    //   } else { //btc wallet created
    //     console.log("EEEEEEEEEEEXXXXXXXXXXXXEEEEEECCCCCCCCCCCCUUUUUUUUUUUUTEEEEEEEEEE BBBBB")
    //     toast.info("Please wait while your btc wallet is being created")
    //     // this.setState({
    //     //   confirmContri : true,
    //     //   iswalletCreating : true
    //     // },
    //     //   () => {
    //         this.props.createHotWallet({
    //           wallet_type : 'BTC'
    //         })
    //     //   }
    //     // )
    //   }
    // }else{
    //   console.log("EEEEEEEEXXXXXXXXXUUUUUUUECCCCCCCCCCUTED CCCCCCC")
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
    {const web3 = new Web3(new Web3.providers.HttpProvider(`https://mainnet.infura.io/v3/6dab407582414625bc25b19122311c8b`));//--prodChange
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

openDeposit () {
  this.setState({
    showDeposit:true
  })
}
openWithdraw () {
  this.setState({
    showWithdraw:true
  })
}

hide=(e)=>{
  this.setState({
    open:false,
    showEthWalletCreate: false,
    buyEth: false,
    showDeposit: false,
    showWithdraw: false,
    curr:'',
    currAddress:'',
    url:logo
  })
}
satoshi_to_btc = (value) => Number((1e-8 * value).toFixed(8));
// openShowEthWalletCreate () {
//   this.setState({
//     showEthWalletCreate: true
//   })
// }

  // End of container functions

  getOtp = () =>{
    
    this.props.getOtp()
  }

  sendWithdrawData = () => {
    const data = {
      wallet_type : this.state.currWithdraw,
      otp : this.state.otp,
      to : this.state.withdrawAddress
    }
    console.log(data , "datat in wallet")
    this.props.sendWithdrawData(data)
  }

  render() {
        

      
     console.log(this.state.copied," sttate in contribution page")
    console.log(this.props,"props in wallet pages")
    const { loading } = this.props
    const {language} = this.state
    if(!this.state.balanceFlag){
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">

          <div className="ui-content-body">
             <div className="ui-container container-fluid">
            <LoadingSpinner />
 </div></div></div> 
      )
    }
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




    // if (this.props.userInfo.userInfo.kycStatus != 'ACCEPTED'){
    //   return (
    //     <div id="content" className="ui-content ui-content-aside-overlay">
    //     <div className="ui-content-body">
    //     <div className="ui-container container-fluid">
    //       <div className="row">
    //         <div className="col-sm-12">
    //           <div className="alert alert-danger text-center">
    //             <h5>Please complete your KYC to contribute.</h5>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   </div>
    // );
    // }
    // if (this.state.contribute){
    //   return (
    //     <div id="content" className="ui-content ui-content-aside-overlay">
    //     <div className="ui-content-body">
    //     <div className="ui-container container-fluid">
    //       <div className="row">
    //         <div className="col-sm-12">
    //           <div className="alert alert-success text-center">
    //             <h5>Contribution will start soon.</h5>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    //   </div>
    //   )
    // }
    

    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>{language==='chinese'?'钱包':'Wallet'}</title>
        <meta name="description" content="Description of Wallet" />
        

      </Helmet>
      <div className="static-modal">
      <Modal show={this.state.showWithdraw} bsSize="large" onHide={this.hide} dialogClassName="myModal">
          <Modal.Header>
            <div className="col-sm-12 text-right" style={{marginBottom:"-30px", marginTop:"10px"}}>
                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ showWithdraw:false, curr:'', currAddress:'',url:logo })}}></i>
            </div>
          <Modal.Title>
            <div className='text-center' style={{marginBottom:"-20px"}}><h2>Withdraw</h2></div>
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
              <div className="row">
                  <div className="col-sm-12" >

                      <div className="row">
                        <div className="col-md-4" >
                          <div className="qr-code" style={{marginTop:"45px" }}>
                            <img src={this.state.url} style={{width:"145px" }}   alt="" />
                          </div>
                        </div>
                        <div className = "col-md-8" style={{marginTop:"20px"}}>
                          <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <div className="transaction-container">Select your currency</div>
                              <div className="form-group">
                                
                                {/* <span className="select-wrapper">
                                  <select id="paymentMode" name="paymentMode" onChange={this.currencyChange} className="form-input form-one-style" required>
                                    <option value="" hidden>Click for options...</option>
                                    <option value="BTC">Bitcoin</option>
                                    <option value="ETH">Ethereum</option>
                                    <option value="XLM">Stellar</option>
                                    <option value="USDT">USDT</option>
                                  </select>
                                </span>                                      */}
                                <Dropdown className="currency-dropdown" >
                                  <Button className="currency-button" variant="success">{this.state.currWithdraw?this.state.currWithdraw:'Click for options...'}</Button>
                                  <Dropdown.Toggle className="currency-dropdown-toggle" split variant="success" id="dropdown-split-basic"/>
                                  <Dropdown.Menu className="currency-menu" >
                                    <MenuItem data-my-value="BTC" onClick={this.currencyChangeWithdraw}>
                                      <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAS1BMVEVHcEz4lBr4lhv/miT4lBr7lRz/szP4kxr4lBr4lBr9lx35lBr4kxr6lRv3kxr////++PH+7Nf937z7xIL80Z74pkL6uWr3min5r1Xgn4fZAAAADnRSTlMAq0YP7TkFwNaKHXj6XnPArAgAAASxSURBVHjazVvdmqsgDKy/qLUBBNT3f9Jz0e7ZaqlMEFdz269NCpNkEpLbLUaK6tFmQjRN2fdl0wiRtY+quP2JFHkrSlpJT0REpWjzY62o81b0tCm9aPP6IPVVWxIkZVul197dG2JIc+/S/vmM2JKlO4ZKUJSINCbkkeqJiES+/+4z2iXZPizU95J2Snnf4ZVVQwmkiYVC3VIiaaMOoROUTEQEEvKSEkrJdoeWEkvLu/6MkkvGAEIh6AARcKoumiP0U9+AFnTH6CeipjtXPxFyBsWB+hELanGkfupFyBcyOliyP44/zIiUc39tGIzjfmcjKnfs+K+klGowEysvdOkAOMunTLyQWCcDgHnq109rBjPvgkHFB9TwNMASEZF9XgeCCS9HqiMikHoaMBIRkX63JhCPfJdw5+tfQGCS79YE5J7CA9YQ4ADS4wlQCLTajm4DAv+t4QdELARpKaVU/42IhYAvHEEh4OeapdR2dDsgQEQixgVn+S5KR0Pg0xWxGGilT4YICKyPAIxB2mvAM/owIbA6AowFTPK7KCYElo7QYd+YzKBkQDhpqYsJgs7oTQMsgx78hkNeFhi3z0DDt9DEpkETuAZlmDDk8oApBASpMWLw4gU1Ow3JsEDuWNZxTHReos7vG3qCEwKbiS0wMH/zDcSClhGGP4nY0vGdVd4QHQ7HRR9JxNaxf1qnirA/9kUMBNxXsM3LQ9AYCBJA4JsFIwSCNBDwxigLgaBMBIHPDwEYlrdbkQ4CH5QBAEHBr4c2ILC+H8CA6vZICQH+CTz4TrAJgYkbilp2T2YbAstYBKTljO2FZsvRV1zFIcFY7IGA1HacvtJ2hKKLW7MDAj+s3JpxHD+zMkKMGq4BTsIC1SgNNxAaWL+C+HF56/dAYEs/Rgt7rgEK1D+AFUrPvALnK8c8sJzRHyyZIFwmgmn2E1KD/yDXCzyJYLYeQupwA0SCRPBJSBXeKBFpEoFRbEb6MiCLh8AyD645MYbDjJeON7nAKhMpsDx87IfAFwsgX3iwKJkLUN6BnwsqFik1gTt2bDpABYuWD6FukOLCsIQKE6ftPK3Lch3u442IFyKlmZVSSj0M4aqHW5lRixSnkzfpzGG2AlxBjpTnBm4IWi4I+wJpUGiUbznFjUQCadHM/pSvP57IVvqxsgRoUm2QsOH3/WQabQQryIE2XZAGKz0M2nNNKkzKXm26wB04oEUd2Sls4VZtjBEOSQScZjXTCOAAGn673sFlAdKmvHMfLBh1CVQWdRGDG69LsFbvL4uyiIdz9wswN34/DYyVV/xnu5+0oDZCpJQaGqjoRczswOKx+Ofp2tg399AWrQiqiKfb5WPxwprJzfM8O/zRTMQ8XrtFjFHsl8LPNMB8u/RCYIrSn0UNMHghEKXfN8pz3wMBrtyjhljSQcA7xAInxQQQqHYMMjljdkOgTTHKtQMC32cKOaM8L3owpvGAyHE+Z4YpQQi60kDj+SOdRw+1UnCo9dix3v7swWJouLs+e7T7uOHuBh+vP3m8//wFh/NXPC6w5HL+ms/5i07nr3pdYNnt/HW/Cyw8XmDl8wJLrxdY+73A4vMVVr83lt9f//zw5fcj1v//AUJgzq1BOb7uAAAAAElFTkSuQmCC"></img>
                                      (BTC) Bitcoin</MenuItem>
                                    <MenuItem data-my-value="ETH" onClick={this.currencyChangeWithdraw}>
                                      <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAQlBMVEVHcExnge9if+tjf+xifutif+tvgvZjf+tkgexjgOtifurAy/b///+Bl+78/P5rheuSpfCltfO1wvV1ju3s7/zX3vmZ+KnyAAAACnRSTlMAHPpp1u0KuT+IQ31QMAAABPlJREFUeNrNW1uiqyAMVFTeIKDuf6v3o6etD9Qk0NuyABnJZBJC0jSUxWWnhBB9PzA29L0QQnWSN/9lcanEoDXTTK8W00zrQagPo+BSic2+x8U+CEKqQYPWoGT93VvVa8TqVVv354VGLyFrbs/wAFgtCJS/r3gKbcH2WmstyrjAu6Fsf81YV3L6va6werIdlK601FesX8oEOeiKa5BfO36iGUTt/TUTiBjFMdIXXHUELcb7xjlBz6BvP7C/Tt6Eughw+zvvjZnAmgRAwHHqt1hvTISrIgfwD7Oitd4Y4+CSxKv63zg/AKQRjqCq/hj7AADmodbsUpEkbn9nnwDgPNT6QpVbpP7PbwAJERfaWgIc7RsAwgjnNEASYPJrAAgengUmJAH0YtcAEGJwRgNk/hXsFgBCDHSf27/TaAnYAkDwUHflHpDsHgCGh6wt9YA/Bm4AmLHAE4gM3AKA85AdeChoDNwCwPBQFB3Ai4E7ABgxkCUHYGweAFkPsUHInwGgBiVBZeABQCQdQUsJQnkAcB4y3RKj0OSvACDEQBGjgLGXACI+IkiqBGQBIHgoSRaY7wAkrA04KgwlewcALgYDx1tgx8AsADgPJd4CiwUAiDgbiAIG5gGAxUA0TdNwRBV0nGEAwDd2jqRAsjAAYB5KHAWchwKAioHCUWDJ7G+XmAMQ4SSAq0DM/P5ijHORzMOhaTicgQcDzI+tnHMxEcWAIzhosts/ADgXEomHEn4fcTvTvw/7b4WI5yHr4E4w70x/ALCHkGBuINAM9PscaL0CzghMQAG8g9B84Pt2rcgwQvxQ4CRgyTjcfr0sESEAekQQ8ktOc5w7hXAvBj0MwDifam4WgPsTpwQAMACD0GwMCsCDDOFeChkoCC3GoAE4F9KtGDAQgGQMCYBzLtwCgJhgilQA03hrApgXuEQCMNbyAq11wAOABIMeno+MEQcAlhMJTEI0JTiACXg3EI0AuMF0SYVL44+3ABTI/k8IY4AAmN5mm25fD0AJSfKv8tPRJc+NH+6VsAOmZIudw5kdzk7fpftwyCQwKZ28tYvLu2R++ymCEgIOTcuDtda/PrhxyazxAywaD/CLibHWWh8z6pxxvQDPR8BXs0dKkKNCzvjQpFQhLqePi6G3y94lD66HSMsl5noen0lx2lIhY3zoxYRxVIHidTed4/q0M6cPvZ0KXIlmet9NVi6ZVq6XkHVzhSxSrQs0b3XOhkvY5Vhiy3SbMn28SBhgN9O/Mh2mRrKpEc3hLGUC1ogUvlS7KxM+qTBFUoFGEorVcV8gGjMxGlil60nl+n2daI6H0gSwPrTqJMA8WIz3xWpopbalPdkEX6dczwT10SpdAwDXyiX52W65AgAuVAv6w+XWF31RqZ52BOEcgKMdAPbd6PTlFP5iJYue70/fjqEfYKKwgWFVN/eUB7NcKw+uhSPmAMCfrrsabXQHAIQnywIeTscmlpHOQMoDZkEbj6rTS2i2AOAEELWa2eZNK5cu8QAiDfwKQDEBKDSIbwDlBCA1cyxPALFAAkslGddTet9ezZFtxdYjJJj1vHpjtfUID/xEa/Xi4QT4SHP55MEe2IPnLFCSGFw1/pFFufr+PzDi8f0hl++P+TQN//Kg0w+MejVNUzzspoeSYbdyJjBRPvr55YHHEgh1p06/uf0PjP3+wOAzdPRb/5f585OT+Pzw+yfG//8BUsAQ+7Jxz/gAAAAASUVORK5CYII="></img>
                                      (ETH) Ethereum</MenuItem>
                                    <MenuItem data-my-value="XLM" onClick={this.currencyChangeWithdraw}>
                                      <img className="cryptoBuddy_Logo" style={{width:"31px"}} src={stellarLogo}></img>
                                     (XLM) Stellar</MenuItem>
                                    <MenuItem data-my-value="USDT" onClick={this.currencyChangeWithdraw}>
                                      <img className="cryptoBuddy_Logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2326A17B'/%3E%3Cpath fill='%23FFF' d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'/%3E%3C/g%3E%3C/svg%3E"></img>
                                      (USDT) USDT</MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <button onClick={this.getOtp} className="trasnaction">Get OTP on email to proceed</button>
                            </div>
                            
                            
                              {
                                this.state.otpReceive &&
                                <div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <div className="trasnaction">Enter OTP:</div>
                              <div  className="form-group" style={{display:'flex'}}  >
                              
                              <input id="otp" type="text" onChange={this.saveData} className="form-input form-control text-left form-one-style" required placeholder='Enter your OTP' style={{paddingRight:'36px'}} />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <div className="trasnaction">Send funds to:</div>
                              <div  className="form-group" style={{display:'flex'}}  >
                              
                              <input id="withdrawAddress" type="text" onChange={this.saveData} className="form-input form-control text-left form-one-style" required placeholder='Enter your Ethereum Wallet Address' style={{paddingRight:'36px'}} />
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <button className="trasnaction"  onClick= {this.sendWithdrawData} >Submit</button>
                            </div>
                            </div>
                             }   
                          </div>
                          
                        </div>
                        
                        
                        <div className="col-md-12">

                          </div>

                            <br />
                            <br />
                            <div className="col-md-12" style={{marginTop:"40px"}}>
                          
                            <ul type = "disc">
                            Tips:

                          <li>- If you have deposited, please pay attention to the text messages, site letters and emails we send to you.</li>
                          <li>- Only send coin to this address. Sending any other assets to this address may result in loss of your deposit. </li>
                          <li>- SWAN tokens will be distributed after <strong>Dec 1st</strong></li>

                          </ul>
                            

                            </div>
                      </div>
                  
                     
                  
                  </div>
                </div>
                <div className="row">
                  
                </div>
                </div>
            </Modal.Body>
          </Modal>
        </div>
      <div className="static-modal">
      <Modal show={this.state.showDeposit} bsSize="large" onHide={this.hide} dialogClassName="myModal">
          <Modal.Header>
            <div className="col-sm-12 text-right" style={{marginBottom:"-30px", marginTop:"10px"}}>
                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ showDeposit:false, curr:'', currAddress:'',url:logo })}}></i>
            </div>
          <Modal.Title>
            <div className='text-center' style={{marginBottom:"-20px"}}><h2>Deposit</h2></div>
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
              <div className="row">
                  <div className="col-sm-12" >

                      <div className="row">
                        <div className="col-md-4" >
                          <div className="qr-code" style={{marginTop:"45px" }}>
                            <img src={this.state.url} style={{width:"145px" }}   alt="" />
                          </div>
                        </div>
                        <div className = "col-md-8" style={{marginTop:"20px"}}>
                          <div className="row">
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <div className="transaction-container">Select your currency</div>
                              <div className="form-group">
                                
                                {/* <span className="select-wrapper">
                                  <select id="paymentMode" name="paymentMode" onChange={this.currencyChange} className="form-input form-one-style" required>
                                    <option value="" hidden>Click for options...</option>
                                    <option value="BTC">Bitcoin</option>
                                    <option value="ETH">Ethereum</option>
                                    <option value="XLM">Stellar</option>
                                    <option value="USDT">USDT</option>
                                  </select>
                                </span>                                      */}
                                <Dropdown className="currency-dropdown" disabled = {this.state.iswalletCreating} >
                                  <Button className="currency-button" variant="success">{this.state.curr?this.state.curr:'Click for options...'}</Button>
                                  <Dropdown.Toggle className="currency-dropdown-toggle" split variant="success" id="dropdown-split-basic"/>
                                  <Dropdown.Menu className="currency-menu" >
                                    <MenuItem data-my-value="BTC" onClick={this.currencyChange}>
                                      <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAS1BMVEVHcEz4lBr4lhv/miT4lBr7lRz/szP4kxr4lBr4lBr9lx35lBr4kxr6lRv3kxr////++PH+7Nf937z7xIL80Z74pkL6uWr3min5r1Xgn4fZAAAADnRSTlMAq0YP7TkFwNaKHXj6XnPArAgAAASxSURBVHjazVvdmqsgDKy/qLUBBNT3f9Jz0e7ZaqlMEFdz269NCpNkEpLbLUaK6tFmQjRN2fdl0wiRtY+quP2JFHkrSlpJT0REpWjzY62o81b0tCm9aPP6IPVVWxIkZVul197dG2JIc+/S/vmM2JKlO4ZKUJSINCbkkeqJiES+/+4z2iXZPizU95J2Snnf4ZVVQwmkiYVC3VIiaaMOoROUTEQEEvKSEkrJdoeWEkvLu/6MkkvGAEIh6AARcKoumiP0U9+AFnTH6CeipjtXPxFyBsWB+hELanGkfupFyBcyOliyP44/zIiUc39tGIzjfmcjKnfs+K+klGowEysvdOkAOMunTLyQWCcDgHnq109rBjPvgkHFB9TwNMASEZF9XgeCCS9HqiMikHoaMBIRkX63JhCPfJdw5+tfQGCS79YE5J7CA9YQ4ADS4wlQCLTajm4DAv+t4QdELARpKaVU/42IhYAvHEEh4OeapdR2dDsgQEQixgVn+S5KR0Pg0xWxGGilT4YICKyPAIxB2mvAM/owIbA6AowFTPK7KCYElo7QYd+YzKBkQDhpqYsJgs7oTQMsgx78hkNeFhi3z0DDt9DEpkETuAZlmDDk8oApBASpMWLw4gU1Ow3JsEDuWNZxTHReos7vG3qCEwKbiS0wMH/zDcSClhGGP4nY0vGdVd4QHQ7HRR9JxNaxf1qnirA/9kUMBNxXsM3LQ9AYCBJA4JsFIwSCNBDwxigLgaBMBIHPDwEYlrdbkQ4CH5QBAEHBr4c2ILC+H8CA6vZICQH+CTz4TrAJgYkbilp2T2YbAstYBKTljO2FZsvRV1zFIcFY7IGA1HacvtJ2hKKLW7MDAj+s3JpxHD+zMkKMGq4BTsIC1SgNNxAaWL+C+HF56/dAYEs/Rgt7rgEK1D+AFUrPvALnK8c8sJzRHyyZIFwmgmn2E1KD/yDXCzyJYLYeQupwA0SCRPBJSBXeKBFpEoFRbEb6MiCLh8AyD645MYbDjJeON7nAKhMpsDx87IfAFwsgX3iwKJkLUN6BnwsqFik1gTt2bDpABYuWD6FukOLCsIQKE6ftPK3Lch3u442IFyKlmZVSSj0M4aqHW5lRixSnkzfpzGG2AlxBjpTnBm4IWi4I+wJpUGiUbznFjUQCadHM/pSvP57IVvqxsgRoUm2QsOH3/WQabQQryIE2XZAGKz0M2nNNKkzKXm26wB04oEUd2Sls4VZtjBEOSQScZjXTCOAAGn673sFlAdKmvHMfLBh1CVQWdRGDG69LsFbvL4uyiIdz9wswN34/DYyVV/xnu5+0oDZCpJQaGqjoRczswOKx+Ofp2tg399AWrQiqiKfb5WPxwprJzfM8O/zRTMQ8XrtFjFHsl8LPNMB8u/RCYIrSn0UNMHghEKXfN8pz3wMBrtyjhljSQcA7xAInxQQQqHYMMjljdkOgTTHKtQMC32cKOaM8L3owpvGAyHE+Z4YpQQi60kDj+SOdRw+1UnCo9dix3v7swWJouLs+e7T7uOHuBh+vP3m8//wFh/NXPC6w5HL+ms/5i07nr3pdYNnt/HW/Cyw8XmDl8wJLrxdY+73A4vMVVr83lt9f//zw5fcj1v//AUJgzq1BOb7uAAAAAElFTkSuQmCC"></img>
                                      (BTC) Bitcoin</MenuItem>
                                    <MenuItem data-my-value="ETH" onClick={this.currencyChange}>
                                      <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAQlBMVEVHcExnge9if+tjf+xifutif+tvgvZjf+tkgexjgOtifurAy/b///+Bl+78/P5rheuSpfCltfO1wvV1ju3s7/zX3vmZ+KnyAAAACnRSTlMAHPpp1u0KuT+IQ31QMAAABPlJREFUeNrNW1uiqyAMVFTeIKDuf6v3o6etD9Qk0NuyABnJZBJC0jSUxWWnhBB9PzA29L0QQnWSN/9lcanEoDXTTK8W00zrQagPo+BSic2+x8U+CEKqQYPWoGT93VvVa8TqVVv354VGLyFrbs/wAFgtCJS/r3gKbcH2WmstyrjAu6Fsf81YV3L6va6werIdlK601FesX8oEOeiKa5BfO36iGUTt/TUTiBjFMdIXXHUELcb7xjlBz6BvP7C/Tt6Eughw+zvvjZnAmgRAwHHqt1hvTISrIgfwD7Oitd4Y4+CSxKv63zg/AKQRjqCq/hj7AADmodbsUpEkbn9nnwDgPNT6QpVbpP7PbwAJERfaWgIc7RsAwgjnNEASYPJrAAgengUmJAH0YtcAEGJwRgNk/hXsFgBCDHSf27/TaAnYAkDwUHflHpDsHgCGh6wt9YA/Bm4AmLHAE4gM3AKA85AdeChoDNwCwPBQFB3Ai4E7ABgxkCUHYGweAFkPsUHInwGgBiVBZeABQCQdQUsJQnkAcB4y3RKj0OSvACDEQBGjgLGXACI+IkiqBGQBIHgoSRaY7wAkrA04KgwlewcALgYDx1tgx8AsADgPJd4CiwUAiDgbiAIG5gGAxUA0TdNwRBV0nGEAwDd2jqRAsjAAYB5KHAWchwKAioHCUWDJ7G+XmAMQ4SSAq0DM/P5ijHORzMOhaTicgQcDzI+tnHMxEcWAIzhosts/ADgXEomHEn4fcTvTvw/7b4WI5yHr4E4w70x/ALCHkGBuINAM9PscaL0CzghMQAG8g9B84Pt2rcgwQvxQ4CRgyTjcfr0sESEAekQQ8ktOc5w7hXAvBj0MwDifam4WgPsTpwQAMACD0GwMCsCDDOFeChkoCC3GoAE4F9KtGDAQgGQMCYBzLtwCgJhgilQA03hrApgXuEQCMNbyAq11wAOABIMeno+MEQcAlhMJTEI0JTiACXg3EI0AuMF0SYVL44+3ABTI/k8IY4AAmN5mm25fD0AJSfKv8tPRJc+NH+6VsAOmZIudw5kdzk7fpftwyCQwKZ28tYvLu2R++ymCEgIOTcuDtda/PrhxyazxAywaD/CLibHWWh8z6pxxvQDPR8BXs0dKkKNCzvjQpFQhLqePi6G3y94lD66HSMsl5noen0lx2lIhY3zoxYRxVIHidTed4/q0M6cPvZ0KXIlmet9NVi6ZVq6XkHVzhSxSrQs0b3XOhkvY5Vhiy3SbMn28SBhgN9O/Mh2mRrKpEc3hLGUC1ogUvlS7KxM+qTBFUoFGEorVcV8gGjMxGlil60nl+n2daI6H0gSwPrTqJMA8WIz3xWpopbalPdkEX6dczwT10SpdAwDXyiX52W65AgAuVAv6w+XWF31RqZ52BOEcgKMdAPbd6PTlFP5iJYue70/fjqEfYKKwgWFVN/eUB7NcKw+uhSPmAMCfrrsabXQHAIQnywIeTscmlpHOQMoDZkEbj6rTS2i2AOAEELWa2eZNK5cu8QAiDfwKQDEBKDSIbwDlBCA1cyxPALFAAkslGddTet9ezZFtxdYjJJj1vHpjtfUID/xEa/Xi4QT4SHP55MEe2IPnLFCSGFw1/pFFufr+PzDi8f0hl++P+TQN//Kg0w+MejVNUzzspoeSYbdyJjBRPvr55YHHEgh1p06/uf0PjP3+wOAzdPRb/5f585OT+Pzw+yfG//8BUsAQ+7Jxz/gAAAAASUVORK5CYII="></img>
                                      (ETH) Ethereum</MenuItem>
                                    <MenuItem data-my-value="XLM" onClick={this.currencyChange}>
                                      <img className="cryptoBuddy_Logo" style={{width:"31px"}} src={stellarLogo}></img>
                                     (XLM) Stellar</MenuItem>
                                    <MenuItem data-my-value="USDT" onClick={this.currencyChange}>
                                      <img className="cryptoBuddy_Logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2326A17B'/%3E%3Cpath fill='%23FFF' d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'/%3E%3C/g%3E%3C/svg%3E"></img>
                                      (USDT) USDT</MenuItem>
                                  </Dropdown.Menu>
                                </Dropdown>
                              </div>
                            </div>
                            <div className="col-sm-12 col-md-12 col-lg-12">
                              <div className="trasnaction">Your Wallet Address</div>
                              <div  className="form-group" style={{display:'flex'}}  >
                              
                              <input id="fromAddress" type="text" value={this.state.currAddress} className="form-input form-control text-left form-one-style" required placeholder='Enter your Ethereum Wallet Address' style={{paddingRight:'36px'}} />
                              <CopyToClipboard text={this.state.currAddress}
                              onCopy={() => { this.state.currAddress.length > 0 ? (
                                this.setState({copied: true}), toast.success("Copied") )
                               : ''
                              }}
                              
                              >
                              <span  className= {this.state.currAddress.length<=0 ? "file-copy-conatiner disable-cursor" : "file-copy-conatiner"} style = {{height : '-webkit-fill-available',position:'relative',right:'40px',border:'none'}}  >
                              <FileCopyOutlinedIcon
                                style={{ outline : 'none' ,fontSize : '20px'  }}
                                
                                />
                              </span>
                            </CopyToClipboard>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                        
                        
                        <div className="col-md-12">

                          </div>

                            <br />
                            <br />
                            <div className="col-md-12" style={{marginTop:"40px"}}>
                          
                            <ul type = "disc">
                            Tips:

                          <li>- If you have deposited, please pay attention to the text messages, site letters and emails we send to you.</li>
                          <li>- Only send coin to this address. Sending any other assets to this address may result in loss of your deposit. </li>
                          <li>- SWAN tokens will be distributed after <strong>Dec 1st</strong></li>

                          </ul>
                            

                            </div>
                      </div>
                  
                     
                  
                  </div>
                </div>
                <div className="row">
                  
                </div>
                </div>
            </Modal.Body>
          </Modal>
          <Modal show={this.state.showEthWalletCreate} bsSize="large" onHide={this.hide} dialogClassName="myModal">
          <Modal.Header>
            <div className="col-sm-12 text-right" style={{marginBottom:"-30px", marginTop:"10px"}}>
                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ showEthWalletCreate:false })}}></i>
            </div>
          <Modal.Title>
            {
            
            language==='chinese'? <div className='text-center' style={{marginBottom:"-20px"}}>{this.state.cenxWalletAddress?<h2>这是您的帐户详细信息</h2>:<h2>创建您的CENX以太坊钱包</h2>}</div>
            :
            <div className='text-center' style={{marginBottom:"-20px"}}>{this.state.cenxWalletAddress?<h2>Here are your account details</h2>:<h2>Create you CENX Ethereum Wallet</h2>}</div>
            }
            </Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
              <div className="row">
                  <div className="col-sm-12" >{this.state.cenxWalletAddress?

                      <div className="row">
                      <div className="col-md-4" >
                      <div className="qr-code" style={{}}>
                        <img src={this.state.url} alt="" />
                  </div>
                        </div>
                        <div className = "col-md-8" style={{marginTop:"20px"}}>
                        <h3>{language==='chinese'?'钱包地址:':'Wallet Address:'} &nbsp;
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
                            </h3>
                      <h4>
                      {this.state.cenxWalletAddress} 
                            </h4>
                      <br />

 
                            
                            <button className="btn-primary" onClick={this.downloadTxtFile}>{language==='chinese'?'出口账户明细':'Export Account details'}</button>
                          
                        </div>
                        
                        
                        <div className="col-md-12">

                          </div>

                      <br />
                      <br />
                      <div className="col-md-12" style={{marginTop:"40px"}}>
                      {
                        language==='chinese'?<h5>说明：存储您的钱包详细信息。<strong>不要与任何人共享钱包的私钥。</strong> <div style={{color:"red"}}>输入此以太坊地址以购买以太币</div></h5>
                        :
                        <h5>Instruction: Store your wallet details.<strong> Don't share your wallet's Private Key with anyone.</strong> <div style={{color:"red"}}>Enter this Ethereum address in for buying ethers</div></h5>
                      }
                      
                      {
                        language==='chinese' 
                        ?
                        <ul type = "disc">                       
                          提示：

                      <li>- 如果您已存入，请注意我们发送给您的短信，网站信函和电子邮件。</li>
                      <li>- 仅将硬币发送到该地址。将任何其他资产发送到此地址可能会导致您的押金丢失。 </li>
                      <li>- CENX令牌将于12月1日之后分发</li>

                      </ul>
                      :
                      <ul type = "disc">
                      Tips:

                    <li>- If you have deposited, please pay attention to the text messages, site letters and emails we send to you.</li>
                    <li>- Only send coin to this address. Sending any other assets to this address may result in loss of your deposit. </li>
                    <li>- SWAN tokens will be distributed after <strong>Dec 1st</strong></li>

                    </ul>
                      }

                      </div>
                      </div>
                  :
                  <div className="row">
                    <div className="col-md-4">
                    <div className="qr-code" style={{ }}>
                        <img src="https://cdn1.centralex.io/images/tokensale/CBLogoMd.png" alt="" />
                  </div>
                    </div>
                    <div className="col-md-8">
                    <button className="form-button btn-primary" style={{textAlign:"center", marginTop:"50px"}} onClick={()=>this.createCenxWallet()} >{language==='chinese'?'点击生成':'Click to Generate'}</button>
                    </div>
                  </div>
                  
                     
                  }
                  </div>
                </div>
                <div className="row">
                  
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
            <div className="col-sm-8 col-md-8 col-lg-9">
          <div className="balance-card" style={{ marginBottom : '2em', height:"280px" }}>
            <div className="row">
              <div className="col-sm-12 col-md-5">
                  {/* <h4 className="wallet-panel-heading" style={{ paddingLeft: '20px',paddingTop: '10px' }}>Wallet</h4> */}
                  <div className="customCard-header transaction-container">
                        <h2 className="trasnaction">Wallets</h2>
                      </div>  
                  </div>
                  {/* <div className="col-md-7" style={{textAlign:"right"}}>
                  <div className="ico-details-middle">
                  <img src="https://cdn1.centralex.io/images/tokensale/littleStar.svg" style={{marginRight:'-400px', marginTop:"19px"}} />
                  <img src="https://cdn1.centralex.io/images/tokensale/bigStar.svg" style={{marginTop:'5px', marginLeft:'100px' }} />
                    <img src="https://cdn1.centralex.io/images/tokensale/Planet.svg" style={{marginLeft:"300px"}} />
                  
                    
                      <img src="https://cdn1.centralex.io/images/tokensale/littleStar.svg" style={{marginLeft:'100px', marginTop:'5px'}} />
                      <img src="https://cdn1.centralex.io/images/tokensale/littleStar.svg" style={{marginRight:'-50px', marginTop:'15px'}} />
                  <img src="https://cdn1.centralex.io/images/tokensale/bigStar.svg" style={{marginTop:'5px', float : 'right' }} />
                    
                  </div>
                  
                  {/* <img src={Ellipse} className="ellipse-one"/>
                  <img src={Ellipse} className="ellipse-two" /> 
                  
                </div> */}
              </div>
              {/* <hr className="contribution-hr" /> */}
            
              <div style={{ paddingLeft: '20px',paddingTop: '10px' }}>          
            <div className="row">
              <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="kyc-status" style={{marginTop:"3px"}}>Account Balance:</div>
              <div className="col-sm-12 col-md-12 col-lg-12">$ {((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance)+(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance))+(this.state.ethToDollar*this.state.ethBalance)).toFixed(2)}
              </div>  
              <br />
              <br />
              <div className="kyc-status" style={{marginTop:"0px"}}>Swan Balance:</div>
              <div className="col-sm-12 col-md-12 col-lg-12">{this.state.swanBalance} SWAN</div>              
              </div>
              <div className="col-sm-4 col-md-4 col-lg-4">
              <div className="balance-botton-inner-wrapper" >
                      <h5
                        style={{
                          font: "normal normal bold 20px/24px Lato",
                          letterSpacing: "0.43px",
                          color: "#B0C9F0",
                          opacity: 1,
                          //marginTop: 0,
                          fontSize: "16px",
                        }}
                      >
                       Balance Percentage 
                      </h5>
                      <div className="account-balance-statistics" style={{marginTop:'30px'}}>
                      <div style={{ width : '90px' }}>
                      <CircularProgressbarWithChildren value={Math.round((this.state.ethToDollar*this.state.ethBalance*100)/((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance)+(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance))+(this.state.ethToDollar*this.state.ethBalance)))}
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
                           {Math.round((this.state.ethToDollar*this.state.ethBalance*100)/((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance)+(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance))+(this.state.ethToDollar*this.state.ethBalance)))}%  <strong><br /> ETH</strong>
                        </div>
                      </CircularProgressbarWithChildren>
                      </div>
                      <div className="balance-hr" />
                      {/* <div style={{ width : '90px' }}>
                      <CircularProgressbarWithChildren value={10}
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
                           10% <strong><br /> Refers</strong>
                        </div>

                        
                      </CircularProgressbarWithChildren>
                      </div> */}
                      <div className="eth-other-balance-stats">
                      <div style={{ display : 'flex' }}>
                      <div style={{ width : '50px' }}>
                      <CircularProgressbar value={Math.round((this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance)*100)/((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance)+(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance))+(this.state.ethToDollar*this.state.ethBalance)))}
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
                      <span className="main-color--blue ">{Math.round((this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance)*100)/((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance)+(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance))+(this.state.ethToDollar*this.state.ethBalance)))}%</span>   
                        <br />
                        <span className="main-color--blue font-weight-bold ">BTC</span>
                        </span>
                     
                      </div>
                      <div style={{ display : 'flex' , marginTop : '10px' }}>
                      <div style={{ width : '50px' }}>
                      <CircularProgressbar value={Math.round(((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance))*100/((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance)+(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance))+(this.state.ethToDollar*this.state.ethBalance)))}
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
                      <span className="main-color--blue ">{Math.round(((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance))*100/((this.state.usdtToDollar*this.state.usdtBalance/1000000)+(this.state.xlmToDollar*this.state.xlmBalance)+(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance))+(this.state.ethToDollar*this.state.ethBalance)))}%</span>   
                        <br />
                        <span className="main-color--blue font-weight-bold ">Others</span>
                        </span>
                     
                      </div>
                      </div>
                      </div>
                    </div>          
              </div>
              
              <div className="col-sm-4 col-md-4 col-lg-4 deposit-container">
                <div className="wallet-deposit" style={{backgroundColor:"#D6E4FE", marginLeft:"50px", cursor:"pointer", padding:"7px", marginTop:"10px",boxShadow: '2px 9px 9px darkgrey',color:'#2D6DCD',fontWeight:'bold'}} onClick={this.openDeposit}><i className="fa fa-plus-circle" style={{color:'rgb(45, 109, 205)',margin:'0px 10px'}}></i>Deposit</div>
                <br />
                <div className="wallet-withdraw" style={{backgroundColor:"#D6E4FE", marginLeft:"50px", cursor:"pointer", padding:"7px",boxShadow: '2px 9px 9px darkgrey',color:'#2D6DCD',fontWeight:'bold'}} onClick={this.openWithdraw}><i className="fa fa-minus-circle" style={{color:'rgb(45, 109, 205)',margin:'0px 10px'}}></i>Withdraw</div>
              </div>
              

              
              


            </div>
             
            </div>


            </div>
            {/* {
                language==='chinese'? <h5 className="glow-text" style={{margin:"15px", marginTop:"-85px", fontSize:"17px"}}>说明：存储您的钱包详细信息。不要与任何人共享钱包的私钥。 <div style={{color:"red"}}>输入此以太坊地址以购买以太币</div></h5>
                :
                <h5 className="glow-text" style={{margin:"15px", marginTop:"-85px", fontSize:"17px"}}>Instruction: Store your wallet details. Don't share your wallet's Private Key with anyone. <div style={{color:"red"}}>Enter this Ethereum address in for buying ethers</div></h5>
              } */}
            

        {/* <Footer/> */}
        </div>
        <div className="col-sm-4 col-md-4 col-lg-3">
        <div className="balance-card" style={{ marginBottom : '2em', height:"280px",padding:10}}>
            <div className="row" style={{ marginLeft:"10px" }}>
            <div className="customCard-header transaction-container">
                        <h2 className="trasnaction">Referrals</h2>
                      </div>  
                      
                  
              </div>
              <br/><br/>
              <div className="col-sm-12"><h3 style={{ marginLeft:"10px" }}>USD 0</h3></div>
              <h4 style={{ marginLeft:"20px" }}>You don't have any referral earning</h4>
            </div>
        </div>

          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="balance-card" style={{ marginBottom : '2em', height:"380px" }}>
              <div className="row">
                <div className="col-sm-12" style={{paddingLeft:"20px"}}>
                  <div className="customCard-header transaction-container">
                    <h2 className="trasnaction">Total Portfolio</h2>
                  </div>
                </div>
                <div className="col-sm-12 col-md-12 col-lg-12">
                <div className="col-sm-12 col-md-12 col-lg-12" className="wallet-table-heading" style={{backgroundColor:"#C2CBF2", cursor:"pointer", padding:"7px", marginTop:"10px",display:'flex'}}>
                  <div className="col-sm-2 col-md-2 col-lg-2" style={{color:"#465490", fontWeight:"bold", textAlign:"left",  marginLeft:"5px"}}>
                    Name
                  </div>
                  <div className="col-sm-2 col-md-2 col-lg-2" style={{color:"#465490", fontWeight:"bold", textAlign:"center",  marginLeft:"5px"}}>
                    Balance
                  </div>
                  <div className="col-sm-2 col-md-2 col-lg-2" style={{color:"#465490", fontWeight:"bold", textAlign:"center",  marginLeft:"5px"}}>
                    USD Value
                  </div>
                 
                </div>
                
                <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"left"}}>
                  <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAS1BMVEVHcEz4lBr4lhv/miT4lBr7lRz/szP4kxr4lBr4lBr9lx35lBr4kxr6lRv3kxr////++PH+7Nf937z7xIL80Z74pkL6uWr3min5r1Xgn4fZAAAADnRSTlMAq0YP7TkFwNaKHXj6XnPArAgAAASxSURBVHjazVvdmqsgDKy/qLUBBNT3f9Jz0e7ZaqlMEFdz269NCpNkEpLbLUaK6tFmQjRN2fdl0wiRtY+quP2JFHkrSlpJT0REpWjzY62o81b0tCm9aPP6IPVVWxIkZVul197dG2JIc+/S/vmM2JKlO4ZKUJSINCbkkeqJiES+/+4z2iXZPizU95J2Snnf4ZVVQwmkiYVC3VIiaaMOoROUTEQEEvKSEkrJdoeWEkvLu/6MkkvGAEIh6AARcKoumiP0U9+AFnTH6CeipjtXPxFyBsWB+hELanGkfupFyBcyOliyP44/zIiUc39tGIzjfmcjKnfs+K+klGowEysvdOkAOMunTLyQWCcDgHnq109rBjPvgkHFB9TwNMASEZF9XgeCCS9HqiMikHoaMBIRkX63JhCPfJdw5+tfQGCS79YE5J7CA9YQ4ADS4wlQCLTajm4DAv+t4QdELARpKaVU/42IhYAvHEEh4OeapdR2dDsgQEQixgVn+S5KR0Pg0xWxGGilT4YICKyPAIxB2mvAM/owIbA6AowFTPK7KCYElo7QYd+YzKBkQDhpqYsJgs7oTQMsgx78hkNeFhi3z0DDt9DEpkETuAZlmDDk8oApBASpMWLw4gU1Ow3JsEDuWNZxTHReos7vG3qCEwKbiS0wMH/zDcSClhGGP4nY0vGdVd4QHQ7HRR9JxNaxf1qnirA/9kUMBNxXsM3LQ9AYCBJA4JsFIwSCNBDwxigLgaBMBIHPDwEYlrdbkQ4CH5QBAEHBr4c2ILC+H8CA6vZICQH+CTz4TrAJgYkbilp2T2YbAstYBKTljO2FZsvRV1zFIcFY7IGA1HacvtJ2hKKLW7MDAj+s3JpxHD+zMkKMGq4BTsIC1SgNNxAaWL+C+HF56/dAYEs/Rgt7rgEK1D+AFUrPvALnK8c8sJzRHyyZIFwmgmn2E1KD/yDXCzyJYLYeQupwA0SCRPBJSBXeKBFpEoFRbEb6MiCLh8AyD645MYbDjJeON7nAKhMpsDx87IfAFwsgX3iwKJkLUN6BnwsqFik1gTt2bDpABYuWD6FukOLCsIQKE6ftPK3Lch3u442IFyKlmZVSSj0M4aqHW5lRixSnkzfpzGG2AlxBjpTnBm4IWi4I+wJpUGiUbznFjUQCadHM/pSvP57IVvqxsgRoUm2QsOH3/WQabQQryIE2XZAGKz0M2nNNKkzKXm26wB04oEUd2Sls4VZtjBEOSQScZjXTCOAAGn673sFlAdKmvHMfLBh1CVQWdRGDG69LsFbvL4uyiIdz9wswN34/DYyVV/xnu5+0oDZCpJQaGqjoRczswOKx+Ofp2tg399AWrQiqiKfb5WPxwprJzfM8O/zRTMQ8XrtFjFHsl8LPNMB8u/RCYIrSn0UNMHghEKXfN8pz3wMBrtyjhljSQcA7xAInxQQQqHYMMjljdkOgTTHKtQMC32cKOaM8L3owpvGAyHE+Z4YpQQi60kDj+SOdRw+1UnCo9dix3v7swWJouLs+e7T7uOHuBh+vP3m8//wFh/NXPC6w5HL+ms/5i07nr3pdYNnt/HW/Cyw8XmDl8wJLrxdY+73A4vMVVr83lt9f//zw5fcj1v//AUJgzq1BOb7uAAAAAElFTkSuQmCC"></img>
                    Bitcoin
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    {this.satoshi_to_btc(this.state.btcBalance).toFixed(2)} BTC
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    $ {(this.state.btcToDollar*this.satoshi_to_btc(this.state.btcBalance)).toFixed(2)}
                  </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>

                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openDeposit}>Deposit</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openWithdraw}>Withdraw</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary-green wallet-button" style={{backgroundColor:"green"}} onClick={()=> window.location.href = '/dashboard/contribution'}>Buy SWAN</button>
                  </div>


                </div>
                
                <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>
                  <div className="col-sm-2 col-md-4 col-lg-4 ethereum-text"  style={{color:"#99A3B7", fontWeight:"bold", textAlign:"left"}}>
                    <img className="cryptoBuddy_Logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAAAQlBMVEVHcExnge9if+tjf+xifutif+tvgvZjf+tkgexjgOtifurAy/b///+Bl+78/P5rheuSpfCltfO1wvV1ju3s7/zX3vmZ+KnyAAAACnRSTlMAHPpp1u0KuT+IQ31QMAAABPlJREFUeNrNW1uiqyAMVFTeIKDuf6v3o6etD9Qk0NuyABnJZBJC0jSUxWWnhBB9PzA29L0QQnWSN/9lcanEoDXTTK8W00zrQagPo+BSic2+x8U+CEKqQYPWoGT93VvVa8TqVVv354VGLyFrbs/wAFgtCJS/r3gKbcH2WmstyrjAu6Fsf81YV3L6va6werIdlK601FesX8oEOeiKa5BfO36iGUTt/TUTiBjFMdIXXHUELcb7xjlBz6BvP7C/Tt6Eughw+zvvjZnAmgRAwHHqt1hvTISrIgfwD7Oitd4Y4+CSxKv63zg/AKQRjqCq/hj7AADmodbsUpEkbn9nnwDgPNT6QpVbpP7PbwAJERfaWgIc7RsAwgjnNEASYPJrAAgengUmJAH0YtcAEGJwRgNk/hXsFgBCDHSf27/TaAnYAkDwUHflHpDsHgCGh6wt9YA/Bm4AmLHAE4gM3AKA85AdeChoDNwCwPBQFB3Ai4E7ABgxkCUHYGweAFkPsUHInwGgBiVBZeABQCQdQUsJQnkAcB4y3RKj0OSvACDEQBGjgLGXACI+IkiqBGQBIHgoSRaY7wAkrA04KgwlewcALgYDx1tgx8AsADgPJd4CiwUAiDgbiAIG5gGAxUA0TdNwRBV0nGEAwDd2jqRAsjAAYB5KHAWchwKAioHCUWDJ7G+XmAMQ4SSAq0DM/P5ijHORzMOhaTicgQcDzI+tnHMxEcWAIzhosts/ADgXEomHEn4fcTvTvw/7b4WI5yHr4E4w70x/ALCHkGBuINAM9PscaL0CzghMQAG8g9B84Pt2rcgwQvxQ4CRgyTjcfr0sESEAekQQ8ktOc5w7hXAvBj0MwDifam4WgPsTpwQAMACD0GwMCsCDDOFeChkoCC3GoAE4F9KtGDAQgGQMCYBzLtwCgJhgilQA03hrApgXuEQCMNbyAq11wAOABIMeno+MEQcAlhMJTEI0JTiACXg3EI0AuMF0SYVL44+3ABTI/k8IY4AAmN5mm25fD0AJSfKv8tPRJc+NH+6VsAOmZIudw5kdzk7fpftwyCQwKZ28tYvLu2R++ymCEgIOTcuDtda/PrhxyazxAywaD/CLibHWWh8z6pxxvQDPR8BXs0dKkKNCzvjQpFQhLqePi6G3y94lD66HSMsl5noen0lx2lIhY3zoxYRxVIHidTed4/q0M6cPvZ0KXIlmet9NVi6ZVq6XkHVzhSxSrQs0b3XOhkvY5Vhiy3SbMn28SBhgN9O/Mh2mRrKpEc3hLGUC1ogUvlS7KxM+qTBFUoFGEorVcV8gGjMxGlil60nl+n2daI6H0gSwPrTqJMA8WIz3xWpopbalPdkEX6dczwT10SpdAwDXyiX52W65AgAuVAv6w+XWF31RqZ52BOEcgKMdAPbd6PTlFP5iJYue70/fjqEfYKKwgWFVN/eUB7NcKw+uhSPmAMCfrrsabXQHAIQnywIeTscmlpHOQMoDZkEbj6rTS2i2AOAEELWa2eZNK5cu8QAiDfwKQDEBKDSIbwDlBCA1cyxPALFAAkslGddTet9ezZFtxdYjJJj1vHpjtfUID/xEa/Xi4QT4SHP55MEe2IPnLFCSGFw1/pFFufr+PzDi8f0hl++P+TQN//Kg0w+MejVNUzzspoeSYbdyJjBRPvr55YHHEgh1p06/uf0PjP3+wOAzdPRb/5f585OT+Pzw+yfG//8BUsAQ+7Jxz/gAAAAASUVORK5CYII="></img>
                    Ethereum
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    {(1*this.state.ethBalance).toFixed(2)} ETH
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    $ {(this.state.ethToDollar*this.state.ethBalance).toFixed(2)}
                  </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>
                  
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openDeposit}>Deposit</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openWithdraw}>Withdraw</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary-green wallet-button" style={{backgroundColor:"green"}} onClick={()=> window.location.href = '/dashboard/contribution'}>Buy SWAN</button>
                  </div>
                </div>



                <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"left"}}>
                    <img className="cryptoBuddy_Logo" style={{width:"31px"}} src={stellarLogo}></img>
                    Stellar
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    {Math.round(this.state.xlmBalance)} XLM
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    $ {(this.state.xlmToDollar*this.state.xlmBalance).toFixed(2)}
                  </div>

                  </div>

                  <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>

                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openDeposit}>Deposit</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openWithdraw}>Withdraw</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary-green wallet-button" style={{backgroundColor:"green"}} onClick={()=> window.location.href = '/dashboard/contribution'}>Buy SWAN</button>
                  </div>
                </div>



                <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"left"}}>
                    <img className="cryptoBuddy_Logo" src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Ccircle cx='16' cy='16' r='16' fill='%2326A17B'/%3E%3Cpath fill='%23FFF' d='M17.922 17.383v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657m0-3.59v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117'/%3E%3C/g%3E%3C/svg%3E"></img>
                    USDT
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    {this.state.usdtBalance/1000000} USDT
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4" style={{color:"#99A3B7", fontWeight:"bold", textAlign:"center"}}>
                    $ {(this.state.usdtToDollar*this.state.usdtBalance/1000000).toFixed(2)}
                  </div>
                  </div>
                  <div className="col-sm-12 col-md-6 col-lg-6 wallet-portfolio-card" style={{marginTop:"20px",display:'flex'}}>

                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openDeposit}>Deposit</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary wallet-button" onClick={this.openWithdraw}>Withdraw</button>
                  </div>
                  <div className="col-sm-2 col-md-4 col-lg-4 wallet-button-div" style={{fontWeight:"bold", textAlign:"center"}}>
                    <button className="btn btn-primary-green wallet-button" style={{backgroundColor:"green"}} onClick={()=> window.location.href = '/dashboard/contribution'}>Buy SWAN</button>
                  </div>
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


WalletPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  walletpage: makeSelectWalletPage(),
  // contributionCurrency: makeSelectContributionCurrency(),
  successData: makeSelectContributionData(),
  // successPayment: makeSelectContributionSuccess(),
  // successNotPayment : makeSelectContributionNotSuccess(),
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
  walletFetchedSuccess: makeSelectWalletFetchedSuccess(),
  otpdata : makeSelectGetOtp(),
  // sendWithdrawData : makeSelectSendWithdraw(),
  sendWithdrawRet : makeSelectSendWithdrawRet()

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    // selectCurrency: () => (dispatch(selectAction())),
    getData: () => (dispatch(getData())),
    // confirmPayment: (data) => (dispatch(confirmPayment(data))),
    addCenxWallet: (data) => (dispatch(addCenxWallet(data))),
    getCenxWallet: () => (dispatch(getCenxWallet())),
    // reload: () => (dispatch(reload())),
    // finalizePayment: (data) => (dispatch(finalizePayment(data))),
    listHotWallet : data => dispatch(listHotWallet(data)),
    createHotWallet : data => dispatch(createHotWallet(data)),
    clearContribution : _ => dispatch(clearContribution()),
    getOtp : () => dispatch(getOtp()),
    sendWithdrawData : (data) => dispatch(sendWithdrawData(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'walletPage', reducer });
const withSaga = injectSaga({ key: 'walletPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(WalletPage);


