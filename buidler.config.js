usePlugin('@nomiclabs/buidler-truffle5')
usePlugin('solidity-coverage')
usePlugin('buidler-gas-reporter')

const fs = require('fs');
const path = require('path'); 
const infuraKey = fs.readFileSync(path.resolve(__dirname, '.infuraKey')).toString().trim(); 
const mnemonic = fs.readFileSync(path.resolve(__dirname, '.secret')).toString().trim()

// You have to export an object to set up your config
// This object can have the following optional entries:
// defaultNetwork, networks, solc, and paths.
// Go to https://buidler.dev/config/ to learn more 
module.exports = {
  defaultNetwork: 'buidlerevm',
  networks: {
    buidlerevm: {
      chainId: 31337,
      gas:9500000,                // default:auto
      gasPrice:8000000000,        // default:auto
      gasMultiplier:1,            // default:1
      HardhatNetworkHDAccountsConfig:{
        // mnemonic:"test test test test test test test test test test test junk",
        mnemonic:`${mnemonic}`,
        initialIndex:0,
        path:"m/44'/60'/0'/0",
        count:20,
        accountsBalance:10000
      },
      blockGasLimit:9500000,
      hardfork:'istanbul', // byzantium/constantinople/petersburg/istanbul/muirGlacier
      throwOnTransactionFailures:true,
      throwOnCallFailures:true,
      // initialDate:'2020-10-30T14:48:00',
      allowUnlimitedContractSize:false,
      forking:{
        url:`https://rinkeby.infura.io/v3/${infuraKey}`,
        chainId:4,
        // blockNumber:123123123,
        timeout:20000,
        enabled:false
      }
    },
    coverage: { url: 'http://127.0.0.1:8555' },
    localhost: { url: "http://127.0.0.1:8545" },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${infuraKey}`,
      chainId:4,
      // accounts: [{privateKey: string, balance: string}],
      timeout:20000,
    },
  },
  solc: {
    version: '0.7.0',
    optimizer: {
      enabled: true,
      runs: 20000,
    },
  },
  gasReporter: {
    enabled: true,
  },
  paths: {
    sources: './contracts',
    tests: './test',
    cache: './cache',
    coverage: './coverage',
    coverageJson: './coverage.json',
    artifacts: './artifacts',
  },
}
