export const threeDSv1MerchantKey = 'sq7HjrUOBfKmC576ILgskD5srU870gJ7';

export const iniciaPeticionRequest = {
  DS_MERCHANT_AMOUNT: '3350',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_ORDER: '6705iUKijC4u',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_PAN: '4548812049400004',
  DS_MERCHANT_EXPIRYDATE: '3412',
  DS_MERCHANT_CVV2: '123',
  DS_MERCHANT_MERCHANTDATA: 'foo',
  DS_MERCHANT_EMV3DS: {
    threeDSInfo: 'CardData'
  }
} as const;

export const serializedAndSignedIniciaPeticionRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIzMzUwIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjY3MDVpVUtpakM0dSIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9QQU4iOiI0NTQ4ODEyMDQ5NDAwMDA0IiwiRFNfTUVSQ0hBTlRfRVhQSVJZREFURSI6IjM0MTIiLCJEU19NRVJDSEFOVF9DVlYyIjoiMTIzIiwiRFNfTUVSQ0hBTlRfTUVSQ0hBTlREQVRBIjoiZm9vIiwiRFNfTUVSQ0hBTlRfRU1WM0RTIjp7InRocmVlRFNJbmZvIjoiQ2FyZERhdGEifX0=',
  Ds_Signature: 'KkTVpA0TcVJIqMUEPB37VdhOA7QwFw90xP6gOPxBZ6k='
};

export const searializedInicaPeticionResponse = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19PcmRlciI6IjY3MDVpVUtpakM0dSIsIkRzX01lcmNoYW50Q29kZSI6Ijk5OTAwODg4MSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19FTVYzRFMiOnsicHJvdG9jb2xWZXJzaW9uIjoiTk9fM0RTX3YyIiwidGhyZWVEU0luZm8iOiJDYXJkQ29uZmlndXJhdGlvbiJ9LCJEc19DYXJkX1BTRDIiOiJZIn0=',
  Ds_Signature: 'WrrpqNduck5RJMC2cYb87Jj5WbV9p11KfWF64A0534E='
};

export const deserializedIniciaPeticionResponse = {
  Ds_Card_PSD2: 'Y',
  Ds_MerchantCode: '999008881',
  Ds_Order: '6705iUKijC4u',
  Ds_Terminal: '1',
  Ds_TransactionType: '0',
  Ds_EMV3DS: {
    protocolVersion: 'NO_3DS_v2',
    threeDSInfo: 'CardConfiguration'
  }
} as const;

export const authDataRequest = {
  DS_MERCHANT_AMOUNT: '3350',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_ORDER: '6705iUKijC4u',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_PAN: '4548812049400004',
  DS_MERCHANT_EXPIRYDATE: '3412',
  DS_MERCHANT_CVV2: '123',
  DS_MERCHANT_MERCHANTDATA: 'foo',
  DS_MERCHANT_EMV3DS: {
    protocolVersion: '1.0.2',
    threeDSInfo: 'AuthenticationData',
    browserAcceptHeader: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8,application/json',
    browserUserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98Safari/537.36'
  }
} as const;

export const serializedAndSignedAuthDataRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIzMzUwIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjY3MDVpVUtpakM0dSIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9QQU4iOiI0NTQ4ODEyMDQ5NDAwMDA0IiwiRFNfTUVSQ0hBTlRfRVhQSVJZREFURSI6IjM0MTIiLCJEU19NRVJDSEFOVF9DVlYyIjoiMTIzIiwiRFNfTUVSQ0hBTlRfTUVSQ0hBTlREQVRBIjoiZm9vIiwiRFNfTUVSQ0hBTlRfRU1WM0RTIjp7InByb3RvY29sVmVyc2lvbiI6IjEuMC4yIiwidGhyZWVEU0luZm8iOiJBdXRoZW50aWNhdGlvbkRhdGEiLCJicm93c2VyQWNjZXB0SGVhZGVyIjoidGV4dC9odG1sLGFwcGxpY2F0aW9uL3hodG1sK3htbCxhcHBsaWNhdGlvbi94bWw7cT0wLjksKi8qO3E9MC44LGFwcGxpY2F0aW9uL2pzb24iLCJicm93c2VyVXNlckFnZW50IjoiTW96aWxsYS81LjAgKFdpbmRvd3MgTlQgMTAuMDsgV2luNjQ7IHg2NCkgQXBwbGVXZWJLaXQvNTM3LjM2IChLSFRNTCwgbGlrZSBHZWNrbykgQ2hyb21lLzcxLjAuMzU3OC45OCBTYWZhcmkvNTM3LjM2In19',
  Ds_Signature: '0hXAqEusm1TeW6XGjRPvxos9ZLUP8OJj1HTzINAJ0LI='
};

