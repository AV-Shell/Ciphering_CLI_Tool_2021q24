class CustomError extends Error {
  constructor(message) {
    super(message);
    this.customError = true;
  }
}

const uncaughtExceptionHandler = (err, origin) => {
  exceptionHandler(err);
};

const unhandledRejectionHandler = (err, promise) => {
  exceptionHandler(err);
};

function exceptionHandler(err) {
  if (err.customError) {
    console.error(err.message);
    process.exit(9);
  } else {
    console.error(err.message);
    console.error(err.stack);
    process.exit(9);
  }
}

module.exports = {
  CustomError,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
};
