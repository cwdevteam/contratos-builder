'use client';

import React from 'react';
import {useRouter} from 'next/navigation'
import { useTranslation } from '@/app/i18n/client';

const Disclaimer = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const { lng } = params;
  const { t } = useTranslation(lng, 'popups/disclaimer');
  const { push } = useRouter();

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col gap-6 sm:gap-8">
        <p className="text-sm sm:text-base space-y-4">
          <span className="block">
            {t('1')}
            <br /><br />
            {t('2')}
            <br /><br />
            {t('3')}
            </span>
        </p>
        <button onClick={() => push('/question1')} className="float-right">{t('4')}</button>
      </main>
    </div>
    
  );
};

export default Disclaimer;
