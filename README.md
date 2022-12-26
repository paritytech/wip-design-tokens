# Design tokens


This example illustrates how you can transform your tokens stored on [Figma Tokens](https://www.figma.com/community/plugin/843461159747178978/Figma-Tokens) (with GitHub sync enabled) to be automatically transformed with [token-transformer](https://www.npmjs.com/package/token-transformer) and [Style Dictionary](https://amzn.github.io/style-dictionary/#/).

Change your tokens in [polkadot.json](https://github.com/paritytech/wip-design-tokens/blob/main/src/polkadot/figma-exporter/polkadot.json) (either directly or with the Figma Tokens plugin in Figma).

CSS variables will be generated in the [output directory](https://github.com/paritytech/wip-design-tokens/tree/main/src/polkadot/style-dictionary) which could be used for Tailwind utility classes generation.

## Usage 

global:
```
import global from "https://raw.githubusercontent.com/paritytech/wip-design-tokens/main/src/polkadot/style-dictionary/global.json" assert {
  type: "json",
};
```
light theme:
```
import light from "https://raw.githubusercontent.com/paritytech/wip-design-tokens/main/src/polkadot/style-dictionary/light.json" assert {
  type: "json",
};
```
dark theme:
```
import dark from "https://raw.githubusercontent.com/paritytech/wip-design-tokens/main/src/polkadot/style-dictionary/dark.json" assert {
  type: "json",
};
```

## Installation 

1. install dependencies
```
npm install
```

2. build tokens
```
npm run build
```

## Why we need design tokens?


Design tokens are visual design elements that can be standardized and reused across a design system. They are used to help ensure that the design of a product is consistent across different platforms and devices, maintaining a consistent look and feel across different components.


Design tokens include things like colors, typography, spacing, and other design elements that can be easily referenced and implemented consistently throughout a design project.

## Formats

Tokens are defined using JSON format and CSS variables, e.g
```
  {
    "value": "#e6007a",
    "type": "color",
    "filePath": "src/themes/polkadot/tokens/global.json",
    "isSource": true,
    "original": { "value": "#e6007a", "type": "color" },
    "name": "pink-500",
    "attributes": { "category": "pink", "type": "500" },
    "path": ["pink", "500"]
  },
```

```
  --pink-500: #e6007a;
```

