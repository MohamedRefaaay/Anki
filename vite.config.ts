// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Defines the Vite configuration for the project.
export default defineConfig({
  // Include React plugin for Vite.
  plugins: [react()],
  // Set the base public path for the application when deployed.
  // For GitHub Pages, this should typically be the repository name,
  // preceded and followed by a slash.
  // Assuming the repository name is 'anki', the base path is '/anki/'.
  base: '/anki/',
});
