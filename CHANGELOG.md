# Changelog

## [0.1.6] - 2020-02-17
### Fixed
- Call correct callback in useListener

## [0.1.5] - 2020-02-17
### Fixed
- Reset `useCounter` and `useHasPaid` when `monetizationstop` event's `finalized` property is `false`.

## [0.1.4] - 2019-11-02
### Changed
- Use [dacioromero/types-wm](https://github.com/dacioromero/react-hook-wm).

## [0.1.3] - 2019-12-02
### Added
- `useListener`.

### Changed
- Use [dacioromero/wm-types](https://github.com/dacioromero/wm-types) over local types.
- Use `useListener` in all hooks.


## [0.1.2] - 2019-11-24
### Changed
- Reset `useHasPaid` on `requestId` change.
- Reset `useCounter` on `requestId` change.
- Default `useCounter` scale to `0`.

## [0.1.1] - 2019-11-24
### Changed
- Remove `use-immer` dependency.

## [0.1.0] - 2019-11-23
### Added
- `useStatus`.
- `usePaymentPointer`.
- `useRequestId`.
- `useCounter`.
- `useHasPaid`.

[0.1.6]: https://github.com/dacioromero/react-hook-wm/compare/0.1.5...0.1.6
[0.1.5]: https://github.com/dacioromero/react-hook-wm/compare/0.1.4...0.1.5
[0.1.4]: https://github.com/dacioromero/react-hook-wm/compare/0.1.3...0.1.4
[0.1.3]: https://github.com/dacioromero/react-hook-wm/compare/0.1.2...0.1.3
[0.1.2]: https://github.com/dacioromero/react-hook-wm/compare/0.1.1...0.1.2
[0.1.1]: https://github.com/dacioromero/react-hook-wm/compare/0.1.0...0.1.1
[0.1.0]: https://github.com/dacioromero/react-hook-wm/releases/tag/0.1.0
