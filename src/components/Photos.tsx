import clsx from 'clsx';
import Image from 'next/image';

import image1 from '@/images/photos/home-v3-gallary-image-1.png';
import image2 from '@/images/photos/home-v3-gallery-annette.png';
import image3 from '@/images/photos/home-v3-gallery-gisela.png';
import image4 from '@/images/photos/home-v3-gallery-intern-discussion.png';
import image5 from '@/images/photos/home-v3-gallery-intern-talk.png';
import image6 from '@/images/photos/home-v3-gallery-steve.png';

function Photos() {
  const rotations = [
    'rotate-2',
    '-rotate-2',
    'rotate-2',
    'rotate-2',
    '-rotate-2',
  ];

  return (
    <div className="mt-16 sm:mt-20">
      <div className="-my-4 flex justify-center gap-5 overflow-hidden py-4 sm:gap-8">
        {[image1, image2, image3, image4, image5, image6].map(
          (image, imageIndex) => (
            <div
              key={image.src}
              className={clsx(
                'relative aspect-[9/10] w-44 flex-none overflow-hidden rounded-xl bg-zinc-100 sm:w-72 sm:rounded-2xl dark:bg-zinc-800',
                rotations[imageIndex % rotations.length],
              )}
            >
              <Image
                src={image}
                alt=""
                sizes="(min-width: 640px) 18rem, 11rem"
                className="absolute inset-0 size-full object-cover"
              />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default Photos;