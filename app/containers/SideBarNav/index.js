/**
 *
 * SideBarNav
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import makeSelectSideBarNav from './selectors';
import reducer from './reducer';
import { Link } from 'react-router-dom';
// import routes from '../../router/routes'
import { userLoggedOut } from '../App/actions';
import { push } from 'react-router-redux';
import { makeSelectLocation } from 'containers/App/selectors';
import { toast } from 'react-toastify';
import { Modal, Button } from 'react-bootstrap';

import { Contribution, DashBoard, KYC, Referral, Security, Tickets, Transactions } from '../../components/Icons/index';

export class SideBarNav extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dashAct: '',
      contAct: '',
      kycAct: '',
      tranAct: '',
      secAct: '',
      ticketAct: '',
      supportAct: '',
      faqAct: '',
      newsAct: '',
      announcementsAct: '',
      profileAct: '',
      resetPassAct: '',
      showSignOut: false,
      upload_docs:'',
      myReferal:'',
      buyAct:'',
      PrivacyPolicy:''
    };
  }

  componentDidMount() {
    this.setState({
      dashAct: this.props.dash,
      contAct: this.props.cont,
      kycAct: this.props.kyc,
      tranAct: this.props.tran,
      ticketAct: this.props.ticket,
      secAct: this.props.sec,
      supportAct: this.props.support,
      faqAct: this.props.faq,
      announcementsAct: this.props.announcements,
      newsAct: this.props.news,
      profileAct: this.props.profile,
      resetPassAct: this.props.resetPass,
      upload_docs:this.props.upload_docs,
      myReferal:this.props.myReferal,
      buyAct:this.props.buy
    });
  }


  togglemyReferal=(e)=>{
    this.props.compact();
    this.props.togglemyReferal();
  }


  handleLogOut=()=>{
  // console.log('logginouttt...');
    this.props.logOut();
    this.props.push('/signin');
  }
  toggleDashActive=(e)=>{
    this.props.compact();
    this.props.toggleDashActive();

  // console.log('toggling', e);
  }
  toggleUpDocsActive=(e)=>{
    this.props.compact();
    this.props.toggleUpDocsActive();

  // console.log('toggling', e);
  }
  toggleContriActive=(e)=>{
    // if(this.props.kycStatus == 'ACCEPTED'){
      this.props.compact();
      this.props.toggleContActive();
    // }else{
      // toast.error('Please complete your kyc to contribute.')
    // }
  }

  toggleKycActive=(e)=>{
    if(this.props.kycStatus == 'PENDING' || this.props.kycStatus == 'REJECTED'){
      this.props.compact();
      this.props.toggleKycActive();
    }
  }

  toggleTranActive=(e)=>{
    this.props.compact();
    this.props.toggleTranActive();
  // console.log('toggling', e);
  }

  toggleHowToBuyActive=(e)=>{
    this.props.compact();
    this.props.toggleHowToBuyActive();

    }
  toggleSecActive=(e)=>{
    this.props.compact();
    this.props.toggleSecActive();
  }
  toggleSupportActive=(e)=>{
    this.props.compact();
    this.props.toggleSupportActive();
  }
  toggleFaqActive=(e)=>{
    this.props.compact();
    this.props.toggleFaqActive();
  }
  toggleTicketActive=(e)=>{
    this.props.compact();
    this.props.toggleTicketActive();
  }
  toggleProfileActive=(e)=>{
    this.props.compact();
    this.props.toggleProfileActive();
  }
  toggleResetPassActive=(e)=>{
    this.props.compact();
    this.props.toggleResetPassActive();
  }

  toggleNewsActive=(e) => {
    this.props.compact();
    this.props.toggleNewsActive();
  }

  toggleAnnouncementsActive=(e) => {
    this.props.compact();
    this.props.toggleAnnouncementsActive();
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps,'nexprops')
    this.setState({
      dashAct: nextProps.dash,
      contAct: nextProps.cont,
      kycAct: nextProps.kyc,
      announcementsAct: this.props.announcements,
      newsAct: this.props.news,
      tranAct: nextProps.tran,
      secAct: nextProps.sec,
      ticketAct: nextProps.ticket,
      supportAct: nextProps.support,
      faqAct: nextProps.faq,
      profileAct: nextProps.profile,
      resetPassAct: nextProps.resetPass,
      upload_docs:nextProps.upload_docs,
      myReferal:nextProps.myReferal,
      buyAct:nextProps.buy
    });

  }

  showSignOut=()=>{
    this.setState({
      showSignOut: true
    })
  }

  closeSignOut=()=>{
    this.setState({
      showSignOut: false
    })
  }


  render() {
    console.log(this.state,'hoeoeoei')
    console.log(this.props,'props mkdkslnfndfkjdjvdj')

    return (
      <div style={{'height': '100%','width': '100%','overflow': 'hidden'}}>
        <div style={{width: '100%',height: '99%',overflow: 'auto',paddingRight: '15px'}}>
        <ul className="nav navbar-nav sidebar-trigger hamburger-menu visible-xs">
          <li><a className="toggle-btn" data-toggle="ui-nav" role="button" onClick={this.props.compact}> <span /> </a> </li>
        </ul>
        <div className="static-modal">
            <Modal show={this.state.showSignOut} onHide={this.closeSignOut} bsSize="small" dialogClassName="modal-signout">
              <Modal.Body>
                <div className="row">
                  <div className="col-sm-12 text-right" style={{'cursor': 'pointer'}}>
                      <i className="fa fa-close" onClick={this.closeSignOut}></i>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <h3 className="signOut-head">Do you really want to sign out ?</h3><hr/>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <button className="btn btn-outline" onClick={this.handleLogOut}>YES</button>
                    <button className="btn btn-outline" style={{marginLeft:'20px'}} onClick={this.closeSignOut}>GO Back</button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>

         <aside id="aside" className="ui-aside">
           <ul className="nav ui-nav">
           <li className={`${this.state.dashAct} nav-item`}
            ><Link to="/dashboard" role="button" onClick={this.toggleDashActive}>
               <DashBoard color={this.state.dashAct ? '#fff' : '#2d6dcd'}/>
               <span className={`ui-nav-text ${this.state.dashAct}`} 
               >Dashboard</span> 
               </Link>
            </li>
            <li className={`${this.state.kycAct} nav-item`} ><Link to="/dashboard/kyc" role="button" onClick={this.toggleKycActive}>
               <KYC color={this.state.kycAct ? '#fff' : '#2d6dcd'}/>
               <span className={`ui-nav-text ${this.state.kycAct}`}>KYC Verify</span> 
               </Link>
            </li>
    
            <li className={`${this.state.contAct} nav-item`} ><Link to="/dashboard/contribution" role="button" onClick={this.toggleContriActive}>
               <Contribution color={this.state.contAct ? '#fff' : '#2d6dcd'}/>
               <span className={`ui-nav-text ${this.state.contAct}`}>Contribution</span> 
               </Link>
            </li><li className={`${this.state.tranAct} nav-item`}  ><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive}>
                <Transactions color={this.state.tranAct ? '#fff' : '#2d6dcd'}/>
               <span className={`ui-nav-text ${this.state.tranAct}`}>Transactions</span> 
               </Link>
            </li><li className={`${this.state.myReferal} nav-item`} ><Link to="/dashboard/myReferal" role="button" onClick={this.togglemyReferal}>
               <Referral color={this.state.myReferal ? '#fff' : '#2d6dcd'}/>
               <span className={`ui-nav-text ${this.state.myReferal}`}>Referrals</span> 
               </Link>
            </li><li className={`${this.state.ticketAct} nav-item`}><Link to="/dashboard/ticket" role="button" onClick={this.toggleTicketActive}>
               <Tickets color={this.state.ticketAct ? '#fff' : '#2d6dcd'}/>
               <span className={`ui-nav-text ${this.state.ticketAct}`}>Tickets</span> 
               </Link>
            </li><li className={`${this.state.secAct} nav-item`} ><Link to="/dashboard/security" role="button" onClick={this.toggleSecActive}>
               <Security color={this.state.secAct ? '#fff' : '#2d6dcd'}/>
               <span className={`ui-nav-text ${this.state.secAct}`}>Security</span> 
               </Link>
            </li>
            <hr></hr>

            <span className='configuration black'>INFO</span>

             <li className={this.state.buy}><a href='https://s3-ap-southeast-1.amazonaws.com/centralex-bucket/White_Paperv-4.pdf' target='_blank'><span className="has-icon black"><i className="fa fa-file-code-o"></i></span><span className={`${this.state.buy} black`} >White Paper</span></a>
             </li>
             
            <li className={this.state.faqAct}><Link to="/dashboard/faq" role="button" onClick={this.toggleFaqActive}><span className="has-icon black"><i className="fa fa-question-circle"></i></span><span className={`${this.state.faqAct} black`}>FAQ</span></Link>
             </li>
            <li className={this.state.PrivacyPolicy}><a href='https://www.centralex.io/privacy.html' target='_blank'><span className="has-icon black"><i className="fa fa-user-secret"></i></span><span className={`${this.state.PrivacyPolicy} black`}>Privacy Policy</span></a>
             </li> black
               <li className={this.state.newsAct}><Link to="/dashboard/news" role="button" onClick={this.toggleNewsActive} ><span className="has-icon black"><i className="fa fa-newspaper-o"></i></span><span className={`${this.state.newsAct} black`} >News</span></Link>
               </li>

               <li className={this.state.announcementsAct}><Link to="/dashboard/announcements" role="button" onClick={this.toggleAnnouncementsActive} ><span className="has-icon black"><i className="fa fa-bullhorn"></i></span><span className={`${this.state.announcementsAct} black`} >Announcements</span></Link>
              </li>

             <li className={this.state.supportAct}><a href="mailto:support@centralex.io"><span className="has-icon black"><i className="fa fa-life-ring"></i></span><span className={`${this.state.supportAct} black`} >Support</span><span className='infoSpan'>support@centralex.io</span></a>
              </li>
          </ul>
         </aside>

       {
        // <aside id="aside" className="ui-aside">
        //   {/* toggle buttons start*/}
        //   {
        //   //   <ul className="nav navbar-nav sidebar-trigger hamburger-menu hidden-xs">
        //   //   <li><a className="toggle-btn" data-toggle="ui-nav" role="button" onClick={this.props.webCompact}> <span /> </a> </li>
        //   // </ul>
        //   }
        //   {/* toggle buttons end */}
        //   <ul className="nav ui-nav">
        //     <li className={this.state.dashAct} ><Link to="/dashboard" role="button" onClick={this.toggleDashActive}>
        //       <img src={dashboard} />
        //       <span>Dashboard</span> 
        //       </Link>
        //     </li>
        //     <li className={this.state.kycAct}><Link to="/dashboard/kyc" role="button" onClick={this.toggleKycActive} ><span className="has-icon"><img src={kyc} /></span><span>KYC Verify</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/kyc" role="button" onClick={this.toggleKycActive}><span>KYC Verify</span></Link></li>
        //       </ul>
        //     </li>
        //     {/* <li className={this.state.contAct}><Link to={this.props.kycStatus === 'ACCEPTED' ? "/dashboard/contribution" : this.props.location.pathname} role="button" onClick={this.toggleContriActive} ><span className="has-icon"><i className="fa fa-money"></i></span><span>Contribution</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/contribution" role="button" onClick={this.toggleContriActive}><span>Contribution</span></Link></li>
        //       </ul>
        //     </li> */}
        //     <li className={this.state.contAct}><Link to="/dashboard/contribution" role="button" onClick={this.toggleContriActive} ><span className="has-icon"><img src={dashboard} /> </span><span>Contribution</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/contribution" role="button" onClick={this.toggleContriActive}><span>Contribution</span></Link></li>
        //       </ul>
        //     </li>
        //     <li className={this.state.tranAct}><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive}><span className="has-icon"><img src={Transactions} /> </span><span>Transactions</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/transactionHistory" role="button" onClick={this.toggleTranActive} ><span>Transactions</span></Link></li>
        //       </ul>
        //     </li>
        //     <li className={this.state.myReferal}><Link to="/dashboard/myReferal" role="button" onClick={this.togglemyReferal}><span className="has-icon"><img src={referral} /> </span><span>Referrals</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/myReferal" role="button" onClick={this.togglemyReferal} ><span>Referrals</span></Link></li>
        //       </ul>
        //     </li>
        //     <li className={this.state.ticketAct}><Link to="/dashboard/ticket" role="button" onClick={this.toggleTicketActive}><span className="has-icon"><img src={Tickets} /> </span><span>Tickets</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/ticket" role="button" onClick={this.toggleTicketActive}><span>Tickets</span></Link></li>
        //       </ul>
        //     </li>
        //     {
        //     // <li className={this.state.upload_docs}><Link to="/dashboard/uploadDocs" role="button" onClick={this.toggleUpDocsActive}><span className="has-icon"><i className="fa fa-ticket"></i></span><span>Upload Documents</span></Link>
        //     //   <ul className="nav nav-sub sidebar-niceScroll">
        //     //     <li className="nav-sub-header"><Link to="/dashboard/uploadDocs" role="button" onClick={this.toggleUpDocsActive}><span>Upload Documents</span></Link></li>
        //     //   </ul>
        //     // </li>
        //   }
        //     <li className={this.state.secAct}><Link to="/dashboard/security" role="button" onClick={this.toggleSecActive}><span className="has-icon"><i className="fa fa-lock"></i></span><span>Security</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/security" role="button" onClick={this.toggleSecActive}><span>Security</span></Link></li>
        //       </ul>
        //     </li>

        //     {
        //       window.innerWidth < 768 ? <li className={this.state.profileAct}><Link to="/dashboard/profile" role="button" onClick={this.toggleProfileActive}><span className="has-icon"><i className="fa fa-user"></i></span><span>Update Profile</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/profile" role="button" onClick={this.toggleProfileActive}><span>Update Profile</span></Link></li>
        //       </ul>
        //     </li> : null
        //     }
        //     {
        //       window.innerWidth < 768 ? <li className={this.state.resetPassAct}><Link to="/dashboard/resetpassword" role="button" onClick={this.toggleResetPassActive}><span className="has-icon"><i className="fa fa-key"></i></span><span>Reset Password</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/resetpassword" role="button" onClick={this.toggleResetPassActive}><span>Reset Password</span></Link></li>
        //       </ul>
        //     </li> : null
        //   }
        //   {
        //     // <li><a  onClick={this.showSignOut}  style={{cursor:'pointer'}} ><span className="has-icon"><i className="fa fa-sign-out"></i></span><span>Sign Out</span></a>
        //     //   <ul className="nav nav-sub sidebar-niceScroll">
        //     //     <li className="nav-sub-header"><a><span>Sign Out</span></a></li>
        //     //   </ul>
        //     // </li>
        //   }

        //     <hr></hr>
        //    <span className='configuration'>INFO</span>
        //    {/*
        //     <li className={this.state.buy}><Link to="#" role="button"><span className="has-icon"><i className="fa fa-question-circle"></i></span><span>How To Buy?</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><a href='#'><span>How To Buy?</span></a></li>
        //       </ul>
        //     </li>
        //     */}
        //     <li className={this.state.buy}><a href='https://s3-ap-southeast-1.amazonaws.com/centralex-bucket/White_Paperv-4.pdf' target='_blank'><span className="has-icon"><i className="fa fa-file-code-o"></i></span><span>White Paper</span></a>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><a href='https://s3-ap-southeast-1.amazonaws.com/centralex-bucket/White_Paperv-4.pdf' target='_blank'><span>White Paper</span></a></li>
        //       </ul>
        //     </li>
        //     <li className={this.state.faqAct}><Link to="/dashboard/faq" role="button" onClick={this.toggleFaqActive}><span className="has-icon"><i className="fa fa-question-circle"></i></span><span>FAQ</span></Link>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><Link to="/dashboard/faq" role="button" onClick={this.toggleFaqActive}><span>FAQ</span></Link></li>
        //       </ul>
        //     </li>
        //     <li className={this.state.PrivacyPolicy}><a href='https://www.centralex.io/privacy.html' target='_blank'><span className="has-icon"><i className="fa fa-user-secret"></i></span><span>Privacy Policy</span></a>
        //       <ul className="nav nav-sub sidebar-niceScroll">
        //         <li className="nav-sub-header"><a href='https://www.centralex.io/privacy.html' target='_blank'><span>Privacy Policy</span></a></li>
        //       </ul>
        //     </li>
        //       <li className={this.state.newsAct}><Link to="/dashboard/news" role="button" onClick={this.toggleNewsActive} ><span className="has-icon"><i className="fa fa-newspaper-o"></i></span><span>News</span></Link>
        //         <ul className="nav nav-sub sidebar-niceScroll">
        //           <li className="nav-sub-header"><Link to="/dashboard/news" role="button" onClick={this.toggleNewsActive}><span>News</span></Link></li>
        //         </ul>
        //       </li>

        //       <li className={this.state.announcementsAct}><Link to="/dashboard/announcements" role="button" onClick={this.toggleAnnouncementsActive} ><span className="has-icon"><i className="fa fa-bullhorn"></i></span><span>Announcements</span></Link>
        //         <ul className="nav nav-sub sidebar-niceScroll">
        //           <li className="nav-sub-header"><Link to="/dashboard/announcements" role="button" onClick={this.toggleAnnouncementsActive}><span>Announcements</span></Link></li>
        //         </ul>
        //       </li>

        //     <li className={this.state.supportAct}><a href="mailto:support@centralex.io"><span className="has-icon"><i className="fa fa-life-ring"></i></span><span>Support</span><span className='infoSpan'>support@centralex.io</span></a>
        //          <ul className="nav nav-sub sidebar-niceScroll">
        //            <li className="nav-sub-header"><a href="mailto:support@centralex.io"><span>Support</span></a></li>
        //          </ul>
        //        </li>
        //   </ul>
        // </aside>
        }
        </div>
      </div>
    );
  }
}

SideBarNav.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sidebarnav: makeSelectSideBarNav(),
  location: makeSelectLocation(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    logOut: (user) => dispatch(userLoggedOut(user)),
    push: (route) => dispatch(push(route)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'sideBarNav', reducer });

export default compose(
  withReducer,
  withConnect,
)(SideBarNav);
