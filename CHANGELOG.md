# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [3.1.0](https://github.com/javiertury/redsys-easy/compare/v2.0.0...v3.1.0) (2020-12-03)


### Features

* add lint script ([da6b8e5](https://github.com/javiertury/redsys-easy/commit/da6b8e54fc23a6a8a4f45ed7d4def6b8584138b9))
* allow to specify an amountType ([4cf3eb8](https://github.com/javiertury/redsys-easy/commit/4cf3eb8e6c76357cb66a305fb574d3c325921f87))
* error classes ([b2f6f99](https://github.com/javiertury/redsys-easy/commit/b2f6f998bc69cc24cfe7d7a9efd4db050b03f2c3))
* improve manual redirection test ([9f2ba96](https://github.com/javiertury/redsys-easy/commit/9f2ba966ab0bc4421defc49108771339be594568))
* introduce new parameters ([10b060a](https://github.com/javiertury/redsys-easy/commit/10b060aebf29a4b7d5e8e04d9d2278921d784cc9))
* limit lenght of 3des encrypted text ([7a1c7af](https://github.com/javiertury/redsys-easy/commit/7a1c7afb4b41a4effdb259f05c14105fbbad8d89))
* more reliable response formatting ([d76773b](https://github.com/javiertury/redsys-easy/commit/d76773b54b6c2af79b6473ddf58d9d94d3a8d62e))
* no default currency ([23c3bef](https://github.com/javiertury/redsys-easy/commit/23c3befcb270803ca2e1dc77182fd888ccfbbffa))
* raw input parameters ([d3d726d](https://github.com/javiertury/redsys-easy/commit/d3d726d832fcaa471390f26fa468e4093831d490))
* release version 3 ([9f07c20](https://github.com/javiertury/redsys-easy/commit/9f07c20fba857268296d0011040d49aa9b7de5dd))
* replace CVV2 with cvv ([8404cc0](https://github.com/javiertury/redsys-easy/commit/8404cc01c95d54bf648e0dda81480dc9c3a9d3c1))
* tests for types ([a45d76f](https://github.com/javiertury/redsys-easy/commit/a45d76fa2610b0ac3d2418a76951ecb8e643f523))
* typescript, rollup and tests ([a3f97ec](https://github.com/javiertury/redsys-easy/commit/a3f97ec81cd6140a25dff759d55f5cd74bb867d9))
* **doc:** explain smallest currency unit ([f6f6611](https://github.com/javiertury/redsys-easy/commit/f6f661132215a1b7cf0a8c03cad78c58b8ff8f94))
* **doc:** remove currencies and raw section ([2ae6bc8](https://github.com/javiertury/redsys-easy/commit/2ae6bc89b15e05048d960d32c0e0464825220826))
* update error codes ([003e6f6](https://github.com/javiertury/redsys-easy/commit/003e6f6527e9178e5e6ab080322080862f9a4d68))


### Bug Fixes

* currency code format ([531ca39](https://github.com/javiertury/redsys-easy/commit/531ca39c85c2e50e0edbbb53e3af9c737a36b1d2))
* currency table ([420a8c0](https://github.com/javiertury/redsys-easy/commit/420a8c07ed6cef2e5fcc18aa1a31a1f489bfdb3f))
* escape forward slash in petition params json ([91109fe](https://github.com/javiertury/redsys-easy/commit/91109fe2640da264d882a53a68cc8c95bc9ebf25))

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
