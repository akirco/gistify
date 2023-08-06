'use client';
import { useEffect, useState } from 'react';
import { BiUpArrow } from 'react-icons/bi';

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);
  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      {showButton && (
        <div
          className="transition-all fixed bottom-5 right-5 z-[9999] text-center flex items-center gap-2 p-2 rounded-lg bg-background-secondry shadow-2xl cursor-pointer"
          onClick={() =>
            window.scrollTo({
              behavior: 'smooth',
              top: 0,
            })
          }
        >
          <BiUpArrow className="w-6 h-6" />
        </div>
      )}
    </>
  );
};

export default ScrollToTop;
