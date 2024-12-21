import * as React from "react";
import { useState, useEffect } from "react";
import {
  IonPage,
  IonContent,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Alert,
  Typography,
} from "@mui/material";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Resgitrate from "../registrate/Resgitrate";
import ErrorLogin from "../../components/imgErrorLogin/ErrorLogin";
import ImgLoading from "../../components/imgLoading/ImgLoading";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null);
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Por favor, complete todos los campos.");
      return;
    }

    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setIsLoggedIn(true);
      setRedirectTimer(3); // Temporizador de redirección
      setError("");
    } catch (error) {
      setError("Credenciales inválidas o error al iniciar sesión.");
    }
  };

  // Temporizador de redirección
  useEffect(() => {
    if (isLoggedIn && redirectTimer !== null) {
      const interval = setInterval(() => {
        setRedirectTimer((prev) =>
          prev !== null && prev > 0 ? prev - 1 : null
        );
      }, 1000);

      if (redirectTimer === 0) {
        history.push("/Tab3");
      }

      return () => clearInterval(interval);
    }
  }, [isLoggedIn, redirectTimer, history]);

  return (
    <IonPage>
      <IonContent className="LoginContent">
        <Box
          sx={{
            background: "linear-gradient(90deg, #0f0c29, #302b63, #24243e)",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {!isLoggedIn ? (
            <Box
              component="form"
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
                maxWidth: 400,
                width: "90%",
                padding: 3,
                backgroundColor: "rgba(81, 47, 168, 0.01)",
                borderRadius: 4,
                boxShadow: "4px 4px 10px rgba(255, 255, 255, 0.58)",
              }}
              noValidate
              autoComplete="off"
            >
              <Typography
                variant="h5"
                align="center"
                textTransform="uppercase"
                sx={{ color: "white", fontWeight: "bold" }}
              >
                Pokelogeate
              </Typography>

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
                helperText={
                  !email && error ? "Por favor ingresa tu correo." : ""
                }
                InputProps={{
                  style: { color: "white" },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />

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
                InputProps={{
                  style: { color: "white" },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                fullWidth
                sx={{ marginTop: 2, textTransform: "uppercase" }}
              >
                Iniciar Sesión
              </Button>

              <Resgitrate />

              {error && !isLoggedIn && (
                <Alert severity="error" sx={{ marginTop: 2 }}>
                  {error} <ErrorLogin />
                </Alert>
              )}
            </Box>
          ) : (
            <Box textAlign="center" mt={4}>
              <IonText color="success">
                <h2>Bienvenido!</h2>
                {redirectTimer !== null && (
                  <p>Redirigiendo en {redirectTimer} segundos...</p>
                )}
                <ImgLoading />
              </IonText>
            </Box>
          )}
        </Box>
      </IonContent>
    </IonPage>
  );
};

export default Login;
