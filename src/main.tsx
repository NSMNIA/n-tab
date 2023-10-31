import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/globals.css";
import TimeProvider from "./context/TimeProvider.tsx";

ReactDOM.createRoot(document.getElementById("NTab")!).render(
    <>
        <TimeProvider>
            <App />
        </TimeProvider>
    </>
);
