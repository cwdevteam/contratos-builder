'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import useQuestion2 from '../../store/useQuestion2'

interface PopupProps {
  onClose: () => void
}

const Popup = ({ onClose }: PopupProps) => {
  return (
    <div className="popup flex-col">
      <p>
        Specifying the name of a song or musical work in contracts, particularly
        when a master recording is also involved, is crucial for ensuring
        clarity and preventing confusion. Multiple versions of a song, such as
        remixes, live performances, or covers, can exist, and without clear
        identification, it may lead to disputes over royalties, rights, and
        ownership. By defining the exact version, the contract ensures proper
        royalty allocation and protects the rights of creators and performers.
      </p>
      <button onClick={onClose} className="popup_button">
        x
      </button>
    </div>
  )
}

const ContractBuilder2 = () => {
  const { push } = useRouter()
  const updateSong = useQuestion2((state) => state.updateSong);
  const [showPopup, setShowPopup] = useState(false)
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

  return (
    <div className="min-h-screen p-4 sm:p-8 flex flex-col justify-between">
      <main className="flex flex-col sm:flex-row gap-6 sm:gap-8">
        <div className="w-full sm:w-1/2 py-4 sm:py-10 border-none">
          <button
            onClick={() => push('/question1')}
            className="text-xs text-gray-500 w-full text-left mb-4 border-none"
          >
            What type of splits contract would you like to create?
          </button>
          <p className="text-sm sm:text-base mb-4">What is the name of the song?</p>
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
            Your contract has yet to be completed. Continue to fill out the decision tree.
          </p>
          <h3 className="text-base sm:text-lg font-bold mb-2">1.0 Music Work Identification</h3>
          <p className="text-sm sm:text-base">
            The contracting parties have collaborated in the authorship and composition of the musical work titled{' '}
            <span className="text-red-500">{song ? song : ' '}</span>
          </p>
        </div>
      </main>
      <footer className="mt-8 flex flex-col gap-4">
        <button
          onClick={handleSubmit}
          className=" text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        >
          SUBMIT
        </button>
        {showPopup && <Popup onClose={() => setShowPopup(false)} />}
      </footer>
    </div>
  )
}

export default ContractBuilder2
