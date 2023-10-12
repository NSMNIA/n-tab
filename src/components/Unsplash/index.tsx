import { useEffect, useState } from "react";
import { buildLink, type Image } from "./utils/api";
import { cn } from "@/lib/utils";
import UnsplashCredits from "./credits";
import { fallbackImages } from "@/fallbackImages";
import { newImages, prefetchNewImage } from "./utils/images";

const UnsplashImage = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [currentImage, setCurrentImage] = useState<number | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);
    const blur = window !== undefined ? parseInt(localStorage.getItem("blur") ?? "0") : 0;
    const [currentThumbnail, setCurrentThumbnail] = useState<string | null>(window !== undefined ? localStorage.getItem("thumbnail") ?? "" : "");

    useEffect(() => {
        if (!loaded) return;
        const timer = setTimeout(() => {
            setCurrentThumbnail(null);
        }, 900);
        return () => clearTimeout(timer);
    }, [loaded]);

    useEffect(() => {
        if (!localStorage.getItem("images")) {
            newImages();
        }
        const date = new Date(localStorage.getItem("date")!);
        const today = new Date();
        if (date.getDate() !== today.getDate()) {
            localStorage.setItem("date", today.toISOString());
            newImages();
        } else {
            const images = JSON.parse(localStorage.getItem("images") ?? "[]");
            if (images.length === 0) {
                newImages();
            }
        }
    }, []);

    useEffect(() => {
        const imagesLocal = localStorage.getItem("images") ? (JSON.parse(localStorage.getItem("images") ?? "[]") as Image[]) : (fallbackImages as Image[]);
        setImages(imagesLocal);
        const currentImageNumber = localStorage.getItem("currentImage") ? parseInt(localStorage.getItem("currentImage") ?? "0") : 0;
        setCurrentImage(currentImageNumber % imagesLocal.length);
        prefetchNewImage(imagesLocal, currentImageNumber);
    }, []);

    useEffect(() => {
        if (currentImage === null) return;
        if (images.length > 0 && images?.[currentImage]) {
            setUrl(buildLink(images?.[currentImage].src));
        }
    }, [currentImage, images]);

    return (
        <div className="absolute h-full w-full top-0 left-0 overflow-hidden">
            <div className="h-full w-full bg-[#000] opacity-40 absolute left-0 top-0 select-none pointer-none z-30" />
            {currentThumbnail && (
                <img
                    src={currentThumbnail}
                    className={cn("absolute inset-0 h-full w-full object-cover z-20 opacity-100", {
                        "animate-thumbnail-blur opacity-0": loaded,
                    })}
                    alt="Unsplash background placeholder"
                />
            )}
            <img
                style={{ "--tw-blur": `blur(${blur}px)` } as React.CSSProperties}
                src={url || ""}
                fetch-priority="high"
                alt="Unsplash background"
                className={cn(`h-full w-full object-cover z-10 filter opacity-0`, {
                    "animate-un-blur opacity-1 scale-[1]": loaded && blur === 0,
                    "animate-un-blur-with-blur opacity-1 scale-[1.1]": loaded && blur > 0,
                    "scale-[1.2]": blur === 0,
                    "scale-[1.3]": blur > 0,
                })}
                onLoad={() => setLoaded(true)}
            />
            {url && currentImage !== null && <UnsplashCredits {...images?.[currentImage]?.credit} />}
        </div>
    );
};

export default UnsplashImage;
