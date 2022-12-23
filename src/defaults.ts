import { RateLimitOptions } from './models';

export const defaultOptions: RateLimitOptions = {
  timeFrameInMs: 1000,
  limit: 1,
  identifierFn: undefined,
  exceptionHandler: undefined
};
