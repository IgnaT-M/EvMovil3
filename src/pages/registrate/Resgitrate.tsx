import { Box, Button, Modal, Typography, TextField } from "@mui/material";
import React, { useState } from "react";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none", // Eliminamos el borde para un diseño más limpio
  boxShadow: "0px 4px 10px rgba(63, 81, 181, 0.5)", // Sombra color índigo
  borderRadius: 4, // Bordes redondeados
  p: 4,
  textAlign: "center", // Centrar el texto
};

const Resgitrate = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateName = (value: string) => {
    const nameRegex = /^[A-Za-zÀ-ÿ\s]{3,}$/;
    setNameError(!nameRegex.test(value));
  };

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(!emailRegex.test(value));
  };

  const validatePassword = (value: string) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;
    setPasswordError(!passwordRegex.test(value));
  };

  const validateConfirmPassword = (value: string) => {
    setConfirmPasswordError(value !== password);
  };

  const buttonStyle = {
    width: "100%",
    height: "38px", // Altura uniforme para todos los botones
    textTransform: "uppercase", // Texto en mayúsculas
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        sx={buttonStyle}
      >
        Regístrate
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            ...style,
            backgroundColor: "rgba(230, 230, 230, 0.95)",
            borderRadius: 4,
            boxShadow: "0px 4px 10px rgba(231, 231, 233, 0.77)",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ color: "rgba(6, 6, 6, 0.41)", fontWeight: "bold" }}
          >
            Regístrate
          </Typography>

          {/* Campos para que los usuarios llenen sus datos */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              backgroundColor: "rgba(255, 255, 255, 0.41)",
              borderRadius: 4,
              padding: 3,
              boxShadow: "0px 4px 10px rgba(57, 34, 210, 0.43)",
            }}
          >
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                validateName(e.target.value);
              }}
              error={nameError}
              helperText={
                nameError
                  ? "El nombre debe tener al menos 3 caracteres y solo letras."
                  : ""
              }
            />

            <TextField
              label="Correo Electrónico"
              type="email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                validateEmail(e.target.value);
              }}
              error={emailError}
              helperText={emailError ? "Introduce un correo válido." : ""}
            />

            <TextField
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePassword(e.target.value);
              }}
              error={passwordError}
              helperText={
                passwordError
                  ? "Debe tener al menos 6 caracteres, una mayúscula, un número y un caracter especial."
                  : ""
              }
            />

            <TextField
              label="Repetir Contraseña"
              type="password"
              variant="outlined"
              fullWidth
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                validateConfirmPassword(e.target.value);
              }}
              error={confirmPasswordError}
              helperText={
                confirmPasswordError ? "Las contraseñas no coinciden." : ""
              }
            />

            <Button
              variant="contained"
              color="primary"
              sx={buttonStyle}
              disabled={
                nameError ||
                emailError ||
                passwordError ||
                confirmPasswordError ||
                !name ||
                !email ||
                !password ||
                !confirmPassword
              }
            >
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Resgitrate;
