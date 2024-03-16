'use client';
import Image from 'next/image';
import React, { use, useEffect, useState } from 'react';
import { GrPrevious } from 'react-icons/gr';
import { FaCircleCheck } from 'react-icons/fa6';
import { FaTimesCircle } from 'react-icons/fa';
import CheckWaste from '@/components/checkWaste';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useWasteStore } from '@/store/wasteState';
import { MdDescription } from 'react-icons/md';
import { FcReuse } from 'react-icons/fc';
// params.name
export default function Details({ params }: { params: { id: string } }) {
  const router = useRouter();
  const idWaste = params.id;
  console.log('🚀 ~ Details ~ idWaste:', idWaste);
  const dataWaste = useWasteStore((state: any) => state.dataWaste);
  console.log('🚀 ~ Details ~ dataWaste:', dataWaste);
  const [dataDetail, setDataDetail] = useState<any>({});
  useEffect(() => {
    if (dataWaste.length > 0) {
      console.log(dataWaste.find((item: any) => item.id == idWaste));
      setDataDetail(dataWaste.find((item: any) => item.id == idWaste));
    }
  }, [dataWaste]);

  return (
    <div className='flex gap-6 flex-col items-center'>
      <div className='w-full  shadow-lg h-9 px-4 pb-6 flex items-center'>
        <GrPrevious
          className='cursor-pointer text-orange-600'
          size={24}
          onClick={() => router.back()}
        />
      </div>

      <div className='container flex flex-col gap-5'>
        <div className='text-green-500 font-bold text-2xl text-start w-full'>
          {dataDetail?.name}
        </div>
        <div className='w-full h-28 rounded-full flex items-center justify-center '>
          <Image
            src={dataDetail?.img_url || '/R.jpg'}
            // src={'/R.jpg'}
            alt=''
            width={100}
            height={100}
            objectFit='cover'
            className='rounded-full'
          />
        </div>
        <div className='flex gap-6'>
          <div className='w-full px-5 pb-5 shadow-lg  items-center rounded-md flex flex-col gap-2'>
            <span className='text-neutral-600 text-sm'>Tái Chế Được</span>
            <CheckWaste valueWaste={true} />
          </div>
          <div className='w-full px-5 pb-5 shadow-lg  items-center rounded-md flex flex-col gap-2'>
            <span className='text-neutral-600 text-sm'>Chất Hữu Cơ</span>
            <CheckWaste valueWaste={false} />
          </div>
        </div>

        <div>
          <ul className='list-disc flex gap-3 flex-col'>
            <span className='flex items-center gap-1 text-neutral-500 font-bold'>
              <MdDescription className='text-orange-500' />
              Mô tả
            </span>
            <li>{dataDetail?.description}</li>
            <span className='flex items-center gap-1 text-neutral-500 font-bold'>
              <FcReuse /> Cách tái chế
            </span>
            <li>{dataDetail?.how_to_recycle}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
