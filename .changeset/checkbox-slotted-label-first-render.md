---
'@siemens/ix': patch
---

Fix `ix-checkbox` so a label passed in the default slot is shown from the first render. Before, the first render treated the checkbox as label-less, hid the label and then showed it in a second render.
