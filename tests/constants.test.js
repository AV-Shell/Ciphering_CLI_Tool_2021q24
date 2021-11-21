const { expect } = require('@jest/globals');
const constants = require('../utils/constants');

test('should', () => {
  const { DEBUG_LOG_ENABLE, code_A, code_Z, code_a, code_z, atbashAlphabet } =
    constants;
  expect(code_A).toBe(65);
  expect(code_Z).toBe(90);
  expect(code_a).toBe(97);
  expect(code_z).toBe(122);
  expect(atbashAlphabet).toEqual({
    A: 'Z',
    B: 'Y',
    C: 'X',
    D: 'W',
    E: 'V',
    F: 'U',
    G: 'T',
    H: 'S',
    I: 'R',
    J: 'Q',
    K: 'P',
    L: 'O',
    M: 'N',
    N: 'M',
    O: 'L',
    P: 'K',
    Q: 'J',
    R: 'I',
    S: 'H',
    T: 'G',
    U: 'F',
    V: 'E',
    W: 'D',
    X: 'C',
    Y: 'B',
    Z: 'A',
    a: 'z',
    b: 'y',
    c: 'x',
    d: 'w',
    e: 'v',
    f: 'u',
    g: 't',
    h: 's',
    i: 'r',
    j: 'q',
    k: 'p',
    l: 'o',
    m: 'n',
    n: 'm',
    o: 'l',
    p: 'k',
    q: 'j',
    r: 'i',
    s: 'h',
    t: 'g',
    u: 'f',
    v: 'e',
    w: 'd',
    x: 'c',
    y: 'b',
    z: 'a',
  });
  expect(DEBUG_LOG_ENABLE).toBeDefined;
});
