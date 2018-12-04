/**
 *
 * Notification
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNotification from './selectors';
import reducer from './reducer';
import saga from './saga';

export class Notification extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>Notifications</title>
        <meta name="description" content="Your Notifications" />
      </Helmet>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
        <div className="panel-heading">Your Notifications</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-12">
              <ul>
                  <li>
                    <div className="notificationWrapper">
                    <div className="notiHeading">Heeading</div>
                    <div className='notiContent'>Content</div>
                    </div>
                  </li>
                  <li>
                  <div className="notificationWrapper">
                  <div className="notiHeading">Heeading</div>
                  <div className='notiContent'>Content</div>
                  </div>
                  </li>
                  <li>
                  <div className="notificationWrapper">
                  <div className="notiHeading">Heeading</div>
                  <div className='notiContent'>Content</div>
                  </div>
                  </li>
                  </ul>

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

Notification.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  notification: makeSelectNotification(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'notification', reducer });
const withSaga = injectSaga({ key: 'notification', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Notification);
