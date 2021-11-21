const { CustomError } = require('./errors');
const { atbashAlphabet } = require('../utils/constants');

class AtbashCipheringMachine {
  encrypt(message) {
    if (typeof message !== 'string') {
      throw CustomError('Incoming message not a string type');
    }
    let newarr = [];
    for (let i = 0; i < message.length; i++) {
      newarr.push(atbashAlphabet[message[i]] ?? message[i]);
    }

    return newarr.join('');
  }
}

module.exports = AtbashCipheringMachine;
