import Image from 'next/image';

interface IAvatarProps {
  url: string;
  height?: number;
  width?: number;
  alt?: string;
}
export default function Avatar({
  url,
  height = 100,
  width = 100,
  alt = 'avatar',
}: IAvatarProps) {
  return (
    <div className='avatar'>
      <div className='rounded-full ring ring-primary ring-offset-2 ring-offset-base-100'>
        <Image src={url} alt={alt} width={width} height={height} />
      </div>
    </div>
  );
}
