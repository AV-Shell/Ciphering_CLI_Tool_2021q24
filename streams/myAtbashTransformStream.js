const AtbashCipheringMachine = require("../utils/atbashCipher");
const { Transform } = require("stream");

class MyAtbashTransform extends Transform {
  constructor() {
    super();
    this.AtbashMachine = new AtbashCipheringMachine();
  }
  _transform(chunk, encoding, callback) {
    try {
      const resultString = this.AtbashMachine.encrypt(chunk.toString("utf-8"));
      callback(null, resultString);
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = MyAtbashTransform;
