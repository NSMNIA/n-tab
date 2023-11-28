import Time from '@/components/Time';
// import Search from "@/components/Search";
import UnsplashImage from './components/Unsplash';
import { lazy, useEffect } from 'react';
import TopSites from './components/TopSites';
import { storage } from './lib/storage';
const Settings = lazy(() => import('./components/Settings'));

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
      <UnsplashImage />
      <Time />
      <TopSites />
      {/* <div className="absolute left-[50%] bottom-[5rem] translate-x-[-50%]">
                <Search />
            </div> */}
      <Settings />
    </div>
  );
};

export default App;
