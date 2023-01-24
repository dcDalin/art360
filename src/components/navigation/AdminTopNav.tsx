export default function AdminTopNav() {
  return (
    <div className='flex items-center justify-end'>
      <ul className='menu menu-horizontal p-0'>
        <li>
          <a>Item 1</a>
        </li>
        <li tabIndex={0}>
          <a>
            Parent
            <svg
              className='fill-current'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
            >
              <path d='M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z' />
            </svg>
          </a>
          <ul className='bg-base-100 p-2'>
            <li>
              <a>Submenu 1</a>
            </li>
            <li>
              <a>Submenu 2</a>
            </li>
          </ul>
        </li>
        <li>
          <a>Item 3</a>
        </li>
      </ul>
    </div>
  );
}