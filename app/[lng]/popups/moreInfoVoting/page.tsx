'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from '@/app/i18n/client'

const VotingInfo = ({params}:{
  params:{
    lng:string;
  }
}) => {
  const { back } = useRouter()
  const {lng} = params
  const{t} = useTranslation(lng,'popups/moreInfoVoting')

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col">
      <button 
        onClick={() => back()}
        className="self-end  text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors mb-4"
      >
        x
      </button>
      <div className="space-y-4 text-sm sm:text-base">
        <p>
          {t('1')}
        </p>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
          {t('2')}
          </li>
          <li>
          {t('3')}
            <ol className="list-lower-alpha pl-5 mt-2 space-y-1">
              <li>{t('4')}</li>
              <li>{t('5')}</li>
              <li>{t('6')}</li>
              <li>{t('7')}</li>
            </ol>
          </li>
          <li>
          {t('8')}
            <ul>
              <li>
              {t('9')}
              </li>
              <li>
              {t('10')}
              </li>
            </ul>
          </li>
          <li>
          {t('11')}
            <ul>
              <li>
              {t('12')}
              </li>
              <li>
              {t('13')}
              </li>
              <li>
              {t('14')}
              </li>
            </ul>
          </li>
        </ol>
        <p>
        {t('15')}
        </p>
      </div>
    </div>
  )
}

export default VotingInfo
