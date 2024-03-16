'use client';
import { Command, CommandInput } from '@/components/ui/command';
import { useWasteStore } from '@/store/wasteState';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MdNavigateNext } from 'react-icons/md';
export default function Dictionary() {
  const [showCommandList, setShowCommandList] = useState(false);
  const [listDics, setListDics] = useState([]);
  const updateDataWaste = useWasteStore((state: any) => state.updateWasteState);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://trusted-killdeer-basically.ngrok-free.app/api/waste-dictionaries'
      );
      console.log('🚀 ~ fetchData ~ response:', response.data.data);
      updateDataWaste(response.data.data);
      setListDics(response.data.data);
    };
    fetchData();
  }, []);

  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full flex items-center justify-center text-green-500 text-lg font-bold  '>
        WASTE DICTIONARY
      </div>
      <div className='w-full container'>
        <Command className='rounded-lg border shadow-md'>
          <CommandInput
            placeholder='Type a command or search...'
            onFocus={() => {
              setShowCommandList(true);
            }}
            onBlur={() => {
              setShowCommandList(false);
            }}
          />
        </Command>
        <div className='flex justify-between items-center flex-col  gap-4 mt-5'>
          {listDics?.map((item: any, index: number) => (
            <>
              <Link
                key={item.id}
                href={`dictionary/${item.id}/details`}
                className='w-full md:w-1/2 flex justify-between items-center shadow-lg border border-neutral-200 rounded-md  h-16 p-4 hover:cursor-pointer hover:opacity-75'
              >
                <Image
                  alt='img'
                  width={40}
                  height={40}
                  className='rounded-full'
                  src={`${item.img_url}`}
                />
                <div>{item.name}</div>
                <MdNavigateNext />
              </Link>
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
