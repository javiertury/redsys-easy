# Changelog

## [3.0.2]

### Added

- Codebase migrated to typescript
- Generate CommonJS and ESM output
- Type tests

### Fixed

- Fill 3D Secure form in redirection test

## [3.0.1]

### Fixed

- Length of encrypted 3des message is now limited

## [3.0.0]

### Changed

- Removed internal parameters in the form of *paramInt*. User the new *raw* property instead.
- securePayment returns a boolean
- Parameter dateFrecuency renamed to dateFrequency
- Parameter CVV2 renamed to cvv

### Added

- A new parameter *raw* can be used to pass an object with redsys parameters that should not be formatted
- Updated currencies and error codes
- Add new formatted parameters, some related to paygold
- New transaction type PAYLINK
- Examples

## [2.0.0]

### Changed

- Monetary amounts are integers of smallest currency unit
- Some parameters are split into two: param and paramInt. param uses an ISO format while paramInt uses the internal redsys format. For inputs, paramInt has priority.

### Added

- Notification and web service response parameters are formatted
- Random transaction ID generator
