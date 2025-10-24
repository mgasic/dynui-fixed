# @dynui/design-tokens

This package centralises the design token source of truth for DynUI. It
currently exposes a TypeScript object for consumption during runtime or
build steps and ships with a stubbed CSS variable generator under
`build/`.

Future phases should expand the token structure (color, typography,
spacing, motion, etc.) and replace the stub in
`build/generate-css-variables.mjs` with a real generator that writes the
compiled CSS to `dist/tokens.css`.
