<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [redsys-easy](./redsys-easy.md) &gt; [usePromiseOutputFormatter](./redsys-easy.usepromiseoutputformatter.md)

## usePromiseOutputFormatter variable

Applies an output formatter to the resolved ouput promise of a function

**Signature:**

```typescript
usePromiseOutputFormatter: <A, B, C>(fn: (a: A) => Promise<B>, outputFormatter: (b: B) => C) => (a: A) => Promise<C>
```
