"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { languages, fallbackLng } from '../i18n/settings'
import { useTranslation } from '../i18n/client'

interface PopupProps {
  onClose: () => void
  params: {
    lng: string;
  };
}

const Popup = ({ onClose, params }: PopupProps) => {
  const { lng } = params;
  const { t } = useTranslation(lng);
  return (
    <div className="popup flex flex-col p-4 sm:p-8 text-sm sm:text-base">
      <p>
        {t('popups.1')}
      </p>
      <ul>
        <li>
        {t('popups.2')}
          <br />
          {t('popups.3')}
          <br />
          {t('popups.4')}
        </li>
        <li>
        {t('popups.5')}
          <br />
          {t('popups.6')}
          <br />
          {t('popups.7')}
        </li>
        <br />
        <li>
        {t('popups.8')}
          <br />
          {t('popups.9')}
          <br />
          {t('popups.10')}
          <br />
        </li>
      </ul>
      {t('popups.11')}
      <br />
      <p>
      {t('popups.12')}
      </p>
      <button
        onClick={onClose}
        className="popup_button text-white hover:text-gray-300"
      >
        &times;
      </button>
    </div>
  )
}

export default function Home({ params }: {
  params: {
    lng: string;
  };
}) {
  let { lng } =  params
  if (languages.indexOf(lng) < 0) lng = fallbackLng


  const { push } = useRouter()
  const [showPopup, setShowPopup] = useState(false)

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const { t } = useTranslation(lng)

  useEffect(() => {
    if(lng=="es"){
      document.getElementById('li4')!.innerHTML="<li>"+t('li4')+"</li>"
    }
  }, []);

  

  return (
    <div className="p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col gap-6 sm:gap-8">
        <h3 className="text-xl sm:text-2xl font-bold">
          <b>{t('h3')}</b>
         
        </h3>
        <p className="text-sm sm:text-base">
          {t('intro')}
        </p>
        <p className="text-sm sm:text-base">
          {t('li-title')}
        </p>
        <ol className="list-decimal pl-6 text-sm sm:text-base">
          <li>{t('li1')}</li>
          <li>{t('li2')}</li>
          <li>{t('li3')}</li>
          <span id='li4'></span>
        </ol>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <a
          className="text-blue-500 hover:underline hover:underline-offset-4 text-sm sm:text-base"
          href="#"
          onClick={togglePopup}
        >
          {t('confused')}
        </a>
        <button
          onClick={() => push(`/${lng}/popups/disclaimer`)}
          className="text-white py-2 px-4 rounded  transition-colors w-1/4"
        >
          {t('get-started')}
        </button>
        {showPopup && <Popup onClose={() => setShowPopup(false)} params={{lng:lng}} />}
      </footer>
    </div>
  )
}
