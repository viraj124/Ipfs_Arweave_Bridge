import React, { Component } from 'react';
import Arweave from 'arweave/web';


const ipfsClient = require('ipfs-http-client');
var ipfs = ipfsClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })


class Bridge extends Component {
    constructor(props) {
        super(props);
        this.state = {
          buffer : null,
          address: '',
          isWalletUploaded: false
        };
      }
      
      async componentWillMount() {
        await this.setupArweaveClient()
      }
      
        captureFile = (event) => {
        event.preventDefault();
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => {
          this.setState({buffer : Buffer(reader.result)})
          }
        }
      
        getwallet = (event) => {
          event.preventDefault()
          let wallet
          const fileReader = new FileReader();
          fileReader.onload = async (e) => {
            wallet = JSON.parse(e.target.result);
            const address = await this.state.arweave.wallets.jwkToAddress(wallet)
            this.setState({ wallet })
            this.setState({ isWalletUploaded: true})
            this.setState({ address })
            alert("Wallet Uploaded")
          }
          fileReader.readAsText(event.target.files[0]);
        }
      
      
        async setupArweaveClient() {
          const arweave = Arweave.init();
          this.setState({ arweave })
        }
      
        async setuptransaction(hash) {
          let transaction = await this.state.arweave.createTransaction({
            data: this.state.buffer,
        }, this.state.wallet);
           transaction.addTag('Dapp', 'Viraz-IPFS-Arweave-Bridge')
           transaction.addTag('IPFS-Add', hash);
           await this.state.arweave.transactions.sign(transaction, this.state.wallet);
           const response = await this.state.arweave.transactions.post(transaction);
           console.log(response)
           alert("Transaction Status: " + response['status'])
        }
    
      
      conditionalRendering() {
        if(!this.state.isWalletUploaded) {
          return <div><h5>Upload Wallet</h5><input type ="file" name="Upload Wallet" onChange = { this.getwallet }/></div>
        } else {
          return  <div><h5>Upload File</h5><input type ="file" name="Upload File" onChange = { this.captureFile }/></div>
        }
      }
      
         onSubmit =  event => {
          event.preventDefault();
          console.log('submitted');
          ipfs.add(this.state.buffer, (error, result) => {
             console.log('IPFS Result', result)
               var hash = result[0].hash;
             if (error) {
               console.log(error);
               alert(error)
               return;
             }
             alert("Hash: " + hash)
             this.setuptransaction(hash)
          })
        }    
        render() { 
        return ( 
            <div className="container-fluid mt-5">
            <div className="row">
              <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                  <form onSubmit = {this.onSubmit}>
                  <h4>Upload IPFS Data To Arweave</h4>
                    {this.conditionalRendering()}
                    <p>&nbsp;</p>
                    <input type = "submit" name="Send To Arweave" />
                    </form>
                </div>
              </main>
            </div>
          </div>
         );
    }
}
 
export default Bridge;