'use client';

import * as Toast from '@radix-ui/react-toast';
import clsx from 'clsx';
import { Cross1Icon } from '@radix-ui/react-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/lib/store';
import { hideToast } from '@/lib/features/toastSlice';

const ToastComponent = () => {
  const { title, description, open } = useSelector((state: RootState) => state.toast);
  const dispatch = useDispatch();

  return (
    <Toast.Provider>
      <Toast.Root
        className={clsx(
          'bg-white rounded-lg shadow-lg p-4 grid grid-cols-[auto_auto] w-full gap-x-4 items-center transition-transform duration-200 ease-out',
          {
            'animate-slideIn': open,
            'animate-hide': !open,
          }
        )}
        open={open}
        onOpenChange={() => dispatch(hideToast())}
      >
        <Toast.Title className="font-bold">{title}</Toast.Title>
        <Toast.Action className="w-full text-blue-500 flex justify-end" asChild altText="Close">
          <Cross1Icon />
        </Toast.Action>
        <Toast.Description className="text-sm">{description}</Toast.Description>
      </Toast.Root>

      <Toast.Viewport className="fixed bottom-0 right-0 flex flex-col p-[25px] gap-2.5 w-[390px] max-w-full m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default ToastComponent;
