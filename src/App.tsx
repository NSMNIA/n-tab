import Time from "@/components/Time";

const App = () => {
    return (
        <div className="relative h-screen w-screen">
            <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-center flex flex-col gap-3 p-4">
                <Time />
            </div>
        </div>
    );
};

export default App;
