'use client'

import React, { Suspense, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import useQuestion5Admin from '../../store/useQuestion5Admin'
import { useTranslation } from '@/app/i18n/client'

const ContractBuilder5Admin = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter()
  const searchParams = useSearchParams()
  const pageCount = Number(searchParams.get('pageCount'))
  const [name, setSelectedOptionName] = useState('')
  const updateAdminName = useQuestion5Admin((state) => state.updateAdminName);
  const {lng} = params
  const { t } = useTranslation(lng, 'both/question5admin')

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionName(event.target.value)
  }

  const goToPage = (page: number) => {
    push(`both/${page}`)
  }

  const handleSubmit = () => {
    updateAdminName(name)
    if(name != ''){
      push('/both/success')
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
            onClick={() => push('/both/question2')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
          >
            {t('back2')}
          </button>
          <button
            onClick={() => push('/both/question3')}
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
            onClick={() => push('/both/question4')}
            className="text-xs sm:text-sm text-gray-500 w-full text-left mb-2 border-none"
          >
            {t('back4')}
          </button>

          <h1 className="text-lg sm:text-xl mb-4">
          {t('name')}
          </h1>
          <form className="flex flex-col">
            <label className="text-xs sm:text-sm mb-2">
            {t('name-list')}
            </label>
            <input
              type="text"
              onChange={handleNameChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-4/5"
            />
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
          {t('p1')}
          </p>
          <h4 className="text-base sm:text-lg font-bold mb-2">{t('4.0')}</h4>
          <p className="text-xs sm:text-sm">
          {t('p2')}{' '}
            <span className="text-red-500 text-lg font-bold">{name}</span>{t('p3')}
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <a
          className="text-blue-500 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="#"
          onClick={() => push('/popups/moreInfoAdmin')}
        >
          {t('confused')}
        </a>
        <button
          onClick={handleSubmit}
          className="text-white py-2 px-4 rounded  transition-colors w-1/5"
        >
          {t('submit')}
        </button>
      </footer>
    </div>
  )
}

const WrappedContractBuilder5Admin = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const {lng} = params
  return(
  <Suspense fallback={<div>Loading...</div>}>
    <ContractBuilder5Admin params={{lng:lng}}/>
  </Suspense>
)}

export default WrappedContractBuilder5Admin