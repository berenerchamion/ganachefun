const Web3 = require('web3')
const EthereumTransaction = require('ethereumjs-tx').Transaction

// Self hosted ganache ethereum blockchain
const url = 'HTTP://127.0.0.1:7545'
const sendingAddress = '0xaA279Edb9741681c4E3Ff3821fEa3801B6Ce9e12'
const receivingAddress = '0x9aa1e39998DF63A84052D9ed88Fea6362c4Da143'

var web3 = new Web3(url)

var rawTransaction = {
  nonce: web3.utils.toHex(3),
  to: receivingAddress,
  gasPrice: web3.utils.toHex(30000000),
  gasLimit: web3.utils.toHex(30000),
  value: web3.utils.toHex(100),
  data: web3.utils.toHex('')
}

const privateKeySender = '856d8fa620918a8c97ad9bc27a4ea0c47d7826aea8259449ac03e41ca60bf84b'
const privateKeySenderHex = Buffer.from(privateKeySender, 'hex')
var transaction = new EthereumTransaction(rawTransaction)
transaction.sign(privateKeySenderHex)

var serializedTransaction = transaction.serialize()
web3.eth.sendSignedTransaction(serializedTransaction)

console.log('Transaction Sent')
web3.eth.getBalance(sendingAddress).then(console.log)
web3.eth.getBalance(receivingAddress).then(console.log)
