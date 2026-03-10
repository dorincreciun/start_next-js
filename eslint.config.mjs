import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import reactPlugin from "eslint-plugin-react"
import importPlugin from "eslint-plugin-import"

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "@typescript-eslint": tsPlugin,
            react: reactPlugin,
            import: importPlugin,
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {
            // --- Next.js & Hooks ---
            "@next/next/no-img-element": "error",
            "@next/next/no-html-link-for-pages": "error",
            "react-hooks/exhaustive-deps": "warn",

            // --- TypeScript Rules ---
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { prefer: "type-imports", fixStyle: "inline-type-imports" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",

            // --- React & JSX Cleanliness ---
            "react/self-closing-comp": "warn",
            "react/jsx-no-leaked-render": ["error", { validStrategies: ["coerce", "ternary"] }],
            "react/no-array-index-key": "warn",

            // --- Import Ordering (Organizator de importuri) ---
            "import/order": [
                "warn",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        ["parent", "sibling"],
                        "index",
                        "object",
                    ],
                    pathGroups: [
                        {
                            pattern: "react",
                            group: "external",
                            position: "before",
                        },
                        {
                            pattern: "@/**",
                            group: "internal",
                        },
                    ],
                    pathGroupsExcludedImportTypes: ["react"],
                    "newlines-between": "always",
                    alphabetize: { order: "asc", caseInsensitive: true },
                },
            ],
        },
    },
    globalIgnores([
        ".next/**",
        "out/**",
        "build/**",
        "node_modules/**",
        "next-env.d.ts",
        "public/**",
    ]),
])

export default eslintConfig
