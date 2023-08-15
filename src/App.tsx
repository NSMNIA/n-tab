import Time from "@/components/Time";

const App = () => {
    return (
        <div className="relative h-screen w-screen">
            <div className="absolute h-full w-full top-0 left-0">
                <div className="h-full w-full bg-[#000] opacity-20 absolute left-0 top-0 select-none pointer-none" />
                <img
                    className="h-full w-full object-cover"
                    src="/background.webp"
                    alt="Background"
                />
            </div>
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col gap-3 p-4">
                <Time />
            </div>
        </div>
    );
};

export default App;
