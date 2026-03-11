import fsd from "@feature-sliced/steiger-plugin"
import { defineConfig } from "steiger"

export default defineConfig([
    ...fsd.configs.recommended,
    {
        rules: {
            // Public API
            "fsd/public-api": "error",
            "fsd/no-public-api-sidestep": "error",
            "fsd/no-layer-public-api": "error",

            // Importuri (înlocuiește no-cross-imports + no-higher-level-imports)
            "fsd/forbidden-imports": "error",

            // Structură
            "fsd/ambiguous-slice-names": "error",
            "fsd/insignificant-slice": "warn", // warn, nu error – poate fi zgomotos
            "fsd/inconsistent-naming": "error",
            "fsd/no-processes": "error",
        },
    },
])
