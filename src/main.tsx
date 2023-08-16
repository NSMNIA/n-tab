import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import { ThemeProvider } from "./context/ThemeProvider.tsx";
import TimeProvider from "./context/TimeProvider.tsx";

ReactDOM.createRoot(document.getElementById("NTab")!).render(
    <React.StrictMode>
        <ThemeProvider defaultTheme="system">
            <TimeProvider>
                <App />
            </TimeProvider>
        </ThemeProvider>
    </React.StrictMode>
);
