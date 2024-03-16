import React from 'react';
import { FaTimesCircle } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';

export default function CheckWaste({ valueWaste }: { valueWaste: boolean }) {
  return (
    <>
      {valueWaste ? (
        <div className='flex gap-1 items-center'>
          <FaCircleCheck className='text-green-600 ' />
          <span className='text-green-500 text-[14px] font-medium'>Có thể</span>
        </div>
      ) : (
        <div className='flex gap-1 items-center'>
          <FaTimesCircle className='text-red-600 ' />
          <span className='text-red-500 text-[14px] font-medium'>
            Không thể
          </span>
        </div>
      )}
    </>
  );
}
