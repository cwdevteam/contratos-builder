'use client'

import React, { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import useQuestion3 from '../../store/useQuestion3'
import { useTranslation } from '@/app/i18n/client'

const ContractBuilder3 = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter()
  const updateContributorCount = useQuestion3((state) => state.updateContributorCount);
  const [pageCount, setPageCount] = useState<number | null>(null)

  const searchParams = useSearchParams()
  const song = searchParams.get('song')!

  const handleContributorsChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const contributors = Number(event.target.value)
    setPageCount(contributors)!
    updateContributorCount(contributors)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (pageCount && pageCount > 0) {
      push(`/musical_work/1?pageCount=${pageCount}`)
    }

  }

  const {lng} = params
  const { t } = useTranslation(lng, 'musical_work/question3')

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
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
          <p>{t('p1')}</p>
          <form className="flex flex-col">
            <input
              type="number"
              name="type"
              onChange={handleContributorsChange}
              min="1"
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-1/2"
              required
            />
          </form>
        </div>
        <div className=" p-8 py-1">
          <p className="text-xs text-gray-500">
            {t('p2')}
          </p>
          <h3>{t('h3')}</h3>
          <p>
            {t('p3')}{' '}
            <span className="text-red-500">{song}</span>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <button onClick={handleSubmit} className="border border-red">
        {t('submit')}
        </button>
      </footer>
    </div>
  )
}


const WrappedContractBuilder3 = () => (
  <Suspense fallback={<div>Loading...</div>}>
    <ContractBuilder3 params={{ lng: 'en' }} />
  </Suspense>
)

export default WrappedContractBuilder3
