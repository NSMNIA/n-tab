type By = "official" | "collections" | "search" | "topics";

export interface Data {
    by: By;
    collections: string;
    featured: boolean;
    paused?: boolean;
    search: string;
    topics: string;
    timeout: number;
}

export interface Image {
    src: string;
    credit: {
        imageLink: string;
        location?: string;
        userName: string;
        userLink: string;
    };
}

// type Config = Pick<Data, "by" | "collections" | "featured" | "search" | "topics">;

export const fetchImages = async (): // { by, collections, featured, topics, search }: Config
Promise<Image[]> => {
    const url = `https://api.unsplash.com/photos/random`;
    const params = new URLSearchParams();
    const headers = new Headers({
        Authorization: `Client-ID ${import.meta.env.VITE_APP_UNSPLASH_ACCESS_KEY}`,
    });
    params.set("count", "10");
    params.set("orientation", "landscape");
    params.set("query", "abstract");
    params.set("featured", "true");

    // switch (by) {
    //     case "collections":
    //         params.set("collections", collections);
    //         break;

    //     case "topics":
    //         params.set("topics", topics);
    //         params.set("orientation", "landscape");
    //         break;

    //     case "search":
    //         params.set("orientation", "landscape");
    //         if (featured) params.set("featured", "true");
    //         if (search) params.set("query", search);
    //         break;
    // }

    const res = await fetch(`${url}?${params}`, { headers, cache: "no-cache" });
    const body = await res.json();
    return body.map(
        (item: {
            urls: {
                raw: string;
            };
            links: {
                html: string;
            };
            location?: {
                name: string;
            };
            user: {
                name: string;
                links: {
                    html: string;
                };
            };
        }) => ({
            src: item.urls.raw,
            credit: {
                imageLink: item.links.html,
                location: item.location ? item.location.name : null,
                userName: item.user.name,
                userLink: item.user.links.html,
            },
        })
    );
};

export const buildLink = (src: string): string => {
    const url = new URL(src);
    url.searchParams.set("q", "85");
    url.searchParams.set("w", String(calculateWidth(window.innerWidth, window.devicePixelRatio)));
    return String(url);
};

export function calculateWidth(screenWidth = 1920, pixelRatio = 1): number {
    screenWidth = screenWidth * pixelRatio;
    screenWidth = Math.max(screenWidth, 1920);
    screenWidth = Math.min(screenWidth, 3840);
    screenWidth = Math.ceil(screenWidth / 240) * 240;
    return screenWidth;
}
