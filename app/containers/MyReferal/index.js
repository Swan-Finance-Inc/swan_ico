/**
 *
 * MyReferal
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Helmet } from 'react-helmet';
import ReactTable from 'react-table';
import LoadingSpinner from 'components/LoadingSpinner/Loadable';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import makeSelectMyReferal, { makeSelectMyReferalloading, makeSelectMyReferalData } from './selectors';
import Refer from 'components/Refer/Loadable';
import { getReferalData } from './actions';
import Info from "../../components/Info";

import reducer from './reducer';
import saga from './saga';

export class MyReferal extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)
    this.state= {
      infoShow: false,
      users:[
        {
            "local": {
                "email": "quillhash@gmail.com"
            },
            "_id": "5c127ab8caaefa2fc7c1c63b",
            "created_at": "2018-12-13T15:28:57.039Z"
        },
        {
            "local": {
                "email": "quillaudit@gmail.com"
            },
            "_id": "5c127ab8caaefa2fc7c1c63b",
            "created_at": "2018-12-01T15:28:57.039Z"
        },
      ],
      transactions: [
            {
                "tokens": 500000000000,
                "status": "confirmed",
                "created_at": "2018-12-13T16:48:08.112Z"
            }
        ],
      userCollumn: [
          {
            Header: 'Email',
            accessor: 'local.email',
            className: 'name'
          },
          {
            Header: 'Created At',
            accessor: 'created_at', // Custom cell components!
            className: 'created_at'
          }
        ],
      transactionCollumn: [
            {
              Header: 'Status',
              accessor: 'status',
              className: 'status'
            },
            {
              Header: 'Email',
              accessor: 'initiatedBy.email',
              className: 'status'
            },
            {
              Header: 'Tokens can be earned',
              accessor: (row)=> ((row.referBonus * 0.01) * (row.tokens * 100/(row.bonus +100))), // Custom cell components!
              className: 'email',
              id:'tokensCanbeEarned'
            },
            {
              Header: 'Created At',
              accessor: 'created_at', // Custom cell components!
              className: 'created_at'
            }
          ],
          code:'',
          link:'',
          percent:'',
    }
  }
  componentDidMount(){
    this.props.getReferalData()
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.referData){
      if(nextProps.referData.success){
        console.log(" inside success in willrecieveprops ");
        let transaction = []
        let users = []
        let data = nextProps.referData
        console.log(data," data in willrecieveprops")
    data.transactions.forEach((tran,i)=>{
      tran.forEach((entry,j)=>transaction.push(entry))
    });
    data.users.forEach((user,i)=>users.push(user))
    // data.users.forEach((user,i)=>users.push(tran));
    this.setState({
      transactions:transaction,
      users:users
    })
      }
    }
  }

  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow
    });
    console.log('infoShow : ', this.state.infoShow);
  }

  render() {
    console.log(this.props," props in myreferal")
    console.log(this.state," state in myreferal")
    const { loading } = this.props
        return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>My Referrals</title>
        <meta name="description" content="Description of My Referrals" />
      </Helmet>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
        {this.props.code.amountPercent!=0?<Refer  code={this.props.code} icoFlag ={false} />:""}
        {
          //     <div className="panel panel-default">
          //   <div className="panel-heading">Users</div>
          //     <div className="row">
          //     <div className='col-sm-10 col-sm-offset-1'>
          // {!loading?<ReactTable
          //                  className="-striped -highlight"
          //                  showPaginationBottom={true}
          //                  style={{ marginTop: '20px', fontSize: '12px', cursor: 'pointer' }}
          //                  data={this.state.users}
          //                  columns={this.state.userCollumn}
          //                  pageSizeOptions={[5, 10]}
          //                  noDataText={'No user Found'}
          //                  rowsText={'users'}
          //                  defaultPageSize={10}
          //                  getTdProps={(state, rowInfo, column, instance) => ({
          //                    onClick: (e, handleOriginal) => {
          //                      console.log(rowInfo)
          //                      // console.log("It was in this row:", rowInfo);
          //                      // this.props.getMessages(rowInfo.original.ticketId);
          //                      // this.setState({
          //                      //
          //                      //   currentTicketDetails : {
          //                      //     subject: rowInfo.original.subject,
          //                      //     messages: rowInfo.original.messages,
          //                      //     createdAt: rowInfo.original.createdAt,
          //                      //     status: rowInfo.original.status,
          //                      //     ticketId: rowInfo.original.ticketId
          //                      //   },
          //                      //   currentTicketMessages: rowInfo.original.messages
          //                      // })
          //                      // this.handleShowTicket();
          //                      // IMPORTANT! React-Table uses onClick internally to trigger
          //                      // events like expanding SubComponents and pivots.
          //                      // By default a custom 'onClick' handler will override this functionality.
          //                      // If you want to fire the original onClick handler, call the
          //                      // 'handleOriginal' function.
          //                      if (handleOriginal) {
          //                        handleOriginal();
          //                      }
          //                    }
          //                  })}
          //                  defaultPageSize={5}
          //                  showPaginationBottom={true}
          //                />:<LoadingSpinner style = {{alignItems:"center",marginTop:"35px",marginBottom:"45px", background:"#fff"}} />}
          //     </div>
          //     </div>
          //     </div>
        }

          <div className="panel panel-default">
          {/* <div className="panel-heading">Transactions</div> */}
          <div className="panel-heading blueBG">
            <Info hanldeToggle={this.handleInfoModal} toggleFlag={this.state.infoShow} />
            Transactions
          </div>
          <div className="row">
            <div className='col-sm-10 col-sm-offset-1'>
          {!loading?  <ReactTable
                         className="-striped -highlight"
                         showPaginationBottom={true}
                         style={{ marginTop: '20px', fontSize: '12px', cursor: 'pointer' }}
                         data={this.state.transactions}
                         columns={this.state.transactionCollumn}
                         pageSizeOptions={[5, 10]}
                         noDataText={'No Transaction Found'}
                         rowsText={'transactions'}
                         getTdProps={(state, rowInfo, column, instance) => ({
                           onClick: (e, handleOriginal) => {
                             console.log(rowInfo)
                             // console.log("It was in this row:", rowInfo);
                             // this.props.getMessages(rowInfo.original.ticketId);
                             // this.setState({
                             //
                             //   currentTicketDetails : {
                             //     subject: rowInfo.original.subject,
                             //     messages: rowInfo.original.messages,
                             //     createdAt: rowInfo.original.createdAt,
                             //     status: rowInfo.original.status,
                             //     ticketId: rowInfo.original.ticketId
                             //   },
                             //   currentTicketMessages: rowInfo.original.messages
                             // })
                             // this.handleShowTicket();
                             // IMPORTANT! React-Table uses onClick internally to trigger
                             // events like expanding SubComponents and pivots.
                             // By default a custom 'onClick' handler will override this functionality.
                             // If you want to fire the original onClick handler, call the
                             // 'handleOriginal' function.
                             if (handleOriginal) {
                               handleOriginal();
                             }
                           }
                         })}
                         defaultPageSize={5}
                         showPaginationBottom={true}
                       />:<LoadingSpinner style = {{alignItems:"center",marginTop:"35px",marginBottom:"45px", background:"#fff"}} />}
            </div>
          </div>
          </div>
          </div>
          </div>
          </div>
    );
  }
}

MyReferal.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myreferal: makeSelectMyReferal(),
  loading: makeSelectMyReferalloading(),
  referData:makeSelectMyReferalData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getReferalData: (data) => dispatch(getReferalData(data)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'myReferal', reducer });
const withSaga = injectSaga({ key: 'myReferal', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MyReferal);
