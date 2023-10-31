import Time from "@/components/Time";
// import Search from "@/components/Search";
import UnsplashImage from "./components/Unsplash";
import { lazy, useEffect } from "react";
import TopSites from "./components/TopSites";
const Settings = lazy(() => import("./components/Settings"));

const App = () => {
    useEffect(() => {
        if (!localStorage.getItem("date")) {
            localStorage.setItem("date", new Date().toISOString());
        }
        if (!localStorage.getItem("unsplash")) {
            localStorage.setItem("unsplash", "abstract");
        }
    }, []);

    useEffect(() => {
        const root = window.document.documentElement;
        const primaryColor = localStorage.getItem("primaryColor");
        if (primaryColor) root.style.setProperty("--primary", primaryColor);
    }, []);

    return (
        <div className="relative h-screen w-screen bg-black">
            <UnsplashImage />
            <Time />
            <TopSites />
            {/* <div className="absolute left-[50%] bottom-[5rem] translate-x-[-50%]">
                <Search />
            </div> */}
            <Settings />
        </div>
    );
};

export default App;
