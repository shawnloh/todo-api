const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

const data = {
  id: 10
};
const token = jwt.sign(data, 'nimamameiyoumao');
console.log(token);
const decoded = jwt.verify(token, 'nimamameiyoumao');
console.log(decoded);

// const message = 'i am user number 3';

// const hash = SHA256(message).toString();
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

// const data = {
//   id: 4
// };

// const token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// const resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if (resultHash === token.hash) {
//   console.log('data was not change');
// } else {
//   console.log('Data was changed, Do not trust!');
// }
