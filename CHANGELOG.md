# Changelog

### [0.1.15](https://github.com/dacioromero/react-hook-wm/compare/0.1.14...0.1.15) (2020-08-23)

### Fixed

- loosen versions ([62ecb1e](https://github.com/dacioromero/react-hook-wm/commit/62ecb1e6fe7af85115f445555e463908d1d9c24b))
- resolve bug w/ has-paid and counter, add tests ([1aacfbb](https://github.com/dacioromero/react-hook-wm/commit/1aacfbb05aa5362cefd6feb84d276d552fda0c8f))
- tighten peerDependencies ([738f21d](https://github.com/dacioromero/react-hook-wm/commit/738f21d78a6826e2d98428740dae26f524fbba71))

## [0.1.14] - (2020-03-18)

### Changed

- Export UMD.
- Export minified.

## [0.1.13] - (2020-03-18)

### Changed

- Export module.

## [0.1.12] - (2020-03-07)

### Changed

- Removed `createProviderAndHook`.

## [0.1.11] - (2020-03-07)

### Changed

- Set sideEffects to false in package.json.

## [0.1.10] - (2020-03-07)

### Fixed

- Export [CounterProvider] correctly.

### Changed

- Use `createProviderAndHook` internally for Context variants of counter and hasPaid.

## [0.1.9] - (2020-03-07)

### Added

- [useCounterContext]
- [CounterProvider]
- [useHasPaidContext]
- [HasPaidProvider]

## [0.1.8] - (2020-03-07)

### Changed

- Set TypeScript target to ES2019 from ES5.

## [0.1.7] - (2020-03-07)

### Added

- [useReducedListener].

### Changed

- Use [useReducedListener] in [useHasPaid] and [useCounter].

## [0.1.6] - (2020-02-17)

### Fixed

- Call correct callback in [useListener].

## [0.1.5] - (2020-02-17)

### Fixed

- Reset [useCounter] and [useHasPaid] when `monetizationstop` event's `finalized` property is `false`.

## [0.1.4] - (2019-11-02)

### Changed

- Use [dacioromero/types-wm](https://github.com/dacioromero/types-wm).

## [0.1.3] - (2019-12-02)

### Added

- [useListener].

### Changed

- Use [dacioromero/wm-types](https://github.com/dacioromero/wm-types) over local types.
- Use [useListener] in all hooks.

## [0.1.2] - (2019-11-24)

### Changed

- Reset [useHasPaid] on `requestId` change.
- Reset [useCounter] on `requestId` change.
- Default [useCounter] scale to `0`.

## [0.1.1] - (2019-11-24)

### Changed

- Remove `use-immer` dependency.

## [0.1.0] - (2019-11-23)

### Added

- [useStatus].
- [usePaymentPointer].
- [useRequestId].
- [useCounter].
- [useHasPaid].

[uselistener]: README.md#useListener
[usereducedlistener]: README.md#useReducedListener
[usepaymentpointer]: README.md#usePaymentPointer
[userequestid]: README.md#useRequestId
[usecounter]: README.md#useStatus
[usehaspaid]: README.md#useHasPaid
[0.1.14]: https://github.com/dacioromero/react-hook-wm/compare/0.1.13...0.1.14
[0.1.13]: https://github.com/dacioromero/react-hook-wm/compare/0.1.12...0.1.13
[0.1.12]: https://github.com/dacioromero/react-hook-wm/compare/0.1.11...0.1.12
[0.1.11]: https://github.com/dacioromero/react-hook-wm/compare/0.1.10...0.1.11
[0.1.10]: https://github.com/dacioromero/react-hook-wm/compare/0.1.9...0.1.10
[0.1.9]: https://github.com/dacioromero/react-hook-wm/compare/0.1.8...0.1.9
[0.1.8]: https://github.com/dacioromero/react-hook-wm/compare/0.1.7...0.1.8
[0.1.7]: https://github.com/dacioromero/react-hook-wm/compare/0.1.6...0.1.7
[0.1.6]: https://github.com/dacioromero/react-hook-wm/compare/0.1.5...0.1.6
[0.1.5]: https://github.com/dacioromero/react-hook-wm/compare/0.1.4...0.1.5
[0.1.4]: https://github.com/dacioromero/react-hook-wm/compare/0.1.3...0.1.4
[0.1.3]: https://github.com/dacioromero/react-hook-wm/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/dacioromero/react-hook-wm/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/dacioromero/react-hook-wm/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/dacioromero/react-hook-wm/releases/tag/0.1.0
