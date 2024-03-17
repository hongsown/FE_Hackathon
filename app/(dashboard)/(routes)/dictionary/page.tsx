'use client';
import Loader from '@/components/loader';
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
  const [noSerch, setNoSearch] = useState(false);
  const [discWaste, setDiscWaste] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        'https://trusted-killdeer-basically.ngrok-free.app/api/waste-dictionaries'
      );
      console.log('🚀 ~ fetchData ~ response:', response.data.data);
      updateDataWaste(response.data.data);
      setDiscWaste(response.data.data);
      setListDics(response.data.data);
    };
    fetchData();
  }, []);
  const handleSearch = (e: any) => {
    let value = e.target.value;
    let list = listDics.filter((item: any) =>
      item.name.toLowerCase().includes(value.toLowerCase())
    );
    if (list.length == 0) setNoSearch(true);
    else {
      setNoSearch(false);
    }
    setListDics(list);
    if (value == '') setListDics(discWaste);
  };
  return (
    <div className='w-full flex flex-col items-center justify-center'>
      <div className='w-full flex items-center justify-center text-green-500 text-2xl font-bold  mb-3'>
        WASTE DICTIONARY
      </div>
      <div className='w-full container'>
        <div className='rounded-lg border shadow-md'>
          <input
            placeholder='Type a command or search...'
            className='rounded-lg border-none w-full p-3'
            onChange={(e) => {
              handleSearch(e);
            }}
          />
        </div>
        <div className='flex justify-between items-center flex-col  gap-4 mt-5 container'>
          {listDics?.length == 0 && !noSerch && <Loader />}
          {noSerch && listDics.length == 0 && <div>Not Found</div>}
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
