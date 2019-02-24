const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const password = '123abc!';

bcrypt.genSalt(15, (err, salt) => {
  bcrypt.hash(password, salt, (error, hash) => {
    console.log(hash);
  });
});

const hashedPassword =
  '$2a$10$yX7.2GL.VT6kpwPROP39SurkKvGzHxBTRQ9H9NG9BUzQQ6B8/xBG6';
const hashedPassword2 =
  '$2a$15$Yz1VgQ0ppWp8RORpwGjDCOU43qc9uQjE4apTplCx91.0ptCB0Yv4y';
bcrypt.compare(password, hashedPassword2, (err, res) => {
  console.log(res);
});
// const data = {
//   id: 10
// };
// const token = jwt.sign(data, 'nimamameiyoumao');
// console.log(token);
// const decoded = jwt.verify(token, 'nimamameiyoumao');
// console.log(decoded);

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
