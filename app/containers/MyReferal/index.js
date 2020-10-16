/**
 *
 * MyReferal
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import { Helmet } from "react-helmet";
import ReactTable from "react-table";
import LoadingSpinner from "components/LoadingSpinner/Loadable";
import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import { CopyToClipboard } from "react-copy-to-clipboard";
import makeSelectMyReferal, {
  makeSelectMyReferalloading,
  makeSelectMyReferalData,
} from "./selectors";
import Refer from "components/Refer";
import { getReferalData } from "./actions";
import Info from "../../components/Info";
import mdCopy from "../../images/md-copy.svg";
import reducer from "./reducer";
import saga from "./saga";
import Referral from "../../images/referral_astro.png";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import MyPaginnation from "../../components/MyPaginnation";
import EmptyFile from "../../images/EmptyFile.svg";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import { ToastContainer, toast } from 'react-toastify';

export class MyReferal extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      infoShow: false,
      referralUrl :'',
      users: [
        {
          local: {
            email: "quillhash@gmail.com",
          },
          _id: "5c127ab8caaefa2fc7c1c63b",
          created_at: "2018-12-13T15:28:57.039Z",
        },
        {
          local: {
            email: "quillaudit@gmail.com",
          },
          _id: "5c127ab8caaefa2fc7c1c63b",
          created_at: "2018-12-01T15:28:57.039Z",
        },
      ],
      transactions: [
        {
          tokens: 500000000000,
          status: "confirmed",
          created_at: "2018-12-13T16:48:08.112Z",
        },
      ],
      userCollumn: [
        {
          Header: "Email",
          accessor: "local.email",
          className: "name",
        },
        {
          Header: "Created At",
          accessor: "created_at", // Custom cell components!
          className: "created_at",
        },
      ],
      transactionCollumn: [
        {
          Header: "Status",
          accessor: "status",
          className: "status",
        },
        {
          Header: "Email",
          accessor: "initiatedBy.email",
          className: "status",
        },
        {
          Header: "Tokens can be earned",
          accessor: (row) =>
            row.referBonus * 0.01 * ((row.tokens * 100) / (row.bonus + 100)), // Custom cell components!
          className: "email",
          id: "tokensCanbeEarned",
        },
        {
          Header: "Created At",
          accessor: "created_at", // Custom cell components!
          className: "created_at",
        },
      ],
      code: "",
      link: "",
      percent: "",
      transactionParam: {
        page: 1,
        type: "",
        createdUl: "",
        createdLl: "",
      },
    };
  }
  componentDidMount() {
    this.props.getReferalData();
    this.setState({
      ...this.state,
      referralUrl:`https://tokensale.centralex.com/signup/refer/${this.props.referralCode}`
    })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.referData) {
      if (nextProps.referData.success) {
        console.log(" inside success in willrecieveprops ");
        let transaction = [];
        let users = [];
        let data = nextProps.referData;
        console.log(data, " data in willrecieveprops");
        data.transactions.forEach((tran, i) => {
          tran.forEach((entry, j) => transaction.push(entry));
        });
        data.users.forEach((user, i) => users.push(user));
        // data.users.forEach((user,i)=>users.push(tran));
        this.setState({
          transactions: transaction,
          users: users,
        });
      }
    }
  }

  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow,
    });
    console.log("infoShow : ", this.state.infoShow);
  };

  resetInfo = () => {
    this.props.toggleInfo();
  };

  clearFilter = (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "clearType":
        document.getElementById("typeFilter").selectedIndex = 0;
        this.setState(
          {
            ...this.state,
            transactionParam: {
              ...this.state.transactionParam,
              type: "",
            },
            disablePrevious: true,
          },
          () => {
            console.log(this.state, " in clearFilter clearType");
            this.props.transactions(this.state.transactionParam);
          }
        );
        break;
      case "clearCreated":
        {
          // document.getElementById('createdMinFilter').value = null;
          // document.getElementById('createdMaxFilter').value = null;
        }
        this.setState(
          {
            transactionParam: {
              page: 1,
              createdLl: "",
              createdUl: "",
            },
            disablePrevious: true,
          },
          () => {
            console.log(this.state, " in clearFilter clearCreated");
            this.props.transactions(this.state.transactionParam);
          }
        );
        break;
    }
  };

  handleTypeFilter = (e) => {
    // console.log(e.target.value);
    this.setState(
      {
        ...this.state,
        transactionParam: {
          ...this.state.transactionParam,
          type: e.target.value,
          page: 1,
        },
        disablePrevious: true,
      },
      () => {
        console.log(this.state, " in type filter handler");
        this.props.transactions(this.state.transactionParam);
      }
    );
  };

  handleMinCreatedFilter = (date) => {
    this.setState(
      {
        ...this.state,
        transactionParam: {
          ...this.state.transactionParam,
          createdLl: moment(date).format("YYYY-MM-DD"),
        },
        disablePrevious: true,
      },
      () => {
        console.log(
          this.state.transactionParam,
          " in handlle minefilter token--"
        );
        if (this.state.transactionParam.createdUl !== "") {
          console.log(
            this.state.transactionParam.createdUl,
            "-----------------------------"
          );
          if (
            moment(this.state.transactionParam.createdUl).isSameOrAfter(
              this.state.transactionParam.createdLl,
              "day"
            )
          ) {
            this.props.transactions(this.state.transactionParam);
          } else {
            toast.error("Min Date cannot be Greater than Max Date");
          }
        } else {
          this.props.transactions(this.state.transactionParam);
        }
      }
    );

    handleMaxCreatedFilter = (date) => {
      this.setState(
        {
          ...this.state,
          transactionParam: {
            ...this.state.transactionParam,
            createdUl: moment(date).format("YYYY-MM-DD"),
          },
          disablePrevious: true,
        },
        () => {
          console.log(
            this.state.transactionParam,
            " in handle maxCreatedFilter"
          );
          if (this.state.transactionParam.createdLl !== "") {
            console.log(
              this.state.transactionParam.createdLl,
              " -------------------------------------------"
            );
            if (
              moment(this.state.transactionParam.createdUl).isSameOrAfter(
                this.state.transactionParam.createdLl,
                "day"
              )
            ) {
              this.props.transactions(this.state.transactionParam);
            } else {
              toast.error("Min Date cannot be Greater than Max Date");
            }
          } else {
            this.props.transactions(this.state.transactionParam);
          }
        }
      );
    };
  };

  handleTypeFilter = (e) => {
    // console.log(e.target.value);
    this.setState(
      {
        ...this.state,
        transactionParam: {
          ...this.state.transactionParam,
          type: e.target.value,
          page: 1,
        },
        disablePrevious: true,
      },
      () => {
        console.log(this.state, " in type filter handler");
        this.props.transactions(this.state.transactionParam);
      }
    );
  };

  render() {
    console.log(this.props, " props in myreferal");
    console.log(this.state, " state in myreferal");
    const { loading } = this.props;
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        <Helmet>
          <title>My Referrals</title>
          <meta name="description" content="Description of My Referrals" />
        </Helmet>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="renove-bottom-shadow balance-card" style={{ height: "auto" }}>
                  <div className="balance-card-inner-wrappper">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3
                        className="mt-30 balance-card-inner-wrapper-heading"
                        style={{ lineHeight: "1.3" }}
                      >
                        Invite Your Friends <br />& Earn Coins
                      </h3>
                      <hr className="invite-hr" />
                      <p className="mt-30 referral-content">
                        Earn 10% or Up to 250 Tokens <br />
                        For the first purchase by the referred.
                      </p>
                      <div className="referral-logo-container" style={{ width : '274px' }}>
                        <img src={Referral} className="referral-logo" style={{ width : 'inherit' }}/>
                      </div>
                    </div>
                    <div>
                      <p
                        className="main-color--blue"
                        style={{ fontSize: "15px", fontWeight: "500" }}
                      >
                        Share the Unique Invite Link
                      </p>
                     {
                      // <div className="copy-clipboard" style={{ width: "40%" }}>
                      //   <input
                      //     id="foo"
                      //     value={this.state.referralUrl}
                      //     className="my-referral-code copy-clipboard-input"
                      //   />
                      //   <button className="btn  my-referral-code file-copy" style={{right : '-52px' }}>
                      //       <FileCopyOutlinedIcon
                      //       style={{ outline : 'none' }}
                      //       />
                      //   </button>
                      // </div>
                      }
                       <div style={{width: '69%' , position: 'relative', marginBottom : '20px'}}>
                            <input value={this.state.referralUrl }
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input"
                              />
                            <CopyToClipboard text={this.state.referralUrl}
                              onCopy={() => {this.setState({copied: true});
                               toast.success("Copied");
                              }}>
                              <span className="file-copy-conatiner">
                              <FileCopyOutlinedIcon
                                style={{ outline : 'none' ,fontSize : '20px'  }}
                                />
                              </span>
                            </CopyToClipboard>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="contribution-card" style={{ marginBottom: "30px" ,marginTop: '15px'}}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="customCard-header transaction-container">
                    <h2 className="trasnaction">Transactions</h2>
                    <span id="Clear-all">
                      <a onClick={this.clearFilter} id="clearType">
                        Clear All
                      </a>
                    </span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="transactions-filters">
                    <div className="transactions-filters-card">
                      <label htmlFor="kycFilter" id="transaction-type">
                        <h4 style={{ color : '#B0C9F0' }}>Transaction Type:</h4>
                      </label>
                      <select
                        className="form-control  filter-input"
                        style={{ padding: "0px" }}
                        id="typeFilter"
                        onClick={this.handleTypeFilter}
                      >
                        <option value="" disabled selected hidden></option>
                        <option value="Ethereum">ETHEREUM</option>
                        <option value="Bitcoin">BITCOIN</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="transactions-filters">
                    <div className="transactions-filters-card">
                      <div>
                        <label htmlFor="createdFilter" id="transaction-type" style={{ color : '#B0C9F0' }}>
                          <h4 style={{ color : '#B0C9F0' }}> Created At:</h4>
                        </label>
                      </div>
                      <div className="clear-input-control-width">
                        <DatePicker
                          style={{ width: "84%" }}
                          className="form-control text-center filter-input"
                          onChange={this.handleMinCreatedFilter}
                          value={this.state.transactionParam.createdLl}
                          placeholderText="start"
                        />
                        {
                          // <input id="createdMinFilter" type="date" onChange={this.handleMinCreatedFilter} className="form-control text-center filter-input" placeholder="min"/>
                        }
                      </div>
                      <div>
                        <span className="to">To</span>
                      </div>
                      <div className="clear-input-control-width">
                        <DatePicker
                          className="form-control text-center filter-input"
                          onChange={this.handleMaxCreatedFilter}
                          value={this.state.transactionParam.createdUl}
                          placeholderText="end"
                        />
                        {
                          // <input id="createdMaxFilter" type="date" onChange={this.handleMaxCreatedFilter} className="form-control text-center filter-input" placeholder="max"/>
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  <div
                    className="transactions-filters"
                    style={{ paddingTop: "0px" }}
                  >
                    <div className="transactions-filters-card">
                      <label htmlFor="kycFilter" id="transaction-type">
                        <h4 style={{ color : '#B0C9F0' }}>No Of Transactions:</h4>
                      </label>
                      <select
                        className="form-control  filter-input"
                        style={{ padding: "0px", width: "10%" }}
                        id="typeFilter"
                        onClick={this.handleTypeFilter}
                      >
                        <option value="" disabled selected hidden></option>
                        <option value="5">5</option>
                        <option value="10">10</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-12">
                  {!loading ? (
                    <ReactTable
                      className="-striped -highlight"
                      showPaginationBottom={true}
                      style={{
                        marginTop: "20px",
                        fontSize: "12px",
                        cursor: this.state.transactions ? "" : "pointer",
                        height : this.state.transactions.length > 0 ? '100%' : '400px' 
                      }}
                      data={this.state.transactions}
                      columns={this.state.transactionCollumn}
                      pageSizeOptions={[5, 10]}
                      noDataText={
                        <div>
                        <img src={EmptyFile} style={{ height: '143px' }} />
                        <p>No Transactions Found</p>
                        </div>
                      }
                      rowsText={"transactions"}
                      getTdProps={(state, rowInfo, column, instance) => ({
                        onClick: (e, handleOriginal) => {
                          console.log(rowInfo);
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
                        },
                      })}
                      defaultPageSize={5}
                      showPaginationBottom={true}
                    />
                  ) : (
                    <LoadingSpinner
                      style={{
                        alignItems: "center",
                        marginTop: "35px",
                        marginBottom: "45px",
                        background: "#fff",
                      }}  
                    />
                  )}
                </div>
              </div>
            </div>

            {
              //   {
              //     console.log('refer social ****----*****----***', this.props.code.amountPercent)
              //   }
              // {this.props.code.amountPercent > 0 ? <Refer flag={this.props.flag} toggleInfo={this.props.toggleInfo} code={this.props.code} icoFlag ={false} />:""}
              // {/*
              //   //     <div className="panel panel-default">
              //   //   <div className="panel-heading">Users</div>
              //   //     <div className="row">
              //   //     <div className='col-sm-10 col-sm-offset-1'>
              //   // {!loading?<ReactTable
              //   //                  className="-striped -highlight"
              //   //                  showPaginationBottom={true}
              //   //                  style={{ marginTop: '20px', fontSize: '12px', cursor: 'pointer' }}
              //   //                  data={this.state.users}
              //   //                  columns={this.state.userCollumn}
              //   //                  pageSizeOptions={[5, 10]}
              //   //                  noDataText={'No user Found'}
              //   //                  rowsText={'users'}
              //   //                  defaultPageSize={10}
              //   //                  getTdProps={(state, rowInfo, column, instance) => ({
              //   //                    onClick: (e, handleOriginal) => {
              //   //                      console.log(rowInfo)
              //   //                      // console.log("It was in this row:", rowInfo);
              //   //                      // this.props.getMessages(rowInfo.original.ticketId);
              //   //                      // this.setState({
              //   //                      //
              //   //                      //   currentTicketDetails : {
              //   //                      //     subject: rowInfo.original.subject,
              //   //                      //     messages: rowInfo.original.messages,
              //   //                      //     createdAt: rowInfo.original.createdAt,
              //   //                      //     status: rowInfo.original.status,
              //   //                      //     ticketId: rowInfo.original.ticketId
              //   //                      //   },
              //   //                      //   currentTicketMessages: rowInfo.original.messages
              //   //                      // })
              //   //                      // this.handleShowTicket();
              //   //                      // IMPORTANT! React-Table uses onClick internally to trigger
              //   //                      // events like expanding SubComponents and pivots.
              //   //                      // By default a custom 'onClick' handler will override this functionality.
              //   //                      // If you want to fire the original onClick handler, call the
              //   //                      // 'handleOriginal' function.
              //   //                      if (handleOriginal) {
              //   //                        handleOriginal();
              //   //                      }
              //   //                    }
              //   //                  })}
              //   //                  defaultPageSize={5}
              //   //                  showPaginationBottom={true}
              //   //                />:<LoadingSpinner style = {{alignItems:"center",marginTop:"35px",marginBottom:"45px", background:"#fff"}} />}
              //   //     </div>
              //   //     </div>
              //   //     </div>
              // */}
              //   <div className="panel panel-default">
              //   {/* <div className="panel-heading">Transactions</div> */}
              //   <div className="panel-heading blueBG">
              //     {/*<Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />*/}
              //     {
              //       !!this.props.flag ?
              //         <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
              //         :
              //         null
              //     }
              //     Transactions
              //   </div>
              //   <div className="row">
              //     <div className='col-sm-10 col-sm-offset-1'>
              // {!loading?  <ReactTable
              //                className="-striped -highlight"
              //                showPaginationBottom={true}
              //                style={{ marginTop: '20px', fontSize: '12px', cursor: 'pointer' }}
              //                data={this.state.transactions}
              //                columns={this.state.transactionCollumn}
              //                pageSizeOptions={[5, 10]}
              //                noDataText={'No Transaction Found'}
              //                rowsText={'transactions'}
              //                getTdProps={(state, rowInfo, column, instance) => ({
              //                  onClick: (e, handleOriginal) => {
              //                    console.log(rowInfo)
              //                    // console.log("It was in this row:", rowInfo);
              //                    // this.props.getMessages(rowInfo.original.ticketId);
              //                    // this.setState({
              //                    //
              //                    //   currentTicketDetails : {
              //                    //     subject: rowInfo.original.subject,
              //                    //     messages: rowInfo.original.messages,
              //                    //     createdAt: rowInfo.original.createdAt,
              //                    //     status: rowInfo.original.status,
              //                    //     ticketId: rowInfo.original.ticketId
              //                    //   },
              //                    //   currentTicketMessages: rowInfo.original.messages
              //                    // })
              //                    // this.handleShowTicket();
              //                    // IMPORTANT! React-Table uses onClick internally to trigger
              //                    // events like expanding SubComponents and pivots.
              //                    // By default a custom 'onClick' handler will override this functionality.
              //                    // If you want to fire the original onClick handler, call the
              //                    // 'handleOriginal' function.
              //                    if (handleOriginal) {
              //                      handleOriginal();
              //                    }
              //                  }
              //                })}
              //                defaultPageSize={5}
              //                showPaginationBottom={true}
              //              />:<LoadingSpinner style = {{alignItems:"center",marginTop:"35px",marginBottom:"45px", background:"#fff"}} />}
              //     </div>
              //   </div>
              //   </div>
            }
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
  referData: makeSelectMyReferalData(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    getReferalData: (data) => dispatch(getReferalData(data)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: "myReferal", reducer });
const withSaga = injectSaga({ key: "myReferal", saga });

export default compose(withReducer, withSaga, withConnect)(MyReferal);
