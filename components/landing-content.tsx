'use client';

import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

const textimonials = [
  {
    name: 'Hồng Sơn',
    avatar: '/avatar.png',
    title: 'Sinh Viên',
    description: 'Nhờ sản phẩm mình nhận biết được các loại rác!',
  },
  {
    name: 'Ngọc Huy',
    avatar:
      'https://scontent.fhan4-2.fna.fbcdn.net/v/t39.30808-6/320669020_742046100796087_3386228372951991298_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeEuJSPKNRGa4tBlzXpvHw4kamqpEB4IGeZqaqkQHggZ5n7AnpTYoBsq8mX_Ix9ZUAmYZpVUC8yyLX1reftecMwU&_nc_ohc=4QW3A0x9CfAAX8Fvdoa&_nc_ht=scontent.fhan4-2.fna&oh=00_AfD6byKGEKVMebvZcyN_RG06uYsm_t4yOtnCsfRAVv436A&oe=65FAFDB2',
    title: 'Sinh Viên',
    description: 'Ứng dụng rất tốt, giúp mình phân loại rác dễ dàng hơn!',
  },
  {
    name: 'Hữu Kiên',
    avatar: 'https://github.com/shadcn.png',
    title: 'Sinh Viên',
    description: 'Ứng dụng rất tốt, dễ sử dụng. Mình rất thích!',
  },
  {
    name: 'Thanh Duy',
    avatar: 'https://github.com/shadcn.png',
    title: 'Sinh Viên',
    description:
      'Ứng dụng giúp mình phân loại rác dễ dàng hơn, mình rất thích!',
  },
];
const LandingContent = () => {
  return (
    <div className='px-10 pb-20'>
      <h2 className='text-center text-4xl dark:text-white text-neutral-500 font-extrabold mb-10 mt-4'>
        User Reviews
      </h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {textimonials.map((item) => (
          <Card
            key={item.name}
            className='dark:bg-[#192339] dark:text-white  dark:border-none hover:scale-105 transition-all cursor-pointer'
          >
            <CardHeader>
              <CardTitle className='flex items-center gap-x-2'>
                <Avatar>
                  <AvatarImage
                    src={item.avatar}
                    className='rounded-full w-8 h-8'
                  />
                </Avatar>
                <div>
                  <p className='text-lg'>{item.name}</p>

                  <p className='text-sm text-zinc-400'>{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className='pt-4 px-0 h-28'>
                <p className='line-clamp-3 mb-3 h-20'>{item.description}</p>
                <div className='flex items-center'>
                  <svg
                    className='w-4 h-4 text-yellow-300 ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'
                  >
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>

                  <svg
                    className='w-4 h-4 text-yellow-300 ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'
                  >
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                  <svg
                    className='w-4 h-4 text-yellow-300 ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'
                  >
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                  <svg
                    className='w-4 h-4 text-yellow-300 ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'
                  >
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                  <svg
                    className='w-4 h-4 text-yellow-300 ms-1'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 22 20'
                  >
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                </div>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
