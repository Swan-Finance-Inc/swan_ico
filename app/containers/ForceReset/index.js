/**
 *
 * ForceReset
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import logo from '../../images/logoo.gif';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectForceReset from './selectors';
import reducer from './reducer';
import saga from './saga';
import { Link } from 'react-router-dom';
export class ForceReset extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div className="wrapper">
        <header className="header signin">

          <div className="container">
            <div className="row">

              <div className="col-xs-5 col-sm-6 col-sm-6 col-md-2 clearfix">

                <div className="logo"><Link to="/"><img src={ logo } alt="centralex" /></Link></div>
              </div>
              <div className="col-xs-7 col-sm-6 col-md-10">
                <div className="header-right">

                  <div className="header-btn-group">
                    <div className="header-btn"><Link to="/signin">Sign In</Link></div>
                  </div>
                </div></div>
            </div>
          </div>
        </header>
        <section className="signin-block">
          <div className="container">
            <div className="row">
              <div className="col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                <div className="resend">
                  <h1>Your password has been expired.</h1>
                  <h1 className="subtitle">Please check your email to reset your password.</h1>
                </div>

              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

ForceReset.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  forcereset: makeSelectForceReset(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'forceReset', reducer });
const withSaga = injectSaga({ key: 'forceReset', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ForceReset);
