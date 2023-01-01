import Image from 'next/image';

interface ICustomImageProps {
  src: string;
  alt: string;
}

export default function CustomImage({ src, alt = 'image' }: ICustomImageProps) {
  return <Image src={src} alt={alt} />;
}
