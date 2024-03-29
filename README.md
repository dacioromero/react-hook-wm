# React Hook WM

Hooks for integrating React with [Web Monetization](https://webmonetization.org/).

[![npm bundle size](https://img.shields.io/bundlephobia/min/react-hook-wm)](https://bundlephobia.com/result?p=react-hook-wm)
[![npm](https://img.shields.io/npm/v/react-hook-wm)](https://www.npmjs.com/package/react-hook-wm)
[![GitHub](https://img.shields.io/github/license/dacioromero/react-hook-wm)](https://github.com/dacioromero/react-hook-wm/blob/master/LICENSE)
[![GitHub top language](https://img.shields.io/github/languages/top/dacioromero/react-hook-wm)](https://github.com/dacioromero/react-hook-wm/search?l=typescript)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/dacioromero/react-hook-wm/publish/master)](https://github.com/dacioromero/react-hook-wm/actions?query=branch%3Amaster)
[![Codecov](https://img.shields.io/codecov/c/github/dacioromero/react-hook-wm)](https://codecov.io/gh/dacioromero/react-hook-wm)

## Maintenance notice
As I am no longer an employee of Coil, this repo will likely no longer be maintained. If you'd like to maintain this repo please leave an issue.

## Install

    $ npm install react-hook-wm

or

    $ yarn add react-hook-wm

## Hooks

### useStatus

Returns the current [monetization state](https://webmonetization.org/docs/api#states).

### usePaymentPointer

Returns the latest paymentPointer/requestId received from any [monetization event].

### useRequestId

Returns the latest paymentPointer/requestId received from any [monetization event].

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

[monetization event]: https://webmonetization.org/docs/api#browser
[usecounter]: #useCounter
[usecountercontext]: #useCounterContext
[usehaspaid]: #useHasPaid
[usehaspaidcontext]: #useHasPaidContext
[counterprovider]: #CounterProvider
[haspaidprovider]: #HasPaidProvider
