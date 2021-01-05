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
import { Link } from 'react-router-dom';
import { makeGlobalParent } from 'containers/App/selectors';
import { toast } from 'react-toastify';
import { depositSuccess } from 'containers/App/actions';
import 'react-table/react-table.css';
import { getTransactions } from './actions';
import reducer from './reducer';
import saga from './saga';
import makeSelectTransactionHistory, { makeSelectTransactions, makeSelectNextPage ,makeSelectTransLoading } from './selectors';
import LoadingSpinner from 'components/LoadingSpinner/Loadable';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import Info from "../../components/Info";
import MyPaginnation from "../../components/MyPaginnation";
import EmptyFile from "../../images/EmptyFile.svg";
import { CSVLink} from "react-csv/lib";
var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

// var years = range(1990, getYear(new Date()) + 1, 1);
var years = [1990,1991,1992,1993,1994,1995];
export class TransactionHistory extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    
    this.state = {
      // @aj
      infoShow: false,
      size : '',
      data: [],
      defaultPageSize:5,
      headers : [
        { label: "Time", key: "created_at" },
        { label: "Currency", key: "type" },
        { label: "Amount", key: "amount" },
        { label: "Token Price($)", key: "tokenPrice" },
        { label: "Transaction Hash", key: "transactionHash" },
        { label: "Transaction Status", key: "status" },
        { label: "SWAN Tokens", key: "tokens" },
        { label: "Fund Raise Rounds", key: "phase" },
        { label: "Rate", key: "rate" },
        {label:'Type',key:'type'},
        {label: 'Bonus(%)' , key: 'bonus'}

      ],
      columns: [
        {
          Header: <span style= {{color:'#00296B'}} >Time</span>,
          accessor: 'created_at',
          filter: <h3>hello</h3>,
        },
        {
          Header: <span style= {{color:'#00296B'}} >Currency</span>,
          accessor: 'type', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: <span style= {{color:'#00296B'}} >Amount</span>,
          accessor: 'amount', // Custom cell components!
          className: 'text-right'
        },
        {
          Header: <span style= {{color:'#00296B'}} >Token Price($)</span>,
          accessor: 'tokenPrice', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: <span style= {{color:'#00296B'}} >Transaction Hash</span>,
          accessor: 'transactionHash', // Custom cell components!
          className: 'text-center',
          Cell:({value}) =>{
            // const hash = uritemplate.parse(
            //   `ropsten.etherscan.io/tx/${value}`
            // );
            var uri =  `https://mainnet.etherscan.io/tx/${value}`
            // console.log(uri, "dsavcrfuvrebvgkdb");
            // window.open(uri, "_blank");  
            return(
            <span style={{cursor:'pointer'}} onClick = {() => window.open(uri , "_blank" ) } >{value}</span>)
          }
        },
        {
          Header: <span style= {{color:'#00296B'}} >Transaction Status</span>,
          accessor: 'status', // Custom cell components!
          className: 'text-center'
        },
        {
          Header: <span style= {{color:'#00296B'}} >SWAN Tokens</span>,
          accessor: 'tokens', // Custom cell components!
          className: 'text-right'
        },
       {

            Header: <span style= {{color:'#00296B'}} >Fund Raise Rounds</span>,
            accessor: 'phase', // Custom cell components!
            className: 'text-center',
            Cell: ({ value }) => {
              if(value=="privateSaleRound1")
              return "Private Sale Round 1"
              else if(value=="privateSaleRound2")
              return 'Private Sale Round 2'
              else if(value=="crowdSale")
              return 'Crowd Sale'
              else if(value=="preSale")
              return 'Pre Sale'
              else if(value=="privateSale")
              return 'Private Sale'
              else if(value=="crowdSaleRoundOne")
              return 'CrowdSale Round-1'
              else if(value=="crowdSaleRoundTwo")
              return 'CrowdSale Round-2'
              else if(value=="crowdSaleRoundThree")
              return 'CrowdSale Round-3'
              else if(value=="crowdSaleRoundFour")
              return 'CrowdSale Round-4'
            }
          },
          {
             Header: <span style= {{color:'#00296B'}} >Rate</span>,
             accessor: 'rate', // Custom cell components!
             className: 'text-right'
           },
        
        {
          Header: <span style= {{color:'#00296B'}} >Type</span>,
          accessor: 'type',
          filter: <h3>hello</h3>,
        },
        // {
        //   Header: 'Bonus /Discount',
        //   accessor: 'isBonusOrDiscount',
        //   className:'text-center',
        //   Cell:({value})=>{
        //     if(value==='staticDiscount')
        //     return "Discount"
        //     else {
        //       return "Bonus"
        //     }
        //   }

        // },
        // {
        //   Header: 'Discount(%)',
        //   accessor: 'discount',
        //   filter: <h3>hello</h3>,
        // },
        {
          Header: <span style= {{color:'#00296B'}} >Bonus(%)</span>,
          accessor: 'bonus',
          filter: <h3>hello</h3>,
        }

      ],
      transactionParam:{
        page: 1,
        type:'',
        createdUl:'',
        createdLl:''
      },
      filterFlag:true,
      disableNext: false,
      disablePrevious: true,
    };

    this.pageChange = this.pageChange.bind(this);

    this.previousChange = this.previousChange.bind(this);
  }

  //@aj
  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow
    });
    console.log('infoShow : ', this.state.infoShow);
  }


  componentDidMount() {
    this.props.transactions(this.state.transactionParam);

  // console.log(this.props);
    if (this.props.message) {
      this.notify();
      this.props.deposit(false);
    }
  }
 getColumnWidth=(accessor, headerText)=>{
 let {data} = this.state;
 let max = 0;
 const maxWidth = 400;
 const magicSpacing = 18;

 for (var i = 0; i < data.length; i++) {
     if (data[i] !== undefined && data[i][accessor] !== null) {
         if (stringify(data[i][accessor] || 'null').length > max) {
             max = stringify(data[i][accessor] || 'null').length;
         }
     }
 }
 return Math.min(maxWidth, Math.max(max, headerText.length) * magicSpacing);
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

    // this.setState({
    //   ...this.state,transactionParam:{
    //     ...this.state.transactionParam,page:e.target.value
    //   },
    //     disablePrevious: true,
    // }, () => {
    //   console.log(this.state," in type filter handler")
    //   this.props.transactions(this.state.transactionParam)
    // });




    this.setState({
      ...this.state,transactionParam:{
        ...this.state.transactionParam,page:this.state.transactionParam.page + 1
      }
    } , () =>  this.props.transactions(this.state.transactionParam))
    if (this.state.transactionParam.page + 1 > 1) {
      this.setState({
        disablePrevious: false,
      },
      () => {
        console.log(this.state)
      });
    } else {
      this.setState({
        disablePrevious: true,
      }
      );
      
    }
   
  }
  pageSizeChange(e) {
    // console.log('page size change');
    // console.log(e / 10);
    const page = e / 10;
    this.props.transactions(page);
  }
  previousChange() {
    if (this.state.transactionParam.page > 1) {
      this.setState({
        ...this.state,transactionParam:{
          ...this.state.transactionParam,page:this.state.page - 1
      }});
      if (this.state.transactionParam.page - 1 == 1) {
        this.setState({
          disablePrevious: true,
        });
      }
      this.props.transactions(this.state.transactionParam.page - 1);
    }
  }

  clearFilter=(e)=>{
    e.preventDefault();
    switch(e.target.id) {
      case 'clearType' :
      document.getElementById('typeFilter').selectedIndex = 0;
      document.getElementById('pageFilter').selectedIndex = 0;
      this.setState({
        ...this.state,transactionParam:{
          ...this.state.transactionParam,
          type:'',
          createdUl : '',
          createdLl : '',
          page : 1
        },
        disablePrevious:true
      }, () => {
        console.log(this.state," in clearFilter clearType")
        this.props.transactions(this.state.transactionParam);
      })
      break;
      case 'clearCreated' :
    {
      // document.getElementById('createdMinFilter').value = null;
      // document.getElementById('createdMaxFilter').value = null;
    }
      this.setState({
        transactionParam : {
          page : 1,
          createdLl : '',
          createdUl : ''
        },
        disablePrevious: true
      }, () => {
        console.log(this.state," in clearFilter clearCreated")
        this.props.transactions(this.state.transactionParam);
      });
      break;
    }
  }
  handleMinCreatedFilter=(date)=>{
      this.setState({
        ...this.state,transactionParam:{
          ...this.state.transactionParam,
          createdLl:moment(date).format("YYYY-MM-DD"),
        },
        disablePrevious: true
    }, () => {
      console.log(this.state.transactionParam," in handlle minefilter token--")
        if(this.state.transactionParam.createdUl!==''){
          console.log(this.state.transactionParam.createdUl,"-----------------------------")
          if(moment(this.state.transactionParam.createdUl).isSameOrAfter(this.state.transactionParam.createdLl,"day")){
            this.props.transactions(this.state.transactionParam);
          }
         else{
           toast.error("Min Date cannot be Greater than Max Date")
         }
       } else {
         this.props.transactions(this.state.transactionParam);
       }

    });
  }
  handleMaxCreatedFilter=(date)=>{
    this.setState({
      ...this.state,transactionParam:{
        ...this.state.transactionParam,
        createdUl:moment(date).format("YYYY-MM-DD"),
      },
      disablePrevious: true
    }, () => {
      console.log(this.state.transactionParam," in handle maxCreatedFilter")
      if(this.state.transactionParam.createdLl!==''){
        console.log(this.state.transactionParam.createdLl," -------------------------------------------")
        if(moment(this.state.transactionParam.createdUl).isSameOrAfter(this.state.transactionParam.createdLl,"day")){
            this.props.transactions(this.state.transactionParam)
        }
        else{
          toast.error("Min Date cannot be Greater than Max Date")
        }
      }else {
          this.props.transactions(this.state.transactionParam)
      }


    });
  }
  handleTypeFilter=(e)=>{
    // console.log(e.target.value);
    this.setState({
      ...this.state,transactionParam:{
        ...this.state.transactionParam,type:e.target.value,page:1
      },
        disablePrevious: true,
    }, () => {
      console.log(this.state," in type filter handler")
      this.props.transactions(this.state.transactionParam)
    });
  }

  handleRowFilter = (e) => {
    console.log(e.target.getAttribute("value"),"jjjjjjjjjjjjjjjhhhhhhhhhhhhh")
    const value = e.target.getAttribute("value")
    this.setState({
      ...this.state,transactionParam:{
        ...this.state.transactionParam,page:value
      },
        disablePrevious: true,
    }, () => {
      console.log(this.state," in type filter handler")
      this.props.transactions(this.state.transactionParam)
    });
  }

  handleDefaultPageSize = (e) =>{
    this.setState({
      defaultPageSize: e.target.value
    });
    this.props.transactions(this.state.transactionParam)
  }



  notify() {
    toast.success('Transaction deposited successfully');
  }
  handleFilters=(e)=>{
    console.log(" inside handleFilters ")
    if(this.state.filterFlag){
        this.setState({
          ...this.state,
          transactionParam : {
            page: 1,
            type:'',
            createdUl:'',
            createdLl:''
          },
          filterFlag:!this.state.filterFlag
        })
    }
    else {
      this.setState({
        filterFlag:!this.state.filterFlag
      })
    }
  }

  resetInfo=()=>{
    this.props.toggleInfo()
  }

    // renderCustomHeader = ({
    //   date,
    //   changeYear,
    //   changeMonth,
    //   decreaseMonth,
    //   increaseMonth,
    //   prevMonthButtonDisabled,
    //   nextMonthButtonDisabled
    // }) => {
    //   console.log("sdkjvasdkvbkhfdsv")
    //   return(
    //     <div
    //       style={{
    //         margin: 10,
    //         display: "flex",
    //         justifyContent: "center"
    //       }}
    //     >
    //       <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
    //         {"<"}
    //       </button>
    //       <select
    //         value={getYear(date)}
    //         onChange={({ target: { value } }) => changeYear(value)}
    //       >
    //         {years.map(option => (
    //           <option key={option} value={option}>
    //             {option}
    //           </option>
    //         ))}
    //       </select>

    //       <select
    //         value={months[getMonth(date)]}
    //         onChange={({ target: { value } }) =>
    //           changeMonth(months.indexOf(value))
    //         }
    //       >
    //         {months.map(option => (
    //           <option key={option} value={option}>
    //             {option}
    //           </option>
    //         ))}
    //       </select>

    //       <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
    //         {">"}
    //       </button>
    //     </div>
    //   )
    //         }

  //   download_csv =() => {
  //     var csv = 'Currency,transactionHash\n';
  // //  console.log(this.state.data, 'iuhdsvaiurhvuriv')
  //     this.state.data.forEach(function(row) {
  //             csv += row.transactionHash
  //             csv += "\n";
  //             console.log(row ,'iuhdsvaiurhvuriv')
  //     });
  //     var hiddenElement = document.createElement('a');
  //     hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  //     hiddenElement.target = '_blank';
  //     hiddenElement.download = 'people.csv';
  //     hiddenElement.click();
  // }
  render() {

    
    console.log(this.props," props in transaction history");
    // console.log(this.state.data," state in transaction history");
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
            <div className="contribution-card" style={{ marginBottom : '30px' }}>
              <div className="row">
                  <div className="col-sm-12">
                      <div className="customCard-header transaction-container">
                        <h2 className="trasnaction" style={{color:'#00296B',fontWeight:'bold'}}>Transactions</h2>
                        <span id="Clear-all"><a onClick={this.clearFilter} id="clearType">Clear All</a></span>
                      </div>  
                  </div>
                  <div className="col-sm-4">
                      <div className="transactions-filters">
                        <div className="transactions-filters-card">
                        <label htmlFor="kycFilter" id="transaction-type"><h4 style={{ color:'#00296B',fontWeight:'bold' }}>Transaction Type:</h4></label>
                        <select className="form-control  filter-input" style={{padding:'0px'}} id="typeFilter" onChange={this.handleTypeFilter}>
                          <option value="" disabled selected hidden></option>
                          <option value='Ethereum'>ETHEREUM</option>
                          <option value='Bitcoin'>Bitcoin</option>
                          <option value='Stellar'>Stellar</option>
                          <option value='USDT'>USDT</option>
                          {/* <option value='Bitcoin'>BITCOIN</option> */}
                        </select>
                        </div>
                      </div>
                  </div>
                  <div className="col-sm-8">
                    <div className="transactions-filters">
                    <div className="transactions-filters-card">
                        <div><label htmlFor="createdFilter" id="transaction-type"><h4 style={{ color:'#00296B',fontWeight:'bold' }}>Created At:</h4></label></div>
                            <div  className="clear-input-control-width">
                            <DatePicker
                            style={{width: '84%' }}
                            className='form-control text-center filter-input'
                            onChange={this.handleMinCreatedFilter}
                            value={this.state.transactionParam.createdLl}
                            placeholderText='start'
                             />
                              {/* <DatePicker

                                    renderCustomHeader={({
                                    date,
                                        changeYear,
                                            changeMonth,
                                          decreaseMonth,
                                          increaseMonth,
                                          prevMonthButtonDisabled,
                                          nextMonthButtonDisabled
                                  }) => (
  <div
    style={{
      margin: 10,
      display: "flex",
      justifyContent: "center"
    }}
  >
    <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
      {"<"}
    </button>
    <select
      value={getYear(date)}
      onChange={({ target: { value } }) => changeYear(value)}
    >
      {years.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <select
      value={months[getMonth(date)]}
      onChange={({ target: { value } }) =>
        changeMonth(months.indexOf(value))
      }
    >
      {months.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>

    <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
      {">"}
    </button>
  </div>
)}
      className='form-control text-center filter-input'
      // selected={this.state.transactionParam.createdLl}
      // onChange={date => setStartDate(date)}
      style={{width: '84%' }}

      onChange={this.handleMinCreatedFilter}
      value={this.state.transactionParam.createdLl}
      placeholderText='start'

    /> */}
                              
                             {
                                 // <input id="createdMinFilter" type="date" onChange={this.handleMinCreatedFilter} className="form-control text-center filter-input" placeholder="min"/>
                             }

                            </div>
                            <div>
                              <span className="to"style={{color:'#00296B',fontWeight:'bold'}} >To</span>
                            </div>
                            <div className="clear-input-control-width">
                            <DatePicker
                            className='form-control text-center filter-input'
                            onChange={this.handleMaxCreatedFilter}
                            value={this.state.transactionParam.createdUl}
                            placeholderText='end'
                             />
                              {
                                // <input id="createdMaxFilter" type="date" onChange={this.handleMaxCreatedFilter} className="form-control text-center filter-input" placeholder="max"/>
                              }
                            </div>
                        </div>
                    </div>
                  </div>
              <div className="col-sm-12">
              <div className="transactions-filters" style={{ paddingTop : '0px' }}>
                <div className="transactions-filters-card">
                <label htmlFor="kycFilter" id="transaction-type"><h4 style={{color:'#00296B',fontWeight:'bold'}}>No Of Transactions:</h4></label>
                <select className="form-control  filter-input" style={{padding:'0px' , width : '10%'}} id="pageFilter" onChange = { this.handleDefaultPageSize } >
                  <option value="" disabled selected hidden></option>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                </select>
                </div>
              </div>
              </div>  
              <div className='col-sm-12' style={{textAlign:'right', paddingRight:'35px', color:'rgb(176, 201, 240)' }} >
                {
                  this.state.data.length > 0 ? <CSVLink style={{color:'#00296B',textDecoration:'underline'}} data={this.state.data} headers={this.state.headers}  >Download CSV</CSVLink>
                  :
                  ''
                }
              
              </div>
              <div className='col-sm-12'>

                {console.log("poor", this.state.data, this.state.columns)}
                  {loading?<LoadingSpinner style = {{alignItems:"center",marginTop:"70px",marginBottom:"90px", background:"#fff"}} /> :<ReactTable
                      showPaginationBottom={true}
                      style={{ height : this.state.data.length > 0 ? '100%' : '400px' , marginTop : '20px'}}
                      data={this.state.data}
                      columns={this.state.columns}
                      // onPageChange={this.pageChange}
                     pageSizeOptions={[5, 10]}
                      defaultPageSize={this.state.defaultPageSize}
                     noDataText={
                      <div>
                      <img src={EmptyFile} style={{ height: '143px' }} />
                      <p className="center">No Records Found</p>
                      </div>
                    }
                      rowsText={'transactions'}
                     
                    //  pageSize = {this.state.size}

                    />}
             </div>
              </div>
            </div>
              
            {/* <div className="col-sm-12 text-center my-pagibation">
            <MyPaginnation
              data={this.state.data}
              onPageChange={this.handleRowFilter}
              previousChange={this.previousChange}
              disablePrevious={this.state.disablePrevious}
              value = {this.state.transactionParam.page}
              />
            </div> */}



       {  
        // <div className="panel panel-default">
        //   <div className="panel-heading blueBG">
        //     {/*<Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />*/}
        //     {
        //       !this.props.flag ?
        //         <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
        //         :
        //         null
        //     }
        //     Transactions
        //   </div>
        //   {/* <div className="panel-heading">Transactions</div> */}
        //   <div className="panel-body" style={{fontSize:'16px'}}>
        //     <div className="row">
        //       <div className="col-sm-12">
        //         <div className="contribution" >
        //           <div className="row">
        //             <div className="col-sm-12 col-md-6 col-md-offset-3 text-center ">

        //             </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-12">
        //               <button className="btn-primary b1" style={{ height: '42px', width: '151px' }} disabled={this.state.disablePrevious} onClick={this.previousChange}> Previous Page </button>
        //               <button className="btn-primary b2" style={{ height: '42px', width: '151px', right: '16px', position: 'absolute', backgroundColor: 'rgb(62, 0, 96)!important' }} onClick={this.pageChange} disabled={this.state.disableNext}>Next Page </button>
        //               </div>
        //               <div className='col-sm-12'>
        //               <div className='text-center'>
        //                 <button className="btn  filters" onClick={this.handleFilters} >{this.state.filterFlag?'Remove Filters':'Add Filters'}</button>
        //               </div>
        //               </div>
        //           {  this.state.filterFlag &&   <div className='col-sm-12'>
        //             <div className="col-sm-3 col-sm-offset-1">
        //               <div className="filter-card">
        //                 <label htmlFor="kycFilter"><h5>Transaction Type:</h5></label>
        //                 <select className="form-control  filter-input" style={{padding:'0px'}} id="typeFilter" onClick={this.handleTypeFilter}>
        //                   <option value="" disabled selected hidden>Select</option>
        //                   <option value='Ethereum'>ETHEREUM</option>
        //                   <option value='Bitcoin'>BITCOIN</option>
        //                 </select>
        //                 <span className='clear'><a onClick={this.clearFilter} id="clearType">Clear</a></span>
        //               </div>
        //             </div>
        //             <div className="col-sm-5 col-sm-offset-3">
        //               <div className="filter-card">
        //                 <div className='text-center'><label htmlFor="createdFilter"><h5>Created At</h5></label></div>
        //                   <div className="row">
        //                     <div className="col-sm-5 col-xs-5 col-xs-5">
        //                     <DatePicker
        //                     className='form-control text-center filter-input'
        //                     onChange={this.handleMinCreatedFilter}
        //                     value={this.state.transactionParam.createdLl}
        //                     placeholderText='min'
        //                      />
        //                      {
        //                          // <input id="createdMinFilter" type="date" onChange={this.handleMinCreatedFilter} className="form-control text-center filter-input" placeholder="min"/>
        //                      }

        //                     </div>
        //                     <div className="col-sm-2 col-xs-2">
        //                       <span>-</span>
        //                     </div>
        //                     <div className="col-sm-5 col-xs-5 col-xs-5">
        //                     <DatePicker
        //                     className='form-control text-center filter-input'
        //                     onChange={this.handleMaxCreatedFilter}
        //                     value={this.state.transactionParam.createdUl}
        //                     placeholderText='max'
        //                      />
        //                       {
        //                         // <input id="createdMaxFilter" type="date" onChange={this.handleMaxCreatedFilter} className="form-control text-center filter-input" placeholder="max"/>
        //                       }
        //                     </div>
        //                     </div>
        //                     <div className="row">
        //                       <div className="col-sm-12">
        //                     <span className='clear'><a onClick={this.clearFilter} id="clearCreated">Clear</a></span>
        //                       </div>
        //                     </div>
        //                 </div>
        //             </div>
        //             </div>

        //           }
        //             <div className='col-sm-12'>
        //             {loading?<LoadingSpinner style = {{alignItems:"center",marginTop:"70px",marginBottom:"90px", background:"#fff"}} /> :<ReactTable
        //                 showPaginationBottom={true}
        //                 style={{ marginTop: '20px', fontSize: '12px', cursor: 'default' }}
        //                 data={this.state.data}
        //                 columns={this.state.columns}
        //                 // onPageChange={this.pageChange}
        //                 pageSizeOptions={[5, 10]}
        //                 noDataText={'No transactions found'}
        //                 rowsText={'transactions'}
        //                 defaultPageSize={5}
        //               />}
        //             </div>

        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>
        }
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
