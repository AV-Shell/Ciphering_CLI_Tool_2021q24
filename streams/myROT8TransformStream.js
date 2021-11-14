const CaesarCipheringMachine = require("../utils/caesarCipher");
const { Transform } = require("stream");

class myROT8Transform extends Transform {
  constructor(action) {
    super();
    this.caesarMachine = new CaesarCipheringMachine(action, 8);
  }
  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.caesarMachine.encrypt(chunk.toString("utf-8"));
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = myROT8Transform;
