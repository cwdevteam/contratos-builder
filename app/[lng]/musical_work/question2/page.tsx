'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useQuestion2 from '../../store/useQuestion2'
import { useTranslation } from '@/app/i18n/client'

const ContractBuilder2 = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter()
  const updateSong = useQuestion2((state) => state.updateSong);
  const [song, setSelectedOptionSong] = useState('')

  const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionSong(event.target.value)
  }

  const handleSubmit = () => {
    updateSong(song)
    if(song != ''){
      push(`/musical_work/question3?${query}`)
    }

  }

  const query = new URLSearchParams({
    song,
  }).toString()

  const {lng} = params
  const { t } = useTranslation(lng, 'musical_work/question2')

  return (
    <div className=" p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10 border-none">
          <button
            onClick={() => push('/question1')}
            className="text-xs text-gray-500 w-full text-left mb-4 border-none"
          >
            {t('back1')}
          </button>
          <p className="text-sm sm:text-base mb-4">{t('p1')}</p>
          <form className="flex flex-col">
            <input
              type="text"
              name="type"
              onChange={handleSongChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2"
              required
            />
          </form>
        </div>
        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            {t('p2')}
          </p>
          <h3 className="text-base font-bold mb-2">{t('h3')}</h3>
          <p className="text-sm sm:text-base">
            {t('p3')}{' '}
            <span className="text-red-500">{song ? song : ' '}</span>
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <button
          onClick={handleSubmit}
          className=" text-white py-2 px-4 rounded  transition-colors w-1/5"
        >
          {t('submit')}
        </button>
      </footer>
    </div>
  )
}

export default ContractBuilder2
