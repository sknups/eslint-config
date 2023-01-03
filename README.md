# eslint-config

This is the eslint configuration used for JavaScript development at SKNUPS.

This configuration is strongly influenced by StandardJS, but more relaxed.

We permit arbitrary vertical whitespace.

We require semicolons.

We permit trailing commas (in multi-line arrays).

We do not permit the `for..in` loop.

We downgrade the `no-unused-vars` and `no-trailing-whitespace` rules to warnings - it's unbearable to see errors the very instant one starts typing.

---

SKNUPS eslint configuration is MIT Licensed.

We reproduce configuration from:

- `eslint-config-google` which has Apache License 2.0
- `eslint-config-standard` which has MIT License
