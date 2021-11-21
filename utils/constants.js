const code_A = 'A'.charCodeAt(0);
const code_Z = 'Z'.charCodeAt(0);
const code_a = 'a'.charCodeAt(0);
const code_z = 'z'.charCodeAt(0);
const DEBUG_LOG_ENABLE = false;

const atbashAlphabet = {};
for (let i = code_A, j = 0; i <= code_Z; i++, j++) {
  atbashAlphabet[String.fromCodePoint(i)] = String.fromCodePoint(code_Z - j);
}
for (let i = code_a, j = 0; i <= code_z; i++, j++) {
  atbashAlphabet[String.fromCodePoint(i)] = String.fromCodePoint(code_z - j);
}

module.exports = {
  DEBUG_LOG_ENABLE,
  code_A,
  code_Z,
  code_a,
  code_z,
  atbashAlphabet,
};
