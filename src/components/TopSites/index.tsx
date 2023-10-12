/* eslint-disable @typescript-eslint/ban-ts-comment */

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

type TopSite = {
    type: string;
    url: string;
    title: string;
    favicon: string | undefined | null;
};

const TopSites: React.FC = () => {
    const showTopSites = typeof window !== "undefined" && localStorage.getItem("showTopSites") === "true";
    const [topSites, setTopSites] = useState<TopSite[]>([]);

    useEffect(() => {
        // @ts-ignore - Browser API (is available)
        if (typeof browser === "undefined") return;
        // @ts-ignore - Browser API (is available)
        browser.topSites
            .get({
                includeFavicon: true,
                limit: 5,
            })
            .then((mostVisited: TopSite[]) => {
                setTopSites(mostVisited);
            });
    }, []);

    if (!showTopSites) return null;

    return (
        <div className="absolute left-[50%] bottom-[20px] translate-x-[-50%] text-center flex gap-3 p-4 z-30 items-center">
            {topSites.map((site, idx) => (
                <a
                    key={idx}
                    href={site.url}
                    className={cn(`flex flex-col items-center gap-2 w-20 overflow-hidden hover:text-dynamic hover:underline`)}
                >
                    {site.favicon && (
                        <div className="flex w-12 h-12 rounded-full bg-dynamic items-center justify-center">
                            <img
                                src={site.favicon}
                                alt={site.title}
                                className="w-8 h-8 rounded-md "
                                style={{
                                    filter: "gray(1)",
                                    mixBlendMode: "multiply",
                                }}
                            />
                        </div>
                    )}
                    <span className="text-xs text-dynamic overflow-hidden truncate w-full">{site.title}</span>
                </a>
            ))}
        </div>
    );
};

export default TopSites;