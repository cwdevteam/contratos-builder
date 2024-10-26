'use client'

import React, { useEffect } from 'react'
import { useSearchParams } from 'next/navigation';
import useDynamicPageStore from '../store/use[page]';


const Payment = () => {

    const query = useSearchParams();
    const paid = query.get('success');
    const pages = useDynamicPageStore((state) => state.pages);
    let emails = [''];

    Object.keys(pages).forEach((id) => {
        const pageData = pages[Number(id)];
        emails.push(pageData.email);
        });

        useEffect(() => {
            const successElement = document.getElementById('success');
            if (successElement) {
              if (paid === 'true') {
                successElement.innerHTML = `A contract will be sent to ${emails}`;
              } else {
                successElement.innerHTML = `Your payment was not successful`;
              }
            }
          }, [paid, emails]);
    

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
        <main>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8">Congrats! You&apos;re protecting your art.</p>
          <div className="text-base sm:text-lg" id="success">
          </div>
        </div>
      </main>
    </div>
  )
}

export default Payment
