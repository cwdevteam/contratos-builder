'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import useDynamicPageStore from '../store/use[page]';

const Payment = () => {
  const query = useSearchParams();
  const paid = query.get('success');
  const pages = useDynamicPageStore((state) => state.pages);
  const emails = [''];
  const [message, setMessage] = useState('');

  // Collect email addresses from pages
  Object.keys(pages).forEach((id) => {
    const pageData = pages[Number(id)];
    emails.push(pageData.email);
  });

  // Set message based on payment status
  useEffect(() => {
    if (paid === 'true') {
      setMessage(`A contract will be sent to ${emails}`);
    } else {
      setMessage('Your payment was not successful');
    }
  }, [paid, emails]);

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8">Congrats! You&apos;re protecting your art.</p>
          <div className="text-base sm:text-lg" id="success">
            {message}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Payment;
