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

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectUploadDocuments from './selectors';
import reducer from './reducer';
import saga from './saga';
import { submitDoc } from './actions'

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
       if(nextProps.uploaddocuments.kycDocSuccess.image == 'imageFront'){
         this.setState({
           frontImgUrl : nextProps.uploaddocuments.kycDocSuccess.imageUrl,
         })
       }
     }
   }

 handleFrontImg=(e)=>{
     e.preventDefault();
     var reader = new FileReader();
     var file = e.target.files[0];
     if(file.size > 2*1024*1024){
       toast.error('File size should be less than 2MB');
     }else{
       reader.onloadend = () => {
         this.setState({
           frontImgUrl : '/assets/img/uploading.svg',
           frontImg : file
         })
       }
       reader.readAsDataURL(file);
       this.props.submitDoc({ image : file, field : 'imageFront' })
     }
   }
  render() {

    return (
      <div id="content" className="ui-content ui-content-aside-overlay">
      <Helmet>
        <title>Upload Documents</title>
        <meta name="description" content="Description of Upload Document" />
      </Helmet>
        <div className="ui-content-body">
          <div className="ui-container container-fluid">
          <div className="panel panel-default">
        <div className="panel-heading">Upload Documents</div>

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
    submitDoc : (data) => dispatch(submitDoc(data))
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
