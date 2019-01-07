/**
 *
 * RegisterPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import { Link, Redirect } from 'react-router-dom';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { ToastContainer, toast } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import SignupConfirm from 'containers/SignupConfirm/Loadable';
import injectReducer from 'utils/injectReducer';
import { makeSelectRegisterPage, makeDetectErrorMessage, makeDetectSuccessMessage } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { registerUser } from './actions';
import { Modal } from 'react-bootstrap';
import logo from '../../images/logoo.gif';

export class RegisterPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.passwordMatch = this.passwordMatch.bind(this);

    this.formSubmit = this.formSubmit.bind(this);
    this.state = {
      'g-recaptcha-response': '',
      referToken: '',
      captcha: false,
      match: '',
      success: false,
      mail: '',
      show: false,
      password_class:'fa fa-fw fa-eye-slash',
      conf_password_class:'fa fa-fw fa-eye-slash'

    };
    this.formSubmit = this.formSubmit.bind(this);
  }
  componentDidMount() {
    if (this.props.match.params.token != null) {
      // console.log(this.props.match.params.token);
      this.setState({
        referToken: this.props.match.params.token,
      });
    } else {
      this.setState({
        referToken: '',
      });
    }
  }


  componentWillReceiveProps(nextProps) {
    // console.log('im in will receive prop', nextProps);
    const signupform = document.getElementById('signupform');

    if (nextProps.errorMessage) {
      this.notifyError(nextProps.errorMessage);
    } else if (nextProps.successMessage) {
      this.setState({
        success: true,
      });
      signupform.reset();
    }
  }

  onChange(e) {
    // console.log(e);
    this.setState({
      'g-recaptcha-response': e,
    });
    if (e.length > 0) {
      this.setState({
        captcha: true,
      });
    }
  }

  passwordMatch() {
    const pass = document.getElementById('password').value;
    const password = document.getElementById('repeat_password').value;
    if (password === '') {
      this.setState({
        match: '',
      });
    }
    if (pass === password) {
      this.setState({
        match: true,
      });
    } else {
      this.setState({
        match: false,
      });
    }
  }
  verifyCallback(response) {
    console.log(response);
  }
  formSubmit(e) {
    e.preventDefault();
    let user;
    const terms = document.getElementById('terms');
    const usCitizen = document.getElementById('usCitizen');
    const name = document.getElementById('fname').value;
    // console.log(terms.checked)
    // console.log(this.state.referToken);

    user = {
      fullName: e.target[0].value,
      email: e.target[1].value,
      password: e.target[2].value,
      rfcode: this.state.referToken,
      termsAccepted: terms.checked,
      isUs: usCitizen.checked,
      captcha: this.state['g-recaptcha-response']
    };
    console.log(name);
    console.log(name.trim());


    if (user.password === e.target[3].value) {
      if (this.state.captcha && (name.trim().length != 0)) {
        // console.log('success');

        this.props.registerUser(user);
        this.setState({
          captcha: false,
          mail: user.email,

        });
        window.grecaptcha.reset();
      } else if (!this.state.captcha) {
        this.notifyError('Please verify that you are not a robot');
        // console.log('failure');
      } else {
        this.notifyError('Your name cannot be empty');
      }
    } else {
      this.notifyError('Password do not match');
    }


    console.log(user);
  }


  notifySuccess() {
    toast.success('Please check your email for verification link.Check Spam or other folders');
  }
  notifyError(message) {
    toast.error(message);
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
  showConfirmPassWord= (e)=>{
    console.log(e," inside show confirm password");
    var x = document.getElementById("repeat_password");
     if (x.type === "password") {
         x.type = "text";
     } else {
         x.type = "password";
     }
     if(this.state.conf_password_class==='fa fa-fw fa-eye'){
       this.setState({
         conf_password_class:'fa fa-fw fa-eye-slash'
       })
     }
     else if(this.state.conf_password_class==='fa fa-fw fa-eye-slash'){
       this.setState({
         conf_password_class:'fa fa-fw fa-eye'
       })
     }
  }


  render() {
    if (localStorage.token) {
      return <Redirect to="/dashboard" />;
    }
    if (this.state.success) {
      return (<SignupConfirm email={this.state.mail} />);
    }
    return (
      <div className="signin">
        <div className="wrapper">
          <ToastContainer position="top-center" autoClose={10000000000000000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover={false} />
          <header className="header navBarColorBlue">
            <div className="container">
              <div className="row">
                <div className="col-xs-7 col-sm-6 col-sm-6 col-md-4 clearfix">
                  <div className="logo">
                    <Link to="/signin">
                      <img src={ logo } alt="Pexo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xs-5 col-sm-6 col-md-8">
                  <div className="header-right">

                    <div className="header-btn-group">
                      <div className="header-btn"><Link to="/signin">Sign In</Link></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <section className="signin-block">
            <div className="container">
              <div className="row">
                <div className="col-sm-6 col-sm-offset-3 ">
                  <div className="card-header">
                    <h1>Create Account</h1>
                  </div>
                  <div className="signin-card-body">
                    <form id="signupform" onSubmit={this.formSubmit} >
                      <div className="form-group">
                        <label htmlFor="fullname" className="form-label">Name</label>
                        <input maxLength={100} id="fname" type="text" name="fullname" className="form-input form-control" placeholder="Full Name" required autoComplete />

                      </div>
                      <div className="form-group">
                        <label htmlFor="emailAddress" className="form-label">Email Address</label>
                        <input id="emailAddress" type="email" name="email" className="form-input form-control" placeholder="Your Email" required autoComplete="email" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="password" className="form-label">Password (Minimum six Characters)</label>
                        <input id="password" type="password" className="form-input form-control" name="password" minLength={6} maxLength={256} placeholder="Your Password" autoComplete="off" required />
                         <i onClick={this.showPassWord} className={`${this.state.password_class} field-icon`}></i>
                        <input id="repeat_password" onChange={this.passwordMatch} type="password" className="form-input mt-10 form-control" minLength={6} maxLength={256} name="repeat_password" placeholder="Repeat your Password" required />
                         <i onClick={this.showConfirmPassWord} className={`${this.state.conf_password_class} field-icon`}></i>
                      </div>
                      {(this.state.match == true) ? <p style={{ color: '#00bb27' }}>Password matched</p> : (this.state.match === '') ? <p style={{ color: '#0000fe' }}></p> : <p style={{ color: '#ff0000' }}>Password do not match</p>}

                      <div className="form-group">
                        <label className="form-check-label" htmlFor="user_accepted_policies">

                           <input id="terms" className="boolean required form-check-input" required label="false" data-title="Please confirm" data-placement="left" data-trigger="manual" data-offset="0, 55" aria-required="true" type="checkbox" name="user[accepted_policies]" />

                     &nbsp; I consent to receive email updates from Pexo.</label>
                      </div>
                      <div className="form-group">
                        <label className="form-check-label" htmlFor="usCitizen">
                          <input id="usCitizen" className="boolean required form-check-input" required label="false" data-title="Please confirm" data-placement="left" data-trigger="manual" data-offset="0, 55" aria-required="true" type="checkbox" name="usCitizen" />
                             &nbsp; I’m not US citizen and agree to the policy of Pexo token sale.
                        </label>
                      </div>


                      <div className="form-group text-center">

                        <ReCAPTCHA type="image" ref="recaptcha" className="form-captcha" required sitekey="6LdZP14UAAAAAB0O_-727DW-KoaFizUiwBhr4wmk" onChange={this.onChange} />

                        <button type="submit" className="form-button" style={{ marginTop: '10px' }}>Create Account</button>
                      </div>
                    </form>
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

RegisterPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectRegisterPage(),
  errorMessage: makeDetectErrorMessage(),
  successMessage: makeDetectSuccessMessage(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    registerUser: (data) => dispatch(registerUser(data)),

  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'registerPage', reducer });
const withSaga = injectSaga({ key: 'registerPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(RegisterPage);
