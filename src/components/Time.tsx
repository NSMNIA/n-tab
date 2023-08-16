import { useTime } from "@/hooks/useTime";
import { useEffect, useState } from "react";

const Time = () => {
    const language = Intl.DateTimeFormat().resolvedOptions().locale;
    const time = useTime();
    const [textColor, setTextColor] = useState<string>("white");
    useEffect(() => {
        const textColor = localStorage.getItem("textColor") ?? "white";
        setTextColor(textColor);
    }, []);

    return (
        <>
            <h1
                className="scroll-m-20 font-bold tracking-tight text-5xl sm:text-[12vw] leading-none lg:text-9xl"
                style={{
                    color: textColor,
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
                    color: textColor,
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
