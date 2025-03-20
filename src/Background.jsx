// Background.jsx
import React from "react";
import { styled } from "@mui/system";
import backgroundImage from "./assets/background.png"; // Asegúrate de que la ruta y la extensión sean correctas

const BackgroundContainer = styled("div")({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
    backgroundImage: `url(${backgroundImage})`, // Usa la importación de la imagen
    backgroundSize: "cover",
    backgroundPosition: "center",
    opacity: 0.8,
});

const Background = () => {
    return <BackgroundContainer />;
};

export default Background;
