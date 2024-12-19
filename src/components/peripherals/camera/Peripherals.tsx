// import * as React from "react";
// import { useState } from "react";
// import {
//   IonPage,
//   IonHeader,
//   IonToolbar,
//   IonTitle,
//   IonContent,
//   IonButton,
//   IonImg,
//   IonText,
// } from "@ionic/react";
// import { Camera, CameraResultType } from "@capacitor/camera";
// import { Geolocation } from "@capacitor/geolocation";

// const Peripherals: React.FC = () => {
//   const [photo, setPhoto] = useState<string | null>(null);
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);

//   const takePhoto = async () => {
//     try {
//       const image = await Camera.getPhoto({
//         quality: 90,
//         allowEditing: false,
//         resultType: CameraResultType.DataUrl, // Returns base64-encoded string
//       });
//       setPhoto(image.dataUrl || null);
//       setError(null);
//     } catch (err) {
//       setError("Failed to capture photo.");
//       console.error(err);
//     }
//   };

//   const getLocation = async () => {
//     try {
//       const position = await Geolocation.getCurrentPosition();
//       setLocation({
//         lat: position.coords.latitude,
//         lng: position.coords.longitude,
//       });
//       setError(null);
//     } catch (err) {
//       setError("Failed to get location.");
//       console.error(err);
//     }
//   };

//   return (
//     <IonPage>
//       <IonHeader>
//         <IonToolbar>
//           <IonTitle>Camara y Localización</IonTitle>
//         </IonToolbar>
//       </IonHeader>
//       <IonContent className="ion-padding">
//         <IonButton expand="block" onClick={takePhoto}>
//           Toma una Foto
//         </IonButton>
//         {photo && (
//           <IonImg
//             src={photo}
//             alt="Captured photo"
//             style={{ margin: "20px auto", maxWidth: "100%" }}
//           />
//         )}
//         <IonButton expand="block" onClick={getLocation}>
//           Mostrar Ubicación
//         </IonButton>
//         {location && (
//           <IonText>
//             <p>Latitude: {location.lat}</p>
//             <p>Longitude: {location.lng}</p>
//           </IonText>
//         )}
//         {error && (
//           <IonText color="danger">
//             <p>{error}</p>
//           </IonText>
//         )}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default Peripherals;
