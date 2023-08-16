import { useEffect, useState } from "react";
import { buildLink, fetchImages, type Image } from "./api";
import { cn } from "@/lib/utils";
import UnsplashCredits from "./credits";
import { fallbackImages } from "@/fallbackImages";

const UnsplashImage = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [currentImage, setCurrentImage] = useState<number | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);

    const newImages = async () => {
        await fetchImages()
            .then(images => {
                localStorage.setItem("images", JSON.stringify(images));
            })
            .catch(() => {
                localStorage.setItem("images", JSON.stringify(fallbackImages));
            });
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
        const images = localStorage.getItem("images") ? (JSON.parse(localStorage.getItem("images") ?? "[]") as Image[]) : ([] as Image[]);
        setImages(images);
        setCurrentImage(Math.floor(Math.random() * (images.length - 1)));
    }, [images.length]);

    useEffect(() => {
        if (currentImage === null) return;
        if (images.length > 0 && images?.[currentImage]) {
            setUrl(buildLink(images?.[currentImage].src));
        }
    }, [currentImage, images]);

    return (
        <div className="absolute h-full w-full top-0 left-0">
            <div className="h-full w-full bg-[#000] opacity-20 absolute left-0 top-0 select-none pointer-none z-20" />
            <img
                src={url || ""}
                alt="unsplash"
                className={cn("h-full w-full object-cover transition-opacity duration-300 ease-in-out opacity-0 z-10", {
                    "opacity-100": loaded,
                })}
                onLoad={() => setLoaded(true)}
            />
            {url && currentImage !== null && <UnsplashCredits {...images?.[currentImage]?.credit} />}
            {/* {images.length > 1 && currentImage !== null && (
                <div className="absolute bottom-2 right-2 text-sm z-30 text-muted-foreground">
                    <Button
                        variant={"link"}
                        size="noPadding"
                        className="text-muted-foreground"
                        onClick={() => {
                            setCurrentImage((currentImage + 1) % images.length);
                        }}
                    >
                        <ArrowRightIcon />
                    </Button>
                </div>
            )} */}
        </div>
    );
};

export default UnsplashImage;