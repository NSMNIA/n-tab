/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import { buildLink, fetchImages, type Image } from "./api";
import { cn } from "@/lib/utils";
import UnsplashCredits from "./credits";
import { fallbackImages } from "@/fallbackImages";
import ColorThief from "colorthief";

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
    return `rgb(${r},${g},${b})`;
}

const UnsplashImage = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [currentImage, setCurrentImage] = useState<number | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);

    const prefetchNewImage = (images: Image[], currentImage: number) => {
        const colorThief = new ColorThief();
        const nextImageNumber = (currentImage + 1) % images.length;
        const newImage = buildLink(images[nextImageNumber].src);
        const img = new Image();
        img.src = newImage;
        img.onload = async () => {
            const dominantColor = colorThief.getColor(img);
            const pastelColor = generatePastelColor(dominantColor);
            localStorage.setItem("textColor", pastelColor as string);
            img.remove();
        };
        const classes = ["fixed", "top-0", "left-0", "overflow-hidden", "invisible", "z-0"];
        img.classList.add(...classes);
        img.loading = "lazy";
        img.crossOrigin = "Anonymous";
        document.body.appendChild(img);
        localStorage.setItem("currentImage", nextImageNumber.toString());
    };

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
        <div className="absolute h-full w-full top-0 left-0">
            <div className="h-full w-full bg-[#000] opacity-40 absolute left-0 top-0 select-none pointer-none z-20" />
            <img
                src={url || ""}
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                fetchpriority="high"
                alt="Unsplash background"
                className={cn("h-full w-full object-cover transition-opacity duration-500 ease-in-out opacity-0 z-10", {
                    "opacity-100": loaded,
                })}
                onLoad={() => setLoaded(true)}
            />
            {url && currentImage !== null && <UnsplashCredits {...images?.[currentImage]?.credit} />}
        </div>
    );
};

export default UnsplashImage;
