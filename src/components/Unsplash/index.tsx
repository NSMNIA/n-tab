/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { buildLink, fetchImages, type Image } from "./api";
import { cn } from "@/lib/utils";
import UnsplashCredits from "./credits";
import { fallbackImages } from "@/fallbackImages";
import ColorThief from "colorthief";
import { rgbaToThumbHash, thumbHashToDataURL } from "thumbhash";

export const newImages = async () => {
    const query = localStorage.getItem("unsplash") ?? undefined;
    await fetchImages(query)
        .then(images => {
            localStorage.setItem("images", JSON.stringify(images));
        })
        .catch(() => {
            localStorage.setItem("images", JSON.stringify(fallbackImages));
        });
};

function generatePastelColor(rgb: number[]) {
    const r = Math.floor((rgb[0] + 255) / 2);
    const g = Math.floor((rgb[1] + 255) / 2);
    const b = Math.floor((rgb[2] + 255) / 2);
    if (r < 160 && g < 160 && b < 160) {
        return `rgb(${r + 50},${g + 50},${b + 50})`;
    }
    return `rgb(${r},${g},${b})`;
}

const UnsplashImage = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [currentImage, setCurrentImage] = useState<number | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);
    const blur = window !== undefined ? parseInt(localStorage.getItem("blur") ?? "0") : 0;
    const [currentThumbnail, setCurrentThumbnail] = useState<string | null>(window !== undefined ? localStorage.getItem("thumbnail") ?? "" : "");

    const getImageData = (image: HTMLImageElement) => {
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        const scale = 100 / Math.max(image.width, image.height);
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        context!.drawImage(image, 0, 0, canvas.width, canvas.height);
        const pixels = context!.getImageData(0, 0, canvas.width, canvas.height);
        const binaryThumbHash = rgbaToThumbHash(pixels.width, pixels.height, pixels.data);
        const placeholderURL = thumbHashToDataURL(binaryThumbHash);
        return placeholderURL;
    };

    const loadImage = async (src: string) =>
        new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.loading = "lazy";
            img.alt = "Unsplash background prefetch";
            img.onload = () => resolve(img);
            img.onerror = (...args) => reject(args);
            img.src = src;
            const classes = ["fixed", "top-0", "left-0", "overflow-hidden", "invisible", "z-0"];
            img.classList.add(...classes);
            document.body.appendChild(img);
        });

    const prefetchNewImage = async (images: Image[], currentImage: number) => {
        const colorThief = new ColorThief();
        localStorage.removeItem("thumbnail");
        const nextImageNumber = (currentImage + 1) % images.length;
        const newImage = buildLink(images[nextImageNumber].src);
        await loadImage(newImage).then(img => {
            if (!img) return;
            const dominantColor = colorThief.getColor(img as HTMLImageElement);
            const pastelColor = generatePastelColor(dominantColor);
            localStorage.setItem("textColor", pastelColor as string);
            const imageData = getImageData(img as HTMLImageElement);
            localStorage.setItem("thumbnail", imageData);
            localStorage.setItem("currentImage", nextImageNumber.toString());
            document.body.removeChild(img as HTMLImageElement);
        });
    };

    useEffect(() => {
        if (!loaded) return;
        const timer = setTimeout(() => {
            setCurrentThumbnail(null);
        }, 1100);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (currentImage === null) return;
        if (images.length > 0 && images?.[currentImage]) {
            setUrl(buildLink(images?.[currentImage].src));
        }
    }, [currentImage, images]);

    return (
        <div className="absolute h-full w-full top-0 left-0">
            <div className="h-full w-full bg-[#000] opacity-40 absolute left-0 top-0 select-none pointer-none z-30" />
            {currentThumbnail && (
                <img
                    src={currentThumbnail}
                    className={cn("absolute inset-0 h-full w-full object-cover z-20 transition-opacity duration-1000 ease-in-out", {
                        "opacity-0": loaded,
                    })}
                    alt="Unsplash background placeholder"
                />
            )}
            <img
                style={{ "--tw-blur": `blur(${blur}px)` } as React.CSSProperties}
                src={url || ""}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                fetchpriority="high"
                alt="Unsplash background"
                className={cn(`h-full w-full object-cover transition-opacity duration-500 ease-in-out z-10 filter`)}
                onLoad={() => setLoaded(true)}
            />
            {url && currentImage !== null && <UnsplashCredits {...images?.[currentImage]?.credit} />}
        </div>
    );
};

export default UnsplashImage;
