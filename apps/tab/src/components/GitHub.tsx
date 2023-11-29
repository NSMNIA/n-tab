import { storage } from '@/lib/storage';
import { useEffect, useState } from 'react';

const GitHub = () => {
  const [github, setGithub] = useState<string | undefined>(
    window !== undefined
      ? localStorage.getItem('githubName')
        ? localStorage.getItem('githubName')
          ? undefined
          : undefined
        : undefined
      : undefined,
  );

  useEffect(() => {
    (async () => {
      const githubName = await storage.get('githubName');
      if (githubName) {
        const github = await fetch(`https://github-contributions-api.deno.dev/${githubName}.json`).then((res) =>
          res.json(),
        );
        localStorage.setItem('github', github.totalContributions);
        setGithub(github.totalContributions);
      }
    })();
  }, []);

  if (!github) {
    return null;
  }

  return <div className="z-[100] absolute font-bold text-primary tracking-tight right-4 top-4">{github}</div>;
};

export default GitHub;
