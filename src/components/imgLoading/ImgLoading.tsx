import * as React from "react";
import { IonImg } from "@ionic/react";

const ImgLoading: React.FunctionComponent = () => {
  return (
    <IonImg
      src="https://cdn.dribbble.com/users/621155/screenshots/2835314/simple_pokeball.gif"
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
