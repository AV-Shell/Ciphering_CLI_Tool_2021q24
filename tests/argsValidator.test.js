const { expect } = require('@jest/globals');
const Parser = require('../utils/argsValidator.js');

describe('Config validator', () => {
  let myParser;

  beforeEach(() => {
    myParser = new Parser({
      validate: true,
      canDuplicate: false,
      errorClass: Error,
    })
      .setOption({ name: 'config', keys: ['-c', '--config'], require: true })
      .setOption({ name: 'input', keys: ['-i', '--input'] })
      .setOption({ name: 'output', keys: ['-o', '--output'] });
  });

  test('Shouod be defined', () => {
    expect(Parser).toBeDefined();
  });

  test('Should check duplicate Arguments', () => {
    const args = [
      ['', '', '-c', 'C1', '--config', 'C1'],
      ['', '', '-c', 'C1', '--config', 'C0'],
      ['', '', '--config', 'C1', '-c', 'C0'],
      ['', '', '--config', 'C1', '-c', 'C0'],
      ['', '', '--config', 'C1', '-i', 'input.txt', '--input', 'input.txt'],
      ['', '', '--config', 'C1', '-i', 'input.txt', '--input', 'input2.txt'],
      ['', '', 'input.txt', '--input', 'input.txt', '--config', 'C1', '-i'],
      ['', '', '--config', 'C1', '--input', 'input2.txt', '-i', 'input.txt'],
      ['', '', '--config', 'C1', '--input', 'input2.txt', '-o', 'output.txt', '-o', 'output.txt'],
      ['', '', '--config', 'C1', '--input', 'input2.txt', '-o', 'output.txt', '--output', 'output.txt'],
    ];

    args.forEach((el) => {
      try {
        myParser.parse(el);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });

  test('Should check required Arguments', () => {
    const args = [
      ['', '', '-i', 'input.txt'],
      ['', '', '-o', 'output.txt'],
      ['', '', '-i', 'input.txt', '-o', 'output.txt'],
      ['', '', '-i', 'input.txt', '-o', 'output.txt', '-config', 'C1'],
      ['', '', '-i', 'input.txt', '-o', 'output.txt', '--c', 'C1'],
    ];

    args.forEach((el) => {
      try {
        myParser.parse(el);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });

  test('Should check Unknown Arguments', () => {
    const args = [
      ['', '', '-i', 'input.txt', '-o', 'output.txt', '--config', 'C1', '-z', 'ZZ'],
      ['', '', '-i', 'input.txt', '-o', 'output.txt', '-c', 'C1', '-z', 'ZZ', '-p', 'ZZ', '-f', 'ZZ'],
    ];

    args.forEach((el) => {
      try {
        myParser.parse(el);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });

  test('Should check arguments have value', () => {
    const args = [
      ['', '', '-i', 'input.txt', '-o', 'output.txt', '--config'],
      ['', '', '-i', , '-o', 'output.txt', '--config', 'C1'],
      ['', '', '-i', 'input.txt', '-o', '--config', 'C1'],
      ['', '', '-i', '-o', '--config'],
    ];

    args.forEach((el) => {
      try {
        myParser.parse(el);
      } catch (err) {
        expect(err).toBeInstanceOf(Error);
      }
    });
  });

  test('Should return parsed arguments', () => {
    const args = [
      [
        ['', '', '-i', 'input.txt', '-o', 'output.txt', '--config', 'C1'],
        { config: 'C1', input: 'input.txt', output: 'output.txt' },
      ],
      [['', '', '-o', 'output.txt', '--config', 'C1'], { config: 'C1', output: 'output.txt' }],
      [['', '', '-i', 'input.txt', '--config', 'C1'], { config: 'C1', input: 'input.txt' }],
      [['', '', '--config', 'C1'], { config: 'C1' }],
      [['', '', '--config', 'C0'], { config: 'C0' }],
      [['', '', '--config', 'C1-C0'], { config: 'C1-C0' }],
      [['', '', '--config', 'C1-R0-A-A-C0'], { config: 'C1-R0-A-A-C0' }],
      [['', '', '--config', 'C1-C1-R0-A-A-C0'], { config: 'C1-C1-R0-A-A-C0' }],
      [['', '', '--config', 'C1-R0-A-A-C0-C1'], { config: 'C1-R0-A-A-C0-C1' }],
      [['', '', '--config', 'C1-R0-A-A-A-C0'], { config: 'C1-R0-A-A-A-C0' }],
    ];

    args.forEach((el) => {
      myParser = new Parser({
        validate: true,
        canDuplicate: false,
        errorClass: Error,
      })
        .setOption({ name: 'config', keys: ['-c', '--config'], require: true })
        .setOption({ name: 'input', keys: ['-i', '--input'] })
        .setOption({ name: 'output', keys: ['-o', '--output'] });

      expect(myParser.parse(el[0])).toEqual(el[1]);
    });
  });
});
