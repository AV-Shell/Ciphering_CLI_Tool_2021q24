const AtbashCipheringMachine = require('./../utils/atbashCipher');

describe('Config validator', () => {
  const testStringsShift1 = [
    ['a', 'z'],
    ['zZ', 'aA'],
    ['AaBb', 'ZzYy'],
    [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*()абвАБВтест',
      'ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba1234567890!@#$%^&*()абвАБВтест',
    ],
    [
      'This is secret. Message about "_" symbol!',
      'Gsrh rh hvxivg. Nvhhztv zylfg \"_\" hbnylo!',
    ],
  ];

  test('Shouod be defined', () => {
    expect(AtbashCipheringMachine).toBeDefined();
  });

  test('Should check message type', () => {
    let atbash = new AtbashCipheringMachine();

    try {
      atbash.encrypt(undefined);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      atbash.encrypt(null);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      atbash.encrypt(['asdfasdfas df']);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      atbash.encrypt({ message: 'atbash.encrypt(undefined);' });
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('Shouod work', () => {
    let atbash = new AtbashCipheringMachine();

    testStringsShift1.forEach((el) => {
      expect(atbash.encrypt(el[0])).toBe(el[1]);
    });

    atbash = new AtbashCipheringMachine('encode', 27);

    testStringsShift1.forEach((el) => {
      expect(atbash.encrypt(el[0])).toBe(el[1]);
    });
  });
});
