const { CustomError } = require('./errors');

const { code_A, code_Z, code_a, code_z } = require('../utils/constants');

class CaesarCipheringMachine {
  constructor(action, shift) {
    if (typeof action === 'string' && action === 'encode') {
      this.en_type = true;
      this.shift = shift;
    } else {
      this.en_type = false;
      this.shift = 26 - shift;
    }
    if (this.shift < 0) {
      this.shift = (this.shift % 26) + 26;
    }
  }

  encrypt(message) {
    if (typeof message !== 'string') {
      throw CustomError('Incoming message not a string type');
    }
    let newarr = [];
    for (let i = 0; i < message.length; i++) {
      if (
        message.codePointAt(i) <= code_z &&
        message.codePointAt(i) >= code_a
      ) {
        newarr.push(
          String.fromCodePoint(
            ((message.codePointAt(i) - code_a + this.shift) % 26) + code_a,
          ),
        );
      } else if (
        message.codePointAt(i) <= code_Z &&
        message.codePointAt(i) >= code_A
      ) {
        newarr.push(
          String.fromCodePoint(
            ((message.codePointAt(i) - code_A + this.shift) % 26) + code_A,
          ),
        );
      } else {
        newarr.push(message[i]);
      }
    }

    return newarr.join('');
  }
}

module.exports = CaesarCipheringMachine;
