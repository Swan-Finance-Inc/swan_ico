/**
 *
 * NavBarContainer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Navbar, Nav, MenuItem, NavDropdown, Modal ,Badge } from 'react-bootstrap';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectNavBarContainer from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { signOut }  from './actions';
import { userLoggedOut } from '../App/actions';
import { push } from 'react-router-redux';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import BellIcon from 'react-bell-icon';
export class NavBarContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.resetPassword = this.resetPassword.bind(this);
    this.showSignOut = this.showSignOut.bind(this);
    this.closeSignOut = this.closeSignOut.bind(this);
    this.profile = this.profile.bind(this);
    this.state = {
      name: 'Username',
      showSignOut: false,
      deleteProfile:false,
    };
  }

  // componentDidMount() {
  //   const script = document.createElement('script');

  //   script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';


  //   document.body.appendChild(script);
  // }

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
  selectChinese=()=>{
    console.log("select Chinese clicked");
  }

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

  render() {
    return (
      <header>
        <Navbar fluid fixedTop style={{borderWidth: '0'}} className="navbar-back">
          <div className="header-left">
            <div className="logo"><Link to="/"><img src="/assets/img/logo.png" alt="RUC" /></Link></div>
          </div>
          <div className="header-right hidden-xs">
          <span className="NotificationBell"> <BellIcon width='30' color={'#D3A94A'} active={false} animate={false} /></span>
          <span className='badgeClass' style={{color:"#fff"}}><Badge>{2}</Badge></span>

            <Nav pullRight >
            <NavDropdown style={{ display: 'flex' }} className="dropdown-usermenu zineum-username" title='Language' id="basic-nav-dropdown">
            <MenuItem style={{ cursor: 'pointer' }} onClick={this.selectEnglish}><i ></i>English</MenuItem>
            <MenuItem style={{ cursor: 'pointer' }} onClick={this.selectChinese}><i ></i>Chinese</MenuItem>
            </NavDropdown>
                <NavDropdown style={{ display: 'flex' }} className="dropdown-usermenu zineum-username" title={this.props.username ? this.props.username : this.state.name} id="basic-nav-dropdown">
                <MenuItem style={{ cursor: 'pointer' }} onClick={this.profile}><i className="fa fa-user"></i>Update Profile</MenuItem>
                <MenuItem style={{ cursor: 'pointer' }} onClick={this.resetPassword}><i className="fa fa-lock"></i>Reset password</MenuItem>
                <MenuItem style={{ cursor: 'pointer' }} onClick={this.showDeleteProfile}><i className="fa fa-user-times"></i>Delete Profile</MenuItem>
                <MenuItem style={{ cursor: 'pointer' }} onClick={this.showSignOut}><i className="fa fa-power-off"></i>Sign Out</MenuItem>
              </NavDropdown>
            </Nav>
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
      </header>
    );
  }
}

NavBarContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  navbarcontainer: makeSelectNavBarContainer(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
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
