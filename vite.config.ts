import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Importa path para resolver las rutas

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Define el alias @ para apuntar a la carpeta src
    },
  },
  build: {
    outDir: "dist", // Directorio donde se generan los archivos de salida
    emptyOutDir: true, // Limpia el directorio de salida antes de construir
  },
});
