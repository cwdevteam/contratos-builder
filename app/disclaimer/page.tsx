'use client';

import React from 'react';
import {useRouter} from 'next/navigation'

const Disclaimer = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col gap-6 sm:gap-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">Disclaimer</h1>
        <p className="text-sm sm:text-base space-y-4">
          <span className="block">
            DISCLAIMER: Our intention is to provide a platform for self-help. We provide a draft of a contract that should be meticulously reviewed by each of the parties willing to make an agreement. The information given in this service is provided for your private use and does not constitute legal advice. We do not review any information you provide us for legal accuracy or sufficiency, draw legal conclusions, provide opinions about your usage, or apply the law to the facts of your situation.
            <br /><br />
            If you don’t understand the terms or consequences of the draft we provide, or need legal advice for a specific problem, we encourage you to consult with a licensed attorney. The draft provided by this service is not a substitute for legal advice from a qualified attorney licensed to practice in an appropriate jurisdiction.
            <br /><br />
            This draft is limited to the general principles of copyright law. If you are interested in learning more about how the MESA system can help you, please get in touch at contact@mesawallet.io.</span>
        </p>
        <button onClick={() => router.push('/question1')} className="float-right">Proceed -&gt;</button>
      </main>
    </div>
    
  );
};

export default Disclaimer;
