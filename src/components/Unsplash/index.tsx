import { useEffect, useState } from "react";
import { buildLink, fetchImages, type Image } from "./api";
import { cn } from "@/lib/utils";
import UnsplashCredits from "./credits";

const UnsplashImage = () => {
    const [images, setImages] = useState<Image[]>([]);
    const [currentImage, setCurrentImage] = useState<number | null>(null);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);

    const getImage = async () => {
        const fetchedImages = await fetchImages()
            .finally()
            .catch(() => {
                return [
                    {
                        src: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                        credit: {
                            userLink: `https://unsplash.com/@usgs`,
                            userName: `USGS`,
                            imageLink: `https://unsplash.com/photos/hoS3dzgpHzw`,
                        },
                    },
                    {
                        src: `https://images.unsplash.com/photo-1506259091721-347e791bab0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                        credit: {
                            userLink: `https://unsplash.com/@eberhardgross`,
                            userName: `eberhard grossgasteiger`,
                            imageLink: `https://unsplash.com/photos/xC7Ho08RYF4`,
                        },
                    },
                    {
                        src: `https://images.unsplash.com/photo-1488554378835-f7acf46e6c98?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                        credit: {
                            userLink: `https://unsplash.com/@danranwanghao`,
                            userName: `hao wang`,
                            imageLink: `https://unsplash.com/photos/red-and-blue-doodle-artwork-with-black-background-pVq6YhmDPtk`,
                        },
                    },
                    {
                        src: `https://images.unsplash.com/photo-1620121692029-d088224ddc74?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                        credit: {
                            userLink: `https://unsplash.com/@orwhat`,
                            userName: `Richard Horvath`,
                            imageLink: `https://unsplash.com/photos/_nWaeTF6qo0`,
                        },
                    },
                    {
                        src: `https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                        credit: {
                            userLink: `https://unsplash.com/@seanwsinclair`,
                            userName: `Sean Sinclair`,
                            imageLink: `https://unsplash.com/photos/C_NJKfnTR5A`,
                        },
                    },
                ];
            });
        setImages(fetchedImages);
    };

    useEffect(() => {
        getImage();
        setCurrentImage(Math.floor(Math.random() * images.length));
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
