import { defaultOptions } from './defaults';
import { RateLimitOptions } from './models';

export function rateLimit(fn: Function, options?: Partial<RateLimitOptions>) {
  const { interval, limit, identifierFn, onLimitReached } = {
    ...defaultOptions,
    ...options
  };
  const callHistory = new Map();
  return function (...args: any[]) {
    const identifier = identifierFn
      ? identifierFn(...args)
      : JSON.stringify(fn);
    const now = Date.now();
    const history = callHistory.get(identifier) || [];
    const callsInInterval = history.filter(
      (callTime: number) => now - callTime < interval
    );
    if (callsInInterval.length >= limit) {
      if (!onLimitReached)
        throw new Error(`Rate limit exceeded for ${identifier}`);
      else
        return onLimitReached({
          identifier,
          args,
        });
    }
    callHistory.set(identifier, [...callsInInterval, now]);
    return fn(...args);
  };
}
