import * as React from "react";
import { IonCard, IonButton, IonPage, IonToolbar, IonButtons, IonBackButton, IonTitle } from "@ionic/react";
import { useHistory } from "react-router-dom"; // Para manejar la navegación

function Home() {
  const history = useHistory(); // Hook para manejar la navegación

  const handleClick = (path: string) => {
    history.push(path); // Navegar a la ruta especificada
  };

  return (
    <IonPage>
    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="Tab2" />
                        </IonButtons>
                        <IonTitle>Home</IonTitle>
    </IonToolbar>
    <IonCard
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        gap: "1rem",
        backgroundImage:
          'url("src/assets/pokeMD.png")', // Cambia esto por la ruta de tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <IonButton
        expand="block"
        color="primary"
        style={{ width: "80%" }}
        onClick={() => handleClick("/Tab1")}
      >
        PokeList
      </IonButton>
      <IonButton
        expand="block"
        color="primary"
        style={{ width: "80%" }}
        onClick={() => handleClick("/Tab4")}
      >
        Cartas Random
      </IonButton>
    </IonCard>
    </IonPage>
  );
}

export default Home;
