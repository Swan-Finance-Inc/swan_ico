/**
 *
 * UploadDocuments
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { ToastContainer, toast } from 'react-toastify';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUploadDocuments from './selectors';
import reducer from './reducer';
import saga from './saga';
import { submitDoc, resetDocSuccess } from './actions'

export class UploadDocuments extends React.PureComponent {
 // eslint-disable-line react/prefer-stateless-function
 constructor(props){
   super(props)
   this.state={
     frontImgUrl:'https://s3.amazonaws.com/websiteimagesrama/id_front.png',
     frontImg:''
   }
 }
  componentWillReceiveProps(nextProps){
     if(nextProps.uploaddocuments.kycDocSuccess){
       if(nextProps.uploaddocuments.kycDocSuccess.image == 'extraDoc'){
         this.setState({
           frontImgUrl : nextProps.uploaddocuments.kycDocSuccess.imageUrl,
         })
         toast.success("Document Uploaded Successfully")
         nextProps.resetDocSuccess()
       }
     }
   }

 handleFrontImg=(e)=>{
     e.preventDefault();
     var reader = new FileReader();
     var file = e.target.files[0];
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
       this.props.submitDoc({ image : file, field : 'extraDoc' })
     }
   }
  render() {
console.log(this.props," props in upload Document")
console.log(this.state," state in upload Document ")
    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>Upload Extra Documents</title>
        <meta name="description" content="Description of Upload Document" />
      </Helmet>
      <ToastContainer position="top-center" autoClose={6000} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover />
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
        <div className="panel-heading">Upload More Documents</div>

        <div className="row">
          <div className="col-sm-6 form-group">
            <label htmlFor="front_id"><h5>Documnets<sup>*</sup></h5></label>
            <img className="img-responsive" style={{width:'400px',height:'250px'}} src={this.state.frontImgUrl} alt="front id" id="front_img_src"/>
            <input type="file" accept="image/png, image/jpeg" name="front_id" style={{margin:'10px 0px 0px 30px'}} onChange={this.handleFrontImg} required/>
          </div>
        </div>



        </div>
        </div>
        </div>
        </div>
    );
  }
}

UploadDocuments.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  uploaddocuments: makeSelectUploadDocuments(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    submitDoc : (data) => dispatch(submitDoc(data)),
    resetDocSuccess:(data) => dispatch(resetDocSuccess(data))
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'uploadDocuments', reducer });
const withSaga = injectSaga({ key: 'uploadDocuments', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(UploadDocuments);
