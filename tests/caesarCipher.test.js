const CaesarCipheringMachine = require('./../utils/caesarCipher');
jest.mock('../utils/constants')

describe('Config validator', () => {
  const testStringsShift1 = [
    ['a', 'b'],
    ['zZ', 'aA'],
    ['AaBb', 'BbCc'],
    [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()абвАБВтест',
      'BCDEFGHIJKLMNOPQRSTUVWXYZAbcdefghijklmnopqrstuvwxyza1234567890!@#$%^&*()абвАБВтест',
    ],
    [
      'This is secret. Message about "_" symbol!',
      'Uijt jt tfdsfu. Nfttbhf bcpvu "_" tzncpm!',
    ],
  ];

  test('Shouod be defined', () => {
    expect(CaesarCipheringMachine).toBeDefined();
  });

  test('Should check message type', () => {
    let caesar = new CaesarCipheringMachine('encode', 1);

    try {
      caesar.encrypt(undefined);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      caesar.encrypt(null);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      caesar.encrypt(['asdfasdfas df']);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      caesar.encrypt({ message: 'caesar.encrypt(undefined);' });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('Shouod work with action "encode"', () => {
    let caesar = new CaesarCipheringMachine('encode', 1);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[0])).toBe(el[1]);
    });

    caesar = new CaesarCipheringMachine('encode', 27);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[0])).toBe(el[1]);
    });
  });

  test('Shouod work with action "decode"', () => {
    let caesar = new CaesarCipheringMachine('decode', 1);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[1])).toBe(el[0]);
    });

    caesar = new CaesarCipheringMachine('decode', 27);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[1])).toBe(el[0]);
    });
  });

  test('Shouod work with negative shift', () => {
    let caesar = new CaesarCipheringMachine('encode', -1);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[1])).toBe(el[0]);
    });

    caesar = new CaesarCipheringMachine('decode', -1);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[0])).toBe(el[1]);
    });

    caesar = new CaesarCipheringMachine('encode', -27);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[1])).toBe(el[0]);
    });

    caesar = new CaesarCipheringMachine('decode', -27);

    testStringsShift1.forEach((el) => {
      expect(caesar.encrypt(el[0])).toBe(el[1]);
    });
  });

});
