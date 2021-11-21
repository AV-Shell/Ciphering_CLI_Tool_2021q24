const { expect } = require('@jest/globals');
const errorModule = require('../utils/errors');

describe('Errors module', () => {


  const { CustomError, uncaughtExceptionHandler, unhandledRejectionHandler } = errorModule;

  test('should be defined', () => {
    expect(CustomError).toBeDefined;
    expect(uncaughtExceptionHandler).toBeDefined;
    expect(unhandledRejectionHandler).toBeDefined;
  });

  test('should be create customError', () => {
    const newE = new CustomError('me');

    expect(newE.message).toBe('me');
    expect(newE.customError).toBe(true);
    expect(newE).toBeInstanceOf(Error);
  });

  test('should be call process exit with custom errors', () => {
    const message = 'mess';
    const newE = new CustomError(message);

    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    uncaughtExceptionHandler(newE);
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(consoleError).toHaveBeenCalledWith(newE.message);
    unhandledRejectionHandler(newE);
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(consoleError).toHaveBeenCalledWith(newE.message);
    uncaughtExceptionHandler(new Error());
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(consoleError).toHaveBeenCalledWith(newE.message);
    mockExit.mockRestore();
  });

  test('should be call process exit with common errors', () => {
    const message = 'mess';

    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => {});
    uncaughtExceptionHandler(new Error(message));
    expect(mockExit).toHaveBeenCalledWith(9);
    expect(consoleError).toHaveBeenCalledWith(message);
    mockExit.mockRestore();
  });
});
