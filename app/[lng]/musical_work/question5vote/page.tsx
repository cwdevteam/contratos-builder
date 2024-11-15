'use client'

import React from 'react'
import { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import useQuestion5Vote from '../../store/useQuestion5Vote'
import { useTranslation } from '@/app/i18n/client'

const ContractBuilder5Vote = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))
  const [percent, setPercent] = useState('');
  const updatePercent = useQuestion5Vote((state) => state.updatePercent);
  const {lng} = params
  const { t } = useTranslation(lng, 'musical_work/question5vote')

  const goToPage = (page: number) => {
    push(`/musical_work/${page}`)
  }


  const handlePercentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPercent(event.target.value)
  }

  const handleSubmit = () => {
    updatePercent(percent)
    if (percent != ''){
      push('/musical_work/success')
    }
  }

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <button
            onClick={() => push('/question1')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
          >
            {t('back1')}
          </button>
          <button
            onClick={() => push('/musical_work/question2')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
          >
            {t('back2')}
          </button>
          <button
            onClick={() => push('/musical_work/question3')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
          >
            {t('back3')}
          </button>

          {Array.from({ length: pageCount }, (_, i) => (
            <button
              key={i + 1}
              onClick={() => goToPage(i + 1)}
              className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
            >
              {t('contributor')} {i + 1}
            </button>
          ))}

          <button
            onClick={() => push('/musical_work/question4')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
          >
            {t('back4')}
          </button>

          <h1 className="text-lg sm:text-xl mb-4">
            {t('percent')}
          </h1>
          <form className="flex flex-col">
            <label className="text-xs sm:text-sm mb-2">(%)</label>
            <input
              type="text"
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/5"
              onChange={handlePercentChange}
            />
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            {t('p1')}
          </p>
          <h4 className="text-base sm:text-lg font-bold mb-2">{t('2.0')}</h4>
          <p className="text-xs sm:text-sm mb-4">
          {t('p2')}{' '}
          <span className="text-red-500">{percent ? percent : ' '}%</span>
          {t('p3')}
          </p>
          <ol className="list-decimal pl-5 text-xs sm:text-sm">
            <li>{t('li1')}</li>
            <li>{t('li2')}</li>
            <li>{t('li3')}</li>
          </ol>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <a
          className="text-blue-500 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="#"
          onClick={() => push('/popups/moreInfoVoting')}
        >
          {t('confused')}
        </a>
        <button
          onClick={handleSubmit}
          className=" text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors w-1/5"
        >
          {t('submit')}
        </button>
      </footer>
    </div>
  )
}

const WrappedContractBuilder5Vote = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const {lng} = params
  return(
  <Suspense fallback={<div>Loading...</div>}>
    <ContractBuilder5Vote params= {{lng:lng}}/>
  </Suspense>
)}

export default WrappedContractBuilder5Vote