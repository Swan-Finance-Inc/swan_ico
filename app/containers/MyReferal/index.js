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
import { DownOutlined } from "@ant-design/icons";
import TextFieldInput from "../../components/TextFieldInput";
import ethLogo from "../../images/ethLogo.png";
import { Navbar, Nav, MenuItem, NavDropdown, Modal ,Badge , DropdownButton, Button} from 'react-bootstrap';
import { Menu, Dropdown ,Popconfirm, message} from "antd";
import Bar from "../../components/Bar";

export class MyReferal extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      infoShow: false,
      referralUrl :'',
      weeklyOrDaily: 'daily',
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
          Header: <div style={{color:'#00296B'}} >Status</div>,
          accessor: "status",
          className: "status",
        },
        {
          Header: <div style={{color:'#00296B'}} >Email</div>,
          accessor: "initiatedBy.email",
          className: "status",
        },
        {
          Header: <div style={{color:'#00296B'}} >Tokens can be earned</div>,
          accessor: (row) =>
            row.referBonus * 0.01 * ((row.tokens * 100) / (row.bonus + 100)), // Custom cell components!
          className: "email",
          id: "tokensCanbeEarned",
        },
        {
          Header: <div style={{color:'#00296B'}} >Created At</div>,
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
      referralUrl:`https://app.swanfinance.io/signup/refer/${this.props.referralCode}`
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
        // data.transactions.forEach((tran, i) => {
        //   tran.forEach((entry, j) => transaction.push(entry));
        // });
        // data.users.forEach((user, i) => users.push(user));
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
            this.props.getReferalData(this.state.transactionParam);
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
            this.props.getReferalData(this.state.transactionParam);
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
        this.props.getReferalData(this.state.transactionParam);
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
            this.props.getReferalData(this.state.transactionParam);
          } else {
            toast.error("Min Date cannot be Greater than Max Date");
          }
        } else {
          this.props.getReferalData(this.state.transactionParam);
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
              this.props.getReferalData(this.state.transactionParam);
            } else {
              toast.error("Min Date cannot be Greater than Max Date");
            }
          } else {
            this.props.getReferalData(this.state.transactionParam);
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
        this.props.getReferalData(this.state.transactionParam);
      }
    );
  };

  

  render() {
    console.log(this.props, " props in myreferal");
    console.log(this.state, " state in myreferal");
    const { loading } = this.props;
    const menu = (
      <Menu>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
            3rd menu item
          </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
      </Menu>
    );
    const referralsEarned = {
      date : 32,
      tokensEarned : 50,
      userCreatedAt : 10,

    }
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        <Helmet>
          <title>My Referrals</title>
          <meta name="description" content="Description of My Referrals" />
        </Helmet>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
            <div className="row">
            <div
              className="col-lg-7 col-sm-7"
              style={{ 
               marginTop : '12px' }}
             >
              <div className="balance-card" id="fixed-height">
                <div
                  className="balance-card-inner-wrappper"
                ><div className="">
                  <h5
                    style={{
                      font: "normal normal bold 20px/24px Lato",
                      letterSpacing: "0.43px",
                      color: "#B0C9F0",
                      display: "inline-block",
                      opacity: 1,
                      marginTop: 0,
                      fontSize: "16px",
                    }}
                  >
                    Tokens Earned by Referral {this.state.weeklyOrDaily==='weekly'?'(This Week)':''}
                  </h5>
                    <DropdownButton 
                      eventKey={4} 
                      className="account-balance-dropdown"
                      title={this.state.weeklyOrDaily}
                    >
                      <MenuItem eventKey='5' value="weeklyOrDaily" name="daily" onClick={this.chartType } >
                          Daily
                          </MenuItem>
                          <MenuItem eventKey='5' value="weeklyOrDaily" name="weekly" onClick={this.chartType } >
                          Weekly
                          </MenuItem>
                          <MenuItem eventKey='5' value="weeklyOrDaily" name="monthly" onClick={this.chartType } >
                          Monthly
                          </MenuItem>
                     </DropdownButton>
                     
                  <Dropdown overlay={menu} disabled>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    Daily <DownOutlined />
                  </a>
                </Dropdown>
                <Dropdown overlay={menu} disabled>
                  <a className="ant-dropdown-link"
                  style={{marginLeft : '50px' }}
                  onClick={e => e.preventDefault()}>
                    Weekly <DownOutlined />
                  </a>
                </Dropdown>
                </div>
              <div>{this.state.weeklyOrDaily==='daily'?<Bar graphData={referralsEarned} typeChart={this.state.weeklyOrDaily} />:''}
              {this.state.weeklyOrDaily==='monthly'?<Bar graphData={this.props.referralsEarned} typeChart={this.state.weeklyOrDaily} />:''}
              {this.state.weeklyOrDaily==='weekly'?<Bar graphData={this.props.referralsEarned} typeChart={this.state.weeklyOrDaily} />:''}</div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-5 col-sm-5"
              style={{marginTop: '13px' }}
            >
              <div
                className="balance-card"
                style={{
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  padding: "12px 0px 29px 15px",
                }}
              >
                <div className="balance-botton-inner-wrapper" style={{marginTop : '-15px' }}>
                  <h4 className="exchange-heading">Referral Tokens Earned</h4>
                    <p style={{ marginBottom: "0px", color: "#465390" ,fontSize: "32px", marginLeft : '10px' }}>
                    {
                    0
                    }
                    </p>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Pending-referrals">
                        <div id="circle">
                          <span className="circle-text">0<span className="Pending-referrals-count"> # of Pending Referrals</span></span>
                        </div>
                      </div>
                  </div>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Confirmed-referrals">
                        <div id="confirmed-circle">
                          <span className="confirmed-circle-text">0<span className="Confirmed-referrals-count"># of Confirmed Referrals</span></span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
            </div>

            <div className="row">
            <div className="col-lg-12 last-card"style={{ marginBottom : '30px' , marginTop : '12px' , height : "auto" }} >
                 <div className="balance-card">
                    <div className="balance-card-inner-wrappper">
                      <div style={{ display : 'flex' , justifyContent : 'space-between' }}>
                        <div>
                        <h3 className="balance-card-inner-wrapper-heading" style={{ lineHeight: '1.3'}}>
                        Invite Your friends 
                        <b/> & Earn Swan tokens
                          </h3>
                          <p  className="mt-30 referral-content">
                          Earn $50 of SWAN tokens for each person who <b/>
                          signs up for an account.
                          </p>
                            <p  className="main-color--blue" style={{fontSize : '15px'}}>Share the Unique Invite Link</p>
                            {
                          //     <div className="code copy-clipboard">
                          //   <input id="foo" value={this.state.referalUrl}
                          //   className="copy-clipboard-input"
                          //   disabled
                          //   />
                          //   <button className="btn file-copy" style={{ right: '-145px' }}
                          //   onCopy={this.state.referalUrl}
                          //   >
                          //   <FileCopyOutlinedIcon
                          //  // onClick={(e) => console.log(e.target.files ) }
                          //   style={{ outline : 'none' }}
                          //   />
                          //   </button>
                          //   {
                          //   //   <button class="btn" data-clipboard-target="#foo" id="clipboard-target-buttton">
                          //   // <img src={mdCopy} className="copy-clip" />
                          //   // </button>
                          //   }
                          //   </div>
                            }
                            
                        </div>
                         <div className="referral-logo-container">
                          <img src={Referral} className="referral-logo" />
                        </div> 
                      </div>
                      <div style={{width: '86%' , position: 'relative'}}>
                            <input value={this.state.referralUrl }
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input"
                              />
                            <CopyToClipboard text={this.state.referralUrl}
                              onCopy={() => {this.setState({copied: true});
                               toast.success("Copied");
                              }}>
                              <span className="file-copy-conatiner" style = {{height : '-webkit-fill-available'}} >
                              <FileCopyOutlinedIcon
                                style={{ outline : 'none' ,fontSize : '20px'  }}
                                />
                              </span>
                            </CopyToClipboard>
                        </div>
                    </div>
                   
                 </div>
            </div>
            {/* <div
              className="col-lg-5 col-sm-12"
              style={{marginTop: '13px' }}
            >
              <div
                className="balance-card"
                style={{
                  borderTopRightRadius: 0,
                  borderTopLeftRadius: 0,
                  padding: "12px 0px 29px 15px",
                  height: "384px",
                }}
              >
                <div className="balance-botton-inner-wrapper" style={{marginTop : '-15px' }}>
                  <h4 className="exchange-heading">Referral Tokens Earned</h4>
                    <p style={{ marginBottom: "0px", color: "#465390" ,fontSize: "32px", marginLeft : '10px' }}>
                    {
                    350
                    }
                    </p>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Pending-referrals">
                        <div id="circle">
                          <span className="circle-text">0<span className="Pending-referrals-count"> # of Pending Referrals</span></span>
                        </div>
                      </div>
                  </div>
                  <div className="col-sm-12" style={{ position : 'relative' }}>
                      <div className="Confirmed-referrals">
                        <div id="confirmed-circle">
                          <span className="confirmed-circle-text">0<span className="Confirmed-referrals-count"># of Confirmed Referrals</span></span>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div> */}
          </div>

            <div className="contribution-card" style={{ marginBottom: "30px" ,marginTop: '15px'}}>
              <div className="row">
                <div className="col-sm-12">
                  <div className="customCard-header transaction-container">
                    <h2 className="trasnaction" style={{color:'#00296B',fontWeight:'bold'}} >Transactions</h2>
                    <span id="Clear-all">
                      <a onClick={this.clearFilter} id="clearType" style={{color:'#00296B'}} >
                        Clear All
                      </a>
                    </span>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="transactions-filters">
                    <div className="transactions-filters-card">
                      <label htmlFor="kycFilter" id="transaction-type">
                        <h4 style={{ color : '#00296B',fontWeight:'bold' }}>Transaction Type:</h4>
                      </label>
                      <select
                        className="form-control  filter-input"
                        style={{ padding: "0px" }}
                        id="typeFilter"
                        onChange={this.handleTypeFilter}
                      >
                        <option value="" disabled selected hidden></option>
                        <option value="Ethereum">ETHEREUM</option>
                        <option value="Bitcoin">Bitcoin</option>
                        <option value="Steller">Steller</option>
                        <option value="USDT">USDT</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-sm-8">
                  <div className="transactions-filters">
                    <div className="transactions-filters-card">
                      <div>
                        <label htmlFor="createdFilter" id="transaction-type" style={{ color : '#B0C9F0' }}>
                          <h4 style={{ color : '#00296B',fontWeight:'bold' }}> Created At:</h4>
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
    
                      </div>
                      <div>
                        <span className="to" style={{color:'#00296B'}}>To</span>
                      </div>
                      <div className="clear-input-control-width">
                        <DatePicker
                          className="form-control text-center filter-input"
                          onChange={this.handleMaxCreatedFilter}
                          value={this.state.transactionParam.createdUl}
                          placeholderText="end"
                        />
                  
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
                        <h4 style={{ color : '#00296B',fontWeight:'bold' }}>No Of Transactions:</h4>
                      </label>
                      <select
                        className="form-control  filter-input"
                        style={{ padding: "0px", width: "10%" }}
                        id="typeFilter"
                        onChange={this.handleTypeFilter}
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
                        height : this.state.transactions.length > 0 ? '100%' : '410px' 
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
