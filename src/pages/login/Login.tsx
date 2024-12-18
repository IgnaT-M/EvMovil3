import * as React from "react";
import { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import users from "../users.json";
import ErrorLogin from "../../components/imgErrorLogin/ErrorLogin";
import ImgLoading from "../../components/imgLoading/ImgLoading";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null);
  const [userName, setUserName] = useState<string>(""); // Estado para almacenar el nombre del usuario
  const history = useHistory();

  // Validación de credenciales
  const validateCredentials = (email: string, password: string): boolean => {
    const user = users.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      setUserName(user.name); // Guarda el nombre del usuario si las credenciales son correctas
      return true;
    }
    return false;
  };

  const handleLogin = () => {
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    if (validateCredentials(email, password)) {
      setError("");
      setIsLoggedIn(true);
      setRedirectTimer(3); // Inicia el temporizador para redirigir
    } else {
      setError("Credenciales inválidas.");
    }
  };

  // Redirección con temporizador
  useEffect(() => {
    if (isLoggedIn && redirectTimer !== null) {
      const interval = setInterval(() => {
        setRedirectTimer((prev) =>
          prev !== null && prev > 0 ? prev - 1 : null
        );
      }, 1000);

      if (redirectTimer === 0) {
        history.push("/tab1");
      }

      return () => clearInterval(interval); // Limpia el intervalo al desmontar
    }
  }, [isLoggedIn, redirectTimer, history]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ingresa a tu Cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* Contenedor principal para centrar el contenido */}
      <IonContent className="LoginContent">
        {!isLoggedIn ? (
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 400,
              margin: "auto",
              padding: 2,
            }}
            noValidate
            autoComplete="off"
          >
            {/* Campo de email */}
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              fullWidth
              required
              error={!!error && !email}
              helperText={!email && error ? "Por favor ingresa tu correo." : ""}
            />

            {/* Campo de contraseña */}
            <TextField
              id="password"
              label="Contraseña"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              fullWidth
              required
              error={!!error && !password}
              helperText={
                !password && error ? "Por favor ingresa tu contraseña." : ""
              }
            />

            {/* Botón de login */}
            <Button
              variant="contained"
              color="primary"
              onClick={handleLogin}
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Iniciar Sesión
            </Button>

            {/* Mensaje de error */}
            {error && !isLoggedIn && (
              <Alert severity="error" sx={{ marginTop: 2 }}>
                {error} <ErrorLogin />
              </Alert>
            )}
          </Box>
        ) : (
          <Box textAlign="center" mt={4}>
            {/* Mensaje de bienvenida y redirección */}
            <IonText color="success">
              <h2>Bienvenido, {userName}!</h2>
              {redirectTimer !== null && (
                <p>Redirigiendo en {redirectTimer} segundos...</p>
              )}
              <ImgLoading />
            </IonText>
          </Box>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;
