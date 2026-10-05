---
'@siemens/ix': minor
---

Add CSS parts to the form controls so applications can style their internal elements with `::part()`:

- `ix-input` and `ix-number-input`: `input`
- `ix-textarea`: `textarea`
- `ix-select`: `control`, `input`, `dropdown-button`, `dropdown`
- `ix-input`, `ix-number-input`, `ix-textarea` and `ix-select` also forward `label`, `required-indicator`, `helper-text` and `helper-text-icon`
- `ix-field-label`: `label`, `required-indicator`
- `ix-helper-text`: `helper-text`, `helper-text-icon`
- `ix-checkbox`: `control`, `checkmark`, `label`
- `ix-radio`: `control`, `checkmark`, `label`
- `ix-toggle`: `control`, `track`, `thumb`, `label`

The thumb of `ix-toggle` is now an element instead of a pseudo-element, so it can be exposed as a part; it looks the same.
