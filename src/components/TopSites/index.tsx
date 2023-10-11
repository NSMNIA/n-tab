import React, { useState, useEffect } from "react";

type TopSite = {
    type: string;
    url: string;
    title: string;
    favicon: string | undefined | null;
};

const TopSites: React.FC = () => {
    const [topSites, setTopSites] = useState<TopSite[]>([]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore - Property 'topSites' does not exist on type 'typeof browser'.
        browser.topSites
            .get({
                includeFavicon: true,
                limit: 5,
            })
            .then((mostVisited: TopSite[]) => {
                setTopSites(mostVisited);
            });
    }, []);

    return (
        <div>
            <pre>{JSON.stringify(topSites, null, 2)}</pre>
        </div>
    );
};

export default TopSites;
