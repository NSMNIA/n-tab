import { useState, useEffect } from 'react';
import { storage } from './lib/storage';
import './styles/globals.css';
import { Switch } from './components/ui/switch';
import { Label } from './components/ui/label';

const categories = ['abstract', 'nature', 'wallpapers', 'architecture', 'animals', 'city', 'food', 'sports'].sort();

const App = () => {
  const [unsplashCategory, setUnsplashCategory] = useState<string | null>(null);
  const [showTopSites, setShowTopSites] = useState<boolean | null>(null);
  const [githubUsername, setGithubUsername] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const storageUnsplashCategory = (await storage.get('unsplashCategory')) as string;
      setUnsplashCategory(storageUnsplashCategory ?? 'abstract');
      const storageShowTopSites = (await storage.get('showTopSites')) as boolean;
      setShowTopSites(storageShowTopSites ?? false);
      const storageGithubUsername = (await storage.get('githubName')) as string;
      setGithubUsername(storageGithubUsername ?? '');
      const primaryColor = (await storage.get('primaryColor')) as string;
      if (primaryColor) {
        const root = window.document.documentElement;
        root.style.setProperty('--primary', primaryColor);
      }
    })();
  }, []);

  return (
    <div className="p-6 w-[300px] flex flex-col gap-8 text-lg">
      <h1 className="font-bold text-lg">N-Tab options</h1>
      <div className="flex flex-col gap-3">
        <Label htmlFor="unsplash" className="font-bold">
          Background image category
        </Label>
        <select
          name="unsplash"
          id="unsplash"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-inherit"
          value={unsplashCategory ?? 'abstract'}
          onChange={(e) => {
            storage.set('unsplashCategory', e.target.value);
            setUnsplashCategory(e.target.value);
            storage.remove('date');
            storage.remove('primaryColor');
          }}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3">
        <Label className="font-bold">Top sites</Label>
        <div className="flex items-center space-x-2">
          <Switch
            id={'showTopSites'}
            checked={showTopSites ?? false}
            onCheckedChange={() => {
              setShowTopSites(!showTopSites);
              storage.set('showTopSites', !showTopSites);
            }}
          />
          <Label htmlFor="showTopSites">Show top sites</Label>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="github" className="font-bold">
          GitHub username
        </Label>
        <input
          type="text"
          name="github"
          id="github"
          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 text-inherit"
          onChange={(e) => {
            setGithubUsername(e.target.value);
            storage.set('githubName', e.target.value);
          }}
          value={githubUsername ?? ''}
        />
      </div>
    </div>
  );
};

export default App;
