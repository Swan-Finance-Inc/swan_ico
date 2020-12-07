/**
 *
 * LoginPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect } from 'react-router'
// import { Redirect, Link } from 'react-router-dom';
import { Link } from 'react-router-dom'
import injectSaga from 'utils/injectSaga';
import { push } from 'react-router-redux';
import { css } from 'glamor';
import injectReducer from 'utils/injectReducer';
import { makeSelectUser, makeDetectErrorMessage, makeDetectError } from './selectors';
import { makeGlobalParent } from '../App/selectors';
import reducer from './reducer';
import saga from './saga';
import ReCAPTCHA from 'react-google-recaptcha';
import logo from '../../images/swan-logo.png';
import TextFieldInput from "../../components/TextFieldInput";
import { userLoggedIn, removeErrorGlobal, twoFactorDisabled, removeOuterError, passwordResetInnerRemove } from '../App/actions';
import { loginUser, removeErrorMessage, emailStateClear } from './actions';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      'g-recaptcha-response': '',
      captcha : false,
      password_class:'fa fa-fw fa-eye-slash',
      email : '',
      password : '',
      otpToken : ''
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.notify = this.notify.bind(this);
    this.formValidation = this.formValidation.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // console.log("inside component login")
    // console.log(this.props.global);
    console.log(this.props.global, 'hi global');
    this.props.removeInnerReset();

    if (this.props.global.passwordReset) {
      this.notifySuccess('Your password has been changed successfully');
    }
    // console.log(this.props.global.passwordResetSuccess)


    if (this.props.error) {
      this.notify(this.props.errorMessage);
    }

    if (this.props.global.passwordResetSuccess) {
      this.notifySuccess('Your password has been changed successfully');
    }

    if (this.props.global.resetOuterError) {
      this.notify('Invalid URL ,Try again with valid url');
      this.props.removeOuterError();
    }

    if (this.props.global.initialEmail.length > 0) {
      this.notifySuccess('Your account has been verified.');
      // const email = document.getElementById('emailAddress');
      // email.value = this.props.global.initialEmail;
    }
  }
  componentWillReceiveProps(nextProps) {
    // console.log("inside component")
    console.log('im in will receive props', nextProps)
    if (nextProps.error) {
      this.notify(nextProps.errorMessage);
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   if (nextProps) {
  //     return true;
  //   } false;
  // }

  onChange(e) {
    console.log(e , "vdslavruvbibg");
    this.setState({
      'g-recaptcha-response': e,
    });
    if (e.length > 0) {
      this.setState({
        captcha: true,
      });
    }
  }

  notify(error) {
    toast.error(<h5>{error}</h5>);
  }
  notifySuccess(message) {
    toast.success(message);
  }
  formValidation(user) {
    const { email, password ,rememberMe} = user;
    if (email.length <= 0) {
      this.notify('Enter your Email');
      return false;
    } else if (password.length === 0) {
      this.notify('Enter your password');
      return false;
    } 
    else if(!this.state.captcha){
      this.notify('Please verify you are not a robot');
      return false;
    }
    else if(!rememberMe){
      this.notify('Please accept the terms and conditions');
      return false;
    }
    else if (password.length) {
      if (password.length > 0 && email.length > 0) {
        this.setState({
          captcha : false
        })
        window.grecaptcha.reset();
        return true;
      }
    } else {
      return false;
    }
    return false;
  }


  formSubmit(event) {
    event.preventDefault();
    // console.log(event.target[0].value);
    // console.log(event.target[1].value);
    const remember = document.getElementById('remember');
    let rememberMe;
    // console.log(remember.checked);
    if (remember.checked) {
      rememberMe = true;
    } else {
      rememberMe = false;
    }
    // const user = {
    //   email: event.target[0].value,
    //   password: event.target[1].value,
    //   otpToken: event.target[2].value,
    //   rememberMe,
    //   captcha: this.state['g-recaptcha-response'],
    // };

    const user = {
      email: this.state.email,
      password: this.state.password,
      otpToken: this.state.otpToken,
      rememberMe,
      captcha: this.state['g-recaptcha-response'],
    };

    if (this.formValidation(user)) {
        // console.log(user);

        this.props.loginUser(user);
        //this.props.login();
    } 
    // else {
    //   this.notify('Something went wrong');
    // }
    // console.log("data from the container ========", user)
    // console.log(this.props.error);
    // console.log(this.props.errorMessage);
  }
showPassWord= (e)=>{
  console.log(e," inside show password");
  var x = document.getElementById("password");
   if (x.type === "password") {
       x.type = "text";
   } else {
       x.type = "password";
   }
   if(this.state.password_class==='fa fa-fw fa-eye'){
     this.setState({
       password_class:'fa fa-fw fa-eye-slash'
     })
   }
   else if(this.state.password_class==='fa fa-fw fa-eye-slash'){
     this.setState({
       password_class:'fa fa-fw fa-eye'
     })
   }
}
  render() {
    if (localStorage.token) {
      return <Redirect to="/dashboard" />;
    }

    return (
      <div className="signin">
        <ToastContainer position="top-center" progressClassName={css({ height: '100px' })} type="error" autoClose={2800} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover={false} />
        <div className="wrapper">
          <header className="header" style = {{border : '1px solid #465490'}}>
            <div className="container" >
              <div className="row"  >
                <div className="col-xs-5 col-sm-6  col-md-2 clearfix">
                  {/* <div className="logo"><Link to="/"> <img
                    src={ logo } alt="centralex"
                  /></Link></div> */}
                  <div className="header-left">
                    <div className="logo" style = {{marginRight : '9px' , marginLeft : '6px'}} ><Link to="/"><img style = {{width : "77%", height : '31px', marginLeft : 6 }} src={ logo } alt="centralex" /></Link></div>
                    <div style = {{color : '#2498D5',position : 'relative' , top : '18px' , fontWeight :'900' }} >SwanFinance</div>
                    </div>
                </div>
                {/* <div className="col-xs-7 col-sm-6 col-md-10">
                  
                  <div className="header-right">
                    <div className="header-btn-group">
                      <div className="header-btn"><Link to="/signup">Sign Up</Link></div>
                    </div>
                  </div>
                </div> */}
              </div>
            </div>
          </header>
          <section className="signin-block login">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3 ">
                  <div className="card-header">
                    <h1>Welcome</h1>
                    <h3 style={{ color : '#fff', textAlign : 'center', marginTop : '0', fontWeight:'bold'
                   }}>Please Sign In</h3>
                  </div>
                  <div className="signin-card-body">
                    <form className onSubmit={this.formSubmit}>
                    <div>
                      <TextFieldInput
                        type="text"
                        name="email"
                        label="Email ID"
                        value={this.state.email}
                        variant="outlined"
                        required={true}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })

                        }}
                        auth={true}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#465390'
                        }}
                      />
                      </div>
                      <div style={{ marginTop : '30px' }}>
                      <TextFieldInput
                        type="password"
                        name="password"
                        label="password"
                        value={this.state.password}
                        variant="outlined"
                        required={true}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })
                        }}
                          auth={true}
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#465390'
                        }}
                      />
                      <div className="forgot" style={{ fontSize : '14px' }}><Link to="/forgotPassword">Forgot Password?</Link></div>
                      </div>
                      {/* <div>
                      <TextFieldInput
                        name="otpToken"
                        type="number"
                        label="Two Factor(If Enabled)"
                        value={this.state.otpToken}
                        handleChange={(e) => {
                          this.setState({
                            [e.target.name]: e.target.value
                          })
                        }
                        }
                        inputStyle={{
                          fontSize: '15px',
                          fontWeight: '900',
                          color: '#465390'
                        }}
                      />
                      </div> */}
                      <div 
                      className="signInCaptcha text-center mt-10" >
                         <ReCAPTCHA type="image" ref="recaptcha"
                          className="form-captcha"
                           required sitekey="6LdZP14UAAAAAB0O_-727DW-KoaFizUiwBhr4wmk" onChange={this.onChange} />
                       </div>
                         <div className="form-group text-center mt-15 ">
                       <label className="form-check-label" htmlFor="user_accepted_policies">
                        <input id="remember" className="boolean required form-check-input" label="false" data-title="Remember me!" data-placement="left" data-trigger="manual" data-offset="0, 55" aria-required="true" type="checkbox" name="remember" style={{ marginRight: '10px' }} />I agree with 
                       <Link to="https://centralex-website.s3-ap-southeast-1.amazonaws.com/User+agreement+V1.0.pdf"
                        target="_blank"
                       > <strong style={{color :'#465390' }} > User Agreement </strong> </Link>
                          and 
                        <Link to="https://centralex-website.s3-ap-southeast-1.amazonaws.com/Privacy+policy+V1.0.pdf"
                        target="_blank"
                        >
                           <strong style={{color :'#465390' }} > Privacy Policy.</strong>  </Link>
                          </label>
                     </div>

                       <div className="text-center">
                        <button type="submit" className="login-button">LOGIN</button>
                      </div>
                      
                      <div className="forgot" style={{ textAlign : 'center' }}><Link to="/resendConfirmation">Didn't receive confirmation instructions?</Link>
                      </div>
                    {  
                    // <div className="form-group newInput">
                    //     <label htmlFor="emailAddress" className="form-label">Email Address</label>
                    //     <input id="emailAddress" type="email" name="email" className="form-input form-control " placeholder="Your Email" required autoComplete="email" />
                    //   </div>
                    //   <div className="form-group">
                    //     <label htmlFor="password" className="form-label">Password</label>
                    //     <input id="password" type="password" className="form-input form-control" name="password" placeholder="Your Password" autoComplete="off" required />
                    //    <i onClick={this.showPassWord} className={`${this.state.password_class} field-icon`}></i>
                    //   </div>
                    //   <div className="form-group">
                    //     <label htmlFor="token" className="form-label">Two-Factor Code (if enabled)</label>
                    //     <input id="token" type="number" name="token" className="form-input form-control" placeholder="Google Authenticator" autoComplete="off" />
                    //   </div>
                    //   <div className="signInCaptcha form-group text-center">
                    //     <ReCAPTCHA type="image" ref="recaptcha" className="form-captcha" required sitekey="6LdZP14UAAAAAB0O_-727DW-KoaFizUiwBhr4wmk" onChange={this.onChange} />
                    //   </div>
                      
                    //   <div className="form-group text-center">
                    //     <label className="form-check-label" htmlFor="user_accepted_policies">
                    //     <input id="remember" className="boolean required form-check-input" label="false" data-title="Remember me!" data-placement="left" data-trigger="manual" data-offset="0, 55" aria-required="true" type="checkbox" name="remember" style={{ marginRight: '10px' }} />Remember me</label>
                    //   </div>

                    //   <div className="text-center">
                    //     <button type="submit" className="form-button">Sign In</button>
                    //   </div>
                    //   <div className="forgot"><Link to="/forgotPassword">Forgot Password?</Link></div>
                    //   <div className="forgot"><Link to="/resendConfirmation">Didn't receive confirmation instructions?</Link></div>
                      }
                    
                    
                    </form>
                  </div>
                  <div className="text-center" style={{fontSize: '19px' , color : '#fff' , marginBottom: '40px'}}>
                  Don’t have any account yet?
                  <Link to="/signup">Create Account</Link> 
                  </div>
                </div>
              </div>
            </div>
            </section>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  errorMessage: makeDetectErrorMessage(),
  global: makeGlobalParent(),
  error: makeDetectError(),

});


function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    push: (route) => dispatch(push(route)),
    login: (user) => dispatch(userLoggedIn(user)),
    loginUser: (data) => dispatch(loginUser(data)),
    removeError: () => dispatch(removeErrorMessage()),
    removeErrorGlobal: () => dispatch(removeErrorGlobal()),
    disabled2fa: () => dispatch(twoFactorDisabled()),
    stateClear: () => dispatch(emailStateClear()),
    removeOuterError: () => dispatch(removeOuterError()),
    removeInnerReset: () => dispatch(passwordResetInnerRemove()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(withReducer, withSaga, withConnect, )(LoginPage);
