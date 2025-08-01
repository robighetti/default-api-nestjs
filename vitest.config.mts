import { resolve } from "path"
import swc from "unplugin-swc"
import { defineConfig } from "vitest/config"
import tsConfigPaths from "vite-tsconfig-paths"

export default defineConfig({
  test: {
    globals: true,
    root: "./",
    exclude: ["node_modules", "dist", "build"],
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
      src: "./src",
    },
  },  
})
