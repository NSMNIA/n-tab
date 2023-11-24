import { fallbackImages } from '@/fallbackImages';
import { buildLink, fetchImages, type Image } from './api';
import ColorThief from 'colorthief';
import { rgbaToThumbHash, thumbHashToDataURL } from 'thumbhash';
import { generatePastelColor } from './color';

export const newImages = async () => {
  const query = localStorage.getItem('unsplash') ?? undefined;
  await fetchImages(query)
    .then((images) => {
      localStorage.setItem('images', JSON.stringify(images));
    })
    .catch(() => {
      localStorage.setItem('images', JSON.stringify(fallbackImages));
    });
};

const loadImage = async (src: string) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.loading = 'lazy';
    img.alt = 'Unsplash background prefetch';
    img.onload = () => resolve(img);
    img.onerror = (...args) => reject(args);
    img.src = src;
    const classes = ['fixed', 'top-0', 'left-0', 'overflow-hidden', 'invisible', 'z-0'];
    img.classList.add(...classes);
    document.body.appendChild(img);
  });

const getImageData = (image: HTMLImageElement) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const scale = 100 / Math.max(image.width, image.height);
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  context!.drawImage(image, 0, 0, canvas.width, canvas.height);
  const pixels = context!.getImageData(0, 0, canvas.width, canvas.height);
  const binaryThumbHash = rgbaToThumbHash(pixels.width, pixels.height, pixels.data);
  const placeholderURL = thumbHashToDataURL(binaryThumbHash);
  return placeholderURL;
};

export const prefetchNewImage = async (images: Image[], currentImage: number) => {
  const colorThief = new ColorThief();
  localStorage.removeItem('thumbnail');
  const nextImageNumber = (currentImage + 1) % images.length;
  const newImage = buildLink(images[nextImageNumber].src);
  await loadImage(newImage).then((img) => {
    if (!img) return;
    const dominantColor = colorThief.getColor(img as HTMLImageElement);
    const pastelColor = generatePastelColor(dominantColor);
    localStorage.setItem('primaryColor', pastelColor);
    const imageData = getImageData(img as HTMLImageElement);
    localStorage.setItem('thumbnail', imageData);
    localStorage.setItem('currentImage', nextImageNumber.toString());
    document.body.removeChild(img as HTMLImageElement);
  });
};
