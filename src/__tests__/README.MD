# Tests

## Naming conventions

### Name segments

- Test file names suffixed with _.test.js_;
- Test file names are prefixed by _domains._;
- The part in-between prefix and suffix is the _identifier_;

### Domains

| domain     | description                                                                         |
| ---------- | ----------------------------------------------------------------------------------- |
| w3c        | related to w3c standard specifications, such as the CSS and HTML standards          |
| custom     | related to HTML component customization behavior, usually in the form of props      |
| regression | testing against regressions&mdash;the name should be the issue identifier on Github |

### Identifiers

| domain     | identifier                 |
| ---------- | -------------------------- |
| w3c        | _standard_._rule_          |
| custom     |                            |
| regression | _issue-number_._qualifier_ |
