const logger = require("./index").createLogger(
  "debug",
  "simple-logger",
  "UTC",
  null,
  "json"
);

logger.fatal("fatal log");
logger.error("error log");
logger.warn("warn log");
logger.info("info log");
logger.debug("debug log");
logger.trace("trace log");
logger.mark("mark log");
logger.mark({ msg: "mark log" });
let obj = { msg: "log", o: { aaa: 1 } };
obj.obj = obj;

logger.mark(obj);
