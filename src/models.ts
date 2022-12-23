export type RateLimitOptions = {
  timeFrameInMs: number;
  limit: number; 
  identifierFn: Function | undefined; 
  exceptionHandler: Function | undefined;
}
