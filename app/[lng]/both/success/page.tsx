'use client'

import React from 'react'
import { useRouter } from 'next/navigation'

import PDF from './pdf'
import { loadStripe } from '@stripe/stripe-js';

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Success = () => {
  const router = useRouter()

  const downloadUnsigned = PDF()

  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get('success')) {
      console.log('Order placed! You will receive an email confirmation.');
    }

    if (query.get('canceled')) {
      console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
    }
  }, []);



  const handleCheckout = async () => {
    const response = await fetch('/api/checkout_sessions', {
      method: 'POST',
    });
    const data = await response.json();
    if (data.url) {
      router.push(data.url);
    }
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <div className="mb-4">
            <button
              onClick={() => router.push('/question1')}
              className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
            >
              What type of splits contract would you like to create?
            </button>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mb-4 text-center">
            Congrats! You&apos;re protecting your art.
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
            DRAFT CONTRACT CREATED!
          </h2>
          <div className="flex flex-col gap-4">
            <button 
              onClick={downloadUnsigned}
              className=" text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              DOWNLOAD UNSIGNED VERSION
            </button>
            <button 
              onClick={handleCheckout}
              className=" text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
            >
              SEND DOCUSIGN TO COLLABORATORS
            </button>
          </div>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8 flex flex-col justify-center">
          <p className="text-lg sm:text-xl mb-8">Congrats! You&apos;re protecting your art.</p>
          <h4 className="text-base sm:text-lg">
            Don&apos;t forget to review it with your colleagues or with a lawyer,
            customize it if needed and sign it when you are ready!
          </h4>
        </div>
      </main>
    </div>
  )
}

export default Success
