/**
*
* Balance
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Info from "../Info"

class Balance extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      infoShow: false
    };
  }
  toggleTranActive=(e)=>{
    this.props.compact();
    this.props.toggleTranActive();
  // console.log('toggling', e);
  }
  togglemyReferal=(e)=>{
    this.props.compact();
    this.props.togglemyReferal();
  }
  toggleContriActive=(e)=>{
    // if(this.props.kycStatus == 'ACCEPTED'){
      this.props.compact();
      this.props.toggleContActive();
    // }else{
      // toast.error('Please complete your kyc to contribute.')
    // }
  }

  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow
    });
    console.log('infoShow : ', this.state.infoShow);
  }

  render() {
    return (
      <div>
        <div className="panel panel-default">
        <div className="panel-heading blueBG">
          <Info hanldeToggle={this.handleInfoModal} toggleFlag={this.state.infoShow} />
          Your Balance
        </div>
        <div className="panel-body">
        <div className="row">
          <div className="col-sm-12">
            <p>Transaction may take up to 24 hours to approve due to our comprehensive verification methods to protect our customers.</p>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Total Balance</h3>
              <div className="balance">{(this.props.userInfo.tokens.total)}</div>
              {
                !!this.props.userInfo.tokens.total ?
                  (
                    <div className='link referalPageLink'><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive}><u>View Transactions</u></Link></div>
                  ) :
                  (
                    <div>&nbsp; &nbsp; &nbsp;</div>
                  )
              }
              {/* <div className='link referalPageLink'><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive}><u>View Transactions</u></Link></div> */}
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Referral Tokens Earned</h3>
              <div className="balance">{this.props.userInfo.tokens.referral}</div>
              {
                !!this.props.userInfo.tokens.referral ?
                  (
                    <div className='referalPageLink link'><Link to="/dashboard/myReferal" role="button" onClick={this.togglemyReferal}><u>View Referral Transactions</u> </Link></div>
                  ) :
                  (
                    <div>&nbsp; &nbsp; &nbsp;</div>
                  )
              }
              {/* <div className='referalPageLink link'><Link to="/dashboard/myReferal" role="button" onClick={this.togglemyReferal}><u>View Referral Transactions</u> </Link></div> */}
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3># of Confirmed Referrals</h3>
              <div className="balance">{this.props.userInfo.referral.success}</div>
                <div>&nbsp; &nbsp; &nbsp;</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3># of Pending Referrals</h3>
              <div className="balance">{this.props.userInfo.referral.pending}</div>
              <div>&nbsp; &nbsp; &nbsp;</div>
            </div>
          </div>
        </div>
        <div className='row'>
        <div className='text-center'><Link to='/dashboard/contribution' role="button" onClick={this.toggleContriActive}><button disabled={this.props.userInfo.kycStatus!=="ACCEPTED"}  className="btn btn-primary"  style={{borderRadius: '25px', padding: '10px 60px', marginTop:'10px'}}>Invest Now</button></Link></div>
        </div>
        </div>
        </div>
            <div className="panel panel-default">
              <div className="panel-heading blueBG">
                <Info hanldeToggle={this.handleInfoModal} toggleFlag={this.state.infoShow} />
                Bounty Stakes
              </div>
                <div className="panel-body">
                <div className="row">
                  <div className="col-sm-12"><p>To participate in bounty <a href="https://www.google.com" target="_blank" className="link">click here</a>.</p></div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Creative Stakes</h3>
              <div className="balance">{(this.props.userInfo.tokens.bounty.creative)}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Youtube Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.youtube}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Twitter Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.twitter}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Facebook Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.facebook}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Translation Stakes</h3>
              <div className="balance">{(this.props.userInfo.tokens.bounty.translation)}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Reddit Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.reddit}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Telegram Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.telegram}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>Signature Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.signature}</div>
            </div>
          </div>
          <div className="col-sm-6 col-md-3">
            <div className="bal-card">
              <h3>LinkedIn Stakes</h3>
              <div className="balance">{this.props.userInfo.tokens.bounty.linkedIn}</div>
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

Balance.propTypes = {

};

export default Balance;
