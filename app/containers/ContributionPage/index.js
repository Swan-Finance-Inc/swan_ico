/**
 *
 * ContributionPage
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
import makeSelectContributionPage, {makeSelectTransactionId, makeSelectContributionCurrency, makeSelectContributionData, makeSelectContributionSuccess,makeSelectContributionNotSuccess, makeSelectLoading ,
makeSelectGetHotWalletLoading, makeSelectGetHotWalletRet,makeSelectCreateHotWalletRet,
makeSelectCreateHotWalletLoading
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectAction, getData, confirmPayment, reload,finalizePayment,listHotWallet,
  createHotWallet ,clearContribution } from './actions';
import { ContributionConfirm } from '../ContributionConfirm';
import { makeGlobalParent } from '../App/selectors';
import makeSelectDashBoardWelcomePage from '../DashBoardWelcomePage/selectors';
import { Helmet } from 'react-helmet';
import {LoadingSpinner} from 'components/LoadingSpinner/Loadable';
import Web3 from 'web3';
import { Modal } from 'react-bootstrap';
import Info from "../../components/Info";
export class ContributionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // Begin constructor
  constructor(props) {
    super(props);
    this.state = {
      //@aj
      infoShow: false,
      confirmContri: false,
      usdEurContributionConfirm: false,
      curr: '',
      btcToDollar: 7500,
      ethToDollar: 600,
      xlmToDollar: 1,
      usdtToDollar: 1,
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
      btcAddress: false,
      xlmAddress: false,
      usdtAddress: false,
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
      hotWalletListCount : 0,
      iswalletCreating:false,
      metamaskAccount: '',
      metamaskConnected :false,
      open: false,
      transactionData: '',
      paymentMode: 'viaPvtWallet',
      ethWallet:'',
      btcWallet:'',
      usdtWallet:'',
      xlmWallet:'',
      currAddress: '',
      currWallet: '',
      clientAddress: '',
      currRate: 0,
    };

    this.onContributionConfirm = this.onContributionConfirm.bind(this);
    this.CurrencyChange = this.CurrencyChange.bind(this);
    this.paymentModeChange = this.paymentModeChange.bind(this);
    this.currencyQuantityChange = this.currencyQuantityChange.bind(this);
    this.comeBack = this.comeBack.bind(this);
    this.confirm = this.confirm.bind(this);
    // this.updatetime = this.updatetime.bind(this);
    this.amtInvested = this.amtInvested.bind(this);
    this.validator = this.validator.bind(this);
    this.validatorWallet = this.validatorWallet.bind(this);
    this.checkWallet = this.checkWallet.bind(this);
  }

  // @aj
  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow
    });
    console.log('infoShow : ', this.state.infoShow);
  }

  // End Constructor

  // Begin Lifecycle methods

  componentDidMount() {
    this.props.getData();
    this.props.listHotWallet();

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
      xlmAddress: data.xlmAddress,
      usdtAddress: data.usdtAddress,
      time: nextProps.deadline,
      bonus: data.bonus,
      stage: data.stage,
      minInvest: data.minInvest,
      tokenPrice: data.tokenUsd,
      isBonusOrDiscount:data.isBonusOrDiscount,
      discount:data.discount,
      loading: false,
      fromAddressEth:nextProps.userInfo.userInfo.ethAddress
    });
    if (nextProps.successPayment) {
      console.log(nextProps.successPayment);

      // this.notifyDeposit(nextProps.successPayment);
    }
    if (nextProps.successNotPayment) {
      toast.error(nextProps.successNotPayment.message);
      nextProps.clearContribution()
    }
    if(nextProps.listHotWalletRet.count>0){
      console.log("getHotWqalletREt", nextProps.listHotWalletRet);
      if(nextProps.listHotWalletRet.success){
        this.setState({
          hotWalletList : nextProps.listHotWalletRet.data,
          hotWalletListCount : nextProps.listHotWalletRet.count,
        },()=>{
          if(this.state.hotWalletListCount>0){
            let hasBtcWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "BTC")
            let hasEthWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "ETH")
            let hasXlmWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "XLM")
            let hasUsdtWalletCreated = this.state.hotWalletList.find(wallet => wallet.ticker === "USDT")
            if(hasBtcWalletCreated){
              this.setState({
                btcWallet: hasBtcWalletCreated
              })
            }
            if(hasEthWalletCreated){
              this.setState({
                ethWallet: hasEthWalletCreated
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
      console.log("in createWWWallet dibba", nextProps.createHotWallet);
      if(nextProps.createHotWalletRet.success){
        this.setState({
          currentReceivingWalletAddress : nextProps.createHotWalletRet.address,
          iswalletCreating : false
        })
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
   clearInterval(this.interval);
 }

  // End of Life Cycle methods

  // Begin of container functions

gobackDollar=(e)=>{
  this.setState({
      usdEurContributionConfirm : false
  })
}


  onContributionConfirm(e) {

    e.preventDefault();
    /*  form = document.getElementById('contriForm'); */
    if( this.state.curr == 'Bitcoin' || this.state.curr == 'Ethereum') {
      const fromAddress = document.getElementById('fromAddress').value;
      console.log(typeof(this.state.dollarsInvested));
      if (parseInt(this.state.dollarsInvested) < this.state.minInvest) {
        this.notifyMinimum();
      }else if(this.state.curr == 'Bitcoin'&&this.state.valid) {
       if(this.state.curr !='Ethereum'){
           if (!this.state.valid) {
           const curr = this.state.curr;
           toast.error(`Please enter a valid ${curr} address`);
         }
       }
        const tokenReceive = document.getElementById('tokenReceive').value;

          if(!this.state.validWallet){
            toast.error('Please enter a valid ERC20 address');
          }
          else{
            this.setState({
              confirmContri: true,
              fromAddress,
              // tokenReceiveAddress: fromAddress,
            })
            const body = {
              tokens: this.state.tokensWithBonus,
              type: this.state.curr,
              amount: this.state.currencyQuantity,
              fromAddress,
              toAddress: this.state.btcAddress,
              tokenReceivingAddress: tokenReceive,
              usdAmount: this.state.dollarsInvested,
              rate:this.state.btcToDollar,
              phase:this.state.stage,
              tokenPrice : this.state.tokenPrice,
              bonus:this.state.bonus,
              discount:this.state.discount,
              isBonusOrDiscount:this.state.isBonusOrDiscount
            };
            console.log(body,"body bitcoin  in contribution page")
            this.setState({
              body
            })

           }
      } else if(this.state.curr == 'Ethereum'){
          this.setState({
            confirmContri: true,
            fromAddress,
            tokenReceiveAddress: fromAddress,
          });
          const body = {
            tokens: this.state.tokensWithBonus,
            type: this.state.curr,
            amount: this.state.currencyQuantity,
            fromAddress:this.state.fromAddressEth,
            toAddress: this.state.ethAddress,
            tokenReceivingAddress:this.state.fromAddressEth,
            usdAmount: this.state.dollarsInvested,
            rate:this.state.ethToDollar,
            phase:this.state.stage,
            tokenPrice : this.state.tokenPrice,
            bonus:this.state.bonus,
            discount:this.state.discount,
            isBonusOrDiscount:this.state.isBonusOrDiscount
          };
          console.log(body," body ethereum  in contribution page")
          this.setState({
            body
          })
      }

    }else {
      console.log('dollar :' , this.state.dollarsInvested);
        if (parseInt(this.state.dollarsInvested) < this.state.minInvest) {
          this.notifyMinimum();
        } else if (this.state.curr == 'Dollar' || this.state.curr == 'Euro') {
          console.log(" in usd  contributionnnnnnnnnnn ")
          this.setState({
            usdEurContributionConfirm : true
          })
          const body = {
            tokens: this.state.tokensWithBonus,
            type: "USD",
            amount: this.state.currencyQuantity,
            // fromAddress:this.state.fromAddressEth,
            // toAddress: this.state.ethAddress,
            tokenReceivingAddress:this.state.fromAddressEth,
            usdAmount: this.state.dollarsInvested,
            rate:this.state.ethToDollar,
            phase:this.state.stage,
            tokenPrice : this.state.tokenPrice,
            bonus:this.state.bonus
          };
          console.log(body," body usd in contribution page")
          this.setState({
            body
          })
        }
      }
  }


  notifyMinimum() {
    toast.error(`Minimum contribution is $ ${this.state.minInvest}`);
  }


  confirm(fromAdd, data) {
    let body = {
      tokens: this.state.tokensWithBonus,
      type: this.state.curr,
      amount: this.state.currencyQuantity,
      fromAddress:fromAdd,
      toAddress: this.state.clientAddress,
      tokenReceivingAddress:this.state.ethWallet.address,
      usdAmount: this.state.dollarsInvested,
      rate:this.state.currRate,
      phase:this.state.stage,
      tokenPrice : this.state.tokenPrice,
      bonus:this.state.bonus,
      discount:this.state.discount,
      isBonusOrDiscount:this.state.isBonusOrDiscount,
      transactionHash : data
    };
    console.log("dddddddddddddddddddddddd",data,"hash");
    console.log("bbbbbbbbbbbbbbbbbbbbbbbb",body,"body")
    this.props.confirmPayment(body);
  }

  comeBack() {
    this.setState({
      confirmContri: false,
      curr: 'Ethereum',
      ethToDollar: this.props.successData.ethUsd,
      usdEurContributionConfirm:false,
      paymentMode: 'viaPvtWallet',
      currencyQuantity : 0,
      tokens : 0,
      tokensWithBonus: 0
    })

  }

  validatorWallet() {
    const add = document.getElementById('tokenReceive').value;
    this.setState({
      tokenReceiveAddress: add
    })
    if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
      this.setState({
        validWallet: true,
        validWalletBlank: 'false'
      });
    }else if(add == ''){
      this.setState({
        validWalletBlank: 'true'
      })
    }else {
      this.setState({
        validWallet: false,
        validWalletBlank: 'false'
      });
    }
  }

  validator() {
    const add = document.getElementById('fromAddress').value;
    this.setState({
      fromAddress: add
    })

    if(this.state.curr == 'Ethereum'){
      if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
      //  console.log('done eth');
        this.setState({
          valid: true,
          validBlank: 'false'
        });
      }else if(add == ''){
       // console.log('Empty');
        this.setState({
          validBlank: 'true'
        })
      }else {
       // console.log('not done');
        this.setState({
          valid: false,
          validBlank: 'false'
        });
      }
    }
    else if(this.state.curr == 'Bitcoin'){
      if ( add.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/)) {
       // console.log('done btc');
        this.setState({
          valid: true,
          validBlank: 'false',
        });
      }else if(add == ''){
       // console.log('Empty');
        this.setState({
          validBlank: 'true'
        })
      }else {
        console.log('not done');
        this.setState({
          valid: false,
          validBlank: 'false'
        });
      }

    }

  }
  currencyQuantityChange(e) {

    let currencyQuantity;
    // console.log(e.target.value);
    if (e.target.value === '') {
      // console.log('got ot');
    }
    if (e.target.value === '') {
      currencyQuantity = 0;
    } else {
      currencyQuantity = e.target.value;
    }
    if (this.state.curr === 'Bitcoin') {
      this.setState({
        currencyQuantity,
        dollarsInvested: currencyQuantity * this.state.btcToDollar,
        tokens: this.state.tokensPerBitcoin * currencyQuantity,
        tokensWithBonus: this.state.tokensPerBitcoin * currencyQuantity + this.state.tokensPerBitcoin * currencyQuantity * 0.01 * this.state.bonus,
      });
    } else if (this.state.curr === 'Ethereum') {
      this.setState({
        currencyQuantity,
        dollarsInvested: currencyQuantity * this.state.ethToDollar,
        tokens: currencyQuantity * this.state.tokensPerEther,
        tokensWithBonus: currencyQuantity * this.state.tokensPerEther + currencyQuantity * this.state.tokensPerEther * 0.01 * this.state.bonus,
        dollars: e.target.value,
      });
    } else if (this.state.curr === 'Dollar') {
      this.setState({
        currencyQuantity,
        dollarsInvested: currencyQuantity,
        tokens: currencyQuantity * this.state.tokensPerUsd,
        tokensWithBonus: currencyQuantity * this.state.tokensPerUsd + currencyQuantity * this.state.tokensPerUsd * 0.01 * this.state.bonus,
        dollars: e.target.value,
      });
    } else if (this.state.curr === 'Euro') {
      this.setState({
        currencyQuantity,
        dollarsInvested: currencyQuantity * 1.16,
        tokens: currencyQuantity * this.state.tokensPerEur,
        tokensWithBonus: currencyQuantity * this.state.tokensPerEur + currencyQuantity * this.state.tokensPerEur * 0.01 * this.state.bonus,
      });
    }
    document.getElementById('tokens').value = this.state.tokens;
  }

  metamaskCall=async () => {
    if (window.ethereum !== undefined) {
      const web3 = new Web3(window.web3.currentProvider);
       await window.ethereum.enable();
      try {
        let netId = await web3.eth.net.getId();
        console.log("network",netId)
        let contractNetId = 3;

        if(contractNetId !== netId) {
          toast.error(`Please switch metamask network to ROPSTEN`);
          // this.setState({
          //   errorContract: true,
          //   errorMessage: `Please switch metamask network to ${this.props.contractData.contractNetwork}`
          // })
        } else {
        //   let metamaskAccounts = '';
        //   window.ethereum.on('accountsChanged', function () {
        //     web3.eth.getAccounts(function(error, accounts) {
        //       if(error){
        //         console.log("inside ethereum function", error);
        //       }else{
        //         console.log("ye kya hai",accounts[0]);
        //         metamaskAccounts = accounts;}
                
        //     });
        // });
          const accounts = await web3.eth.getAccounts();
          console.log('accounts :::::::: ', accounts[0]);
          //console.log('accounts :::::::: ', metamaskAccounts);

          if(accounts.length === 0) {
            toast.error('Please unlock metamask or Add the site URL in Connections');
            // this.setState({
            //   errorContract: true,
            //   errorMessage: 'Please unlock metamask. Add the site URL in Settings>Connections'
            // })
          
          } else {
            this.setState({
              metamaskAccount : accounts[0],
              metamaskConnected : true
            })
          }
        }
        
      }catch(err) {
       console.log("Metamask Integration error", err);
       toast.error(`Metamask Integration error: ${err}`);
      }
    } else {
      toast.error('Please install metamask or disable privacy feature');
      // this.setState({
      //   errorContract: true,
      //   errorMessage: 'Please install metamask or disable privacy feature'
      // })
    }
  }
  paymentModeChange(e){
    e.preventDefault();
    let currencyQuantity = document.getElementById('amt');
    let add = this.state.fromAddress;
    console.log(currencyQuantity.value);
    if (currencyQuantity.value === 0) {
      currencyQuantity = 0;
    }
    // let add = document.getElementById('fromAddress').value;
    //this.metamaskCall();
    // this.setState({
    //   fromAddress: this.props.userInfo.userInfo.ethAddress,
    //   tokenReceiveAddress: false,
    //   validBlank: true
    // })
    if(e.target.value === 'viaMetamaskExt'){
      this.metamaskCall();
    }
    if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
      console.log(" inside  ethererererer------------------------ add match")
     // console.log('done eth');
     if(this.state.isBonusOrDiscount==='staticDiscount'){
       console.log(" inside  etherium type",this.state)
       this.setState({
         paymentMode : e.target.value,
         valid: true,
         validBlank: 'false',
         curr: 'Ethereum',
         validWallet: true,
         currencyQuantity: this.state.amtInvested,
        dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
        tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
        tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
       });
     }else{
       this.setState({
        paymentMode : e.target.value,
         valid: true,
         validBlank: 'false',
         curr: 'Ethereum',
         validWallet: true,
         currencyQuantity: this.state.amtInvested,
        dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
        tokens: currencyQuantity.value * this.state.tokensPerEther,
        tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
       });
     }

    }else if(add == ''){
      // console.log('Empty');
      if(this.state.isBonusOrDiscount==='staticDiscount'){

        this.setState({
          paymentMode : e.target.value,
          validBlank: 'true',
          curr: 'Ethereum',
          currencyQuantity: this.state.amtInvested,
          dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
          tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
          tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
        })
      }
      else {
        this.setState({
          paymentMode : e.target.value,
          validBlank: 'true',
          curr: 'Ethereum',
          currencyQuantity: this.state.amtInvested,
          dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
          tokens: currencyQuantity.value * this.state.tokensPerEther,
          tokensWithBonus: (currencyQuantity.value * this.state.tokensPerEther) + ((currencyQuantity.value * this.state.tokensPerEther) * (this.state.bonus / 100)),
        })
      }
    }else {
     // console.log('not done');
     if(this.state.isBonusOrDiscount==='staticDiscount'){
       this.setState({
        paymentMode : e.target.value,
         valid: false,
         validBlank: 'false',
         curr: 'Ethereum',
        currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
        dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
        tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
        tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
       });
     }
     else{
       this.setState({
        paymentMode : e.target.value,
         valid: false,
         validBlank: 'false',
         curr: 'Ethereum',
       currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
       dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
       tokens: currencyQuantity.value * this.state.tokensPerEther,
       tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
       });
     }

    }

  }


  CurrencyChange(e) {
    /* console.log(e.target.value); */
    let currencyQuantity = document.getElementById('amt');
    let add = '';
    console.log("yaha hai hoo", currencyQuantity.value);
    if (currencyQuantity.value === 0) {
      currencyQuantity = 0;
    }
    if(e.target.value === 'BTC') {
        // let add = document.getElementById('fromAddress').value;

        if(this.state.btcWallet){
          add = this.state.btcWallet.address;
          if (add.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/)) {
            // console.log('done btc');
                  if(this.state.isBonusOrDiscount==='staticDiscount'){
                  this.setState({
                    fromAddress: add,
                    valid: true,
                    validBlank: 'false',
                    curr: 'Bitcoin',
                    currencyQuantity: currencyQuantity.value,
                    dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
                    tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
                    tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
                  })
                  }
                  else{
                    this.setState({
                      fromAddress: add,
                      valid: true,
                      validBlank: 'false',
                      curr: 'Bitcoin',
                      currencyQuantity: currencyQuantity.value,
                      dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
                      tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
                      tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
                    });
                  }
          }else if(add == ''){
           // console.log('Empty');
             if(this.state.isBonusOrDiscount==='staticDiscount'){
               this.setState({
                fromAddress: add,
                 validBlank: 'true',
                 curr: 'Bitcoin',
                 currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
                 dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
                 tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
                 tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
               })
             } else {
               this.setState({
                fromAddress: add,
                 validBlank: 'true',
                 curr: 'Bitcoin',
                 currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
                 dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
                 tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
                 tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
               })
             }
  
          }else {
            console.log('not done here');
          if(this.state.isBonusOrDiscount==='staticDiscount'){
            this.setState({
              fromAddress: add,
              valid: false,
              curr: 'Bitcoin',
              currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
              dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
              tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
              tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
            });
          }
          else {
            this.setState({
              fromAddress: add,
              valid: false,
              curr: 'Bitcoin',
              currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
              dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
              tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
              tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
            });
          }
          }
        } else {
          toast.error('Create bitcoin wallet to continue');
        }
        // currencyQuantity.value = this.state.dollarsInvested / this.state.btcToDollar;

    } else  if(e.target.value === 'ETH') {
      if(this.state.ethWallet){
        add = this.state.ethWallet.address;
        if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
          console.log(" inside  ethererererer------------------------ add match")
         // console.log('done eth');
         if(this.state.isBonusOrDiscount==='staticDiscount'){
           console.log(" inside  etherium type",this.state)
           this.setState({
            fromAddress: add,
             valid: true,
             validBlank: 'false',
             curr: 'Ethereum',
             validWallet: true,
             currencyQuantity: this.state.amtInvested,
            dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
            tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
            tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
           });
         }else{
           this.setState({
            fromAddress: add,
             valid: true,
             validBlank: 'false',
             curr: 'Ethereum',
             validWallet: true,
             currencyQuantity: this.state.amtInvested,
            dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
            tokens: currencyQuantity.value * this.state.tokensPerEther,
            tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
           });
         }
  
        }else if(add == ''){
          // console.log('Empty');
          if(this.state.isBonusOrDiscount==='staticDiscount'){
  
            this.setState({
              fromAddress: add,
            validBlank: 'true',
            curr: 'Ethereum',
            currencyQuantity: this.state.amtInvested,
            dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
            tokens: (currencyQuantity.value*this.state.ethToDollar)/this.state.tokenPrice,
            tokensWithBonus: (currencyQuantity.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
            })
          }
          else {
            this.setState({
              fromAddress: add,
              validBlank: 'true',
              curr: 'Ethereum',
            currencyQuantity: this.state.amtInvested,
            dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
            tokens: currencyQuantity.value * this.state.tokensPerEther,
            tokensWithBonus: (currencyQuantity.value * this.state.tokensPerEther) + ((currencyQuantity.value * this.state.tokensPerEther) * (this.state.bonus / 100)),
            })
          }
        }else {
         // console.log('not done');
         if(this.state.isBonusOrDiscount==='staticDiscount'){
           this.setState({
            fromAddress: add,
             valid: false,
             validBlank: 'false',
             curr: 'Ethereum',
           currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
           dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
           tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
           tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
           });
         }
         else{
           this.setState({
            fromAddress: add,
             valid: false,
             validBlank: 'false',
             curr: 'Ethereum',
           currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
           dollarsInvested: currencyQuantity.value * this.state.ethToDollar,
           tokens: currencyQuantity.value * this.state.tokensPerEther,
           tokensWithBonus: currencyQuantity.value * this.state.tokensPerEther + currencyQuantity.value * this.state.tokensPerEther * 0.01 * this.state.bonus
           });
         }
  
        }
      } else {
        toast.error('Create ethereum wallet to continue');
      }



    } else if (e.target.value === 'USDT') {
      if(this.state.usdtWallet){
        add=this.state.usdtWallet.address
        let currencyQuantity = document.getElementById('amt');
        if(this.state.isBonusOrDiscount==='staticDiscount'){
          console.log(" inside  usdt type",this.state)
          this.setState({
           fromAddress: add,
            valid: true,
            validBlank: 'false',
            curr: 'USDT',
            validWallet: true,
            currencyQuantity: this.state.amtInvested,
           dollarsInvested: currencyQuantity.value * this.state.usdtToDollar,
           tokens: (currencyQuantity.value*this.state.usdtToDollar)/this.state.tokenPrice,
           tokensWithBonus: (currencyQuantity.value*this.state.usdtToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
          });
        }else{
          this.setState({
           fromAddress: add,
            valid: true,
            validBlank: 'false',
            curr: 'USDT',
            validWallet: true,
            currencyQuantity: this.state.amtInvested,
           dollarsInvested: currencyQuantity.value * this.state.usdtToDollar,
           tokens: currencyQuantity.value * this.state.tokensPerUsdt,
           tokensWithBonus: currencyQuantity.value * this.state.tokensPerUsdt + currencyQuantity.value * this.state.tokensPerUsdt * 0.01 * this.state.bonus
          });
        }
      } else {
        toast.error('Creat USDT wallet to continue');
      }
      
    } else if (e.target.value === 'XLM') {
      if(this.state.xlmWallet){
        add =this.state.xlmWallet.address
        let currencyQuantity = document.getElementById('amt');
        if(this.state.isBonusOrDiscount==='staticDiscount'){
          console.log(" inside  stellar type",this.state)
          this.setState({
           fromAddress: add,
            valid: true,
            validBlank: 'false',
            curr: 'Stellar',
            validWallet: true,
            currencyQuantity: this.state.amtInvested,
           dollarsInvested: currencyQuantity.value * this.state.xlmToDollar,
           tokens: (currencyQuantity.value*this.state.xlmToDollar)/this.state.tokenPrice,
           tokensWithBonus: (currencyQuantity.value*this.state.xlmToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
          });
        }else{
          this.setState({
           fromAddress: add,
            valid: true,
            validBlank: 'false',
            curr: 'Stellar',
            validWallet: true,
            currencyQuantity: this.state.amtInvested,
           dollarsInvested: currencyQuantity.value * this.state.xlmToDollar,
           tokens: currencyQuantity.value * this.state.tokensPerStellar,
           tokensWithBonus: currencyQuantity.value * this.state.tokensPerStellar + currencyQuantity.value * this.state.tokensPerStellar * 0.01 * this.state.bonus
          });
        }
      } else {
        toast.error('Create Stellar wallet to continue');
      }
      
    }
  }

  amtInvested(e) {
     const currencyQuant = document.getElementById('amt');
     this.setState({
       amtInvested: e.target.value,
     });
     if (this.state.curr == 'Ethereum') {
      //  currencyQuant.value = e.target.value / this.state.ethToDollar;
        if(this.state.isBonusOrDiscount==='staticDiscount'){
            console.log(this.state," inside staticDiscount ")
          this.setState({
            currencyQuantity: currencyQuant.value,
            dollarsInvested: currencyQuant.value * this.state.ethToDollar,
            tokens: (currencyQuant.value*this.state.ethToDollar)/this.state.tokenPrice,
            tokensWithBonus: (currencyQuant.value*this.state.ethToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
          });
        }else {
          this.setState({
            currencyQuantity: currencyQuant.value,
            dollarsInvested: currencyQuant.value * this.state.ethToDollar,
            tokens: this.state.tokensPerEther * currencyQuant.value,
            tokensWithBonus: this.state.tokensPerEther * currencyQuant.value + this.state.tokensPerEther * currencyQuant.value * 0.01 * this.state.bonus
          });
        }


     } else if (this.state.curr == 'Bitcoin') {
      //  currencyQuant.value = e.target.value / this.state.btcToDollar;
      if(this.state.isBonusOrDiscount==='staticDiscount'){
          console.log(this.state," inside bitcoin staticDiscount ")
        this.setState({
          currencyQuantity: currencyQuant.value,
          dollarsInvested: currencyQuant.value * this.state.btcToDollar,
          tokens: (currencyQuant.value*this.state.btcToDollar)/this.state.tokenPrice,
          tokensWithBonus: (currencyQuant.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
       });
     }else {
       this.setState({
         currencyQuantity: currencyQuant.value,
         dollarsInvested: currencyQuant.value * this.state.btcToDollar,
         tokens: currencyQuant.value * this.state.tokensPerBitcoin,
         tokensWithBonus: this.state.tokensPerBitcoin * currencyQuant.value + this.state.tokensPerBitcoin * currencyQuant.value * 0.01 * this.state.bonus
      });
     }
     } else if (this.state.curr == 'Dollar') {
       this.setState({
         currencyQuantity: currencyQuant.value,
         dollarsInvested: currencyQuant.value,
         tokens: currencyQuant.value * this.state.tokensPerUsd,
         tokensWithBonus: this.state.tokensPerUsd * currencyQuant.value + this.state.tokensPerUsd * currencyQuant.value * 0.01 * this.state.bonus
       })
     } else if (this.state.curr == 'Euro') {
       this.setState({
         currencyQuantity: currencyQuant.value,
         dollarsInvested: currencyQuant.value * 1.16,
         tokens: currencyQuant.value * this.state.tokensPerEur,
         tokensWithBonus: this.state.tokensPerEur * currencyQuant.value + this.state.tokensPerEur * currencyQuant.value * 0.01 * this.state.bonus
       })
     } else if (this.state.curr == 'Stellar') {
      //  currencyQuant.value = e.target.value / this.state.ethToDollar;
        if(this.state.isBonusOrDiscount==='staticDiscount'){
            console.log(this.state," inside stellar staticDiscount ")
          this.setState({
            currencyQuantity: currencyQuant.value,
            dollarsInvested: currencyQuant.value * this.state.xlmToDollar,
            tokens: (currencyQuant.value*this.state.xlmToDollar)/this.state.tokenPrice,
            tokensWithBonus: (currencyQuant.value*this.state.xlmToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
          });
        }else {
          this.setState({
            currencyQuantity: currencyQuant.value,
            dollarsInvested: currencyQuant.value * this.state.xlmToDollar,
            tokens: this.state.tokensPerStellar * currencyQuant.value,
            tokensWithBonus: this.state.tokensPerStellar * currencyQuant.value + this.state.tokensPerStellar * currencyQuant.value * 0.01 * this.state.bonus
          });
        }
      } else if (this.state.curr == 'USDT') {
        //  currencyQuant.value = e.target.value / this.state.ethToDollar;
          if(this.state.isBonusOrDiscount==='staticDiscount'){
              console.log(this.state," inside USDT staticDiscount ")
            this.setState({
              currencyQuantity: currencyQuant.value,
              dollarsInvested: currencyQuant.value * this.state.usdtToDollar,
              tokens: (currencyQuant.value*this.state.usdtToDollar)/this.state.tokenPrice,
              tokensWithBonus: (currencyQuant.value*this.state.usdtToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
            });
          }else {
            this.setState({
              currencyQuantity: currencyQuant.value,
              dollarsInvested: currencyQuant.value * this.state.usdtToDollar,
              tokens: this.state.tokensPerUsdt * currencyQuant.value,
              tokensWithBonus: this.state.tokensPerUsdt * currencyQuant.value + this.state.tokensPerUsdt * currencyQuant.value * 0.01 * this.state.bonus
            });
          }
        }
   }
  //  updatetime() {
  //   if (this.state.timer > 0) {
  //     const min = this.state.timer / 60;
  //     const minutes = Math.floor(min);
  //     const seconds = this.state.timer % 60;
  //     this.setState({
  //       timer: this.state.timer - 1,
  //       minutes,
  //       seconds: seconds < 10 ? `0${seconds}` : seconds,
  //     });
  //   } else {
  //     clearInterval(this.state.interval);
  //     this.props.dash();
  //     this.props.reload();
  //   }
  // }

  resetInfo=()=>{
    this.props.toggleInfo()
  }


  checkWallet = async () => {

    let amount =  document.getElementById('amt').value;
    if(!amount){
        toast.error("Please select the mode of Payment");
        // toast('txnJash: 0xfa03207cb875340aec8f81408a39994c616c284a13bd2589c453810bb63b4a87', {
        //   position: "top-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: false,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: 3,
        //   className: 'toast-success-container '
        //   });
          
        return ''
    }
    if(amount<=0){
      toast.error("Amount should be greater than zero");
        return ''
    }
  //   if(this.state.paymentMode==='viaPvtWallet'){
  //   let fromAddress = document.getElementById('fromAddress').value;
  //   if(!fromAddress){
  //     toast.error("Please enter the ETH Wallet Address");
  //     return ''
  //   }
  // } else {
  //   if(!this.state.metamaskAccount){
  //     toast.error("Connect Metamask wallet");
  //     return ''
  //   }
  // }

    if (this.state.curr === "Ethereum"){
      if(this.state.ethWallet){
        this.setState({
          confirmContri : true,
          currWallet: this.state.ethWallet,
          clientAddress: this.state.ethAddress,
          currRate : this.state.ethToDollar,
        })
      } else {
        toast.error('Ethereum Wallet not found');
      }

    } else if( this.state.curr === "Bitcoin" ){
      if(this.state.btcWallet){
        this.setState({
          confirmContri : true,
          currWallet: this.state.btcWallet,
          clientAddress: this.state.btcAddress,
          currRate : this.state.btcToDollar,
        })
      } else {
        toast.error('Bitcoin Wallet not found');
      }
    } else if(this.state.curr === "Stellar") {
      if(this.state.xlmWallet){
        this.setState({
          confirmContri : true,
          currWallet: this.state.xlmWallet,
          clientAddress: this.state.xlmAddress,
          currRate : this.state.xlmToDollar,
        })
      } else {
        toast.error('Stellar Wallet not found');
      }
    } else if(this.state.curr === "USDT") {
      if(this.state.usdtWallet){
        this.setState({
          confirmContri : true,
          currWallet: this.state.usdtWallet,
          clientAddress: this.state.usdtAddress,
          currRate : this.state.usdtToDollar,
        })
      } else {
        toast.error('USDT Wallet not found');
      }
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

  getMetamaskAddress = async() => {
    const web3 = new Web3(window.web3.currentProvider);
    const accounts = await web3.eth.getAccounts();


    if(accounts.length !== 0) {
      this.setState({
        metamaskAccount : accounts[0],
        metamaskConnected : true
      })

    }

     
}
hide=(e)=>{
  this.setState({
    open:false
  })
}

  // End of container functions
  render() {
        

      
     console.log(this.props," props in contribution page")
    // console.log(this.state," state in contribution page")
    const { loading } = this.props
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
    if (this.state.confirmContri||this.state.usdEurContributionConfirm){
      console.log("min",this.state.minutes,
        "sec",this.state.seconds,
        "dollars",this.state.dollarQuantity,
        "currency",this.state.curr,
        "ethToDollar" ,this.state.ethToDollar,
        "btcToDollar" ,this.state.btcToDollar,
        "tokens",this.state.tokensWithBonus,
        "currencyQty",this.state.currencyQuantity,

        
        "btcAddress",this.props.successData.btcAddress,
        "ethAddress",this.props.successData.ethAddress,
        "fromAddress",this.state.fromAddress,
        "tokenReceive",this.state.tokenReceiveAddress,

        
        "usdEurContributionConfirm",this.state.usdEurContributionConfirm,
        "successData" ,this.props.successData,
        "tokensPerBitcoin",this.state.tokensPerBitcoin,
        "currentReceivingWalletAddress",this.state.currentReceivingWalletAddress);
      return (
      <div>
      <Helmet>
        <title>Contributions</title>
        <meta name="description" content="Description of Contributions" />
      </Helmet>
      <ContributionConfirm
      min={this.state.minutes}
      sec={this.state.seconds}
      dollars={this.state.dollarQuantity}
      currency={this.state.curr}
      ethToDollar = {this.state.ethToDollar}
      btcToDollar = {this.state.btcToDollar}
      tokens={this.state.tokensWithBonus}
      currencyQty={this.state.currencyQuantity}
      back={this.comeBack}
      btcAddress={this.props.successData.btcAddress}
      ethAddress={this.props.successData.ethAddress}
      fromAddress={this.state.fromAddress}
      tokenReceive={this.state.tokenReceiveAddress}
      toAddress = {this.state.toAddress}
      paymentMode = {this.state.paymentMode}
      finalPayment={this.confirm}
      usdEurContributionConfirm={this.state.usdEurContributionConfirm}
      successData ={this.props.successData}
      tokensPerBitcoin={this.state.tokensPerBitcoin}
      currentReceivingWalletAddress={this.state.currentReceivingWalletAddress}
      metamaskAccount = {this.state.metamaskAccount}
      currWallet = {this.state.currWallet}
      clientAddress = {this.state.clientAddress}
      />
      </div>
      );
    }
          {
            // <div id="content" className="ui-content ui-content-aside-overlay">
            // <Helmet>
            //   <title>Contributions</title>
            //   <meta name="description" content="Description of Contributions" />
            // </Helmet>
            //   <div className="ui-content-body">
            //   <div className="ui-container container-fluid">
            //     <div className="row">
            //       <div className="col-sm-12">
            //         <div className="alert alert-success text-center">
            //           <h4>Contribution in USD and EUR is temporarily disabled.<br/></h4>
            //         </div>
            //       </div>
            //     </div>
            //   </div>
            // </div>
            // </div>
          }

    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>Contributions</title>
        <meta name="description" content="Description of Contributions" />
      </Helmet>
      <div className="static-modal">
          <Modal show={this.state.open} bsSize="large" onHide={this.hide}>
          <Modal.Header>
            <div className="col-sm-12 text-right">
                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={() => {this.setState({ open:false })}}></i>
            </div>
            <Modal.Title><div className='text-center'>INFORMATION</div></Modal.Title>
          </Modal.Header>
            <Modal.Body>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-sm-12">
                    {this.state.transactionData}
                  </div>
                </div>
                </div>
            </Modal.Body>
          </Modal>
        </div>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
        {this.state.iswalletCreating? <LoadingSpinner />:
          <div className="contribution-card" style={{ marginBottom : '2em' }}>
            <div className="row">
              <div className="col-sm-12">
                  <h4 className="main-color--blue" style={{ paddingLeft: '20px',paddingTop: '10px' , fontWeight:'bold' }}>Purchase SWAN tokens</h4><span style={{paddingLeft: "20px"}} >Working on ropsten for testing, txnhash in console</span>
                  <hr className="contribution-hr" />
                </div>
              </div>
            <div style={{ paddingLeft: '20px',paddingTop: '10px' }}>
            {this.props.userInfo.userInfo.kycStatus!=='ACCEPTED' && this.props.userInfo.userInfo.kycStatus!== 'SUBMITTED' && 
            <div className="kyc-status-before-contribution">
            <div className="glow-text kyc-submit">Submit KYC to continue</div>
            </div>
            }
            {this.props.userInfo.userInfo.kycStatus!=='ACCEPTED' && this.props.userInfo.userInfo.kycStatus === 'SUBMITTED' && 
            <div className="kyc-status-before-contribution">
            <div className="kyc-submit"><sup>Wait for KYC approval</sup></div>
            </div>
            }
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div style={{ marginTop : '40px', marginBottom : '30px' , paddingLeft : '20px'}}>
                <h5 className="main-color--blue">1 SWAN TOKEN =${this.state.tokenPrice}</h5>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <div style={{ paddingLeft : '20px'}} className="select-currency">
                <div className="form-group">
                    <label htmlFor="paymentMode" className="form-label main-color--blue">Select your Mode of Payment</label>
                    <span className="select-wrapper">
                      <select id="paymentMode" name="paymentMode" onChange={this.CurrencyChange} className="form-input form-one-style" required>
                        <option value="" hidden>Click to select wallet</option>
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
                  <div className='row howMuch' style={{ display: 'flex',flexDirection: 'column',
                   paddingLeft: '15px', paddingTop: '10px'}}>
                  <div className="trade-in-centralex">
                  <span id="currency-tokens" style={{float: 'right'}}>1  {this.state.curr} = {(this.state.curr === 'Ethereum') ? this.state.tokensPerEther.toFixed(2) : (this.state.curr === 'Bitcoin') ? (this.state.tokensPerBitcoin).toFixed(2) : (this.state.curr === 'Stellar') ? (this.state.tokensPerStellar) : (this.state.tokensPerUsdt)} SWAN Tokens</span>
                  {
                    this.state.curr !== 'Dollar' ?
                    <span style={{float: 'left'}}>1  {this.state.curr} = ${(this.state.curr === 'Ethereum') ?
                        this.state.ethToDollar : (this.state.curr === 'Bitcoin') ?
                        (this.state.btcToDollar) :
                        (this.state.curr === 'Stellar') ? (this.state.xlmToDollar) : (this.state.usdtToDollar)}</span>
                    : null
                  }
                  <br/>
                  </div>
                  {/* {
                      this.state.curr == 'Ethereum' ?
                      <div className="form-group">
                      <label htmlFor="sendingAddress" className="form-label main-color--blue">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are sending from? <sup>*</sup></label>
                      <input id="fromAddress" onChange={this.validator} type="text" value={this.state.metamaskAccount} disabled placeholder='' className="form-input form-control text-left form-one-style" required   />
                    </div> :  this.state.curr == 'Bitcoin' ?
                    <div>
                   {
                  //   <div className="form-group">
                  //   <label htmlFor="sendingAddress" className="form-label main-color--blue">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are sending from?</label>
                  //   <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddress} className="form-input form-control text-left form-one-style" required placeholder='Enter Bitcoin Wallet Address' />
                  // </div>
                  }
                  <div className="form-group">
                    <label htmlFor="acceptingAddress" className="form-label main-color--blue">{(this.state.curr == 'Ethereum') ? 'BTC' : 'ETH'}{' '}
                     address for Receiving Centralex Tokens</label>
                    <input id="tokenReceive" onChange={this.validatorWallet}  type="text" className="form-input form-control text-left form-one-style"  required />
                    </div></div> : <div></div>
                          } */}
                  {
                  //   this.state.paymentMode == 'viaPvtWallet' ?
                  //   <div className="form-group">
                  //   <label htmlFor="sendingAddress" className="form-label main-color--blue">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are investing from?</label>
                  //   <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddress} className="form-input form-control text-left form-one-style" required placeholder='Enter your Ethereum Wallet Address' />
                  //  </div>:
                    <div className="form-group">
                    <label htmlFor="sendingAddress" className="form-label main-color--blue">Address of {(this.state.curr == 'Ethereum') ? 'ETH' :(this.state.curr =='Bitcoin') ? 'BTC' :(this.state.curr =='USDT') ? 'USDT' :(this.state.curr=='Stellar') ? 'Stellar' : '*'} wallet you are investing from?</label>
                    <input onChange={this.validator} type="text" value={this.state.fromAddress} disabled placeholder='' className="form-input form-control text-left form-one-style" required   />
                  </div>
                  }
                  </div>
                </div>
              </div>
                    

              <div className="col-sm-6">
                <div>
                     <div className="form-group align-left-label">
                  <label htmlFor="amt" className="form-label main-color--blue">How much {this.state.curr} you would like to invest?</label>
                  <input id="amt" step='0.000001' onChange={this.amtInvested} type="number" className="form-input form-control form-one-style " required />
                </div>

                {/* <div className="form-group">
                  <label htmlFor="currencyqty" className="form-label">Amount in {this.state.curr}</label>
                  <input id="currencyqty" type="text" value={this.state.currencyQuantity} className="form-input form-control text-right" disabled required/>

                </div> */}

                <div className="form-group align-left-label">
                  <label htmlFor="tokens" className="form-label main-color--blue">SWAN Tokens</label>
                  <input id="tokens" type="text" value={this.state.tokens} className="form-input form-control text-right form-one-style" disabled required/>
                </div>
                <div className="form-group align-left-label">
                  <label htmlFor="tokensWithBonus" className="form-label main-color--blue">SWAN Tokens With {this.state.isBonusOrDiscount==='staticDiscount'?"Discount":"Bonus"} ({this.state.isBonusOrDiscount==='staticDiscount'?this.state.discount:this.state.bonus}%)</label>
                  <input id="tokensWithBonus" type="text" value={this.state.tokensWithBonus} className="form-input form-control text-right form-one-style" disabled required/>
                </div>
                </div>
              </div>
            </div>
              
            <div className="row">
              <div className="col-sm-12 text-center" style={{ marginBottom : '30px' , marginTop : '0px' }}>
              {/* {(this.state.valid == false && this.state.validBlank == 'false') ? <p style={{color:"#ff0000"}}>Please enter a valid address</p>:<p></p>} */}
              {/* {(this.state.validWallet == false && this.state.validWalletBlank == 'false' && this.state.curr == 'Bitcoin') ? <p style={{color:"#ff0000"}}>Please enter a valid ERC20 wallet address</p>:<p></p>} */}
              {(this.props.successData.stage=='CrowdSale Not Started'||this.props.successData.stage==='Private Sale Start'||this.props.successData.stage==='Private Sale End') && <div><sup>No transactions during {this.props.successData.stage}</sup></div>}
              <button className="invest" style={{backgroundColor:'#2498D5'}} type="submit" disabled={this.props.userInfo.userInfo.kycStatus!=='ACCEPTED'||this.props.successData.stage==='CrowdSale Not Started'||this.props.successData.stage==='Private Sale Start'||this.props.successData.stage==='Private Sale End'} 
              onClick={() => this.checkWallet()} >Continue</button>
              </div>
              </div>
            </div>
            }
            
        {
        //   <div className="panel panel-default">
        //   {/* <div className="panel-heading">Contribution</div> */}
        //   <div className="panel-heading blueBG">
        //     {/*<Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />*/}
        //     {
        //       !!this.props.flag ?
        //         <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
        //         :
        //         null
        //     }
        //     Contribution
        //   </div>
        //   <div className="panel-body" style={{fontSize:'16px'}}>
        //     <div className="row">
        //       <div className="col-sm-12">
        //       {this.loading?<LoadingSpinner />:
        //         <div className="contribution">
        //           <div className="row">
        //             <div className="col-sm-12 col-md-6 col-md-offset-3 text-center">
        //               {this.state.minInvest!=0?<p style={{color:'#ff0000'}}>Minimum investment ${this.state.minInvest}</p>:''}
        //               <p style={{color:'#ff0000'}}>Current Token Sale :&nbsp;
        //               {this.state.stage === 'privateSaleRound1'?"Private Sale Round 1":this.state.stage === 'privateSaleRound2'?"Private Sale Round 2":this.state.stage === 'preSale'?"Pre Sale":this.state.stage === 'crowdSale'?"Crowdsale":this.state.stage}
        //               </p>
        //               <h5>1 Centralex TOKEN =${this.state.tokenPrice}</h5>
        //             </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-12">
        //               <form id="contriForm" onSubmit={this.onContributionConfirm} >
        //                 <div className="frm-block">
        //                 <div className="form-group">
        //                   <label htmlFor="currency" className="form-label" style={{fontSize : '12px'}}>Select your currency</label>
        //                   <span className="select-wrapper">
        //                     <select id="currency" name="currency" onChange={this.CurrencyChange} className="form-input" required>
        //                       <option value="ETH">ETH</option>
        //                       <option value="BTC">BTC</option>

        //                     {
        //                         // <option value="USD">USD</option>
        //                       // <option value="EUR">EUR</option>
        //                     }
        //                     </select>

        //                   </span>
        //                 </div>
        //                 <div className='row howMuch'>
        //                 <span id="currency-tokens" style={{float: 'right'}}>1  {this.state.curr} = {(this.state.curr === 'Ethereum') ? this.state.tokensPerEther.toFixed(2) : (this.state.curr === 'Bitcoin') ? (this.state.tokensPerBitcoin).toFixed(2) : (this.state.curr === 'Dollar') ? (this.state.tokensPerUsd) : (this.state.tokensPerEur).toFixed(2)} Centralex Tokens</span>
        //                 {
        //                   this.state.curr !== 'Dollar' ?
        //                   <span style={{float: 'left'}}>1  {this.state.curr} = ${(this.state.curr === 'Ethereum') ?
        //                      this.state.ethToDollar : (this.state.curr === 'Bitcoin') ?
        //                      (this.state.btcToDollar).toFixed(2) :
        //                       (this.state.curr === 'Euro') ? (this.state.eurToDollar) : null}</span>
        //                   : null
        //                 }
        //                 <br/>
        //                 </div>

        //                   <div className="form-group">
        //                     <label htmlFor="amt" className="form-label">How much {this.state.curr} you would like to invest?</label>
        //                     <input id="amt" step='0.000001' onChange={this.amtInvested} type="number" className="form-input form-control" required/>
        //                   </div>

        //                   {/* <div className="form-group">
        //                     <label htmlFor="currencyqty" className="form-label">Amount in {this.state.curr}</label>
        //                     <input id="currencyqty" type="text" value={this.state.currencyQuantity} className="form-input form-control text-right" disabled required/>

        //                   </div> */}

        //                   <div className="form-group">
        //                     <label htmlFor="tokens" className="form-label">Centralex Tokens</label>
        //                     <input id="tokens" type="text" value={this.state.tokens} className="form-input form-control text-right" disabled required/>
        //                   </div>
        //                   <div className="form-group">
        //                     <label htmlFor="tokensWithBonus" className="form-label">Centralex Tokens With {this.state.isBonusOrDiscount==='staticDiscount'?"Discount":"Bonus"} ({this.state.isBonusOrDiscount==='staticDiscount'?this.state.discount:this.state.bonus}%)</label>
        //                     <input id="tokensWithBonus" type="text" value={this.state.tokensWithBonus} className="form-input form-control text-right" disabled required/>
        //                   </div>

        //                   {/* <div className="form-group">
        //                     <label htmlFor="tokensWithBonus" className="form-label">TOTAL Centralex Tokens</label>
        //                     <input id="tokensWithBonus" type="text" value={this.state.tokensWithBonus} className="form-input form-control text-right" disabled required/>
        //                   </div> */}
        //                   {
        //                     this.state.curr == 'Ethereum' ?
        //                     <div className="form-group">
        //                     <label htmlFor="sendingAddress" className="form-label">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are sending from? <sup>*</sup></label>
        //                     <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddressEth} disabled placeholder='Your Kyc is Not Done' className="form-input form-control text-left" required   />
        //                   </div> :  this.state.curr == 'Bitcoin' ?
        //                   <div>
        //                   <div className="form-group">
        //                   <label htmlFor="sendingAddress" className="form-label">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are sending from?</label>
        //                   <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddress} className="form-input form-control text-left" required placeholder='Enter Bitcoin Wallet Address' />
        //                 </div>
        //                 <div className="form-group">
        //                   <label htmlFor="acceptingAddress" className="form-label">ETH address for Receiving Centralex Tokens</label>
        //                   <input id="tokenReceive" onChange={this.validatorWallet} value={this.state.tokenReceiveAddress} type="text" className="form-input form-control text-left" disabled required placeholder='Your Kyc is Not Done'/>
        //                   </div></div> : <div></div>

        //                   }

        //                   {(this.state.valid == false && this.state.validBlank == 'false') ? <p style={{color:"#ff0000"}}>Please enter a valid address</p>:<p></p>}
        //                   {/* {(this.state.curr == 'Bitcoin') ?
        //                   (<div className="form-group">
        //                     <label htmlFor="acceptingAddress" className="form-label">ETH address for Receiving Centralex Tokens</label>
        //                     <input id="tokenReceive" onChange={this.validatorWallet} value={this.state.tokenReceiveAddress} type="text" className="form-input form-control text-left" required/>
        //                     </div>) : <div></div>
        //                     } */}

        //                 {(this.state.validWallet == false && this.state.validWalletBlank == 'false' && this.state.curr == 'Bitcoin') ? <p style={{color:"#ff0000"}}>Please enter a valid ERC20 wallet address</p>:<p></p>}
        //                  {/* { (this.state.curr == 'Ethereum') ? <span><strong style={{color:"#ff0000"}}>Note:</strong> Please provide ERC-20 compatible wallet address</span> : null }  */}
        //                   <div className="btn-row">
        //                   {this.props.userInfo.userInfo.kycStatus!=='ACCEPTED' && this.props.userInfo.userInfo.kycStatus!== 'SUBMITTED' && <div><sup>Submit KYC to continue</sup></div>}
        //                   {this.props.userInfo.userInfo.kycStatus!=='ACCEPTED' && this.props.userInfo.userInfo.kycStatus === 'SUBMITTED' && <div><sup>Wait for KYC approval</sup></div>}
        //                   {(this.props.successData.stage=='CrowdSale Not Started'||this.props.successData.stage==='Private Sale Start'||this.props.successData.stage==='Private Sale End') && <div><sup>No transactions during {this.props.successData.stage}</sup></div>}
                           
        //                     <button className="form-button btn-primary" type="submit" disabled={this.props.userInfo.userInfo.kycStatus!=='ACCEPTED'||this.props.successData.stage==='CrowdSale Not Started'||this.props.successData.stage==='Private Sale Start'||this.props.successData.stage==='Private Sale End'} >Continue</button>
                          
        //                   </div>
        //                 </div>
        //               </form>

        //             </div>
        //           </div>
        //         </div>
        //       }
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


ContributionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contributionpage: makeSelectContributionPage(),
  contributionCurrency: makeSelectContributionCurrency(),
  successData: makeSelectContributionData(),
  successPayment: makeSelectContributionSuccess(),
  successNotPayment : makeSelectContributionNotSuccess(),
  global: makeGlobalParent(),
  transactionId: makeSelectTransactionId(),
  userInfo: makeSelectDashBoardWelcomePage(),
  loading:makeSelectLoading(),
  listHotWalletRet:makeSelectGetHotWalletRet(),
  getHotWalletLoading:makeSelectGetHotWalletLoading(),
  createHotWalletRet:makeSelectCreateHotWalletRet(),
  createHotWalletLoading:makeSelectCreateHotWalletLoading()

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    selectCurrency: () => (dispatch(selectAction())),
    getData: () => (dispatch(getData())),
    confirmPayment: (data) => (dispatch(confirmPayment(data))),
    reload: () => (dispatch(reload())),
    finalizePayment: (data) => (dispatch(finalizePayment(data))),
    listHotWallet : data => dispatch(listHotWallet(data)),
    createHotWallet : data => dispatch(createHotWallet(data)),
    clearContribution : _ => dispatch(clearContribution())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'contributionPage', reducer });
const withSaga = injectSaga({ key: 'contributionPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ContributionPage);


