import { type FC } from "react";
import { Image } from "./api";
import { Button } from "../ui/button";
export const UTM = "?utm_source=Start&utm_medium=referral&utm_campaign=api-credit";

const UnsplashCredits: FC<Image["credit"]> = ({ imageLink, userLink, userName }) => {
    return (
        <div className="absolute bottom-2 left-2 text-sm">
            <Button
                asChild
                variant={"link"}
                size="noPadding"
            >
                <a
                    href={imageLink + UTM}
                    rel="noopener noreferrer"
                >
                    Photo
                </a>
            </Button>
            {" by, "}
            <Button
                asChild
                variant={"link"}
                size="noPadding"
            >
                <a
                    href={userLink + UTM}
                    rel="noopener noreferrer"
                >
                    {userName}
                </a>
            </Button>
            {" on "}
            <Button
                asChild
                variant={"link"}
                size="noPadding"
            >
                <a
                    href="https://unsplash.com/"
                    rel="noopener noreferrer"
                >
                    Unsplash
                </a>
            </Button>
        </div>
    );
};

export default UnsplashCredits;
