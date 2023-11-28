import { useState, useEffect } from 'react';
import { storage } from './lib/storage';
import './styles/globals.css';

const App = () => {
  const [unsplashCategory, setUnsplashCategory] = useState<string | null>(null);
  const [showTopSites, setShowTopSites] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      const storageUnsplashCategory = (await storage.get('unsplashCategory')) as string;
      setUnsplashCategory(storageUnsplashCategory ?? 'abstract');
      const storageShowTopSites = (await storage.get('showTopSites')) as boolean;
      setShowTopSites(storageShowTopSites ?? false);
    })();
  }, []);
  return (
    <div className='dark'>
      <h1>Options</h1>
      {unsplashCategory && <p>Unsplash category: {unsplashCategory}</p>}
      <p>Show top sites: {showTopSites}</p>
    </div>
  );
};

export default App;
