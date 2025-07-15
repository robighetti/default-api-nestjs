import { resolve } from "path"
import swc from "unplugin-swc"
import { defineConfig } from "vitest/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  test: {
    include: ["**/*.e2e-spec.ts"],
    globals: true,
    root: "./",
    setupFiles: ["./test/setup-e2e.ts"],
  },
  plugins: [
    // This is required to build the test files with SWC
    tsConfigPaths(),
    swc.vite({
      // Explicitly set the module type to avoid inheriting this value from a `.swcrc` config file
      module: { type: "es6" },
    }),
  ],
  resolve: {
    alias: {
      // Ensure Vitest correctly resolves TypeScript path aliases
      src: resolve(__dirname, "./src"),
    },
  },
})
