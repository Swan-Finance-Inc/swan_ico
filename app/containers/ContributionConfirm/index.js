/**
 *
 * ContributionConfirm
 *
 */

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";
import queryString from "query-string";

import injectSaga from "utils/injectSaga";
import injectReducer from "utils/injectReducer";
import makeSelectContributionConfirm from "./selectors";
import reducer from "./reducer";
import saga from "./saga";
import { toast, ToastContainer } from "react-toastify";
import { ENGINE_METHOD_DH } from "constants";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { IconButton } from '@material-ui/core';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import {  Steps, Divider} from "antd";
// import btclib from 'bitcoinjs-lib';
const btclib = require('bitcoinjs-lib');
//import bitcore from 'bitcore-lib';
import Web3 from 'web3';
import StellarSdk from 'stellar-sdk';
// import bitExplorers from 'bitcore-explorers';
// import bitcoinTransaction from 'bitcoin-transaction';
import axios from 'axios';


const { Step } = Steps;
export class ContributionConfirm extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  // Begin constructor
  constructor(props) {
    super(props);
    this.state = {
      url: "",
      copied: false,
      valid: true,
      validBlank: true,
      currentReceivingWalletAddress : '',
      curTime: new Date().toLocaleString(),
      txHash : '',
      gasPrice: 0,
      isDisabled: false,
    };
    this.goBack = this.goBack.bind(this);
    this.confirmPayment = this.confirmPayment.bind(this);
    this.copyFunction = this.copyFunction.bind(this);
    this.txValidator = this.txValidator.bind(this);
    this.makeTransaction = this.makeTransaction.bind(this);
    this.initiateTransaction = this.initiateTransaction.bind(this);
    this.getUTXOdetails = this.getUTXOdetails.bind(this);
    //this.makeFinalPayment = this.makeFinalPayment.bind(this);
  }
  // End Constructor

  // Begin life cycle methods
  componentDidMount() {
      // this.intervalID = setInterval(
      //   () => this.tick(),
      //   1000
      // );
    // if (this.props.currency == "Bitcoin") {
    //   const href =
    //     "https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2";
    //   const query = queryString.parse(href);
    //   query.chl = this.props.currentReceivingWalletAddress;
    //   const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(
    //     query
    //   )}`;
    //   this.setState({
    //     url: uri,
    //     currentReceivingWalletAddress: this.props.currentReceivingWalletAddress
    //   });
    // } else {

      const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`)); //--prodChange
      //const gasPrice = web3.eth.getGasPrice()

          web3.eth.getGasPrice(function(err,res){
            if(err){
              toast.error(err)
            } else {
              this.setState({
                gasPrice: web3.utils.fromWei(res)
              });
            }

          }.bind(this))
          


      const href =
        "https://chart.googleapis.com/chart?cht=qr&chl=&chs=180x180&choe=UTF-8&chld=L|2";
      const query = queryString.parse(href);
      query.chl = this.props.clientAddress;
      const uri = `https://chart.googleapis.com/chart?cht=qr&${queryString.stringify(
        query
      )}`;
      this.setState({
        url: uri
      });
    //}
  }

  // End life cycle methods
  componentWillUnmount(){
    //clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      curTime: new Date().toLocaleString()
    });
  }
  // Begin Container functions
  txValidator(e) {
    let hash = e.target.value;
    if (hash.length > 0) {
      if (this.props.currency == "Ethereum") {
        if (hash.match(/^(0x)?([A-Fa-f0-9]{64})$/)) {
          this.setState({
            valid: true,
            validBlank: true,
            txHash: hash
          });
        } else {
          this.setState({
            valid: false,
            validBlank: false
          });
        }
      } else if (this.props.currency == "Bitcoin") {
        if (hash.match(/^[a-fA-F0-9]{64}$/)) {
          this.setState({
            valid: true,
            validBlank: true
          });
        } else {
          this.setState({
            valid: false,
            validBlank: false
          });
        }
      }
    } else {
      this.setState({
        validBlank: true
      });
    }
  }
  goBack() {
    this.props.back();
  }

  confirmPayment(e) {
    e.preventDefault();
    // const hash = document.getElementById("txhash").value;
    // if (this.state.valid) {
    //   this.props.finalPayment(hash);
    // } else {
    //   toast.error("Please enter a valid transaction hash");
    // }

    this.props.finalPayment(this.state.currentReceivingWalletAddress)
  }
  copyFunction() {
    let range = document.getSelection().getRangeAt(0);
    range.selectNode(document.getElementById("address"));
    window.getSelection().addRange(range);
    document.execCommand("copy");
    toast.success("Address copied");
  }

  makeFinalPayment(sender, hash){
    //toast.success(`Trxn Hash:  ${res}`);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaafffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
    this.props.finalPayment(sender, hash)
  }

//  exports.satoshi_to_btc = (value) => Number((1e-8 * value).toFixed(8));
//  exports.btc_to_satoshi = (value) => parseInt(1e8 * value);

  getUTXOdetails = (obj) => {
    console.log("API Obj: ",obj)
    var result = [];
    var amount = this.satoshi_to_btc(this.props.currencyQty);
    var TX_FEES = 350;
    var keyPair = btclib.ECPair.fromWIF(this.props.currWallet.private_key, btclib.networks.testnet);
    var unspentUTXOS = obj.txrefs;
    console.log("unspent", unspentUTXOS)
    try{
      if(unspentUTXOS.length==0 || unspentUTXOS===undefined){
        toast.error('Unspent transactions not found. Check balance')
        this.setState({
          isDisabled:false
        })
        return('Unspent transactions not found. Check balance')
      } else
        {
        console.log("before sort: ", unspentUTXOS);
        unspentUTXOS.sort((a, b) => a.value - b.value);
        console.log("after sort: ", unspentUTXOS);
        let totalUTXOAmount = 0,
          i = 0;
          
          while (i < unspentUTXOS.length && totalUTXOAmount < amount) {
            const utxo = unspentUTXOS[i++];
            totalUTXOAmount += utxo.value;
            utxo.spent = true;
            result.push(utxo);
          }

              // there was not enough balance in the hot wallet
        if (totalUTXOAmount < amount) {
          unspentUTXOS.forEach((utxo) => (utxo.spent = false));
          toast.error('insufficient balance in wallet')
          this.setState({
            isDisabled:false
          })
          return Promise.reject({
            message: `not enought balance in hot wallet:`,
            err: 'insufficient balance in hot wallet',
          });
        }
        
        const totalAmount = result.reduce((acc, utxo) => acc + utxo.value, 0);
        const change = Math.round(totalAmount - amount - TX_FEES);
        console.log("total amount to be sent", totalAmount, "and change", change);
        if (change < 0) {
          toast.error('insufficient balance in wallet to provide fees');
          this.setState({
            isDisabled:false
          })
          return Promise.reject({
            message: `not enought balance in hot wallet`,
            err: 'insufficient balance in wallet',
          });
        }
        const NETWORK = btclib.networks.testnet;

        try
        {const to = this.props.clientAddress;
        const txBuilder = new btclib.TransactionBuilder(btclib.networks.testnet);
        console.log("txn builder");
        txBuilder.addOutput(to, amount);
        console.log("add output to");
        txBuilder.addOutput(this.props.currWallet.address, change);
        console.log("get change");

        result.forEach((utxo) => txBuilder.addInput(utxo.tx_hash, utxo.tx_output_n));
        console.log("add input done now will sign: ", this.props.currWallet.private_key);
        for (let i = 0; i < result.length; i++) {txBuilder.sign(i, keyPair);}
        //txBuilder.sign(0, this.props.currWallet.private_key);
        const tx = txBuilder.build(); 
        console.log("txn builder builld");  
        console.log("tx: ", tx)  
        const txHex = tx.toHex();
        console.log('trxn hex comes: ', txHex);
        let bodyy = {tx: txHex} 
        // https://live.blockcypher.com/btc-testnet/pushtx/
        //--prodChange
        const sendTxData = () =>
              fetch(`https://api.blockcypher.com/v1/btc/test3/txs/push`, { headers: { 'Content-Type': 'application/json'} , method: "POST", body:JSON.stringify(bodyy) })
                  .then(r => r.json())
                  .then(jsonn => (console.log("txData send for monitoring bach gye",jsonn), jsonn))
                  .catch(err => console.error("txData send for monitoring lag gaye",err));    
        sendTxData()
          .then((r) => (console.log("what happens now>>>??", r.tx.hash), this.props.finalPayment(this.props.currWallet.address, r.tx.hash)))
          .catch((error) => console.log(error,"sendTxData catch error occured"));   
      
      } catch(error){console.log("error in trxnVuilder", error)
      toast.error(`${error}`)
      this.setState({
        isDisabled:false
      })} 
        
                                                                    


        return result;
      }
    }catch(err){
      toast.error(`Error in building trx ${err}`)
      this.setState({
        isDisabled:false
      })
    }
  }

  initiateTransaction = async () =>{
    this.setState({
      isDisabled:true
    })
    if(this.props.currency==="Ethereum"){
        const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`));//--prodChange
        let receiver = web3.utils.toChecksumAddress(this.props.clientAddress);
        let amount = this.props.currencyQty;
        let sender = web3.utils.toChecksumAddress(this.props.currWallet.address);
        let pvtKey = this.props.currWallet.private_key;
        console.log("xxxx", receiver,amount, pvtKey, sender);
        if(!pvtKey){

            toast.error("Private key not found")
          return ''
        }
        let rawTransaction = {
          "from": sender,
        "to": receiver,
        "value": web3.utils.toHex(web3.utils.toWei(amount, "ether")),
        "gas": 21000,
        "chainId": 3
        }; //--prodChange
        try
        {let signTransaction = web3.eth.accounts.signTransaction(rawTransaction, pvtKey, function(err, res){
          if(err)
          {console.log("Error occured in signtrxn",err)
          this.setState({
            isDisabled:false
          })
        toast.error(`${err}`)}
          else
          {
            console.log("Sign trxn res: ", res);
            web3.eth.sendSignedTransaction(res.rawTransaction, function(err,res){
              if(err)
              {console.log("Error occured in sendDisngnedtrxnn", err)
              this.setState({
                isDisabled:false
              })
            toast.error(`${err}`)}
              else
              {
                console.log("Send signed trxn res: ", res);
                this.setState({
                  isDisabled:false
                })
                this.props.finalPayment(sender, res);
              }
            }.bind(this))
        }
      }.bind(this));} catch(error){
        console.log("in catch of viaSwanEthWallet: ",error)
      }
    } else if(this.props.currency === "Bitcoin"){


      //var key = bitcoin.ECKey.fromWIF('mwVnnxxm1oj9rxNYeGBFmcFCWeL7W7QwBC', bitcoin.networks.testnet);
      //var key =bitcore.PrivateKey('testnet').toWIF();
      //console.log("bitcocin ki key", key)
      //var privateKey = bitcore.PrivateKey.fromWIF(key);
      //var address = privateKey.toAddress();
      const TESTNET = btclib.networks.testnet;
      var address = this.props.currWallet.address
      console.log("then after key: ",this.props.currWallet.private_key, "address:: ", address);
      // var yourAddressPrivateKeyWIF = btclib.PrivateKey('testnet').toWIF();
      // var yourAddresskeyPair = btclib.ECPair.fromWIF(yourAddressPrivateKeyWIF, TESTNET)
      // console.log("match this: ", yourAddresskeyPair.getAddress())
      //var key = btclib.ECPair.fromWIF(this.props.currWallet.private_key, btclib.networks.testnet);
      //address = key.getAddress();
      //console.log("web se aaiy key: ", key)

      // var Insight = bitExplorers.Insight;
      // console.log("Insight aaya: ", Insight)
      // var insight = new Insight('testnet');
      // console.log("insight aaya: ", insight)
      // insight.getUnspentUtxos(address, function(err,utxos){
      //   if(err){
      //     console.log("Error in insight getUnspentUtxos ",err )
      //   } else {
      //     console.log("THE UTXOS: ", utxos)
      //   }
      // })

      //axios.get('https://api.blockcypher.com/v1/btc/test3/addrs/mwVnnxxm1oj9rxNYeGBFmcFCWeL7W7QwBC?unspaentOnly=true')
      axios.get(`https://api.blockcypher.com/v1/btc/test3/addrs/${address}?unspentOnly=true`)                     //--prodChange
      .then((res) => res.data)
      .then((obj) => this.getUTXOdetails(obj))
      .then(obj => console.log(obj))
      .catch((err) => console.log(err))


    } else if(this.props.currency === "Stellar") {
      try{
      const server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
      //StellarSdk.Network.useTestNetwork();
      console.log("stellar payment initiated");
      const userKeypair = StellarSdk.Keypair.fromSecret(this.props.currWallet.private_key);
      const userPublicKey = userKeypair.publicKey();
      console.log(this.props.currencyQty,"userkey",userPublicKey," and publickey", this.props.currWallet.public_key);
      const account = await server.loadAccount(userPublicKey);
      const fee = 200;
      const amount = this.props.currencyQty;
      console.log(account," account ",fee," fee and amount", amount);
      const transaction = new StellarSdk.TransactionBuilder(account, { fee: fee
        ,
        networkPassphrase: StellarSdk.Networks.TESTNET})
        // Add a payment operation to the transaction
        .addOperation(StellarSdk.Operation.payment({
          destination: this.props.clientAddress,
          asset: StellarSdk.Asset.native(),
          amount: amount
        }))
        // Make this transaction valid for the next 30 seconds only
        .setTimeout(60)
        // Uncomment to add a memo (https://www.stellar.org/developers/learn/concepts/transactions.html)
        // .addMemo(StellarSdk.Memo.text('Hello world!'))
        .build();

      // Sign this transaction with the secret key
      transaction.sign(userKeypair);

      // Let's see the XDR (encoded in base64) of the transaction we just built
      //console.log("");

      // Submit the transaction to the Horizon server. The Horizon server will then
      // submit the transaction into the network for us.
      const transactionResult = await server.submitTransaction(transaction);
      if (!!transactionResult) {
        console.log("ho gya stellar transfer::: ", transactionResult.hash)
        this.setState({
          isDisabled:false
        })
        this.props.finalPayment(this.props.currWallet.address, transactionResult.hash);
      } else {
        this.setState({
          isDisabled:false
        })
        toast.error("Error in submitting Stellar Transaction. Check Stellar Explorer")
      }
    }catch(error){
      console.log("Inside stellar error: ", error)
      toast.error(error);
    }
    } else if(this.props.currency === 'USDT') {
      var address = '0xD92E713d051C37EbB2561803a3b5FBAbc4962431';
      var abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_upgradedAddress","type":"address"}],"name":"deprecate","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_evilUser","type":"address"}],"name":"addBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"newBasisPoints","type":"uint256"},{"name":"newMaxFee","type":"uint256"}],"name":"setParams","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"issue","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"redeem","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_clearedUser","type":"address"}],"name":"removeBlackList","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_blackListedUser","type":"address"}],"name":"destroyBlackFunds","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"_initialSupply","type":"uint256"},{"name":"_name","type":"string"},{"name":"_symbol","type":"string"},{"name":"_decimals","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Issue","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"amount","type":"uint256"}],"name":"Redeem","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"newAddress","type":"address"}],"name":"Deprecate","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"feeBasisPoints","type":"uint256"},{"indexed":false,"name":"maxFee","type":"uint256"}],"name":"Params","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_blackListedUser","type":"address"},{"indexed":false,"name":"_balance","type":"uint256"}],"name":"DestroyedBlackFunds","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"AddedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_user","type":"address"}],"name":"RemovedBlackList","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"}];
      var result=0;
      let tokenAmount = this.props.currencyQty*1000000;
      console.log("abi: ", abi, address)
      try{
      const web3 = new Web3(new Web3.providers.HttpProvider(`https://rinkeby.infura.io/v3/6dab407582414625bc25b19122311c8b`)) //--prodChange
      let userAddress = web3.utils.toChecksumAddress(this.props.currWallet.address);
      const contract = new web3.eth.Contract(abi, address);
      //console.log("contract hai: ", contract)

      let pvtKey = this.props.currWallet.private_key;
        let rawTransaction = {
        "from": userAddress,
          "to": address,
          "value": '0x0',
          'gasPrice': web3.utils.toHex(20 * 1e9),
          'gasLimit': web3.utils.toHex(210000),
          "chainId": "0x04",
          "data": contract.methods.transfer(this.props.clientAddress, tokenAmount).encodeABI(),
          }; //--prodChange
          try
          {let signTransaction = web3.eth.accounts.signTransaction(rawTransaction, pvtKey, function(err, res){
            if(err)
            {console.log("Error occured in signtrxn",err)
            this.setState({
              isDisabled:false
            })
          }
            else
            {
              console.log("Sign trxn res: ", res);
              web3.eth.sendSignedTransaction(res.rawTransaction, function(err,res){
                if(err)
                { toast.error(`Error in sending trxn: ${err}`)
                this.setState({
                  isDisabled:false
                })
                  console.log("Error occured in sendDisngnedtrxnn", err)}
                else
                {
                  console.log("Send signed trxn res: ", res);
                  this.setState({
                    isDisabled:false
                  })
                  this.props.finalPayment(userAddress, res);
                }
              }.bind(this))
          }
        }.bind(this));
        } catch(error){
          toast.error(error)
          console.log("in catch of sending transaction trxn: ",error);
        }
      } catch(err){
        toast.error(`Error in usdt tranxn ${err}`)
          console.log("error in making USDT trxn")
      }
    }
  }

  makeTransaction = () => {
    if(this.props.paymentMode === 'viaMetamaskExt'){
      //console.log("sthereum payment started", this.props.metamaskAccount);
      let receiver = this.props.ethAddress;
      let sender = this.props.metamaskAccount;
      let amount = this.props.currencyQty;
      try{
        //const web3 = new Web3(window.web3.currentProvider);
        var txnhash = web3.eth.sendTransaction({to:receiver,
          from:sender, 
        value:web3.toWei(amount, "ether")}
          ,function (err, res){
            if(err){
              toast.error(`Error: ${err.message}`)
              //this.sets({transactionData:err, open:true})
            }else{
              //toast.success(`Trxn Hash:  ${res}`);
              toast(`Trxn Hash:  ${res}`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: 3,
                className: 'toast-success-container '
                });
              //this.makeFinalPayment(sender, res)
              this.props.finalPayment(sender, res)
              // console.log("txnHash:",res);
              
            }
          }.bind(this));
        
      }catch(error){
        console.log("error in send transactaion", error);
      }
      //console.log("buabuhaubuahbuhbauhabhuabuahbauhbaubhua, ", txnhash);
      
    } else if(this.props.paymentMode === 'viaPvtWallet'){
      const hash = document.getElementById("txhash").value;
        if(!hash){
          toast.error("Please enter the transaction hash");
          return ''
        }
            if (this.state.valid) {
              this.props.finalPayment(this.props.fromAddress, hash);
            } else {
              toast.error("Please enter a valid transaction hash");
            }
        //this.props.finalPayment(hash);
    }
  }


  //satoshi to BTC conversion
  satoshi_to_btc = (value) => Number((1e8 * value).toFixed(8));
  // End Container functions

  // Begin render function
  render() {
    console.log(this.props,"props in contribution confirm ");
    console.log(this.state,"state in contribution confirm ");
    if (this.props.usdEurContributionConfirm) {
      return (
        <div>
        </div>

        // <div id="content" className="ui-content ui-content-aside-overlay">
        //   <div className="ui-content-body">
        //     <div className="ui-container container-fluid">
        //       <div className="panel panel-default">
        //         <div className="panel-heading">Make Investment</div>
        //         <div className="panel-body" style={{ fontSize: "16px" }}>
        //           <div className="row">
        //             {
        //               // <div className="row">
        //               //   <div className='col-sm-12'>
        //               //   <span className="makeInvestment">Make Investment</span>
        //               //   </div>
        //               // </div>
        //             }
        //
        //             <div className="row">
        //               <div className="col-sm-12">
        //                 <div className="goBackImagecontainer">
        //                   <span className="goBackIcon">
        //                     <img
        //                       onClick={this.goBack}
        //                       src="/assets/img/waka.svg"
        //                       alt="goBack"
        //                     />
        //                   </span>
        //                 </div>
        //               </div>
        //               <div className="col-sm-12 makeinvestextcontainer">
        //                 <span className="makeinvesTExt">
        //                   You have chosen to make a contribution via a SWIFT
        //                   transfer. Please make this transfer using the banking
        //                   information below. if you need Instructions on how to
        //                   make a SWIFT transfer, the following article is
        //                   helpful for automatic or bank branch initiated
        //                   transfer:
        //                 </span>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 litagContainer">
        //                 <span className="litagText">
        //                   <a href="#">
        //                     How to Make an International Wire Transfer
        //                   </a>
        //                 </span>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 minimunReqContainer">
        //                 <span className="minimunReqText">
        //                   The Minimum enrollment amount required from each
        //                   investor for this offering is{" "}
        //                   {this.props.successData.minInvest} USD. Token price:{" "}
        //                   {this.props.successData.tokenUsd} USD
        //                 </span>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 companyDataContainer">
        //                 <div className="row">
        //                   <div className="col-sm-4">Bank Name</div>
        //                   <div className="col-sm-8">United Overseas Bank</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">
        //                     Bank Code
        //                   </div>
        //                   <div className="col-sm-8">7375</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Branch Name</div>
        //                   <div className="col-sm-8">
        //                   UOB Orchard
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Branch Code</div>
        //                   <div className="col-sm-8">068</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Branch Address</div>
        //                   <div className="col-sm-8"><div>230 Orchard Road</div>
        //                     <div>#01-230 Faber House</div>
        //                     <div>Singapore 238854</div>
        //                     <br/>
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Swift Code</div>
        //                   <div className="col-sm-8">UOVBSGSG</div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Account Number</div>
        //                   <div className="col-sm-8"><div>380-330-688-3(SGD)</div>
        //                     <div>380-946-743-9(USD)</div>
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //                   <div className="col-sm-4">Account Name</div>
        //                   <div className="col-sm-8">centralex</div>
        //                 </div>
        //               </div>
        //             </div>
        //             <div className="row">
        //               <div className="col-sm-12 afterCompleteContainer">
        //                 <span className="afterCompleteText">
        //                   After completing your investment (through a funds
        //                   transfer) please check the box below to continue.
        //                   You'll be notified once receipt of funds is confirmed
        //                 </span>
        //               </div>
        //             </div>
        //             {
        //               //   <div className='row'>
        //               //   <div className='col-md-12 checkboxContainer'>
        //               //   <span><input type='checkbox'></input> I have enrolled by contributing the amount above using my declared account/wallet</span>
        //               //   </div>
        //               //   <div>
        //               //   </div>
        //               // </div>
        //             }
        //
        //               <div className="buttonInputContainer">
        //                 <div className="row">
        //                   <div className="col-md-6">
        //                   <form onSubmit={this.confirmPayment}>
        //                     <div className="form-group enterBankAcc">
        //                       <label
        //                         htmlFor="bankAccNumber"
        //                         className="form-label"
        //                       >
        //                         Enter the Transaction number of Bank account
        //                       </label>
        //                       <input
        //                         id="txhash"
        //                         type="number"
        //                         className="form-input form-control"
        //                         required
        //                       />
        //
        //                     </div>
        //                   <div className='row'>
        //                   <div className="col-md-6">
        //                   <input
        //                     type="submit"
        //                     className="form-button btn btn-primary"
        //                     value="Confirm"
        //                     style={{ margin: "10px" }}
        //                   />
        //                   </div>
        //                   <div className="col-md-6">
        //                     <button
        //                       className="form-button btn btn-primary"
        //                       style={{ margin: "10px" }}
        //                       onClick={this.goBack}
        //                     >
        //                       Go Back
        //                     </button>
        //                   </div>
        //                   </div>
        //                      </form>
        //                   </div>
        //                 </div>
        //                 <div className="row">
        //
        //                 </div>
        //               </div>
        //
        //           </div>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </div>

      );
    } else {
      return (
        <div id="content" className="ui-content ui-content-aside-overlay">
          <div className="ui-content-body">
            <div className="ui-container container-fluid">
              <div className="row confirm-payment-card">
              <div className="col-sm-12">
                <IconButton
                disableRipple
                onClick={this.goBack}
                >
                  <ArrowBackIosIcon
                    style={{color : '#2D6DCD' , fontSize : '24px' , backgroundColor : 'transparent' }}
                  />
                </IconButton>
              </div>
              <div className="col-sm-12 nomarginpadding">
                <hr style={{borderBottom : '1px solid #D6E4FE' , marginTop : '0' }} />
              </div>
              <div className="col-sm-3">
                <div className="purchase-container">
                     <h3 className="main-color--blue" style={{ fontSize : '22px' ,font: 'normal normal bold 19px/23px Lato' }}>Purchase Status</h3>
                      <h5 style={{ color : '#2D6DCD' , fontWeight : 'lighter' , marginTop : '3.5em' }} >Purchase Initiated</h5>    
                      <div className="step-conatiner"> 
                     <Steps progressDot current={0} direction="vertical" labelPlacement="horizontal">
                      <Step />
                      <Step />
                    </Steps>
                    </div>
                    <h5 style={{ color : '#2D6DCD' , fontWeight : 'lighter' , marginTop : '1.5em' }} >Purchase Confirmation</h5>    
                </div>
              </div>
              <div className="col-sm-1">
                <hr className="contribution-hr" />
              </div>
              <div className="col-sm-8">
                <div className="purchase-container">
                  <h4 className="main-color--blue">Confirm Payment</h4>
                  <p className="main-color--blue">
                    {/* {this.props.paymentMode == 'viaMetamaskExt'?'This is the QR code of SWAN`s Ethereum address':
                        `Scan this Address QR Code from your${" "}
                        ${this.props.currency} wallet${" "}`
                    } */}
                    This is the QR code SWAN's {this.state.curr} address
                 </p>
                  <div className="qr-code" style={{ }}>
                      {this.props.currency === "Bitcoin" ? (
                        <img src={this.state.url} alt="" />
                      ) : (
                        <img src={this.state.url} alt="" />
                      )}
                  </div>
                  <p className="main-color--blue">
                  Click the button below to send the indicated amount to this {this.props.currency} Address </p>
                 <div style={{width: '27em' , position: 'relative', marginBottom : '20px'}}>
                              <input value={`${this.props.currencyQty} ${this.props.currency}`}
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input" style={{textAlign:'center', font: 'normal 18px Lato'}}
                              />
                            <CopyToClipboard text={this.props.currencyQty}
                              onCopy={() => {this.setState({copied: true});
                               toast.success("Copied");
                              }}>
                              <span className="file-copy-conatiner">
                              <FileCopyOutlinedIcon
                                style={{ outline : 'none' ,fontSize : '20px'  }}
                                />
                              </span>
                            </CopyToClipboard>
                        </div>
                        <div style={{width: '27em' , position: 'relative', marginBottom : '20px'}}>
                            <input value={this.props.clientAddress }
                              onChange={({target: {value}}) => this.setState({value, copied: false})}
                              className="copy-input " style={{textAlign:'center', font: 'normal 18px Lato'}}
                              />
                            <CopyToClipboard text={this.props.clientAddress}
                              onCopy={() => {this.setState({copied: true});
                               toast.success("Copied");
                              }}>
                              <span className="file-copy-conatiner">
                              <FileCopyOutlinedIcon
                                style={{ outline : 'none' ,fontSize : '20px'  }}
                                />
                              </span>
                            </CopyToClipboard>
                        </div>

                 <p className="main-color--blue">
                 You will receive {(this.props.tokens).toFixed(3)} SWAN tokens </p>
                 <br />
                 {this.props.currency == 'Ethereum'?<div>Transaction Fee: {(this.state.gasPrice * 21000).toFixed(10)}</div>:<div></div>}
                 <div className="btn-row confirm-transaction-button">
                    {this.state.isDisabled?<button 
                     className="form-button btn btn-primary"
                     style={{ marginBottom : '20px' }}
                     
                   >
                     Processing...
                   </button>
                   :
                   <button 
                     className="form-button btn btn-primary"
                     style={{ marginBottom : '20px' }}
                     onClick={() => this.initiateTransaction()}
                   >
                     Initiate Payment
                   </button>}
                 </div>
                 {/* {
                    this.props.paymentMode === 'viaMetamaskExt' ? <div className="btn-row confirm-transaction-button">
                    <button 
                     className="form-button btn btn-primary"
                     style={{ marginBottom : '20px' }}
                     onClick={() => this.makeTransaction()}
                   >
                     Initiate Payment
                   </button>
                 </div> : 
                 <div style={{width: '32em' , position: 'relative'}}>
                 <p className="main-color--blue">
                   Please paste your transaction's TX hash below
                   and click Confirm:{" "}
                 </p>
                 <div style={{width: '32em' , position: 'relative', marginLeft:'-20px'}}>
                 <input
                   required
                   id="txhash"
                   onChange={this.txValidator}
                   type="text"
                   //className="form-input form-control main-color--blue"
                   placeholder="Paste your payment's transaction hash"
                   className="copy-input" style={{textAlign:'center', font: 'normal 17px Lato'}}
                 />
                    <span >
                   <button
                   className="file-copy-conatiner"
                     style={{ outline : 'none' ,fontSize : '19px'  }}
                     onClick={() => this.makeTransaction()}
                   >
                     Confirm
                   </button>
                   </span>
                   </div>
                      {this.state.valid || this.state.validBlank ? (
                        <p />
                      ) : (
                        <p style={{ color: "#ff0000" }}>
                          Please enter a valid Transaction Hash
                        </p>
                      )}
               </div>

                  } */}
                  <hr className="qr-code-hr" />
                  
                            {/* {
                              <div className="btn-row confirm-transaction-button">
                               <button
                                className="form-button btn btn-primary"
                                type="submit"
                                style={{ marginBottom : '20px' }}
                              >
                                Confirm
                              </button>
                            </div>
                            }

                          { 
                           <div className="blockchain-tx">
                              <p className="main-color--blue">
                                Please paste your blockchain TX hash below
                                and click Confirm:{" "}
                                <span>
                                  {this.props.currency === "Bitcoin" ? (
                                    <h4>{this.props.btcAddress}</h4>
                                  ) : (
                                    <h4>{this.props.ethAddress}</h4>
                                  )}
                                </span>
                              </p>
                              <input
                                required
                                id="txhash"
                                onChange={this.txValidator}
                                type="text"
                                className="form-input form-control main-color--blue"
                                placeholder="Paste hash payment code"
                              />
                            </div> */}
                  <div className="confirm-block" style={{maxWidth:'35em' , textAlign : 'center' }}>
                        {  
                        // <ol>
                        //     <li className="main-color--blue">
                        //       Wallet address to deposit{" "}
                        //       <strong>
                        //         {this.props.currencyQty}{" "}
                        //         {this.props.currency === "Ethereum"
                        //           ? "ETH"
                        //           : "BTC"}
                        //       </strong>{" "}
                        //       for purchase of{" "}
                        //       <strong>
                        //         {this.props.tokens} Centralex Tokens
                        //       </strong>
                        //       <div className="mt-10">
                        //         <div className="mt-20">
                        //           <div className="blockchain-tx text-center ">
                        //             <p>
                        //               <span>
                        //                 <h4
                        //                   id="address"
                        //                   defaultValue={
                        //                     this.props.ethAddress
                        //                   }
                        //                 >
                        //                   {this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
                        //                 </h4>
                        //                 {/* <button style={{margin:"10px" ,borderRadius:"30px"}} className="form-buy-button" onClick={this.copyFunction}> */}
                        //                 <div className="row">
                        //                   <div className="col-sm-6">
                        //                     <CopyToClipboard
                        //                       text={this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
                        //                       onCopy={() =>
                        //                         this.setState({
                        //                           copy: true
                        //                         })
                        //                       }
                        //                     >
                        //                       <button
                        //                         style={{
                        //                           borderRadius: "30px"
                        //                         }}
                        //                         className="form-button"
                        //                       >
                        //                         Copy
                        //                       </button>
                        //                     </CopyToClipboard>
                        //                   </div>
                        //                   <div
                        //                     className="col-sm-6"
                        //                     style={{ paddingTop: "10px" }}
                        //                   >
                        //                     {this.state.copy ? (
                        //                       <p>Address Copied</p>
                        //                     ) : (
                        //                       ""
                        //                     )}
                        //                   </div>
                        //                 </div>
                        //               </span>
                        //             </p>
                        //             {!(
                        //               this.props.currency === "Bitcoin"
                        //             ) ? (
                        //               <div className="row">
                        //                 <div className="col-md-6 ">
                        //                   <span className="gas1">
                        //                     SET GAS LIMIT:
                        //                     {this.props.gasLimit
                        //                       ? this.props.gasLimit
                        //                       : `120000`}
                        //                   </span>
                        //                 </div>
                        //                 <div className="col-md-6 ">
                        //                   <span className="gas2">
                        //                     SET GAS PRICE:
                        //                     {this.props.gasPrice
                        //                       ? this.props.gasPrice
                        //                       : 95}{" "}
                        //                     GWei
                        //                   </span>
                        //                 </div>
                        //               </div>
                        //             ) : (
                        //               ""
                        //             )}
                        //           </div>
                        //         </div>
                        //       </div>
                        //     </li>
                        //     <li className="main-color--blue">
                        //       Please visit your cryptocurrency wallet and
                        //       make payment to the above address.
                        //     </li>
                        //     <li className="main-color--blue">
                        //       Only send{" "}
                        //       {this.props.currency === "Bitcoin"
                        //         ? "BTC"
                        //         : "ETH"}{" "}
                        //       to this address
                        //     </li>
                        //       {this.props.currency=='Ethereum'? <li className="main-color--blue">
                        // Don't make payment through exchange.You can
                        //       use Metmask, MyEtherWallet, Mist Wallet etc
                        //     </li>:""}
                        //     <li className="main-color--blue">
                        //       To avoid delays, you must paste and confirm
                        //       your Blockchain TX Code as soon as available
                        //       and confirm for our records.
                        //     </li>
                        //   </ol>
                          }
                          {/* <form onSubmit={this.confirmPayment}> */}
                            <div className="transaction-time">
                            <p className="main-color--blue">
                            Time of initiation : {this.state.curTime}
                             <br/>
                             This transaction will expire within 5 hours of initiation.
                            </p>
                            <p className="main-color--blue">
                            Any payments after 5 hours will receive tokens based on the exchange 
                            rate at that time of payment.
                            </p>
                            </div>
                            {
                            //   <div className="btn-row confirm-transaction-button">
                            //    <button
                            //     className="form-button btn btn-primary"
                            //     type="submit"
                            //     style={{ marginBottom : '20px' }}
                            //   >
                            //     Confirm
                            //   </button>
                            // </div>
                            }

                          { 
                          //  <div className="blockchain-tx">
                          //     <p className="main-color--blue">
                          //       Please paste your blockchain TX hash below
                          //       and click Confirm:{" "}
                          //       <span>
                          //         {this.props.currency === "Bitcoin" ? (
                          //           <h4>{this.props.btcAddress}</h4>
                          //         ) : (
                          //           <h4>{this.props.ethAddress}</h4>
                          //         )}
                          //       </span>
                          //     </p>
                          //     <input
                          //       required
                          //       id="txhash"
                          //       onChange={this.txValidator}
                          //       type="text"
                          //       className="form-input form-control main-color--blue"
                          //       placeholder="Paste hash payment code"
                          //     />
                          //   </div>
                          //   {this.state.valid || this.state.validBlank ? (
                          //     <p />
                          //   ) : (
                          //     <p style={{ color: "#ff0000" }}>
                          //       Please enter a valid Transaction Hash
                          //     </p>
                          //   )}
                          //   <div className="btn-row">
                          //     <button
                          //       className="form-button btn btn-primary"
                          //       type="submit"
                          //       style={{ marginBottom : '20px' }}
                          //     >
                          //       Confirm
                          //     </button>
                          //   </div>
                            }
                          {/* </form> */}
                        </div>
                      </div>
                    </div>
                    </div>
             
             
             
             {
              //   <div className="panel panel-default">
              //   <div className="panel-heading">Confirm Payment</div>
              //   <div className="panel-body" style={{ fontSize: "16px" }}>
              //     <div className="row">
              //       <div className="col-sm-12">
              //         <div className="contribution">
              //           <div className="row">
              //             <div className="col-sm-12 col-md-12 text-center">
              //               <h2>You are almost there!</h2>
              //               {/* <h4> Time remaining for this transaction: <span style={{ color: '#ff0000' }}>{this.props.min}:{this.props.sec}</span> (mm:ss)</h4> */}
              //               {/* <div id="timer"></div> */}
              //             </div>
              //           </div>

              //           <div className="confirm-block">
              //             <div className="row">
              //               <div className="col-sm-12 col-md-6">
              //                 <ol>
              //                   <li>
              //                     Wallet address to deposit{" "}
              //                     <strong>
              //                       {this.props.currencyQty}{" "}
              //                       {this.props.currency === "Ethereum"
              //                         ? "ETH"
              //                         : "BTC"}
              //                     </strong>{" "}
              //                     for purchase of{" "}
              //                     <strong>
              //                       {this.props.tokens} Centralex Tokens
              //                     </strong>
              //                     <div className="mt-10">
              //                       <div className="mt-20">
              //                         <div className="blockchain-tx text-center ">
              //                           <p>
              //                             <span>
              //                               <h4
              //                                 id="address"
              //                                 defaultValue={
              //                                   this.props.ethAddress
              //                                 }
              //                               >
              //                                 {this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
              //                               </h4>
              //                               {/* <button style={{margin:"10px" ,borderRadius:"30px"}} className="form-buy-button" onClick={this.copyFunction}> */}
              //                               <div className="row">
              //                                 <div className="col-sm-6">
              //                                   <CopyToClipboard
              //                                     text={this.props.currency=="Ethereum"?this.props.ethAddress:this.props.btcAddress}
              //                                     onCopy={() =>
              //                                       this.setState({
              //                                         copy: true
              //                                       })
              //                                     }
              //                                   >
              //                                     <button
              //                                       style={{
              //                                         borderRadius: "30px"
              //                                       }}
              //                                       className="form-button"
              //                                     >
              //                                       Copy
              //                                     </button>
              //                                   </CopyToClipboard>
              //                                 </div>
              //                                 <div
              //                                   className="col-sm-6"
              //                                   style={{ paddingTop: "10px" }}
              //                                 >
              //                                   {this.state.copy ? (
              //                                     <p>Address Copied</p>
              //                                   ) : (
              //                                     ""
              //                                   )}
              //                                 </div>
              //                               </div>
              //                             </span>
              //                           </p>
              //                           {!(
              //                             this.props.currency === "Bitcoin"
              //                           ) ? (
              //                             <div className="row">
              //                               <div className="col-md-6 ">
              //                                 <span className="gas1">
              //                                   SET GAS LIMIT:
              //                                   {this.props.gasLimit
              //                                     ? this.props.gasLimit
              //                                     : `120000`}
              //                                 </span>
              //                               </div>
              //                               <div className="col-md-6 ">
              //                                 <span className="gas2">
              //                                   SET GAS PRICE:
              //                                   {this.props.gasPrice
              //                                     ? this.props.gasPrice
              //                                     : 95}{" "}
              //                                   GWei
              //                                 </span>
              //                               </div>
              //                             </div>
              //                           ) : (
              //                             ""
              //                           )}
              //                         </div>
              //                       </div>
              //                     </div>
              //                   </li>
              //                   <li>
              //                     Please visit your cryptocurrency wallet and
              //                     make payment to the above address.
              //                   </li>
              //                   <li>
              //                     Only send{" "}
              //                     {this.props.currency === "Bitcoin"
              //                       ? "BTC"
              //                       : "ETH"}{" "}
              //                     to this address
              //                   </li>
              //                     {this.props.currency=='Ethereum'? <li>
              //               Don't make payment through exchange.You can
              //                     use Metmask, MyEtherWallet, Mist Wallet etc
              //                   </li>:""}
              //                   <li>
              //                     To avoid delays, you must paste and confirm
              //                     your Blockchain TX Code as soon as available
              //                     and confirm for our records.
              //                   </li>
              //                 </ol>
              //                 <form onSubmit={this.confirmPayment}>
              //                   <div className="blockchain-tx">
              //                     <p>
              //                       Please paste your blockchain TX hash below
              //                       and click Confirm:{" "}
              //                       <span>
              //                         {this.props.currency === "Bitcoin" ? (
              //                           <h4>{this.props.btcAddress}</h4>
              //                         ) : (
              //                           <h4>{this.props.ethAddress}</h4>
              //                         )}
              //                       </span>
              //                     </p>
              //                     <input
              //                       required
              //                       id="txhash"
              //                       onChange={this.txValidator}
              //                       type="text"
              //                       className="form-input form-control"
              //                       placeholder="Paste hash payment code"
              //                     />
              //                   </div>
              //                   {this.state.valid || this.state.validBlank ? (
              //                     <p />
              //                   ) : (
              //                     <p style={{ color: "#ff0000" }}>
              //                       Please enter a valid Transaction Hash
              //                     </p>
              //                   )}
              //                   <div className="btn-row">
              //                     <button
              //                       className="form-button btn btn-primary"
              //                       type="submit"
              //                     >
              //                       Confirm
              //                     </button>
              //                     <button
              //                       className="form-button btn btn-primary"
              //                       style={{ margin: "10px" }}
              //                       onClick={this.goBack}
              //                     >
              //                       Go Back
              //                     </button>
              //                   </div>
              //                 </form>
              //               </div>
              //               <div className="col-sm-12 col-md-6">
              //                 <div className="qr-code">
              //                   <h4>
              //                     {" "}
              //                     <text style={{ fontSize: "25px" }}>
              //                       OR
              //                     </text>{" "}
              //                     Scan this Address QR Code from your{" "}
              //                     {this.props.currency} wallet{" "}
              //                   </h4>
              //                   {this.props.currency === "Bitcoin" ? (
              //                     <img src={this.state.url} alt="" />
              //                   ) : (
              //                     <img src={this.state.url} alt="" />
              //                   )}
              //                 </div>
              //               </div>
              //             </div>
              //           </div>
              //         </div>
              //       </div>
              //     </div>
              //   </div>
              // </div>
             }
            
            </div>
          </div>
        </div>
      );
    }
  }
}

ContributionConfirm.propTypes = {
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  contributionconfirm: makeSelectContributionConfirm()
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const withReducer = injectReducer({ key: "contributionConfirm", reducer });
const withSaga = injectSaga({ key: "contributionConfirm", saga });

export default compose(
  withReducer,
  withSaga,
  withConnect
)(ContributionConfirm);
