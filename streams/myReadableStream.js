const { Readable } = require("stream");
const fs = require("fs");

class MyReadable extends Readable {
  constructor(filename) {
    super();
    this.superPuperCustomSteam = true;
    this.filename = filename;
    this.fd = null;
  }

  _construct(cb) {
    fs.open(this.filename, (err, fd) => {
      if (err) {
        cb(err);
      } else {
        this.fd = fd;
        cb();
      }
    });
  }

  _read(n) {
    const buf = Buffer.alloc(n);
    fs.read(this.fd, buf, 0, n, null, (err, bytesRead) => {
      if (err) {
        this.destroy(err);
      } else {
        this.push(bytesRead > 0 ? buf.slice(0, bytesRead) : null);
      }
    });
  }

  _destroy(err, cb) {
    if (this.fd) {
      fs.close(this.fd, (er) => cb(er || err));
    } else {
      cb(err);
    }
  }
}

module.exports = MyReadable;