export const serializedAuthDataResponse = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19BbW91bnQiOiIzMzUwIiwiRHNfQ3VycmVuY3kiOiI5NzgiLCJEc19PcmRlciI6IjY3MDVpVUtpakM0dSIsIkRzX01lcmNoYW50Q29kZSI6Ijk5OTAwODg4MSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1RyYW5zYWN0aW9uVHlwZSI6IjAiLCJEc19FTVYzRFMiOnsidGhyZWVEU0luZm8iOiJDaGFsbGVuZ2VSZXF1ZXN0IiwicHJvdG9jb2xWZXJzaW9uIjoiMS4wLjIiLCJhY3NVUkwiOiJodHRwczovL3Npcy1kLnJlZHN5cy5lcy9zaXMtc2ltdWxhZG9yLXdlYi8zRFMxL3BhcmVzLmpzcCIsIlBBUmVxIjoiZUp4VlV0dHVnekFNL1JYRXBMMk5KQVJFMjdtWnNwWnBmV0NxV3ZZQkVWZ3JVNkVzb2FQZDF5OXBZWmVIeUQ2MjQ4dXg0ZUZVNzcxUDFLWTZOSE9mQmRUM3NDa09aZFc4emYzWC9PbHU0ajhJeUhjYWNibkY0cWhSUUliR3FEZjBxbkx1bTdwVjFTbWNxQTVORjlJb1NsaElRMFl2Z2lZOHBwUXlIdmtDMW5LREh3S0dXc0tXQ2tJZ0k3UkpkYkZUVFNkQUZSK1BxeGNSeFRGTHBrQUdDRFhxMVZKczAwMldybVdXYmhiUDhpVUhjalZEbzJvVW0zUzc4Tkx0V3Q3ZWhIUjZMNEZjekZBY2prMm56eUlKSXlBamdLUGVpMTNYdFROQytyNFBOSmJtYkFJMHBGQ04ycU1KM2swTHhFVUIrZTF1ZlhTYXNWbFBWU215ZDNuT2NzbXpmTlZibldkZnIzMjJsTzdOZ2JnSUtDMDFZdVRFbzNSR2t4bVBnVnpzb0dyWGp1QThpS21kOVlxZ2RVWGs2SEtldnhhd2E5QjJTMmN4VFNaMm9CRUJudHBEZ3piQ0V2dWpRNG1tc0NNTTRyZi94YlBqdXVnc2ZTRmxVMFk1cFJHM0srUnM0bWkvZUZ6T3lyTEZJM1pONmdBUTk1Y01HeVhEUFZqdDM1MThBeGN0d2d3PSIsIk1EIjoiZWZjYTcyOTg5NDljZTEyMDQyYzRlNWRhOTVhMDdlMzI0ZjJkNWNiZCJ9fQ==',
  Ds_Signature: 'r48h-dm_iw1LGbyZJwrGsbjsDjMAtJhP4sFfuAd-vBc='
};

export const deserializedAuthDataResponse = {
  Ds_Amount: '3350',
  Ds_Currency: '978',
  Ds_Order: '6705iUKijC4u',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '1',
  Ds_TransactionType: '0',
  Ds_EMV3DS: {
    threeDSInfo: 'ChallengeRequest',
    protocolVersion: '1.0.2',
    acsURL: 'https://sis-d.redsys.es/sis-simulador-web/3DS1/pares.jsp',
    PAReq: 'eJxVUttugzAM/RXEpL2NJARE27mZspZpfWCqWvYBEVgrU6EsoaPd1y9pYZeHyD6248ux4eFU771P1KY6NHOfBdT3sCkOZdW8zf3X/Olu4j8IyHcacbnF4qhRQIbGqDf0qnLum7pV1SmcqA5NF9IoSlhIQ0YvgiY8ppQyHvkC1nKDHwKGWsKWCkIgI7RJdbFTTSdAFR+PqxcRxTFLpkAGCDXq1VJs002WrmWWbhbP8iUHcjVDo2oUm3S78NLtWt7ehHR6L4FczFAcjk2nzyIJIyAjgKPei13XtTNC+r4PNJbmbAI0pFCN2qMJ3k0LxEUB+e1ufXSasVlPVSmyd3nOcsmzfNVbnWdfr322lO7NgbgIKC01YuTEo3RGkxmPgVzsoGrXjuA8iKmd9YqgdUXk6HKevxawa9B2S2cxTSZ2oBEBntpDgzbCEvujQ4mmsCMM4rf/xbPjuugsfSFlU0Y5pRG3K+Rs4mi/eFzOyrLFI3ZN6gAQ95cMGyXDPVjt3518Axctwgw=',
    MD: 'efca7298949ce12042c4e5da95a07e324f2d5cbd'
  }
} as const;

export const threeDSChallengeForm = {
  url: 'https://sis-d.redsys.es/sis-simulador-web/3DS1/pares.jsp',
  body: {
    PaReq: 'eJxVUttugzAM/RXEpL2NJARE27mZspZpfWCqWvYBEVgrU6EsoaPd1y9pYZeHyD6248ux4eFU771P1KY6NHOfBdT3sCkOZdW8zf3X/Olu4j8IyHcacbnF4qhRQIbGqDf0qnLum7pV1SmcqA5NF9IoSlhIQ0YvgiY8ppQyHvkC1nKDHwKGWsKWCkIgI7RJdbFTTSdAFR+PqxcRxTFLpkAGCDXq1VJs002WrmWWbhbP8iUHcjVDo2oUm3S78NLtWt7ehHR6L4FczFAcjk2nzyIJIyAjgKPei13XtTNC+r4PNJbmbAI0pFCN2qMJ3k0LxEUB+e1ufXSasVlPVSmyd3nOcsmzfNVbnWdfr322lO7NgbgIKC01YuTEo3RGkxmPgVzsoGrXjuA8iKmd9YqgdUXk6HKevxawa9B2S2cxTSZ2oBEBntpDgzbCEvujQ4mmsCMM4rf/xbPjuugsfSFlU0Y5pRG3K+Rs4mi/eFzOyrLFI3ZN6gAQ95cMGyXDPVjt3518Axctwgw=',
    MD: 'efca7298949ce12042c4e5da95a07e324f2d5cbd',
    TermUrl: 'http://my-server:3000/post-challenge-v1'
  }
};

