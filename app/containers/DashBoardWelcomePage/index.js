import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import FaqPage from 'components/FaqPage/Loadable';
import Balance from 'components/Balance/Loadable';
import Refer from 'components/Refer/Loadable';
import KycAlert from 'components/KycAlert/Loadable';
import NavBarContainer from 'containers/NavBarContainer';
import TransactionHistory from 'containers/TransactionHistory';
import KycPage from 'containers/KycPage';
import TicketPage from 'containers/TicketPage';
import ContributionPage from 'containers/ContributionPage';
import SecurityPage from 'containers/SecurityPage';
import ResetPassword from 'containers/ResetPassword';
import ProfilePage from 'containers/ProfilePage';
import SideBarNav from 'containers/SideBarNav';
import CustomLoading from 'components/CustomLoading/Loadable';
import UploadDocuments from 'containers/UploadDocuments/Loadable'
import Notification from 'containers/Notification/Loadable';
import { Helmet } from 'react-helmet';
import { ToastContainer, toast } from 'react-toastify';
import { makeGlobalParent } from 'containers/App/selectors';
import { loadProfileAction, submitSocial, resetKycDone, deleteUserAction } from './actions';
import makeSelectDashBoardWelcomePage, { makeSelectKycDone }from './selectors';
import LoadingSpinner from 'components/LoadingSpinner/Loadable';
import SupportPage from 'containers/Support';
import { resetSuccess } from '../KycPage/actions';
import $ from 'jquery'

import reducer from './reducer';
import saga from './saga';
import Web3 from 'web3';
const ABI = require('./CrowdSale');
const initialState = {
  dash: '',
  kyc: '',
  sec: '',
  cont: '',
  tran: '',
  support: '',
  ticket: '',
  faq: '',
  profile: '',
  resetPass: '',
  upload_docs:''
}
export class DashBoardWelcomePage extends React.PureComponent {
  constructor() {
    super();
    this.compactNav = this.compactNav.bind(this);
    this.openNav = this.openNav.bind(this);
    this.webScreenCompact = this.webScreenCompact.bind(this);
    this.state = {
      compact: 'ui',
      dash: '',
      kyc: '',
      sec: '',
      cont: '',
      tran: '',
      faq: '',
      ticket: '',
      profile: '',
      resetPass: '',
      support: '',
      alertMsg: '',
      showAlert: true,
      showVideo: false,
      notification:'',
      notifyTransactions: [],
      upload_docs:''
    };
    this.toggleContActive = this.toggleContActive.bind(this);
    this.toggleDashActive = this.toggleDashActive.bind(this);
    this.toggleSecActive = this.toggleSecActive.bind(this);
    this.toggleTranActive = this.toggleTranActive.bind(this);
    this.toggleKycActive = this.toggleKycActive.bind(this);
    this.toggleTicketActive = this.toggleTicketActive.bind(this);
    this.toggleSupportActive = this.toggleSupportActive.bind(this);
    this.toggleFaqActive = this.toggleFaqActive.bind(this);
    this.toggleProfileActive = this.toggleProfileActive.bind(this);
    this.toggleResetPassActive = this.toggleResetPassActive.bind(this);
    this.toggleUpDocsActive = this.toggleUpDocsActive.bind(this);
    this.dashActive = this.dashActive.bind(this);
    this.buyPage = this.buyPage.bind(this);
    this.socialSubmit = this.socialSubmit.bind(this);
    this.closeAlert = this.closeAlert.bind(this);
    this.showVideo = this.showVideo.bind(this);
    this.closeVideo = this.closeVideo.bind(this);
    this.web3 = new Web3(new Web3.providers.WebsocketProvider('wss://ropsten.infura.io/ws'));
    this.contract = new this.web3.eth.Contract(ABI, '0xcc760e05f33d4d9775248fac39e8cfde40476270');
  }
  componentWillMount() {
    this.props.loadProfileAction();
    console.log(this.props);
  }

