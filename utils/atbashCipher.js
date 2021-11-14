const { CustomError } = require("./errors");

const DEBUG_LOG_ENABLE = false;
const code_A = "A".charCodeAt(0);
const code_Z = "Z".charCodeAt(0);
const code_a = "a".charCodeAt(0);
const code_z = "z".charCodeAt(0);

const alphabet = {};
for (let i = code_A, j = 0; i <= code_Z; i++, j++) {
  alphabet[String.fromCodePoint(i)] = String.fromCodePoint(code_Z - j);
}
for (let i = code_a, j = 0; i <= code_z; i++, j++) {
  alphabet[String.fromCodePoint(i)] = String.fromCodePoint(code_z - j);
}

if (DEBUG_LOG_ENABLE) console.log("Atbash alphabet", alphabet);

class AtbashCipheringMachine {
  constructor() {
    if (DEBUG_LOG_ENABLE) console.log("Atbash MAchine");
  }

  encrypt(message) {
    if (typeof message !== "string") {
      throw CustomError("Incoming message not a string type");
    }
    if (DEBUG_LOG_ENABLE) console.log("Incoming message:", message);
    let newarr = [];
    for (let i = 0; i < message.length; i++) {
      newarr.push(alphabet[message[i]] ?? message[i]);
    }

    return newarr.join("");
  }
}

module.exports = AtbashCipheringMachine;
