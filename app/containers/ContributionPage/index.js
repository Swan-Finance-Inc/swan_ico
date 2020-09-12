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
import makeSelectContributionPage, {makeSelectTransactionId, makeSelectContributionCurrency, makeSelectContributionData, makeSelectContributionSuccess, makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectAction, getData, confirmPayment, reload,finalizePayment } from './actions';
import { ContributionConfirm } from '../ContributionConfirm';
import { makeGlobalParent } from '../App/selectors';
import makeSelectDashBoardWelcomePage from '../DashBoardWelcomePage/selectors';
import { Helmet } from 'react-helmet';
import LoadingSpinner from 'components/LoadingSpinner/Loadable';
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
      curr: 'Ethereum',
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
      btcAddress: false,
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
      loading: true
    };

    this.onContributionConfirm = this.onContributionConfirm.bind(this);
    this.CurrencyChange = this.CurrencyChange.bind(this);
    this.currencyQuantityChange = this.currencyQuantityChange.bind(this);
    this.comeBack = this.comeBack.bind(this);
    this.confirm = this.confirm.bind(this);
    // this.updatetime = this.updatetime.bind(this);
    this.amtInvested = this.amtInvested.bind(this);
    this.validator = this.validator.bind(this);
    this.validatorWallet = this.validatorWallet.bind(this);
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
    console.log("Getting data");

  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps.successData,"success data")
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
      loading: false
    });
    this.setState({
      fromAddressEth:nextProps.userInfo.userInfo.ethAddress
    })
    if (nextProps.successPayment) {
      console.log(nextProps.successPayment);

      // this.notifyDeposit(nextProps.successPayment);
    }
   //  if(nextProps.userInfo.kycDone)
   // {
   //   this.setState({
   //     ethAddress:nextProps.successData.ethAddress
   //   })
   // }
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


  confirm(data) {
    let body = this.state.body;
    body.transactionHash = data;
    console.log(data,"hash");
    console.log(body,"body")
    this.props.confirmPayment(body);
  }

  comeBack() {
    this.setState({
      confirmContri: false,
      curr: 'Ethereum',
      ethToDollar: this.props.successData.ethUsd,
      usdEurContributionConfirm:false
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
      //  console.log('not done');
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

  CurrencyChange(e) {
    /* console.log(e.target.value); */
    let currencyQuantity = document.getElementById('amt');
    let add = this.state.fromAddress;
    console.log(currencyQuantity.value);
    if (currencyQuantity.value === 0) {
      currencyQuantity = 0;
    }
    if(e.target.value === 'BTC') {
        // let add = document.getElementById('fromAddress').value;

        this.setState({
          fromAddress: '',
          tokenReceiveAddress: this.props.userInfo.userInfo.ethAddress,
          validWallet: true
        })
        // currencyQuantity.value = this.state.dollarsInvested / this.state.btcToDollar;
        if (add.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/)) {
          // console.log('done btc');
                if(this.state.isBonusOrDiscount==='staticDiscount'){
                this.setState({
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
               validBlank: 'true',
               curr: 'Bitcoin',
               currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
               dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
               tokens: (currencyQuantity.value*this.state.btcToDollar)/this.state.tokenPrice,
               tokensWithBonus: (currencyQuantity.value*this.state.btcToDollar)/(this.state.tokenPrice - (this.state.tokenPrice*(this.state.discount/100))),
             })
           } else {
             this.setState({
               validBlank: 'true',
               curr: 'Bitcoin',
               currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
               dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
               tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
               tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
             })
           }

        }else {
          // console.log('not done');
        if(this.state.isBonusOrDiscount==='staticDiscount'){
          this.setState({
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
            valid: false,
            curr: 'Bitcoin',
            currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
            dollarsInvested: currencyQuantity.value * this.state.btcToDollar,
            tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
            tokensWithBonus: currencyQuantity.value * this.state.tokensPerBitcoin + currencyQuantity.value * this.state.tokensPerBitcoin * 0.01 * this.state.bonus
          });
        }
        }
    } else  if(e.target.value === 'ETH') {
      let currencyQuantity = document.getElementById('amt');
      // let add = document.getElementById('fromAddress').value;
      this.setState({
        fromAddress: this.props.userInfo.userInfo.ethAddress,
        tokenReceiveAddress: false,
        validBlank: true
      })
      if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
        console.log(" inside  ethererererer------------------------ add match")
       // console.log('done eth');
       if(this.state.isBonusOrDiscount==='staticDiscount'){
         console.log(" inside  etherium type",this.state)
         this.setState({
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


    } else if (e.target.value === 'USD') {
      let currencyQuantity = document.getElementById('amt');
      this.setState({
        valid: true,
        validBlank: 'false',
        curr: 'Dollar',
        validWallet: true,
        dollarsInvested: currencyQuantity.value,
        currencyQuantity: currencyQuantity.value,
        tokens: currencyQuantity.value * this.state.tokensPerUsd,
        tokensWithBonus: currencyQuantity.value * this.state.tokensPerUsd + this.state.tokensPerUsd * currencyQuantity.value * 0.01 * this.state.bonus
      })
    } else if (e.target.value === 'EUR') {
      let currencyQuantity = document.getElementById('amt');
      this.setState({
        valid: true,
        validBlank: 'false',
        curr: 'Euro',
        validWallet: true,
        dollarsInvested: currencyQuantity.value * 1.16,
        currencyQuantity: currencyQuantity.value,
        tokens: currencyQuantity.value * this.state.tokensPerEur,
        tokensWithBonus: currencyQuantity.value * this.state.tokensPerEur + this.state.tokensPerEur * currencyQuantity.value * 0.01 * this.state.bonus
      })
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

  // End of container functions
  render() {
    console.log(this.props," props in contribution page")
    console.log(this.state," state in contribution page")
    const { loading } = this.props
    // this.setState({
    //   loading : this.props
    // });
    console.log(loading," loading in ");
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
      finalPayment={this.confirm}
      usdEurContributionConfirm={this.state.usdEurContributionConfirm}
      successData ={this.props.successData}
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

    console.log(this.state);
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>Contributions</title>
        <meta name="description" content="Description of Contributions" />
      </Helmet>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
          {/* <div className="panel-heading">Contribution</div> */}
          <div className="panel-heading blueBG">
            {/*<Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />*/}
            {
              !!this.props.flag ?
                <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
                :
                null
            }
            Contribution
          </div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-12">
              {this.loading?<LoadingSpinner />:
                <div className="contribution">
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-md-offset-3 text-center">
                      {this.state.minInvest!=0?<p style={{color:'#ff0000'}}>Minimum investment ${this.state.minInvest}</p>:''}
                      <p style={{color:'#ff0000'}}>Current Token Sale :&nbsp;
                      {this.state.stage === 'privateSaleRound1'?"Private Sale Round 1":this.state.stage === 'privateSaleRound2'?"Private Sale Round 2":this.state.stage === 'preSale'?"Pre Sale":this.state.stage === 'crowdSale'?"Crowdsale":this.state.stage}
                      </p>
                      <h5>1 Centralex TOKEN =${this.state.tokenPrice}</h5>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <form id="contriForm" onSubmit={this.onContributionConfirm} >
                        <div className="frm-block">
                        <div className="form-group">
                          <label htmlFor="currency" className="form-label">Select your currency</label>
                          <span className="select-wrapper">
                            <select id="currency" name="currency" onChange={this.CurrencyChange} className="form-input" required>
                              <option value="ETH">ETH</option>
                              <option value="BTC">BTC</option>

                            {
                                // <option value="USD">USD</option>
                              // <option value="EUR">EUR</option>
                            }
                            </select>

                          </span>
                        </div>
                        <div className='row howMuch'>


                        <span id="currency-tokens" style={{float: 'right'}}>1  {this.state.curr} = {(this.state.curr === 'Ethereum') ? this.state.tokensPerEther.toFixed(2) : (this.state.curr === 'Bitcoin') ? (this.state.tokensPerBitcoin).toFixed(2) : (this.state.curr === 'Dollar') ? (this.state.tokensPerUsd) : (this.state.tokensPerEur).toFixed(2)} Centralex Tokens</span>
                        {
                          this.state.curr !== 'Dollar' ?
                          <span style={{float: 'left'}}>1  {this.state.curr} = ${(this.state.curr === 'Ethereum') ?
                             this.state.ethToDollar : (this.state.curr === 'Bitcoin') ?
                             (this.state.btcToDollar).toFixed(2) :
                              (this.state.curr === 'Euro') ? (this.state.eurToDollar) : null}</span>
                          : null
                        }
                        <br/>
                        </div>
                          <div className="form-group">
                            <label htmlFor="amt" className="form-label">How much {this.state.curr} you would like to invest?</label>
                            <input id="amt" step='0.000001' onChange={this.amtInvested} type="number" className="form-input form-control" required/>
                          </div>

                          {/* <div className="form-group">
                            <label htmlFor="currencyqty" className="form-label">Amount in {this.state.curr}</label>
                            <input id="currencyqty" type="text" value={this.state.currencyQuantity} className="form-input form-control text-right" disabled required/>

                          </div> */}

                          <div className="form-group">
                            <label htmlFor="tokens" className="form-label">Centralex Tokens</label>
                            <input id="tokens" type="text" value={this.state.tokens} className="form-input form-control text-right" disabled required/>
                          </div>
                          <div className="form-group">
                            <label htmlFor="tokensWithBonus" className="form-label">Centralex Tokens With {this.state.isBonusOrDiscount==='staticDiscount'?"Discount":"Bonus"} ({this.state.isBonusOrDiscount==='staticDiscount'?this.state.discount:this.state.bonus}%)</label>
                            <input id="tokensWithBonus" type="text" value={this.state.tokensWithBonus} className="form-input form-control text-right" disabled required/>
                          </div>

                          {/* <div className="form-group">
                            <label htmlFor="tokensWithBonus" className="form-label">TOTAL Centralex Tokens</label>
                            <input id="tokensWithBonus" type="text" value={this.state.tokensWithBonus} className="form-input form-control text-right" disabled required/>
                          </div> */}
                          {
                            this.state.curr == 'Ethereum' ?
                            <div className="form-group">
                            <label htmlFor="sendingAddress" className="form-label">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are sending from? <sup>*</sup></label>
                            <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddressEth} disabled placeholder='Your Kyc is Not Done' className="form-input form-control text-left" required   />
                          </div> :  this.state.curr == 'Bitcoin' ?
                          <div>
                          <div className="form-group">
                          <label htmlFor="sendingAddress" className="form-label">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are sending from?</label>
                          <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddress} className="form-input form-control text-left" required placeholder='Enter Bitcoin Wallet Address' />
                        </div>
                        <div className="form-group">
                          <label htmlFor="acceptingAddress" className="form-label">ETH address for Receiving Centralex Tokens</label>
                          <input id="tokenReceive" onChange={this.validatorWallet} value={this.state.tokenReceiveAddress} type="text" className="form-input form-control text-left" disabled required placeholder='Your Kyc is Not Done'/>
                          </div></div> : <div></div>

                          }

                          {(this.state.valid == false && this.state.validBlank == 'false') ? <p style={{color:"#ff0000"}}>Please enter a valid address</p>:<p></p>}
                          {/* {(this.state.curr == 'Bitcoin') ?
                          (<div className="form-group">
                            <label htmlFor="acceptingAddress" className="form-label">ETH address for Receiving Centralex Tokens</label>
                            <input id="tokenReceive" onChange={this.validatorWallet} value={this.state.tokenReceiveAddress} type="text" className="form-input form-control text-left" required/>
                            </div>) : <div></div>
                            } */}

                        {(this.state.validWallet == false && this.state.validWalletBlank == 'false' && this.state.curr == 'Bitcoin') ? <p style={{color:"#ff0000"}}>Please enter a valid ERC20 wallet address</p>:<p></p>}
                         {/* { (this.state.curr == 'Ethereum') ? <span><strong style={{color:"#ff0000"}}>Note:</strong> Please provide ERC-20 compatible wallet address</span> : null }  */}
                          <div className="btn-row">
                          {this.props.userInfo.userInfo.kycStatus!=='ACCEPTED' && this.props.userInfo.userInfo.kycStatus!== 'SUBMITTED' && <div><sup>Submit KYC to continue</sup></div>}
                          {this.props.userInfo.userInfo.kycStatus!=='ACCEPTED' && this.props.userInfo.userInfo.kycStatus === 'SUBMITTED' && <div><sup>Wait for KYC approval</sup></div>}
                          {(this.props.successData.stage=='CrowdSale Not Started'||this.props.successData.stage==='Private Sale Start'||this.props.successData.stage==='Private Sale End') && <div><sup>No transactions during {this.props.successData.stage}</sup></div>}
                            <button className="form-button btn-primary" type="submit" disabled={this.props.userInfo.userInfo.kycStatus!=='ACCEPTED'||this.props.successData.stage==='CrowdSale Not Started'||this.props.successData.stage==='Private Sale Start'||this.props.successData.stage==='Private Sale End'} >Continue</button>
                          </div>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              }
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


ContributionPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  contributionpage: makeSelectContributionPage(),
  contributionCurrency: makeSelectContributionCurrency(),
  successData: makeSelectContributionData(),
  successPayment: makeSelectContributionSuccess(),
  global: makeGlobalParent(),
  transactionId: makeSelectTransactionId(),
  userInfo: makeSelectDashBoardWelcomePage(),
  loading:makeSelectLoading()

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    selectCurrency: () => (dispatch(selectAction())),
    getData: () => (dispatch(getData())),
    confirmPayment: (data) => (dispatch(confirmPayment(data))),
    reload: () => (dispatch(reload())),
    finalizePayment: (data) => (dispatch(finalizePayment(data)))
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
