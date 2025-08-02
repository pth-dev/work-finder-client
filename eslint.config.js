import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import importPlugin from "eslint-plugin-import";

export default tseslint.config([
  {
    ignores: ["dist/**", "node_modules/**", "vite.config.ts", "*.config.js"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      import: importPlugin,
    },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.app.json",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.app.json",
        },
      },
    },
    rules: {
      // Temporarily disable strict rules to focus on architecture
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-empty-object-type": "warn",
      "react-refresh/only-export-components": "warn",
      "no-useless-escape": "warn",

      // Bulletproof React Architecture Rules

      // 1. Prevent cross-feature imports
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // Features cannot import from other features
            {
              target: "./src/features/authentication/**/*",
              from: "./src/features/!(authentication)/**/*",
              message:
                "Cross-feature imports are not allowed. Features should be independent.",
            },
            {
              target: "./src/features/jobs/**/*",
              from: "./src/features/!(jobs)/**/*",
              message:
                "Cross-feature imports are not allowed. Features should be independent.",
            },
            {
              target: "./src/features/companies/**/*",
              from: "./src/features/!(companies)/**/*",
              message:
                "Cross-feature imports are not allowed. Features should be independent.",
            },
            {
              target: "./src/features/dashboard/**/*",
              from: "./src/features/!(dashboard)/**/*",
              message:
                "Cross-feature imports are not allowed. Features should be independent.",
            },
            {
              target: "./src/features/public/**/*",
              from: "./src/features/!(public)/**/*",
              message:
                "Cross-feature imports are not allowed. Features should be independent.",
            },

            // 2. Enforce unidirectional codebase flow: shared → features → app
            {
              target: [
                "./src/components/**/*",
                "./src/hooks/**/*",
                "./src/types/**/*",
                "./src/utils/**/*",
                "./src/config/**/*",
              ],
              from: ["./src/features/**/*", "./src/app/**/*"],
              message:
                "Shared modules cannot import from features or app layer. Flow should be: shared → features → app",
            },
            {
              target: "./src/features/**/*",
              from: "./src/app/**/*",
              message:
                "Features cannot import from app layer. Flow should be: shared → features → app",
            },
          ],
        },
      ],

      // 3. Enforce i18n usage - prevent hardcoded strings
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXText[value=/[a-zA-Z]/]",
          message:
            "Hardcoded text in JSX is not allowed. Use i18n with useTranslation hook: t('key')",
        },
        {
          selector: "Literal[value=/^[A-Z][a-zA-Z\\s]{2,}$/]",
          message:
            "Hardcoded strings are not allowed. Use i18n with useTranslation hook: t('key')",
        },
        {
          selector:
            "TemplateLiteral > TemplateElement[value.raw=/[A-Z][a-zA-Z\\s]{2,}/]",
          message:
            "Hardcoded strings in template literals are not allowed. Use i18n with useTranslation hook: t('key')",
        },
      ],
    },
  },
]);
