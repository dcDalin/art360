import { useState } from 'react';
import { HiOutlineChevronDown, HiOutlineChevronUp } from 'react-icons/hi';

interface ICollapseWrapperProps {
  title: string;
  children: React.ReactNode;
}

export default function CollapseWrapper({
  title,
  children,
}: ICollapseWrapperProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      tabIndex={0}
      className={`collapse rounded-lg border border-base-300 bg-base-100 ${
        isOpen ? 'collapse-open' : 'collapse-close'
      }`}
    >
      <div className='flex items-center justify-between px-4'>
        <div className='collapse-title px-0 text-xl font-medium'>{title}</div>
        <div>
          <button
            className='btn-outline btn-sm btn'
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? <HiOutlineChevronUp /> : <HiOutlineChevronDown />}
          </button>
        </div>
      </div>
      <div className='collapse-content'>{children}</div>
    </div>
  );
}
