/**
 *
 * TransactionHistory
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import ReactTable from 'react-table';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import { makeGlobalParent } from 'containers/App/selectors';
import { toast } from 'react-toastify';
import { depositSuccess } from 'containers/App/actions';
import 'react-table/react-table.css';
import { getTransactions } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectTransactionHistory, { makeSelectTransactions, makeSelectNextPage ,makeSelectTransLoading } from './selectors';
import LoadingSpinner from 'components/LoadingSpinner/Loadable';

export class TransactionHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [
        {
          Header: 'Currency',
          accessor: 'type', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: 'Amount',
          accessor: 'amount', // Custom cell components!
          className: 'text-right'
        },
        {
          Header: 'Transaction Hash',
          accessor: 'transactionHash', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: 'Transaction Status',
          accessor: 'status', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: 'RUC Tokens',
          accessor: 'tokens', // Custom cell components!
          className: 'text-right'
        },  {
            Header: 'Phase',
            accessor: 'phase', // Custom cell components!
            className: 'text-right'
          },
          {
             Header: 'Rate',
             accessor: 'rate', // Custom cell components!
             className: 'text-right'
           },
        {
          Header: 'Time',
          accessor: 'created_at',
          filter: <h3>hello</h3>,
        },

      ],

      page: 1,
      disableNext: false,
      disablePrevious: true,
    };

    this.pageChange = this.pageChange.bind(this);

    this.previousChange = this.previousChange.bind(this);
  }


  componentDidMount() {
    this.props.transactions(this.state.page);

  // console.log(this.props);
    if (this.props.message) {
      this.notify();
      this.props.deposit(false);
    }
  }


  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.transactionsData,
      disableNext: !nextProps.nextPage,
    });
    // console.log(nextProps.message);
    // console.log(nextProps.globalPage.message);
    if (nextProps.message) {
      this.notify();
    }
  }
  pageChange() {
    this.setState({
      page: this.state.page + 1,
    });
    if (this.state.page + 1 > 1) {
      this.setState({
        disablePrevious: false,
      });
    } else {
      this.setState({
        disablePrevious: true,
      });
    }
    this.props.transactions(this.state.page + 1);
  }
  pageSizeChange(e) {
    // console.log('page size change');
    // console.log(e / 10);
    const page = e / 10;
    this.props.transactions(page);
  }
  previousChange() {
    if (this.state.page > 1) {
      this.setState({
        page: this.state.page - 1,
      });
      if (this.state.page - 1 == 1) {
        this.setState({
          disablePrevious: true,
        });
      }
      this.props.transactions(this.state.page - 1);
    }
  }
  notify() {
    toast.success('Transaction deposited successfully');
  }
  render() {
    console.log(this.props," props in transaction history");
    console.log(this.state," state in transaction history");
    let loading = this.props.loading
    return (


      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>Transactions</title>
        <meta name="description" content="Description of Transactions" />
      </Helmet>

        {/* { <h1>Transactions</h1> } */}
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
        <div className="panel-heading">Transactions</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-12">
                <div className="contribution" >
                  <div className="row">
                    <div className="col-sm-12 col-md-6 col-md-offset-3 text-center ">

                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">

                      <button className="btn btn-primary b1" disabled={this.state.disablePrevious} onClick={this.previousChange}> Previous Page </button>
                      <button className="btn btn-primary b2" style={{ right: '16px', position: 'absolute' }} onClick={this.pageChange} disabled={this.state.disableNext}>Next Page </button>

                    {loading?<LoadingSpinner style = {{alignItems:"center",marginTop:"70px",marginBottom:"90px", background:"#fff"}} /> :<ReactTable
                        showPaginationBottom={false}
                        style={{ marginTop: '20px', fontSize: '12px', cursor: 'default' }}
                        data={this.state.data}
                        columns={this.state.columns}
                        onPageChange={this.pageChange}
                        pageSizeOptions={[5, 10]}
                        noDataText={'No transactions found'}
                        rowsText={'transactions'}
                        defaultPageSize={10}

                      />}
                    </div>
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

TransactionHistory.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  transactionhistory: makeSelectTransactionHistory(),
  globalPage: makeGlobalParent(),
  transactionsData: makeSelectTransactions(),
  nextPage: makeSelectNextPage(),
  loading:makeSelectTransLoading()

});
function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    deposit: (data) => (dispatch(depositSuccess(data))),
    transactions: (data) => (dispatch(getTransactions(data))),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'transactionHistory', reducer });
const withSaga = injectSaga({ key: 'transactionHistory', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(TransactionHistory);
