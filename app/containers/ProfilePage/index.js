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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectProfilePage, { makeSelectDetails, makeSelectUpdateSuccess } from './selectors';
import makeSelectDashBoardWelcomePage from 'containers/DashBoardWelcomePage/selectors';
import reducer from './reducer';
import saga from './saga';
import { updateDetails, resetSuccess } from './actions';
import { ToastContainer, toast } from 'react-toastify';

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
        loginAlert : '',
        ethAddress: '',
        valid : true
    }

    this.handleInput = this.handleInput.bind(this);
    this.updateDetails = this.updateDetails.bind(this);
  };

  handleInput(e){
    if(e.target.name == 'loginAlert'){
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
    const { email, fullName, dob, gender, phone, telegram, twitter, loginAlert, ethAddress } = this.props.userInfo.userInfo;
    this.state = {
      email,
      fullName,
      dob,
      gender,
      phone,
      telegram,
      twitter,
      loginAlert,
      ethAddress,
      valid: true
    }
  }

  updateDetails(e){
    e.preventDefault()
    if(this.state.valid){
      const { fullName, dob, gender, phone, telegram, twitter, loginAlert, ethAddress } = this.state;
      this.props.updateDetail({fullName,dob,gender,phone,telegram,twitter,loginAlert,ethAddress});
    }else{
      toast.error('Please enter valid ETH Wallet address');
    }
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
  }

  render() {
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <div className="ui-content-body">
        <div className="ui-container container-fluid">
        <div className="panel panel-default">
              <div className="panel-heading">Update Profile</div>
                <div className="panel-body" style={{fontSize:'16px'}}>
          <div className=" contribution row">
            <div className="col-sm-12">
              <div className="row text-center">
                {/* <h2>UPDATE PROFILE</h2> */}
                <h5 style={{color:'#888'}}>Please fill the details down below.<hr/></h5>
              </div>
              <form onSubmit={this.updateDetails}>
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
                    <input className="form-control" type="text" name="phone" id="phone" onChange={this.handleInput} value={this.state.phone}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label htmlFor="telegram"><span style={{fontWeight:'500'}}>Telegram </span></label>
                  </div>
                  <div className="col-sm-9">
                    <input className="form-control" type="text" name="telegram" id="telegram"  placeholder="Telegram Username" onChange={this.handleInput} value={this.state.telegram}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label htmlFor="twitter"><span style={{fontWeight:'500'}}>Twitter </span></label>
                  </div>
                  <div className="col-sm-9">
                    <input className="form-control" type="text" name="twitter" id="twitter" placeholder="Twitter handle" onChange={this.handleInput} value={this.state.twitter}/>
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-sm-3">
                    <label htmlFor="ethAddress"><span style={{fontWeight:'500'}}>ETH Wallet Address</span></label>
                  </div>
                  <div className="col-sm-9">
                    <input className="form-control" type="text" name="ethAddress" id="ethAddress" placeholder="Valid ETH wallet address" title="Please enter Valid eth address" value={this.state.ethAddress} onChange={this.handleInput}/>
                    { !this.state.valid ? <p style={{color: '#f00'}}>Please enter Valid ETH address.</p> : '' }
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center checkbox">
                    <label>
                      <input type="checkbox" name="loginAlert" id="loginAlert" onChange={this.handleInput} checked={this.state.loginAlert}/>I would like to receive email after every login.
                    </label>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12 text-center">
                    <button type="submit" className="btn btn-primary form-control">Update Profile</button>
                  </div>
                </div>
              </form>
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

ProfilePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilepage: makeSelectProfilePage(),
  userInfo: makeSelectDashBoardWelcomePage(),
  updateSuccess: makeSelectUpdateSuccess()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    updateDetail : (data) => dispatch(updateDetails(data)),
    resetSuccess : (data) => dispatch(resetSuccess(data))
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
