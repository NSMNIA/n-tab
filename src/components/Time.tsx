import { useTime } from "@/hooks/useTime";

const Time = () => {
    const language = Intl.DateTimeFormat().resolvedOptions().locale;
    const time = useTime();

    return (
        <>
            <h1 className="scroll-m-20 text-6xl font-bold tracking-tight lg:text-8xl">
                {time.toLocaleString(language, {
                    hour: "numeric",
                    minute: "numeric",
                })}
            </h1>
            <h2 className="text-md">
                {time.toLocaleString(language, {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                })}
            </h2>
        </>
    );
};

export default Time;
