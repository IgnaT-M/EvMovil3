import * as React from "react";
import { IonImg } from "@ionic/react";

const ImgLoading: React.FunctionComponent = () => {
  return (
    <IonImg
      src="public/cargaLapras.gif"
      alt="Success Gif"
      style={{
        display: "block",
        margin: "0 auto",
        maxWidth: "75%",
        height: "auto",
      }}
    />
  );
};

export default ImgLoading;
