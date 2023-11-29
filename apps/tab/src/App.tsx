import Time from '@/components/Time';
import UnsplashImage from './components/Unsplash';
import { useEffect } from 'react';
import TopSites from './components/TopSites';
import { storage } from './lib/storage';
import GitHub from './components/GitHub';

const App = () => {
  useEffect(() => {
    (async () => {
      const unsplashCategory = await storage.get('unsplashCategory');
      if (!unsplashCategory) {
        storage.set('unsplashCategory', 'abstract');
      }
      const date = await storage.get('date');
      if (!date) {
        storage.set('date', new Date().toISOString());
      }
    })();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    (async () => {
      const primaryColor = (await storage.get('primaryColor')) as string;
      if (primaryColor) {
        root.style.setProperty('--primary', primaryColor);
      }
    })();
  }, []);

  return (
    <div className="relative h-screen w-screen bg-black">
      <GitHub />
      <UnsplashImage />
      <Time />
      <TopSites />
    </div>
  );
};

export default App;
