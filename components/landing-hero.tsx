import { useAuth } from '@clerk/nextjs';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';
import { Button } from './ui/button';
const LandingHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className='dark:text-white font-bold text-center space-y-5 h-72 relative z-0 mt-20'>
      <div className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold '>
        <h1>The Best App For </h1>
        <div className='text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600'>
          <TypewriterComponent
            options={{
              strings: [
                'DETECK TRASH',
                'Photo Generation.',
                'Music Generation.',
                'Video Generation.',
                'Code Generation.',
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className='text-sm md:text-xl font-light text-zinc-400'>
        Create content using AI 10x faster
      </div>
      <div>
        <Link href={isSignedIn ? '/dashboard' : '/sign-up'}>
          <Button
            variant='premium'
            className='md:text-lg p-4 md:p-6 rounded-full font-semibold'
          >
            Start Generate For Free
          </Button>
        </Link>
      </div>
      <div className='text-zinc-400 text-xs md:text-sm font-normal'>
        No credit card required
      </div>
    </div>
  );
};

export default LandingHero;
