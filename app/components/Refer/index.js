/**
*
* Refer
*
*/

import React from 'react';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  RedditIcon,
} from 'react-share';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const SHARE_POST = 'RUC introduces a unique tokensale platform for the Community.You can earn upto 2000 RUC Tokens , Sign-up';

class Refer extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      code: '',
      copied: false,
    };
  }

        componentDidMount(){
          this.setState({
            code : this.props.code.referral.code,
            link : `https://tokensale.ruc.io/signup/refer/${this.props.code.referral.code}`,
            percent:this.props.code.amountPercent
          })
    // copyText.select();

    /* Copy the text inside the text field */
    document.execCommand('copy');
  }

  render() {
    const { percent } = this.state;
    return (
      <div>

      {this.props.code.status?   <div className="panel panel-default">
          <div className="panel-heading">Refer & Earn - Invite Your Friends & Get Free RUC Tokens</div>
          <div className="panel-body">
        <div className="row">
          <div className="col-sm-12">
            <div className="refer-friends refer-panel">
              <div className="row">
                <div className="col-sm-12 col-md-6 col-md-offset-3">

                  <p>Share your unique referral link with your friends and you will earn free RUC Tokens.</p>
                  <p>Refer bonus is {percent}% of tokens purchased by the referee</p>
                  <div className="referral-link">
                  <input type="text" onChange={ (e) => {this.setState({ link : e.target.value })}} value={`https://tokensale.ruc.io/signup/refer/${this.state.code}`} id="myInput" />
                    <CopyToClipboard text={this.state.link}
                      onCopy={() => this.setState({copied: true})}>
                      <button>Copy Link</button>
                    </CopyToClipboard>
                    {this.state.copied ? 'Referral URL copied to clipboard' : ' '}
                  </div>

                  <div className="referral">


                    <FacebookShareButton style={{ marginRight: '10px' }} url={`https://tokensale.RUC.io/signup/refer/${this.state.code}`} quote={`RUC.io introduces a unique tokensale platform for the Community.You can earn upto 2000 RUC Tokens , Sign-up`}>
                      <FacebookIcon size={42} round />

                    </FacebookShareButton>

                    <TwitterShareButton style={{ marginRight: '10px' }} url={`https://tokensale.RUC.io/signup/refer/${this.state.code}`} title={SHARE_POST}>
                      <TwitterIcon size={42} round />

                    </TwitterShareButton>
                    <TelegramShareButton style={{ marginRight: '10px' }} url={`https://tokensale.RUC.io/signup/refer/${this.state.code}`} title={SHARE_POST}>
                      <TelegramIcon size={42} round />

                    </TelegramShareButton>
                    <WhatsappShareButton style={{ marginRight: '10px' }} url={`https://tokensale.RUC.io/signup/refer/${this.state.code}`} title={SHARE_POST}>
                      <WhatsappIcon size={42} round />

                    </WhatsappShareButton>
                    <LinkedinShareButton
                      style={
                        {
                          marginRight: '10px',
                        }
                      }
                      url={
                        `https://tokensale.ruc.io/signup/refer/${this.state.code}`
                      }
                      title={
                        `RUC.io introduces a unique tokensale platform for the Community. You can earn upto 2000 RUC Tokens , Sign-up
                          now by clicking on https://tokensale.ruc.io/signup/refer/${this.state.code}`
                      }
                      description={
                        `RUC.io introduces a unique earning platform for the Community. You can earn upto 2000 RUC Tokens , Sign-up
                          now by clicking on https://tokensale.ruc.io/signup/refer/${this.state.code}`
                      }
                    >
                      <LinkedinIcon size={42} round />
                    </LinkedinShareButton>
                    <RedditShareButton style={{ marginRight: '10px' }} url={`https://tokensale.ruc.io/signup/refer/${this.state.code}`} title={`RUC.io introduces a unique tokensale platform for the Community. You can earn upto 2000 RUC Tokens , Sign-up
                          now by clicking on https://tokensale.ruc.io/signup/refer/${this.state.code}`}>
                      <RedditIcon size={42} round />
                    </RedditShareButton>


                  </div>
                </div>
              </div>
              {
              // <div className="row">
              //   <div className="col-sm-12">
              //     <div className="referral-container">
              //       <table className="table table-bordered">
              //         <thead>
              //           <tr>
              //             <th>Number of Referrals</th>
              //             <th>Tokens per Referral</th>
              //             <th>Total Earning Potential</th>
              //           </tr>
              //         </thead>
              //         <tbody>
              //           <tr>
              //             <td>61 - 100
              //             </td><td>20</td>
              //             <td>1220 - 2000</td>
              //           </tr>
              //           <tr>
              //             <td>31 - 60
              //             </td><td>15</td>
              //             <td>465 - 900</td>
              //           </tr>
              //           <tr>
              //             <td>1 - 30
              //             </td><td>10</td>
              //             <td>10 - 300</td>
              //           </tr>
              //         </tbody>
              //       </table>
              //     </div>
              //   </div>
              // </div>
              // <div className="row">
              //   <div className="col-sm-12">
              //     <div className="rules">
              //       <h3>Rules:</h3>
              //       <ol className="rule-list">
              //         <li>Tokens will be transferred after the KYC Verification Process is Completed and assurance of no multiple accounts of user.</li>
              //         <li>Maximum 2000 Tokens can be earned through referral program.</li>
              //         <li>Limited Tokens will be allocated under referral program.</li>
              //         <li>Multiple accounts are not allowed. Anyone having multiple accounts will be disqualified from the referral program, and no Tokens will be rewarded for any of the accounts.</li>
              //         <li>Please join our official <a href=" https://t.me/rucofficial" target="_blank" className="link">Telegram group</a> like Our <a href="https://www.facebook.com/ruc/" target="_blank" className="link">Facebook Page</a> and follow official <a href="https://twitter.com/RUC" target="_blank" className="link">Twitter Handle</a> and <a href="https://www.reddit.com/user/ruc" className="link" target="_blank">Reddit Page</a>.</li>
              //         <li>RUC reserves the right to add, alter, modify, change or vary all of above rules or end it altogether, at any time without prior notice and without assigning any reason whatsoever.</li>
              //       </ol>
              //     </div>
              //   </div>
              // </div>
            }
            </div>
          </div>
        </div>
      </div>
      </div> :''}
      <div className="panel panel-default">
          <div className="panel-heading">ICO Details</div>
          <div className="panel-body" style={{fontSize:'16px'}}>
            <h2 style={{fontSize:'20px'}} className="panel-subHead">Pre-Sale</h2>
            <table className="table table-bordered sale">
              <tbody>
                <tr>
                  <td>Start date: </td>
                  <td>19th November, 2018 GMT</td>
                </tr>
                <tr>
                  <td>End date: </td>
                  <td>16th December, 2018 GMT</td>
                </tr>
                <tr>
                  <td>Bonus: </td>
                  <td>30%</td>
                </tr>
                <tr>
                  <td>Minimum Purchase: &nbsp;&nbsp;&nbsp;</td>
                  <td>15000 RUC</td>
                </tr>
                </tbody>
              </table>

              <h2 style={{fontSize:'20px'}}>Crowd Sale</h2>
              <table className="table table-bordered sale">
                <tbody>
                  <tr>
                    <td>Start date: </td>
                    <td>2nd January, 2019 GMT</td>
                  </tr>
                  <tr>
                    <td>End date: </td>
                    <td>31st January, 2019 GMT</td>
                  </tr>
                  <tr>
                    <td>Bonus(Ist week): </td>
                    <td>15%</td>
                  </tr>
                  <tr>
                    <td>Bonus(2nd week): </td>
                    <td>10%</td>
                  </tr>
                  <tr>
                    <td>Bonus(3rd &amp; 4th week): </td>
                    <td>0%</td>
                  </tr>
                  <tr>
                    <td>Minimum Purchase: </td>
                    <td>500 RUC</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">Token Price: <strong>1 RUC = $0.1</strong></div>
              <div className="text-center">We Accept: <strong>BTC, ETH</strong></div>
              <div className="text-center">Currently Processed: <strong>0 RUC TOKENS</strong></div>
          </div>
       </div>
      </div>
    );
  }
}

Refer.propTypes = {

};

export default Refer;
