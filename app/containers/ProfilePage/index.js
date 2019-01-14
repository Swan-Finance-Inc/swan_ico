/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';


import Toggle from 'react-toggle';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProfilePage, { makeSelectDetails, makeSelectUpdateSuccess ,makeSelectImageReturn, makeSelectUserInfo, makeSelectLoading } from './selectors';
import makeSelectDashBoardWelcomePage from 'containers/DashBoardWelcomePage/selectors';
import reducer from './reducer';
import saga from './saga';
import { updateDetails, resetSuccess ,uploadProfileImage, getProfileData, getProfileRemove } from './actions';
import { ToastContainer, toast } from 'react-toastify';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { parseNumber, formatNumber, isValidNumber } from 'libphonenumber-js'
import LoadingSpinner from 'components/LoadingSpinner/Loadable';
import Switch from 'react-toggle-switch';


export class ProfilePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.state = {
        email : '',
        fullName : '',
        dob : '',
        gender : '',
        phone : '',
        telegram : '',
        twitter : '',
        creative: '',
        youtube: '',
        facebook: '',
        reddit: '',
        linkedIn: '',
        translation: '',
        signature: '',
        loginAlert : false,
        ethAddress: '',
        valid : true,
        notifyMe:false,
        referalUrl:'',
        profilePicUrl:'',
        profilePic:'',
        currentView:'personal'
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
  };

  handleInput(e){
    if(e.target.name == 'loginAlert'){
      this.setState({
        [e.target.name] : e.target.checked
      })
    }else if(e.target.name == 'latestNewsAlert') {
      this.setState({
        [e.target.name] : e.target.checked
      })
    }else if(e.target.name == 'ethAddress'){
      this.setState({
        [e.target.name]: e.target.value
      })
      if(e.target.value.match(/^0x[a-fA-F0-9]{40}$/) || e.target.value == ''){
        this.setState({
          valid: true
        })
      }else{
        this.setState({
          valid: false
        })
      }
    }else{
      this.setState({
        [e.target.name] : e.target.value
      })
    }
  }

  componentWillMount(){
    const { email, fullName, dob, gender, phone, telegram, twitter, creative, youtube, facebook, reddit, linkedIn, translation, signature, loginAlert, ethAddress, notifyMe } = this.props.userInfo.userInfo;
    this.state = {
      email,
      fullName,
      dob,
      gender,
      phone,
      telegram,
      twitter,
      creative,
      youtube,
      facebook,
      reddit,
      linkedIn,
      translation,
      signature,
      loginAlert,
      ethAddress,
      valid: true,
      currentView:'personal',
      notifyMe
    }
        this.props.getProfileData();
  }
  componentDidMount(){
    this.setState({
      referalUrl:`https://tokensale.Pexo.io/signup/refer/${this.props.userInfo.userInfo.referral.code}`,
     profilePicUrl:this.props.userInfo.userInfo.imageProfile
    })
  }

  updateDetails(e){
    e.preventDefault()
    if(!isValidNumber(this.state.phone)){
      toast.error('Phone number is invalid');
    }else if(this.state.valid){
      const { fullName, dob, gender, phone, telegram, twitter, creative, youtube, facebook, reddit, linkedIn, translation, signature, loginAlert, ethAddress,notifyMe } = this.state;
      this.props.updateDetail({fullName, dob, gender, phone, telegram, twitter, creative, youtube, facebook, reddit, linkedIn, translation, signature, loginAlert,ethAddress, notifyMe});
    }else{
      toast.error('Please enter valid ETH Wallet address');
    }
  }
  changeView = (view)=>{
     if(view === 'personal') {
        this.setState({
          currentView:'personal'
        })
     } else if(view === 'notifications'){
      this.setState({
        currentView:'notifications'
      })
     }
     else if(view === 'wallet'){
       this.setState({
         currentView:'wallet'
       })
     }
  }
  handleToggle(e) {
    this.setState({
      [e.target.id] : e.target.checked
    })
  }

  componentWillReceiveProps(nextProps){
    console.log(nextProps);
    if(nextProps.updateSuccess){
      if(nextProps.updateSuccess.success){
        console.log('toast block')
        toast.success(nextProps.updateSuccess.message);
        nextProps.resetSuccess();
      }
    }
    if(nextProps.ImageRet){
      console.log(" success");
      this.setState({
        profilePicUrl:nextProps.ImageRet.imageUrl
      })
      nextProps.resetSuccess();
    }
    if(nextProps.updateUserInfo){
      console.log(" isnide update profile info")
       this.setState({
         profilePicUrl:nextProps.updateUserInfo.imageProfile
       })
       nextProps.getProfileRemove();
    }
  }
  uploadProfileImage=()=>{
    document.getElementById('profileImage').click()
  }
  toggleLoginAlert = () => {
     this.setState({
         ...this.state,
         loginAlert: !this.state.loginAlert
       })
   }
   toggleLatestNewsAlert = () => {
      this.setState({
          ...this.state,
          notifyMe: !this.state.notifyMe
        })
    }
  handleBackImg=(e)=> {
    e.preventDefault();
    var reader = new FileReader();
    var file = e.target.files[0];
    if(file.size > 2*1024*1024){
      toast.error('File size should be less than 2MB');
    }else{
        this.setState({
          profilePicUrl : '/assets/img/uploading.svg',
        })
      this.props.uploadProfileImage({ imageProfile :file})
    }
  }

  render() {
    console.log(this.props," props in  profile");
    console.log(this.state," state in  profile");
  const { loading } = this.props
  const   { profilePicUrl } = this.state
  console.log(profilePicUrl," iiiiiiiiiiiiiiiiiiiiiiiiiiiiii");
    const { phone } = this.state;

    // let stylePersonal, styleNotification, styleWallet;



    return(
      <div id="content" className="ui-content ui-content-aside-overlay">
      <div className="ui-content-body">
        <div className="ui-container container-fluid">
        <div className="panel panel-default">
              <div className="panel-heading">Manage Profile</div>
                <div className="panel-body" style={{fontSize:'16px'}}>
          <div className=" contribution row">
          {loading?<LoadingSpinner />:
            <div className="col-sm-12">
              <div className="row text-center">
                {/* <h2>UPDATE PROFILE</h2> */}
                {/*
                <div className="fillDetail">
                  <h5 style={{color:'#888'}}>Please fill the details down below.<hr/></h5>
                </div>
                */}
              </div>
              <form onSubmit={this.updateDetails}>


              <div className="row">
              <div className="col-md-12">
                <div style={{display:'flex',flexDirection:'row'}}>
                  { this.state.currentView === 'personal' ? (
                    <div onClick={ ()=>this.changeView("personal")} style={{margin:10,cursor:'pointer', backgroundColor: '#101922', color: 'white', borderRadius: '5px'}}><h2  style={{margin:10, fontSize: '16px'}}>PERSONAL</h2></div>
                  ) : (
                    <div onClick={ ()=>this.changeView("personal")} style={{margin:10,cursor:'pointer'}}><h2  style={{margin:10, fontSize: '16px'}}>PERSONAL</h2></div>
                  )}
                  { this.state.currentView === 'notifications' ? (
                    <div  onClick={()=>this.changeView("notifications")} style={{margin:10,cursor:'pointer', backgroundColor: '#101922', color: 'white', borderRadius: '5px'}}><h2  style={{margin:10, fontSize: '16px'}}>NOTIFICATIONS</h2></div>
                  ) : (
                    <div  onClick={()=>this.changeView("notifications")} style={{margin:10,cursor:'pointer'}}><h2  style={{margin:10, fontSize: '16px'}}>NOTIFICATIONS</h2></div>
                  )}
                  { this.state.currentView === 'wallet' ? (
                    <div  onClick={()=>this.changeView("wallet")} style={{margin:10,cursor:'pointer', backgroundColor: '#101922', color: 'white', borderRadius: '5px'}}><h2  style={{margin:10, fontSize: '16px'}}>WALLET</h2></div>
                  ) : (
                    <div  onClick={()=>this.changeView("wallet")} style={{margin:10,cursor:'pointer'}}><h2  style={{margin:10, fontSize: '16px'}}>WALLET</h2></div>
                  )}
                  {/* <div onClick={ ()=>this.changeView("personal")} style={{margin:10,cursor:'pointer'}}><h2  style={{margin:10}}>PERSONAL</h2></div> */}
                  {/* <div  onClick={()=>this.changeView("notifications")} style={{margin:10,cursor:'pointer'}}><h2  style={{margin:10}}>NOTIFICATION</h2></div> */}
                  {/* <div  onClick={()=>this.changeView("wallet")} style={{margin:10,cursor:'pointer'}}><h2  style={{margin:10}}>WALLET</h2></div> */}
                </div>
                <hr style={{height:"1px",border:"none",color:"#000",backgroundColor:"#000"}}/>

              </div>
              </div>

        {this.state.currentView==='personal' &&
        <div>
        <div className="row form-group">
        <div className="col-sm-3">
            <img className="img-responsive profile-Image"  src={profilePicUrl?profilePicUrl:'https://s3.amazonaws.com/websiteimagesrama/dummyProfile.png' } alt="back id" id="back_img_src"  />
        </div>
        <div className="col-sm-9">
        <button onClick={this.uploadProfileImage} className='changeImage' >Change Image</button>
        <input type="file" accept="image/png, image/jpeg" id="profileImage" name="back_id" style={{margin:'10px 0px 0px 30px'}} style={{display: "none"}} onChange={this.handleBackImg} required/>
        </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="email"><span style={{fontWeight:'500'}}>Email</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" value={this.state.email} type="text" name="email" id="email" disabled/>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="fullName"><span style={{fontWeight:'500'}}>FULL NAME</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="fullName" id="fullName"  value={this.state.fullName} onChange={this.handleInput}/>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="dob"><span style={{fontWeight:'500'}}>Date Of Birth</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="date" name="dob" id="dob" onChange={this.handleInput} value={this.state.dob} onFocus={() => {this.type='date'}}/>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-3">
              <label htmlFor="gender"><span style={{fontWeight:'500'}}>GENDER</span></label>
          </div>
          <div className="col-sm-9">
              <select id="gender" name="gender" className="form-control" onChange={this.handleInput} value={this.state.gender}>
                <option value="" hidden>Choose One</option>
                <option value="MALE">MALE</option>
                <option value="FEMALE">FEMALE</option>
                <option value="DECLINE TO STATE">DECLINE TO STATE</option>
              </select>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="phone"><span style={{fontWeight:'500'}}>Phone Number </span></label>
          </div>
          <div className="col-sm-9">
            {/* <input className="form-control" type="text" name="phone" id="phone" onChange={this.handleInput} value={this.state.phone}/> */}
            <PhoneInput id="phone"
                placeholder="Enter phone number"
                name="phone"
                value={ phone }
                onChange={ phone => this.setState({ phone }) }
                error={ phone ? (isValidNumber(phone) ? undefined : 'Invalid phone number') : '' }/>
          </div>
        </div>

        {/* creative link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="creative"><span style={{fontWeight:'500'}}>Creative Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="creative" id="creative" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid Creative link" placeholder="Creative link" onChange={this.handleInput} value={this.state.creative}/>
          </div>
        </div>
        {/* youtube link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="youtube"><span style={{fontWeight:'500'}}>Youtube Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="youtube" id="youtube" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid Youtube link" placeholder="Youtube link" onChange={this.handleInput} value={this.state.youtube}/>
          </div>
        </div>
        {/* Telegram link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="telegram"><span style={{fontWeight:'500'}}>Telegram Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="telegram" id="telegram" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid Telegram Profile link" placeholder="Telegram link" onChange={this.handleInput} value={this.state.telegram}/>
          </div>
        </div>
        {/* Twitter link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="twitter"><span style={{fontWeight:'500'}}>Twitter Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="twitter" id="twitter" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid Twitter Profile link" placeholder="Twitter link" onChange={this.handleInput} value={this.state.twitter}/>
          </div>
        </div>
        {/* Facebook link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="facebook"><span style={{fontWeight:'500'}}>Facebook Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="facebook" id="facebook" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid Facebook link" placeholder="Facebook link" onChange={this.handleInput} value={this.state.facebook}/>
          </div>
        </div>
        {/* Translation link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="translation"><span style={{fontWeight:'500'}}>Translation Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="translation" id="translation" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid Translation link" placeholder="Translation link" onChange={this.handleInput} value={this.state.translation}/>
          </div>
        </div>
        {/* Reddit link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="reddit"><span style={{fontWeight:'500'}}>Reddit Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="reddit" id="reddit" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid Reddit Profile link" placeholder="Reddit link" onChange={this.handleInput} value={this.state.reddit}/>
          </div>
        </div>
        {/* Linkedin link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="linkedIn"><span style={{fontWeight:'500'}}>LinkedIn Link</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="linkedIn" id="linkedIn" pattern="^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$" title="Enter Valid LinkedIn Profile link" placeholder="LinkedIn link" onChange={this.handleInput} value={this.state.linkedIn}/>
          </div>
        </div>
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="referalUrl"><span style={{fontWeight:'500'}}>Referal URL</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="referalUrl" id="referalUrl" title="Your referal url" placeholder="Referal Url" onChange={this.handleInput} value={this.state.referalUrl} disabled/>
          </div>
        </div>
        {/* Signature link */}
        <div className="row form-group">
          <div className="col-sm-3">
            <label htmlFor="signature"><span style={{fontWeight:'500', fontSize:'16px'}}>Signature Username</span></label>
          </div>
          <div className="col-sm-9">
            <input className="form-control" type="text" name="signature" id="signature" placeholder="Signature Username" onChange={this.handleInput} value={this.state.signature}/>
          </div>
        </div>


        </div>
      }

        {this.state.currentView==='notifications' &&
        <div>
        <div className="form-group">
          <label htmlFor="sendMail" className="control-label col-sm-8 col-xs-8" >I would like to receive email after every login</label>
          <div className="col-sm-2 col-xs-2">
          <Switch onClick={this.toggleLoginAlert} on={this.state.loginAlert}/>
        </div>
        </div>
      <div className="form-group">
      <label htmlFor="deleteTransaction" className="control-label col-sm-8 col-xs-8" >Notify me for latest News and alerts</label>
      <div className="col-sm-2 col-xs-2">
      <Switch onClick={this.toggleLatestNewsAlert} on={this.state.notifyMe}/>
      </div>
      </div>

        </div>
      }

      {this.state.currentView==='wallet' &&
      <div>

      <div className="row form-group">
        <div className="col-sm-3">
          <label htmlFor="ethAddress"><span style={{fontWeight:'500'}}>ETH Wallet Address</span></label>
        </div>
        <div className="col-sm-9">
          <input className="form-control" type="text" name="ethAddress" id="ethAddress" placeholder="Valid ETH wallet address" title="Please enter Valid eth address" value={this.state.ethAddress} onChange={this.handleInput} disabled ={this.props.userInfo.userInfo.kycStatus==="ACCEPTED"}/>
          { !this.state.valid ? <p style={{color: '#f00'}}>Please enter Valid ETH address.</p> : '' }
        </div>
      </div>
      </div>

    }
              {
                // <div className="row">
                //   <div className="col-sm-12 text-center checkbox">
                //     <label>
                //       <input type="checkbox" name="loginAlert" id="loginAlert" onChange={this.handleInput} checked={this.state.loginAlert}/>I would like to receive email after every login.
                //     </label>
                //     <div className="col-sm-12 text-center checkbox">
                //     <label>
                //       <input type="checkbox" name="latestNewsAlert" id="latestNewsAlert" onChange={this.handleInput} checked={this.state.latestNewsAlert}/>Notify me for latest News and alerts.
                //     </label>
                //     </div>
                //   </div>
                // </div>
              }
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <button type="submit" className="form-button updateSubmit">Update </button>
                  </div>
                </div>
              </form>
            </div>
           }
          </div>
          </div>
          </div>
        </div>
      </div>
      </div>
    )
  }
}

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilepage: makeSelectProfilePage(),
  userInfo: makeSelectDashBoardWelcomePage(),
  updateSuccess: makeSelectUpdateSuccess(),
  ImageRet:makeSelectImageReturn(),
  updateUserInfo:makeSelectUserInfo(),
  loading:makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateDetail : (data) => dispatch(updateDetails(data)),
    resetSuccess : (data) => dispatch(resetSuccess(data)),
    uploadProfileImage : (data) => dispatch(uploadProfileImage(data)),
    getProfileData: (data) => dispatch(getProfileData(data)),
    getProfileRemove: (data) => dispatch(getProfileRemove(data)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
