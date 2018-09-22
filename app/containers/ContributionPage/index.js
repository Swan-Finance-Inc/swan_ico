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
import makeSelectContributionPage, {makeSelectTransactionId, makeSelectContributionCurrency, makeSelectContributionData, makeSelectContributionSuccess } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { selectAction, getData, confirmPayment, reload,finalizePayment } from './actions';
import { ContributionConfirm } from '../ContributionConfirm';
import { makeGlobalParent } from '../App/selectors';
import makeSelectDashBoardWelcomePage from '../DashBoardWelcomePage/selectors';

export class ContributionPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  // Begin constructor
  constructor(props) {
    super(props);
    this.state = {
      confirmContri: false,
      curr: 'Ethereum',
      btcToDollar: 7500,
      ethToDollar: 600,
      currencyQuantity: 0,
      dollarQuantity: 0,
      tokens: 0,
      // tokensWithBonus: 0,
      tokensPerEther: 0,
      tokensPerBitcoin: 0,
      ethAddress: false,
      btcAddress: false,
      fromAddress: '',
      tokenReceiveAddress: false,
      timer: 1800,
      minutes: 30,
      seconds: 0,
      interval: '',
      dollarsInvested: '',
      valid: '',
      validWallet: '',
      validBlank: '',
      validWalletBlank: '',
      // bonus: 'x',
      stage: '',
      minInvest: 0,
      contribution: false
    };

    this.onContributionConfirm = this.onContributionConfirm.bind(this);
    this.CurrencyChange = this.CurrencyChange.bind(this);
    this.currencyQuantityChange = this.currencyQuantityChange.bind(this);
    this.comeBack = this.comeBack.bind(this);
    this.confirm = this.confirm.bind(this);
    this.updatetime = this.updatetime.bind(this);
    this.dollarInvested = this.dollarInvested.bind(this);
    this.validator = this.validator.bind(this);
    this.validatorWallet = this.validatorWallet.bind(this);


  }

  // End Constructor

  // Begin Lifecycle methods

  componentDidMount() {
    this.props.getData();
    const data = this.props.successData;

    const interval = setInterval(() => this.updatetime(), 1000);
    let tokensPerEther = data.ethUsd / data.tokenUsd;
    let tokensPerBitcoin = data.btcUsd / data.tokenUsd;
    const fromAddress = this.props.userInfo.userInfo.ethAddress;
    this.setState({
      ethToDollar: data.ethUsd,
      btcToDollar: data.btcUsd,
      tokensPerEther: tokensPerEther,
      tokensPerBitcoin: tokensPerBitcoin,
      ethAddress: data.ethAddress,
      btcAddress: data.btcAddress,
      interval,
      // bonus: data.bonus,
      stage: data.stage,
      minInvest: data.minInvest,
      fromAddress,
      valid: true

    });
  }

  componentWillReceiveProps(nextProps) {


    const data = nextProps.successData;
    // console.log(data.bonus)
    // console.log(data.stage)

    this.setState({
      ethToDollar: data.ethUsd,
      btcToDollar: data.btcUsd,
      tokensPerEther: data.ethUsd / data.tokenUsd,
      tokensPerBitcoin: data.btcUsd / data.tokenUsd,
      ethAddress: data.ethAddress,
      btcAddress: data.btcAddress,
      time: nextProps.deadline,
      // bonus: data.bonus,
      stage: data.stage,
      minInvest: data.minInvest,
    });
    if (nextProps.successPayment) {
      console.log(nextProps.successPayment);

      // this.notifyDeposit(nextProps.successPayment);
    }
  }

  // End of Life Cycle methods

  // Begin of container functions

  onContributionConfirm(e) {
    e.preventDefault();
    /*  form = document.getElementById('contriForm'); */

    const fromAddress = document.getElementById('fromAddress').value;
    console.log(typeof(this.state.dollarsInvested));
    if (parseInt(this.state.dollarsInvested) < this.state.minInvest) {
      this.notifyMinimum();
    } else if (!this.state.valid) {
      const curr = this.state.curr;
      toast.error(`Please enter a valid ${curr} address`);
    } else if (this.state.curr == 'Bitcoin') {
    const tokenReceive = document.getElementById('tokenReceive').value;

        if(!this.state.validWallet){
          toast.error('Please enter a valid ERC20 address');
        }else{
          this.setState({
            confirmContri: true,
            fromAddress,
            tokenReceiveAddress: tokenReceive,
          })

          const body = {
            tokens: this.state.tokens,
            type: this.state.curr,
            amount: this.state.currencyQuantity,
            fromAddress,
            toAddress: this.state.btcAddress,
            tokenReceivingAddress: tokenReceive,
            usdAmount: this.state.dollarsInvested,
          };

          // console.log(body);
          this.props.confirmPayment(body);
        }
    } else{
        this.setState({
          confirmContri: true,
          fromAddress,
          tokenReceiveAddress: fromAddress,
        });

        const body = {
          tokens: this.state.tokens,
          type: this.state.curr,
          amount: this.state.currencyQuantity,
          fromAddress,
          toAddress: this.state.ethAddress,
          tokenReceivingAddress: fromAddress,
          usdAmount: this.state.dollarsInvested,
        };

        // console.log(body);
        this.props.confirmPayment(body);
    }

  }


  notifyMinimum() {
    toast.error(`Minimum contribution is $ ${this.state.minInvest}`);
  }
  

  confirm(data) {
    // console.log(this.props.transactionId)
    let body = {
      transactionId: this.props.transactionId,
      transactionHash:data,
    }
    this.props.finalizePayment(body);
  }

  comeBack() {
    this.setState({
      confirmContri: false,
      curr: 'Ethereum',
      ethToDollar: this.props.successData.ethUsd,

    });

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
          validBlank: 'false'
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
        dollarQuantity: currencyQuantity * this.state.btcToDollar,
        tokens: this.state.tokensPerBitcoin * currencyQuantity,
        dollars: e.target.value,
      });
    } else {
      this.setState({
        currencyQuantity,
        dollarQuantity: currencyQuantity * this.state.ethToDollar,
        tokens: currencyQuantity * this.state.tokensPerEther,
        dollars: e.target.value,
      });
    }
    document.getElementById('tokens').value = this.state.tokens;
  }

  CurrencyChange(e) {
    /* console.log(e.target.value); */
    let currencyQuantity = document.getElementById('currencyqty');
    let add = document.getElementById('fromAddress').value;
    if (currencyQuantity.length === 0) {
      currencyQuantity = 0;
    }
    if (e.target.value === 'BTC') {
      this.setState({
        fromAddress: '',
        tokenReceiveAddress: this.props.userInfo.userInfo.ethAddress,
        validWallet: true
      })
      currencyQuantity.value = this.state.dollarsInvested / this.state.btcToDollar;
      if (add.match(/^[13][a-km-zA-HJ-NP-Z0-9]{26,33}$/)) {
        // console.log('done btc');
        this.setState({
          valid: true,
          validBlank: 'false',
          curr: 'Bitcoin',
          currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
          dollarQuantity: currencyQuantity.value * this.state.btcToDollar,
          tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
        });
      }else if(add == ''){
       // console.log('Empty');
        this.setState({
          validBlank: 'true',
          curr: 'Bitcoin',
          currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
          dollarQuantity: currencyQuantity.value * this.state.btcToDollar,
          tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
        })
      }else {
        // console.log('not done');
        this.setState({
          valid: false,
          curr: 'Bitcoin',
          currencyQuantity: this.state.dollarsInvested / this.state.btcToDollar,
          dollarQuantity: currencyQuantity.value * this.state.btcToDollar,
          tokens: currencyQuantity.value * this.state.tokensPerBitcoin,
        });
      }


    } else {
      currencyQuantity.value = this.state.dollarsInvested / this.state.ethToDollar;
      this.setState({
        fromAddress: this.props.userInfo.userInfo.ethAddress,
        tokenReceiveAddress: false,
        validBlank: true
      })
      if (add.match(/^0x[a-fA-F0-9]{40}$/)) {
       // console.log('done eth');
        this.setState({
          valid: true,
          validBlank: 'false',
          curr: 'Ethereum',
          validWallet: true,
          currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
         dollarQuantity: currencyQuantity.value * this.state.ethToDollar,
         tokens: currencyQuantity.value * this.state.tokensPerEther,
        });
      }else if(add == ''){
        // console.log('Empty');
        this.setState({
          validBlank: 'true',
          curr: 'Ethereum',
        currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
        dollarQuantity: currencyQuantity.value * this.state.ethToDollar,
        tokens: currencyQuantity.value * this.state.tokensPerEther,
        tokensWithBonus: (currencyQuantity.value * this.state.tokensPerEther) + ((currencyQuantity.value * this.state.tokensPerBitcoin) * (this.state.bonus / 100)),
        })
      }else {
       // console.log('not done');
        this.setState({
          valid: false,
          validBlank: 'false',
          curr: 'Ethereum',
        currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
        dollarQuantity: currencyQuantity.value * this.state.ethToDollar,
        tokens: currencyQuantity.value * this.state.tokensPerEther,
        });
      }


    }
  }

  dollarInvested(e) {
     const currencyQuant = document.getElementById('currencyqty');
     this.setState({
       dollarsInvested: e.target.value,
     });
     if (this.state.curr == 'Ethereum') {
       currencyQuant.value = e.target.value / this.state.ethToDollar;
       this.setState({
         currencyQuantity: currencyQuant.value,
         dollarQuantity: currencyQuant.value * this.state.ethToDollar,
         tokens: this.state.tokensPerEther * currencyQuant.value,
       });
     } else {
       currencyQuant.value = e.target.value / this.state.btcToDollar;
       this.setState({
         currencyQuantity: currencyQuant.value,
         dollarQuantity: currencyQuant.value * this.state.btcToDollar,
         tokens: this.state.tokensPerBitcoin * currencyQuant.value,
       });
     }
   }
   updatetime() {
    if (this.state.timer > 0) {
      const min = this.state.timer / 60;
      const minutes = Math.floor(min);
      const seconds = this.state.timer % 60;
      this.setState({
        timer: this.state.timer - 1,
        minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      });
    } else {
      clearInterval(this.state.interval);
      this.props.dash();
      this.props.reload();
    }
  }

  // End of container functions
  render() {
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
    if (this.state.confirmContri) {
      return (
        <ContributionConfirm
        min={this.state.minutes}
        sec={this.state.seconds}
        dollars={this.state.dollarQuantity}
        currency={this.state.curr}
        tokens={this.state.tokens}
        currencyQty={this.state.currencyQuantity}
        back={this.comeBack}
        btcAddress={this.props.successData.btcAddress}
        ethAddress={this.props.successData.ethAddress}
        fromAddress={this.state.fromAddress}
        tokenReceive={this.state.tokenReceiveAddress}
        finalPayment={this.confirm}
      
        />
      );
    }
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
          <div className="panel-heading">Contribution</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-12">
                <div className="contribution">
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-md-offset-3 text-center">


                      {/* <h2>{this.state.bonus}% Bonus until 24 July 2018</h2> */}
                      <p style={{color:'#ff0000'}}>Minimum investment ${this.state.minInvest}</p>
                      <h4>Time remaining for this transaction:<span style={{color: '#ff0000'}}> {this.state.minutes}:{this.state.seconds} </span>(mm:ss)</h4>

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <form id="contriForm" onSubmit={this.onContributionConfirm} >
                        <div className="frm-block">

                          <div className="form-group">
                            <label htmlFor="dollars" className="form-label">How much Dollars you would like to invest?</label>
                            <input id="dollars" onChange={this.dollarInvested} type="number" className="form-input form-control" required/>

                          </div>
                          <div className="form-group">

                            <label htmlFor="currency" className="form-label">Select your currency</label>
                            <span className="select-wrapper"><select id="currency" name="currency" onChange={this.CurrencyChange} className="form-input" required>
                              <option value="ETH">ETH</option>
                              <option value="BTC">BTC</option>
                            </select>
                            </span>
                            <span id="currency-tokens">1  {this.state.curr}= {(this.state.curr === 'Ethereum') ? this.state.tokensPerEther.toFixed(2) : (this.state.tokensPerBitcoin).toFixed(2)} ZIN tokens</span>
                          </div>

                          <div className="form-group">
                            <label htmlFor="currencyqty" className="form-label">Amount in {this.state.curr}</label>
                            <input id="currencyqty" type="text" value={this.state.currencyQuantity} className="form-input form-control text-right" disabled required/>

                          </div>

                          <div className="form-group">
                            <label htmlFor="tokens" className="form-label">NO. OF ZIN TOKENS</label>
                            <input id="tokens" type="text" value={this.state.tokens} className="form-input form-control text-right" disabled required/>

                          </div>


                          <div className="form-group">
                            <label htmlFor="sendingAddress" className="form-label">Address of {(this.state.curr == 'Ethereum') ? 'ETH' : 'BTC'} wallet you are sending from?</label>
                            <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddress} className="form-input form-control text-left" required/>
                          </div>

                          {(this.state.valid == false && this.state.validBlank == 'false') ? <p style={{color:"#ff0000"}}>Please enter a valid address</p>:<p></p>}
                          {(this.state.curr == 'Bitcoin') ?
                          (<div className="form-group">
                            <label htmlFor="acceptingAddress" className="form-label">ETH address for Receiving ZIN tokens</label>
                            <input id="tokenReceive" onChange={this.validatorWallet} value={this.state.tokenReceiveAddress} type="text" className="form-input form-control text-left" required/>
                            </div>) : <div></div>
                            }

                        {(this.state.validWallet == false && this.state.validWalletBlank == 'false' && this.state.curr == 'Bitcoin') ? <p style={{color:"#ff0000"}}>Please enter a valid ERC20 wallet address</p>:<p></p>}
                          <span><strong style={{color:"#ff0000"}}>Note:</strong> Please provide ERC-20 compatible wallet address</span>
                          <div className="btn-row">
                            <button className="form-button btn-primary" type="submit" >Continue</button>
                          </div>
                        </div>
                      </form>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>);
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
  userInfo: makeSelectDashBoardWelcomePage()
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