export const threeDSChallengeNotificationBody = {
  PaRes: 'eJztWVmz4kqOfudXVFQ/MlXeMJgOzunwjjE2eF/evOF9wQu2+fWdwKm659atiLkz89IPQwThtKxU\n' +
    'SkpJX8re/Wsqiy+3qO3Sunr7inyHv36JqqAO0yp++2ro3Dfi67/ed3rSRhGjRcHQRu87Keo6L46+\n' +
    'pOHb165svHRCCa+Puh6FV6sNgsIoAj8v8AbDYRhGsNXX992ZVKPuNScti8EL63ZNoCt8/Rf+1RYH\n' +
    '/B9KvQOdvqM76MctWL0NEq/q33decKUE+X2F48hmu4M+bndl1ArMu8aqEnsmJVal96Ss76AXeQf9\n' +
    'Mf88PEYdsGhKw3cpI2dJJzFJF0YwxqS7MUoM+fi/7aAHxy4EVr7/UPcLDP8T3vwTw3fQk75rHuLI\n' +
    'sh6AbAwYsoM+U3bAdy1w7fy+3RA76OfdLpqauooABzDy53gH/aFc41Xv8J9/KyAbUHe6/b7r0/K3\n' +
    'Sj3pu673+qF7d3bQx2gXeLfbO0mSFFlpDhuTr98h1j5GwNgnyy4K0ncYCHpcn7PIIq7btE/Kd+TF\n' +
    '8wdhBz1UgZ57/L7T0rgCi7XRFxBdVff2Nen75p8QNI7j9xH7XrcxhAIrIHgLAYawS+N/fH3NikKh\n' +
    'utT/o2m0V9VVGnhFevd6ECFS1Cd1+OWnbr8To6sPSQiksvQ3IOpbgKyqbw8KjCGP2IN+L/STZX9n\n' +
    'lV+VbTvvW5d4yGOBXwS979ToEj0iIvpiqMLb13/8vSRh0hjk3f9GmR+KfJbwQ57pFUP03hoodJwC\n' +
    '9WRvPXw5dPre2ly6jNPa+u3HvBfnDvqp/Ydpr3385K8X49DJXnaxFMeMmigp7Zg4Hq8nBY71Q08t\n' +
    'M9xxGX6U7Rtuotyxv6F2HUAy7OTS+YTU3cDIljUpoq1u8XC16PvZFONNfCEy7syP47IieU3ND8VA\n' +
    'O5OPyyGq1L151i535j4fl6Sli2WenvdestYnyan0lrfGVug5C2EXfXIrkDi0lx4lCBMer3I7S8+d\n' +
    'mgty492aW1aXqlrCB/20GWhkcmayKhvSkNQMS2z+JF2h5V1MUTVQo3rhoKt0yLeYp+DjFE9uFQYM\n' +
    'J/qQ3LZwI7gEfmKh5cFoNUblUvMqOxMF+xvNqzr0siTuMkqvTiI2sZIbDovwoB51xUA77Zraa06x\n' +
    'aq9WQ+i4h5uQNXyiHSBsqby9fYqpj10Ro/m1CzYObxmv914joeuGqNWiNvWKzxTZAwWDlt+iqY+q\n' +
    'MAIQ0EdtCa6gun1v2rqPgt4f5u9BXf7Xl5PxdvbmEtSqL0DSLQ2iDhDfmLQLalCqv3Bp5VUBWOHT\n' +
    '4+ObmoJnY12H4E7T34SiSKs6BTf0m6HtoF90eer20lMeSj9q3wl8++L6E/XzxM9maaLwTlEOy/GO\n' +
    'dTdD5wjdl3uhxKzZr1dFduHXp9uHOMD5mjL4GTDzhyuCIv3Wpd03VjKxD/j7Fn72RRuF3dx9fxpv\n' +
    'vKksoznaFwA9pkALJ+0Lw345qyea1UhJYGX99EX7fvz+8NPf5Ty+SV7YpuHTXT+G9Bv74azP6j71\n' +
    'p6O2Ty+gcAFAkgSBrTKaJldeTI4CRcYCTSLdyCjOQaxdIbkFMqmwR0ohx9hTJvpOHqhYNinS0cnC\n' +
    '1CWVHZnRYUxFERbsmBx8fmr8ctsEd1aXKJYnEYOlJkk0ygJ17QPmo9scPMslWng+oxPJV/ni7qBb\n' +
    '8FyIVVDRHAvPFp7FdQInF0HlNg5q3iU1H7nXSkd2ohTHLnrXwuE/8WjjKMZPHoad5SLaq4VfqsXC\n' +
    '5Ysh5M3Zt8wcCIZdDR+Dcgu7FqgclYkfS/nm62TEjfB00klUYpwPXKc8QJvBGNBeWL94ECVhz0tK\n' +
    'N9LKczWeHQ+ccWfPEgm/zKIkXre4PCiLXFKIhz8ffHt2dGXHUmfPUqbjnewXL2fW+qE4cConu8ZM\n' +
    '6ap5sDRDPuiIFKusERvc4azAJkhw5KAauKEDnmM+DpJGjEflwyWzqy1UQ9UtU4oN2NTMvGA0Y6sL\n' +
    'rMoJHKXpsMwZMCdrhnkyWSI2Zlw6ZuxdYl6bRE7S1UGn5mjLTTAj3EI3nTvQqHAwE8hG8mNFzT6m\n' +
    'gns1De18CEozD7DifiyB4wWBEjJSpuL8muQpvx1hCoQNR5InmlQIcvFgoGMR3LDk6GounCi5Zyty\n' +
    'Tx/DbSW4OSsZt5qyOkp17Juco24xi1cx5W+QEvPNHp9dKrlNlwN12SwOBsbS7NJU0ZVOHOf5TlX8\n' +
    'eobGJWvDVCPi2WTby8TejHhz2XJiUhFX+HqxGnzbl9aqqxm2LX1IcJdpyCxG/7TGlJBYAchpSu8E\n' +
    'D6voJOe+Btmb7QnB6+mWpTV9Ji3RdNfrG+9hE+IVB7ImznjoNnyKQKhUkfrmPCwOybzFm30YDCuZ\n' +
    '8O8chAkHa3+K91HEnv3tOfXiDO0kkqBv8nE9DqJ/vwYCLGDtYeNeOOzEXIfeysr1xLkL6pA6aHy7\n' +
    'V1R06YhwWYtMxym4TNaXdB4lhaHzASsIJHDEBnW9llMEhlRIql7xiCTws0QRj50NhVFxFhLlkdyJ\n' +
    'XVoefFnKWsu629y952dl77j2sXAl6hm4IRMrFkWpJdchtkVDBJTMhx7pyvXp4GDTkLV3UnoG7V4h\n' +
    'WEoBCSGSpASi/TH5oCiSRNY8TXc8qRgcNUq0xL4E70eVl1hlVK4HMsnwOtyr4yklbosQC7FjqTYB\n' +
    'Kt/CEsTaRwV4FACQ1HNI45mPwjcHO3TBvNVc2705KAd71nbQQeUIOQLEoDz7DCkv/hyA3UcAsmQb\n' +
    'xMfb1Pc+ZjjI9nIV+P00nyL4IE4xyPulDhVtwGNsHYjnjKgFSL8GC7nf93tDXK47cxmdzsEmS8Dh\n' +
    'ldz4Sp7VfCPyLmoyNzS0bZ0hBSXuPddxxN6j5/GSlQ3OUmy4lAJ+djhkcWpKU5Hn/Njb8nU976W+\n' +
    'RYC3uDt8lJN0Y+HUdA5UlOoccrpWHJc2FRTg0PVq6ML5WCrukJwswaioRNsvWo46TrMfFYLphfM5\n' +
    'Ve4XPOmTyyBPDo9GJLvX8NBAczyGqgY/c2g+dPFyGjuFnIqDht+PdXHhNGFl99BCmQ9H4e7UlBIm\n' +
    'WiaRTGQvtwfprBgZpsjGNshtjnGmrcO49JifzoNVM1hP36rqIEDx41DxK6r8FmbyO4AZbPgDZkzi\n' +
    '9zDjjv/xMKOMwg+YmfpPMLM/3HxMGQJwBXCThfwBibRn+I77JJAlPXi0jfePlnG0HrTsF1pGUw3D\n' +
    'HhcSmb/MSiTaNKWJ1cnzyyexTrNF5wNM89ECaCyN7E94aTTPdoGm4c1H1Z+aLsBDEajKerac+Rhg\n' +
    'SCnes/DEL+XGscbYeCRaWWSuLU28TtqvhTqd5agkspDCr5SfPIsH05Ehry8m0Auj5gqYO7j8A11x\n' +
    'GGwA8JnaOLZa/IoaYAP6J1owL7RY/BUuYPKJFuQLLbC9vzrzlz2HXwMksDes3bGhO1ORTtC2Rmy2\n' +
    'x0LjuC6cGt1ZYKUvUq6tiIOrjtNKJf2RX2nqKY/vVVJfmt7DSXrVTJDfmwWsrIgu7oglvqdVLakT\n' +
    '6nSz4IDwSy3BNtJiVK8whXDSUprpjVfCaWaeoLNTQUtxa61XmYaJFFzj6uVis/Zk3FYay+FJg5Pn\n' +
    'Y994OCSaG+a4BT3C+l4taje0OT1EvTJrNpuWX2Yqv2o0UdrSx3OqDS1Sp4cQLyjQkqejdr36ziaA\n' +
    'apWzs3OTxkPbNpcRi2cjOCaLmdPvmbrPOsZMnKYs1qZYGP6NHbiky3OGS4tppXWghK541OMGD/K5\n' +
    'wEa5WiJ01T1Y4v6+vNiPNFyfqAUCAg6+k5dnUdcklmdIK6aUenvCV3XCkMv0elB1omjunBzLYwQz\n' +
    'ZPgCgBXLxYqx0nG3VaEVInbqokLV6qRsyTApgsHMR/aRJiqsk8oeAoE7UjFLQY+VmVcwAxShyMsH\n' +
    'kggK+QOGAJJYALOUz1BCUXHcAgEcpQQMmVHyU4BKsGpGsRIrporgLL29CgdMfTsCVAlnPP8R8Iug\n' +
    'dEHF4EAAFonPP5JZeQbjEQXQsZduRmmiPionIV/c/HxqAky9SDOeBeX4lzK1AHWKiYEp5EFqWdzX\n' +
    'iau0N+3OTKithfbgtHk1qHaPyvt56SDZVJiKemN8z75SJgRBardeDZcjPDtb2UcXKzW7h87IYc1c\n' +
    'MFdFhUHFOQ9Qvd6eWEMyMwk/sx1ykTHLtbVjsyr6cS13lXE7aPzMKydFYDWRo8PEIY+L2/U+DzxJ\n' +
    '981Nu/OOpuVLd4UftsV0sz2ivCxviczsw/h8aTRmvmr7a1PAG0eDsLCRT8i4ufTrM18eIzqHF/Bq\n' +
    'G57g2kROBxTrgwm+Cd7MbNf6hpCUI4wV3DnPqqELDxtj0jbKRfZlUbw72vK8WXbspO+tdvYP4r0t\n' +
    'rMUdY/hpr1YOtlFcDLKrcfJjJtrMyxYt8AmtiIuYtFHsHPTEica/CyuF/oAV9BOs/HW//h9WnrBS\n' +
    '/efDyoEh0x+wwn+CFdCs3cBB8DdNG9h9jfx1x6kfGSqTDGBQYvqZrSek7qeTH3hkHrocVoScbspi\n' +
    'EDR8vjxRS3P2yFVPlVoYR5cMmfNoDsAepIvt7FYsrc5a0EsuoSPYnlP5G3+MEmry+2i6mOf1/rzR\n' +
    'buPBkItxU6DUFFZrSk5Yry9b9XZHWs1QR6u38oUVgIRYdyJ879wxauwhmOPNho2sQM1Lj+6Ixm8j\n' +
    'SA5u+d0aEvtecySzavH1DK9O98ZC2GaAkUQJNxeBWqzpHMoG0KzWsmI7umWZCZ+GnVqbkxbOjl4k\n' +
    '5NDqmq016tilViS3tYYgjRdle0RKiMFALm3RXjJ18M2FxOWhKFXnex5HLCTc6PNmfWkm31slwk0n\n' +
    'mKUsnpLBRFyRFqtl0l3PgT5f7lVWE8DHpyyOQJqFICbHR2iocAYq9sjVpCGe9SESBWU819fUMKCD\n' +
    'F0y6wwT7nhz3yhMhTs+XMHQGb6o0ZSVmLdagusxWJRkoucCojSJRz5wL2fEBIYogkc4DOh6HhFcS\n' +
    'q/D5BTMGiHeaBxBTvTDNYMFpI/qBHosnfCiOII4ORSnGHlSOzzBz+O86ls8Ny+L/2rF8blgWnzsW\n' +
    'e2ms2z5iD8bG5pZutGa3o9nkZ3x7Nty9xS4vl2h5BWdF6tyKty1EuXuBRDbWMZU1gWukBbQfA9o7\n' +
    'qnNp3HtCVLfHtE3d1RabZIpwubVEdsjdNHiL1jeX1oacpR55nXKFC5hRacHVFI8+4eqGGkxicd3i\n' +
    'Jzg742w20Dh1rqsD4+ASi0WOoq4lp1U1l2CimrmQRGl6OJVRQozsVdet1uS8XCXHMLgk1GCUTJst\n' +
    'usqjW2h/qAiol1dMhHLObQMS8x4v+0M3EmZN1Fxw79v9qi1TgtZSl7gmJhIKOVNv9sux3uAQmZMc\n' +
    'xB0X633i7jtta4ZS71+Fe7mmsXvkQTOAxg1RoZqz7mRfP50TrGjEc3v6fccC/fH+E/r5TvSPt6XP\n' +
    'b0LPL1qPzxifv3T9G0cy44s=',
  MD: 'efca7298949ce12042c4e5da95a07e324f2d5cbd'
};

