import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: "jsdom",
    env: {
      MICROCMS_SERVICE_DOMAIN: "test-domain",
      MICROCMS_API_KEY: "test-key",
    },
    globals: true,
    setupFiles: ["src/__tests__/setup/vitest-setup.ts"],
  },
});
