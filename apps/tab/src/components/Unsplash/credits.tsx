import { type FC } from 'react';
import { Image } from './utils/api';
import { Button } from '../ui/button';
export const UTM = '?utm_source=Start&utm_medium=referral&utm_campaign=api-credit';

const UnsplashCredits: FC<Image['credit']> = ({ imageLink, userLink, userName }) => {
  return (
    <div
      className="absolute bottom-2 left-2 text-sm z-30 opacity-60 text-primary hover:opacity-100 transition-opacity duration-300 ease-in-out"
      key={`${imageLink}_${userLink}_${userName}`}
    >
      <Button asChild variant={'link'} size="noPadding" className="text-inherit">
        <a href={imageLink + UTM} rel="noopener noreferrer">
          Photo
        </a>
      </Button>
      {' by '}
      <Button asChild variant={'link'} size="noPadding" className="text-inherit">
        <a href={userLink + UTM} rel="noopener noreferrer">
          {userName}
        </a>
      </Button>
      {' on '}
      <Button asChild variant={'link'} size="noPadding" className="text-inherit">
        <a href="https://unsplash.com/" rel="noopener noreferrer">
          Unsplash
        </a>
      </Button>
    </div>
  );
};

export default UnsplashCredits;
