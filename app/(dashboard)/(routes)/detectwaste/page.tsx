'use client';
import Heading from '@/components/heading';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { TbPhotoPlus } from 'react-icons/tb';
import * as z from 'zod';
import { formSchema } from './constants';

import { useProModal } from '@/hooks/use-pro-modal';
import { CldUploadWidget } from 'next-cloudinary';
import Image from 'next/image';
import ImageWithRectangle from '@/components/ImageWithRectangle';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/spinner';
import { useStore } from 'zustand';
import { useWasteStore } from '@/store/wasteState';
import Loader from '@/components/loader';
const Conversation = () => {
  const proModal = useProModal();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: '',
      amount: '1',
      resolution: '512x512',
    },
  });

  const isLoading = form.formState.isSubmitting;
  const [urlImg, setUrlImg] = useState<string>('');
  const [images, setImages] = useState<string[]>([]);
  const [inforTrash, setInforTrash] = useState(false);
  const [dataDetect, setDataDetect] = useState<any>([]);
  const [imgDetected, setImgDetected] = useState<string>('');
  const updateDataWaste = useWasteStore((state: any) => state.updateWasteState);
  const dataWaste = useWasteStore((state: any) => state.dataWaste);

  const handleSubmit = () => {
    // CAll api here
    console.log('🚀 ~ handleSubmit ~ urlImg:', urlImg);
    const fetchApiDetechWaste = async () => {
      try {
        const response = await axios.post(
          'https://trusted-killdeer-basically.ngrok-free.app/api/waste-dictionaries/identify',
          { image: urlImg }
        );
        console.log('🚀 ~ fetchApiDetechWaste ~ response:', response);

        setDataDetect(response.data.data[0].json_data);
        setImgDetected(response.data.data[0].image_url);

        // updateDataWaste(response.data.data.dictionary);
      } catch (error) {
        console.log('🚀 ~ fetchApiDetechWaste ~ error:', error);
      }
    };
    fetchApiDetechWaste();
    setInforTrash(true);
  };

  console.log(
    '🚀 ~ file: page.tsx ~ line 153 ~ Conversation ~ urlImg',
    dataDetect
  );
  return (
    <div>
      <Heading
        title='Phân Loại Rác'
        icon={ImageIcon}
        description='Hãy thử nghiệm với ảnh của bạn'
        iconColor='text-pink-500'
        bgColor='bg-pink-500/10'
      />
      <div className='space-y-4 mt-4'>
        <CldUploadWidget
          options={{ sources: ['camera', 'local'] }}
          uploadPreset='wc1f26as'
          onSuccess={(result: any, { widget }) => {
            console.log('🚀 ~ Conversation ~ result:', result.info.secure_url);

            setUrlImg(result.info.secure_url);
            widget.close();
          }}
        >
          {({ open }) => {
            return (
              <div
                className='relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-40 border-neutral-300 flex flex-col justify-center gap-4 text-neutral-600 items-center mx-4 md:w-[70%] md:mx-auto'
                onClick={() => open?.()}
              >
                <TbPhotoPlus size={50} />
                <div>Click to upload</div>
                {urlImg && (
                  <div className='absolute inset-0 w-full h-full'>
                    <Image
                      alt='upload'
                      fill
                      src={urlImg}
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                )}
              </div>
            );
          }}
        </CldUploadWidget>

        {urlImg && (
          <div className='flex items-center justify-between md:mx-64 mx-7'>
            <Button
              className='col-span-12 lg:col-span-2 w-[30%] '
              disabled={isLoading}
              color='white'
              onClick={() => {
                setUrlImg(''), setInforTrash(false), setDataDetect([]);
              }}
            >
              Thử Lại
            </Button>
            <Button
              className='col-span-12 lg:col-span-2 w-[60%] '
              disabled={isLoading}
              color='primary'
              onClick={handleSubmit}
            >
              Ok
            </Button>
          </div>
        )}
      </div>

      {inforTrash && (
        <>
          <Dialog open={inforTrash} onOpenChange={setInforTrash}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className='text-orange-400 text-2xl'>
                  Detect Trash
                </DialogTitle>
                {dataDetect?.length == 0 ? (
                  <div className='mt-10'>
                    {/* <LoadingSpinner /> */}
                    <Loader />
                  </div>
                ) : (
                  <>
                    <DialogDescription>
                      <div className='w-full h-96 mt-5 relative cursor-default'>
                        <Image
                          src={imgDetected || '/R.jpg'}
                          alt='trash'
                          layout='fill'
                          // objectFit='cover'
                          // className="absolute"
                        />
                      </div>

                      <Accordion
                        type='single'
                        collapsible
                        className='w-full'
                        onValueChange={() => {
                          console.log('value change');
                        }}
                      >
                        {dataDetect?.map((item: any, index: number) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger>{item.name}</AccordionTrigger>
                            <AccordionContent>
                              <div className='flex flex-col gap-2'>
                                <div className='text-sm font-bold text-orange-500 text-start'>
                                  {item?.dictionary?.name}
                                </div>
                                <p className='line-clamp-2 text-start'>
                                  {item?.dictionary?.description}
                                </p>
                                <Link
                                  href={`/dictionary/${item?.dictionary?.id}/details`}
                                  className='text-green-400 mt-2 font-medium text-start '
                                >
                                  Xem thêm trong từ điển.
                                </Link>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </DialogDescription>
                  </>
                )}
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default Conversation;
