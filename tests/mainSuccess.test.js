const { expect } = require('@jest/globals');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

describe('Success  Scenarios', () => {
  const hash = Date.now();
  const data = 'This is secret. Message about "_" symbol!';

  const inputFile = path.resolve(`./${hash}_input.txt`);
  const outputFile = path.resolve(`./${hash}_output.txt`);
  const outputFile0 = path.resolve(`./${hash}_output0.txt`);
  const outputFile1 = path.resolve(`./${hash}_output1.txt`);
  const outputFile2 = path.resolve(`./${hash}_output2.txt`);
  const outputFile3 = path.resolve(`./${hash}_output3.txt`);

  const configs = [
    ['C1-C1-R0-A', 'Myxn xn nbdobm. Tbnnfzb ferlm "_" nhteru!'],
    ['C1-C0-A-R1-R0-A-R0-R0-C1-A', 'Vhgw gw wkmxkv. Ckwwoik onauv "_" wqcnad!'],
    ['A-A-A-R1-R0-R0-R0-C1-C1-A', 'Hvwg wg gsqfsh. Asggous opcih "_" gmapcz!'],
    ['C1-R1-C0-C0-A-R0-R1-R1-A-C1', 'This is secret. Message about "_" symbol!'],
  ]


  beforeAll(() => {
    fs.writeFileSync(inputFile, data);
    fs.writeFileSync(outputFile, '');
    fs.writeFileSync(outputFile0, '');
    fs.writeFileSync(outputFile1, '');
    fs.writeFileSync(outputFile2, '');
    fs.writeFileSync(outputFile3, '');
  });

  afterAll(() => {
    fs.unlinkSync(inputFile);
    fs.unlinkSync(outputFile);
    fs.unlinkSync(outputFile0);
    fs.unlinkSync(outputFile1);
    fs.unlinkSync(outputFile2);
    fs.unlinkSync(outputFile3);
  });

  test('Success scenarios1. Input: Valid, process success', (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-c', 'C1-C1-R0-A', '-i', inputFile, '-o', outputFile]);

    let res = '';

    cp.stdout.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Ecription succeeded.');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test(`Success scenarios2. Input: config ${configs[0][0]} output file should contains valid string`, (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-c', configs[0][0], '-i', inputFile, '-o', outputFile0]);

    let res = '';

    cp.stdout.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Ecription succeeded.');
        const data = fs.readFileSync(outputFile0, { encoding: 'utf8', flag: 'r' });
        expect(data).toBe(configs[0][1]);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test(`Success scenarios2. Input: config ${configs[1][0]} output file should contains valid string`, (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-c', configs[1][0], '-i', inputFile, '-o', outputFile1]);

    let res = '';

    cp.stdout.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Ecription succeeded.');
        const data = fs.readFileSync(outputFile1, { encoding: 'utf8', flag: 'r' });
        expect(data).toBe(configs[1][1]);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test(`Success scenarios2. Input: config ${configs[2][0]} output file should contains valid string`, (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-c', configs[2][0], '-i', inputFile, '-o', outputFile2]);

    let res = '';

    cp.stdout.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Ecription succeeded.');
        const data = fs.readFileSync(outputFile2, { encoding: 'utf8', flag: 'r' });
        expect(data).toBe(configs[2][1]);

        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test(`Success scenarios2. Input: config ${configs[3][0]} output file should contains valid string`, (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-c', configs[3][0], '-i', inputFile, '-o', outputFile3]);

    let res = '';

    cp.stdout.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stdout.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Ecription succeeded.');
        const data = fs.readFileSync(outputFile3, { encoding: 'utf8', flag: 'r' });
        expect(data).toBe(configs[3][1]);

        done();
      } catch (err) {
        done(err);
      }
    });
  });



});
