import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: `http://localhost:${process.env.PORT}/`,
    videoUploadOnPasses: false,
  },
});
