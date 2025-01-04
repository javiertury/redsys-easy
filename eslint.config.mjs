import love from "eslint-config-love";

export default [
  love,
  {
    files: ['**/*.cjs', '**/*.mjs', '**/*.js', '**/*.ts'],
    languageOptions: {
      parserOptions: {
        projectService: {
          allowDefaultProject: ['eslint.config.js', 'eslint.config.mjs', '*.js', '*.mjs', '*.ts', '*.mts'],
          defaultProject: './tsconfig.json',
        },
      },
    },
    rules: {
      "no-console": [
        "error",
        {
          allow: ["error", "warn"],
        },
      ],
      "max-lines": "off",
      "prefer-destructuring": "off",
      "no-magic-numbers": "off",
      "complexity": "off",
      "@typescript-eslint/strict-boolean-expressions": [
        "error",
        {
          allowString: true,
          allowNumber: true,
          allowNullableObject: true,
        },
      ],
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/prefer-destructuring": "off",
      "@typescript-eslint/no-magic-numbers": "off",
      "@typescript-eslint/consistent-type-imports": ["error"],
    },
  },
  {
    "files": ["test/**", "**/*.test.ts"],
    rules: {
      "eslint-comments/require-description": "off",
      "complexity": "off",
      "max-nested-callbacks": "off",
      "@typescript-eslint/no-unsafe-type-assertion": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/init-declarations": "off",
      "@typescript-eslint/no-unnecessary-condition": "off",
      "@typescript-eslint/no-confusing-void-expression": "off"
    }
  },
  {
    ignores: ["lib/**", "examples/**"],
  },
];
