import React, { Component } from 'react';
import Arweave from 'arweave/web';



class Data extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hash: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        }

    componentDidMount() {
        const arweave = Arweave.init();
        this.setState({
            arweave
        })
    }
    onSubmit(e) {
        e.preventDefault();
        console.log(this.hash.value)
        this.setState({
            hash: this.hash.value,
        })
        this.getTransactionData();
    }

    async getTransactionData(){
        const txid = await this.state.arweave.arql({
            op: "equals",
            expr1: "IPFS-Add",
            expr2: this.state.hash
        })
        console.log(txid)
        this.state.arweave.transactions.getData(txid[0], {decode: true, string: true}).then(data => {
        console.log(data)
        alert(data);
         })
    }
    render() { 
        return (
            <div>
            <form onSubmit={this.onSubmit}>
            <h4>Get Arweave Transaction Data</h4>
                 <div className="form-group mr-sm-2">
                   <input
                     id="hash"
                     type="text"
                     ref={(input) => { this.hash = input }}
                     className="form-control"
                     placeholder="IPFS Hash"
                     required />
                 </div>
                 <button type="submit" className="btn btn-primary">Get Transaction Data</button>
               </form>
            </div>
          );
    }
}
 
export default Data;