  componentDidMount() {
    const outer = this;
    this.contract.events.transactionNotify()
    .on('data', function (event) {
      const transaction = {
        address: event.returnValues['0'],
        amount: event.returnValues.weiAmount / Math.pow(10, 18)
      }
      var newArray = outer.state.notifyTransactions.slice();
      newArray.unshift(transaction);
      outer.setState({notifyTransactions:newArray})
    });
    console.log('dashboard');
    if (this.props.location.pathname == '/dashboard') {
      this.setState({
      ...initialState,dash: 'active'

      });
    } else if (this.props.location.pathname == '/dashboard/contribution') {
      this.setState({
      ...initialState,cont:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/kyc') {
      this.setState({
      ...initialState,kyc:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/transactionHistory') {
      this.setState({
    ...initialState,tran:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/security') {
      this.setState({
      ...initialState,sec:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/ticket') {
      this.setState({
    ...initialState,ticket:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/support') {
      this.setState({
      ...initialState,support:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/faq') {
      this.setState({
      ...initialState,faq:'active'
      });
    } else if (this.props.location.pathname == '/dashboard/profile') {
      this.setState({
      ...initialState,profile:'active'
      });
    }else if (this.props.location.pathname == '/dashboard/notification') {
      this.setState({
      ...initialState,notification:'active'
      });
    }else if (this.props.location.pathname == '/dashboard/uploadDocs') {
      this.setState({
      ...initialState,upload_docs:'active'
      });
    }
  }

  showVideo(e){
    e.preventDefault();

    this.setState({
      showVideo : true
    });
  }

  closeVideo(e){
    this.setState({
      showVideo : false
    })
  }


  socialSubmit(e){
    e.preventDefault();

    const socialDetails = {
      name : this.props.dashboardwelcomepage.userInfo.fullName,
      twitter : e.target[0].value,
      telegram : e.target[1].value
    }
    this.props.submitSocial(socialDetails);
  }

  buyPage(e) {
    if(this.props.dashboardwelcomepage.userInfo.kycStatus !== 'ACCEPTED'){
      toast.error('Please complete your kyc to contribute')
    }else{
      this.toggleContActive()
    }
  }

  handleSubmitVote(data) {
    // console.log(data);
    this.props.submitVote(data);
  }
  compactNav() {
   // console.log(window.innerWidth);
    if (window.innerWidth < 770) {
     // console.log('compacting');
      if (this.state.compact === 'ui') {
        this.setState({
          compact: 'ui ui-aside-compact',

        });
      } else {
        this.setState({
          compact: 'ui',
          dashAct: 'active',
          kycAct: '',
          contAct: '',
          tranActive: '',
          secActive: '',
          supportActive: '',
          ticketActive: '',
          faqActive: '',
          profileActive: '',
          resetPassActive: '',
          upload_docs:''
        });
      }
    }
  }
  webScreenCompact() {
    // console.log('compacting');
    if (this.state.compact === 'ui') {
      this.setState({
        compact: 'ui ui-aside-compact',

      });
    } else {
      this.setState({
        compact: 'ui',

      });
    }
  }

  openNav() {
    // console.log('opening');
    this.setState({
      compact: 'ui',
    });
  }
  toggleDashActive() {
    this.setState({
      dash: 'active',
      kyc: '',
      sec: '',
      cont: '',
      tran: '',
      support: '',
      ticket: '',
      faq: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleSecActive() {
    this.setState({
      dash: '',
      kyc: '',
      sec: 'active',
      cont: '',
      tran: '',
      support: '',
      ticket: '',
      faq: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleContActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: 'active',
      tran: '',
      support: '',
      ticket: '',
      faq: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleTranActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: 'active',
      support: '',
      ticket: '',
      faq: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleSupportActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: 'active',
      ticket: '',
      faq: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  dashActive() {
    this.setState({
      dash: 'active',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: '',
      ticket: '',
      faq: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
    this.notifyTimeout();
  }
  toggleKycActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: 'active',
      cont: '',
      tran: '',
      support: '',
      ticket: '',
      faq: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleFaqActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: '',
      ticket: '',
      faq: 'active',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleTicketActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: '',
      faq: '',
      ticket: 'active',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleProfileActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: '',
      faq: '',
      ticket: '',
      profile: 'active',
      resetPass: '',
      notification:'',
      upload_docs:''
    });
  }
  toggleResetPassActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: '',
      faq: '',
      ticket: '',
      profile: '',
      resetPass: 'active',
      notification:'',
      upload_docs:''
    });
  }
  toggleUpDocsActive() {
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: '',
      faq: '',
      ticket: '',
      profile: '',
      resetPass: '',
      notification:'',
      upload_docs:'active'
    });
  }
  toggleNotificationsActive=()=>{
    console.log(" inside toogle");
    this.setState({
      dash: '',
      sec: '',
      kyc: '',
      cont: '',
      tran: '',
      support: '',
      faq: '',
      ticket: '',
      profile: '',
      resetPass: '',
      notification:'active',
      upload_docs:'',
      kycMsg:'',
    });
  }
  notifyTimeout() {
    toast.error('Transaction timeout, Please try again and complete transaction within 30 minutes');
  }
  notify() {
    toast.success('Thanks for the voting. You can refer friends now');
  }

  componentWillReceiveProps(nextProps){

   if(!!nextProps.dashboardwelcomepage.userInfo.kycDetails) {
     this.setState({
       kycMsg: nextProps.dashboardwelcomepage.userInfo.kycDetails.documentsRequired
     })
   }
    if(nextProps.kycDone){
      this.props.loadProfileAction();
      this.props.resetKycDone();
      this.toggleDashActive();
    }
  }

  closeAlert(){
    console.log('SHow alert');
    this.setState({
      showAlert : false
    })
  }
  handleDeleteUser=()=>{
    console.log(" in handle delete user in dashboard welcome page");
    this.props.deleteUserAction()
  }

  render() {
    console.log(this.props," props in");
    console.log(this.state,"state in ");
    console.log(this.state.notifyTransactions);
    if(this.state.notifyTransactions.length == 1){
      setTimeout(function(){
        $("#notify").addClass("hidden");
       }, 5000);
    }

    if(this.state.notifyTransactions.length > 1){
      setTimeout(function(){
        $("#notify").addClass("hidden");
       }, 5000);
       let arr = this.state.notifyTransactions;
       arr.pop();
       this.setState({
         notifyTransactions: arr
       })
      //  if(this.state.notifyTransactions.length >= 1){
        $("#notify").removeClass("hidden");
      //  }
    }


    const { kycStatus } = this.props.dashboardwelcomepage.userInfo;
    if (!localStorage.token) {
      return <Redirect to="/" />;
    }
    if (this.props.dashboardwelcomepage.loading) {
      return (
        <div>
          <LoadingSpinner style ={{display:"flex",justifyContent:"center",alignItems:"center",position:"fixed",width:"100%",height:"100%", background:"#fff", zIndex:"99999",overflow:"hidden"}} />
        </div>);
    }
    return (
      <div>
        <NavBarContainer routeToNotifications={this.toggleNotificationsActive} username={this.props.dashboardwelcomepage.userInfo.fullName} handleDeleteUser={this.handleDeleteUser} />
        <div id="ui" className={this.state.compact}>
        <Helmet>
          <title>User|Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
          <ToastContainer position="top-center" autoClose={6000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
          <SideBarNav
            kycStatus={this.props.dashboardwelcomepage.userInfo.kycStatus}
            dash={this.state.dash}
            sec={this.state.sec}
            tran={this.state.tran}
            cont={this.state.cont}
            kyc={this.state.kyc}
            support={this.state.support}
            faq={this.state.faq}
            ticket={this.state.ticket}
            profile= {this.state.profile}
            resetPass = {this.state.resetPass}
            compact={this.compactNav}
            open={this.openNav}
            webCompact={this.webScreenCompact}
            dashAct={this.state.dashAct}
            upload_docs={this.state.upload_docs}
            toggleDashActive={this.toggleDashActive}
            toggleContActive={this.toggleContActive}
            toggleKycActive={this.toggleKycActive}
            toggleSecActive={this.toggleSecActive}
            toggleTranActive={this.toggleTranActive}
            toggleSupportActive={this.toggleSupportActive}
            toggleFaqActive={this.toggleFaqActive}
            toggleProfileActive={this.toggleProfileActive}
            toggleResetPassActive={this.toggleResetPassActive}
            toggleTicketActive={this.toggleTicketActive}
            toggleUpDocsActive = {this.toggleUpDocsActive}
          />
          {(this.props.location.pathname == '/dashboard') ?
             (this.props.dashboardwelcomepage.loading?<LoadingSpinner />:<div id="content" className="ui-content ui-content-aside-overlay">
              <KycAlert kycStatus={this.props.dashboardwelcomepage.userInfo.kycStatus} msg={this.state.kycMsg }  closeAlert={this.closeAlert} showAlert={this.state.showAlert}/>
              <div className="row">
                <div className="col-sm-6">
                <h1>Dashboard</h1>
                </div>
                {
                  // <div className="col-sm-6 hidden-xs text-right">
                  //   <button className="btn btn-video" style={{marginRight:'20px'}} onClick={this.showVideo}>Video Instruction  <i className="fa fa-play-circle"></i></button>
                  // </div>
                }

              </div>
              {/*
                kycStatus === 'ACCEPTED' ? <Link to="/dashboard/contribution" >
                <button onClick={this.buyPage} className="form-buy-button"> <span>Buy Tokens</span></button>
                </Link> : <button onClick={this.buyPage} className="form-buy-button"> <span>Buy Tokens</span></button>
              */}
              <div className="ui-content-body">
                <div className="ui-container container-fluid">
                  <Balance userInfo={this.props.dashboardwelcomepage.userInfo} />
                  <Refer  code={this.props.dashboardwelcomepage.userInfo} />

                </div>
              </div>

            </div>) : (this.props.location.pathname == '/dashboard/security') ?
              <SecurityPage /> :
              (this.props.location.pathname == '/dashboard/profile') ?
              <ProfilePage /> :
              (this.props.location.pathname == '/dashboard/resetpassword') ?
                <div id="content" className="ui-content ui-content-aside-overlay reset-password">
                  <div className="ui-content-body">
                    <div className="ui-container container-fluid">
                      <ResetPassword />
                    </div>
                  </div>
                </div> : (this.props.location.pathname == '/dashboard/contribution') ?
                  <ContributionPage /> :
                  (this.props.location.pathname == '/dashboard/support') ?
                  <SupportPage /> :
                  (this.props.location.pathname == '/dashboard/faq') ?
                  <FaqPage /> :
                  (this.props.location.pathname == '/dashboard/uploadDocs') ?
                  <UploadDocuments /> :
                  (this.props.location.pathname == '/dashboard/ticket') ?
                  <TicketPage /> :
                  (this.props.location.pathname == '/dashboard/kyc') ?
                    <KycPage dashActive={this.toggleDashActive} kycActive={this.toggleKycActive}/> :
                  (this.props.location.pathname == '/dashboard/transactionHistory') ?
                    <TransactionHistory message={this.props.global.depositSuccess} /> :
                    (this.props.location.pathname == '/dashboard/notification') ?
                      <Notification  />:
'' }
          <div id="footer" className="ui-footer">© 2018 RUC, All Rights Reserved</div>
          <div className="sticky-telegram-logo"><a href=" https://t.me/rucofficial" className="sticky-telegram-icon" target="_blank">Telegram</a></div>
          { this.state.notifyTransactions.length > 0 ?
          <div className="notify-deposit fade-in" id="notify">
          <p><strong>{this.state.notifyTransactions[this.state.notifyTransactions.length-1].address}</strong><br/>
            has contributed <strong>{this.state.notifyTransactions[this.state.notifyTransactions.length-1].amount}ETH</strong></p>
          </div> : null
          }
        </div>

        <div className="static-modal">
          <Modal show={this.state.showVideo} onHide={this.closeVideo} style={{marginTop:'100px'}}>
            <Modal.Body style={{background:'#edf2f8'}}>
            <div className="row text-right">
              <div className="col-sm-12">
                <i className="fa fa-close" style={{cursor:'pointer'}} onClick={this.closeVideo}></i>
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/qOVAbKKSH10" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>
              </div>
            </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>);
  }
}

DashBoardWelcomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboardwelcomepage: makeSelectDashBoardWelcomePage(),
  global: makeGlobalParent(),
  kycDone: makeSelectKycDone()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProfileAction: () => dispatch(loadProfileAction()),
    submitSocial: (data) => dispatch(submitSocial(data)),
    resetKycDone: () => dispatch(resetKycDone()),
    deleteUserAction: () => dispatch(deleteUserAction()),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'dashBoardWelcomePage', reducer });
const withSaga = injectSaga({ key: 'dashBoardWelcomePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(DashBoardWelcomePage);
