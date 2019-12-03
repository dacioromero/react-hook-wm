# React Hook WM

Hooks for integrating React with [Web Monetization](https://webmonetization.org/).

## Install

    $ npm install react-hook-wm

## Hooks

### useListener

Exposes a more React-ish way of interacting with monetization events through the following interface:

```typescript
interface UseListenerOptions {
  onPending?: (event: MonetizationPendingEvent) => void
  onStart?: (event: MonetizationStartEvent) => void
  onProgress?: (event: MonetizationProgressEvent) => void
  onStop?: (event: MonetizationStopEvent) => void
}
```

### useStatus

Returns the current [monetization state](https://webmonetization.org/docs/api#states).

### use[PaymentPointer/RequestId]

Returns the last paymentPointer/requestId received from any monetization event. See them [here](https://webmonetization.org/docs/api#browser-events).

### useCounter

Returns the last assetCode (code) and the sum of the amounts (total) received from [`monetizationprogress`](https://webmonetization.org/docs/api#monetizationprogress) events.

### useHasPaid

Returns a Boolean indicating whether or not the payment pointer has been paid yet. Useful for determining requesting for pay-locked content is ready.

## Other Works

- [react-web-monetization](https://github.com/sharafian/react-web-monetization)
