import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';

import MenuList from '@/components/navigation/MenuList';
import UserDropDown from '@/components/navigation/UserDropDown';
export default function SlideOutMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='block pl-2 md:hidden'>
      <button className='btn-outline btn' onClick={() => setIsOpen(true)}>
        <FiMenu />
      </button>

      <Transition show={isOpen} as={Fragment}>
        <Dialog onClose={() => null} className='relative z-[2000]'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-1000'
            enterFrom='opacity-100'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            {/* The backdrop, rendered as a fixed sibling to the panel container */}
            <div className='fixed inset-0 bg-gray-50/30' aria-hidden='true' />
          </Transition.Child>

          {/* Full-screen scrollable container */}
          <div className='fixed inset-0 overflow-y-auto'>
            {/* Container to center the panel */}
            <div className='flex min-h-full justify-end'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-500'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='ease-in duration-500'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                {/* The actual dialog panel  */}
                <Dialog.Panel className='w-[90%] rounded bg-white shadow-lg md:w-[600px]'>
                  <div className='flex items-center justify-between'>
                    <button
                      className='btn-ghost btn'
                      onClick={() => setIsOpen(false)}
                    >
                      <GrClose />
                    </button>
                    <UserDropDown />
                  </div>
                  <div className='flex p-6'>
                    <ul className='space-y-4 text-2xl'>
                      <MenuList />
                    </ul>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}
