const fs = require("fs");
const moment = require("moment-timezone");
const stringify = require("json-stringify-safe");
const LOG_LEVEL = ["trace", "debug", "info", "warn", "error", "fatal", "mark"];
const LOG_LEVEL_INDEX = {};
for (let i = 0; i < LOG_LEVEL.length; i++) {
  LOG_LEVEL_INDEX[LOG_LEVEL[i]] = i + 1;
}

const FORMAT_TYPE = {
  TEXT: "text",
  JSON: "json",
};

class Logger {
  get level() {
    return this._level;
  }

  set level(level) {
    this._level =
      LOG_LEVEL_INDEX[level.toLowerCase()] || LOG_LEVEL_INDEX["error"];
  }

  constructor(
    level = "error",
    tag = "simple-logger",
    tz = "UTC",
    file = null,
    format = "text"
  ) {
    this.level = level;
    this.tag = tag;
    this.tz = tz;
    this.format = Object.values(FORMAT_TYPE).includes(format)
      ? format
      : FORMAT_TYPE.TEXT;

    if (file) {
      this.logFileStream = fs.createWriteStream(file, { flags: "a" });
    }

    for (let level of LOG_LEVEL) {
      this[level] = (...msg) => {
        if (this.level > LOG_LEVEL_INDEX[level]) return;
        let logMessage = `[${moment()
          .tz(this.tz)
          .format("YYYY-MM-DDTHH:mm:ss.SSSZ")}][${level.toUpperCase()}][${
          this.tag
        }] ${[...msg].join(" ")}`;

        if (this.format == FORMAT_TYPE.JSON) {
          logMessage = stringify(
            {
              timestamp: moment()
                .tz(this.tz)
                .format("YYYY-MM-DDTHH:mm:ss.SSSZ"),
              logLevel: level.toUpperCase(),
              logTag: this.tag,
              logMessages: [...msg],
            },
            null,
            "    "
          );
        }
        console.log(logMessage);
        if (this.logFileStream && this.logFileStream.writable) {
          this.logFileStream.write(logMessage + "\n");
        }
      };
    }
  }

  static createLogger(logLevel, logTag, timezone, filepath, format) {
    return new Logger(logLevel, logTag, timezone, filepath, format);
  }
}

module.exports = Logger;
