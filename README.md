# What is this?

A higher-order function to provide a Rate Limiting mechanism to the given function.

# How do I install it?

```bash
npm install rate-limiter-fn
```

# How can I use it?

```javascript
const rateLimiter = require('rate-limiter-fn');

const rateLimitedFn = rateLimiter(fn, {
  limit: 10,
  interval: 1000,
});

rateLimitedFn();
```

# API

The module exports a single function (`rateLimit`) that takes two arguments:

- `fn` - The function to be rate limited.
- `options` - An object with the following properties:
  - `limit` - The number of times the function can be called within the given interval.
  - `interval` - The interval in milliseconds.
  - `onLimitReached` - A function that will be called when the limit is reached. It will be called with the following arguments:
    - `identifier` - The identifier for the rate limit. This is the value returned by the `identifierFn` option if given, otherwise it is the function itself.
    - `args` - The arguments that were passed to the function.
  - `identifierFn` - A function that will be called to get the identifier for the rate limit. It will be called with the following arguments:
    - `fn` - The function that was rate limited.
    - `args` - The arguments that were passed to the function.

# Tests

You can run the tests by using the following command:

```bash
npm test
```