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
import { toast } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import CustomLoading from 'components/CustomLoading/Loadable';
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
      contribute: true,
      confirmContri: false,
      curr: 'Ethereum',
      ethToDollar: 600,
      currencyQuantity: 0,
      dollarQuantity: 0,
      tokens: 0,
      tokensWithDiscount: 0,
      tokensWithDiscountPerEther: 0,
      tokensPerEther: 0,
      ethAddress: false,
      fromAddress: false,
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
      discount: 'x',
      stage: '',
      minInvest: 'x',
      privateSaleTokenUsd: 0,
      discountSaleTokenUsd: 0,
      mainSaleTokenUsd: 0,
      fromAddress: ''
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
    // console.log('data : ',data);
    // console.log('props : ',this.props);
    const interval = setInterval(() => this.updatetime(), 1000);
    let tokensAfterDiscount = 0;
    if(data.stage == 'Presale'){
      tokensAfterDiscount = data.ethUsd * data.privateSaleTokenUsd;
    }else if(data.stage == 'Discounted sale'){
      tokensAfterDiscount = data.ethUsd * data.discountSaleTokenUsd;
    }else if(data.stage == 'Crowdsale'){
      tokensAfterDiscount = data.ethUsd * data.mainSaleTokenUsd
    }
    const fromAddress = this.props.dashboard.userInfo.ethAddress;
    this.setState({
      ethToDollar: data.ethUsd,
      tokensPerEther: data.ethUsd * data.mainSaleTokenUsd,
      ethAddress: data.ethAddress,
      interval,
      discount: data.discount,
      stage: data.stage,
      minInvest: data.minInvest,
      privateSaleTokenUsd: data.privateSaleTokenUsd,
      discountSaleTokenUsd: data.discountSaleTokenUsd,
      mainSaleTokenUsd: data.mainSaleTokenUsd,
      tokensWithDiscountPerEther: tokensAfterDiscount,
      fromAddress
    });
  }

  componentWillReceiveProps(nextProps) {


    const data = nextProps.successData;

    let tokensAfterDiscount = 0;
    if(data.stage == 'Presale'){
      tokensAfterDiscount = data.ethUsd * data.privateSaleTokenUsd;
    }else if(data.stage == 'Discounted sale'){
      tokensAfterDiscount = data.ethUsd * data.discountSaleTokenUsd;
    }else if(data.stage == 'Crowdsale'){
      tokensAfterDiscount = data.ethUsd * data.mainSaleTokenUsd
    }
    this.setState({
      ethToDollar: data.ethUsd,
      tokensPerEther: data.ethUsd * data.mainSaleTokenUsd,
      ethAddress: data.ethAddress,
      time: nextProps.deadline,
      discount: data.discount,
      stage: data.stage,
      minInvest: data.minInvest,
      privateSaleTokenUsd: data.privateSaleTokenUsd,
      mainSaleTokenUsd: data.mainSaleTokenUsd,
      discountSaleTokenUsd: data.discountSaleTokenUsd,
      tokensWithDiscountPerEther: tokensAfterDiscount
    });
  }

  // End of Life Cycle methods

  // Begin of container functions

  onContributionConfirm(e) {
    e.preventDefault();
    /*  form = document.getElementById('contriForm'); */

    const fromAddress = document.getElementById('fromAddress').value;
    if (parseInt(this.state.dollarsInvested) < this.state.minInvest) {
      this.notifyMinimum();
    } else if (!this.state.valid) {
      const curr = this.state.curr;
      toast.error(`Please enter a valid ${curr} address`);
    }
     else{
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
    toast.error('Minimum contribution is $' + this.state.minInvest);
  }
  
  notifyDeposit(msg) {
    toast.success(msg);
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

  validator(e) {
    const add = e.target.value;
    // console.log(add)
    // console.log(e.target.value);
    // const add = e.target.value;
    this.setState({
      fromAddress : e.target.value
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
     if (this.state.curr === 'Ethereum') {
      this.setState({
        currencyQuantity,
        dollarQuantity: currencyQuantity * this.state.ethToDollar,
        tokens: currencyQuantity * this.state.tokensPerEther,
        tokensWithDiscount: currencyQuantity * this.state.tokensWithDiscountPerEther,
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
     if(e.target.value == 'ETH') {
      currencyQuantity.value = this.state.dollarsInvested / this.state.ethToDollar;

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
         tokensWithDiscount: currencyQuantity.value * this.state.tokensWithDiscountPerEther,
        });
      }else if(add == ''){
        // console.log('Empty');
        this.setState({
          validBlank: 'true',
          curr: 'Ethereum',
        currencyQuantity: this.state.dollarsInvested / this.state.ethToDollar,
        dollarQuantity: currencyQuantity.value * this.state.ethToDollar,
        tokens: currencyQuantity.value * this.state.tokensPerEther,
        tokensWithDiscount: currencyQuantity.value * this.state.tokensWithDiscountPerEther,
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
        tokensWithDiscount: currencyQuantity.value * this.state.tokensWithDiscountPerEther,
        });
      }


    }
  }

  dollarInvested(e) {
   // console.log('hello');
    const currencyQuant = document.getElementById('currencyqty');
   // console.log(currencyQuant.value);
    this.setState({
      dollarsInvested: e.target.value
    });
    if (this.state.curr == 'Ethereum') {
      currencyQuant.value = e.target.value / this.state.ethToDollar;
      // console.log(currencyQuant.value);

      this.setState({
        currencyQuantity: currencyQuant.value,
        dollarQuantity: currencyQuant.value * this.state.ethToDollar,
        tokens: this.state.tokensPerEther * currencyQuant.value,
        tokensWithDiscount: currencyQuant.value * this.state.tokensWithDiscountPerEther,
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
        tokens={this.state.tokensWithDiscount}
        currencyQty={this.state.currencyQuantity}
        back={this.comeBack}
        ethAddress={this.props.successData.ethAddress}
        fromAddress={this.state.fromAddress}
        tokenReceive={this.state.tokenReceiveAddress}
        finalPayment={this.confirm}

        />
      );
    }
    if (this.props.dashboard.loading) {
      return (
        <div>
          <CustomLoading />
        </div>);
    }
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        {/* <h1>Security</h1> */}
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
            <div className="panel panel-default">
              <div className="panel-heading">Contribution</div>
                <div className="panel-body" style={{fontSize:'16px'}}>
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-md-offset-3 text-center">


                      <h2>{this.state.discount}% Discount on {this.state.stage} until 24 July 2018</h2>
                      <h4 style={{color:'#ff0000'}}>Minimum investment ${this.state.minInvest}</h4>
                      <h4>Time remaining for this transaction:<span style={{color: '#ff0000'}}> {this.state.minutes}:{this.state.seconds} </span>(mm:ss)</h4>
                      <span>1  {this.state.curr} = {this.state.tokensPerEther.toFixed(2)} ZIN tokens <br/></span>
                      <span>1 ZIN = $ 0.0025<br/></span>
                      <span>1 ZIN(After Discount) = $ {(100-this.state.discount) * 0.0025 * 0.01}<br/></span>
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
                            <label htmlFor="currencyqty" className="form-label">Amount in {this.state.curr}</label>
                            <input id="currencyqty" type="text" value={this.state.currencyQuantity} className="form-input form-control text-right" disabled required/>
                          </div>

                          <div className="form-group">
                            <label htmlFor="tokens" className="form-label">NO. OF ZIN TOKENS (without discount)</label>
                            <input id="tokens" type="text" value={this.state.tokens} className="form-input form-control text-right" disabled required/>

                          </div>
                          <div className="form-group">
                            <label htmlFor="tokensWithBonus" className="form-label">No. Of ZIN Tokens after {this.state.discount }%  discount</label>
                            <input id="tokensWithBonus" type="text" value={this.state.tokensWithDiscount} className="form-input form-control text-right" disabled required/>

                          </div>


                          <div className="form-group">
                            <label htmlFor="sendingAddress" className="form-label">Address of ETH wallet you are sending from?</label>
                            <input id="fromAddress" onChange={this.validator} type="text" value={this.state.fromAddress} className="form-input form-control text-left" required/>

                          </div>

                          {(this.state.valid == false && this.state.validBlank == 'false') ? <p style={{color:"#ff0000"}}>Please enter a valid address</p>:<p></p>}
                          

                        <span><strong style={{color:"#ff0000"}}>Note:</strong> Please provide ERC-20 compatible wallet address</span>
                          <div className="btn-row">
                            <button className="form-button btn btn-primary" type="submit" >Continue</button>
                          </div>
                        </div>
                      </form>

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
  dashboard: makeSelectDashBoardWelcomePage()
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
