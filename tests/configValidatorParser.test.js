const { configValidatorParser } = require('./../utils/configValidatorParser');

describe('Config validator', () => {
  test('Shouod be defined', () => {
    expect(configValidatorParser).toBeDefined();
  });

  test('Shouod throw custom Error', () => {
    class CE extends Error {
      constructor(mess) {
        super(mess);
        this.testCustomError = true;
      }
    }
    let config;

    try {
      configValidatorParser(config, CE);
    } catch (err) {
      expect(err).toBeInstanceOf(CE);
    }

    try {
      config = '';
      configValidatorParser(config, CE);
    } catch (err) {
      expect(err).toBeInstanceOf(CE);
    }

    try {
      config = 'A1';
      configValidatorParser(config, CE);
    } catch (err) {
      expect(err).toBeInstanceOf(CE);
    }

    try {
      config = 'D1';
      configValidatorParser(config, CE);
    } catch (err) {
      expect(err).toBeInstanceOf(CE);
    }

    try {
      config = 'CC';
      configValidatorParser(config, CE);
    } catch (err) {
      expect(err).toBeInstanceOf(CE);
    }

    try {
      config = 'C1';
      configValidatorParser(config, CE);
    } catch (err) {
      expect(err).toBeInstanceOf(CE);
    }
  });

  test('Config shouod be string', () => {
    let config;

    try {
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = ['A'];
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = { a: 'A' };
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = null;
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('Config shouod be valid format', () => {
    let config = 'A2';

    try {
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = 'A1';
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = 'A-с1';
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = 'A-С1-';
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = 'R11-R0';
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = '-R1-R0-C';
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }

    try {
      config = '1R-0C';
      configValidatorParser(config, Error);
    } catch (err) {
      expect(err).toBeInstanceOf(Error);
    }
  });

  test('Validator shouod return valid array of objects', () => {
    expect(configValidatorParser('A', Error)).toEqual([
      { action: 'encode', type: 'A' },
    ]);

    expect(configValidatorParser('C1-C1-R0-A', Error)).toEqual([
      { action: 'encode', type: 'C' },
      { action: 'encode', type: 'C' },
      { action: 'decode', type: 'R' },
      { action: 'encode', type: 'A' },
    ]);
    expect(configValidatorParser('C1-C0-A-R1-R0-A-R0-R0-C1-A', Error)).toEqual([
      { action: 'encode', type: 'C' },
      { action: 'decode', type: 'C' },
      { action: 'encode', type: 'A' },
      { action: 'encode', type: 'R' },
      { action: 'decode', type: 'R' },
      { action: 'encode', type: 'A' },
      { action: 'decode', type: 'R' },
      { action: 'decode', type: 'R' },
      { action: 'encode', type: 'C' },
      { action: 'encode', type: 'A' },
    ]);
    expect(configValidatorParser('A-A-A-R1-R0-R0-R0-C1-C1-A', Error)).toEqual([
      { action: 'encode', type: 'A' },
      { action: 'encode', type: 'A' },
      { action: 'encode', type: 'A' },
      { action: 'encode', type: 'R' },
      { action: 'decode', type: 'R' },
      { action: 'decode', type: 'R' },
      { action: 'decode', type: 'R' },
      { action: 'encode', type: 'C' },
      { action: 'encode', type: 'C' },
      { action: 'encode', type: 'A' },
    ]);
    expect(configValidatorParser('C1-R1-C0-C0-A-R0-R1-R1-A-C1', Error)).toEqual([
      { action: 'encode', type: 'C' },
      { action: 'encode', type: 'R' },
      { action: 'decode', type: 'C' },
      { action: 'decode', type: 'C' },
      { action: 'encode', type: 'A' },
      { action: 'decode', type: 'R' },
      { action: 'encode', type: 'R' },
      { action: 'encode', type: 'R' },
      { action: 'encode', type: 'A' },
      { action: 'encode', type: 'C' },
    ]);

  });
});
