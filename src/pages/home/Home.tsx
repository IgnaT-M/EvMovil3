import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { IonCard } from "@ionic/react";
import { useHistory } from "react-router-dom"; // Para manejar la navegación

const images = [
  {
    url: "public/pokeList.jpg",
    alt: "PokeList",
    path: "/Tab1", // Ruta correcta para Tab1
  },
  {
    url: "public/pocket.jpg",
    alt: "Cartas Random",
    path: "/Tab4", // Ruta correcta para Tab4
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "50vh", // Ocupa la mitad de la altura de la pantalla
  [theme.breakpoints.down("sm")]: {
    height: "50vh", // Mantiene la altura para móviles
  },
}));

const ImageSrc = styled("span")({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%", // Asegura que ocupe todo el ancho
  height: "100%",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
});

const ImageBackdrop = styled("span")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create("opacity"),
}));

function Home() {
  const history = useHistory(); // Hook para manejar la navegación

  const handleClick = (path: string) => {
    history.push(path); // Navegar a la ruta especificada
  };

  return (
    <IonCard>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100vh",
          overflow: "hidden", // Asegura que no haya desbordamiento
        }}
      >
        {images.map((image, index) => (
          <ImageButton
            focusRipple
            key={index}
            onClick={() => handleClick(image.path)} // Maneja la navegación al hacer clic
            style={{
              height: "50vh", // Altura estándar para pantallas grandes y pequeñas
            }}
          >
            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
            <ImageBackdrop className="MuiImageBackdrop-root" />
          </ImageButton>
        ))}
      </Box>
    </IonCard>
  );
}

export default Home;
