/**
 *
 * Unsubscribe
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect, Link } from 'react-router-dom';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUnsubscribe from './selectors';
import reducer from './reducer';
import saga from './saga';
import { unsubscribeUserAction } from "./actions";
import { makeSelectDetails } from '../ProfilePage/selectors';

export class Unsubscribe extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  handleUnsubscribe = () => {
    this.props.unsubscribeUserAction({ email: this.state.email });
  }

  componentDidMount() {
    const email = window.location.href.split("?email=")[1];
    console.log("email: ", email);
    console.log("email: ", typeof email);
    this.setState({
      email: email
    });
  }

  render() {
    return (
      <div className="wrapper">
        <header className="header signin">
          <div className="container">
            <div className="row">

              <div className="col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix">

                <div className="logo"><Link to="/"><img src="https://s3.amazonaws.com/websiteimagesrama/logo.png" alt="ruc" /></Link></div>
              </div>
              <div className="col-xs-7 col-sm-6 col-md-10"></div>
            </div>
          </div>
        </header>
        <div className="signin-block">
          <div className="container">
            <div className="row">
            <div className='col-md-8 col-md-offset-2'>
            <div className="title-subtile-holder ">
            <h2  className="unsubscribeHeading">Unsubscribe Request</h2>
            <div className="section-border dark_border"></div>
            <div className="moveCenter col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
              <label className="mr-10" htmlFor="email">Email</label>
              <input className="inputFieldEmail" type="email" name="email" value={this.state.email} disabled/>
            </div>

{/*
            <h2  className="unsubscribeHeading">Unsubscribe Successful</h2>
<div className="section-border dark_border"></div>
<p className='unsubscribePara'  >You have been successfully removed from our subscriber list.</p>
<p className='unsubscribePara' >You will no longer receive updates from us.</p>
*/}
<p>&nbsp;</p>
<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 unsubscribeLi">
<p ><strong> If you have a moment, please let us know why did you unsubscribe </strong></p>
<ul >
<li><input type="radio" name="reason" id="many" value="many" />&nbsp;<label htmlFor="many">You send too many emails</label></li>
<li><input type="radio" name="reason" id="irrelevant" value="irrelevant" />&nbsp;<label htmlFor="irrelevant">Your content is irrelevant to me</label></li>
<li><input type="radio" name="reason" id="boring" value="boring" />&nbsp;<label htmlFor="boring">Your content is boring</label></li>
<li><input type="radio" name="reason" id="nolonger" value="nolonger" />&nbsp;<label htmlFor="nolonger">I no longer want to receive these emails</label></li>
<li><input type="radio" name="reason" id="never" value="never" />&nbsp;<label htmlFor="never">I never signed up for this mailing list</label></li>
</ul>
</div>
<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2">
<div>&nbsp;</div>
<center>
<input type="submit" value="Submit" onClick={this.handleUnsubscribe} className="btnunsubscribe btn btn-danger"/>
</center>
<center id="responsmsg">
</center>
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

Unsubscribe.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // unsubscribe: makeSelectUnsubscribe(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    unsubscribeUserAction: (data) => dispatch(unsubscribeUserAction(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'unsubscribe', reducer });
const withSaga = injectSaga({ key: 'unsubscribe', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Unsubscribe);
