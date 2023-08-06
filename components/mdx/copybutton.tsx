'use client';

import { useState } from 'react';
import { PiCopySimpleBold, PiCheckBold } from 'react-icons/pi';

export const CopyButton = ({ text }: { text: string }) => {
  const [isCopied, setIsCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1000);
  };

  return (
    <button
      disabled={isCopied}
      onClick={copy}
      type="button"
      aria-label="Copy to Clipboard"
      className="transition bg-transparent outline outline-1 outline-primary rounded-md p-2 text-foreground-secondry"
    >
      {isCopied ? (
        <PiCheckBold className=" text-blue-600" />
      ) : (
        <PiCopySimpleBold />
      )}
    </button>
  );
};
