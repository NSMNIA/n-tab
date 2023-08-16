import { useEffect, useState } from "react";
import { buildLink, fetchImages, type Image } from "./api";
import { cn } from "@/lib/utils";
import UnsplashCredits from "./credits";

const UnsplashImage = () => {
    const [images, setImages] = useState<Image[]>([
        {
            src: "https://images.unsplash.com/photo-1574169208507-84376144848b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            credit: {
                userLink: `https://unsplash.com/@usgs`,
                userName: `USGS`,
                imageLink: `https://unsplash.com/photos/hoS3dzgpHzw`,
                location: `Gulf of Mexico, Florida, USA`,
            },
        },
    ]);
    const [currentImage, setCurrentImage] = useState<number>(0);
    const [loaded, setLoaded] = useState<boolean>(false);
    const [url, setUrl] = useState<string | null>(null);

    const getImage = async () => {
        const fetchedImages = await fetchImages().finally();
        setImages(fetchedImages);
    };

    useEffect(() => {
        getImage();
        setCurrentImage(0);
    }, []);

    useEffect(() => {
        setLoaded(false);
        if (images.length > 0 && images?.[currentImage]) {
            setUrl(buildLink(images?.[currentImage].src));
        }
    }, [currentImage, images]);

    return (
        <div className="absolute h-full w-full top-0 left-0">
            <div className="h-full w-full bg-[#000] opacity-20 absolute left-0 top-0 select-none pointer-none" />
            {url && (
                <>
                    <img
                        src={url}
                        alt="unsplash"
                        className={cn("h-full w-full object-cover transition-opacity duration-300 ease-in-out opacity-0", {
                            "opacity-100": loaded,
                        })}
                        onLoad={() => setLoaded(true)}
                    />
                    <UnsplashCredits {...images?.[currentImage]?.credit} />
                </>
            )}
        </div>
    );
};

export default UnsplashImage;
