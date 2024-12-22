import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDUnebLM__ogO38dnMCdMUVTcqA_U69pVM",
  authDomain: "evamovil3-14cf0.firebaseapp.com",
  projectId: "evamovil3-14cf0",
  storageBucket: "evamovil3-14cf0.appspot.com",
  messagingSenderId: "145201639505",
  appId: "1:145201639505:web:",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de Firebase
export default app;
