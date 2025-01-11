import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    apiUrl: "http://localhost:8091",
  },
  e2e: {
    setupNodeEvents() {},
    baseUrl: "http://localhost:4200",
  },
});
