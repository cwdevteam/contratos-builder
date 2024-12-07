'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useQuestion2 from '../../store/useQuestion2'
import { useTranslation } from '@/app/i18n/client'

interface PopupProps {
  onClose: () => void
  params: {
    lng: string;
  };
}

const Popup = ({ onClose, params }: PopupProps) => {
  const {lng} = params
  const {t} = useTranslation(lng, 'both/question2');
  return (
    <div className="popup flex-col">
      <p>
        {t('popups.1')}
      </p>
      <button onClick={onClose} className="popup_button">
        x
      </button>
    </div>
  )
}

const ContractBuilder2 = ({ params }: {
  params: {
    lng: string;
  };
}) => {
  const { push } = useRouter()
  const updateSong = useQuestion2((state) => state.updateSong);
  const updateRecording = useQuestion2((state) => state.updateRecording);
  const [showPopup, setShowPopup] = useState(false)
  const [song, setSelectedOptionSong] = useState('')
  const [recording, setRecording] = useState('')
  const {lng} = params
  const {t} = useTranslation(lng, 'both/question2');

  const handleSongChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOptionSong(event.target.value)
  }

  const handleRecordingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRecording(event.target.value)
  }

  const handleSubmit = () => {
    updateSong(song)
    updateRecording(recording)
    if(song != '' && recording != ''){
      push(`/both/question3?${query}`)
    }
  }

  const query = new URLSearchParams({
    song,
    recording,
  }).toString()

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
            <label className = "text-xs text-gray-500 w-full text-left mb-4 border-none py-0">
            {t('label1')}
            </label>
            <input
              type="text"
              name="type"
              onChange={handleSongChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2"
              required
            />
            <label className="text-xs text-gray-500 w-full text-left mb-4 border-none py-0 pt-5 ">
            {t('label2')}
            </label>
            <input
              type="text"
              name="type"
              onChange={handleRecordingChange}
              className="rounded-lg bg-black border border-white text-white focus:outline-none focus:ring-2 focus:ring-white w-full sm:w-1/2"
              required
            />
          </form>
        </div>

        <div className="w-full sm:w-1/2 p-4 sm:p-8">
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
          {t('p2')}
          </p>

          <h3 className="text-base sm:text-lg font-bold mb-2">{t('h3')}</h3>
          <p className="text-sm sm:text-base">
          {t('p3')}{' '}
            <span className="text-red-500 text-lg">{song ? song : ' '}</span>
          </p>
          <br/>
          <h3 className="text-base sm:text-lg font-bold mb-2">{t('h32')}</h3>
          <p className="text-sm sm:text-base">
          {t('p4')}{' '}
            <span className="text-red-500 text-lg">{recording ? recording : ' '}</span>
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <button
          onClick={handleSubmit}
          className="text-white py-2 px-4 rounded  transition-colors w-1/5"
        >
          {t('submit')}
        </button>
        {showPopup && <Popup onClose={() => setShowPopup(false)} params={{lng:lng}}/>}
      </footer>
    </div>
  )
}

export default ContractBuilder2
