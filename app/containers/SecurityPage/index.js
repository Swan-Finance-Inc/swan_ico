/**
 *
 * SecurityPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router';
import { Helmet } from 'react-helmet';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectSecurityPage, { makeSelectEnable, makeSelectResponse, makeSelectDisable, makeSelectQr,
   makeSelectVerified, makeSelectQrKey, makeSelectActivityRet, makeSelectLoadActivitySuccess, makeSelectActivityStatus } from './selectors';
import { enable2fa, disable2fa, success2fa, verify2fa, saveActivity, removeActivitySuccess, loadActivityStatus } from './actions';
import reducer from './reducer';
import saga from './saga';
import { makeGlobalParent } from '../App/selectors';
import { ToastContainer, toast } from 'react-toastify';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Activity from 'containers/Activity/Loadable';
import Info from "../../components/Info";
import Switch from 'react-toggle-switch';

export class SecurityPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.securityCheck = this.securityCheck.bind(this);
    this.disableCheck = this.disableCheck.bind(this);
    this.state = {
      //@aj
      infoShow: false,
      imageBase64: '',
      check: false,
      enabled: false,
      copy: false,
      activityLog:false,
      withdrawlSwitch:false,
      loginSwitch:false,
      resetPasswordSwitch:false,
      showLogs:false
    };
    this.verifyAuth = this.verifyAuth.bind(this);
    this.disableAuth = this.disableAuth.bind(this);
  }

  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow
    });
    console.log('infoShow : ', this.state.infoShow);
  }

  componentDidMount() {
    // console.log(this.props.verified)

    // console.log(this.props.global.fa_enabled)
    // console.log(this.props.global.fa_disabled)
    // console.log(this.state.enabled)
    // this.props.loadActivityStatus()
        if (this.props.global.fa_enabled) {
      document.getElementById('2fa').checked = true;
      this.setState({
        enabled: true,
      });
    }
    if(this.props.ActivityStatus){
      this.setState({
        activityLog:true
      })
    }
    // else if(this.props.activityStatus) {
    //   this.setState({
    //       activityLog:this.props.activityStatus
    //   })
    // }
    else{
      this.setState({
          activityLog:this.props.activityStatus
      })
    }
    // if(this.props.activityStatus || this.props.ActivityStatus){
    // document.getElementById('activityLog').checked = true;
    //
    // }
  }
  componentWillReceiveProps(nextProps) {
  if(nextProps.saveActivityRet){
    if(nextProps.saveActivityRet.success){
      toast.success(nextProps.saveActivityRet.message)
      this.setState({
        activityLog:nextProps.saveActivityRet.saveActivityLogs
      })
      nextProps.removeActivitySuccess()
    }
    else{
      toast.error(nextProps.saveActivityRet.message)
      nextProps.removeActivitySuccess()
    }
  }
    // console.log(nextProps)
    this.setState({
      imageBase64: nextProps.qrCode,
    });
  }

  notifySuccess(message) {
    toast.success(message);
  }

  notifyError(message) {
    toast.error(message);
  }

  securityCheck() {
  // console.log("selected")
    this.setState({
        copy : false
    })
    const fa = document.getElementById('2fa');
    this.props.enable2fa();
    if (fa.checked && !this.state.check) {
      this.setState({
        check: true,
      });
      // console.log(this.props.global.fa_disabled)
    } else if ((!fa.checked)) {
      this.setState({
        check: false,
      });
    }
  }

  disableCheck() {
    if (this.state.check) {
      this.setState({
        check: false,
        enabled: false,

      });
      // console.log(this.props.global.fa_disabled)
    }
  }
  verifyAuth(e) {
    e.preventDefault();
    this.setState({
      check: true,
      enabled: true,
    });
    this.props.verify2fa(e.target[0].value);
  }
  disableAuth() {
    this.props.disable2fa();
    this.setState({
      enabled: false,
      check: false,
    });
  }
  handleSaveActivityLog=(e)=>{
    console.log(" inside save Activity log Handler")
    this.props.saveActivity({
      saveActivityLogs:!this.state.activityLog
    })
  }
  handleShowLogs=(e)=>{
    this.setState({
      showLogs:!this.state.showLogs
    })
  }

  resetInfo=()=>{
    this.props.toggleInfo()
  }

  render() {
    console.log(this.state," State in security Page")
    console.log(this.props," props in security Page")
    if(this.props.response){
      if(this.props.response.success){
        this.notifySuccess(this.props.response.message);
        // this.props.resetSuccess();
      }
      if(!this.props.response.success){
        this.notifyError(this.props.response.message);
      }
    }
    if (!localStorage.token) {
      return <Redirect to="/" />;
    }
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
        <div className="ui-content-body">
        <Helmet>
          <title>Security</title>
          <meta name="description" content="Description of Security" />
        </Helmet>
          <div className="ui-container container-fluid">
            <div className="" style={{ marginBottom: '500px' }}>

              <div className="panel panel-default" style={{boxShadow:'0px 3px 6px #2D6DCD6E'}}>
                  <div className="setting-panel-heading" >
                  2FA
                  </div>
                  <div className = "panel-body first-card" >
                   <div className="row" style={{borderBottom:'1px solid #2D6DCD6E',padding:'20px 10px'}}  >
                    <div className="col col-md-12" >
                      <div>
                      <span style={{color:'#00296B',fontWeight:'bold'}} >Security Key </span>Recommended: YubiKey

                        <button className="security-button" > Setup</button>
                      </div>
                      <a style={{color:'#465490',textDecoration:'underline'}} >What is security Key</a>
                      <div style={{color:'#7C7C7C',padding:'10px 0px'}} >Protected Action</div>

                      <div className="row" >
                            <div className="col col-md-3" style={{borderRight:'1px solid #2D6DCD6E'}} >
                              <span style={{color:'#7C7C7C'}}>
                              withdrawl &  API
                              </span>
                                <div style={{float:'right'}} >
              <Switch onClick={()=>this.setState((prevState)=>({withdrawlSwitch:!prevState.withdrawlSwitch}))} on = {this.state.withdrawlSwitch} />

                                </div>
                            </div>
                            <div className="col col-md-3" style={{color:'#7C7C7C',borderRight:'1px solid #2D6DCD6E'}} >
                                Login
                              <div style={{float:'right'}}>
              <Switch onClick={()=>this.setState((prevState)=>({loginSwitch:!prevState.loginSwitch}))} on = {this.state.loginSwitch}/>

              </div>
                            </div>
                            <div className="col col-md-3" style={{color:'#7C7C7C'}}>
                                  Reset Password
                                  <div style={{float:'right'}}>
              <Switch onClick={()=>this.setState((prevState)=>({resetPasswordSwitch:!prevState.resetPasswordSwitch}))} on = {this.state.resetPasswordSwitch}/>

                                  </div>
                            </div>
                      </div>
                    </div>
                    </div>

                      <div className="row" style={{borderBottom:'1px solid #2D6DCD6E',padding:'20px 10px'}} >
                        <div className ='col col-md-6' >
                          <div>
                            <span style={{color:'#00296B',fontWeight:'bold'}} >
                            Google Authentication
                            </span>
                            <br/>
                            <span style={{color:'#7C7C7C'}} >
                            Used for withdrawals and security modifications
                            </span>
                            <br/>
                            <a style={{color:'#465490',textDecoration:'underline'}} >
                           Having trouble with your Google Authenticator?

                            </a>
                          </div>
                          </div>
                          <div className='col col-md-6'>
                          <div>
                            <button className="security-button">Enable</button>
                          </div>
                          </div>
                      </div>
                      <div className="row" style={{padding:'20px 10px'}} >
                        <div className="col col-md-12" >
                          <span style={{color:'#00296B'}} >
                          SMS Authentication
                          </span>
                          <br/>
                          <span style={{color:'#7C7C7C'}} >
                          Used for withdrawals and security modifications
                          </span>
                         
                        <div>
                          <button className="security-button">ON</button>
                        </div>
                        </div>
                   </div>
                  </div>
              </div>
            {/* <div className="panel panel-default">

              <div className="setting-panel-heading">
                {
                  !!this.props.flag ?
                    <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
                    :
                    null
                }

                2FA
              </div>
                <div className="panel-body" style={{fontSize:'16px'}}>
              <div className="row">
                <div className="col-sm-12">

                  {
                    (this.props.global.fa_enabled && this.state.enabled) ?
                      <div>
                        <button onClick={this.disableAuth} className="form-button" style={{ marginTop: '10px' }}>Disable 2fa</button>
                      </div> :
                      (!this.state.check) ? <form>
                        <div className="checkbox">
                          <label>
                            <input id="2fa" type="checkbox" onChange={this.securityCheck} />
                            Enable Two-Factor Authentication via Google Authenticator
                          </label>
                        </div>
                      </form> :
                        (this.state.check) ?
                          <div>
                            <form>
                              <div className="checkbox">
                                <label>
                                  <input id="2fa2" type="checkbox" checked onChange={this.disableCheck} />
                                     Enable Two-Factor Authentication via Google Authenticator
                                </label>
                              </div>
                            </form>
                            <form onSubmit={this.verifyAuth}>
                            <div className="row">
                             <div className="col-sm-6 text-center">
                              <img src={`data:image/jpeg;${this.state.imageBase64}`} />
                                </div>
                                <div className="col-sm-5 bal-card qrKey">
                               <h3>Manual Key : </h3>
                               <span><h4 style={{wordWrap: 'break-word'}} id="qrKey">{this.props.qrKey}</h4></span>
                               <CopyToClipboard text={this.props.qrKey}
                                  onCopy={() => this.setState({copy: true})}>
                                  <span className="btn btn-primary">Copy</span>
                                </CopyToClipboard>
                               <h4>{ this.state.copy ? 'Key copied' : '' }</h4>
                             </div>
                              </div>
                              <div className="form-group">
                                <label htmlFor="otp" className="form-label"> Scan QR code from authenticator app to get your 2FA code</label>
                                <input id="otp" type="number" name="otp" className="form-input form-control" placeholder="Your 2fa code" required />
                              </div>
                              <div className="text-center">
                              <button type="submit" className="form-button" style={{ marginTop: '10px' }}>Verify</button>
                              </div>

                            </form>
                          </div>
                          : <div></div>
                  }

                </div>
              </div>
            </div>
          </div> */}
          <div className="panel panel-default" style={{boxShadow:'0px 3px 6px #2D6DCD6E'}}>
            {/*<div className="panel-heading">Save Activity Log</div>*/}
            <div className="setting-panel-heading">
              {/* <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} /> */}
              {
                !!this.props.flag ?
                  <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
                  :
                  null
              }
              Save Activity Log
            </div>
              <div className="panel-body" style={{fontSize:'16px'}}>
            <div className="row">
              <div className="col-sm-12">
              <div className="checkbox">
                

                  {/* <input id="activityLog" checked={this.state.activityLog} type="checkbox" onChange={this.handleSaveActivityLog} /> */}
                   
                    <div style={{display:'flex'}} >
                      <div className='first-card' style={{color:'#7C7C7C',fontWeight:'bold'}}> Save My Activity Log</div>
                   <div style={{marginLeft:'50px'}}>
                   <Switch onClick={this.handleSaveActivityLog} on={this.state.activityLog}/>

                   </div>
              </div>
                
                
              </div>
              </div>
            </div>
            <div className='row'>
            <div className='text-center'>
            <button className="invest" style={{background : '#2498D5',fontSize:'20px',fontWeight:'bold'}} onClick={this.handleShowLogs} >{this.state.showLogs?'Hide Log':'Show Log'}</button>
            </div>
            </div>
            <div className='row'>
            {this.state.showLogs && <Activity />}
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

SecurityPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  securitypage: makeSelectSecurityPage(),
  enabled: makeSelectEnable(),
  qrCode: makeSelectQr(),
  global: makeGlobalParent(),
  disabled: makeSelectDisable(),
  verified: makeSelectVerified(),
  response: makeSelectResponse(),
  qrKey: makeSelectQrKey(),
  saveActivityRet:makeSelectActivityRet(),
  loadActivitySucces:makeSelectLoadActivitySuccess(),
  ActivityStatus:makeSelectActivityStatus()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    enable2fa: () => dispatch(enable2fa()),
    disable2fa: () => dispatch(disable2fa()),
    success2fa: (data) => dispatch(success2fa(data)),
    verify2fa: (data) => dispatch(verify2fa(data)),
    saveActivity: (data) => dispatch(saveActivity(data)),
    removeActivitySuccess: (data) => dispatch(removeActivitySuccess(data)),
    loadActivityStatus: (data) => dispatch(loadActivityStatus(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'securityPage', reducer });
const withSaga = injectSaga({ key: 'securityPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(SecurityPage);
