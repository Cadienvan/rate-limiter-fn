import { rateLimit } from './index';

function simpleFn(a: number, b: number) {
  return a + b;
}
it('should return the same result for the same input both for simple function and rateLimit-wrapped one', () => {
  const result = simpleFn(1, 2);
  const rateLimitedResult = rateLimit(simpleFn)(1, 2);
  expect(result).toBe(rateLimitedResult);
});

it('should throw an error if the rate limit is exceeded and no exceptionHandler is defined', () => {
  const rateLimitedFn = rateLimit(simpleFn, { limit: 1, timeFrameInMs: 1000 });
  rateLimitedFn(1, 2);
  expect(() => rateLimitedFn(1, 2)).toThrow();
});

it('should return the result of the exceptionHandler if the rate limit is exceeded and an exceptionHandler is defined', () => {
  const exceptionHandler = jest.fn();
  const rateLimitedFn = rateLimit(simpleFn, {
    limit: 1,
    timeFrameInMs: 1000,
    exceptionHandler
  });
  rateLimitedFn(1, 2);
  rateLimitedFn(1, 2);
  expect(exceptionHandler).toHaveBeenCalled();
});

it('should not throw if a rate limited function is called with different identifier', () => {
  const rateLimitedFn = rateLimit(simpleFn, {
    limit: 1,
    timeFrameInMs: 1000,
    identifierFn: (a: number, b: number) => a
  });
  rateLimitedFn(1, 2);
  rateLimitedFn(2, 2);
});

it('should throw if a rate limited function is called with same identifier', () => {
  const rateLimitedFn = rateLimit(simpleFn, {
    limit: 1,
    timeFrameInMs: 1000,
    identifierFn: (a: number, b: number) => a
  });
  rateLimitedFn(1, 2);
  expect(() => rateLimitedFn(1, 3)).toThrow();
});
