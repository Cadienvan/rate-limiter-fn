export type RateLimitOptions = {
  interval: number;
  limit: number;
  identifierFn: Function | undefined;
  onLimitReached: Function | undefined;
};