export const challengeResponseRequest = {
  DS_MERCHANT_AMOUNT: '3350',
  DS_MERCHANT_CURRENCY: '978',
  DS_MERCHANT_MERCHANTCODE: '999008881',
  DS_MERCHANT_TERMINAL: '1',
  DS_MERCHANT_ORDER: '6705iUKijC4u',
  DS_MERCHANT_TRANSACTIONTYPE: '0',
  DS_MERCHANT_PAN: '4548812049400004',
  DS_MERCHANT_EXPIRYDATE: '3412',
  DS_MERCHANT_CVV2: '123',
  DS_MERCHANT_MERCHANTDATA: 'foo',
  DS_MERCHANT_EMV3DS: {
    protocolVersion: '1.0.2',
    threeDSInfo: 'ChallengeResponse',
    MD: 'efca7298949ce12042c4e5da95a07e324f2d5cbd',
    PARes: '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\\nb0LPL1qPzxifv3T9G0cy44s='
  }
} as const;

export const serializedAndSignedChallengeResponseRequest = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEU19NRVJDSEFOVF9BTU9VTlQiOiIzMzUwIiwiRFNfTUVSQ0hBTlRfQ1VSUkVOQ1kiOiI5NzgiLCJEU19NRVJDSEFOVF9NRVJDSEFOVENPREUiOiI5OTkwMDg4ODEiLCJEU19NRVJDSEFOVF9URVJNSU5BTCI6IjEiLCJEU19NRVJDSEFOVF9PUkRFUiI6IjY3MDVpVUtpakM0dSIsIkRTX01FUkNIQU5UX1RSQU5TQUNUSU9OVFlQRSI6IjAiLCJEU19NRVJDSEFOVF9QQU4iOiI0NTQ4ODEyMDQ5NDAwMDA0IiwiRFNfTUVSQ0hBTlRfRVhQSVJZREFURSI6IjM0MTIiLCJEU19NRVJDSEFOVF9DVlYyIjoiMTIzIiwiRFNfTUVSQ0hBTlRfTUVSQ0hBTlREQVRBIjoiZm9vIiwiRFNfTUVSQ0hBTlRfRU1WM0RTIjp7InByb3RvY29sVmVyc2lvbiI6IjEuMC4yIiwidGhyZWVEU0luZm8iOiJDaGFsbGVuZ2VSZXNwb25zZSIsIk1EIjoiZWZjYTcyOTg5NDljZTEyMDQyYzRlNWRhOTVhMDdlMzI0ZjJkNWNiZCIsIlBBUmVzIjoiZUp6dFdWbXo0a3FPZnVkWFZGUS9NbFhlTUpnT3p1bndqakUyZUYvZXZPRjl3UXUyK2ZXZHdLbTY1OWF0aUxrejg5SVBRd1RodEt4VVxuU2twSlg4cmUvV3NxaXkrM3FPM1N1bnI3aW55SHYzNkpxcUFPMHlwKysycm8zRGZpNjcvZWQzclNSaEdqUmNIUVJ1ODdLZW82TDQ2K1xucE9IYjE2NXN2SFJDQ2ErUHVoNkZWNnNOZ3NJb0FqOHY4QWJEWVJoR3NOWFg5OTJaVktQdU5TY3RpOEVMNjNaTm9DdDgvUmYrMVJZSFxuL0I5S3ZRT2R2cU03Nk1jdFdMME5FcS9xMzNkZWNLVUUrWDJGNDhobXU0TStibmRsMUFyTXU4YXFFbnNtSlZhbDk2U3M3NkFYZVFmOVxuTWY4OFBFWWRzR2hLdzNjcEkyZEpKekZKRjBZd3hxUzdNVW9NK2ZpLzdhQUh4eTRFVnI3L1VQY0xEUDhUM3Z3VHczZlFrNzVySHVMSVxuc2g2QWJBd1lzb00rVTNiQWR5MXc3ZnkrM1JBNzZPZmRMcHFhdW9vQUJ6RHk1M2dIL2FGYzQxWHY4SjkvS3lBYlVIZTYvYjdyMC9LM1xuU2ozcHU2NzMrcUY3ZDNiUXgyZ1hlTGZiTzBtU0ZGbHBEaHVUcjk4aDFqNUd3TmdueXk0SzBuY1lDSHBjbjdQSUlxN2J0RS9LZCtURlxuOHdkaEJ6MVVnWjU3L0w3VDByZ0NpN1hSRnhCZFZmZjJOZW43NXA4UU5JN2o5eEg3WHJjeGhBSXJJSGdMQVlhd1MrTi9mSDNOaWtLaFxudXRUL28ybTBWOVZWR25oRmV2ZDZFQ0ZTMUNkMStPV25icjhUbzZzUFNRaWtzdlEzSU9wYmdLeXFidzhLakNHUDJJTitML1NUWlg5blxubFYrVmJUdnZXNWQ0eUdPQlh3Uzk3OVRvRWowaUl2cGlxTUxiMTMvOHZTUmgwaGprM2Y5R21SK0tmSmJ3UTU3cEZVUDAzaG9vZEp3Q1xuOVdSdlBYdzVkUHJlMmx5NmpOUGErdTNIdkJmbkR2cXAvWWRwcjMzODVLOFg0OURKWG5heEZNZU1taWdwN1pnNEhxOG5CWTcxUTA4dFxuTTl4eEdYNlU3UnR1b3R5eHY2RjJIVUF5N09UUytZVFUzY0RJbGpVcG9xMXU4WEMxNlB2WkZPTk5mQ0V5N3N5UDQ3SWllVTNORDhWQVxuTzVPUHl5R3ExTDE1MWk1MzVqNGZsNlNsaTJXZW52ZGVzdFlueWFuMGxyZkdWdWc1QzJFWGZYSXJrRGkwbHg0bENCTWVyM0k3UzgrZFxubWd0eTQ5MmFXMWFYcWxyQ0IvMjBHV2hrY21heUtodlNrTlFNUzJ6K0pGMmg1VjFNVVRWUW8zcmhvS3QweUxlWXArRGpGRTl1RlFZTVxuSi9xUTNMWndJN2dFZm1LaDVjRm9OVWJsVXZNcU94TUYreHZOcXpyMHNpVHVNa3F2VGlJMnNaSWJEb3Z3b0I1MXhVQTc3WnJhYTA2eFxuYXE5V1EraTRoNXVRTlh5aUhTQnNxYnk5ZllxcGoxMFJvL20xQ3pZT2J4bXY5MTRqb2V1R3FOV2lOdldLenhUWkF3V0RsdCtpcVkrcVxuTUFJUTBFZHRDYTZndW4xdjJycVBndDRmNXU5QlhmN1hsNVB4ZHZibUV0U3FMMERTTFEyaURoRGZtTFFMYWxDcXYzQnA1VlVCV09IVFxuNCtPYm1vSm5ZMTJINEU3VDM0U2lTS3M2QlRmMG02SHRvRjkwZWVyMjBsTWVTajlxM3dsOCsrTDZFL1h6eE05bWFhTHdUbEVPeS9HT1xuZFRkRDV3amRsM3VoeEt6WnIxZEZkdUhYcDl1SE9NRDVtakw0R1REemh5dUNJdjNXcGQwM1ZqS3hEL2o3Rm43MlJSdUYzZHg5Znhwdlxudktrc296bmFGd0E5cGtBTEorMEx3MzQ1cXllYTFVaEpZR1g5OUVYN2Z2eis4TlBmNVR5K1NWN1lwdUhUWFQrRzlCdjc0YXpQNmo3MVxucDZPMlR5K2djQUZBa2dTQnJUS2FKbGRlVEk0Q1JjWUNUU0xkeUNqT1FheGRJYmtGTXFtd1Iwb2h4OWhUSnZwT0hxaFlOaW5TMGNuQ1xuMUNXVkhablJZVXhGRVJic21CeDhmbXI4Y3RzRWQxYVhLSlluRVlPbEprazB5Z0oxN1FQbW85c2NQTXNsV25nK294UEpWL25pN3FCYlxuOEZ5SVZWRFJIQXZQRnA3RmRRSW5GMEhsTmc1cTNpVTFIN25YU2tkMm9oVEhMbnJYd3VFLzhXampLTVpQSG9hZDVTTGFxNFZmcXNYQ1xuNVlzaDVNM1p0OHdjQ0laZERSK0RjZ3U3RnFnY2xZa2ZTL25tNjJURWpmQjAwa2xVWXB3UFhLYzhRSnZCR05CZVdMOTRFQ1ZoejB0S1xuTjlMS2N6V2VIUStjY1dmUEVnbS96S0lrWHJlNFBDaUxYRktJaHo4ZmZIdDJkR1hIVW1mUFVxYmpuZXdYTDJmVytxRTRjQ29udThaTVxuNmFwNXNEUkRQdWlJRkt1c0VSdmM0YXpBSmtodzVLQWF1S0VEbm1NK0RwSkdqRWZsd3lXenF5MVVROVV0VTRvTjJOVE12R0EwWTZzTFxuck1vSkhLWHBzTXdaTUNkcmhua3lXU0kyWmx3Nlp1eGRZbDZiUkU3UzFVR241bWpMVFRBajNFSTNuVHZRcUhBd0U4aEc4bU5GelQ2bVxuZ25zMURlMThDRW96RDdEaWZpeUI0d1dCRWpKU3B1TDhtdVFwdngxaENvUU5SNUlubWxRSWN2RmdvR01SM0xEazZHb3VuQ2k1Wnl0eVxuVHgvRGJTVzRPU3NadDVxeU9rcDE3SnVjbzI0eGkxY3g1VytRRXZQTkhwOWRLcmxObHdOMTJTd09Cc2JTN05KVTBaVk9IT2Y1VGxYOFxuZW9iR0pXdkRWQ1BpMldUYnk4VGVqSGh6MlhKaVVoRlgrSHF4R256Ymw5YXFxeG0yTFgxSWNKZHB5Q3hHLzdUR2xKQllBY2hwU3U4RVxuRDZ2b0pPZStCdG1iN1FuQjYrbVdwVFY5SmkzUmROZnJHKzloRStJVkI3SW16bmpvTm55S1FLaFVrZnJtUEN3T3liekZtMzBZREN1WlxuOE84Y2hBa0hhMytLOTFIRW52M3RPZlhpRE8wa2txQnY4bkU5RHFKL3Z3WUNMR0R0WWVOZU9PekVYSWZleXNyMXhMa0w2cEE2YUh5N1xuVjFSMDZZaHdXWXRNeHltNFROYVhkQjRsaGFIekFTc0lKSERFQm5XOWxsTUVobFJJcWw3eGlDVHdzMFFSajUwTmhWRnhGaExsa2R5SlxuWFZvZWZGbktXc3U2Mjl5OTUyZGw3N2oyc1hBbDZobTRJUk1yRmtXcEpkY2h0a1ZEQkpUTWh4N3B5dlhwNEdEVGtMVjNVbm9HN1Y0aFxuV0VvQkNTR1NwQVNpL1RINW9DaVNSTlk4VFhjOHFSZ2NOVXEweEw0RTcwZVZsMWhsVks0SE1zbndPdHlyNHlrbGJvc1FDN0ZqcVRZQlxuS3QvQ0VzVGFSd1Y0RkFDUTFITkk0NW1Qd2pjSE8zVEJ2TlZjMjcwNUtBZDcxbmJRUWVVSU9RTEVvRHo3RENrdi9oeUEzVWNBc21RYlxueE1mYjFQYytaampJOW5JVitQMDBueUw0SUU0eHlQdWxEaFZ0d0dOc0hZam5qS2dGU0w4R0M3bmY5M3REWEs0N2N4bWR6c0VtUzhEaFxubGR6NFNwN1ZmQ1B5TG1veU56UzBiWjBoQlNYdVBkZHh4TjZqNS9HU2xRM09VbXk0bEFKK2RqaGtjV3BLVTVIbi9OamI4blU5NzZXK1xuUllDM3VEdDhsSk4wWStIVWRBNVVsT29jY3JwV0hKYzJGUlRnMFBWcTZNTDVXQ3J1a0p3c3dhaW9STnN2V280NlRyTWZGWUxwaGZNNVxuVmU0WFBPbVR5eUJQRG85R0pMdlg4TkJBY3p5R3FnWS9jMmcrZFBGeUdqdUZuSXFEaHQrUGRYSGhOR0ZsOTlCQ21ROUg0ZTdVbEJJbVxuV2lhUlRHUXZ0d2ZwckJnWnBzakdOc2h0am5HbXJjTzQ5Smlmem9OVk0xaFAzNnJxSUVEeDQxRHhLNnI4Rm1ieU80QVpiUGdEWmt6aVxuOXpEamp2L3hNS09Nd2crWW1mcFBNTE0vM0h4TUdRSndCWENUaGZ3QmliUm4rSTc3SkpBbFBYaTBqZmVQbG5HMEhyVHNGMXBHVXczRFxuSGhjU21iL01TaVRhTktXSjFjbnp5eWV4VHJORjV3Tk04OUVDYUN5TjdFOTRhVFRQZG9HbTRjMUgxWithTHNCREVhaktlcmFjK1JoZ1xuU0NuZXMvREVMK1hHc2NiWWVDUmFXV1N1TFUyOFR0cXZoVHFkNWFna3NwRENyNVNmUElzSDA1RWhyeThtMEF1ajVncVlPN2o4QTExeFxuR0d3QThKbmFPTFphL0lvYVlBUDZKMW93TDdSWS9CVXVZUEtKRnVRTExiQzl2enJ6bHoySFh3TWtzRGVzM2JHaE8xT1JUdEMyUm15MlxueDBManVDNmNHdDFaWUtVdlVxNnRpSU9yanROS0pmMlJYMm5xS1kvdlZWSmZtdDdEU1hyVlRKRGZtd1dzcklndTdvZ2x2cWRWTGFrVFxuNm5TejRJRHdTeTNCTnRKaVZLOHdoWERTVXBycGpWZkNhV2Flb0xOVFFVdHhhNjFYbVlhSkZGemo2dVZpcy9aazNGWWF5K0ZKZzVQblxuWTk5NE9DU2FHK2E0QlQzQytsNHRhamUwT1QxRXZUSnJOcHVXWDJZcXYybzBVZHJTeDNPcURTMVNwNGNRTHlqUWtxZWpkcjM2emlhQVxuYXBXenMzT1R4a1BiTnBjUmkyY2pPQ2FMbWRQdm1iclBPc1pNbktZczFxWllHUDZOSGJpa3kzT0dTNHRwcFhXZ2hLNTQxT01HRC9LNVxud0VhNVdpSjAxVDFZNHY2K3ZOaVBORnlmcUFVQ0FnNitrNWRuVWRja2xtZElLNmFVZW52Q1YzWENrTXYwZWxCMW9tanVuQnpMWXdRelxuWlBnQ2dCWEx4WXF4MG5HM1ZhRVZJbmJxb2tMVjZxUnN5VEFwZ3NITVIvYVJKaXFzazhvZUFvRTdVakZMUVkrVm1WY3dBeFNoeU1zSFxua2dnSytRT0dBSkpZQUxPVXoxQkNVWEhjQWdFY3BRUU1tVkh5VTRCS3NHcEdzUklycG9yZ0xMMjlDZ2RNZlRzQ1ZBbG5QUDhSOEl1Z1xuZEVIRjRFQUFGb25QUDVKWmVRYmpFUVhRc1pkdVJtbWlQaW9uSVYvYy9IeHFBa3k5U0RPZUJlWDRseksxQUhXS2lZRXA1RUZxV2R6WFxuaWF1ME4rM09US2l0aGZiZ3RIazFxSGFQeXZ0NTZTRFpWSmlLZW1OOHo3NVNKZ1JCYXJkZURaY2pQRHRiMlVjWEt6VzdoODdJWWMxY1xuTUZkRmhVSEZPUTlRdmQ2ZVdFTXlNd2svc3gxeWtUSEx0YlZqc3lyNmNTMTNsWEU3YVB6TUt5ZEZZRFdSbzhQRUlZK0wyL1UrRHp4SlxuOTgxTnUvT09wdVZMZDRVZnRzVjBzejJpdkN4dmljenN3L2g4YVRSbXZtcjdhMVBBRzBlRHNMQ1JUOGk0dWZUck0xOGVJenFIRi9CcVxuRzU3ZzJrUk9CeFRyZ3dtK0NkN01iTmY2aHBDVUk0d1YzRG5QcXFFTER4dGowamJLUmZabFVidzcydks4V1hic3BPK3RkdllQNHIwdFxuck1VZFkvaHByMVlPdGxGY0RMS3JjZkpqSnRyTXl4WXQ4QW10aUl1WXRGSHNIUFRFaWNhL0N5dUYvb0FWOUJPcy9IVy8vaDlXbnJCU1xuL2VmRHlvRWgweCt3d24rQ0ZkQ3MzY0JCOERkTkc5aDlqZngxeDZrZkdTcVRER0JRWXZxWnJTZWs3cWVUSDNoa0hyb2NWb1NjYnNwaVxuRURSOHZqeFJTM1AyeUZWUGxWb1lSNWNNbWZOb0RzQWVwSXZ0N0ZZc3JjNWEwRXN1b1NQWW5sUDVHMytNRW1yeSsyaTZtT2YxL3J6UlxuYnVQQmtJdHhVNkRVRkZaclNrNVlyeTliOVhaSFdzMVFSNnUzOG9VVmdJUllkeUo4Nzl3eGF1d2htT1BOaG8yc1FNMUxqKzZJeG04alxuU0E1dStkMGFFdnRlY3lTemF2SDFESzlPOThaQzJHYUFrVVFKTnhlQldxenBITW9HMEt6V3NtSTd1bVdaQ1orR25WcWJreGJPamw0a1xuNU5EcW1xMDE2dGlsVmlTM3RZWWdqUmRsZTBSS2lNRkFMbTNSWGpKMThNMkZ4T1doS0ZYbmV4NUhMQ1RjNlBObWZXa20zMXNsd2swblxubUtVc25wTEJSRnlSRnF0bDBsM1BnVDVmN2xWV0U4REhweXlPUUpxRklDYkhSMmlvY0FZcTlzalZwQ0dlOVNFU0JXVTgxOWZVTUtDRFxuRjB5Nnd3VDduaHozeWhNaFRzK1hNSFFHYjZvMFpTVm1MZGFndXN4V0pSa291Y0NvalNKUno1d0wyZkVCSVlvZ2tjNERPaDZIaEZjU1xucS9ENUJUTUdpSGVhQnhCVHZURE5ZTUZwSS9xQkhvc25mQ2lPSUk0T1JTbkdIbFNPenpCeitPODZsczhOeStMLzJyRjhibGdXbnpzV1xuZTJtczJ6NWlEOGJHNXBadXRHYTNvOW5rWjN4N050eTl4UzR2bDJoNUJXZEY2dHlLdHkxRXVYdUJSRGJXTVpVMWdXdWtCYlFmQTlvN1xucW5OcDNIdENWTGZIdEUzZDFSYWJaSXB3dWJWRWRzamROSGlMMWplWDFvYWNwUjU1blhLRkM1aFJhY0hWRkk4KzRlcUdHa3hpY2QzaVxuSnpnNzQydzIwRGgxcnFzRDQrQVNpMFdPb3E0bHAxVTFsMkNpbXJtUVJHbDZPSlZSUW96c1ZkZXQxdVM4WENYSE1MZ2sxR0NVVEpzdFxudXNxalcyaC9xQWlvbDFkTWhITE9iUU1TOHg0diswTTNFbVpOMUZ4dzc5djlxaTFUZ3RaU2w3Z21KaElLT1ZOdjlzdXgzdUFRbVpNY1xueEIwWDYzM2k3anR0YTRaUzcxK0ZlN21tc1h2a1FUT0F4ZzFSb1pxejdtUmZQNTBUckdqRWMzdjZmY2NDL2ZIK0UvcjVUdlNQdDZYUFxuYjBMUEwxcVB6eGlmdjNUOUcwY3k0NHM9In19',
  Ds_Signature: 'm2rLWav+3xb3mjlSkD4Vo3gBNvpWWav3PQ5Q3tJphpM='
};

