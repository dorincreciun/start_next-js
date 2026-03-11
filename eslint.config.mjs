import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import reactPlugin from "eslint-plugin-react"
import importPlugin from "eslint-plugin-import"
import boundaries from "eslint-plugin-boundaries"

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    {
        files: ["**/*.{js,jsx,ts,tsx}"],
        plugins: {
            "@typescript-eslint": tsPlugin,
            react: reactPlugin,
            import: importPlugin,
            boundaries,
        },
        settings: {
            "boundaries/elements": [
                { type: "app", pattern: "src/app/**" },
                { type: "pages", pattern: "src/pages/**" },
                { type: "widgets", pattern: "src/widgets/**" },
                { type: "features", pattern: "src/features/**" },
                { type: "entities", pattern: "src/entities/**" },
                { type: "shared", pattern: "src/shared/**" },
            ],
            "boundaries/ignore": ["**/*.test.*", "**/*.spec.*"],
        },
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: "latest",
                sourceType: "module",
            },
        },
        rules: {
            // --- FSD Layer Rules ---
            "boundaries/element-types": [
                "error",
                {
                    default: "disallow",
                    rules: [
                        // app poate importa orice
                        {
                            from: "app",
                            allow: ["pages", "widgets", "features", "entities", "shared"],
                        },
                        // pages -> mai jos de pages
                        { from: "pages", allow: ["widgets", "features", "entities", "shared"] },
                        // widgets -> mai jos de widgets
                        { from: "widgets", allow: ["features", "entities", "shared"] },
                        // features -> mai jos de features
                        { from: "features", allow: ["entities", "shared"] },
                        // entities -> doar shared
                        { from: "entities", allow: ["shared"] },
                        // shared -> nimic intern
                        { from: "shared", allow: [] },
                    ],
                },
            ],

            // --- Next.js & Hooks ---
            "@next/next/no-img-element": "error",
            "@next/next/no-html-link-for-pages": "error",
            "react-hooks/exhaustive-deps": "warn",

            // --- TypeScript ---
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
            "@typescript-eslint/consistent-type-imports": [
                "warn",
                { prefer: "type-imports", fixStyle: "inline-type-imports" },
            ],
            "@typescript-eslint/no-explicit-any": "warn",

            // --- React ---
            "react/self-closing-comp": "warn",
            "react/jsx-no-leaked-render": ["error", { validStrategies: ["coerce", "ternary"] }],
            "react/no-array-index-key": "warn",

            // --- Import Ordering ---
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
                        { pattern: "react", group: "external", position: "before" },
                        { pattern: "@/**", group: "internal" },
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
