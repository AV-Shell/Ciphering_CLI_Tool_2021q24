const path = require("path");
const fs = require("fs");
const {
  CustomError,
  uncaughtExceptionHandler,
  unhandledRejectionHandler,
} = require("./utils/errors");
const ArgsValidator = require("./utils/argsValidator");
const { configValidatorParser } = require("./utils/configValidatorParser");
const { pipeline } = require("stream");
const MyCaesarTransform = require("./streams/myCaesarTransformStream");
const MyROT8Transform = require("./streams/myROT8TransformStream");
const MyAtbashTransform = require("./streams/myAtbashTransformStream");
const MyReadable = require("./streams/myReadableStream");
const MyWritable = require("./streams/myWritableStream");

const DEBUG_LOG_ENABLE = false;
//Task 2 tests

process.on("uncaughtException", uncaughtExceptionHandler);
process.on("unhandledRejection", unhandledRejectionHandler);

if (DEBUG_LOG_ENABLE) {
  const myArgs = process.argv.slice(2);
  console.log(myArgs);
}
let myParser = new ArgsValidator({
  validate: true,
  canDuplicate: false,
  errorClass: CustomError,
});

try {
  let { config, input, output } = myParser
    .setOption({ name: "config", keys: ["-c", "--config"], require: true })
    .setOption({ name: "input", keys: ["-i", "--input"] })
    .setOption({ name: "output", keys: ["-o", "--output"] })
    .parse(process.argv);

  if (DEBUG_LOG_ENABLE) console.log("config", config);
  if (DEBUG_LOG_ENABLE) console.log("input", input);
  if (DEBUG_LOG_ENABLE) console.log("output", output);

  const streamTypes = configValidatorParser(config, CustomError);
  if (DEBUG_LOG_ENABLE) console.log("streamTypes", streamTypes);

  let inputFile;
  let outputFile;
  let inputStream;
  let outputStream;

  if (input) {
    inputFile = path.resolve(input);
    try {
      fs.accessSync(inputFile, fs.constants.F_OK | fs.constants.R_OK);
      if (DEBUG_LOG_ENABLE)
        console.log(`${inputFile} exists, and it is readable`);
      // inputStream = fs.createReadStream(inputFile);
      inputStream = new MyReadable(inputFile);
    } catch (err) {
      throw new CustomError(
        `${inputFile} ${
          err.code === "ENOENT" ? "does not exist" : "is cannot be read"
        }`
      );
    }
  } else {
    inputStream = process.stdin;
  }
  if (output) {
    outputFile = path.resolve(output);
    try {
      fs.accessSync(outputFile, fs.constants.F_OK | fs.constants.W_OK);
      if (DEBUG_LOG_ENABLE)
        console.log(`${outputFile} exists, and it is readable`);
      // outputStream = fs.createWriteStream(outputFile, { flags: "a" });
      outputStream = new MyWritable(outputFile);
    } catch (err) {
      throw new CustomError(
        `${outputFile} ${
          err.code === "ENOENT" ? "does not exist" : "is cannot be write"
        }`
      );
    }
  } else {
    outputStream = process.stdout;
  }

  const streamsArray = streamTypes.map((el) => {
    switch (el.type) {
      case "C":
        return new MyCaesarTransform(el.action);
      case "R":
        return new MyROT8Transform(el.action);
      case "A":
        return new MyAtbashTransform(el.action);
      default:
        throw new CustomError("Switch case problem, unknown stream");
    }
  });
  // if (DEBUG_LOG_ENABLE) console.log('streamsArray', streamsArray);

  pipeline(inputStream, ...streamsArray, outputStream, (err) => {
    if (err) {
      throw new CustomError(
        `Problem with encription, ${
          err.code === "EISDIR"
            ? "It is not a file. It is the Directory!!"
            : err.message
        }`
      );
      process.exit(9);
    } else {
      console.log("Ecription succeeded.");
    }
  });
} catch (err) {
  if (err.customError) {
    console.error(err.message);
    process.exit(9);
  } else {
    throw err;
  }
}
