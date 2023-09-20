import { createPortal } from "react-dom";
import { Button } from "./ui/button";
import { SettingsIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Slider } from "./ui/slider";
import { newImages } from "./Unsplash/utils/images";

export const SettingsPanel = ({ setOpen, button }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; button: React.MutableRefObject<HTMLButtonElement | null> }) => {
    const portalRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (e: MouseEvent) => {
        if (button?.current && button.current.contains(e.target as Node)) {
            return;
        }
        if (portalRef.current && !portalRef.current.contains(e.target as Node)) {
            setOpen(false);
        }
    };

    useEffect(() => {
        if (!portalRef.current) return;
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const formSchema = z.object({
        unsplash: z.string().optional(),
        blur: z.array(z.number()).optional(),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            unsplash: localStorage.getItem("unsplash") ?? "abstract",
            blur: [parseInt(localStorage.getItem("blur") ?? "0")],
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        localStorage.setItem("blur", values.blur![0].toString());
        if (values.unsplash !== localStorage.getItem("unsplash")) {
            localStorage.setItem("unsplash", values.unsplash ?? "abstract");
            localStorage.removeItem("images");
            localStorage.removeItem("date");
            localStorage.removeItem("currentImage");
            localStorage.removeItem("textColor");
            await newImages();
        }
        window.location.reload();
    };

    return createPortal(
        <>
            <div
                ref={portalRef}
                className="fixed top-0 left-0 w-[400px] bg-background h-full z-50 p-5"
            >
                <div className="flex flex-col gap-3 h-full">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold">Settings</h1>
                        <Button
                            onClick={() => setOpen(false)}
                            size={"icon"}
                            variant={"ghost"}
                        >
                            <XIcon height={24} />
                        </Button>
                    </div>
                    <Form {...form}>
                        <form
                            className="flex flex-col justify-between h-full"
                            onSubmit={form.handleSubmit(onSubmit)}
                        >
                            <div className="flex flex-col gap-5">
                                <FormField
                                    control={form.control}
                                    name="unsplash"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Background</FormLabel>
                                            <FormControl>
                                                <Select
                                                    onValueChange={field.onChange}
                                                    defaultValue={field.value}
                                                >
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Topic" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="abstract">Default</SelectItem>
                                                        <SelectItem value="nature">Nature</SelectItem>
                                                        <SelectItem value="wallpapers">Wallpapers</SelectItem>
                                                        <SelectItem value="architecture">Architecture</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormDescription>Topic for Unsplash photos</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="blur"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Blur ({field.value![0]}px)</FormLabel>
                                            <FormControl>
                                                <Slider
                                                    min={0}
                                                    max={40}
                                                    step={1}
                                                    onValueChange={field.onChange}
                                                    defaultValue={[parseInt(field.value![0].toString())]}
                                                />
                                            </FormControl>
                                            <FormDescription>Blur the background image</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit">Change settings</Button>
                        </form>
                    </Form>
                </div>
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] z-30 animate-fade-in"></div>
        </>,
        document.body
    );
};

const Settings = () => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    return (
        <>
            <div className="absolute top-2 left-2 z-40 text-muted-foreground">
                <Button
                    ref={buttonRef}
                    onClick={() => setOpen(!open)}
                    size={"icon"}
                    variant={"ghostSettings"}
                >
                    <SettingsIcon height={18} />
                </Button>
            </div>
            {open && (
                <SettingsPanel
                    setOpen={setOpen}
                    button={buttonRef}
                />
            )}
        </>
    );
};

export default Settings;
