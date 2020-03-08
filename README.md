# React Hook WM
Hooks for integrating React with [Web Monetization](https://webmonetization.org/).

## Install
    $ npm install react-hook-wm

or

    $ yarn add react-hook-wm

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

### useReducedListener
Attaches the provided reducer to events from [useListener](#useListener) and returns the state produced. See the [source for useCounter](src/counter.ts) or the [source for useHasPaid](src/has-paid.ts) for examples.

### useStatus
Returns the current [monetization state](https://webmonetization.org/docs/api#states).

### use[PaymentPointer/RequestId]
Returns the last paymentPointer/requestId received from any monetization event. See them [here](https://webmonetization.org/docs/api#browser-events).

### useCounter
Returns the last assetCode (code) and the sum of the amounts (total) received from [`monetizationprogress`](https://webmonetization.org/docs/api#monetizationprogress) events.

### useCounterContext
Alternative to [useCounter] that requires a [CounterProvider] in one of its parent components. Allows for tracking prior to using the hook.

### useHasPaid
Returns a Boolean indicating whether or not the payment pointer has been paid yet. Useful for determining requesting for pay-locked content is ready.

### useHasPaidContext
Alternative to [useHasPaid] that requires a [HasPaidProvider] in one of its parent components. Allows for tracking prior to using the hook.

## Components

### CounterProvider
Provides [useCounterContext]'s value. It's recommended that its children are memoized using `React.memo`.

### HasPaidProvider
Provides [useHasPaidContext]'s value. It's recommended that its children are memoized using `React.memo`.

## Other Works
- [react-web-monetization](https://github.com/sharafian/react-web-monetization)

[useCounter]: #useCounter
[useCounterContext]: #useCounterContext
[useHasPaid]: #useHasPaid
[useHasPaidContext]: #useHasPaidContext
[CounterProvider]: #CounterProvider
[HasPaidProvider]: #HasPaidProvider