export const serializedChallengeResponseResponse = {
  Ds_SignatureVersion: 'HMAC_SHA256_V1',
  Ds_MerchantParameters: 'eyJEc19BbW91bnQiOiIzMzUwIiwiRHNfQ3VycmVuY3kiOiI5NzgiLCJEc19PcmRlciI6IjY3MDVpVUtpakM0dSIsIkRzX01lcmNoYW50Q29kZSI6Ijk5OTAwODg4MSIsIkRzX1Rlcm1pbmFsIjoiMSIsIkRzX1Jlc3BvbnNlIjoiMDAwMCIsIkRzX0F1dGhvcmlzYXRpb25Db2RlIjoiMzkyODgyIiwiRHNfVHJhbnNhY3Rpb25UeXBlIjoiMCIsIkRzX1NlY3VyZVBheW1lbnQiOiIyIiwiRHNfTGFuZ3VhZ2UiOiIxIiwiRHNfQ2FyZE51bWJlciI6IjQ1NDg4MSoqKioqKjAwMDQiLCJEc19NZXJjaGFudERhdGEiOiJmb28iLCJEc19DYXJkX0NvdW50cnkiOiI3MjQiLCJEc19DYXJkX0JyYW5kIjoiMSIsIkRzX1Byb2Nlc3NlZFBheU1ldGhvZCI6IjEifQ==',
  Ds_Signature: 'Vh8F7plUD5flHHPY_TcasGAEhvqMXNX_Vs4EGa0Hd9o='
};

export const deserializedChallengeResponseResponse = {
  Ds_Amount: '3350',
  Ds_Currency: '978',
  Ds_Order: '6705iUKijC4u',
  Ds_MerchantCode: '999008881',
  Ds_Terminal: '1',
  Ds_Response: '0000',
  Ds_AuthorisationCode: '392882',
  Ds_TransactionType: '0',
  Ds_SecurePayment: '2',
  Ds_Language: '1',
  Ds_CardNumber: '454881******0004',
  Ds_MerchantData: 'foo',
  Ds_Card_Country: '724',
  Ds_Card_Brand: '1',
  Ds_ProcessedPayMethod: '1'
} as const;
