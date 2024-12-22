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
    IonButtons,
    IonBackButton,
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
import app from "../../firebaseConfig";
import { getDatabase, ref, push, onValue, remove, update } from "firebase/database";
import { Storage } from '@capacitor/storage';


const ListaDeTareas: React.FC = () => {
    const [items, setItems] = React.useState<
        { id: string; name: string; description: string; isEditing: boolean }[]
    >([]);
    const [name, setName] = React.useState("");
    const [description, setDescription] = React.useState("");

    const [showSuccessToast, setShowSuccessToast] = React.useState(false);
    const [showErrorToast, setShowErrorToast] = React.useState(false);
    const [showDeleteToast, setShowDeleteToast] = React.useState(false);
    const [showUpdateToast, setShowUpdateToast] = React.useState(false);

    const [photos, setPhotos] = React.useState<string[]>([]);
    const [location, setLocation] = React.useState<{
        lat: number;
        lng: number;
    } | null>(null);

    const database = getDatabase(app);

    React.useEffect(() => {
        const loadStoredData = async () => {
            try {
                const storedPhotos = await Storage.get({ key: 'photos' });
                const storedLocation = await Storage.get({ key: 'location' });

                if (storedPhotos.value) {
                    setPhotos(JSON.parse(storedPhotos.value));
                }
                if (storedLocation.value) {
                    setLocation(JSON.parse(storedLocation.value));
                }

            } catch (error) {
              console.error('Error loading stored data:', error);
            }
        };

        const itemsRef = ref(database, "tasks");
        onValue(itemsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const tasks = Object.entries(data).map(([key, value]: any) => ({
                    id: key,
                    ...value,
                }));
                setItems(tasks);
            } else {
                setItems([]);
            }
        });
        loadStoredData();
    }, []);

    const addItem = async () => {
        if (name.trim() && description.trim()) {
            const newItem = {
                name: name.trim(),
                description: description.trim(),
                isEditing: false,
            };
            const itemsRef = ref(database, "tasks");
            await push(itemsRef, newItem);
            setName("");
            setDescription("");
            setShowSuccessToast(true);
        } else {
            setShowErrorToast(true);
        }
    };

    const deleteItem = (id: string) => {
        const itemRef = ref(database, `tasks/${id}`);
        remove(itemRef);
        setShowDeleteToast(true);
    };

    const toggleEdit = (id: string) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, isEditing: !item.isEditing } : item
            )
        );
    };

    const updateItem = (id: string, newName: string, newDescription: string) => {
        const itemRef = ref(database, `tasks/${id}`);
        update(itemRef, {
            name: newName,
            description: newDescription,
            isEditing: false,
        });
        setShowUpdateToast(true);
    };



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="Tab3" />
                    </IonButtons>
                    <IonTitle>Agrega tus Tareas</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonToast
                    isOpen={showSuccessToast}
                    message="¡Objeto agregado correctamente!"
                    duration={2000}
                    color="success"
                    onDidDismiss={() => setShowSuccessToast(false)}
                />
                <IonToast
                    isOpen={showErrorToast}
                    message="Por favor, completa todos los campos."
                    duration={2000}
                    color="danger"
                    onDidDismiss={() => setShowErrorToast(false)}
                />
                <IonToast
                    isOpen={showDeleteToast}
                    message="¡Objeto eliminado correctamente!"
                    duration={2000}
                    color="warning"
                    onDidDismiss={() => setShowDeleteToast(false)}
                />
                <IonToast
                    isOpen={showUpdateToast}
                    message="¡Objeto actualizado correctamente!"
                    duration={2000}
                    color="tertiary"
                    onDidDismiss={() => setShowUpdateToast(false)}
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

                {/* Mostrar fotos y ubicación */}
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