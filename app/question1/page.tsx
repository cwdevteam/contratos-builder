'use client'

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import useQuestion1 from '../store/useQuestion1'

interface PopupProps {
  onClose: () => void
}

const Popup = ({ onClose }: PopupProps) => {
  return (
    <div className="popup flex-col">
      <p>
        In music industry, there are two primary types of works: Musical
        Compositions and Sound Recordings These two kinds of works have their
        own copyright.
      </p>
      <ol>
        <li>
          1.{' '}
          <b>
            Copyright in Musical Composition (Publishing Rights or Composition
            Rights):
          </b>{' '}
          Relate to the “song” or underlying composition—the lyrics and melody
          of a song, independent of any particular recording. These rights are
          divided between the songwriter (or composer) and the music publisher.
          The publisher manages the songwriter’s composition by licensing it for
          use, collecting royalties, and ensuring it is properly credited. The
          key components of publishing rights include performance rights,
          mechanical rights, and synchronization rights (for use in films, TV,
          etc.).
        </li>
        <li>
          2. <b>Copyright in Sound Recordings (MASTER Rights):</b> Pertains to
          the ownership of a particular recording of a performance of a song.
          Whoever owns the master rights controls the use, distribution,
          reproduction, and performance of that specific recording. These rights
          typically belong to the record label or the artist who financed the
          production of the recording, though they can be sold or licensed.
        </li>
      </ol>
      <p>
        Both rights are crucial for monetizing and legally protecting music. The
        copyright controls the use of a specific recording, while publishing
        rights control the use of the song&apos;s composition.
      </p>
      <button onClick={onClose} className="popup_button">
        x
      </button>
    </div>
  )
}

const ContractBuilder1 = () => {
  const { push } = useRouter()
  const [showPopup, setShowPopup] = useState(false)
  const [selectedOption, setSelectedOption] = useState('')
  const [selectedDate, setSelectedDate] = useState('')

  const updateSplit = useQuestion1((state) => state.updateSplit);
  const updateDate = useQuestion1((state) => state.updateDate);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.id)
    setSelectedDate(date)
  }

  const handleSubmit = () => {
    updateSplit(selectedOption)
    updateDate(selectedDate)
    if(selectedOption == "Song Writing,"){
      push('/musical_work/question2')
    }
    else if (selectedOption == "Master Recording,"){
      push('master_recording/question2')
    }
    else if (selectedOption == "Song writing and Master Recording,"){
      push('both/question2')
    }
    
  }

  const togglePopup = () => {
    setShowPopup(!showPopup)
  }

  const date = new Date().toLocaleDateString()

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10">
          <p className="text-sm sm:text-base mb-4">What type of splits contract would you like to create?</p>
          <form className="flex flex-col gap-2">
            <label>
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id="Song Writing,"
                required
              />
              SONG WRITING
            </label>
            <label>
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id="Master Recording,"
              />
              MASTER RECORDING
            </label>
            <label>
              <input
                type="radio"
                name="type"
                onChange={handleRadioChange}
                className="radio"
                id="Song writing and Master Recording,"
              />
              BOTH
            </label>
          </form>
        </div>
        <div className=" p-8">
          <p className="text-xs">
            Your contract has yet to be completed. Continue to fill out the
            decision tree.
          </p>
          <p>
            Copyright ownership agreement for { selectedOption} joint work.
          </p>
          <p>
            This agreement is entered into on{' '}
            <span className="text-red-500">
              {selectedDate ? selectedDate : ' '}
            </span>
          </p>
        </div>
      </main>
      <footer className="flex flex-col gap-6 row-start-3">
        <a
          className="items-center gap-2 hover:underline hover:underline-offset-4"
          href="#"
          onClick={togglePopup}
        >
          If confused, read here
        </a>
        <button onClick={handleSubmit}>SUBMIT</button>
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </footer>
    </div>
  )
}

export default ContractBuilder1
