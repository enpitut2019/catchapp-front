module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/eslint-recommended",

    "plugin:prettier/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: ["@typescript-eslint", "html"],
  parser: "@typescript-eslint/parser",
  env: { browser: true, node: true, es6: true },
  parserOptions: {
    sourceType: "module"
  },
  rules: {
    // 適当なルール
    "@typescript-eslint/no-non-null-assertion": 0,
    "max-len": ["error", { code: 160 }],
    "prettier/prettier": [
      "error",
      {
        printWidth: 160
      }
    ]
  }
};
