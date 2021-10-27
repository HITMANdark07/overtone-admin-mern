import Web3 from 'web3'

let getWeb3 = new Promise(function(resolve, reject) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
    window.addEventListener('load', function() {
    var results
    const testnet = `https://ropsten.infura.io/v3/f5c7e5dd1dc043a483c77cfcd69683a5`;
    const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
    console.log("web3valueis",web3);
    results = {
      web3: web3
    }

  });
});

export default getWeb3
