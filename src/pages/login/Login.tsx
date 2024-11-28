import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonText,
  IonImg,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import users from "../users.json";
import ErrorLogin from "../../components/imgErrorLogin/ErrorLogin";
import ImgLoading from "../../components/imgLoading/ImgLoading";
import "./Login.css";

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
    const user = users.find((u) => u.email === email && u.password === password);
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
        setRedirectTimer((prev) => (prev !== null && prev > 0 ? prev - 1 : null));
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
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {!isLoggedIn ? (
          <>
            <IonItem>
              <IonLabel position="stacked"style={{fontSize:"40px",paddingBottom:"20px"}}>Email</IonLabel>
              <IonInput
                type="email"
                value={email}
                onIonChange={(e) => {
                  setEmail(e.detail.value!);
                  setError("");
                }}
                placeholder="Ingresa tu Correo"
                className="emailLogin"
                clearInput
              />
            </IonItem>
            <IonItem>
              <IonLabel position="stacked"style={{fontSize:"40px", paddingBottom:"20px" }}>Password</IonLabel>
              <IonInput
                type="password"
                value={password}
                onIonChange={(e) => {
                  setPassword(e.detail.value!);
                  setError("");
                }}
                placeholder="Ingresa tu Contraseña"
                className="passLogin"
                clearInput
              />
            </IonItem>
            <IonButton expand="block" onClick={handleLogin}>
              Login
            </IonButton>
            {error && (
              <IonText color="danger">
                <p>{error}</p>
                <ErrorLogin />

              </IonText>
            )}
          </>
        ) : (
          <>
            <IonText color="success"
                      style={{
                        textAlign: "center",
                      }}>
              <h2>Bienvenido, {userName}!</h2>
              {redirectTimer !== null && (
                <p>Redirigiendo {redirectTimer} second(s)...</p>
      
              )}
              <ImgLoading/>
            </IonText>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Login;
