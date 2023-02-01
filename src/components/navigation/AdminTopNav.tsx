import UserDropDown from '@/components/navigation/UserDropDown';

export default function AdminTopNav() {
  return (
    <div className='flex items-center justify-end'>
      <ul className='menu menu-horizontal p-0'>
        <UserDropDown />
      </ul>
    </div>
  );
}
