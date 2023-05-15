import router from 'next/router';

export default function MenuList() {
  return (
    <>
      <li onClick={() => router.push('/artists')}>
        <a>Artists</a>
      </li>
      <li onClick={() => router.push('/art')}>
        <a>Art</a>
      </li>
      <li onClick={() => router.push('/blogs')}>
        <a>Blogs</a>
      </li>
    </>
  );
}
