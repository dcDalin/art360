import router from 'next/router';

export default function MenuList() {
  return (
    <div className='flex items-center space-x-2 font-bold'>
      <li onClick={() => router.push('/shop')}>
        <a>Shop</a>
      </li>
      <li onClick={() => router.push('/blogs')}>
        <a>Blogs</a>
      </li>
    </div>
  );
}
