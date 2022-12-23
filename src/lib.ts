import { defaultOptions } from "./defaults";
import { RateLimitOptions } from "./models";

export function rateLimit(fn: Function, options?: Partial<RateLimitOptions>) {
    const { timeFrameInMs, limit, identifierFn, exceptionHandler } = { ...defaultOptions, ...options };
    const callHistory = new Map();
    return function (...args: any[]) {
        const identifier = identifierFn ? identifierFn(...args) : JSON.stringify(fn);
        const now = Date.now();
        const history = callHistory.get(identifier) || [];
        const callsInTimeFrame = history.filter((callTime: number) => now - callTime < timeFrameInMs);
        if (callsInTimeFrame.length >= limit) {
            if(!exceptionHandler)
                throw new Error(`Rate limit exceeded for ${identifier}`);
            else
              return exceptionHandler({timeFrameInMs, limit, identifierFn, exceptionHandler});
        }
        callHistory.set(identifier, [...callsInTimeFrame, now]);
        return fn(...args);
    };
}