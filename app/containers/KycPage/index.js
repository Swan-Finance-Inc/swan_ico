/**
 *
 * KycPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { parseNumber, formatNumber, isValidNumber } from 'libphonenumber-js'
import { Helmet } from 'react-helmet';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import  makeSelectKycPage, { makeSelectSubmitKycSuccess, makeSelectSubmitKycFractal, makeSelectUpdateKycFractal, makeSelectUpdateKycFractalSuccess
 } from './selectors';
import reducer from './reducer';
import saga from './saga';
import makeSelectDashBoardWelcomePage from '../DashBoardWelcomePage/selectors';
import { submitKyc, submitKycDoc, resetSuccess, submitKycDocSuccessRemove, fractalKYC, updateFractalKycSuccess } from './actions';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, Link } from 'react-router-dom';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { kycDone, loadProfileAction } from '../DashBoardWelcomePage/actions';
import Info from "../../components/Info";
import queryString from 'query-string';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
// const express = require("express");
// const app = express();
import uritemplate from "uri-template";
// const fetch = require("node-fetch");
import fetch from "node-fetch";
// //const path = require("path");

import prefs from "./pref.js";

let randValue = true;
export class KycPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props)

    
    this.state = {
      // @aj
      infoShow: false,
      frontImg : '',
      frontImgUrl : 'https://s3.amazonaws.com/websiteimagesrama/id_front.png',
      backImg : '',
      backImgUrl : 'https://s3.amazonaws.com/websiteimagesrama/id_back.png',
      selfieUrl:'https://s3.amazonaws.com/websiteimagesrama/id_back.png',
      residenProofUrl:'https://s3.amazonaws.com/websiteimagesrama/id_front.png',
      fullName : '',
      email : '',
      dob: '',
      gender: '',
      phone : '',
      ethAddress : '',
      citizenship : '',
      country : '',
      state : '',
      city: '',
      address: '',
      address2: '',
      doc_type: 'PASSPORT',
      doc_number: '',
      redirect : false,
      allUploaded : false,
      otherDoc : 'other',
      showOtherDoc : 'hidden',
      //kycStatus : 'Empty',
      kycJourneyCompleted : false,
      valid : true,
      submitCheck:true,
      DocType:'',
      anotherFlag:true,
      selfeFile:'',
      residentProofFile:'',
      frontimgFlag:false,
      backImageFlag:false,
      selfieFlag:false,
      residentFlag:false,
      emailForKyc: false,
      error:'',
      errorFlag: true,
      kycStatus : '',
    }

    this.handleFrontImg = this.handleFrontImg.bind(this);
    this.handleBackImg = this.handleBackImg.bind(this);
    this.submitKycDetails = this.submitKycDetails.bind(this);
    this.selectCountry = this.selectCountry.bind(this);
    this.selectRegion = this.selectRegion.bind(this);
    this.selectCitizenship = this.selectCitizenship.bind(this);
    this.handleshowOtherDoc = this.handleshowOtherDoc.bind(this);
    this.handleOtherDoc = this.handleOtherDoc.bind(this);
    this.handleInput = this.handleInput.bind(this);
    this.handleFractalKYC = this.handleFractalKYC.bind(this);
    this.findCode = this.findCode.bind(this);




  }
  findCode() {
    console.log("qwertyuioiuytrewqwertyu: ",this.props.location)
    const parsed = queryString.parse(this.props.location.search);
    console.log("Tell-me", parsed);

   if(parsed.error) {
     console.log("found error", parsed.error);
     // this.setState({
     //   errorFlag:true;
     //   error:e
     // })
     toast.error(parsed.error_description);
   }
   if(parsed.code){
     this.handleFractalKYC(parsed.code);
   } else {
     //this.props.updateFractalKyc(this.props.userInfo.userInfo.email);
   }
  }

  // ethValidator(e) {
  //   e.preventDefault();

  //   if(this.state.ethAddress.match(/^0x[a-fA-F0-9]{40}$/)){
  //     this.setState({
  //       validAddr: true
  //     })
  //   }else{
  //     this.setState({
  //       validAddr: false
  //     })
  //   }
  // }

  handleInfoModal = () => {
    this.setState({
      infoShow: !this.state.infoShow
    });
    console.log('infoShow : ', this.state.infoShow);
  }

  componentDidMount(){
    console.log(" in component did mount ")
    console.log("User infor",this.props.userInfo.userInfo.fullName)
    console.log(" dob in didmount ",this.props.userInfo.userInfo.dob);
    console.log("userinfo",this.props.userInfo.userInfo);
    this.setState({
      fullName : this.props.userInfo.userInfo.fullName ? this.props.userInfo.userInfo.fullName : '' ,
      email : this.props.userInfo.userInfo.email? this.props.userInfo.userInfo.email : '',
      dob: this.props.userInfo.userInfo.dob ? this.props.userInfo.userInfo.dob : '' ,
      gender: this.props.userInfo.userInfo.gender ? this.props.userInfo.userInfo.gender : '' ,
      phone : this.props.userInfo.userInfo.phone ? this.props.userInfo.userInfo.phone : '' ,
      ethAddress : this.props.userInfo.userInfo.ethAddress ? this.props.userInfo.userInfo.ethAddress : '' ,
      citizenship : this.props.userInfo.userInfo.kycDetails && this.props.userInfo.userInfo.kycDetails.citizenship ? this.props.userInfo.userInfo.kycDetails.citizenship : '' ,
      country : this.props.userInfo.userInfo.kycDetails && this.props.userInfo.userInfo.kycDetails.country ? this.props.userInfo.userInfo.kycDetails.country : '' ,
      state : this.props.userInfo.userInfo.kycDetails && this.props.userInfo.userInfo.kycDetails.state ? this.props.userInfo.userInfo.kycDetails.state : '' ,
      city: this.props.userInfo.userInfo.kycDetails && this.props.userInfo.userInfo.kycDetails.city ? this.props.userInfo.userInfo.kycDetails.city : '' ,
      address: this.props.userInfo.userInfo.kycDetails && this.props.userInfo.userInfo.kycDetails.address ? this.props.userInfo.userInfo.kycDetails.address : '' ,
      address2: this.props.userInfo.userInfo.kycDetails && this.props.userInfo.userInfo.kycDetails.address2 ? this.props.userInfo.userInfo.kycDetails.address2 : '',
      kycStatus : this.props.userInfo.userInfo.kycStatus ? this.props.userInfo.userInfo.kycStatus : '',
      kycJourneyCompleted : this.props.userInfo.userInfo.kycJourneyCompleted ? this.props.userInfo.userInfo.kycJourneyCompleted : '',
      // doc_number:this.props.userInfo.userInfo.kycDetails.documentNumber,
      // DocType:this.props.userInfo.userInfo.kycDetails.documentType,
      // frontImgUrl :this.props.userInfo.userInfo.kycDetails.imageFront,
      // backImgUrl :this.props.userInfo.userInfo.kycDetails.imageBack,
      // selfieUrl:this.props.userInfo.userInfo.kycDetails.selfie,
      // residenProofUrl:this.props.userInfo.userInfo.kycDetails.residentProof,

    })
    //randValue = false;
  }
  handleOtherDoc(e) {
    e.preventDefault();

    this.setState({
      doc_type : e.target.value
    })
  }

  handleshowOtherDoc(e) {
    e.preventDefault();
    if(e.target.value == 'other'){
      this.setState({
        showOtherDoc : 'text'
      })
    }else{
      this.setState({
        showOtherDoc : 'hidden'
      })
    }
  }

  handleFrontImg(e) {
      e.preventDefault();
      var reader = new FileReader();
      var file = e.target.files[0];
      console.log(file," file ---booga booga")
      if(file.size > 5*1024*1024){
        toast.error('File size should be less than 5MB');
      }else{
        reader.onloadend = () => {
          this.setState({
            frontImgUrl : '/assets/img/uploading.svg',
            frontImg : file
          })
        }
        reader.readAsDataURL(file);
        this.props.submitKycDoc({ image : file, field : 'imageFront' })
      }
    }
    handleSelfieImg=(e)=> {
        e.preventDefault();
        var reader = new FileReader();
        var file = e.target.files[0];
        if(file.size > 5*1024*1024){
          toast.error('File size should be less than 5MB');
        }else{
          reader.onloadend = () => {
            this.setState({
              selfieUrl : '/assets/img/uploading.svg',
              selfeFile : file
            })
          }
          reader.readAsDataURL(file);
          this.props.submitKycDoc({ image : file, field : 'selfie' })
        }
      }
    handleResidenProof=(e)=> {
          e.preventDefault();
          var reader = new FileReader();
          var file = e.target.files[0];
          if(file.size > 5*1024*1024){
            toast.error('File size should be less than 5MB');
          }else{
            reader.onloadend = () => {
              this.setState({
                residenProofUrl : '/assets/img/uploading.svg',
                residentProofFile : file
              })
            }
            reader.readAsDataURL(file);
            this.props.submitKycDoc({ image : file, field : 'residentProof' })
          }
        }

  handleBackImg(e) {
    e.preventDefault();
    var reader = new FileReader();
    var file = e.target.files[0];
    if(file.size > 5*1024*1024){
      toast.error('File size should be less than 5MB');
    }else{
      reader.onloadend = () => {
        this.setState({
          backImgUrl : '/assets/img/uploading.svg',
          backImg : file
        })
      }
      reader.readAsDataURL(file);
      this.props.submitKycDoc({ image : file, field : 'imageBack' })
    }
  }

  handleInput(e){
     this.setState({
         [e.target.name] : e.target.value
       })
  }

  submitKycDetails(e) {
    e.preventDefault();
    if(!this.state.valid){
      toast.error('Please enter valid ETH Wallet Address');
    }else if(!isValidNumber(this.state.phone)){
      toast.error('Phone number is invalid');
    }else{
      const { fullName, email, dob, gender, phone, ethAddress, citizenship, country, state, city, address, address2, doc_type, doc_number } = this.state;
      const kycDetails = {fullName, email, dob, gender, ethAddress, phone, citizenship, country, state, city, address, address2, doc_type, doc_number}
      this.props.submitKyc(kycDetails);
    }
  }

  notifyKyc(){
    toast.success(`Your KYC request is submitted.Please wait until request is approved.`)
  }

  notifyAccepted(){
    toast.success(`Your KYC is done.`)
  }

  selectCitizenship (val) {
    this.setState({ citizenship: val });
  }

  selectCountry (val) {
    this.setState({ country: val });
  }

  selectRegion (val) {
    this.setState({ state: val });
  }

handleInput2=(e)=>{
  if(e.target.id='doc_type'){
  let  frontImginp = document.getElementById("frontId")
  let  backImginp = document.getElementById("backId")
  let  selfieinp = document.getElementById("selfieId")
  let residentinp = document.getElementById("residentId")


    frontImginp.value='';
    backImginp.value='';
    selfieinp.value='';
    residentinp.value='';

    this.setState({
      DocType: e.target.value,
      frontimgFlag:false,
      backImageFlag:false,
      selfieFlag:false,
      residentFlag:false,
      frontImgUrl :'https://s3.amazonaws.com/websiteimagesrama/id_front.png',
      backImgUrl :'https://s3.amazonaws.com/websiteimagesrama/id_back.png',
      selfieUrl:'https://s3.amazonaws.com/websiteimagesrama/id_back.png',
      residenProofUrl:'https://s3.amazonaws.com/websiteimagesrama/id_front.png',
      doc_number:'',
      doc_type:e.target.value
    })
  }
}


  componentWillReceiveProps(nextProps){
    if(randValue){
      this.findCode();
      }
      randValue=false;
    console.log("User infor next",nextProps.updateFractalSuccess)
    if(nextProps.updateFractalSuccess){
      if(nextProps.updateFractalSuccess.error){
        toast.error(nextProps.updateFractalSuccess.message);
        }else
       { toast.success("Fractal KYC status updated");
        this.setState({
        kycStatus: nextProps.updateFractalSuccess.kycStatus,
        kycJourneyCompleted: nextProps.updateFractalSuccess.kycJourneyCompleted
      })
    }
      
     
     nextProps.submitKycDocSuccessRemove()
    }
    if(nextProps.kycpage.kycDocSuccess){
      if(nextProps.kycpage.kycDocSuccess.image == 'imageFront'){
          this.setState({
            frontImgUrl : nextProps.kycpage.kycDocSuccess.imageUrl,
            allUploaded : nextProps.kycpage.kycDocSuccess.allUploaded,
            frontimgFlag:true,
          })
            toast.success("Front Image uploaded Successfully")
            nextProps.submitKycDocSuccessRemove()
      }
      if(nextProps.kycpage.kycDocSuccess.image == 'imageBack'){
          this.setState({
            backImgUrl : nextProps.kycpage.kycDocSuccess.imageUrl,
            allUploaded : nextProps.kycpage.kycDocSuccess.allUploaded,
            backImageFlag:true
          })
            toast.success("Back Image uploaded Successfully")
            nextProps.submitKycDocSuccessRemove()
      }
      if(nextProps.kycpage.kycDocSuccess.image == 'selfie'){
          this.setState({
            selfieUrl : nextProps.kycpage.kycDocSuccess.imageUrl,
            allUploaded : nextProps.kycpage.kycDocSuccess.allUploaded,
            selfieFlag:true
          })
          toast.success("Selfie uploaded Successfully")
          nextProps.submitKycDocSuccessRemove()
      }
      if(nextProps.kycpage.kycDocSuccess.image == 'residentProof'){
          this.setState({
            residenProofUrl : nextProps.kycpage.kycDocSuccess.imageUrl,
            allUploaded : nextProps.kycpage.kycDocSuccess.allUploaded,
            residentFlag:true,
          })
            toast.success("Resident Proof uploaded Successfully")
            nextProps.submitKycDocSuccessRemove()
      }
  }

    if(nextProps.kycpage.submitKycSuccess){
      if(nextProps.kycpage.submitKycSuccess.success){
        this.setState({ kycStatus : 'SUBMITTED' });
        console.log(nextProps.kycpage.submitKycSuccess.message);
        toast.success(nextProps.kycpage.submitKycSuccess.message)
        this.props.loadProfileAction();
      }
      else{
        toast.error(nextProps.kycpage.submitKycSuccess.message);
        this.props.resetSuccess();
      }
    }
  }
  hitFractal(){
    console.log("in fractal");
    const loginTemplate = uritemplate.parse(
      `${prefs.frontendServer}/authorize{?client_id,redirect_uri,response_type,scope}`,
    );
    let uri =  loginTemplate.expand({ ...prefs, response_type: "code" });
    //window.open(uri, "fractal", "width=480,height=700,top=150,left=150");
    window.open(uri, "_blank");    
  }

  async handleFractalKYC(token){
    
    
    //let emailForKyc = this.props.userInfo.userInfo.email
    
    //console.log("fractal KYC starts", this.props.userInfo.userInfo.email, "is the currentEmail & emailforkyc", emailForKyc);
    const detail = {
      code : token
    }
    await this.props.fractalKYC(detail);
    console.log("fractal KYC ENDS");
  }

  resetInfo=()=>{
    this.props.toggleInfo()
  }

  render() {
    console.log(this.props,"props in kyc")
    console.log(this.state,"state in kyc")
    



    const {frontimgFlag,backImageFlag,selfieFlag,residentFlag} = this.state
    // if(this.state.redirect){
    //   this.props.kycDone();
    //   return (
    //     <Redirect to={"/dashboard"} />
    //   )
    // }
    if(this.props.userInfo.userInfo.kycStatus == 'SUBMITTED' || this.state.kycStatus == 'SUBMITTED' || this.state.kycStatus == 'pending' ){
      //this.props.kycActive();
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">
        <Helmet>
          <title>Kyc Page</title>
          <meta name="description" content="Description of Kyc Page" />
        </Helmet>
        <div className="ui-content-body">
        <div className="ui-container container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="alert alert-success text-center">
                <h4>Your KYC details are submitted.<br/>Our team will soon verify your details.</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
    }
    if(this.props.userInfo.userInfo.kycStatus == 'ACCEPTED'){
      this.props.kycActive();
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">
        <Helmet>
          <title>Kyc Page</title>
          <meta name="description" content="Description of Kyc Page" />
        </Helmet>
        <div className="ui-content-body">
        <div className="ui-container container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="alert alert-success text-center">
                <h5 className="alert-success">Your KYC is done.</h5>
                <p>Now you can start investing by clicking on 
                 <Link to="/dashboard/contribution" ><span className="alert-success" style={{textDecoration:'underline'}} onClick={() => this.props.toggleContActive() }
                 > Contribution </span> </Link> 
                  button.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
    }

    if(!this.props.userInfo.userInfo.kycStatus == 'DOCUMENTS'){
      this.props.kycActive();
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">
        <Helmet>
          <title>Kyc Page</title>
          <meta name="description" content="Description of Kyc Page" />
        </Helmet>
        <div className="ui-content-body">
        <div className="ui-container container-fluid">
          <div className="row">
            <div className="col-sm-12">
              <div className="alert alert-success text-center">
                <h5>More Documents Required.</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
      )
    }
    const { fullName, email, dob, gender, phone, ethAddress, citizenship, country, state, city, address, address2, doc_type, doc_number } = this.state;
    this.props.kycActive()
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>Kyc Page</title>
        <meta name="description" content="Description of Kyc Page" />
      </Helmet>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          {
        //     <div className="panel panel-default">
        //     {/*<div className="panel-heading">KYC Verification</div>*/}
        //     <div className="panel-heading blueBG">
        //       {/*<Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />*/}
        //       {
        //         !!this.props.flag ?
        //           <Info hanldeToggle={this.resetInfo} toggleFlag={this.state.infoShow} />
        //           :
        //           null
        //       }

        //       KYC Verification
        //     </div>
        //   <div className="panel-body" style={{fontSize:'16px'}}>
        //     <div className="row">
        //    <div className="col-md-6 col-sm-6 col-xs-6"> KYC Status: {this.state.kycStatus}</div>
        //    <div className="col-md-6 col-sm-6 col-xs-6 text-right"> KYC Journey Completed: {this.state.kycJourneyCompleted?"Yes":"No"}</div>
        //     <div className="col-md-12 col-sm-12 col-xs-12 text-center">
        //     <button onClick={this.hitFractal} className="fractal-id-btn text-center">
        //       Start KYC with <span style={{color: "#EE7326"}}>Fractal</span>
        //     </button>
        //     </div>
        //     </div>
        //      {/* <div className="row">
        //       <div className="col-sm-12">
        //         <div className="row"><div className="col-sm-6"><h3>PERSONAL DETAILS</h3></div>
        //         <div className="col-sm-6"><h5 style={{color:'#f00'}} className="text-right">(*) denotes required field.</h5></div><hr/></div>
        //         <form onSubmit={this.submitKycDetails}>
        //           <div className="row">
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="fullName"><h5>FULL NAME<sup>*</sup></h5></label>
        //               <input className="form-control" type="text" name="fullName" id="fullName" value={fullName} onChange={this.handleInput} required/>
        //             </div>
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="email"><h5>EMAIL<sup>*</sup></h5></label>
        //               <input className="form-control" type="email" name="email" id="email" value={email} onChange={this.handleInput} disabled required/>
        //             </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="dob"><h5>DATE OF BIRTH<sup>*</sup></h5></label>
        //               <input className="form-control" placeholder="dd/mm/yyyy" type="date" name="dob" id="dob" value={dob} onChange={this.handleInput} required/>
        //             </div>
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="gender"><h5>GENDER<sup>*</sup></h5></label>
        //               <select id="gender" name="gender" className="form-control" value={this.state.gender} onChange={this.handleInput} required>
        //                 <option  hidden>Choose One</option>
        //                 <option value="MALE">MALE</option>
        //                 <option value="FEMALE">FEMALE</option>
        //                 <option value="DECLINE TO STATE">DECLINE TO STATE</option>
        //               </select>
        //             </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="phone"><h5>PHONE NUMBER<sup>*</sup></h5></label>
        //               <PhoneInput id="phone"
        //                 placeholder="Enter phone number"
        //                 name="phone"
        //                 value={ phone }
        //                 onChange={ phone => this.setState({ phone }) }
        //                 error={ phone ? (isValidNumber(phone) ? undefined : 'Invalid phone number') : '' }/>
        //             </div>
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="ethAddress"><h5>ETH WALLET ADDRESS (ERC20)<sup>*</sup></h5></label>
        //               <input className="form-control" type="text" name="ethAddress" id="ethAddress" placeholder="Enter ETH wallet address (ERC20)" title="Please enter valid eth address" value={ethAddress} onChange={this.handleInput} required/>
        //               { !this.state.valid ? <p style={{color: '#f00'}}>Please enter Valid ETH address.</p> : '' }
        //             </div>
        //           </div>
        //           <div className="row"><div className="col-sm-12"><h3>ADDRESS</h3><hr/></div></div>
        //           <div className="row">
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="citizenship"><h5>CITIZENSHIP<sup>*</sup></h5></label>
        //               <CountryDropdown
        //                   classes="form-control"
        //                   value={citizenship}
        //                   onChange={this.selectCitizenship} />
        //             </div>
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="country"><h5>COUNTRY<sup>*</sup></h5></label>
                        
        //                 <CountryDropdown
        //                   classes="form-control"
        //                   value={country}
        //                   onChange={this.selectCountry} />
        //             </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="state"><h5>STATE<sup>*</sup></h5></label>
                      
        //               <RegionDropdown
        //                 classes="form-control"
        //                 country={country}
        //                 value={state}
        //                 onChange={this.selectRegion} />
        //             </div>
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="city"><h5>CITY<sup>*</sup></h5></label>
        //               <input className="form-control" type="text" name="city" id="city" value={city} onChange={this.handleInput} placeholder="Enter city" required/>
        //             </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="address"><h5>ADDRESS<sup>*</sup></h5></label>
        //               <input className="form-control" type="text" name="address" id="address" value={address} onChange={this.handleInput} placeholder="Enter address" required/>
        //             </div>
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="address2"><h5>ADDRESS 2</h5></label>
        //               <input className="form-control" type="text" name="address2" id="address2" value={address2} onChange={this.handleInput} placeholder="Enter address 2"/>
        //             </div>
        //           </div>
        //           <div className="row"><div className="col-sm-12"><h3>DOCUMENT</h3><hr/></div></div>
        //           <div className="row">
        //             <div className="col-sm-6">
        //               <div className="form-group">
        //               <label htmlFor="doc_type"><h5>TYPE<sup>*</sup></h5></label>
        //                 <select id="doc_type" name="doc_type" className="form-control" value={this.state.DocType} onChange={this.handleInput2} onClick={this.handleshowOtherDoc} required>
        //                   <option value="" hidden>Select Any Document</option>
        //                   <option value="PASSPORT">PASSPORT</option>
        //                   <option value={this.state.otherDoc}>ANY NATIONAL ID</option>
        //                 </select>
        //                 <input type={this.state.showOtherDoc} id="doc_type" name="doc_type" onChange={this.handleInput} value={this.state.doc_type} placeholder="Enter National ID" className="form-control" style={{marginTop:"20px"}} required/>
        //               </div>
        //               <div className="form-group">
        //               </div>
        //             </div>
        //               <div className="col-sm-6 form-group">
        //               <label htmlFor="number"><h5>NUMBER<sup>*</sup></h5></label>
        //               <input className="form-control" type="text" id="number" placeholder="ID number" name="doc_number" value={this.state.doc_number} onChange={this.handleInput} required/>
        //               </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-6 form-group">
        //               <label htmlFor="front_id"><h5>UPLOAD FRONT ID<sup>*</sup></h5></label>
        //               <img className="img-responsive" style={{width:'400px',height:'250px'}} src={this.state.frontImgUrl} alt="front id" id="front_img_src"/>
        //               <input type="file" accept="image/png, image/jpeg" id='frontId' name="front_id" style={{margin:'10px 0px 0px 30px'}} onChange={this.handleFrontImg} />
        //             </div>
        //               <div className="col-sm-6 form-group">
        //                 <label htmlFor="back_id"><h5>UPLOAD BACK ID{!(this.state.DocType=='PASSPORT')?<sup>*</sup>:" "}</h5></label>
        //                 <img className="img-responsive" style={{width:'400px',height:'250px'}} src={this.state.backImgUrl} alt="back id" id="back_img_src"/>
        //                 <input type="file" accept="image/png, image/jpeg" name="back_id" id='backId' style={{margin:'10px 0px 0px 30px'}} onChange={this.handleBackImg} />
        //               </div>
        //               <div className="col-sm-6 form-group">
        //                 <label htmlFor="back_id"><h5>UPLOAD SELFIE<sup>*</sup></h5></label>
        //                 <img className="img-responsive" style={{width:'400px',height:'250px'}} src={this.state.selfieUrl} alt="back id" id="back_img_src"/>
        //                 <input type="file" accept="image/png, image/jpeg, .pdf" id='selfieId' name="back_id" style={{margin:'10px 0px 0px 30px'}} onChange={this.handleSelfieImg} />
        //               </div>
        //               <div className="col-sm-6 form-group">
        //                 <label htmlFor="back_id"><h5>UPLOAD RESIDENTIAL PROOF<sup>*</sup></h5></label>
        //                 <img className="img-responsive" style={{width:'400px',height:'250px'}} src={this.state.residenProofUrl} alt="back id" id="back_img_src"/>
        //                 <input type="file" accept="image/png, image/jpeg" name="back_id" id='residentId' style={{margin:'10px 0px 0px 30px'}} onChange={this.handleResidenProof} />
        //               </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-12 text-center">
        //               <h5>Maximum Upload file size is <span style={{color: '#f00'}}>5MB</span></h5>
        //             </div>
        //           </div>
        //           <div className="row">
        //             <div className="col-sm-12 text-center">
        //             <button className="btn-primary blueBG" style={{borderRadius: '25px', padding: '10px 80px'}} disabled={(this.state.DocType="PASSPORT")?!(frontimgFlag&&selfieFlag&&residentFlag):!(frontimgFlag&&selfieFlag&&residentFlag&&backImageFlag)} type="submit">SUBMIT</button>
        //             </div>
        //           </div>
        //         </form>
        //       </div> 
              
        //     </div> */}
        //   </div>
        // </div>
          }

          <div className="row">
            <div className="col-sm-12">
              <div className="kyc-verification">
                  <h3 className="kyc-verification-header" style={{fontWeight:'bold'}}>KYC Verification</h3>
                  <h4 className="kyc-status"><span style={{fontWeight:'bold'}}>KYC Status</span> :{this.state.newKycStatus}</h4>
                  <h4 className="kyc-status"><span style={{fontWeight:'bold'}}>KYC Journey Completed</span>: {this.state.kycJourneyCompleted?"Yes":"No"}</h4>
                  <div className="text-center" style={{marginTop : '60px'}}>
                    <button className="invest kyc-factorial"
                    onClick={this.hitFractal} 
                    >Start KYC With Fractal</button>
                  </div>
                  <div className="col-md-12" style={{marginTop:"40px", marginLeft:"-15px"}}>
                   
                    <h5>Instruction: In Fractal, please Log in with the same email ID used on this SwanFinance platform <div style={{color:"red"}}>If you find another user already signed in Fractal, please logout from Fractal to proceed with your KYC</div></h5>
                  
                     
                      </div>
              </div>
            </div>  
          </div>
          {/* <div className="row">
            <div className="col-sm-12">
              <div className="kyc-verification">
                  <h3 className="kyc-verification-header" style={{fontWeight:'bold'}}>Schedule a KYC Videoconference</h3>
                  <h4 className="kyc-status">For users outside of the European Union, a brief videoconference is required to verify ID.</h4>
                  <div className="text-center" style={{marginTop : '80px', display: 'flex' , justifyContent:'center', placeContent: 'space-evenly'}}>
                    <button className="invest kyc-factorial"
                    onClick={this.hitFractal} 
                    >Schedule</button>
                     <button className="invest kyc-factorial"
                    onClick={this.hitFractal} 
                    >Chat with us</button>
                  </div>
              </div>
            </div>  
          </div> */}
      </div>
      </div>
      </div>
    )
  }
}

KycPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  kycpage: makeSelectKycPage(),
  userInfo: makeSelectDashBoardWelcomePage(),
  updateFractalSuccess: makeSelectUpdateKycFractalSuccess(),

});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadProfileAction: () => dispatch(loadProfileAction()),
    submitKyc : (data) => dispatch(submitKyc(data)),
    kycDone: () => dispatch(kycDone()),
    submitKycDoc : (data) => dispatch(submitKycDoc(data)),
    fractalKYC : (data) => dispatch(fractalKYC(data)),
    resetSuccess : () => dispatch(resetSuccess()),
    submitKycDocSuccessRemove:()=>dispatch(submitKycDocSuccessRemove())
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'kycPage', reducer });
const withSaga = injectSaga({ key: 'kycPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(KycPage);
