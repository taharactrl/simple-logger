# simple-logger

## Installation

```sh
npm install --save @taharactrl/simple-logger
```

## Usage

```js
const logger = require("@taharactrl/simple-logger").createLogger("debug");

logger.fatal("fatal log");
// => [2021-10-13T04:40:04.984+00:00][FATAL][simple-logger] fatal log
logger.error("error log");
// => [2021-10-13T04:40:04.989+00:00][ERROR][simple-logger] error log
logger.warn("warn log");
// => [2021-10-13T04:40:04.990+00:00][WARN][simple-logger] warn log
logger.info("info log");
// => [2021-10-13T04:40:04.990+00:00][INFO][simple-logger] info log
logger.debug("debug log");
// => [2021-10-13T04:40:04.990+00:00][DEBUG][simple-logger] debug log
logger.trace("trace log");
// => null      trace log is not output since logLevel = 'debug'
logger.mark("mark log");
// => [2021-10-13T04:40:04.990+00:00][MARK][simple-logger] mark log
```

## Options

```
createLogger(logLevel, logTag, timezone, filepath, format)
```

- `logLevel` : default `error`. You can choose this parameter from `fatal | error | warn | info | debug | trace`

- `logTag` : default `simple-logger`. This parameter is used in log format.

```
[2021-10-13T04:40:04.990+00:00][MARK][${logTag}] mark log
```

- `timezone` : default `UTC`. This parameter is used in log format timezone.

```js
const logger = require("@taharactrl/simple-logger").createLogger(
  "debug",
  "simple-logger",
  "Asia/Tokyo"
);

logger.error("error log");
// => [2021-10-13T04:40:04.989+09:00][ERROR][simple-logger] error log
```

- `filepath`: default `null`. If this parameter is set, logs are output into `filepath` file.

```js
const path = require("path");
const logger = require("@taharactrl/simple-logger").createLogger(
  "debug",
  "simple-logger",
  "Asia/Tokyo",
  path.join(__dirname, "sample.log")
);

logger.mark("mark log");
```

- `format`: default `text`. If this parameter is `json`, output logs are json format.

```js
const logger = require("./index").createLogger(
  "debug",
  "simple-logger",
  "UTC",
  null,
  "json"
);

logger.mark({ msg: "mark log" });

/*
{
    "timestamp": "2021-11-11T09:53:43.063+00:00",
    "logLevel": "MARK",
    "logTag": "simple-logger",
    "logMessages": [
        {
            "msg": "mark log"
        }
    ]
}
 */
```
