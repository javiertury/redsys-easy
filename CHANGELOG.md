# Changelog

## [2.0.0]

### Changed

- Monetary amounts are integers of smallest currency unit
- Some parameters are split into two: param and paramInt. param uses an ISO format while paramInt uses the internal redsys format. For inputs, paramInt has priority.

### Added

- Notification and web service response parameters are formatted
- Random transaction ID generator

## [3.0.0]

### Changed

- Removed internal parameters in the form of *paramInt*. User the new *raw* property instead.
- securePayment returns a boolean
- Parameter dateFrecuency renamed to dateFrequency

### Added

- A new parameter *raw* can be used to pass an object with redsys parameters that should not be formatted
- Updated currencies and error codes
- Add new formatted parameters, some related to paygold
- New transaction type PAYLINK
