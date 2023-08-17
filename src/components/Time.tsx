import { useTime } from "@/hooks/useTime";

const Time = () => {
    const language = Intl.DateTimeFormat().resolvedOptions().locale;
    const time = useTime();

    return (
        <>
            <h1
                className="scroll-m-20 font-bold tracking-tight text-5xl sm:text-[12vw] leading-none lg:text-9xl"
                style={{
                    color: "var(--dynamic-color, white)",
                }}
            >
                {time.toLocaleString(language, {
                    hour: "numeric",
                    minute: "numeric",
                })}
            </h1>
            <h2
                className="text-lg font-semibold"
                style={{
                    color: "var(--dynamic-color, white)",
                }}
            >
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
