/**
 *
 * NavBarContainer
 *
 */

import React  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Navbar, Nav, MenuItem, NavDropdown, Modal ,Badge } from 'react-bootstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNavBarContainer, { makeSelectDetails, makeSelectUpdateSuccess ,makeSelectImageReturn, makeSelectUserInfo, makeSelectLoading } from './selectors';
import makeSelectDashBoardWelcomePage from 'containers/DashBoardWelcomePage/selectors';
import reducer from './reducer';
import saga from './saga';
import logo from '../../images/swan-logo.png';
import notifications from '../../images/notification-icon.png'
import { updateDetails, resetSuccess ,uploadProfileImage, getProfileData, getProfileRemove } from './actions';
import { userLoggedOut } from '../App/actions';
import { push } from 'react-router-redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import BellIcon from 'react-bell-icon';
import { notification } from 'antd';
import TextFieldInput from "../../components/TextFieldInput";
import PhoneInput from 'react-phone-number-input';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import profileDummy from '../../images/Profile.png'
import editIcon from '../../images/edit-icon.png'
import { ToastContainer, toast } from 'react-toastify';

export class NavBarContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.showSignOut = this.showSignOut.bind(this);
    this.closeSignOut = this.closeSignOut.bind(this);
    this.updateProfile = this.updateProfile.bind(this);
    this.profile = this.profile.bind(this);
    this.state = {
      name: 'Username',
      showSignOut: false,
      deleteProfile:false,
      showProfile: false,
      firstName:'',
      lastName:'',
      email:'',
      userAddress:'',
      address:'',
      town:'',
      state:'',
      pinCode:'',
      country:'',
      edit:true
    };
  }

  componentWillMount(){
    const { email, fullName , secondName } = this.props.userInfo.userInfo;
    this.setState({
      email,
      firstName : fullName,
      lastName : secondName,
     profilePicUrl:this.props.userInfo.userInfo.imageProfile

    })
    this.props.getProfileData();
  }

  componentDidMount() {
    
    this.setState({
     profilePicUrl:this.props.userInfo.userInfo.imageProfile

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

  signOut() {
  // //console.log("sign out")

    this.props.signout();
    this.props.push('/signin');
  }
  showSignOut() {
    this.setState({
      showSignOut: true
    })
  }
  showDeleteProfile=()=> {
    this.setState({
      deleteProfile: true
    })
  }
  selectEnglish=()=>{
    console.log("select english clicked");
  }
  // selectChinese=()=>{
  //   console.log("select Chinese clicked");
  // }

  closeSignOut() {
    this.setState({
      showSignOut: false
    })
  }
  closeDeleteProfile=()=> {
    this.setState({
      deleteProfile: false
    })
  }

  userProfile=()=>{
    this.setState({
      showProfile : true
    })
  }

  closeProfile=()=>{
    this.setState({
      showProfile: false
    })
  }

  deleteProfileYes =()=>{
    console.log(" Yes On Delete Profile in nav container");
    this.props.handleDeleteUser();
  }
  resetPassword() {
    this.props.push('/dashboard/resetpassword');
  }

  profile() {
    this.props.push('/dashboard/profile');
  }
  routeToNotifications=()=>{
    console.log(" ffffjfjfjfjfj");
   this.props.routeToNotifications()
  }

  resetInfo=()=>{
    this.props.toggleInfo()
  }

  uploadProfileImage=()=>{
    console.log("in handleback")

    document.getElementById('profileImage').click()
  }

  handleBackImg=(e)=> {
    e.preventDefault();
    console.log("in handleback");

    var reader = new FileReader();
    var file = e.target.files[0];
    if(file.size > 5*1024*1024){
      toast.error('File size should be less than 5MB');
    }else{
        this.setState({
          profilePicUrl : '/assets/img/uploading.svg',
        })
      this.props.uploadProfileImage({ imageProfile :file})
    }
  }

   updateProfile(){
    var regex = /^(?!\s+$)[A-Za-z\s-]+$/ ;
    var pinregex = /^[0-9]*$/;
    console.log(this.state,"dlvjnaudvgfdyv");
    if(!regex.test(this.state.firstName)){
      toast.error("Invalid Firstname Name")
    }
    else
    if(this.state.firstName.length < 4 || this.state.firstName.length > 20){
      toast.error("First name should be between 4 to 20 characters")
    }
    else
    if(!regex.test(this.state.lastName)){
      toast.error("Invalid Lastname Name")
    }
    else
    if(this.state.lastName.length < 4 || this.state.lastName.length > 20){
      toast.error("Last name should be between 4 to 20 characters")
    
    }
    else if(!pinregex.test(this.state.pinCode)){
      toast.error('Pincode is should be a number')
    }
    else{

      const {firstName , lastName } = this.state;
      this.props.updateDetail({fullName:firstName,secondName:lastName});
    }
    // else{
    //   toast.error('Please enter valid ETH Wallet address');
    // }
  }

  walletLink = () =>{
    this.props.push('/dashboard/wallet')
  }


  render() {
    console.log(this.props,"krjdbghkdhbdbbskf");
    const {userInfo} = this.props.userInfo
    const {profilePicUrl} = this.state
    return (
      <header style = {{height : "60px"}} >
        <Navbar fluid fixedTop style={{borderWidth: '0' , border : '1px solid #465490'}} className="navbar-back">
          <div  className={this.props.animationFlag?"header-left animate-logo":"header-left"} style={{cursor:'pointer'}} onClick ={()=> window.location.reload() } >
            <div className="logo" style = {{marginRight : '9px' , marginLeft : '6px'}} ><Link to="/"><img style = {{width : "77%", height : '31px', marginLeft : 6 }} src={ logo } alt="centralex" /></Link></div>
            <div style = {{color : '#2498D5',position : 'relative' , bottom:'53px',left:'48px',fontSize:'28px' , fontWeight :'bold' }} >SwanFinance</div>
          </div>
          <div className="header-right hidden-xs">
             <div style={{position:'relative', top:'6px'}}>
             <img className="img-responsive nav-userimage"  src={this.state.profilePicUrl?this.state.profilePicUrl:profileDummy } alt="back id" id="back_img_src"  />

             </div>
             

            <Nav pullRight  className="profile-nav-bar">
            
                <NavDropdown style={{ display: 'flex' }} className="dropdown-usermenu zineum-username" title={this.props.username ? this.props.username : this.state.name} id="basic-nav-dropdown">
                <MenuItem className="nav-dropdown" style={{ cursor: 'pointer', borderBottom:'1px solid #A2A9C7' }} onClick={this.userProfile}>{this.props.username ? this.props.username : this.state.name} <br/> <span style={{color:'#7C7C7C'}} >{this.props.email} </span> </MenuItem>
                <MenuItem className="nav-dropdown" style={{ cursor: 'pointer' }} onClick={this.walletLink} >Wallet</MenuItem>
                <MenuItem className="nav-dropdown" style={{ cursor: 'pointer' }} onClick={this.profile}>Setting</MenuItem>
                <MenuItem className="nav-dropdown" style={{ cursor: 'pointer' }} >Reports</MenuItem>
                <MenuItem className="nav-dropdown" style={{ cursor: 'pointer', borderBottom:'1px solid #A2A9C7' }} >Help</MenuItem>
                {/* <MenuItem style={{ cursor: 'pointer' }} onClick={this.resetPassword}><i className="fa fa-lock"></i>Reset password</MenuItem> */}
                {/* <MenuItem style={{ cursor: 'pointer' }} onClick={this.resetInfo}><i className={this.props.flag===false?"fa fa-toggle-off":"fa fa-toggle-on"}></i>Reset Info flag</MenuItem> */}
                {/* <MenuItem style={{ cursor: 'pointer' }} onClick={this.showDeleteProfile}><i className="fa fa-user-times"></i>Delete Profile</MenuItem> */}
                <MenuItem className="nav-dropdown-signout" style={{ cursor: 'pointer' }} onClick={this.showSignOut}><i className="fa fa-power-off"></i>Sign Out</MenuItem>
              </NavDropdown>
            </Nav>

            <div style = {{padding : "15px 15px" , marginTop : '5px', cursor : 'pointer'}}>
              <img src = {notifications} style = {{width : "70%"}} />
            </div>
          </div>
        </Navbar>
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
                    <button className="btn btn-outline" onClick={this.signOut}>YES</button>
                    <button className="btn btn-outline" style={{marginLeft:'20px'}} onClick={this.closeSignOut}>GO Back</button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </div>
          <div className="static-modal">
              <Modal show={this.state.deleteProfile} onHide={this.closeDeleteProfile} bsSize="large" dialogClassName="modal-signout">
                <Modal.Body>
                  <div className="row">
                    <div className="col-sm-12 text-right" style={{'cursor': 'pointer'}}>
                        <i className="fa fa-close" onClick={this.closeDeleteProfile}></i>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 text-center">
                      <h3 className="signOut-head">Do you want to <text style={{color:"red"}}>DELETE</text> your Profile ?</h3><hr/>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12 text-center">
                      <button className=" col-sm-3  btn btn-outline-red" style={{marginLeft:'15%'}} onClick={this.deleteProfileYes}>YES</button>
                      <button className="col-sm-3  btn  btn-outline" style={{marginLeft:'15%'}} onClick={this.closeDeleteProfile}>GO Back</button>
                    </div>
                  </div>
                </Modal.Body>
              </Modal>
            </div>
            <div >
              <Modal  show={this.state.showProfile} onHide={this.closeProfile} bsSize="large" dialogClassName="modal-profile">
              <Modal.Header>
              <div className="col-sm-12 text-right" style={{'cursor': 'pointer'}}>
                        <i className="fa fa-close" onClick={this.closeProfile}></i>
                    </div>
                <Modal.Title><div className='' style ={{color : "#2D6DCD"}} >Profile</div></Modal.Title>
              </Modal.Header>
                <Modal.Body dialogClassName="profile-modal-body" className="profile-modal-body" >
                  <div className="row">
                    <div className="col-md-5" style={{textAlign:'center', right:'42px',height : "137px"}}>
                    <img className="img-responsive profile-Image"  src={profilePicUrl?profilePicUrl:profileDummy } alt="back id" id="back_img_src"  />
                    <img className="img-responsive profile-Image" style={{width:'25px',height:'25px',left:'197px',bottom:'46px',cursor:'pointer'}} src={editIcon } alt="back id" id="back_img_src"  onClick={this.uploadProfileImage}/>
                    {/* <br /> */}
                    {/* <button className="changeImage" type = "button"  >Change Image</button> */}
                    <input type="file" accept="image/png, image/jpeg" id="profileImage" name="back_id" style={{margin:'10px 0px 0px 30px',display:'none'}}  onChange={this.handleBackImg}/>
                    <div className="col-md-12" style={{position:'relative',bottom:'20px'}}>
                    <button className="removeImage" type = "button"  >Remove Image</button>
                    <div>Max file size is 5Mb</div>
                    </div>
                   
                    </div>
                    
                  <div className="col-md-7" style={{marginLeft:"-14px", height : "270px"}}>
                    <div className="row">
                    <TextFieldInput
                        type="text"
                        name="firstName"
                        label="First Name"
                        value={this.state.firstName}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })
                        
                        }}
                        disabled = {this.state.edit}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd',
                          marginBottom : 15

                        }}
                      />
                      <TextFieldInput
                        type="text"
                        name="lastName"
                        label="Last Name"
                        value={this.state.lastName}
                        disabled={this.state.edit}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })
                        
                        }}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd',
                          marginBottom : 15

                        }}
                      />
                      <TextFieldInput
                        type="text"
                        name="email"
                        label="Email"
                        // placeholder="thats and email"
                        value={this.state.email}
                        //variant="outlined"
                        //required={true}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        disabled={true}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd',
                          marginBottom : 15
                        }}
                      />
                      
                      {/* <TextFieldInput
                        type="date"
                        name="dob"
                        label="Date Of Birth"
                        value={this.state.dob}
                        shrink = {false}
                        //variant="outlined"
                        //required={true}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          marginBottom : 15,
                          color: '#2d6dcd',
                        }}
                      /> */}
                      
                      </div>
                      </div>

                     <div className="col-md-12">
                    <TextFieldInput
                        type="text"
                        name="address"
                        label="Address"
                        value={this.state.address}
                        //variant="outlined"
                        //required={true}
                        disabled={this.state.edit}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd'
                        }}
                      />
                    </div> 
                    <div className="col-md-6">
                    {/* <select id="gender" name="gender" className="form-control textFieldInput" onChange={this.handleInput} 
                    value={this.state.gender}>
                      <option value="" hidden>Select your gender</option>
                      <option value="MALE">MALE</option>
                      <option value="FEMALE">FEMALE</option>
                      <option value="DECLINE TO STATE">DECLINE TO STATE</option>
                    </select> */}
                    <TextFieldInput
                        type="text"
                        name="town"
                        label="City/Town"
                        value={this.state.town}
                        //variant="outlined"
                        //required={true}
                        disabled={this.state.edit}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd'
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                    {/* <PhoneInput id="phone"
                        placeholder="Enter phone number"
                        name="phone"
                        value= "7082082819"
                        // disabled={this.props.profile.phone_number?true:''}
                        className="form-control textFieldInput"
                        onChange={ phone => this.setState({ phone }) }
                        // error={ phone ? (isValidNumber(phone) ? undefined : <span style={{position : "relative" , top : "12px"}} >Invalid phone number</span>) : '' }
                        /> */}
                        <TextFieldInput
                        type="text"
                        name="state"
                        label="State"
                        value={this.state.state}
                        //variant="outlined"
                        //required={true}
                        disabled={this.state.edit}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd'
                        }}
                      />
                    </div>
                    <div className="col-md-6" >
                  {/* <TextFieldInput
                        type="text"
                        name='referal Url'
                        label="Your Referal URL"
                        value={`https://centralex.com/launchpad/signup/refer/${this.state.referalUrl}`}
                        //variant="outlined"
                        //required={true}
                        disabled={true}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd'
                        }}
                      />
                      <div style = {{position : "absolute" , bottom : '13px' , right : '31px'}}>
                            <CopyToClipboard text={this.state.referalUrl}
                              onCopy={() => {this.setState({copied: true});
                               toast.success("Copied");
                              }}> 
                              <span >
                              <FileCopyOutlinedIcon
                                className="file-copy-conatiner-press"
                                style={{ outline : 'none' ,fontSize : '20px' , cursor : "pointer"  }}
                                />
                              </span>
                            </CopyToClipboard>
                            </div> */}
                            <TextFieldInput
                        type="text"
                        name="pinCode"
                        label="Pin/Zip code"
                        value={this.state.pinCode}
                        //variant="outlined"
                        //required={true}
                        disabled={this.state.edit}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd'
                        }}
                      />
                  </div>
                  <div className="col-md-6" >
                  <TextFieldInput
                        type="text"
                        name="country"
                        label="Country"
                        value={this.state.country}
                        //variant="outlined"
                        //required={true}
                        disabled={this.state.edit}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        //auth={false}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#2d6dcd'
                        }}
                      />
                  </div>
                  </div>
                  
                  <div className="row" style ={{marginTop : 40}} >
                   <div className="col-sm-6 text-center" style={{display : "flex" , justifyContent : "flex-end"}}>
                    <button  className="profile-button" onClick = {()=> this.setState({edit : false})} >Edit</button>
                  </div> 
                  <div className="col-sm-6 text-center" style={{display : "flex" , justifyContent : "start"}}>
                    <button type="submit" id = "personal" className="profile-button" onClick={this.updateProfile}>Save</button>
                  </div>
                </div>
                  {/* <div className="row">
                     <div className="col-sm-12 text-center">
                      <button className=" col-sm-3  btn btn-outline-red" style={{marginLeft:'15%'}} onClick={this.deleteProfileYes}>YES</button>
                      <button className="col-sm-3  btn  btn-outline" style={{marginLeft:'15%'}} onClick={this.closeDeleteProfile}>GO Back</button>
                    </div> 
                  </div> */}
                </Modal.Body>
              </Modal>
            </div>
      </header>
    );
  }
}

NavBarContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  navbarcontainer: makeSelectNavBarContainer(),
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
    signout: () => dispatch(userLoggedOut()),
    push: (route) => dispatch(push(route)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'navBarContainer', reducer });
const withSaga = injectSaga({ key: 'navBarContainer', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NavBarContainer);
