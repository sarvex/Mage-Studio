const config = {
  "presets": [
      "@babel/preset-env",
      "@babel/preset-react"
  ],
  "plugins": [
      "@babel/plugin-transform-runtime",
      "@babel/plugin-proposal-class-properties",
      "transform-dynamic-import", // needed to transform stuff like const component = await import('something');
      "@babel/plugin-syntax-dynamic-import"
  ]
};

module.exports = config;
