
 import './qrBarCode/qr.css'; 
import React from 'react';
import Html5QrcodePlugin from './qrBarCode/Html5QrcodePlugin.jsx'
import ResultContainerPlugin from './qrBarCode/ResultContainerPlugin.jsx'
import HowToUse from './qrBarCode/HowToUse.jsx'



class Issuanceofproductionsteps extends React.Component {
   constructor(props) {
    
    super(props);
    this.state = {
      decodedResults: []
    }

    // This binding is necessary to make `this` work in the callback.
    this.onNewScanResult = this.onNewScanResult.bind(this);
  } 

  render() {
    return (
      <div className="App">
        <section className="App-section">
          <div className="App-section-title"></div>
          
          <Html5QrcodePlugin 
            fps={10}
            qrbox={250}
            disableFlip={false}
            qrCodeSuccessCallback={this.onNewScanResult}/>
         <ResultContainerPlugin results={this.state.decodedResults} />
        </section>
      </div>
    );
  }

   onNewScanResult(decodedText, decodedResult) {
    console.log(
      "App [result]", decodedResult);

    // let decodedResults = this.state.decodedResults;
    // decodedResults.push(decodedResult);
    this.setState((state, props) => {
      state.decodedResults.push(decodedResult);
      return state;
    });
  } 
}

export default Issuanceofproductionsteps;