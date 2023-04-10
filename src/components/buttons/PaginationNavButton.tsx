import { GrNext, GrPrevious } from 'react-icons/gr';

interface IPaginationNavButton {
  type: 'next' | 'prev';
}

export default function PaginationNavButton({ type }: IPaginationNavButton) {
  return (
    <button className='btn-outline btn-sm btn'>
      {type === 'next' ? <GrNext /> : <GrPrevious />}
    </button>
  );
}
