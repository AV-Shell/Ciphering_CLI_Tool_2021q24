const { expect } = require('@jest/globals');
const { spawn } = require('child_process');

describe('Error Scenarios', () => {
  test('Error scenarios1. Input: User passes the same cli argument twice; Result: Error message is shown; ', (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-c', 'C1-C1-A-R0', '-c', 'C0']);

    let res = '';

    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Duplicate argument "config"');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("Error scenarios2.  Input: User doesn't pass -c or --config argument; Result: Error message is shown;", (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-i', 'input.txt', '-o', 'output.txt']);

    let res = '';

    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Argument "config" is required');
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("Error scenarios3. Input: User passes -i argument with path that doesn't exist or with no read access; Result: Error message is shown;", (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-i', './ii/ii/ii/input.txt', '-o', 'output.txt', '-c', 'C1']);

    let res = '';

    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res?.includes('input.txt does not exist')).toBe(true);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test("Error scenarios4. Input: User passes -o argument with path to directory that doesn't exist or with no read access; Result: Error message is shown;", (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-i', 'input.txt', '-o', './ii/ii/ii/output.txt', '-c', 'C1']);

    let res = '';

    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res?.includes('output.txt does not exist')).toBe(true);
        done();
      } catch (err) {
        done(err);
      }
    });
  });

  test('Error scenarios5. Input: User passes incorrent symbols in argument for --config; Result: Error message is shown;', (done) => {
    const cp = spawn('node', ['Ciphering_CLI_Tool.js', '-c', 'T1']);

    let res = '';

    cp.stderr.on('data', (chunk) => {
      res += chunk.toString();
    });

    cp.stderr.on('end', () => {
      res = res.trim();
      try {
        expect(res).toBe('Config "T1" is incorrect');
        done();
      } catch (err) {
        done(err);
      }
    });
  });
});
