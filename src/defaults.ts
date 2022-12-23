import { RateLimitOptions } from './models';

export const defaultOptions: RateLimitOptions = {
  interval: 1000,
  limit: 1,
  identifierFn: undefined,
  onLimitReached: undefined
};
