import DateLabel from '@/components/Labels/DateLabel';
import ThinLabel from '@/components/Labels/ThinLabel';
import NextImage from '@/components/NextImage';

interface IBlogCardProps {
  imageUrl: string;
  title: string;
  author: string;
  datePublished: Date;
  readTime: string;
  handleNavigate: () => void;
}

export default function BlogCard({
  imageUrl,
  title,
  author,
  datePublished,
  readTime,
  handleNavigate,
}: IBlogCardProps) {
  return (
    <div
      onClick={handleNavigate}
      className='card card-compact w-96 cursor-pointer bg-base-100 shadow-xl'
    >
      <figure>
        <NextImage
          imgClassName='w-14 h-14 md:w-full md:h-full object-contain'
          className='flex h-full w-full items-center justify-center object-contain'
          src={imageUrl}
          alt={`${title} image`}
          width={100}
          height={50}
        />
      </figure>
      <div className='card-body'>
        <h2 className='card-title'>{title}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className='card-actions justify-end'>
          <div className='flex items-center justify-between'>
            <ThinLabel text={author} />
            <div className='flex items-center space-x-2'>
              <DateLabel dateString={datePublished} />
              <ThinLabel text={readTime} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
