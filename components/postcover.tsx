'use client';
import cn from '@/libs/utils/cn';
import Image from 'next/image';
import { useState, useEffect } from 'react';

const PostCover = ({
  cover,
  className,
}: {
  cover: string[];
  className?: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentImageIndex + 1) % cover.length;
      setCurrentImageIndex(nextIndex);
    }, 50000);

    return () => {
      clearInterval(interval);
    };
  }, [currentImageIndex, cover.length]);

  const currentImage = cover[currentImageIndex];

  return (
    <Image
      src={currentImage}
      alt="carousel-image"
      fetchPriority="high"
      priority
      width={700}
      height={400}
      className={cn('rounded-md object-cover w-[700px] h-[400px]', className)}
    />
  );
};

export default PostCover;
