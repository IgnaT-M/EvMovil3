import React, { Dispatch, SetStateAction } from "react";
import CameraIcon from "@mui/icons-material/Camera";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";
import {
  Box,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  Typography,
} from "@mui/material";

interface ToggleTareasProps {
  setPhotos: Dispatch<SetStateAction<string[]>>;
  setLocation: Dispatch<SetStateAction<{ lat: number; lng: number } | null>>;
}

const ToggleTareas: React.FC<ToggleTareasProps> = ({
  setPhotos,
  setLocation,
}) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const takePhoto = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
      });
      setPhotos((prev) => [...prev, image.dataUrl || ""]);
    } catch (err) {
      console.error("Error al capturar la foto:", err);
    }
  };

  const getLocation = async () => {
    try {
      const position = await Geolocation.getCurrentPosition();
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    } catch (err) {
      console.error("Error al obtener la ubicación:", err);
    }
  };

  const actions = [
    { icon: <CameraIcon />, name: "Cámara", action: takePhoto },
    { icon: <LocationOnIcon />, name: "Ubicación", action: getLocation },
  ];

  return (
    <Box sx={{ position: "fixed", bottom: 20, right: 16 }}>
      <SpeedDial
        ariaLabel="Opciones de tareas"
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={() => {
              handleClose();
              action.action();
            }}
          />
        ))}
      </SpeedDial>
    </Box>
  );
};

export default ToggleTareas;
