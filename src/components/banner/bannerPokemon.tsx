import React from "react";
import { IonCol, IonCard, IonCardContent } from "@ionic/react";

const BannerPokemon: React.FC = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", marginBottom: "10px", color: "#fff" }}>
        ¡Bienvenido a la PokeApp!
      </h1>

      <IonCol>
        <IonCard style={{ padding: "0", overflow: "hidden", height: "150px", width: "100%" }}>
          <img
            src="https://elmundodeoffstrings.wordpress.com/wp-content/uploads/2012/06/bannerpkm.png?w=634"
            alt="Banner"
            style={{
              height: "100%", // Ajusta la altura de la imagen al 100% del card
              width: "100%", // Ajusta el ancho de la imagen al 100% del card
              objectFit: "fill", // La imagen se ajusta al tamaño del card
            }}
          />
        </IonCard>
      </IonCol>
    </>
  );
};

export default BannerPokemon;
