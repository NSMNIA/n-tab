import Time from "@/components/Time";
// import Search from "@/components/Search";
import UnsplashImage from "./components/Unsplash";

const App = () => {
    return (
        <div className="relative h-screen w-screen">
            <UnsplashImage />
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col gap-3 p-4 z-30">
                <Time />
            </div>
            {/* <div className="absolute left-[50%] bottom-[5rem] translate-x-[-50%]">
                <Search />
            </div> */}
        </div>
    );
};

export default App;
