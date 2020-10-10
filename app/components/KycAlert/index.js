/**
*
* KycAlert
*
*/

import React from 'react';
// import styled from 'styled-components';
import { Link } from 'react-router-dom';

class KycAlert extends React.PureComponent {

  render() {

    if(this.props.showAlert){
        if(this.props.kycStatus === 'PENDING' || this.props.kycStatus === "incomplete"  ){
            return(
                <div className="alert alert-danger">
                    <span className="glow-text"><Link to="/dashboard/kyc">Click here</Link> to complete your KYC.</span>
                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }
        else if(this.props.kycStatus === 'DOCUMENTS'){
            return(
                <div className="alert alert-danger">
                    <span> <Link to="/dashboard/uploadDocs">{this.props.msg}</Link></span>
                    <span className="cross"><i className="fa fa-close"  onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }else if(this.props.kycStatus === 'SUBMITTED'){
            return(
                <div className="alert alert-success">
                    <span>Your KYC details are submitted. Our team will soon verify your details.</span>
                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }else if(this.props.kycStatus === 'REPORTED'){
            return(
                <div className="alert alert-danger">
                    <span>Your KYC details have some issues. Please check mail regarding issues and <Link to="/dashboard/kyc">submit</Link> the details again.</span>
                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }else if(this.props.kycStatus === 'REJECTED'){
            return(
                <div className="alert alert-danger">

                    <span>Your KYC request is Rejected. Please check your mail regarding issues and <Link to="/dashboard/kyc">submit</Link> the details again.</span><br />
                    {!!this.props.rejectMsg ?
                      <span> Reason for rejection: {this.props.rejectMsg}</span> :
                      <span></span>
                    }

                    <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                 </div>
            )
        }else if(this.props.kycStatus === 'ACCEPTED'){
            return(
                <div className="alert alert-success">
                    <span>Verified Account. Now you can start investing by clicking on 
                        <Link to="/dashboard/contribution"><span className="alert-success" onClick={() => this.props.toggleContActive() }> Contribution
                            </span>   </Link> button.</span>
                    {
                      // <span className="cross"><i className="fa fa-close" onClick={this.props.closeAlert}></i></span>
                    }
                 </div>
            )
        }
        else{
            return(<div></div>);
        }
    }else{
        return <div></div>
    }
  }
}

KycAlert.propTypes = {

};

export default KycAlert;
