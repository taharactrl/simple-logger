const fs = require("fs");
const moment = require("moment-timezone");
const LOG_LEVEL = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];
const LOG_LEVEL_INDEX = {};
for (let i = 0; i < LOG_LEVEL.length; i++) {
  LOG_LEVEL_INDEX[LOG_LEVEL[i]] = i + 1;
}

class Logger {
  get level() {
    return this._level;
  }

  set level(level) {
    this._level =
      LOG_LEVEL_INDEX[level.toLowerCase()] || LOG_LEVEL_INDEX["error"];
  }

  constructor(level = "error", tag = "simple-logger", tz = "UTC", file = null) {
    this.level = level;
    this.tag = tag;
    this.tz = tz;

    if (file) {
      this.logFileStream = fs.createWriteStream(file, { flags: "a" });
    }

    for (let level of LOG_LEVEL) {
      this[level] = (...msg) => {
        if (this.level > LOG_LEVEL_INDEX[level]) return;
        const logMessage = `[${moment()
          .tz(this.tz)
          .format("YYYY-MM-DDTHH:mm:ss.SSSZ")}][${level.toUpperCase()}][${
          this.tag
        }] ${[...msg].join(" ")}`;

        console.log(logMessage);
        if (this.logFileStream && this.logFileStream.writable) {
          this.logFileStream.write(logMessage + "\n");
        }
      };
    }
  }

  static createLogger(logLevel, logTag, timezone, filepath) {
    return new Logger(logLevel, logTag, timezone, filepath);
  }
}

module.exports = Logger;
