import { Button } from './ui/button';
import { SettingsIcon } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { newImages } from './Unsplash/utils/images';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { storage } from '@/lib/storage';

const Settings = () => {
  const formSchema = z.object({
    unsplash: z.string().optional(),
    blur: z.array(z.number()).optional(),
    showTopSites: z.boolean().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unsplash: localStorage.getItem('unsplash') ?? 'abstract',
      blur: [parseInt(localStorage.getItem('blur') ?? '0')],
      showTopSites: localStorage.getItem('showTopSites') === 'true',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const unsplashCategory = await storage.get('unsplashCategory');
    localStorage.setItem('blur', values.blur![0].toString());
    localStorage.setItem('showTopSites', values.showTopSites?.toString() ?? 'false');
    if (values.unsplash !== unsplashCategory) {
      storage.set('unsplashCategory', values.unsplash ?? 'abstract');
      storage.remove('date');
      localStorage.removeItem('images');
      localStorage.removeItem('currentImage');
      storage.remove('primaryColor');
      await newImages();
    }
    window.location.reload();
  };

  return (
    <Dialog>
      <div className="absolute top-2 left-2 z-40 text-muted-foreground">
        <DialogTrigger asChild>
          <Button size={'icon'} variant={'ghostSettings'}>
            <SettingsIcon height={18} />
          </Button>
        </DialogTrigger>
      </div>
      <Form {...form}>
        <DialogContent>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>Settings</DialogTitle>
            </DialogHeader>
            <div className="flex flex-col gap-5 py-4">
              <FormField
                control={form.control}
                name="unsplash"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
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

              <FormField
                control={form.control}
                name="showTopSites"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Top sites </FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Switch id={'showTopSites'} checked={field.value} onCheckedChange={field.onChange} />
                        <Label htmlFor="showTopSites">Show top sites</Label>
                      </div>
                    </FormControl>
                    <FormDescription>Show your top sites on the bottom of the screen</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Change settings</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Form>
    </Dialog>
  );
};

export default Settings;
