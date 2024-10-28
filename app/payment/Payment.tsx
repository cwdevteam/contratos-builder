'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useDynamicPageStore from '../store/use[page]';
import { useRouter } from 'next/navigation';

const Payment = () => {
  const query = useSearchParams();
  const paid = query.get('success');
  const pages = useDynamicPageStore((state) => state.pages);
  const emails = Object.keys(pages).map((id) => pages[Number(id)].email);

  const [message, setMessage] = useState('');

  const { push } = useRouter();

  useEffect(() => {
    if (paid === 'true') {
      setMessage(`A contract will be sent to ${emails.join(', ')}`);
    } else {
      setMessage('Your payment was not successful');
    }
  }, [paid, emails]);

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8">Congrats! You&apos;re protecting your art.</p>
          <button onClick={() => push('/question1')} className="text-xs text-gray-500 w-full border-0 relative text-start border-none">
            Back to the start
          </button>
          <p>this is testing the text between the buttons</p>
          <button>
            Nothing
          </button>
          <div className="text-base sm:text-lg">
            {message}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
