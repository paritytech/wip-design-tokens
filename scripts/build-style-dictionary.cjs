const StyleDictionaryPackage = require("style-dictionary");

function createArray({ dictionary }) {
  const arr = dictionary.allTokens;
  return JSON.stringify(arr);
}

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED
StyleDictionaryPackage.registerFormat({
  name: "css/variables",
  formatter: function (dictionary, config) {
    return `${this.selector} {\n${dictionary.allProperties
      .map((prop) => `  --${prop.name}: ${prop.value};`)
      .join("\n")}\n}`;
  },
});

StyleDictionaryPackage.registerTransform({
  name: "sizes/px",
  type: "value",
  matcher: function (prop) {
    // You can be more specific here if you only want 'em' units for font sizes
    return [
      "fontSizes",
      "spacing",
      "borderRadius",
      "borderWidth",
      "sizing",
    ].includes(prop.attributes.category);
  },
  transformer: function (prop) {
    // You can also modify the value here if you want to convert pixels to ems
    return parseFloat(prop.original.value) + "px";
  },
});

function getStyleDictionaryConfig(theme, brand, sourcePath, buildPath) {
  return {
    source: [sourcePath],
    source: [`${sourcePath}/${theme}.json`],
    include: [`src/polkadot/token-transformer/global.json`],
    format: {
      createArray,
    },
    platforms: {
      web: {
        transforms: ["attribute/cti", "name/cti/kebab", "sizes/px"],
        buildPath,
        files: [
          {
            destination: `${theme}.json`,
            format: "createArray",
            filter: ({ isSource }) => {
              return isSource;
            },
          },
          {
            destination: `${theme}.css`,
            format: "css/variables",
            selector: `.${theme}-theme`,
            filter: ({ isSource }) => {
              return isSource;
            },
          },
        ],
      },
    },
  };
}

console.log("Build started...");

// PROCESS THE DESIGN TOKENS FOR THE DIFFERENT BRANDS

const args = process.argv.slice(2);
const brand = args[0];
const sourcePath = args[1];
const buildPath = args[2];

["global", "light", "dark"].map(function (theme) {
  console.log("\n==============================================");
  console.log(`\nProcessing: [${theme}]`);

  const StyleDictionary = StyleDictionaryPackage.extend(
    getStyleDictionaryConfig(theme, brand, sourcePath, buildPath)
  );

  StyleDictionary.buildPlatform("web");

  console.log("\nEnd processing");
});

console.log("\n==============================================");
console.log("\nBuild completed!");
