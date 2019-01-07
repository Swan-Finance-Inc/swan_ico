/**
 *
 * Activity
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import ReactTable from 'react-table';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectActivity, { makeSelectLoading, makeSelectLogs} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadActivity } from './actions'
import LoadingSpinner from 'components/LoadingSpinner/Loadable';
import 'react-table/react-table.css';

export class Activity extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

        constructor(props){
          super(props)
          this.state = {
            data:[{
              userActionType:" Vola"
            }],
            columns:[
                {
                  Header: 'Activity Type',
                  accessor: 'userActionType',
                  className: 'text-center'
                },
                {
                  Header: 'Created Date',
                  accessor: 'created_at',
                  className: 'text-center'
                }
              ]
          }
        }

  componentDidMount(){
    this.props.loadActivity()
  }
  componentWillReceiveProps(nextProps){
    console.log(nextProps,' props inside will Receive Props')
        if(nextProps.logs){
            this.setState({
            logs:nextProps.logs
            })
          }

  }

  render() {
    console.log(this.state," State in activity")
    console.log(this.props," props in activity")
    const  loading  = this.props.loading;
    return (
        <div>
        {loading?<LoadingSpinner / >:<div>
          <ReactTable
              showPaginationBottom={true}
              style={{ marginTop: '20px', fontSize: '12px', cursor: 'default' }}
              data={this.state.logs}
              columns={this.state.columns}
              pageSizeOptions={[5, 10]}
              noDataText={'No transactions found'}
              rowsText={'transactions'}
              defaultPageSize={10}

            />
          </div>
        }
        </div>

    );
  }
}

Activity.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  activity: makeSelectActivity(),
  logs:makeSelectLogs(),
  loading:makeSelectLoading()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadActivity: (data) => (dispatch(loadActivity(data)))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'activity', reducer });
const withSaga = injectSaga({ key: 'activity', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Activity);
