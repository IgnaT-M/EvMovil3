import * as React from "react";
import ToggleTareas from "../../components/peripherals/ToggleMas";
import {
  IonToast,
  IonContent,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
} from "@ionic/react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Check as CheckIcon,
} from "@mui/icons-material";

const ListaDeTareas: React.FC = () => {
  const [items, setItems] = React.useState<
    { id: number; name: string; description: string; isEditing: boolean }[]
  >(() => {
    const savedItems = localStorage.getItem("myListItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);
  const [showDeleteToast, setShowDeleteToast] = React.useState(false);

  const [photos, setPhotos] = React.useState<string[]>([]);
  const [location, setLocation] = React.useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const addItem = () => {
    if (name.trim() && description.trim()) {
      const newItem = {
        id: Date.now(),
        name: name.trim(),
        description: description.trim(),
        isEditing: false,
      };
      setItems([...items, newItem]);
      setName("");
      setDescription("");
      setShowSuccessToast(true);
    } else {
      setShowErrorToast(true);
    }
  };

  const deleteItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
    setShowDeleteToast(true);
  };

  const toggleEdit = (id: number) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: !item.isEditing } : item
      )
    );
  };

  const updateItem = (id: number, newName: string, newDescription: string) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              name: newName,
              description: newDescription,
              isEditing: false,
            }
          : item
      )
    );
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi Lista</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonToast
          isOpen={showSuccessToast}
          message="¡Objeto agregado correctamente!"
          duration={2000}
          color="success"
        />
        <IonToast
          isOpen={showErrorToast}
          message="Por favor, completa todos los campos."
          duration={2000}
          color="danger"
        />
        <IonToast
          isOpen={showDeleteToast}
          message="Objeto eliminado."
          duration={2000}
          color="warning"
        />

        <Card sx={{ marginBottom: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Nombre"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Descripción"
                variant="outlined"
                fullWidth
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                variant="contained"
                color="primary"
                startIcon={<AddIcon />}
                fullWidth
                onClick={addItem}
              >
                Agregar objeto
              </Button>
            </Box>
          </CardContent>
        </Card>

        <IonList>
          {items.map((item) => (
            <Card key={item.id} sx={{ marginY: 1 }}>
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  {item.isEditing ? (
                    <>
                      <TextField
                        variant="outlined"
                        size="small"
                        value={item.name}
                        onChange={(e) =>
                          setItems(
                            items.map((i) =>
                              i.id === item.id
                                ? { ...i, name: e.target.value }
                                : i
                            )
                          )
                        }
                      />
                      <TextField
                        variant="outlined"
                        size="small"
                        value={item.description}
                        onChange={(e) =>
                          setItems(
                            items.map((i) =>
                              i.id === item.id
                                ? { ...i, description: e.target.value }
                                : i
                            )
                          )
                        }
                      />
                      <IconButton
                        color="success"
                        onClick={() =>
                          updateItem(item.id, item.name, item.description)
                        }
                      >
                        <CheckIcon />
                      </IconButton>
                    </>
                  ) : (
                    <Box>
                      <Typography variant="h6">{item.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </Box>
                  )}
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => toggleEdit(item.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => deleteItem(item.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ))}
        </IonList>

        {photos.length > 0 && (
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6">Fotos capturadas:</Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {photos.map((photo, index) => (
                  <img
                    key={index}
                    src={photo}
                    alt={`Captured ${index + 1}`}
                    style={{ width: 100, height: 100, objectFit: "cover" }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        )}

        {location && (
          <Card sx={{ marginTop: 2 }}>
            <CardContent>
              <Typography variant="h6">Ubicación actual:</Typography>
              <Typography variant="body2">Latitud: {location.lat}</Typography>
              <Typography variant="body2">Longitud: {location.lng}</Typography>
            </CardContent>
          </Card>
        )}
      </IonContent>
      <Box sx={{ position: "fixed", bottom: 16, right: 16 }}>
        <ToggleTareas setPhotos={setPhotos} setLocation={setLocation} />
      </Box>
    </IonPage>
  );
};

export default ListaDeTareas;
