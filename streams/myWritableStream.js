const fs = require("fs");
const { Writable } = require("stream");

class MyWritable extends Writable {
  constructor(filename) {
    super();
    this.superPuperCustomSteam = true;
    this.filename = filename;
    this.fd = null;
  }

  _construct(cb) {
    fs.open(this.filename, "a", (err, fd) => {
      if (err) {
        cb(err);
      } else {
        this.fd = fd;
        cb();
      }
    });
  }

  _write(chunk, enc, cb) {
    fs.write(this.fd, chunk, cb);
  }

  _destroy(err, cb) {
    if (this.fd) {
      fs.close(this.fd, (er) => cb(er || err));
    } else {
      cb(err);
    }
  }
}

module.exports = MyWritable;
