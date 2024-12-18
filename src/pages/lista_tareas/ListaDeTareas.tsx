import * as React from "react";
import {
  IonToast,
  IonContent,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonIcon,
  IonCard,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";
import {
  trash,
  addCircleOutline,
  create,
  checkmark,
  flameSharp,
  thumbsDown,
  thumbsUp,
  closeCircleOutline,
} from "ionicons/icons";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import FileCopyIcon from "@mui/icons-material/FileCopyOutlined";
import SaveIcon from "@mui/icons-material/Save";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { Camera, CameraResultType } from "@capacitor/camera";
import { Geolocation } from "@capacitor/geolocation";

const actions = [
  { icon: <FileCopyIcon />, name: "Copy" },
  { icon: <SaveIcon />, name: "Save" },
  { icon: <PrintIcon />, name: "Print" },
  { icon: <ShareIcon />, name: "Share" },
  { icon: <FileCopyIcon />, name: "Camera" },
  { icon: <FileCopyIcon />, name: "Geolocation" },
];

const ListaDeTareas: React.FC = () => {
  const [items, setItems] = React.useState<
    { id: number; name: string; description: string; isEditing: boolean }[]
  >(() => {
    const savedItems = localStorage.getItem("myListItems");
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [showSuccessToast, setShowSuccessToast] = React.useState(false);
  const [showErrorToast, setShowErrorToast] = React.useState(false);
  const [showUpdateToast, setShowUpdateToast] = React.useState(false);
  const [showDeleteToast, setShowDeleteToast] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    setShowDeleteToast(true);
  };

  const openCamera = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
    });
    console.log(photo);
  };

  const getCurrentPosition = async () => {
    const coordinates = await Geolocation.getCurrentPosition();
    console.log("Current position:", coordinates);
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar className="page-header">
            <IonTitle
              style={{
                textAlign: "center",
                width: "100%",
                fontSize: "1.5rem",
              }}
            >
              Mi Lista
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonToast
            isOpen={showSuccessToast}
            position="top"
            onDidDismiss={() => setShowSuccessToast(false)}
            message="¡Objeto agregado correctamente!"
            duration={2000}
            color="success"
            icon={flameSharp}
          />
          <IonToast
            isOpen={showErrorToast}
            onDidDismiss={() => setShowErrorToast(false)}
            message="Por favor, completa todos los campos."
            duration={2000}
            color="danger"
            icon={thumbsDown}
          />
          <IonToast
            isOpen={showUpdateToast}
            onDidDismiss={() => setShowUpdateToast(false)}
            message="Objeto actualizado correctamente."
            duration={2000}
            color="tertiary"
            position="top"
            icon={thumbsUp}
          />
          <IonToast
            isOpen={showDeleteToast}
            onDidDismiss={() => setShowDeleteToast(false)}
            message="Objeto eliminado."
            duration={2000}
            color="warning"
            position="top"
            icon={closeCircleOutline}
          />

          <IonCard>
            <IonCardContent>
              <IonGrid>
                <IonRow>
                  <IonCol size="12">
                    <IonItem>
                      <IonLabel
                        position="floating"
                        style={{ textAlign: "center", fontSize: "25px" }}
                      >
                        Nombre
                      </IonLabel>
                      <br />
                      <IonInput
                        value={name}
                        onIonChange={(e) => setName(e.detail.value!)}
                        placeholder="Agregar objeto"
                        className="input-name"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12">
                    <IonItem>
                      <IonLabel
                        position="floating"
                        style={{ textAlign: "center", fontSize: "25px" }}
                      >
                        Descripción
                      </IonLabel>
                      <br />
                      <IonInput
                        value={description}
                        onIonChange={(e) => setDescription(e.detail.value!)}
                        placeholder="Agregar descripción"
                        className="input-description"
                      />
                    </IonItem>
                  </IonCol>
                  <IonCol size="12" className="ion-text-center">
                    <IonButton
                      style={{ marginTop: "20px" }}
                      expand="block"
                      onClick={addItem}
                      className="add-button"
                    >
                      <IonIcon icon={addCircleOutline} slot="start" />
                      Agregar objeto
                    </IonButton>
                  </IonCol>
                </IonRow>
              </IonGrid>
            </IonCardContent>
          </IonCard>

          <IonList>
            {items.map((item) => (
              <IonCard key={item.id} className="card-item">
                <IonCardContent className="card-content">
                  <IonItem lines="none">
                    {item.isEditing ? (
                      <>
                        <IonInput
                          value={item.name}
                          placeholder="Edit name"
                          className="edit-input"
                          onIonChange={(e) =>
                            setItems(
                              items.map((i) =>
                                i.id === item.id
                                  ? { ...i, name: e.detail.value! }
                                  : i
                              )
                            )
                          }
                        />
                        <IonInput
                          value={item.description}
                          placeholder="Edit description"
                          className="edit-input"
                          onIonChange={(e) =>
                            setItems(
                              items.map((i) =>
                                i.id === item.id
                                  ? { ...i, description: e.detail.value! }
                                  : i
                              )
                            )
                          }
                        />
                        <IonButton
                          color="success"
                          fill="clear"
                          onClick={() =>
                            updateItem(item.id, item.name, item.description)
                          }
                        >
                          <IonIcon icon={checkmark} />
                        </IonButton>
                      </>
                    ) : (
                      <IonLabel className="item-label">
                        <h2 className="item-title">{item.name}</h2>
                        <p className="item-description">{item.description}</p>
                      </IonLabel>
                    )}
                    <IonButton
                      color="primary"
                      fill="clear"
                      onClick={() => toggleEdit(item.id)}
                    >
                      <IonIcon icon={create} />
                    </IonButton>
                    <IonButton
                      color="danger"
                      fill="clear"
                      onClick={() => deleteItem(item.id)}
                    >
                      <IonIcon icon={trash} />
                    </IonButton>
                  </IonItem>
                </IonCardContent>
              </IonCard>
            ))}
          </IonList>

          <Box sx={{ height: 330, transform: "translateZ(0px)", flexGrow: 1 }}>
            <Backdrop open={open} />
            <SpeedDial
              ariaLabel="SpeedDial tooltip example"
              sx={{ position: "absolute", bottom: 16, right: 16 }}
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
                  tooltipOpen
                  onClick={() => {
                    handleClose();
                    if (action.name === "Camera") {
                      openCamera();
                    } else if (action.name === "Geolocation") {
                      getCurrentPosition();
                    } else if (action.name === "Save") {
                      addItem();
                    }
                  }}
                />
              ))}
            </SpeedDial>
          </Box>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ListaDeTareas;
