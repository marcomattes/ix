---
'@siemens/ix': patch
---

Fix nested components losing their host classes after server-side rendering with `@siemens/ix/hydrate` and client-side hydration, e.g. a disabled **ix-select-item** looking enabled, and the inner `ix-dropdown-item` or the `ix-field-wrapper` of **ix-input** missing the `hydrated` class.
